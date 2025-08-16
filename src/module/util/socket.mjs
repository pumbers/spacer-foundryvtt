import { SPACER } from "../system/config.mjs";

export default class CS5SocketHandler {
  constructor() {
    this.identifier = "system.spacer";
    this.registerSocketHandlers();
  }

  /**
   * Set up the system socket handlers
   */
  registerSocketHandlers() {
    console.info(WH.prefix, "Registering WH Socket Handlers");
    game.socket.on(this.identifier, ({ type, payload }) => {
      console.log("socket.on", type, payload);
      switch (type) {
        case "ACTION":
          this.#handleAction(payload);
          break;
        default:
          console.error(WH.prefix, "Unknown socket message type", type);
      }
    });
  }

  /**
   * Emits a socket message to all other clients
   * @param {String} type
   * @param {Object} payload
   */
  emit(type, payload) {
    return game.socket.emit(this.identifier, { type, payload });
  }

  #handleAction(payload) {
    console.log("handleAction()", payload);
  }
}
