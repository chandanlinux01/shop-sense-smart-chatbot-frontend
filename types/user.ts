export interface UserDetails {
    tenant_id: string;
    tenant_email: string;
    pricing_plan?: string;
    stores: StoreDetails[];
}

export interface StoreDetails {
    store_id: string;
    store_type: string;
    store_url?: string;
}