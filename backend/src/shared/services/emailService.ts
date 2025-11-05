import nodemailer, { SendMailOptions } from "nodemailer";
import path from "path";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import config from "../../config/index";

const {
  email_service: { host, port, secure, auth },
} = config;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth,
});

const templatesPath = path.resolve(__dirname, "../../templates");
const handlebarOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: templatesPath,
    defaultLayout: false,
  },
  viewPath: templatesPath,
};

transporter.use("compile", hbs(handlebarOptions));

export const sendMail = async (
  to: string,
  subject: string,
  template: string,
  context: unknown
) => {
  await transporter.sendMail({
    from: auth.user,
    to,
    subject,
    template,
    context,
  } as SendMailOptions);
};
