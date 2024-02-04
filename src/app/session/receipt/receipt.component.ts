import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {OrderLine} from "../../models/classes/orderLine";
import {CurrencyPipe} from "@angular/common";
import html2canvas from "html2canvas";
import { jsPDF } from 'jspdf';
import {TranslateModule} from "@ngx-translate/core";
import {Coupon} from "../../models/classes/coupon";
import {BuyXGetY} from "../../models/classes/buyXGetY";

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    CurrencyPipe,
    TranslateModule
  ],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss'
})
export class ReceiptComponent implements OnInit{
  lines:OrderLine[];
  discounts : (Coupon | BuyXGetY)[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ReceiptComponent>) {

  }
  ngOnInit(): void {
    this.lines = this.data.order.lines;
    this.discounts = this.data.discounts;
  }

download() {
  const element = document.getElementById('receipt'); // Ensure your receipt has this ID

  // Set the width of the element explicitly if needed
  html2canvas(element, {
    scrollY: -window.scrollY,
    windowWidth: element.offsetWidth, // Set the width of the window for html2canvas to match the element
    width: element.offsetWidth, // Ensure the canvas captures the full width of the element
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Calculate the height based on the canvas width/height ratio

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('receipt.pdf');
  });
}
}
