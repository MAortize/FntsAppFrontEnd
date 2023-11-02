import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from 'src/environments/environment';
import { of, throwError } from 'rxjs';
import { UserModelo } from 'src/app/shared/models/user.model';



describe('Prueba al servicio de autenticacion de FNTS', () => {
    let service: AuthService
    let httpClientSpy: { post: jasmine.Spy }



    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                provideFirebaseApp(() => initializeApp(firebaseConfig)),
                HttpClientTestingModule,
                FirestoreModule
            ]
        })
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        service = new AuthService(httpClientSpy as any);
    });

    it('Debe de crearse correctamente', () => {
        expect(service).toBeTruthy();
    });


    it('Debe logearse correctamente', (done: DoneFn) => {

        const mockUserCredentials = {
            email: 'ortiz.eche@gmail.com',
            password: 'Campe@n1234'
        }

        let user = new UserModelo()

        user.email = mockUserCredentials.email
        user.password = mockUserCredentials.password


        const mockResultLogin = {
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNYWlja3kiLCJleHAiOjE2OTY2NTUxMTAsImlhdCI6MTY5NjYxOTExMH0.S2kxiyi4zqOwZ-qFFSMMd8_uEHmmqw84bCjB-592VpE"
        }

        httpClientSpy.post.and.returnValue(of(mockResultLogin))
        
        service.generateToken(user).subscribe((resultado) => {
            expect(resultado).toEqual(mockResultLogin)
            done()
        })
    })

    it('Debe mostrar error 500 en login incorrecto', (done: DoneFn) => {

        const mockUserCredentials = {
            email: 'ortiz.eche@gmail.com',
            password: 'Campe@n12'
        }

        let user = new UserModelo()

        user.email = mockUserCredentials.email
        user.password = mockUserCredentials.password


        const mockError500 = {
            status: 500,
            error: 'Internal Server Error'
        }

        httpClientSpy.post.and.returnValue(throwError(mockError500))

        service.generateToken(user).subscribe((resultado) => {


        }, error => {
            expect(error.status).toEqual(500);
            done()
        })

    })

    it('Debe guardar el token retornando un true', (done: DoneFn) => {

        let jwt = '"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNYWlja3kiLCJleHAiOjE2OTY2NTUxMTAsImlhdCI6MTY5NjYxOTExMH0.S2kxiyi4zqOwZ-qFFSMMd8_uEHmmqw84bCjB-592VpE"'

        let expectValue = true

        let value = service.loginUser(jwt);

        expect(value).toEqual(expectValue)
        done()

    })

    it('Debe registrar de manera correcta retornando un el mismo body', (done: DoneFn) => {
        const mockUserForCreate = {
            userName: 'userTest',
            name: 'prueba',
            lastname: 'test',
            email: 'testingapp@gmail.com',
            password: 'contratest@1234',
            level: 0,
            score: 0,
            urlPicProfile: 'unaurlrandom'
        }
        
        let userMock = new UserModelo();

        userMock.username = mockUserForCreate.userName
        userMock.name = mockUserForCreate.name
        userMock.lastname = mockUserForCreate.lastname
        userMock.email = mockUserForCreate.email
        userMock.password = mockUserForCreate.password
        userMock.level = 1
        userMock.score = 0
        userMock.urlPicProfile = mockUserForCreate.urlPicProfile


        const mockAnswerForCreate = {
            id:1,
            userName: 'userTest',
            name: 'prueba',
            lastname: 'test',
            email: 'testingapp@gmail.com',
            password: 'testing',
            level: 0,
            score: 0,
            urlPicProfile: 'unaurlrandom',
            enabled: true,
            authorities : [
                {
                    authority: "NORMAL"
                }
            ],
            accountNonLocked: true,
            credentialsNonExpired: true,
            accountNonExpired: true
        }

        httpClientSpy.post.and.returnValue(of(mockAnswerForCreate))

        service.añadirUsuario(userMock).subscribe((resultado) => {
            expect(resultado).toEqual(mockAnswerForCreate)
            done()
        })


    })



})
