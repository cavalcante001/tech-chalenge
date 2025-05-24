import { Module } from "@nestjs/common";
import { GenerateQrCode } from "src/orders/application/ports/order.generate-qrcode";
import { GatewayMercadoPago } from "./mercado-pago/adapter/generate.qrcode-adapter";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    providers: [
        {
            provide: GenerateQrCode,
            useClass: GatewayMercadoPago,
        },
    ],
    exports: [GenerateQrCode]
})
export class GatewayMercadoPagoModule {}