import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LearnService } from '../../services/learn.service';
import Swal from 'sweetalert2'


@Component({
    selector: 'app-learn-view',
    templateUrl: './learn-view.component.html',
    styleUrls: ['./learn-view.component.css']
})
export class LearnViewComponent implements OnInit, AfterViewInit {

    cursos = []

    listCursos: any = []

    userCourseActivity: any = []


    acabeCurso = true
    inicieCurso = true

    emailUserInSesssion: string;

    puntuacionInSession: string;

    actividadFinalizada: boolean

    selectedOption1: number = 0
    selectedOption2: number = 0
    selectedOption3: number = 0

    constructor(private service: LearnService, private renderer: Renderer2, private el: ElementRef) {

    }
    
    
    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
        this.emailUserInSesssion = sessionStorage.getItem('email')
        
        this.puntuacionInSession = sessionStorage.getItem('puntuacion')
        
        const input = document.getElementById('hiddenPrueba')
        if (this.puntuacionInSession === '0') {
            input?.click()
        }
        this.service.getUserCourseActivities(this.emailUserInSesssion).subscribe((data) => {
            this.userCourseActivity = data
            console.log(this.userCourseActivity);            
            if (this.userCourseActivity[0].course_state === true) {
                Swal.fire({
                    title: 'Al parecer terminaste todas las actividades de este curso, estamos promoviendote al siguiente',
                    timer: 10000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                })
                this.service.upgradeCourse(this.emailUserInSesssion).subscribe(()=>{
                })
                setTimeout(() => {
                    Swal.fire({
                        title: 'Fuiste promovido',
                        text: 'Felicidades ^.^',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#008000'
                    }).then((data) => {
                        if (data.isConfirmed) {
                            window.location.reload()
                        }
                    })
                }, 11500)
            }
        })





        this.service.getListaCursos().subscribe((data) => {
            this.listCursos = data

        })


        this.service.getCurso().subscribe((data) => {
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    this.cursos.push(data[key].activities)
                }
            }
        })
    }

    hideBtnIfActivitySuccess(idAct: any) {
        if (idAct.idActInJson < this.userCourseActivity[0]?.activity_id) {
            return true
        }
        return false
    }

    recibe(idAct: any): boolean {
        if (idAct.idActInJson <= this.userCourseActivity[0]?.activity_id) {
            return false
        }
        return true
    }


    prueba(j, i) {
        var miCarrusel = document.getElementById('carouselPresentationsOfActivity' + j + 'Course' + i);
        // console.log(miCarrusel.id);


        // Agrega un oyente de eventos al carrusel que se activa cuando se cambia de diapositiva
        miCarrusel?.addEventListener('slid.bs.carousel', () => {
            const activeItem = miCarrusel.querySelector('.carousel-item.active'); // Obtiene la diapositiva activa
            const items = miCarrusel.querySelectorAll('.carousel-item'); // Obtiene todas las diapositivas

            const lastIndex = items.length - 1;
            const currentIndex = Array.from(items).indexOf(activeItem);


            if (currentIndex === lastIndex) {
                // Estás mostrando el último elemento del carrusel
                this.acabeCurso = false
            } else {
                this.acabeCurso = true
            }
        });

    }

    sumPuntos(actividad: any) {
       
        if (actividad.existeQuiz == true) {

            const respuestaCorrectaPregunta1 = actividad.quiz[0]?.respuestaCorrecta.toString()
            const respuestaCorrectaPregunta2 = actividad.quiz[1]?.respuestaCorrecta.toString()
            const respuestaCorrectaPregunta3 = actividad.quiz[2]?.respuestaCorrecta.toString()

            console.log(respuestaCorrectaPregunta3);


            if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2) {
                Swal.fire({
                    title: 'Upss!!',
                    icon: 'warning',
                    text: 'Ambas respuestas están malas, revisa y corrige tú puedes',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                })
            }

            if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2) {
                Swal.fire({
                    title: 'Upss!!',
                    icon: 'warning',
                    text: 'La respuesta en la pregunta 1 es incorrecta valida tu respuesta',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                })
            }
            if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2) {
                Swal.fire({
                    title: 'Upss!!',
                    icon: 'warning',
                    text: 'La respuesta en la pregunta 2 es incorrecta valida tu respuesta',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                })
            }

            if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2 && this.selectedOption3 !== respuestaCorrectaPregunta3) {
                Swal.fire({
                    title: 'Upss!!',
                    icon: 'warning',
                    text: 'Las tres respuestas están malas, revisa y corrige tú puedes',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                })
            }

            if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2 && this.selectedOption3 === respuestaCorrectaPregunta3) {
                Swal.fire({
                    title: 'Upss!!',
                    icon: 'warning',
                    text: 'La respuesta en la pregunta 1 es incorrecta valida tu respuesta',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                })
            }
            if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2 && this.selectedOption3 === respuestaCorrectaPregunta3) {
                Swal.fire({
                    title: 'Upss!!',
                    icon: 'warning',
                    text: 'La respuesta en la pregunta 2 es incorrecta valida tu respuesta',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                })
            }
            if (respuestaCorrectaPregunta3 !== undefined && this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2 && this.selectedOption3 !== respuestaCorrectaPregunta3) {
                Swal.fire({
                    title: 'Upss!!',
                    icon: 'warning',
                    text: 'La respuesta en la pregunta 3 es incorrecta valida tu respuesta',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                })
            }
            if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2 && this.selectedOption3 === respuestaCorrectaPregunta3) {
                this.service.sumPuntosInBack(this.emailUserInSesssion).subscribe(() => {                                    
                    this.service.upgradeLevel(this.emailUserInSesssion).subscribe(() => {                    
                        this.service.changeStateOfActivity(this.emailUserInSesssion).subscribe(() => {                    
                            this.service.changeActivity(this.emailUserInSesssion).subscribe(() => {                               
                            })
                        })
                    })
                })
                this.service.sumPuntos()
                Swal.fire({
                    title: 'Estamos calculando tu puntuación',
                    timer: 10000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                })
                setTimeout(() => {
                    Swal.fire({
                        title: 'Todas las respuestas están correctas',
                        text: 'Felicidades por aprender algo nuevo hoy ^.^',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#008000'
                    }).then((data) => {
                        if (data.isConfirmed) {
                            window.location.reload()
                        }
                    })
                }, 11500)
            }
            if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2 && respuestaCorrectaPregunta3 === undefined) {
                this.service.sumPuntosInBack(this.emailUserInSesssion).subscribe(() => {                                    
                    this.service.upgradeLevel(this.emailUserInSesssion).subscribe(() => {                    
                        this.service.changeStateOfActivity(this.emailUserInSesssion).subscribe(() => {                    
                            this.service.changeActivity(this.emailUserInSesssion).subscribe(() => {                               
                            })
                        })
                    })
                })
                this.service.sumPuntos()
                Swal.fire({
                    title: 'Estamos calculando tu puntuación',
                    timer: 10000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                })
                setTimeout(() => {
                    Swal.fire({
                        title: 'Todas las respuestas están correctas',
                        text: 'Felicidades por aprender algo nuevo hoy ^.^',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#008000'
                    }).then((data) => {
                        if (data.isConfirmed) {
                            window.location.reload()
                        }
                    })
                }, 11500)
            }
        }
        if (actividad.existeQuiz == false) {
            this.service.sumPuntosInBack(this.emailUserInSesssion).subscribe(() => {                                    
                this.service.upgradeLevel(this.emailUserInSesssion).subscribe(() => {                    
                    this.service.changeStateOfActivity(this.emailUserInSesssion).subscribe(() => {                    
                        this.service.changeActivity(this.emailUserInSesssion).subscribe(() => {                               
                        })
                    })
                })
            })
            this.service.sumPuntos()            
            Swal.fire({
                title: 'Estamos calculando tu puntuación',
                timer: 10000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            setTimeout(() => {
                Swal.fire({
                    title: 'Felicidades por aprender algo nuevo hoy ^.^',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                }).then((data) => {
                    if (data.isConfirmed) {
                        window.location.reload()
                    }
                })
            }, 11500)
        }
    }
}

