import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ 
      theme: {
        preset: Aura
      }
    })
  ]
};

export const CODE = {

	// Healthcare
	"HEALTHCARE_DAILY_HAIRDRESS": "HA",												// Peluqueria
	"HEALTHCARE_DAILY_PODIATRIST": "PD",											// Podologo
	"HEALTHCARE_DAILY_DENTIST": "DE",													// Odontologo
	"HEALTHCARE_DAILY_AESTHETICS": "AE",											// Aesthetics
	"HEALTHCARE_MEDICINE_DOCTOR": "DR",												// Medico
	"HEALTHCARE_MEDICINE_ASSESSMENT": "AS",										// Valoracion Geriatrica
	"HEALTHCARE_MEDICINE_NURSING": "NU",											// Enfermeria
	"HEALTHCARE_MEDICINE_MEDICATION": "ME",										// Medicacion
	"HEALTHCARE_MEDICINE_PHARMACY": "PH",											// Farmacia
	"HEALTHCARE_BODY_REHABILITATION_ROOM": "RR",							// Sala Rehabilitacion
	"HEALTHCARE_BODY_ORTHOPEDICS": "HA",											// Ortopedia
	"HEALTHCARE_BODY_PHYSIOTERAPISTS": "PY",									// Fisioterapia
	"HEALTHCARE_MIND_OCUPATIONAL_THERAPY": "OT",							// Terapia Ocupacional
	"HEALTHCARE_MIND_ESCORT_SERVICE": "ES",										// Escort Service
	"HEALTHCARE_MIND_PSYCHOLOGIST": "PS",											// Psicologo
	"HEALTHCARE_MIND_COGNITIVE_ESTIMULATION": "CE",						// Estimulacion Cognitiva
	"HEALTHCARE_MIND_BRAIN_DAMAGE_UNIT": "BD",								// Unidad Dano Cerebral

	// Leisure
	"LEISURE_SELF_LIBRARY": "LI",															// Biblioteca
	"LEISURE_SELF_PRESS": "PR",																// Prensa Diaria
	"LEISURE_SELF_COMPUTER_ROOM": "CR",												// Coputer Room
	"LEISURE_SELF_CINEMA": "CI",															// Cinema
	"LEISURE_SELF_CHURCH": "CH",															// Iglesia
	"LEISURE_SELF_WIFI": "WI",																// WiFi
	"LEISURE_NATURE_GARDEN": "GA",														// Jardin			
	"LEISURE_NATURE_GREEN_HOUSE": "GH",												// Invernadero
	"LEISURE_NATURE_VEGETABLE_PATH": "VG",										// Huerto
	"LEISURE_EXERCISE_GYM": "GY",															// Gimnasio
	"LEISURE_EXERCISE_GYM_MONITOR": "GM",											// Monitor de Gimnasio
	"LEISURE_EXERCISE_SWIMMING_POOL": "PO",										// Piscina
	"LEISURE_SOCIALIZE_LIVING_ROOM": "LR",										// Sala de Estar y TV
	"LEISURE_SOCIALIZE_ACTIVITY_ROOM": "AR",									// Salas de Actividades
	"LEISURE_SOCIALIZE_COFEE_ROOM": "CR",											// Sala de Cafe
	"LEISURE_SOCIALIZE_GAMING_ROOM": "GR",										// Salon Recreativo
	"LEISURE_EXTERNAL_VISIT_ROOM": "VR",											// Sala de Visitas
	"LEISURE_EXTERNAL_PRIVATE_DINNING_ROOM": "DR"							// Comedor Privado
}