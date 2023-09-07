export class UserModelo {
    username: string|undefined;
    name: string|undefined;
    lastname: string|undefined;
    email: string|undefined;
    password: string|undefined;
    level: number|undefined;
    score: number|undefined;
    urlPicProfile: string|undefined;

    constructor(levelCourseC?: number, scoreC?: number) {        
        this.level = levelCourseC
        this.score = scoreC
    }

 
}