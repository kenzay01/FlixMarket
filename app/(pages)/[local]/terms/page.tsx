"use client";

import { useParams } from "next/navigation";

export default function TermsPage() {
  const params = useParams();
  const locale = (params.local as "en" | "de" | "ua" | "cz") || "en";

  const translations = {
    en: {
      pageTitle: "Terms and Conditions",
      paymentTitle: "Payment and delivery",
      termsTitle: "Terms and Conditions",
      serviceProvided:
        "The service is provided to the buyer within 24 hours after payment.",
      goodsSent: "Goods are sent to WhatsApp/Telegram messengers or by email.",
      payment:
        "Payment is possible on the website by card/Apple Pay or Google Pay.",
      refundTitle: "Refund policy",
      refundPolicy:
        "Refunds are only possible if the service cannot be connected. For other reasons, the return of a digital product is not possible.",
      contactTitle: "Contact information",
      storeName: 'Online store "Easy Play"',
      tin: "TIN: 3736606793",
      address: "Kherson, Forshtadska Street 26",
      phone: "Phone number: 0954638612",
      email: "Email: easyplaysup@fsubs.info",
      terms: {
        welcome: {
          title: "1. Welcome",
          content: [
            "1.1 EasyPlay is a platform that allows users to purchase group subscriptions to various services at a lower cost. Payment processing is carried out through our website easyplayy.com.",
          ],
        },
        warnings: {
          title:
            "2. Important Warnings About Sharing Access to Online Services",
          content: [
            "2.1 The EasyPlay team will ask you to confirm that you have read and comply with the Terms of Use applicable to the online service you wish to use.",
            "2.2 You are responsible for complying with the applicable Terms of Use. We will not be liable to you for any losses you may incur if you are blocked from accessing an online service due to your failure to comply with its Terms of Use or using the platform in a way that may violate those terms.",
            "2.3 The platform may immediately suspend or terminate your access if we suspect that you are using an online service in violation of its terms.",
          ],
        },
        relationship: {
          title: "3. Relationship with the Platform",
          content: [
            "3.1 This document outlines the rules governing your relationship with us. It is important that you read and understand these Terms before using the EasyPlay platform.",
            "3.2 By accessing or using the EasyPlay platform, you agree to these Terms of Use. If you do not agree, please do not use EasyPlay.",
          ],
        },
        personalInfo: {
          title: "4. Personal Information",
          content: [
            "4.1 Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and share your information.",
          ],
        },
        access: {
          title: "5. Access to the EasyPlay Platform",
          content: [
            "5.1 You must be at least 18 years old and legally able to enter into a public offer agreement in your country of residence to use the EasyPlay platform.",
          ],
        },
        rights: {
          title: "6. Right to Use the EasyPlay Platform",
          content: [
            "6.1 All materials and content on EasyPlay belong exclusively to the platform or its trusted licensors. You are granted a license to use this content only as permitted under these Terms.",
            "6.2 Your right to use EasyPlay is personal and non-transferable.",
            "6.3 You agree not to:",
            " • 6.3.1 Copy any part of EasyPlay;",
            " • 6.3.2 Sell or share any part of EasyPlay with others;",
            " • 6.3.3 Modify any part of EasyPlay in any way;",
            " • 6.3.4 Access any part of EasyPlay’s code not publicly shared.",
            "6.4 All confidential information, copyrights, and intellectual property rights belong solely to EasyPlay or licensed third parties.",
            "6.5 You agree that you have no rights to any part of the platform beyond the right to use it according to these Terms.",
          ],
        },
        paymentSystem: {
          title: "7. Payment System",
          content: [
            "7.1 By continuing to use EasyPlay, you agree to abide by MonoBank’s service agreement. You consent to provide accurate, complete information and allow the use of your data and transaction information.",
          ],
        },
        fees: {
          title: "8. Fees and Payments",
          content: [
            "8.1 When subscribing, you must provide valid, current, and complete credit or debit card details. By purchasing a subscription, you authorize the platform to charge your card and confirm the accuracy of your data.",
            "8.2 You are responsible for keeping your payment details up to date in your personal account.",
          ],
        },
        refunds: {
          title: "9. Refunds",
          content: [
            "9.1 Eligibility for refunds is at EasyPlay’s discretion based on available information.",
            "9.2 Refunds are issued to the original card used for payment.",
          ],
        },
        yourContent: {
          title: "10. Your Content",
          content: [
            "10.1 You confirm that any content (text, images, public comments) you upload complies with these Terms.",
            "10.2 We do not claim ownership of your content, but you grant us a worldwide, non-exclusive, royalty-free, perpetual license to use, copy, reproduce, distribute, modify, and share your content for EasyPlay services.",
            "10.3 You must ensure you have the rights to share any third-party content included in your user content.",
            "10.4 By providing feedback, you agree to let us use it without restriction or compensation.",
            "10.5 Our rights to your content do not affect your privacy rights. Please review our Privacy Policy.",
          ],
        },
        acceptableUse: {
          title: "11. Acceptable Use Policy",
          content: [
            "11.1 This section outlines specific rules for using EasyPlay.",
            "11.2 You may not:",
            " • 11.2.1 Bypass or interfere with security features;",
            " • 11.2.2 Violate these Terms;",
            " • 11.2.3 Use the platform if suspended or banned;",
            " • 11.2.4 Promote or advertise on the platform;",
            " • 11.2.5 Send unsolicited marketing messages;",
            " • 11.2.6 Modify or hack the platform;",
            " • 11.2.7 Introduce malware or harmful materials;",
            " • 11.2.8 Collect data in violation of these Terms;",
            " • 11.2.9 Post content you don’t own or violate third-party rights;",
            " • 11.2.10 Use automated systems to overwhelm the platform.",
            "11.3 Breaching the Terms may lead to:",
            " • 11.3.1 Immediate or permanent suspension;",
            " • 11.3.2 A warning.",
            "11.4 This list is not exhaustive, and other actions may be taken.",
          ],
        },
        takedown: {
          title: "12. Takedown Policy",
          content: [
            "12.1 If you believe any content violates your rights, contact our support via email (easyplaysup@fsubs.info), Telegram, or your personal account. Include:",
            " • 12.1.1 Your name and contact details;",
            " • 12.1.2 A detailed explanation of the violation;",
            " • 12.1.3 A link or identifier of the content in question.",
            "12.2 We will respond within 24 hours with the intended action.",
          ],
        },
        termination: {
          title: "13. Termination",
          content: [
            "13.1 If you disagree with these Terms or future changes, stop using the service immediately.",
            "13.2 To close your account, contact support at easyplaysup@fsubs.info or via Telegram.",
            "13.3 We may immediately terminate your access if you violate these Terms or other key rules.",
            "13.4 Services may also be discontinued with prior notice.",
          ],
        },
        liability: {
          title: "14. Platform Liability",
          content: [
            "14.1 While we strive for high standards, some functions depend on third-party networks.",
            "14.2 EasyPlay is not responsible for third-party content or service access issues, including:",
            " • 14.2.1 User actions (e.g., payment failures or violations);",
            " • 14.2.2 Service unavailability.",
            "14.3 EasyPlay is provided “as is” and “as available.” We do not guarantee uninterrupted, error-free service.",
            "14.4 In case of a claim, liability will not exceed the administrative fees you paid in the last 12 months. If no payment was made, we bear no liability.",
            "14.5 We are not liable for unforeseeable damages or those caused by your breach of the Terms.",
          ],
        },
        disputes: {
          title: "15. Dispute Resolution",
          content: [
            "15.1 If a dispute arises, contact us via email or Telegram to attempt informal resolution.",
            "15.2 If that fails, we will work with you to find the best resolution method.",
          ],
        },
        platformChanges: {
          title: "16. Platform Changes",
          content: [
            "16.1 We regularly update and improve EasyPlay to add new features and services.",
            "16.2 Updates may change features or content and can result in data or content being reset or deleted.",
            "16.3 By continuing to use the platform after updates, you agree to the changes. You may stop using the service at any time.",
          ],
        },
        termsChanges: {
          title: "17. Changes to Terms",
          content: [
            "17.1 These Terms may be updated occasionally, with the latest version always available on this page.",
            "17.2 Changes may occur due to new features, legal updates, or clarifications.",
            "17.3 We aim to notify users before changes take effect, but immediate changes may occur without notice.",
          ],
        },
        agreement: {
          title: "18. Legal Agreement",
          content: [
            "18.1 These Terms constitute the full agreement between you and EasyPlay.",
            "18.2 If any part is unenforceable, the remainder still applies.",
            "18.3 If EasyPlay doesn’t act immediately in case of a breach, it retains the right to act later.",
          ],
        },
        contact: {
          title: "19. Contact",
          content: [
            "19.1 For inquiries related to these Terms, contact us at easyplaysup@fsubs.info.",
          ],
        },
      },
      privacyPolicy: {
        title: "Privacy Policy",
        intro: [
          "The EasyPlay service team prioritizes the security of user data. We strictly adhere to this Privacy Policy to ensure you don’t have to worry about what happens to your personal information provided to the platform during registration.",
          "By registering on the EasyPlay platform, you consent to the processing of all data entered for registration purposes to properly provide services in accordance with the Public Offer.",
          "By registering on the platform, you also confirm that you have reviewed your rights as a data subject under Article 8 of the Ukrainian Law 'On Personal Data Protection'. This document is available at: http://zakon2.rada.gov.ua/laws/show/2297-17.",
        ],
        sections: {
          collection: {
            title: "1. Collection of Personal Information",
            content: [
              "1.1 During registration on the EasyPlay platform, we ask you to provide the necessary personal information to the extent required for the full provision of services. If necessary, the platform reserves the right to request additional personal information.",
              "1.2 Our team may collect information about your visits to the EasyPlay platform, such as your IP address, browser type and language, and the date and time of the request.",
              "1.3 Some services offered by the EasyPlay platform are linked to other websites. Personal information provided by such websites may be transferred to us for service provision. The platform also processes such information in accordance with this Privacy Policy.",
              "1.4 This document guarantees that anonymous reviews left on our website remain fully confidential and will not be accessible to third parties, including other platform users.",
              "1.5 The EasyPlay platform may process personal information on servers in Ukraine as well as in other countries.",
            ],
          },
          access: {
            title: "2. Access to Information",
            content: [
              "2.1 Your personal information may be shared with third parties only under the following circumstances:",
              "2.1.1 You have personally given consent for this. Your explicit consent is required for the transfer of any sensitive information.",
              "2.1.2 To comply with Ukrainian legislation, including providing information upon request from individuals, legal entities, institutions, organizations of any ownership form, or government bodies authorized to receive such information under Ukrainian law.",
              "2.1.3 To investigate potential violations of the Public Offer, which may involve providing information about you in response to a duly submitted legal request regarding violations.",
              "2.1.4 To detect and prevent fraudulent activities, as well as to address security issues and resolve technical problems.",
            ],
          },
          protection: {
            title: "3. Protection of Information",
            content: [
              "3.1 The EasyPlay team takes all necessary measures to protect your data from unauthorized access. These measures include internal reviews of data collection, storage, and processing processes, as well as security measures to prevent unauthorized access.",
            ],
          },
          modification: {
            title: "4. Access to and Modification of Personal Information",
            content: [
              "4.1 The EasyPlay platform makes every effort to provide you with access to your personal data, allowing you to make changes if the data is incorrect or to delete it upon your request. Before processing such requests, we ask users to verify their identity and specify the information they wish to access, modify, or delete.",
            ],
          },
          changes: {
            title: "5. Changes to This Privacy Policy",
            content: [
              "5.1 This Privacy Policy may be updated periodically. Changes to the Privacy Policy will be published on this page.",
            ],
          },
        },
      },
    },
    ua: {
      pageTitle: "Правила і умови",
      paymentTitle: "Оплата і доставка",
      termsTitle: "Правила і умови",
      serviceProvided:
        "Послуга надається покупцеві протягом 24 годин після оплати.",
      goodsSent:
        "Товари відправляються у меседжери WhatsApp/Telegram або на електронну пошту.",
      payment: "Оплата можлива на сайті карткою/Apple Pay або Google Pay.",
      refundTitle: "Політика повернення коштів",
      refundPolicy:
        "Повернення коштів можливе тільки за умови неможливості підключення послуги. По іншим причинам повернення цифрового товару неможливе.",
      contactTitle: "Контактна інформація",
      storeName: 'Інтернет-магазин "Easy Play"',
      tin: "ІПН: 3736606793",
      address: "м. Херсон, вул Форштадська 26",
      phone: "Номер телефону: 0954638612",
      email: "Електронна пошта: easyplaysup@fsubs.info",
      terms: {
        welcome: {
          title: "1. Ласкаво просимо",
          content: [
            "1.1 EasyPlay є платформою, яка дає змогу користувачам купувати групові підписки на різні сервіси дешевше. Організація платежів проходить через наш веб-сайт easyplayy.com.",
          ],
        },
        warnings: {
          title:
            "2. Важливі попередження про спільний доступ до онлайн-сервісів",
          content: [
            "2.1 Команда EasyPlay попросить Вас підтвердити, що Ви прочитали та дотримуєтесь Умов користування, застосовних до онлайн-сервісу, яким Ви хочете користуватися.",
            "2.2 Ви несете відповідальність за дотримання застосовних Умов користування. Ми не нестимемо відповідальності перед Вами за будь-які збитки, яких Ви можете зазнати, якщо Вам буде заблоковано доступ до будь-якого онлайн-сервісу через те, що Ви не дотримувалися Умов користування або використовували платформу таким чином, що може порушувати Умови користування.",
            "2.3 Платформа може негайно призупинити або припинити Ваш доступ, якщо ми запідозримо, що Ви використовуєте онлайн-сервіс з порушенням умов цього сервісу.",
          ],
        },
        relationship: {
          title: "3. Взаємовідносини з платформою",
          content: [
            "3.1 Документ Умов користування визначає правила Ваших стосунків з нами. Важливо, щоб Ви прочитали та зрозуміли умови надання послуг перш, ніж почнете користуватися платформою EasyPlay.",
            "3.2 Використовуючи та отримуючи доступ до платформи EasyPlay, Ви погоджуєтеся з цими Умовами користування. Якщо Ви не згодні з цими Умовами користування, будь ласка, не використовуйте платформу EasyPlay.",
          ],
        },
        personalInfo: {
          title: "4. Особиста інформація",
          content: [
            "4.1 Ваша конфіденційність важлива для нас. Будь ласка, ознайомтеся з нашою Політикою конфіденційності, щоб зрозуміти як ми збираємо, використовуємо та передаємо інформацію про Вас.",
          ],
        },
        access: {
          title: "5. Доступ до платформи EasyPlay",
          content: [
            "5.1 Вам має бути щонайменше 18 років, і Ви маєте бути в змозі укласти Публічну оферту про використання платформи EasyPlay у країні свого проживання.",
          ],
        },
        rights: {
          title: "6. Право на використання платформи EasyPlay",
          content: [
            "6.1 Матеріали та контент, що входять до складу EasyPlay, належать виключно платформі або довіреним ліцензіарам. Вам надається дозвіл на використання цих матеріалів і контенту тільки відповідно до цих Умов користування.",
            "6.2 Ваше право на використання платформи EasyPlay належить тільки Вам. Ви не можете передавати Ваш акаунт у користування іншим особам.",
            "6.3 Ви погоджуєтеся:",
            "6.3.1 не копіювати будь-яку частину платформи EasyPlay;",
            "6.3.2 не продавати і не надавати будь-яку частину платформи EasyPlay будь-кому ще;",
            "6.3.3 не намагатися будь-яким чином змінити будь-яку частину платформи EasyPlay;",
            "6.3.4 не шукати і не отримувати доступ до коду будь-якої частини платформи EasyPlay, який ми не опублікували для загального користування.",
            "6.4 Ви погоджуєтеся з тим, що вся конфіденційна інформація, авторські права та інші права на інтелектуальну власність EasyPlay належать тільки платформі або людям, які передали платформі ці права за ліцензією.",
            "6.5 Ви погоджуєтеся з тим, що у Вас немає ніяких прав щодо будь-якої частини платформи EasyPlay, крім права на її використання відповідно до цих Умов користування.",
          ],
        },
        paymentSystem: {
          title: "7. Платіжна система",
          content: [
            "7.1 Продовжуючи використовувати платформу EasyPlay, Ви зобов'язуєтесь дотримуватися угоди про надання послуг MonoBank. В якості умов для використання сервісів обробки платежів за допомогою MonoBank, Ви погоджуєтеся надати коректну і повну інформацію про Вас, дозволяєте використання цієї інформації, а також дозволяєте використання інформації про транзакції.",
          ],
        },
        fees: {
          title: "8. Збори та оплата",
          content: [
            "8.1 Коли Ви виконаєте дію підключення підписки, платформа попросить Вас надати дійсні, актуальні та повні дані кредитної або дебетової картки. Купуючи підписку, Ви дозволяєте платформі стягувати з Вашої кредитної або дебетової картки відповідну суму, і, цим підтверджуєте, що надані Вами дані є коректними та повними, і що Ви будете використовувати обраний спосіб оплати.",
            "8.2 Ви повинні відстежувати актуальність своїх платіжних реквізитів в Особистому кабінеті та за необхідності вчасно оновлювати їх.",
          ],
        },
        refunds: {
          title: "9. Повернення коштів",
          content: [
            "9.1 Застосовність і законність права на відшкодування плати за послуги залишаються на розсуд платформи EasyPlay на підставі доступної інформації.",
            "9.2 Повернення коштів здійснюється шляхом зарахування суми на банківську картку, з якої здійснювалася оплата.",
          ],
        },
        yourContent: {
          title: "10. Ваш контент",
          content: [
            "10.1aim ownership of your content, but you grant us a worldwide, non-exclusive, royalty-free, perpetual license to use, copy, reproduce, distribute, modify, and share your content for EasyPlay services.",
            "10.3 You must ensure you have the rights to share any third-party content included in your user content.",
            "10.4 By providing feedback, you agree to let us use it without restriction or compensation.",
            "10.5 Our rights to your content do not affect your privacy rights. Please review our Privacy Policy.",
          ],
        },
        acceptableUse: {
          title: "11. Правила допустимого використання",
          content: [
            "11.1 На додаток до інших вимог цих Умов користування в цьому розділі описуються конкретні правила, які застосовуються до використання Вами платформи EasyPlay.",
            "11.2 При використанні послуг EasyPlay забороняється:",
            "11.2.1 обходити, відключати або іншим чином втручатися в будь-які пов'язані з безпекою платформи функції;",
            "11.2.2 порушувати, намагатися порушити або сприяти порушенню будь-яких Умов користування;",
            "11.2.3 використовувати платформу EasyPlay, якщо ми призупинили або заборонили Вам її використання;",
            "11.2.4 просувати або рекламувати будь-які товари або послуги на платформі EasyPlay;",
            "11.2.5 відправляти будь-які незапитувані маркетингові повідомлення через платформу EasyPlay;",
            "11.2.6 модифікувати, втручатися, перехоплювати, порушувати або зламувати платформу EasyPlay;",
            "11.2.7 неправомірно використовувати платформу EasyPlay, свідомо впроваджуючи віруси, трояни, черв'яки або інші матеріали, що можуть завдати шкоди платформі EasyPlay або будь-якому користувачеві платформи EasyPlay;",
            "11.2.8 збирати будь-які дані платформи EasyPlay, окрім як відповідно до цих Умов користування;",
            "11.2.9 надсилати або розміщувати будь-який Користувацький контент, яким Ви не володієте або не маєте права використовувати, або іншим чином порушувати авторські права, товарні знаки або інші права третіх осіб;",
            "11.2.10 використовувати будь-яку автоматизовану систему для доступу до платформи EasyPlay таким чином, що сама система відправляє на платформу EasyPlay більше повідомлень із запитами, ніж людина може розумно надіслати за той самий період часу.",
            "11.3 Недотримання Умов користування являє собою серйозне порушення і може призвести до того, що платформою EasyPlay будуть зроблені всі або будь-які з наступних дій (з повідомленням або без нього):",
            "11.3.1 негайне, тимчасове або постійне відкликання Вашого права на використання платформи EasyPlay;",
            "11.3.2 винесення Вам попередження.",
            "11.4 Список варіантів, представлений у пункті 11.3, є неповним, і платформа можемо вжити будь-які інші дії, які вважатиме доцільними.",
          ],
        },
        takedown: {
          title: "12. Політика повідомлення та видалення",
          content: [
            "12.1 Якщо будь-який контент платформи EasyPlay порушує Ваші права, Ви можете зв'язатися з технічною підтримкою, надіславши нам повідомлення. Повідомлення про порушення слід надіслати електронною поштою на адресу easyplaysup@fsubs.info, в Телеграм-аккаунт , або технічній підтримці в особистому кабінеті. У повідомленні про порушення вкажіть таку інформацію:",
            "12.1.1 Ваше ім'я та контактні дані;",
            "12.1.2 заяву з досить докладним поясненням, чому Ви вважаєте, що контент, доступний через платформу EasyPlay, порушує Ваші права або не відповідає нашим Умовам користування;",
            "12.1.3 посилання або інші засоби ідентифікації проблемного контенту.",
            "12.2 Платформа зробить дію, яку вважатиме доцільною, залежно від характеру порушення, і відповість Вам протягом 24 годин про дію, яку передбачається зробити.",
          ],
        },
        termination: {
          title: "13. Завершення наших відносин",
          content: [
            "13.1 Якщо в будь-який момент Ви усвідомлюєте, що не можете погодитися з цими Умовами користування або будь-якими змінами, внесеними до Умов користування платформи EasyPlay, Ви повинні негайно припинити використання послуг, що надаються EasyPlay.",
            "13.2 Ви зобов'язані повідомити технічну підтримку платформи EasyPlay, якщо бажаєте закрити свій обліковий запис, зв'язавшись з нами за електронною адресою easyplaysup@fsubs.info, в Телеграм-акаунті, тоді ми зможемо припинити використання Вами платформи EasyPlay.",
            "13.3 Технічна підтримка може негайно припинити використання Вами платформи EasyPlay, якщо Ви порушите Умови користування, а також будь-які інші важливі правила або умови, що встановлені для доступу та використання платформи EasyPlay.",
            "13.4 Технічна підтримка також може відкликати надання послуг платформи EasyPlay, після попереднього повідомлення.",
          ],
        },
        liability: {
          title: "14. Відповідальність платформи перед Вами",
          content: [
            "14.1 Незважаючи на те, що ми робимо все можливе, щоб функції платформи EasyPlay відповідали необхідному стандарту, деякі функції можуть залежати від мереж і з'єднань, що знаходяться поза нашим контролем. Деяка інформація, що надається Вам на платформі EasyPlay, може також містити контент, що належить третім сторонам. Оскільки платформа EasyPlay не володіє і не виробляє сторонній контент, вона не може нести за нього жодної відповідальності.",
            "14.2 Платформа EasyPlay також не несе відповідальності перед Вами за продуктивність або контент, доступний в будь-якому онлайн-сервісі, до якого Ви звертаєтеся, або за будь-які проблеми, з якими Ви стикаєтеся під час доступу до онлайн-сервісу, зокрема внаслідок таких випадків:",
            "14.2.1 все, зроблене Вами або іншим користувачем (наприклад, несплата абонентської плати або порушення Правил спільного доступу);",
            "14.2.2 недоступність онлайн-сервісу;",
            "14.3 Через технології та особливості мережі Інтернет, послуги EasyPlay надаються на умовах 'як доступно' і 'як є'. Це означає, що ми не можемо обіцяти, що використання Вами платформи EasyPlay буде безперебійним, без затримок, безпомилковим або виправдає Ваші очікування, ми не беремо на себе ніяких зобов'язань щодо продуктивності або доступності платформи EasyPlay в цих Умовах користування, а також виключаємо будь-які зобов'язання, які можуть матися на увазі законом.",
            "14.4 У разі претензії, що виникає у зв'язку з наданням послуг EasyPlay, відповідальність платформи перед Вами ніколи не перевищуватиме Адміністративні збори, які Ви сплатили платформі протягом 12 місяців до виникнення претензії, і в разі, якщо Ви не сплатили жодних грошових коштів, платформа не несе перед Вами жодної відповідальності.",
            "14.5 Платформа EasyPlay також ніколи не буде нести відповідальність за будь-які збитки або шкоду, які неможливо передбачити з розумної точки зору або які викликані недотриманням Вами цих Умов користування.",
          ],
        },
        disputes: {
          title: "15. Вирішення спорів",
          content: [
            "15.1 Якщо у Вас виникла суперечка, пов'язана з платформою EasyPlay, Ви можете зв'язатися з нами за електронною адресою easyplaysup@fsubs.info, в Телеграм-акаунті, ,спробуйте при цьому вирішити суперечку з нами неофіційним шляхом.",
            "15.2 У тому малоймовірному випадку, якщо Вам і платформі EasyPlay не вдасться розв'язати спір неофіційним шляхом, ми зобов'язуємося обговорити й узгодити з Вами найефективніший спосіб вирішення спору.",
          ],
        },
        platformChanges: {
          title: "16. Зміни на платформі EasyPlay",
          content: [
            "16.1 Наші фахівці постійно оновлюють і покращують платформу EasyPlay для того, щоб спробувати знайти способи надати Вам нові функції та послуги. Також на постійній основі вносяться поліпшення та оновлення, що відображають мінливі технології, смаки, поведінку, і те, як люди використовують мережу Інтернет і послуги EasyPlay.",
            "16.2 Для внесення змін платформі EasyPlay може знадобитися оновити, скинути, припинити пропонувати та/або підтримувати певну частину платформи EasyPlay або функції, пов'язані з платформою EasyPlay. Ці зміни на платформі EasyPlay можуть вплинути на Ваші попередні дії, певні функції, які Ви використовуєте, на Ваш Користувацький контент і будь-яку іншу інформацію, яку Ви відправляєте на платформу EasyPlay. Будь-які зміни в послугах EasyPlay можуть призвести до видалення або скидання деяких елементів.",
            "16.3 Ви погоджуєтеся з тим, що ключовою характеристикою платформи EasyPlay є те, що зміни на платформі будуть відбуватися з плином часу і це є важливою основою, за допомогою якої ми надаємо Вам доступ до платформи EasyPlay. Після того, як ми внесемо зміни на платформі EasyPlay, Ваше подальше використання платформи означатиме те, що Ви прийняли будь-які зміни. Однак, Ви завжди можете відмовитися від використання послуг EasyPlay.",
          ],
        },
        termsChanges: {
          title: "17. Зміни в документах",
          content: [
            "17.1 Платформа EasyPlay може час від часу переглядати ці Умови користування, але найостанніша версія завжди буде доступна на цій сторінці.",
            "17.2 Зміни зазвичай відбуваються через додавання нових функцій на платформі EasyPlay, зміни в законодавстві або, коли нам потрібно прояснити нашу позицію з будь-якого питання.",
            "17.3 Платформа, як правило, намагається попередити користувачів перш, ніж нові умови набудуть чинності. Однак, іноді зміни необхідно внести негайно і, якщо це станеться, платформа EasyPlay не повідомить Вам про це.",
          ],
        },
        agreement: {
          title: "18. Документи, що стосуються Ваших відносин з нами",
          content: [
            "18.1 Поточна версія Умов користування містить тільки положення та умови, застосовні до Ваших стосунків з нами.",
            "18.2 Ми маємо намір покладатися на ці Умови користування як на викладені в письмовому вигляді умови нашої угоди з Вами про надання послуг EasyPlay. Якщо частина Умов користування не може бути забезпечена, то частина Умов користування, що залишилася, буде як і раніше застосовуватися до Ваших відносин з платформою.",
            "18.3 У разі, якщо Ви не дотримуєтеся цих Умов користування і платформа EasyPlay не вживає ніяких дій негайно, це не означає, що платформа відмовилася від будь-яких прав, які закріплені за нею. Дії такого характеру можуть бути зроблені пізніше.",
          ],
        },
        contact: {
          title: "19. Контакти",
          content: [
            "19.1 Якщо Вам потрібно зв'язатися з нами у зв'язку з цими Умовами користування, напишіть нам на електронну адресу easyplaysup@fsubs.info, в Телеграм-аккаунт @kinomanage.",
          ],
        },
      },
      privacyPolicy: {
        title: "Політика конфіденційності",
        intro: [
          "Команда сервісу EasyPlay піклується про безпеку даних користувачів. Ми суворо дотримуємося цієї Політики конфіденційності, щоб Ви не турбувалися про те, що відбувається з Вашими персональними даними, наданими платформі під час реєстрації.",
          "Реєструючись на платформі EasyPlay, Ви надаєте свою згоду на обробку всіх введених для реєстрації даних з метою належного надання послуг відповідно до Публічної оферти.",
          "Реєструючись на платформі, Ви також підтверджуєте, що ознайомилися з переліком своїх прав як суб'єкта даних згідно зі статтею 8 Закону України 'Про захист персональних даних'. Цей документ доступний за посиланням: http://zakon2.rada.gov.ua/laws/show/2297-17.",
        ],
        sections: {
          collection: {
            title: "1. Збір особистої інформації",
            content: [
              "1.1 У момент реєстрації на платформі EasyPlay ми просимо Вас повідомити необхідну особисту інформацію в обсязі, необхідному для повноцінного надання послуг. За необхідності, платформа залишає за собою право запитувати додаткову особисту інформацію.",
              "1.2 Наша команда може збирати інформацію про відвідування платформи EasyPlay, таку як IP-адресу, тип і мову браузера, дату і час запиту.",
              "1.3 Деякі послуги, які пропонує платформа EasyPlay, пов'язані з іншими сайтами. Особиста інформація, що надається такими сайтами, може бути передана нам для надання послуг. Платформа також проводить обробку інформації такого роду відповідно до цієї Політики конфіденційності.",
              "1.4 Цим документом платформа гарантує, що анонімні відгуки, залишені на нашому сайті, залишаються повністю конфіденційними та не будуть доступні третім особам, включаючи інших користувачів платформи.",
              "1.5 Платформа EasyPlay може обробляти особисту інформацію як на серверах в Україні, так і в інших країнах.",
            ],
          },
          access: {
            title: "2. Доступ до інформації",
            content: [
              "2.1 Передача Вашої особистої інформації третім особам можлива тільки за таких обставин:",
              "2.1.1 Ви особисто дали на це дозвіл. Для передачі будь-якої конфіденційної інформації потрібна Ваша згода.",
              "2.1.2 Для дотримання законодавства України, в тому числі надання інформації на вимогу фізичних та юридичних осіб, установ, організацій будь-якої форми власності або державних органів, які мають право на отримання такої інформації згідно із законодавством України.",
              "2.1.3 Для розслідування потенційних порушень Публічної оферти, що передбачає надання інформації про Вас у відповідь на належно оформлений адвокатський запит з інформацією про порушення.",
              "2.1.4 Для виявлення та запобігання шахрайським діям, а також вирішення проблем безпеки та усунення технічних несправностей.",
            ],
          },
          protection: {
            title: "3. Захист інформації",
            content: [
              "3.1 Команда EasyPlay вживає всіх необхідних заходів для захисту Ваших даних від неавторизованого доступу. До цих заходів відносяться, зокрема, внутрішня перевірка процесів збору, зберігання та обробки даних і заходи безпеки для запобігання несанкціонованому доступу.",
            ],
          },
          modification: {
            title: "4. Доступ до особистої інформації та її зміна",
            content: [
              "4.1 Платформа EasyPlay робить все необхідне, щоб надавати Вам доступ до Ваших особистих даних. Вносити зміни, якщо вони невірні, або видалити за Вашим запитом. Перед обробкою запитів ми просимо користувачів підтвердити свою особу та інформацію, яку вони хочуть отримати, виправити або видалити.",
            ],
          },
          changes: {
            title: "5. Зміна цієї політики конфіденційності",
            content: [
              "5.1 Ця Політика конфіденційності може періодично змінюватися. Зміни, що вносяться до Політики конфіденційності, будуть опубліковані на цій сторінці.",
            ],
          },
        },
      },
    },
    de: {
      pageTitle: "Allgemeine Geschäftsbedingungen",
      paymentTitle: "Zahlung und Lieferung",
      termsTitle: "Allgemeine Geschäftsbedingungen",
      serviceProvided:
        "Der Service wird dem Käufer innerhalb von 24 Stunden nach der Zahlung zur Verfügung gestellt.",
      goodsSent:
        "Waren werden über WhatsApp/Telegram-Messenger oder per E-Mail verschickt.",
      payment:
        "Die Zahlung ist auf der Website per Karte/Apple Pay oder Google Pay möglich.",
      refundTitle: "Rückerstattungsrichtlinie",
      refundPolicy:
        "Rückerstattungen sind nur möglich, wenn der Service nicht verbunden werden kann. Aus anderen Gründen ist die Rückgabe eines digitalen Produkts nicht möglich.",
      contactTitle: "Kontaktinformationen",
      storeName: 'Online-Shop "Easy Play"',
      tin: "USt-IdNr.: 3736606793",
      address: "Kherson, Forshtadska Straße 26",
      phone: "Telefonnummer: 0954638612",
      email: "E-Mail: easyplaysup@fsubs.info",
      terms: {
        welcome: {
          title: "1. Willkommen",
          content: [
            "1.1 EasyPlay ist eine Plattform, die es Nutzern ermöglicht, Gruppenzugänge zu verschiedenen Diensten zu einem günstigeren Preis zu erwerben. Die Zahlungsabwicklung erfolgt über unsere Website easyplayy.com.",
          ],
        },
        warnings: {
          title:
            "2. Wichtige Hinweise zur gemeinsamen Nutzung von Online-Diensten",
          content: [
            "2.1 Das EasyPlay-Team wird Sie auffordern zu bestätigen, dass Sie die Nutzungsbedingungen des jeweiligen Online-Dienstes gelesen haben und einhalten.",
            "2.2 Sie sind selbst dafür verantwortlich, die geltenden Nutzungsbedingungen einzuhalten. Wir haften nicht für Schäden, die Ihnen durch eine Sperrung des Zugangs zu einem Online-Dienst entstehen, wenn diese auf eine Nichteinhaltung der Bedingungen oder eine missbräuchliche Nutzung der Plattform zurückzuführen sind.",
            "2.3 Die Plattform kann Ihren Zugang bei Verdacht auf Verstöße gegen die Nutzungsbedingungen des Online-Dienstes sofort aussetzen oder beenden.",
          ],
        },
        relationship: {
          title: "3. Verhältnis zur Plattform",
          content: [
            "3.1 Dieses Dokument regelt das Verhältnis zwischen Ihnen und uns. Bitte lesen Sie die Bedingungen sorgfältig, bevor Sie EasyPlay nutzen.",
            "3.2 Durch die Nutzung von EasyPlay erklären Sie sich mit diesen Bedingungen einverstanden. Wenn Sie nicht einverstanden sind, nutzen Sie EasyPlay bitte nicht.",
          ],
        },
        personalInfo: {
          title: "4. Persönliche Daten",
          content: [
            "4.1 Der Schutz Ihrer Privatsphäre ist uns wichtig. Bitte lesen Sie unsere Datenschutzerklärung, um zu verstehen, wie wir Ihre Daten erfassen, verwenden und weitergeben.",
          ],
        },
        access: {
          title: "5. Zugang zur EasyPlay-Plattform",
          content: [
            "5.1 Um EasyPlay zu nutzen, müssen Sie mindestens 18 Jahre alt sein und rechtlich in der Lage sein, einen öffentlichen Nutzungsvertrag in Ihrem Wohnsitzland einzugehen.",
          ],
        },
        rights: {
          title: "6. Nutzungsrecht an der EasyPlay-Plattform",
          content: [
            "6.1 Alle Inhalte und Materialien auf EasyPlay gehören ausschließlich der Plattform oder ihren lizenzierten Partnern. Sie erhalten eine Lizenz zur Nutzung nur im Rahmen dieser Bedingungen.",
            "6.2 Ihr Nutzungsrecht ist persönlich und nicht übertragbar.",
            "6.3 Sie verpflichten sich, Folgendes zu unterlassen:",
            "6.3.1 Kopieren von Inhalten der Plattform;",
            "6.3.2 Verkauf oder Weitergabe an Dritte;",
            "6.3.3 Änderungen oder Bearbeitung von Inhalten;",
            "6.3.4 Zugriff auf nicht öffentlich freigegebene Codes der Plattform.",
            "6.4 Alle vertraulichen Informationen, Urheberrechte und geistigen Eigentumsrechte gehören EasyPlay oder lizenzierten Dritten.",
            "6.5 Sie erkennen an, dass Ihnen über das Nutzungsrecht hinaus keine weiteren Rechte an der Plattform zustehen.",
          ],
        },
        paymentSystem: {
          title: "7. Zahlungssystem",
          content: [
            "7.1 Durch die weitere Nutzung von EasyPlay akzeptieren Sie die Dienstleistungsvereinbarung von MonoBank und erklären sich damit einverstanden, korrekte und vollständige Informationen bereitzustellen sowie der Nutzung Ihrer Daten und Transaktionen zuzustimmen.",
          ],
        },
        fees: {
          title: "8. Gebühren und Zahlungen",
          content: [
            "8.1 Bei der Bestellung müssen gültige, aktuelle und vollständige Kredit- oder Debitkartendaten angegeben werden. Mit dem Kauf einer Mitgliedschaft erteilen Sie der Plattform die Erlaubnis, Ihre Karte zu belasten, und bestätigen die Richtigkeit Ihrer Daten.",
            "8.2 Sie sind dafür verantwortlich, Ihre Zahlungsdaten in Ihrem Konto aktuell zu halten.",
          ],
        },
        refunds: {
          title: "9. Rückerstattungen",
          content: [
            "9.1 Rückerstattungen liegen im Ermessen von EasyPlay basierend auf den verfügbaren Informationen.",
            "9.2 Rückerstattungen erfolgen ausschließlich auf die ursprünglich verwendete Karte.",
          ],
        },
        yourContent: {
          title: "10. Ihre Inhalte",
          content: [
            "10.1 Sie bestätigen, dass von Ihnen hochgeladene Inhalte (Texte, Bilder, öffentliche Kommentare) mit diesen Bedingungen übereinstimmen.",
            "10.2 Wir beanspruchen kein Eigentum an Ihren Inhalten, aber Sie gewähren uns eine weltweite, nicht-exklusive, gebührenfreie, unbefristete Lizenz zur Nutzung, Vervielfältigung, Verbreitung und Bearbeitung Ihrer Inhalte im Zusammenhang mit EasyPlay.",
            "10.3 Sie müssen sicherstellen, dass Sie die Rechte an Inhalten Dritter besitzen, die Sie hochladen.",
            "10.4 Mit dem Einsenden von Feedback erklären Sie sich damit einverstanden, dass wir dieses uneingeschränkt und ohne Vergütung nutzen dürfen.",
            "10.5 Unsere Rechte an Ihren Inhalten berühren nicht Ihre Datenschutzrechte. Lesen Sie dazu unsere Datenschutzerklärung.",
          ],
        },
        acceptableUse: {
          title: "11. Richtlinien zur akzeptablen Nutzung",
          content: [
            "11.1 Dieser Abschnitt beschreibt die Regeln zur Nutzung von EasyPlay.",
            "11.2 Es ist untersagt:",
            "11.2.1 Sicherheitsfunktionen zu umgehen oder zu stören;",
            "11.2.2 Gegen diese Bedingungen zu verstoßen;",
            "11.2.3 Die Plattform trotz Sperrung weiter zu nutzen;",
            "11.2.4 Werbung auf der Plattform zu machen;",
            "11.2.5 Ungefragte Werbenachrichten zu senden;",
            "11.2.6 Die Plattform zu manipulieren oder zu hacken;",
            "11.2.7 Schadsoftware einzuschleusen;",
            "11.2.8 Daten in Verletzung dieser Bedingungen zu sammeln;",
            "11.2.9 Inhalte zu posten, an denen Sie keine Rechte besitzen oder Rechte Dritter verletzen;",
            "11.2.10 Automatisierte Systeme zur Überlastung der Plattform einzusetzen.",
            "11.3 Verstöße gegen diese Regeln können führen zu:",
            "11.3.1 Sofortiger oder dauerhafter Sperrung;",
            "11.3.2 Verwarnung.",
            "11.4 Diese Liste ist nicht abschließend; weitere Maßnahmen können folgen.",
          ],
        },
        takedown: {
          title: "12. Entfernen von Inhalten",
          content: [
            "12.1 Wenn Sie glauben, dass Inhalte Ihre Rechte verletzen, kontaktieren Sie uns bitte per E-Mail (easyplaysup@fsubs.info), über Telegram oder Ihr Konto und geben Sie an:",
            "12.1.1 Ihren Namen und Kontaktinformationen;",
            "12.1.2 Eine genaue Beschreibung der Verletzung;",
            "12.1.3 Einen Link oder eine Kennung des betroffenen Inhalts.",
            "12.2 Wir reagieren innerhalb von 24 Stunden mit einer geplanten Maßnahme.",
          ],
        },
        termination: {
          title: "13. Kündigung",
          content: [
            "13.1 Wenn Sie mit diesen Bedingungen oder zukünftigen Änderungen nicht einverstanden sind, beenden Sie die Nutzung sofort.",
            "13.2 Um Ihr Konto zu löschen, kontaktieren Sie easyplaysup@fsubs.info oder Telegram.",
            "13.3 Bei Verstößen behalten wir uns vor, Ihren Zugang sofort zu sperren.",
            "13.4 Dienste können auch mit Vorankündigung eingestellt werden.",
          ],
        },
        liability: {
          title: "14. Haftung der Plattform",
          content: [
            "14.1 Wir bemühen uns um hohe Standards, jedoch sind einige Funktionen von Drittanbietern abhängig.",
            "14.2 EasyPlay haftet nicht für Inhalte Dritter oder Zugangsprobleme, einschließlich:",
            "14.2.1 Nutzerverhalten (z. B. fehlerhafte Zahlungen oder Regelverstöße);",
            "14.2.2 Nichtverfügbarkeit von Diensten.",
            "14.3 EasyPlay wird „wie gesehen“ und „wie verfügbar“ bereitgestellt. Wir garantieren keine unterbrechungsfreie oder fehlerfreie Nutzung.",
            "14.4 Unsere Haftung ist auf die von Ihnen in den letzten 12 Monaten gezahlten Verwaltungsgebühren begrenzt. Wurde keine Zahlung geleistet, besteht keine Haftung.",
            "14.5 Für unvorhersehbare Schäden oder solche, die durch Verstöße Ihrerseits verursacht wurden, haften wir nicht.",
          ],
        },
        disputes: {
          title: "15. Streitbeilegung",
          content: [
            "15.1 Im Streitfall kontaktieren Sie uns bitte per E-Mail oder Telegram zur informellen Klärung.",
            "15.2 Falls keine Einigung erzielt wird, bemühen wir uns gemeinsam um eine geeignete Lösung.",
          ],
        },
        platformChanges: {
          title: "16. Änderungen an der Plattform",
          content: [
            "16.1 EasyPlay wird regelmäßig aktualisiert, um neue Funktionen bereitzustellen.",
            "16.2 Updates können Änderungen an Inhalten oder Funktionen mit sich bringen, auch Löschungen oder Zurücksetzungen.",
            "16.3 Mit der weiteren Nutzung nach Updates stimmen Sie den Änderungen zu. Sie können die Nutzung jederzeit einstellen.",
          ],
        },
        termsChanges: {
          title: "17. Änderungen der Bedingungen",
          content: [
            "17.1 Diese Bedingungen werden gelegentlich aktualisiert. Die aktuelle Version finden Sie immer auf dieser Seite.",
            "17.2 Änderungen können aufgrund neuer Funktionen, rechtlicher Anforderungen oder Klarstellungen erfolgen.",
            "17.3 Wir bemühen uns, Nutzer im Voraus zu informieren, behalten uns aber auch sofortige Änderungen vor.",
          ],
        },
        agreement: {
          title: "18. Rechtliche Vereinbarung",
          content: [
            "18.1 Diese Bedingungen stellen die vollständige Vereinbarung zwischen Ihnen und EasyPlay dar.",
            "18.2 Sollte ein Teil unwirksam sein, bleibt der Rest gültig.",
            "18.3 Wenn EasyPlay nicht sofort auf einen Verstoß reagiert, behalten wir uns das Recht vor, später zu handeln.",
          ],
        },
        contact: {
          title: "19. Kontakt",
          content: [
            "19.1 Für Anfragen zu diesen Bedingungen kontaktieren Sie uns bitte unter easyplaysup@fsubs.info.",
          ],
        },
      },
      privacyPolicy: {
        title: "Datenschutzrichtlinie",
        intro: [
          "Das Team des EasyPlay-Dienstes legt großen Wert auf die Sicherheit der Nutzerdaten. Wir halten diese Datenschutzrichtlinie strikt ein, damit Sie sich keine Sorgen darüber machen müssen, was mit Ihren persönlichen Daten geschieht, die Sie der Plattform bei der Registrierung bereitstellen.",
          "Durch die Registrierung auf der EasyPlay-Plattform stimmen Sie der Verarbeitung aller für die Registrierung eingegebenen Daten zu, um die Dienstleistungen gemäß dem öffentlichen Angebot ordnungsgemäß zu erbringen.",
          "Durch die Registrierung auf der Plattform bestätigen Sie außerdem, dass Sie Ihre Rechte als betroffene Person gemäß Artikel 8 des ukrainischen Gesetzes 'Über den Schutz personenbezogener Daten' zur Kenntnis genommen haben. Dieses Dokument ist unter folgendem Link verfügbar: http://zakon2.rada.gov.ua/laws/show/2297-17.",
        ],
        sections: {
          collection: {
            title: "1. Erhebung personenbezogener Informationen",
            content: [
              "1.1 Bei der Registrierung auf der EasyPlay-Plattform bitten wir Sie, die notwendigen persönlichen Informationen in dem Umfang anzugeben, der für die vollständige Erbringung der Dienstleistungen erforderlich ist. Bei Bedarf behält sich die Plattform das Recht vor, zusätzliche persönliche Informationen anzufordern.",
              "1.2 Unser Team kann Informationen über Ihre Besuche auf der EasyPlay-Plattform sammeln, wie z. B. Ihre IP-Adresse, den Browser-Typ und die Sprache sowie das Datum und die Uhrzeit der Anfrage.",
              "1.3 Einige von der EasyPlay-Plattform angebotene Dienstleistungen sind mit anderen Websites verknüpft. Persönliche Informationen, die von solchen Websites bereitgestellt werden, können an uns zur Erbringung der Dienstleistungen übermittelt werden. Die Plattform verarbeitet derartige Informationen ebenfalls in Übereinstimmung mit dieser Datenschutzrichtlinie.",
              "1.4 Mit diesem Dokument garantiert die Plattform, dass anonyme Bewertungen, die auf unserer Website abgegeben werden, vollständig vertraulich bleiben und Dritten, einschließlich anderer Plattformnutzer, nicht zugänglich gemacht werden.",
              "1.5 Die EasyPlay-Plattform kann persönliche Informationen sowohl auf Servern in der Ukraine als auch in anderen Ländern verarbeiten.",
            ],
          },
          access: {
            title: "2. Zugriff auf Informationen",
            content: [
              "2.1 Ihre persönlichen Informationen können Dritten nur unter folgenden Umständen weitergegeben werden:",
              "2.1.1 Sie haben Ihre ausdrückliche Zustimmung dazu gegeben. Für die Weitergabe sensibler Informationen ist Ihre Zustimmung erforderlich.",
              "2.1.2 Zur Einhaltung der ukrainischen Gesetzgebung, einschließlich der Bereitstellung von Informationen auf Anfrage von natürlichen oder juristischen Personen, Institutionen, Organisationen jeglicher Eigentumsform oder staatlichen Behörden, die gemäß ukrainischem Recht berechtigt sind, solche Informationen zu erhalten.",
              "2.1.3 Zur Untersuchung potenzieller Verstöße gegen das öffentliche Angebot, was die Bereitstellung von Informationen über Sie als Reaktion auf eine ordnungsgemäß gestellte anwaltliche Anfrage bezüglich Verstößen beinhalten kann.",
              "2.1.4 Zur Erkennung und Verhinderung betrügerischer Aktivitäten sowie zur Lösung von Sicherheitsproblemen und technischen Störungen.",
            ],
          },
          protection: {
            title: "3. Schutz der Informationen",
            content: [
              "3.1 Das EasyPlay-Team ergreift alle notwendigen Maßnahmen, um Ihre Daten vor unbefugtem Zugriff zu schützen. Zu diesen Maßnahmen gehören unter anderem interne Überprüfungen der Prozesse zur Datenerfassung, -speicherung und -verarbeitung sowie Sicherheitsmaßnahmen zur Verhinderung unbefugten Zugriffs.",
            ],
          },
          modification: {
            title:
              "4. Zugriff auf und Änderung personenbezogener Informationen",
            content: [
              "4.1 Die EasyPlay-Plattform tut alles Notwendige, um Ihnen Zugriff auf Ihre personenbezogenen Daten zu gewähren, Änderungen vorzunehmen, falls diese unrichtig sind, oder sie auf Ihren Wunsch hin zu löschen. Vor der Bearbeitung solcher Anfragen bitten wir die Nutzer, ihre Identität und die Informationen, die sie abrufen, korrigieren oder löschen möchten, zu bestätigen.",
            ],
          },
          changes: {
            title: "5. Änderungen an dieser Datenschutzrichtlinie",
            content: [
              "5.1 Diese Datenschutzrichtlinie kann regelmäßig aktualisiert werden. Änderungen an der Datenschutzrichtlinie werden auf dieser Seite veröffentlicht.",
            ],
          },
        },
      },
    },
    cz: {
      pageTitle: "Obchodní podmínky",
      paymentTitle: "Platba a doručení",
      termsTitle: "Obchodní podmínky",
      serviceProvided:
        "Služba je poskytnuta kupujícímu do 24 hodin po zaplacení.",
      goodsSent:
        "Zboží je zasíláno přes messengery WhatsApp/Telegram nebo e-mailem.",
      payment: "Platba je možná na webu kartou, Apple Pay nebo Google Pay.",
      refundTitle: "Zásady vrácení peněz",
      refundPolicy:
        "Vrácení peněz je možné pouze v případě, že službu nelze připojit. Z jiných důvodů není vrácení digitálního produktu možné.",
      contactTitle: "Kontaktní informace",
      storeName: 'Online obchod "Easy Play"',
      tin: "IČ: 3736606793",
      address: "Cherson, ulice Forštadská 26",
      phone: "Telefonní číslo: 0954638612",
      email: "E-mail: easyplaysup@fsubs.info",
      terms: {
        welcome: {
          title: "1. Vítejte",
          content: [
            "1.1 EasyPlay je platforma, která umožňuje uživatelům zakoupit skupinová předplatná různých služeb za nižší cenu. Zpracování plateb probíhá přes naši webovou stránku easyplayy.com.",
          ],
        },
        warnings: {
          title:
            "2. Důležitá upozornění ohledně sdílení přístupu k online službám",
          content: [
            "2.1 Tým EasyPlay vás požádá o potvrzení, že jste si přečetli a dodržujete podmínky použití platné pro online službu, kterou chcete využívat.",
            "2.2 Jste odpovědní za dodržování platných podmínek použití. Nebudeme nést odpovědnost za žádné ztráty, které vám mohou vzniknout, pokud vám bude zablokován přístup k online službě kvůli nedodržení jejích podmínek použití nebo používání platformy způsobem, který tyto podmínky porušuje.",
            "2.3 Platforma může okamžitě pozastavit nebo ukončit váš přístup, pokud budeme mít podezření, že využíváte online službu v rozporu s jejími podmínkami.",
          ],
        },
        relationship: {
          title: "3. Vztah s platformou",
          content: [
            "3.1 Tento dokument stanovuje pravidla, která řídí váš vztah s námi. Je důležité, abyste si tyto podmínky přečetli a porozuměli jim před použitím platformy EasyPlay.",
            "3.2 Přístupem nebo používáním platformy EasyPlay souhlasíte s těmito podmínkami použití. Pokud s nimi nesouhlasíte, platformu EasyPlay prosím nepoužívejte.",
          ],
        },
        personalInfo: {
          title: "4. Osobní údaje",
          content: [
            "4.1 Vaše soukromí je pro nás důležité. Přečtěte si prosím naše Zásady ochrany osobních údajů, abyste pochopili, jak shromažďujeme, používáme a sdílíme vaše údaje.",
          ],
        },
        access: {
          title: "5. Přístup k platformě EasyPlay",
          content: [
            "5.1 Abyste mohli platformu EasyPlay používat, musíte být starší 18 let a právně způsobilí uzavřít veřejnou nabídku ve vaší zemi bydliště.",
          ],
        },
        rights: {
          title: "6. Právo na používání platformy EasyPlay",
          content: [
            "6.1 Veškeré materiály a obsah na platformě EasyPlay patří výhradně platformě nebo jejím důvěryhodným poskytovatelům licencí. Je vám udělena licence k používání tohoto obsahu pouze v souladu s těmito podmínkami.",
            "6.2 Vaše právo používat EasyPlay je osobní a nepřenositelné.",
            "6.3 Souhlasíte, že nebudete:",
            " • 6.3.1 Kopírovat žádnou část platformy EasyPlay;",
            " • 6.3.2 Prodávat nebo sdílet žádnou část platformy EasyPlay s jinými;",
            " • 6.3.3 Jakkoliv upravovat žádnou část platformy EasyPlay;",
            " • 6.3.4 Přistupovat k jakékoli části kódu platformy EasyPlay, která není veřejně sdílena.",
            "6.4 Veškeré důvěrné informace, autorská práva a práva duševního vlastnictví patří výhradně platformě EasyPlay nebo licencovaným třetím stranám.",
            "6.5 Souhlasíte, že nemáte žádná práva k jakékoli části platformy kromě práva ji používat podle těchto podmínek.",
          ],
        },
        paymentSystem: {
          title: "7. Platební systém",
          content: [
            "7.1 Pokračováním v používání platformy EasyPlay souhlasíte s dodržováním smlouvy o poskytování služeb MonoBank. Souhlasíte s poskytnutím přesných a úplných informací a povolujete použití vašich údajů a informací o transakcích.",
          ],
        },
        fees: {
          title: "8. Poplatky a platby",
          content: [
            "8.1 Při přihlášení k odběru musíte poskytnout platné, aktuální a úplné údaje o kreditní nebo debetní kartě. Zakoupením předplatného opravňujete platformu k účtování poplatků z vaší karty a potvrzujete přesnost vašich údajů.",
            "8.2 Jste odpovědní za udržování aktuálních platebních údajů ve vašem osobním účtu.",
          ],
        },
        refunds: {
          title: "9. Vrácení peněz",
          content: [
            "9.1 Nárok na vrácení peněz je na uvážení EasyPlay na základě dostupných informací.",
            "9.2 Vrácení peněz je prováděno na původní kartu použitou k platbě.",
          ],
        },
        yourContent: {
          title: "10. Váš obsah",
          content: [
            "10.1 Potvrzujete, že jakýkoli obsah (text, obrázky, veřejné komentáře), který nahrajete, je v souladu s těmito podmínkami.",
            "10.2 Nečiníme si nárok na vlastnictví vašeho obsahu, ale udělujete nám celosvětovou, nevýhradní, bezplatnou a trvalou licenci k používání, kopírování, reprodukci, distribuci, úpravě a sdílení vašeho obsahu pro služby EasyPlay.",
            "10.3 Musíte zajistit, že máte práva sdílet jakýkoli obsah třetích stran zahrnutý ve vašem uživatelském obsahu.",
            "10.4 Poskytnutím zpětné vazby souhlasíte, že ji můžeme používat bez omezení nebo kompenzace.",
            "10.5 Naše práva na váš obsah neovlivňují vaše práva na ochranu soukromí. Přečtěte si naše Zásady ochrany osobních údajů.",
          ],
        },
        acceptableUse: {
          title: "11. Zásady přijatelného používání",
          content: [
            "11.1 Tato část popisuje konkrétní pravidla pro používání platformy EasyPlay.",
            "11.2 Nesmíte:",
            " • 11.2.1 Obcházet nebo narušovat bezpečnostní funkce;",
            " • 11.2.2 Porušovat tyto podmínky;",
            " • 11.2.3 Používat platformu, pokud jste byli pozastaveni nebo zakázáni;",
            " • 11.2.4 Propagovat nebo inzerovat na platformě;",
            " • 11.2.5 Odesílat nevyžádané marketingové zprávy;",
            " • 11.2.6 Upravovat nebo hackovat platformu;",
            " • 11.2.7 Zavádět malware nebo škodlivé materiály;",
            " • 11.2.8 Shromažďovat data v rozporu s těmito podmínkami;",
            " • 11.2.9 Zveřejňovat obsah, který nevlastníte nebo porušuje práva třetích stran;",
            " • 11.2.10 Používat automatizované systémy k přetížení platformy.",
            "11.3 Porušení podmínek může vést k:",
            " • 11.3.1 Okamžitému nebo trvalému pozastavení;",
            " • 11.3.2 Varování.",
            "11.4 Tento seznam není vyčerpávající a mohou být přijata další opatření.",
          ],
        },
        takedown: {
          title: "12. Zásady stažení obsahu",
          content: [
            "12.1 Pokud se domníváte, že nějaký obsah porušuje vaše práva, kontaktujte naši podporu prostřednictvím e-mailu (easyplaysup@fsubs.info), Telegramu nebo vašeho osobního účtu. Uveďte:",
            " • 12.1.1 Vaše jméno a kontaktní údaje;",
            " • 12.1.2 Podrobné vysvětlení porušení;",
            " • 12.1.3 Odkaz nebo identifikátor sporného obsahu.",
            "12.2 Odpovíme do 24 hodin s plánovaným postupem.",
          ],
        },
        termination: {
          title: "13. Ukončení",
          content: [
            "13.1 Pokud nesouhlasíte s těmito podmínkami nebo budoucími změnami, přestaňte službu okamžitě používat.",
            "13.2 Pro uzavření vašeho účtu kontaktujte podporu na easyplaysup@fsubs.info nebo přes Telegram.",
            "13.3 Můžeme váš přístup okamžitě ukončit, pokud porušíte tyto podmínky nebo jiná klíčová pravidla.",
            "13.4 Služby mohou být také ukončeny s předchozím oznámením.",
          ],
        },
        liability: {
          title: "14. Odpovědnost platformy",
          content: [
            "14.1 I když usilujeme o vysoké standardy, některé funkce závisí na sítích třetích stran.",
            "14.2 EasyPlay nenese odpovědnost za obsah třetích stran nebo problémy s přístupem ke službám, včetně:",
            " • 14.2.1 Akcí uživatelů (např. neúspěšné platby nebo porušení pravidel);",
            " • 14.2.2 Nedostupnosti služby.",
            "14.3 EasyPlay je poskytován 'tak, jak je' a 'jak je dostupný'. Negarantujeme nepřetržité nebo bezchybné používání.",
            "14.4 V případě nároku nepřesáhne naše odpovědnost administrativní poplatky, které jste zaplatili za posledních 12 měsíců. Pokud jste neprovedli žádnou platbu, neneseme odpovědnost.",
            "14.5 Nejsme odpovědní za nepředvídatelné škody nebo škody způsobené vaším porušením podmínek.",
          ],
        },
        disputes: {
          title: "15. Řešení sporů",
          content: [
            "15.1 Pokud vznikne spor, kontaktujte nás prostřednictvím e-mailu nebo Telegramu k neformálnímu vyřešení.",
            "15.2 Pokud se spor nevyřeší neformálně, budeme s vámi spolupracovat na nalezení nejlepšího způsobu řešení.",
          ],
        },
        platformChanges: {
          title: "16. Změny na platformě",
          content: [
            "16.1 Pravidelně aktualizujeme a vylepšujeme EasyPlay, abychom přidali nové funkce a služby.",
            "16.2 Aktualizace mohou změnit funkce nebo obsah a mohou vést k resetování nebo odstranění dat.",
            "16.3 Pokračováním v používání platformy po aktualizacích souhlasíte se změnami. Používání můžete kdykoli ukončit.",
          ],
        },
        termsChanges: {
          title: "17. Změny podmínek",
          content: [
            "17.1 Tyto podmínky mohou být příležitostně aktualizovány, přičemž nejnovější verze je vždy dostupná na této stránce.",
            "17.2 Změny mohou být způsobeny novými funkcemi, právními aktualizacemi nebo objasněním.",
            "17.3 Snažíme se uživatele předem informovat, ale okamžité změny mohou nastat bez předchozího upozornění.",
          ],
        },
        agreement: {
          title: "18. Právní dohoda",
          content: [
            "18.1 Tyto podmínky tvoří úplnou dohodu mezi vámi a EasyPlay.",
            "18.2 Pokud je některá část nevymahatelná, zůstává zbytek platný.",
            "18.3 Pokud EasyPlay nejedná okamžitě v případě porušení, zachovává si právo jednat později.",
          ],
        },
        contact: {
          title: "19. Kontakt",
          content: [
            "19.1 Pro dotazy týkající se těchto podmínek nás kontaktujte na easyplaysup@fsubs.info.",
          ],
        },
      },
      privacyPolicy: {
        title: "Zásady ochrany osobních údajů",
        intro: [
          "Tým služby EasyPlay klade velký důraz na bezpečnost údajů uživatelů. Striktně dodržujeme tyto Zásady ochrany osobních údajů, abyste se nemuseli obávat, co se děje s vašimi osobními údaji poskytnutými platformě během registrace.",
          "Registrací na platformě EasyPlay souhlasíte se zpracováním všech údajů zadaných pro účely registrace, aby byly služby poskytovány řádně v souladu s veřejnou nabídkou.",
          "Registrací na platformě také potvrzujete, že jste se seznámili se svými právy jako subjektu údajů podle článku 8 ukrajinského zákona 'O ochraně osobních údajů'. Tento dokument je dostupný na: http://zakon2.rada.gov.ua/laws/show/2297-17.",
        ],
        sections: {
          collection: {
            title: "1. Shromažďování osobních údajů",
            content: [
              "1.1 Během registrace na platformě EasyPlay vás žádáme o poskytnutí nezbytných osobních údajů v rozsahu potřebném pro plné poskytování služeb. V případě potřeby si platforma vyhrazuje právo požadovat další osobní údaje.",
              "1.2 Náš tým může shromažďovat informace o vašich návštěvách platformy EasyPlay, jako je IP adresa, typ a jazyk prohlížeče a datum a čas požadavku.",
              "1.3 Některé služby nabízené platformou EasyPlay jsou propojeny s jinými webovými stránkami. Osobní údaje poskytnuté těmito stránkami mohou být předány nám pro poskytování služeb. Platforma také zpracovává tyto údaje v souladu s těmito Zásadami ochrany osobních údajů.",
              "1.4 Tento dokument zaručuje, že anonymní recenze zanechané na našem webu zůstávají plně důvěrné a nebudou přístupné třetím stranám, včetně jiných uživatelů platformy.",
              "1.5 Platforma EasyPlay může zpracovávat osobní údaje na serverech na Ukrajině i v jiných zemích.",
            ],
          },
          access: {
            title: "2. Přístup k informacím",
            content: [
              "2.1 Vaše osobní údaje mohou být sdíleny s třetími stranami pouze za následujících okolností:",
              "2.1.1 Pokud jste k tomu dali výslovný souhlas. Pro předání jakýchkoli citlivých informací je vyžadován váš souhlas.",
              "2.1.2 Pro dodržování ukrajinské legislativy, včetně poskytování informací na žádost fyzických nebo právnických osob, institucí, organizací jakékoli formy vlastnictví nebo státních orgánů oprávněných tyto informace získat podle ukrajinského práva.",
              "2.1.3 Pro vyšetřování potenciálních porušení veřejné nabídky, což může zahrnovat poskytnutí informací o vás v reakci na řádně podaný právní požadavek týkající se porušení.",
              "2.1.4 Pro odhalování a prevenci podvodných aktivit, řešení bezpečnostních problémů a odstraňování technických poruch.",
            ],
          },
          protection: {
            title: "3. Ochrana informací",
            content: [
              "3.1 Tým EasyPlay přijímá všechna nezbytná opatření k ochraně vašich údajů před neoprávněným přístupem. Tato opatření zahrnují interní kontroly procesů shromažďování, ukládání a zpracování údajů a bezpečnostní opatření k prevenci neoprávněného přístupu.",
            ],
          },
          modification: {
            title: "4. Přístup k osobním údajům a jejich úprava",
            content: [
              "4.1 Platforma EasyPlay vynakládá veškeré úsilí, aby vám poskytla přístup k vašim osobním údajům, umožnila provést změny, pokud jsou údaje nesprávné, nebo je na váš požadavek smazala. Před zpracováním takových požadavků žádáme uživatele, aby ověřili svou totožnost a specifikovali údaje, ke kterým chtějí přistupovat, které chtějí upravit nebo smazat.",
            ],
          },
          changes: {
            title: "5. Změny těchto Zásad ochrany osobních údajů",
            content: [
              "5.1 Tyto Zásady ochrany osobních údajů mohou být pravidelně aktualizovány. Změny budou zveřejněny na této stránce.",
            ],
          },
        },
      },
    },
  };

  // Вибираємо переклад відповідно до локалі
  const t = translations[locale] || translations.en;

  return (
    <section className="max-w-4xl mx-auto p-6 pt-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{t.pageTitle}</h1>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{t.paymentTitle}</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>{t.serviceProvided}</li>
            <li>{t.payment}</li>
            <li>{t.goodsSent}</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-3">{t.refundTitle}</h2>
          <p className="mb-6">{t.refundPolicy}</p>

          <h2 className="text-2xl font-semibold mb-3">{t.termsTitle}</h2>
          {Object.values(t.terms).map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-medium mb-2">{section.title}</h3>
              <ul className="list-disc pl-6 space-y-1">
                {section.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="text-2xl font-semibold mb-3">
            {t.privacyPolicy.title}
          </h2>
          <div className="mb-4">
            {t.privacyPolicy.intro.map((item, idx) => (
              <p key={idx} className="mb-2">
                {item}
              </p>
            ))}
            {Object.values(t.privacyPolicy.sections).map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-medium mb-2">{section.title}</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">{t.contactTitle}</h2>
          <div className="space-y-2">
            <h3 className="text-lg">{t.storeName}</h3>
            <h3 className="text-lg">{t.tin}</h3>
            <h3 className="text-lg">{t.address}</h3>
            <h3 className="text-lg">{t.phone}</h3>
            <h3 className="text-lg">{t.email}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
