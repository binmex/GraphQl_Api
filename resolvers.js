const Client = require("./models/model-client");
const Reservation = require("./models/model-reservation");
const { format } = require('date-fns');
const resolvers = {
  Query: {
    getAllClient: async () => {
      const data = await Client.find({}).populate("reservations");
      return data;
    },
    getClientByID: async (_, args) => {
      try {
        const id = args.id;
        const client = await Client.findOne({ id: id }).populate(
          "reservations"
        );
        return client;
      } catch (error) {
        throw new Error("Error al obtener el cliente: " + error.message);
      }
    },
    getAllReservations: async () => {
      try {
        const reservations = await Reservation.find({});
        const formattedReservations = reservations.map(reservation => ({
          id: reservation.id,
          bookingStartDate: format(new Date(reservation.bookingStartDate), 'yyyy-MM-dd'),
          bookingEndDate: format(new Date(reservation.bookingEndDate), 'yyyy-MM-dd'),
          service: reservation.service,
          comments: reservation.comments,
        }));
        return formattedReservations;
      } catch (error) {
        throw new Error("Error al obtener todas las reservas: " + error.message);
      }
    },
    getReservationById: async (_, args) => {
      try {
        const id = args.id;
        const reservation = await Reservation.findOne({ id: id });
        const formattedReservation = {
          id: reservation.id,
          bookingStartDate: format(new Date(reservation.bookingStartDate), 'yyyy-MM-dd'),
          bookingEndDate: format(new Date(reservation.bookingEndDate), 'yyyy-MM-dd'),
          service: reservation.service,
          comments: reservation.comments,
        };
        return formattedReservation;
      } catch (error) {
        throw new Error("Error al obtener la reserva: " + error.message);
      }
    },
  },
  Mutation: {
    createClient: async (_, args) => {
      try {
        const newClient = new Client(args);
        const data = await newClient.save();
        return data;
      } catch (error) {
        throw new Error("Error al crear el cliente: " + error.message);
      }
    },
    deleteClient: async (_, args) => {
      try {
        const { id } = args;
        const cliente = await Client.findOne({ id: id });
        if (!cliente) {
          throw new Error("Cliente no encontrado");
        }
        await Client.deleteOne({ _id: cliente._id });
        await Reservation.deleteMany({ client: cliente._id });
        return cliente;
      } catch (error) {
        throw new Error("Error al eliminar el cliente: " + error.message);
      }
    },
    updateClient: async (_, args) => {
      try {
        const { id, name, celphone, email } = args;
        // Buscar el cliente por su ID
        const cliente = await Client.findOne({ id: id });
        if (!cliente) {
          throw new Error("Cliente no encontrado");
        }
        // Actualizar los campos proporcionados
        if (name !== undefined) {
          cliente.name = name;
        }
        if (celphone !== undefined) {
          cliente.celphone = celphone;
        }
        if (email !== undefined) {
          cliente.email = email;
        }
        // Guardar los cambios
        await cliente.save();
        return cliente;
      } catch (error) {
        throw new Error("Error al actualizar el cliente: " + error.message);
      }
    },
    createReservation: async (_, args) => {
      try {
        const {
          id,
          bookingStartDate,
          bookingEndDate,
          service,
          comments,
          idClient,
        } = args;
        const client = await Client.findOne({ id: idClient });
        if (!client) {
          throw new Error("Cliente no encontrado");
        }
        const reservation = new Reservation({
          id,
          bookingStartDate,
          bookingEndDate,
          service,
          comments,
          client: client._id,
        });
        //console.log(reservation);
        await reservation.save();
        client.reservations.push(reservation); // Agregar reserva al cliente
        await client.save(); // Guardar el cliente actualizado
        return reservation;
      } catch (error) {
        throw new Error("Error al crear la reserva: " + error.message);
      }
    },
    deleteReservation: async (_, args) => {
      try {
        const { id } = args;
        const reservation = await Reservation.findOne({ id: id });
        if (!reservation) {
          throw new Error("Reserva no encontrada");
        }
        await Reservation.deleteOne({ _id: reservation._id });
        return reservation;
      } catch (error) {
        throw new Error("Error al eliminar la reserva: " + error.message);
      }
    },
    updateReservation: async (_, args) => {
      try {
        const { id, bookingStartDate, bookingEndDate, service, comments } =
          args;
        // Buscar la reserva por su ID
        const reservation = await Reservation.findOne({ id: id });
        if (!reservation) {
          throw new Error("Reserva no encontrada");
        }
        // Actualizar los campos proporcionados
        if (bookingStartDate !== undefined) {
          reservation.bookingStartDate = bookingStartDate;
        }
        if (bookingEndDate !== undefined) {
          reservation.bookingEndDate = bookingEndDate;
        }
        if (service !== undefined) {
          reservation.service = service;
        }
        if (comments !== undefined) {
          reservation.comments = comments;
        }
        // Guardar los cambios
        await reservation.save();
        return reservation;
      } catch (error) {
        throw new Error("Error al actualizar la reserva: " + error.message);
      }
    },
  },
};

module.exports = { resolvers };
