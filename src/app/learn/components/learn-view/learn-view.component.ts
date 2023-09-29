import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { LearnService } from '../../services/learn.service';
import Swal from 'sweetalert2'


@Component({
    selector: 'app-learn-view',
    templateUrl: './learn-view.component.html',
    styleUrls: ['./learn-view.component.css']
})
export class LearnViewComponent implements OnInit {

    cursos = []

    listCursos: any = []

    userCourseActivity: any = []

    acabeCurso = true

    emailUserInSesssion: string;

    actividadFinalizada: boolean

    selectedOption1: number = 0
    selectedOption2: number = 0
    selectedOption3: number = 0

    constructor(private service: LearnService, private renderer: Renderer2, private el: ElementRef) {

    }


    ngOnInit(): void {

        this.emailUserInSesssion = sessionStorage.getItem('email')

        this.service.getUserCourseActivities(this.emailUserInSesssion).subscribe((data) => {
            this.userCourseActivity = data
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


    prueba(j) {
        var miCarrusel = document.getElementById('carouselPresentations' + j);
        console.log(miCarrusel.id);


        // Agrega un oyente de eventos al carrusel que se activa cuando se cambia de diapositiva
        miCarrusel?.addEventListener('slid.bs.carousel', () => {
            const activeItem = miCarrusel.querySelector('.carousel-item.active'); // Obtiene la diapositiva activa
            const items = miCarrusel.querySelectorAll('.carousel-item'); // Obtiene todas las diapositivas

            const lastIndex = items.length - 1;
            const currentIndex = Array.from(items).indexOf(activeItem);

            if (currentIndex === lastIndex) {
                // Estás mostrando el último elemento del carrusel
                this.acabeCurso = false
            }else{
                this.acabeCurso = true
            }
        });

    }

    sumPuntos(actividad: any) {
        // console.log('opcion escogida pregunta1',this.selectedOption1);
        // console.log('respuesta correcta pregunta1',respuestaCorrectaPregunta1);
        // console.log('opcion escogida pregunta2',this.selectedOption2);
        // console.log('respuesta correcta pregunta2',respuestaCorrectaPregunta2);
        // console.log('opcion escogida pregunta3',this.selectedOption3);
        // console.log('respuesta correcta pregunta3',respuestaCorrectaPregunta3);
        
        /* TODO: acomodar los condicionales ya que se debe evaluar en que estado viene el atributo contiene quiz del json ya que si esta en falso entonces no deberia 
        el ngmodel de las repsuestas de las actividades, mas si deberia sumar puntos. Pero si viene en true entonces deberia evaluar las respuestas y sumar puntos igualmente*/
        
        if (actividad.existeQuiz == true) {
            const respuestaCorrectaPregunta1 = actividad.quiz[0].respuestaCorrecta.toString()
            const respuestaCorrectaPregunta2 = actividad.quiz[1].respuestaCorrecta.toString()
            const respuestaCorrectaPregunta3 = actividad.quiz[2].respuestaCorrecta.toString()
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
            if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2 && this.selectedOption3 !== respuestaCorrectaPregunta3) {
                Swal.fire({
                    title: 'Upss!!',
                    icon: 'warning',
                    text: 'La respuesta en la pregunta 3 es incorrecta valida tu respuesta',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                })
            }
            if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2 && this.selectedOption3 === respuestaCorrectaPregunta3) {
                this.service.sumPuntosInBack(this.emailUserInSesssion).subscribe(()=>{
                    this.service.upgradeLevel(this.emailUserInSesssion).subscribe(()=>{
                        this.service.changeStateOfActivity(this.emailUserInSesssion).subscribe(()=>{
                            this.service.changeActivity(this.emailUserInSesssion).subscribe(()=>{
                                this.service.getUserCourseActivities(this.emailUserInSesssion).subscribe((data)=>{
                                    const listAct = data                            
                                    if (listAct[0].course_state === true) {
                                        this.service.upgradeCourse(this.emailUserInSesssion).subscribe()
                                    }
                                })
                            })
                        })
                    })
                })
                this.service.sumPuntos()
                Swal.fire({
                    title: 'Todas tus respuestas estan correctas >:D',
                    text:  'Felicidades por aprender algo nuevo hoy ^.^',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#008000'
                }).then((data)=>{
                    if (data.isConfirmed) {
                        window.location.reload()
                    }
                })
            }
        }
        if (actividad.existeQuiz == false) {
            console.log('entre por aca ya que el existeQuiz esta en false xd');

            this.service.sumPuntosInBack(this.emailUserInSesssion).subscribe(() => {
                this.service.upgradeLevel(this.emailUserInSesssion).subscribe(() => {
                    this.service.changeStateOfActivity(this.emailUserInSesssion).subscribe(() => {
                        this.service.changeActivity(this.emailUserInSesssion).subscribe(() => {
                            this.service.getUserCourseActivities(this.emailUserInSesssion).subscribe((data) => {
                                const listAct = data
                                if (listAct[0].course_state === true) {
                                    this.service.upgradeCourse(this.emailUserInSesssion).subscribe()
                                }
                            })
                        })
                    })
                })
            })
            this.service.sumPuntos()

            Swal.fire({
                title: 'Felicidades por aprender algo nuevo hoy ^.^',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#008000'
            }).then((data)=>{
                if (data.isConfirmed) {
                    window.location.reload()
                }
            })
        }
    }
}
