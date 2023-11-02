import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LearnService } from '../../services/learn.service';
import Swal from 'sweetalert2'
import { SweetAlertIcon } from 'sweetalert2';


@Component({
  selector: 'app-learn-view',
  templateUrl: './learn-view.component.html',
  styleUrls: ['./learn-view.component.css']
})
export class LearnViewComponent implements OnInit, AfterViewInit {

  cursos: any[] = []

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
    // TODO: Guardar la informacion de los cursos en el local storage para asi evitar que la pagina vuelva a recargar cada que cambia entre paginas
    this.emailUserInSesssion = sessionStorage.getItem('email')

    this.puntuacionInSession = sessionStorage.getItem('puntuacion')

    const input = document.getElementById('hiddenPrueba')
    if (this.puntuacionInSession === '0') {
      input?.click()
    }

    this.validateIfNeedToGetInformationAgain()

  }

  validateIfNeedToGetInformationAgain() {
    const listCoursesInLocalStorage = localStorage.getItem('dataGetListCourses');
    const activitiesOfCoursesInLocalStorage = localStorage.getItem('dataGetListActivitiesInCourses');
    const userCourseActivitiesInLocalStorage = localStorage.getItem('dataUserCourseActivities')

    /**
         * ! Se guardan las diferentes consultas que se traen de base de datos desde los subscribers, en el localStorage para asi ahorrar tiempo y memoria cada que el usuario
         * ! Quiera actualizar o cambiar de pagina dentro de la aplicacion
         * *Es importante aclarar que cada que el usuario termina una actividad, estos registros del localStorage se eliminan para asi forzar que se generen las consultas
         * *nuevamente y asi actualizar el estado de los logros y se desbloqueen las actividades de manera consecuente
         */

    if (!localStorage.getItem('dataGetListCourses') && !localStorage.getItem('dataGetListActivitiesInCourses')) {
      Swal.fire({
        title: 'Estamos recolectando tu información, espera un momento ^.^',
        timer: 6000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      this.service.getUserCourseActivities(this.emailUserInSesssion).subscribe((data) => {
        setTimeout(() => {
          this.userCourseActivity = data;
          this.evaluateIfCanPassCourse(data)
        }, 0)

        localStorage.setItem('dataUserCourseActivities', JSON.stringify(data));
        console.log(this.userCourseActivity);
      })
      this.service.getListaCursos().subscribe((data) => {
        setTimeout(() => {
          this.listCursos = data;
          localStorage.setItem('dataGetListCourses', JSON.stringify(data));
        }, 0);
      })
      this.service.getCurso().subscribe((data) => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            setTimeout(() => {
              this.cursos.push(data[key].activities);
              console.log(data[key].activities);
            }, 0);
          }
        }
        setTimeout(() => {
          localStorage.setItem('dataGetListActivitiesInCourses', JSON.stringify(this.cursos));
        }, 2000)
      })
    } else {
      /**
       * *Ya que al entrar al metodo valida si el localStorage estan vacios, al encontrarse llenos pasa directamente al else en donde asigna a cada arreglo
       * *el valor en modo objeto del contenido que tiene el localStorage esto se hace gracias al metodo JSON.parse(aca se ingresa cualquier objeto tipo json y lo vuelve un arreglo)
       */
      setTimeout(() => {
        this.listCursos = JSON.parse(listCoursesInLocalStorage);
        this.cursos = JSON.parse(activitiesOfCoursesInLocalStorage)
        this.userCourseActivity = JSON.parse(userCourseActivitiesInLocalStorage)
      }, 0)
    }



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

      this.validateAnswers(respuestaCorrectaPregunta1, respuestaCorrectaPregunta2, respuestaCorrectaPregunta3);

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
              localStorage.clear()
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
              localStorage.clear()
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
            localStorage.clear()
            window.location.reload()
          }
        })
      }, 11500)
    }
  }

  evaluateIfCanPassCourse(userCourseActivity: Object): void {
    console.log(userCourseActivity);
    if (userCourseActivity[0].course_state === true) {
      Swal.fire({
        title: 'Al parecer terminaste todas las actividades de este curso, estamos promoviendote al siguiente',
        timer: 10000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      this.service.upgradeCourse(this.emailUserInSesssion).subscribe();
      setTimeout(() => {
        Swal.fire({
          title: 'Fuiste promovido',
          text: 'Felicidades ^.^',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#008000'
        }).then((data) => {
          if (data.isConfirmed) {
            localStorage.clear()
            window.location.reload()
          }
        })
      }, 11500)
    }
  }


  showAlert(text: string, icon:SweetAlertIcon = 'warning' ,  title?: string): void {
    Swal.fire({
      title: 'Upss!!',
      icon: icon,
      text: text,
      confirmButtonText: 'Ok',
      confirmButtonColor: '#008000'
    });
  }

  validateAnswers(respuestaCorrectaPregunta1: number | undefined, respuestaCorrectaPregunta2: number | undefined, respuestaCorrectaPregunta3: number | undefined): void {
    if (respuestaCorrectaPregunta1 !== undefined && respuestaCorrectaPregunta2 !== undefined && respuestaCorrectaPregunta3 !== undefined) {
      if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2 && this.selectedOption3 === respuestaCorrectaPregunta3) {
        this.showAlert('La respuesta en la pregunta 1 esta incorrecta, revisa.');
      } else if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2 && this.selectedOption3 === respuestaCorrectaPregunta3) {
        this.showAlert('La respuesta en la pregunta 2 esta incorrecta, revisa.');
      } else if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2 && this.selectedOption3 !== respuestaCorrectaPregunta3) {
        this.showAlert('La respuesta en la pregunta 3 esta incorrecta, revisa.');
      } else if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2 && this.selectedOption3 === respuestaCorrectaPregunta3) {
        this.showAlert('Las respuestas en las preguntas 1 y 2 estan incorrectas, revisa');
      } else if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2 && this.selectedOption3 !== respuestaCorrectaPregunta3) {
        this.showAlert('Las respuestas en las preguntas 1 y 3 estan incorrectas, revisa');
      } else if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2 && this.selectedOption3 === respuestaCorrectaPregunta3) {
        this.showAlert('Las respuestas en las preguntas 2 y 3 estan incorrectas, revisa');
      } else if (this.selectedOption1 === 0 && this.selectedOption2 === 0 && this.selectedOption3 === 0) {
        this.showAlert('Debes seleccionar las respuestas correctas para terminar el quiz', 'error');
      } else if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2 && this.selectedOption3 !== respuestaCorrectaPregunta3) {
        this.showAlert('La respuesta en las 3 preguntas esta incorrecta, revisa');
      }
    }
    if (respuestaCorrectaPregunta1 !== undefined && respuestaCorrectaPregunta2 !== undefined && respuestaCorrectaPregunta3 === undefined) {
      if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 === respuestaCorrectaPregunta2) {
        this.showAlert('La respuesta en la pregunta 1 esta incorrecta, revisa.');
      } else if (this.selectedOption1 === respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2) {
        this.showAlert('La respuesta en la pregunta 2 esta incorrecta, revisa.');
      } else if (this.selectedOption1 === 0 && this.selectedOption2 === 0) {
        this.showAlert('Debes seleccionar las respuestas correctas para terminar el quiz', 'error');
      } else if (this.selectedOption1 !== respuestaCorrectaPregunta1 && this.selectedOption2 !== respuestaCorrectaPregunta2) {
        this.showAlert('La respuesta en ambas preguntas esta incorrecta, revisa.');
      }
    }

  }
}

