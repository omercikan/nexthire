package com.nexthire.notification.service;

import com.nexthire.notification.EmailTemplate;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public void send(String to, EmailTemplate template, Map<String, Object> variables) {
        String subject = resolveSubject(template);
        String htmlBody = renderTemplate(template, variables);

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new RuntimeException("Email gönderilemedi: " + to, e);
        }

    }

    private String renderTemplate(EmailTemplate template, Map<String, Object> variables) {
        Context context = new Context();
        context.setVariables(variables);

        String templateName = resolveTemplateName(template);
        return templateEngine.process(templateName, context);
    }

    private String resolveSubject(EmailTemplate template) {
        return switch (template) {
            case WELCOME -> "Hoş Geldiniz!";
            case OTP_VERIFICATION -> "Doğrulama Kodunuz";
            case PASSWORD_CHANGED -> "Şifreniz Değiştirildi";
        };
    }

    private String resolveTemplateName(EmailTemplate template) {
        return switch (template) {
            case OTP_VERIFICATION -> "otp-verification";
            case WELCOME -> "welcome";
            case PASSWORD_CHANGED -> "password-changed";
        };
    }
}
