export function create(userId: any, text: any): Promise<import("sequelize").Model<any, any>>;
export function getAll(): Promise<import("sequelize").Model<any, any>[]>;
export function get(userId: any): Promise<import("sequelize").Model<any, any>[]>;
export function remove(id: any): Promise<void>;
export function findById(id: any): Promise<import("sequelize").Model<any, any>[]>;
export function modify(id: any, text: any): Promise<import("sequelize").Model<any, any>>;
