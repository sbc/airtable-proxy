export interface AirtableConfig {
    route: string;
    base: string;
    table: string;
    view?: string;
    filter?: string;
    sort?: Array<{ field: string, direction: "asc" | "desc" }>;
    fields: string[];
    fieldMappings?: Function;
}

export const airtableConfigs: Array<AirtableConfig> = [
    {
        route: "shows",
        base: "appN3jzpg2Vdty5N9",
        table: "Shows",
        filter: "AND({Show Number} >= 1, {Show Status} = 'Published')",
        sort: [{ field: "Show Number", direction: "desc" }],
        fields: [
            'Show Number',
            'Scheduled Release Date',
            'Show Title',
            'Cover Image URL',
            'Cover Image Alt',
            'Banner Image URL',
            'Banner Image Alt',
            'OLD Wordpress Slug'
        ],
        fieldMappings: ((records: any[]) => {
            return records.map((record: any) => {
                return {
                    id: record["Airtable ID"],
                    num: record["Show Number"],
                    title: record["Show Title"],
                    cover_img_url: record["Cover Image URL"],
                    cover_img_alt: record["Cover Image Alt"],
                    banner_img_url: record["Banner Image URL"],
                    banner_img_alt: record["Banner Image Alt"],
                    slug: record["OLD Wordpress Slug"],
                    date: record["Scheduled Release Date"],
                }
            })
        }),
    },
    {
        // Match /show/:num
        route: "show/:p(\\d+)",
        base: "appN3jzpg2Vdty5N9",
        table: "Shows",
        filter: "{Show Number} = :p",
        fields: [
            'Show Number',
            'Scheduled Release Date',
            'Show Title',
            'Video URL',
            'Audio URL',
            'Cover Image URL',
            'Cover Image Alt',
            'Banner Image URL',
            'Banner Image Alt',
            'Episode Description',
            'OLD Wordpress Slug',
            'Guests',
            'Episode Resources',
        ],
        fieldMappings: ((records: any) => {
            return records.map((record: any) => {
                return {
                    id: record["Airtable ID"],
                    num: record["Show Number"],
                    title: record["Show Title"],
                    video_url: record["Video URL"],
                    audio_url: record["Audio URL"],
                    cover_img_url: record["Cover Image URL"],
                    cover_img_alt: record["Cover Image Alt"],
                    banner_img_url: record["Banner Image URL"],
                    banner_img_alt: record["Banner Image Alt"],
                    description: record["Episode Description"],
                    slug: record["OLD Wordpress Slug"],
                    date: record["Scheduled Release Date"],
                    guests: record["Guests"],
                    resources: record["Episode Resources"],
                }
            })
        })
    },
    {
        // Match /guests/:filter
        route: "guests/:p",
        base: "appN3jzpg2Vdty5N9",
        table: "Guests",
        filter: "RECORD_ID() = ':p'",
        fields: [
            'Name',
            'Affiliation',
            'Bio',
            'Guest Slug Part',
            'Website URL 1',
            'Website URL 2',
            'Website URL 3',
            'Facebook URL',
            'Twitter URL',
            'LinkedIn URL',
            'Github URL',
            'Google Scholar URL',
        ],
        fieldMappings: ((records: any[]) => {
            return records.map((record: any) => {
                return {
                    id: record["Airtable ID"],
                    name: record["Name"],
                    affiliation: record["Affiliation"],
                    bio: record["Bio"],
                    slug: record["Guest Slug Part"],
                    website_url_1: record["Website URL 1"],
                    website_url_2: record["Website URL 2"],
                    website_url_3: record["Website URL 3"],
                    facebook_url: record["Facebook URL"],
                    twitter_url: record["Twitter URL"],
                    linkedin_url: record["LinkedIn URL"],
                    github_url: record["Github URL"],
                    google_scholar_url: record["Google Scholar URL"],
                }
            })
        })
    },
    {
        // Match /sponsors/:filter
        route: "sponsors/:p",
        base: "appN3jzpg2Vdty5N9",
        table: "Sponsors",
        filter: "RECORD_ID() = ':p'",
        fields: [
            'Name',
            'Logo URL',
            'Logo Title',
            'Logo Alt',
            'Sponsor Web Site',
            'Sponsor Description'
        ],
        fieldMappings: ((records: any[]) => {
            return records.map((record: any) => {
                return {
                    id: record["Airtable ID"],
                    name: record["Name"],
                    logo_url: record["Logo URL"],
                    logo_title: record["Logo Title"],
                    logo_alt: record["Logo Alt"],
                    link: record["Sponsor Web Site"],
                    description: record["Sponsor Description"],
                }
            })
        })
    },
    {
        // Match /show/:slug
        route: "show/:p",
        base: "appN3jzpg2Vdty5N9",
        table: "Shows",
        filter: "{OLD Wordpress Slug} = ':p'",
        fields: [
            'Show Number',
            'Scheduled Release Date',
            'Show Title',
            'Video URL',
            'Audio URL',
            'Cover Image URL',
            'Cover Image Alt',
            'Banner Image URL',
            'Banner Image Alt',
            'Episode Description',
            'OLD Wordpress Slug',
            'Guests',
            'Episode Resources',
            'Sponsors'
        ],
        fieldMappings: ((records: any) => {
            return records.map((record: any) => {
                return {
                    id: record["Airtable ID"],
                    num: record["Show Number"],
                    title: record["Show Title"],
                    video_url: record["Video URL"],
                    audio_url: record["Audio URL"],
                    cover_img_url: record["Cover Image URL"],
                    cover_img_alt: record["Cover Image Alt"],
                    banner_img_url: record["Banner Image URL"],
                    banner_img_alt: record["Banner Image Alt"],
                    description: record["Episode Description"],
                    slug: record["OLD Wordpress Slug"],
                    date: record["Scheduled Release Date"],
                    guests: record["Guests"],
                    resources: record["Episode Resources"],
                    sponsors: record["Sponsors"]
                }
            })
        })
    },
    {
        // Match /series/:type
        route: "series/:p(Series|Topic|Playlist)",
        base: "appN3jzpg2Vdty5N9",
        table: "Series",
        filter: "AND({Type} = ':p', {Status} = 'Published')",
        sort: [{ field: "Series End", direction: "desc" }],
        fields: [
            'Name',
            'Shows',
            'Sponsors',
            'Series End',
            'Series Description',
            'New Wordpress Slug',
            'Cover Image URL',
            'Cover Image Title',
            'Cover Image Alt',
        ],
        fieldMappings: ((records: any[]) => {
            return records.map((record: any) => {
                return {
                    id: record["Airtable ID"],
                    title: record["Name"],
                    shows: record["Shows"],
                    sponsors: record["Sponsors"],
                    date: record["Series End"],
                    description: record["Series Description"],
                    slug: record["New Wordpress Slug"],
                    cover_img_url: record["Cover Image URL"],
                    cover_img_title: record["Cover Image Title"],
                    cover_img_alt: record["Cover Image Alt"],
                }
            })
        })
    },
];