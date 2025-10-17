export type Language = 'FR' | 'EN';

export const translations = {
    FR: {
        // Página Start
        start: {
            titleMedium: "MA MAGIC SUNNY",
            titleLarge: "MA CRÉATION !",
            button: "CONTINUER",
            termsCheckbox: "J'ACCEPTE LES CONDITIONS GÉNÉRALES D'UTILISATION",
            termsRequired: "VOUS DEVEZ ACCEPTER LES CONDITIONS GÉNÉRALES",
            termsTitle: "Conditions générales d'utilisation de Peoplesnap",
            termsContent: {
                intro1: "Bienvenue sur <strong>Peoplesnap</strong>, l'application web innovante conçue exclusivement pour les événements <strong>Afflelou</strong>, fruit de la collaboration entre <strong>Afflelou</strong> et <strong>Slash Experience</strong>.",
                intro2: "En utilisant Peoplesnap, vous acceptez les présentes Conditions générales d'utilisation, qui régissent votre accès au Service et son utilisation. Si vous n'acceptez pas une partie de ces conditions, veuillez ne pas utiliser Peoplesnap.",
                section1Title: "1. Description du service",
                section1Content: "Peoplesnap offre une expérience interactive permettant aux utilisateurs de prendre un selfie avec leur smartphone. Ces images sont ensuite retravaillées de manière artistique : l'arrière-plan est supprimé et le selfie est intégré dans une image avec un fond distinctif <strong>Afflelou</strong>, créant ainsi un souvenir numérique mémorable de l'événement.",
                section2Title: "2. Acceptation des conditions",
                section2Subtitle1: "2.1 Condition d'âge",
                section2Content1: "Le Service est accessible aux personnes âgées de <strong>13 ans ou plus</strong>. Les utilisateurs de moins de 18 ans doivent consulter ces Conditions générales avec un parent ou un tuteur afin d'en assurer la compréhension et l'acceptation.",
                section2Subtitle2: "2.2 Engagement de l'utilisateur",
                section2Content2: "Vous vous engagez à utiliser Peoplesnap uniquement aux fins prévues et conformément aux présentes Conditions, aux lois applicables et aux normes sociales généralement admises.",
                section3Title: "3. Propriété intellectuelle",
                section3Content: "Le contenu que vous fournissez vous appartient. En utilisant notre Service, vous accordez à <strong>Afflelou</strong> une licence mondiale, non exclusive et libre de redevances pour utiliser ce contenu dans le cadre des supports promotionnels de l'événement et pour la création d'une mosaïque photo. Cette licence comprend le droit de <strong>modifier, reproduire et distribuer</strong> votre contenu.",
                section4Title: "4. Confidentialité et utilisation des données",
                section4Subtitle1: "4.1 Consentement à l'utilisation des données",
                section4Content1: "Vous acceptez la collecte et l'utilisation de vos informations personnelles conformément à la Politique de confidentialité de Peoplesnap. Cela inclut le stockage de vos selfies sur nos serveurs pendant <strong>un an</strong> afin de faciliter la création et la récupération de votre clip vidéo.",
                section4Subtitle2: "4.2 Politique de conservation des données",
                section4Content2: "Vos selfies seront conservés sur les serveurs de Peoplesnap pendant une durée de <strong>un (1) mois</strong>. À l'issue de cette période, toutes les images seront définitivement supprimées conformément à nos politiques de protection des données.",
                section5Title: "5. Limitations de responsabilité",
                section5Content: "<strong>Afflelou Consumer Care</strong> ne pourra être tenue responsable d'aucun dommage indirect résultant de votre utilisation de Peoplesnap. Cette limitation s'applique à tout type de dommage, y compris, sans s'y limiter, la <strong>perte de données ou de profits</strong>.",
                section6Title: "6. Modifications des conditions",
                section6Content: "<strong>Afflelou Consumer Care</strong> se réserve le droit de mettre à jour ou de modifier les présentes Conditions à tout moment. La poursuite de l'utilisation du Service après de telles modifications vaut acceptation des Conditions mises à jour.",
                section7Title: "7. Droit applicable",
                section7Content: "Les présentes Conditions sont régies par les lois de la juridiction dans laquelle <strong>Afflelou</strong> exerce ses activités, sans égard aux dispositions relatives aux conflits de lois.",
                section8Title: "8. Contact",
                section8Content: "Pour toute question concernant ces Conditions générales d'utilisation, n'hésitez pas à nous contacter."
            }
        },

        // Página Permission
        permission: {
            title: "ACCÈS À VOTRE APPAREIL PHOTO",
            description: "NOUS AVONS BESOIN D'ACCÉDER À VOTRE CAMÉRA. CLIQUEZ SUR « AUTORISER » LORSQUE VOTRE NAVIGATEUR VOUS Y INVITE, PUIS CLIQUEZ POUR ACCEPTER LES AUTORISATIONS.",
            button: "COMPRIS",
            errorMessage: "Accès à la caméra refusé. Veuillez autoriser l'accès à la caméra dans les paramètres de votre navigateur."
        },

        // Página Take Selfie
        takeSelfie: {
            title: "PRENDS 4 SELFIES!",
            button: "PRENDRE UNE PHOTO",
            loading: "CHARGEMENT DE LA CAMÉRA...",
            errorMessage: "IMPOSSIBLE D'ACCÉDER À LA CAMÉRA"
        },

        // Página Validate Selfie
        validateSelfie: {
            title: "PRENDS 4 SELFIES!",
            buttonValidate: "SELFIE SUIVANT",
            buttonRetake: "REPRENEZ",
            loading: "CHARGEMENT..."
        },

        // Página Form
        form: {
            placeholderNom: "NOM",
            placeholderPrenom: "PRÉNOM",
            placeholderEmail: "COURRIER ÉLECTRONIQUE",
            placeholderDate: "DATE DE NAISSANCE",
            button: "CONTINUER",
            buttonLoading: "TRAITEMENT...",
            errorValidation: "VEUILLEZ REMPLIR TOUS LES CHAMPS",
            errorSubmit: "UNE ERREUR EST SURVENUE. VEUILLEZ RÉESSAYER.",
            termsCheckbox: "J'ACCEPTE LES CONDITIONS GÉNÉRALES D'UTILISATION",
            termsRequired: "VOUS DEVEZ ACCEPTER LES CONDITIONS GÉNÉRALES"
        },

        // Página Final Processing
        finalProcessing: {
            title: "MA MAGIC SUNNY, MA CRÉATION !",
            buttonDownload: "TÉLÉCHARGER",
            buttonShare: "PARTAGER",
            buttonRestart: "RECOMMENCER",
            copyText: "J'AI ESSAYÉ LA COLLECTION MAGIC ET SES MAGIC CLIPS CHEZ AFFLELOU #MAGICSUNNY",
            copyLabel: "TEXTE SUGGÉRÉ POUR LE PARTAGE:",
            generating: "Génération de la vidéo...",
            error: "ERREUR LORS DE LA Génération de la vidéo"
        },

        // General
        general: {
            loading: "CHARGEMENT..."
        }
    },

    EN: {
        // Start Page
        start: {
            titleMedium: "MY MAGIC SUNNY",
            titleLarge: "MY CREATION!",
            button: "CONTINUE",
            termsCheckbox: "I ACCEPT THE TERMS AND CONDITIONS",
            termsRequired: "YOU MUST ACCEPT THE TERMS AND CONDITIONS",
            termsTitle: "Terms and Conditions for Peoplesnap",
            termsContent: {
                intro1: "Welcome to <strong>Peoplesnap</strong>, the innovative web application designed exclusively for <strong>Afflelou</strong> events, brought to you by the collaboration between <strong>Afflelou</strong> and <strong>Slash Experience</strong>.",
                intro2: "By using Peoplesnap, you agree to these Terms and Conditions, which govern your access to and use of our Service. If you do not agree with any part of these terms, please do not use Peoplesnap.",
                section1Title: "1. Service Description",
                section1Content: "Peoplesnap offers an interactive experience where users can take a selfie using their smartphone. These images are then artistically modified by removing the background and integrating them into a picture featuring a distinctive <strong>Afflelou</strong> background, creating a memorable digital keepsake of the event.",
                section2Title: "2. Acceptance of Terms",
                section2Subtitle1: "2.1 Age Requirement",
                section2Content1: "The Service is available to individuals aged <strong>13 years or older</strong>. Users under the age of 18 must review these Terms and Conditions with a parent or guardian to ensure understanding and agreement.",
                section2Subtitle2: "2.2 User Commitment",
                section2Content2: "You commit to using Peoplesnap solely for its intended purpose and in accordance with these Terms, applicable laws, and general societal norms.",
                section3Title: "3. Intellectual Property",
                section3Content: "The content you provide remains yours. By using our Service, you grant <strong>Afflelou</strong> a worldwide, non-exclusive, royalty-free license to use this content as part of the event's promotional materials and for the creation of a photo mosaic. This includes the right to <strong>modify, reproduce, and distribute</strong> your content.",
                section4Title: "4. Privacy & Data Use",
                section4Subtitle1: "4.1 Consent to Use of Data",
                section4Content1: "You agree to the collection and use of your personal information in accordance with Peoplesnap's Privacy Policy. This includes storing your selfies on our servers for up to <strong>one (1) month</strong> to facilitate the creation and retrieval of your video clip.",
                section4Subtitle2: "4.2 Data Retention Policy",
                section4Content2: "Your selfies will be retained on the Peoplesnap servers for a period of <strong>one (1) year</strong>. After this period, all images will be permanently deleted in accordance with our data protection policies.",
                section5Title: "5. Limitations of Liability",
                section5Content: "<strong>Afflelou Consumer Care</strong> will not be liable for any indirect damages arising from your use of Peoplesnap. This limitation of liability applies to damages of any kind, including but not limited to <strong>loss of data or profit</strong>.",
                section6Title: "6. Amendments to Terms",
                section6Content: "<strong>Afflelou Consumer Care</strong> reserves the right to update or change these Terms at any time. Continued use of the Service after such changes will constitute your consent to the updated terms.",
                section7Title: "7. Jurisdiction",
                section7Content: "These Terms are governed by the laws of the jurisdiction in which <strong>Afflelou</strong> operates, without regard to its conflict-of-law provisions.",
                section8Title: "8. Contact Information",
                section8Content: "Should you have any questions regarding these Terms and Conditions, please feel free to contact us."
            }
        },

        // Permission Page
        permission: {
            title: "ACCESS TO YOUR CAMERA",
            description: "WE NEED TO ACCESS YOUR CAMERA. CLICK 'ALLOW' WHEN YOUR BROWSER PROMPTS YOU, THEN CLICK TO ACCEPT THE PERMISSIONS.",
            button: "UNDERSTOOD",
            errorMessage: "Camera access denied. Please allow camera access in your browser settings."
        },

        // Take Selfie Page
        takeSelfie: {
            title: "TAKE 4 SELFIES!",
            button: "TAKE A PHOTO",
            loading: "LOADING CAMERA...",
            errorMessage: "UNABLE TO ACCESS CAMERA"
        },

        // Validate Selfie Page
        validateSelfie: {
            title: "TAKE 4 SELFIES!",
            buttonValidate: "NEXT PICTURE",
            buttonRetake: "RETAKE",
            loading: "LOADING..."
        },

        // Form Page
        form: {
            placeholderNom: "LAST NAME",
            placeholderPrenom: "FIRST NAME",
            placeholderEmail: "EMAIL ADDRESS",
            placeholderDate: "DATE OF BIRTH",
            button: "CONTINUE",
            buttonLoading: "PROCESSING...",
            errorValidation: "PLEASE FILL IN ALL FIELDS",
            errorSubmit: "AN ERROR OCCURRED. PLEASE TRY AGAIN.",
            termsCheckbox: "I ACCEPT THE TERMS AND CONDITIONS",
            termsRequired: "YOU MUST ACCEPT THE TERMS AND CONDITIONS"
        },

        // Final Processing Page
        finalProcessing: {
            title: "MY MAGIC SUNNY, MY CREATION!",
            buttonDownload: "DOWNLOAD",
            buttonShare: "SHARE",
            buttonRestart: "START OVER",
            copyText: "I TRIED THE MAGIC COLLECTION AND ITS MAGIC CLIPS AT AFFLELOU #MAGICSUNNY",
            copyLabel: "SUGGESTED TEXT FOR SHARING:",
            generating: "GENERATING VIDEO...",
            error: "ERROR GENERATING VIDEO"
        },

        // General
        general: {
            loading: "LOADING..."
        }
    }
} as const;

export type TranslationKeys = typeof translations.FR;
