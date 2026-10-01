export interface Result <T> {
    success: boolean;
    timestamp: Date;
    message: null | string;
    data: null | T
}