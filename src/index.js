class Validator {
   #validators;
   #enabled;
   #mode;
 
   constructor(validators, config = { mode: "single" }) {
     this.#validators = validators;
     this.#enabled = true;
     this.#mode = config.mode;
   }
 
   enable() {
     this.#enabled = true;
   }
 
   disable() {
     this.#enabled = false;
   }
 
   toggle(state) {
     if (typeof state === "boolean") {
       this.#enabled = state;
     } else {
       this.#enabled = !this.#enabled;
     }
   }
 
   get enabled() {
     return this.#enabled;
   }
 
   validate(value) {
     if (!this.#enabled) {
       return null;
     }
 
     let errors = {};
 
     for (let validator of this.#validators) {
       const error = validator(value);
 
       if (error !== null) {
         errors = { ...errors, ...error };
 
         if (this.#mode === "single") {
           break;
         }
       }
     }
 
     return Object.keys(errors).length > 0 ? errors : null;
   }
 }
