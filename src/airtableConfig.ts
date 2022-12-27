export interface AirtableConfig {
    route: string;
    base: string;
    table: string;
    view?: string;
    filter?: string;
    sort?: Array<{field: string, direction: "asc" | "desc"}>;
    fields: string[];
    fieldMappings?: Function;
}

export const airtableConfigs: Array<AirtableConfig> = [
    {
        route: "shows",
        base: "appN3jzpg2Vdty5N9",
        table: "Shows",
        filter: "AND({Show Number} >= 575, {Show Status} = 'Published')",
        sort: [{field: "Show Number", direction: "asc"}],
        fields: [
            'Show',
            'Show Number',
            'Scheduled Release Date',
            'Show Title',
            'Cover Image URL',
        ]
    }
];