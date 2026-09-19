import { PaymentMethod, PaymentStatus } from 'src/domain/enums/payment.enum';

export class PaymentGateway {
  public proccessPayment(method: PaymentMethod, expirationDate?: string) {
    if (method === PaymentMethod.PIX) {
      return PaymentStatus.APROVADO;
    }

    if (expirationDate === undefined) {
      return PaymentStatus.RECUSADO;
    }

    const today = new Date();
    const todayFormat = today.toISOString().split('T')[0];
    if (expirationDate < todayFormat) {
      return PaymentStatus.RECUSADO;
    }
    return PaymentStatus.APROVADO;
  }
}
