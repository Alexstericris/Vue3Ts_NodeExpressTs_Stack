export {}
declare global {
    namespace Express {
        interface User {
            username: string;
            _id?: string;
        }
    }
}