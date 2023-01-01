import airtable from 'airtable';
import { AirtableConfig } from '../airtableConfig';
import CacheService from './CacheService';

export default class AirtableService {

    private config: AirtableConfig;
    private table: Airtable.Table<any>;
    private cache: CacheService;

    constructor(config: AirtableConfig) {
        this.config = config;
        const base = new airtable({ apiKey: process.env.AIRTABLE_KEY }).base(config.base);
        this.table = base(config.table);

        this.cache = new CacheService();
    }

    private async getTableContent(param: string = '') {
        const opts: Airtable.SelectOptions = {
            maxRecords: 1000,
        };
        if (this.config.view) {
            opts.view = this.config.view;
        }
        if (this.config.filter) {
            if (param) { 
                let param_array = null;
                try {
                    param_array = JSON.parse(param);
                } catch (e) {
                    param_array = null;
                }

                if (param_array && Array.isArray(param_array) && param_array.length > 0) {
                    // construct a filter formula by iterating over the array and ORing together a filter term for each item
                    let filterFormula = '';

                    for (let i = 0; i < param_array.length; i++) {
                        if (i > 0) {
                            filterFormula += ',';
                        }
                        filterFormula += this.config.filter.replace(":p", param_array[i]);
                    }
                    opts.filterByFormula = `OR(${filterFormula})`;
                } else {
                    // no array, just a string param
                    opts.filterByFormula = this.config.filter.replace(":p", param);
                }
            } else {
                // no param, just use the filter as is
                opts.filterByFormula = this.config.filter;
            }
        }
        if (this.config.sort) {
            opts.sort = this.config.sort;
        }
        if (this.config.fields) {
            opts.fields = this.config.fields;
        }

        const records = await this.table.select(opts).all();
        const mappedRecords = records.map(record => {
            return {
                ...record.fields,
                "Airtable ID": record.id,
            };
        }).map(record => {
            const parsedRecords: any = {
                "Airtable ID": record["Airtable ID"],
            };
            for (const field of this.config.fields.sort()) {
                parsedRecords[field] = record[field] ?? null;
            }
            return parsedRecords;
        });

        if (this.config.fieldMappings) {
            return this.config.fieldMappings(mappedRecords);
        }

        return mappedRecords;
    }

    public async getCachedTableContent(param: string = '') {
        if (param === '') {
            if (!this.cache.has()) {
                console.log(`[cache]: Cache is empty, fetching`, `${new Date()}`);
                const records = await this.getTableContent();
                this.cache.set(records);
                return records;
            }
            if (this.cache.expired()) {
                console.log(`[cache]: Cache is expired, refetching`, `${new Date()}`);
                this.getTableContent().then(records => {
                    this.cache.set(records);
                    console.log(`[cache]: Cache updated`, `${new Date()}`);
                });
            }
            return this.cache.get();
        } else {
            if (!this.cache.has(param)) {
                console.log(`[cache]: Cache for route "${this.config.route}" with param "${param}" is empty, fetching`, `${new Date()}`);
                const records = await this.getTableContent(param);
                this.cache.set(records, param);
                return records;
            }
            if (this.cache.expired(param)) {
                console.log(`[cache]: Cache for route "${this.config.route}" with param "${param}" is expired, refetching`, `${new Date()}`);
                this.getTableContent(param).then(records => {
                    this.cache.set(records, param);
                    console.log(`[cache]: Cache updated`, `${new Date()}`);
                });
            }
            return this.cache.get(param);
        }
    }

}