import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmingModalContent } from './confirming-modal-content';

@Component({
    selector: 'app-confirming-modal',
    templateUrl: './confirming-modal.component.html',
    styleUrls: ['./confirming-modal.component.scss']
})
export class ConfirmingModalComponent implements OnInit{
    @Input() openModalBtnText: string;
    @Input() openModalBtnClasses: string;

    @Input() modalTitle: string;
    @Input() modalContent: string;
    @Input() modalConfirmBtnText: string = 'Confirmar';
    @Input() modalCancelBtnText: string = 'Cancelar';

    @Output() messageEvent = new EventEmitter<boolean>();

    // modalConfirmBtnText="Confirmar";
    // modalCancelBtnText="Cancelar"

    constructor(
        public dialog: MatDialog
    ) { }

    ngOnInit() {
    }

    sendUserChoice(userChoice: boolean){
        this.messageEvent.emit(userChoice);
    }

    openModal() {
        let modal: ConfirmingModalContent = {
            title: this.modalTitle,
            content: this.modalContent,
            btnCancelText: this.modalCancelBtnText,
            btnOkText: this.modalConfirmBtnText
        };
        console.log(this.openModalBtnText)
        const dialogRef = this.dialog.open(ConfirmingModalContentComponent, {data: modal});

        let modalResult;
        dialogRef.afterClosed()
            .subscribe(
                result => {
                    modalResult = result;
                    console.log(modalResult);
                    this.messageEvent.emit(modalResult as boolean);
                }
            );
    }
}

@Component({
    selector: 'app-confirming-modal-content',
    templateUrl: './confirming-modal-content.component.html',
    styleUrls: ['./confirming-modal.component.scss']
})
export class ConfirmingModalContentComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public content: ConfirmingModalContent
    ){ }
}