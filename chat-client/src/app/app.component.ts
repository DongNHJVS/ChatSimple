import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChatsocketService } from './chatsocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {

  private nameUser: string;
  private nullName: boolean;
  private socket: any;
  private stringMessage: string;
  private arryMess: Message[] = [];
  title = 'chat-client';
  constructor(private chatsocketService: ChatsocketService) { }

  ngOnInit() {
    this.arryMess = [];
    this.socket = require('socket.io-client')('http://localhost:44444');
    if (this.nameUser === undefined || this.nameUser === '') {
      this.nullName = false;
    } else {
      this.nullName = true;
    }
    this.socket.on('connect', function() {
      if (this.nameUser === undefined || this.nameUser === '') {
        this.nullName = false;
      }
    });

    // Event listen message come
    this.socket.on('message', function(data) {
      const object = new Message(data.userName, data.message);
      if (this.arryMess === undefined) {
        this.arryMess = new Array();
      }
      this.arryMess.push(object);
      this.arryMess = this.arryMess.slice(0, 0);
      console.log(this.arryMess);
    });
    this.socket.on('disconnect', function() {});
  }

  // Lost focus on input name,
  // Lock and emit to server
  lostfocusName(): void {
    if (this.nameUser === undefined || this.nameUser === '') {
      this.nullName = false;
    } else {
      this.nullName = true;
      this.socket.emit('join', this.nameUser);
    }
  }

  // Send message to server
  sendMess(): void {
    if (this.stringMessage !== '' && this.stringMessage !== undefined) {
      const object = new Message(this.nameUser, this.stringMessage);
      this.socket.emit('sendMessage', object);
      this.stringMessage = '';
    }
  }

  public trackItem (mess: any) {
    return mess;
  }
}

class Message {
  message: string;
  userName: string;
  constructor(name, mess) {
    this.message = mess;
    this.userName = name;
  }
}
