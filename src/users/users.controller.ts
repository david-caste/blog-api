import { Controller, Get, Param } from '@nestjs/common';

interface User {
    id: string;
    name: string;
    email: string;
}

@Controller('users')
export class UsersController {

    private users: User[] = [
        {
            id: '1',
            name: 'Alicia',
            email: 'alicia@gmail.com',
        },
        {
            id: '2',
            name: 'Carolina',
            email: 'carolina@gmail.com',
        },
    ];

    @Get()
    getUsers(){
        return this.users;
    }

    @Get(':id')
    findUser(@Param('id') id: string){
        return this.users.find((user) => user.id === id);
    }
}
