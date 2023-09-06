

declare namespace Express {
    interface User { username : string }
   export interface Request {
      user?: User
   }
}