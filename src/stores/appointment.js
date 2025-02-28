import { defineStore } from "pinia";

export const useAppointmentStore = defineStore("appointmentStore", {
  state: () => {
    return {
      appointments: [],
      errors: {},
    };
  },
  actions: {
    /******************* Get all appointments for a course *******************/
    async getAppointments(courseId) {
      const res = await fetch(`/api/courses/${courseId}/appointments`);
      const data = await res.json();
      
      if (res.ok) {
        this.appointments = data;
      } else {
        this.errors = data.errors || { general: "Hiba történt az időpontok betöltésekor." };
      }
    },
    

    /******************* Create an appointment *******************/
    async createAppointment(courseId, appointmentData) {
      const res = await fetch(`/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await res.json();
      if (res.ok) {
        this.appointments.push(data.appointment);
        this.router.push({ name: "services" });
        return { success: true, message: "Időpont sikeresen létrehozva!" };
      } else {
        this.errors = data.errors || { general: "Hiba történt az időpont létrehozása közben." };
        return { success: false, message: "Hiba történt az időpont létrehozása közben." };
      }
    },

    /******************* Delete an appointment *******************/
    async deleteAppointment(appointmentId) {
      const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
        return { success: true, message: "Időpont sikeresen törölve!" };
      } else {
        const data = await res.json();
        this.errors = data.errors || { general: "Hiba történt az időpont törlésénél." };
        return { success: false, message: "Hiba történt az időpont törlésénél." };
      }
    },
    /******************* Book an appointment *******************/
    async bookAppointment(appointmentId) {
      const res = await fetch(`/api/appointments/${appointmentId}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    
      const data = await res.json();
      if (res.ok) {
        // Frissítsük a lefoglalt időpontokat
        this.appointments = this.appointments.map(app => 
          app.id === appointmentId ? { ...app, user_id: data.appointment.user_id } : app
        );
        return { success: true, message: "Időpont sikeresen lefoglalva!" };
      } else {
        return { success: false, message: data.error || "Hiba történt az időpont foglalásánál." };
      }
    }
    
  },
});
