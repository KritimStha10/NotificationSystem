"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
function consumeMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield amqplib_1.default.connect('amqp://localhost');
        const channel = yield connection.createChannel();
        yield channel.assertQueue('notifications');
        channel.consume('notifications', (msg) => __awaiter(this, void 0, void 0, function* () {
            if (msg) {
                const notification = JSON.parse(msg.content.toString());
                console.log(`Processing notification: ${notification.message}`);
                updateNotification(notification.id, 'processed');
                channel.ack(msg);
            }
        }));
    });
}
function updateNotification(id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Updating notification ${id} status to ${status}`);
    });
}
consumeMessages();
