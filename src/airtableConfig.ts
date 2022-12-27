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
        sort: [{field: "Show Number", direction: "asc"}],
        fields: [
            'ID',
            'First Name',
            'Last Name',
            'Content',
        ],
        fieldMappings: ((records: any[]) => {
            return records.map( (record: any) => {
                return {
                    id: record.ID,
                    name: `${record['First Name']} ${record['Last Name']}`,
                    content: record.Content,
                }
            })
        }),
    },
    {
        route: "settings",
        base: "app123456",
        table: "Table Name",
        filter: "Status = 'Published'",
        fields: [
            "Key",
            "Value",
        ],
    },
];