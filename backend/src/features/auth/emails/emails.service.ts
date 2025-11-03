import { ClientSession } from "mongoose";
import { Otp } from "../../../shared/models/Otp.ts";
import { User } from "../../../shared/models/User.ts";
import { Role } from "../../../shared/types/user/role.ts";
import { publisher } from "../../../queues/publisher.ts";
import { generateOtpCode } from "../../../shared/utils/generateOtpCode.ts";
import { ObjectId } from "mongodb";
import { OtpTypes } from "../../../shared/types/otp.types.ts";

interface OtpData {
  token: string;
  code: string;
  hashedCode: string;
  expiration: number;
}

export class EmailServices {
  private session: ClientSession;
  private email: string;
  private otp: Promise<OtpData>;

  constructor(session: ClientSession, email: string) {
    this.session = session;
    this.email = email;
    this.otp = generateOtpCode();
  }

  public findUser = async () => {
    const user = await User.findOne({ email: this.email });
    if (!user) throw new Error("User not found", { cause: 404 });
    return user;
  };

  public deleteOldOtps = async (userId: ObjectId): Promise<void> => {
    await Otp.deleteMany({ userId: userId }).session(this.session);
  };

  public createOtp = async (
    role: Role,
    userId: ObjectId
  ): Promise<OtpTypes> => {
    const { token, hashedCode, expiration } = await this.otp;

    const otp = new Otp({
      userId: userId,
      userModel: role,
      token,
      code: hashedCode,
      expiration,
    });
    await otp.save({ session: this.session });
    return otp;
  };

  public sendEmail = async (fullname: string): Promise<{ message: string }> => {
    const { code, token } = await this.otp;

    await publisher("emailQueue", {
      code,
      description:
        "NextHire hesabınız için şifre sıfırlama talebinde bulundunuz. Aşağıdaki doğrulama kodunu kullanarak yeni şifrenizi oluşturabilirsiniz. Kod kısa süreli geçerlidir.",
      token,
      fullname,
      email: this.email,
    });

    await this.session.commitTransaction();
    return { message: `Email sent to ${this.email}` };
  };
}
