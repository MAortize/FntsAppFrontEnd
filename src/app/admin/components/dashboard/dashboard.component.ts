import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  curso: FormGroup;
  cursoName: FormControl;
  cursoDesc: FormControl;
  acts: FormArray;
  actName: FormControl;
  dia: FormArray;
  contentDia1:FormControl;
  contentDia2:FormControl;
  contentDia3:FormControl;
  imgDia1: FormControl;
  imgDia2: FormControl;
  imgDia3: FormControl;
  cantActividades = 1
  

  nombreCurso: string = null


  cantDiapositivas = 1

  base64Output1 : string = ''
  base64Output2 : string = ''
  base64Output3 : string = ''

  img1: SafeResourceUrl


  act = []



  listaActividades = Array.apply("HOLA", Array(this.cantActividades))

  percentDone: number;
  uploadSuccess: boolean;


  cursos = []

  curso1 = [
    {

      "nombreActividad": "Que es una metodologia agil",
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.\n",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 3 valores clave de Agile son: \nLos individuos e interacciones están por encima de los procesos y herramientas \nUn software funcional tiene mayor prioridad que la documentación exhaustiva \nSe busca la colaboración con el cliente antes que la negociación de un contrato \nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true,
      "numeroPreguntas": 3,
      "quiz": [
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        }
      ]
    },
    {
      "nombreActividad": "Que es una metodologia agil22",
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología2 Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 4 valores clave de Agile son: \nLos individuos e interacciones están por encima de los procesos y herramientas \nUn software funcional tiene mayor prioridad que la documentación exhaustiva \nSe busca la colaboración con el cliente antes que la negociación de un contrato \nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true,
      "numeroPreguntas": 3,
      "quiz": [
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        }
      ]
    },
    {
      "nombreActividad": "Que es una metodologia agil33",
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 5 valores clave de Agile son: \\nLos individuos e interacciones están por encima de los procesos y herramientas \\nUn software funcional tiene mayor prioridad que la documentación exhaustiva \\nSe busca la colaboración con el cliente antes que la negociación de un contrato \\nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true,
      "numeroPreguntas": 3,
      "quiz": [
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        }
      ]
    },
    {
      "nombreActividad": "Que es una metodologia agil44",
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 6 valores clave de Agile son: \\nLos individuos e interacciones están por encima de los procesos y herramientas \\nUn software funcional tiene mayor prioridad que la documentación exhaustiva \\nSe busca la colaboración con el cliente antes que la negociación de un contrato \\nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true,
      "numeroPreguntas": 3,
      "quiz": [
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        }
      ]
    },
    {
      "nombreActividad": "Que es una metodologia agil44",
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 7 valores clave de Agile son: \\nLos individuos e interacciones están por encima de los procesos y herramientas \\nUn software funcional tiene mayor prioridad que la documentación exhaustiva \\nSe busca la colaboración con el cliente antes que la negociación de un contrato \\nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true,
      "numeroPreguntas": 3,
      "quiz": [
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        }
      ]
    },
  ]
  curso2 = [
    {

      "nombreActividad": "Que es una metodologia agil",
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 4 valores clave de Agile son: \\nLos individuos e interacciones están por encima de los procesos y herramientas \\nUn software funcional tiene mayor prioridad que la documentación exhaustiva \\nSe busca la colaboración con el cliente antes que la negociación de un contrato \\nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true,
      "numeroPreguntas": 3,
      "quiz": [
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        }
      ]
    },
    {
      "nombreActividad": "Que es una metodologia agil22",
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 4 valores clave de Agile son: \\nLos individuos e interacciones están por encima de los procesos y herramientas \\nUn software funcional tiene mayor prioridad que la documentación exhaustiva \\nSe busca la colaboración con el cliente antes que la negociación de un contrato \\nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true,
      "numeroPreguntas": 3,
      "quiz": [
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        }
      ]
    },
    {
      "nombreActividad": "Que es una metodologia agil33",
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 4 valores clave de Agile son: \\nLos individuos e interacciones están por encima de los procesos y herramientas \\nUn software funcional tiene mayor prioridad que la documentación exhaustiva \\nSe busca la colaboración con el cliente antes que la negociación de un contrato \\nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true,
      "numeroPreguntas": 3,
      "quiz": [
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        }
      ]
    },
    {
      "nombreActividad": "Que es una metodologia agil44",
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 4 valores clave de Agile son: \\nLos individuos e interacciones están por encima de los procesos y herramientas \\nUn software funcional tiene mayor prioridad que la documentación exhaustiva \\nSe busca la colaboración con el cliente antes que la negociación de un contrato \\nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true,
      "numeroPreguntas": 3,
      "quiz": [
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        },
        {
          "pregunta": "¿La metodología agile no se usa en proyectos de software, sólo en proyectos de alto rendimiento?",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png",
          "opcion1": "sisas",
          "opcion2": "nonas",
          "opcion3": "puede ser",
          "opcion4": "ni idea bro",
          "respuestaCorrecta": 2
        }
      ]
    }
  ]

  constructor(private fb: FormBuilder, private http: HttpClient, private sanitizer: DomSanitizer) {

    // console.log(this.listaActividades.length);
    // console.log(this.listaActividades);


  }

  ngOnInit() {


    this.cursoName = new FormControl('')
    this.cursoDesc = new FormControl('')
    this.actName = new FormControl('')
    // this.dia = new FormArray([new FormControl('')])
    // this.acts = new FormArray([this.actName=new FormControl('hola')])

    
    this.crearForm();

    this.cursos.push(this.curso1)
    this.cursos.push(this.curso2)
    this.cursos.push(this.curso2)
    this.cursos.push(this.curso2)
    console.log(this.cursos);    
    // console.log("Traje un curso",this.cursos[0]);

    // this.debug()

  }

  agrActividad(){
    

    let objtActividad = {
      "nombreActividad": 'a',
      "numeroDiapositivas": 3,
      "diapositivas": [
        {
          "contenido": "La metodología Agile se usa en el desarrollo de software y otros proyectos de alto rendimiento; se centra en la implementación rápida de un equipo eficiente y flexible para planear el flujo de trabajo. Agile brinda la capacidad de elegir la mejor opción en cada situación sin comprometer el proyecto.\n",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Los 3 valores clave de Agile son: \nLos individuos e interacciones están por encima de los procesos y herramientas \nUn software funcional tiene mayor prioridad que la documentación exhaustiva \nSe busca la colaboración con el cliente antes que la negociación de un contrato \nSe debe responder al cambio en lugar de seguir un plan fijo",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        },
        {
          "contenido": "Las iteraciones se basan en un flujo continuo de comentarios, pero en lugar de tratar de resolver todo en unas pocas actualizaciones, un equipo ejecuta fases más cortas en el ciclo de desarrollo para cubrir solo unas pocas actualizaciones. Esto con el fin de alcanzar un nivel elevado y constante de mejoras incrementales de calidad.",
          "imagen": "https://blog.hubspot.es/hubfs/media/metodologiaagile.png"
        }
      ],
      "existeQuiz": true
    }

    this.act.push(objtActividad)
    console.log(this.act);
    




  }

  


  crearForm() {
    
    this.curso = this.fb.group({
      cursoName: this.cursoName,
      cursoDesc: this.cursoDesc,
      activity: this.fb.array([])
      // actividades: this.acts,
      // actName: this.actName,
      // diapos: this.dia,
    })
    console.log(this.curso.get('activity'));
  }

  get activity(){
    return this.curso.get('activity') as FormArray;
  }

  getFileByBase64(){   

    this.img1 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.base64Output1}`);
    return this.img1
  }

  onFileSelected(event) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output1 = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }


  addActividades(cant: any) {
    this.activity.clear()
    for (let index = 0; index < cant; index++) {
      this.activity.push(this.fb.control(''))
    }
  }

  addDiapos() {
    for (let index = 0; index < 4; index++) {
      this.dia.push(this.fb.control(''))
    }
  }

  debug() {
    for (let curso = 0; curso < this.cursos.length; curso++) {
      console.log("soy el debug", this.cursos[curso]);
      const cursito = this.cursos[curso]
      for (let index = 0; index < cursito.length; index++) {
        const diapos = cursito[index];
        console.log("hnisese", diapos.diapositivas[0].contenido);


      }

    }
  }

  agregarCurso(nombreCurso: string) {
    // this.listNumbers1.push(nombreCurso)
  }

  drop($event: CdkDragDrop<string[]>) {

    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    }


  }

}
