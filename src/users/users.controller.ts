import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { error } from 'console';

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
        const user = this.users.find((user) => user.id === id);
        if(!user){
            return{
                error: 'User not found',
            };
        }
        return user;
    }

    @Post()
    createUser(@Body() body: User){
        this.users.push(body);
        return body
    }
}
