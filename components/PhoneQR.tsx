"use client";

import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

type PhoneQRProps = {
  className?: string;
};

const PhoneQR = ({ className }: PhoneQRProps) => {
  return (
    <QRCodeSVG
      value="tel:+17273205799"
      size={256}
      title="QR code to call (727) 320-5799"
      className={cn("h-auto w-full", className)}
    />
  );
};

export default PhoneQR;
