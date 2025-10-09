export type Language = 'FR' | 'EN';

export const translations = {
    FR: {
        // Página Start
        start: {
            titleMedium: "MA MAGIC SUNNY",
            titleLarge: "MA CRÉATION !",
            button: "CONTINUER"
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
            buttonValidate: "VALIDER",
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
            errorSubmit: "UNE ERREUR EST SURVENUE. VEUILLEZ RÉESSAYER."
        },

        // Página Final Processing
        finalProcessing: {
            title: "MA MAGIC SUNNY, MA CRÉATION !",
            buttonDownload: "TÉLÉCHARGER",
            buttonShare: "PARTAGER",
            buttonRestart: "RECOMMENCER",
            copyText: "J'AI ESSAYÉ LA COLLECTION MAGIC ET SES MAGIC CLIPS CHEZ AFFLELOU #MAGICSUNNY",
            copyLabel: "TEXTE SUGGÉRÉ POUR LE PARTAGE:",
            generating: "GÉNÉRATION DU VIDÉO...",
            error: "ERREUR LORS DE LA GÉNÉRATION DU VIDÉO"
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
            button: "CONTINUE"
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
            buttonValidate: "VALIDATE",
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
            errorSubmit: "AN ERROR OCCURRED. PLEASE TRY AGAIN."
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
