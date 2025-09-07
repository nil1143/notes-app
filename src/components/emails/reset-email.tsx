import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
  requestTime: string;
}

const PasswordResetEmail = ({
  userName,
  resetUrl,
}: PasswordResetEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Reset Your Password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hello,
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                We received a request to reset the password for your account
                associated with <strong>{userName}</strong>.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Click the button below to create a new password. This link will
                expire in 24 hours for security reasons.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={resetUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>

              <Text className="text-[14px] text-blue-600 leading-[20px] mb-[24px] break-all">
                {resetUrl}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Security Notice */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px]">
                <strong>Security Notice:</strong>
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                • If you didn&apos;t request this password reset, please ignore
                this email
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                • This link will expire in 24 hours
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                • For security, this request was made from IP address and
                timestamp are logged
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px]">
                If you&apos;re having trouble or didn&apos;t request this reset,
                please contact our support team immediately.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                This email was sent to {userName}
              </Text>

              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                Your Company Name, 123 Business Street, Dublin, Ireland
              </Text>

              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © 2025 Your Company Name. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
