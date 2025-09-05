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

interface VerificationEmailProps {
  userName: string;
  verificationUrl: string;
}

const VerificationEmail = ({
  userName,
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Verify Your Email Address
              </Text>
              <Text className="text-[16px] text-gray-600 mt-[8px] m-0">
                Welcome! Please confirm your email to get started.
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hi {userName},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Thank you for signing up! To complete your registration and
                secure your account, please verify your email address by
                clicking the button below.
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={verificationUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border inline-block"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                If the button above doesn't work, you can copy and paste this
                link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all mb-[24px]">
                {verificationUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px]">
                This verification link will expire in 24 hours for security
                purposes. If you didn't create an account, you can safely ignore
                this email.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 leading-[16px] mb-[8px]">
                Need help? Contact our support team at support@yourcompany.com
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © 2025 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                123 Business Street, Dublin, Ireland
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
