import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const idx = trimmed.indexOf("=");
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  let val = trimmed.slice(idx + 1).trim();
  if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
  process.env[key] = val;
}

initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore();

const now = new Date().toISOString();

const articles = [
  {
    slug: "pourquoi-livret-accueil-digital-airbnb",
    title: "Pourquoi un livret d'accueil digital change tout pour votre Airbnb",
    excerpt: "Fini les PDF que personne ne lit et les post-it collés au frigo. Découvrez comment un livret digital améliore l'expérience de vos voyageurs dès leur arrivée.",
    content: `<h2>Le problème avec les livrets papier</h2>
<p>Vous avez passé du temps à imprimer un beau livret d'accueil. Quelques semaines plus tard, il est froissé dans un coin, illisible, et vos voyageurs vous appellent quand même pour vous demander le code WiFi.</p>
<p>C'est le problème numéro un des hôtes Airbnb : l'information existe, mais elle n'est pas accessible au bon moment.</p>

<h2>Un livret toujours à portée de main</h2>
<p>Avec un livret digital, vos voyageurs scannent un QR code dès leur arrivée et ont accès à toutes les informations depuis leur téléphone. Code WiFi, digicode, heure de départ, activités à proximité — tout est là, organisé, lisible, sans téléchargement.</p>

<h2>Moins d'appels, plus de sérénité</h2>
<p>Les hôtes qui utilisent Bunkly rapportent en moyenne 3 fois moins de messages de leurs voyageurs sur les questions pratiques. Vos voyageurs trouvent les réponses eux-mêmes, vous dormez tranquille.</p>

<h2>Des avis qui s'améliorent</h2>
<p>La première impression compte énormément sur Airbnb. Un accueil bien organisé, des informations claires et un livret professionnel donnent immédiatement confiance à vos voyageurs. Résultat : de meilleures notes sur la communication et la précision de l'annonce.</p>

<h2>Modifiable en temps réel</h2>
<p>Le code WiFi change ? Nouvelle règle de la copropriété ? Vous mettez à jour votre livret en deux clics, et tous vos voyageurs voient la modification instantanément. Aucune impression, aucun envoi.</p>

<h2>Conclusion</h2>
<p>Un livret d'accueil digital n'est pas un luxe — c'est l'outil le plus simple pour professionnaliser votre location et améliorer l'expérience de vos voyageurs. Et avec Bunkly, vous en avez un en moins de 10 minutes.</p>`,
    coverImage: "https://picsum.photos/seed/airbnb-welcome/1200/630",
    category: "Conseils",
    published: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: now,
    seo: {
      metaTitle: "Livret d'accueil digital Airbnb : pourquoi c'est indispensable",
      metaDescription: "Découvrez comment un livret d'accueil digital améliore l'expérience de vos voyageurs Airbnb, réduit les messages et booste vos avis.",
      ogImage: "https://picsum.photos/seed/airbnb-welcome/1200/630",
    },
  },
  {
    slug: "que-mettre-dans-livret-accueil-location",
    title: "Que mettre dans un livret d'accueil ? Le guide complet pour les hôtes",
    excerpt: "Check-in, WiFi, règles du séjour, activités... Voici exactement ce que vos voyageurs veulent trouver dans votre livret d'accueil, dans le bon ordre.",
    content: `<h2>Les informations indispensables</h2>
<p>Un bon livret d'accueil répond aux questions que vos voyageurs se posent dans les premières heures. Voici les sections à ne jamais oublier.</p>

<h2>1. Arrivée et accès</h2>
<p>C'est la section la plus consultée. Indiquez :</p>
<ul>
<li>L'heure d'arrivée et de départ</li>
<li>Le code d'accès ou l'emplacement des clés</li>
<li>Les instructions pour trouver le logement (surtout si l'adresse GPS est approximative)</li>
<li>Le code digicode de l'immeuble</li>
<li>Le numéro de parking ou de badge si applicable</li>
</ul>

<h2>2. Le WiFi</h2>
<p>Ne sous-estimez pas l'importance du WiFi. C'est la deuxième chose que cherchent vos voyageurs après avoir posé leurs valises. Nom du réseau et mot de passe, bien lisibles.</p>

<h2>3. Les règles du séjour</h2>
<p>Pas d'animaux, pas de fêtes, tri sélectif obligatoire... Précisez vos règles clairement mais sans être agressif. Un ton bienveillant donne de meilleurs résultats qu'une liste d'interdictions.</p>

<h2>4. La cuisine et le ménage</h2>
<p>Mode d'emploi de la machine à café, emplacement des produits ménagers, consignes pour la vaisselle. Ce sont les petits détails qui font la différence entre un séjour confortable et un séjour stressant.</p>

<h2>5. Les activités et bonnes adresses</h2>
<p>C'est votre chance de faire la différence face aux autres hébergements. Partagez vos adresses favorites : le meilleur restaurant du coin, le marché du dimanche, la randonnée que vous adorez. Vos voyageurs adorent les recommandations locales authentiques.</p>

<h2>6. Urgences et contacts</h2>
<p>Numéro du SAMU (15), pompiers (18), police (17), et votre numéro personnel pour les urgences liées au logement. Emplacement du disjoncteur, de la vanne d'eau.</p>

<h2>7. Départ</h2>
<p>Instructions claires pour rendre les clés, sortir les poubelles, laisser le logement. Un départ bien organisé vous évite des frais de ménage supplémentaires.</p>

<h2>La règle d'or</h2>
<p>Relisez votre livret en vous mettant dans la peau d'un voyageur qui arrive pour la première fois, sans vous connaître, sans connaître le quartier. Si une question reste sans réponse, complétez.</p>`,
    coverImage: "https://picsum.photos/seed/gite-interior/1200/630",
    category: "Conseils",
    published: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: now,
    seo: {
      metaTitle: "Que mettre dans un livret d'accueil ? Guide complet 2024",
      metaDescription: "Check-in, WiFi, règles, activités... Tout ce que vos voyageurs doivent trouver dans votre livret d'accueil. Guide complet pour hôtes Airbnb et gîtes.",
      ogImage: "https://picsum.photos/seed/gite-interior/1200/630",
    },
  },
  {
    slug: "qr-code-livret-accueil-comment-utiliser",
    title: "QR code et livret d'accueil : comment ça marche et où le placer ?",
    excerpt: "Le QR code est le pont entre votre logement physique et votre livret digital. Voici comment l'utiliser intelligemment pour que 100% de vos voyageurs y accèdent.",
    content: `<h2>Pourquoi le QR code est la clé</h2>
<p>Un livret digital n'est utile que si vos voyageurs l'ouvrent. Le QR code est le déclencheur — il transforme une action physique (scanner) en accès immédiat à toutes vos informations. Pas de lien à copier, pas d'application à télécharger.</p>

<h2>Comment fonctionne le QR code de Bunkly</h2>
<p>Quand vous publiez votre livret sur Bunkly, un QR code unique est généré automatiquement. Il pointe vers l'URL de votre livret. Vos voyageurs le scannent avec l'appareil photo de leur téléphone — iOS et Android reconnaissent les QR codes nativement depuis 2017.</p>

<h2>Où placer votre QR code ?</h2>
<p>L'objectif est que vos voyageurs le voient dans les premières minutes après leur arrivée. Les emplacements les plus efficaces :</p>
<ul>
<li><strong>Sur le réfrigérateur</strong> : l'endroit que tout le monde visite en premier</li>
<li><strong>À l'entrée du logement</strong> : sur un cadre ou un panneau de bienvenue</li>
<li><strong>Sur la table de nuit</strong> : pour les informations de départ</li>
<li><strong>Dans le message d'arrivée Airbnb</strong> : envoyez aussi le lien direct</li>
</ul>

<h2>Comment imprimer votre QR code</h2>
<p>Bunkly vous permet de télécharger votre QR code en PNG ou SVG. Quelques conseils pour l'impression :</p>
<ul>
<li>Minimum 3x3 cm pour une lecture fiable</li>
<li>Fond blanc, couleur sombre pour le QR</li>
<li>Ajoutez un texte "Scannez pour votre livret d'accueil" juste en dessous</li>
<li>Plastifiez-le pour qu'il résiste à l'humidité</li>
</ul>

<h2>Le QR code dans le message d'arrivée</h2>
<p>Envoyez le lien de votre livret dans votre message de bienvenue Airbnb ou Booking, quelques heures avant l'arrivée. Vos voyageurs pourront consulter les informations d'accès avant même d'arriver sur place.</p>`,
    coverImage: "https://picsum.photos/seed/qr-code-phone/1200/630",
    category: "Gestion locative",
    published: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: now,
    seo: {
      metaTitle: "QR code livret d'accueil : où le placer et comment l'utiliser",
      metaDescription: "Comment utiliser le QR code de votre livret d'accueil digital. Où le placer dans votre logement pour que tous vos voyageurs y accèdent facilement.",
      ogImage: "https://picsum.photos/seed/qr-code-phone/1200/630",
    },
  },
  {
    slug: "booster-avis-airbnb-experience-voyageur",
    title: "5 façons d'améliorer vos avis Airbnb grâce à l'expérience voyageur",
    excerpt: "Les avis 5 étoiles ne tombent pas du ciel. Ils se construisent dès la première seconde que passe votre voyageur dans votre logement. Voici comment.",
    content: `<h2>Pourquoi les avis sont votre actif le plus précieux</h2>
<p>Sur Airbnb, les avis déterminent votre visibilité dans les résultats de recherche, votre taux de réservation et le prix que vous pouvez demander. Un logement avec 50 avis à 4,9 étoiles vaut deux fois plus qu'un logement identique sans avis.</p>

<h2>1. Soigner les premières minutes</h2>
<p>L'impression que forme votre voyageur dans les 10 premières minutes conditionne tout le reste de son séjour. Un logement propre, bien rangé, avec un mot de bienvenue et des informations claires — c'est le premier investissement.</p>

<h2>2. Répondre aux questions avant qu'elles soient posées</h2>
<p>Chaque message que vous recevez d'un voyageur en cours de séjour est une information manquante dans votre livret d'accueil. Notez chaque question et enrichissez votre livret. Avec le temps, vos voyageurs se débrouillent seuls et leur séjour est plus confortable.</p>

<h2>3. Les petites attentions qui font la différence</h2>
<p>Une bouteille d'eau dans le frigo, quelques sachets de café, un guide des restaurants locaux manuscrit. Ces détails coûtent presque rien mais sont mentionnés dans des dizaines d'avis. Les voyageurs cherchent l'authentique.</p>

<h2>4. Communiquer au bon moment, pas trop</h2>
<p>Envoyez un message d'arrivée la veille avec le lien de votre livret, un message de bienvenue le jour J, et un message de départ la veille du check-out. Pas plus. Les voyageurs qui reçoivent trop de messages le signalent dans les avis.</p>

<h2>5. Demander un avis avec délicatesse</h2>
<p>Dans votre message de départ, glissez une phrase simple : "Si votre séjour vous a plu, un avis nous aide énormément." Naturel, pas insistant. Airbnb envoie aussi une relance automatique — c'est suffisant.</p>

<h2>Le livret d'accueil comme outil de relation</h2>
<p>Un livret d'accueil professionnel montre que vous êtes un hôte sérieux qui a pensé au confort de ses voyageurs avant même leur arrivée. C'est ça que les voyageurs notent dans leurs avis : le soin, l'attention, la préparation.</p>`,
    coverImage: "https://picsum.photos/seed/happy-traveler/1200/630",
    category: "Airbnb",
    published: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: now,
    seo: {
      metaTitle: "5 façons d'améliorer vos avis Airbnb avec l'expérience voyageur",
      metaDescription: "Première impression, livret d'accueil, petites attentions... 5 leviers concrets pour obtenir plus d'avis 5 étoiles sur Airbnb.",
      ogImage: "https://picsum.photos/seed/happy-traveler/1200/630",
    },
  },
  {
    slug: "livret-accueil-gite-camping-location-saisonniere",
    title: "Livret d'accueil pour gîte et camping : les spécificités à connaître",
    excerpt: "Un gîte ou un camping n'est pas un Airbnb. Les informations à communiquer à vos voyageurs sont différentes. Voici un guide adapté.",
    content: `<h2>Les spécificités des gîtes et campings</h2>
<p>Contrairement à un appartement en ville, un gîte rural ou un emplacement de camping demande des informations bien spécifiques. Les voyageurs sont souvent moins familiers avec l'environnement et ont besoin de plus de guidage.</p>

<h2>Les informations d'accès sont cruciales</h2>
<p>En zone rurale, les GPS peuvent mentir. Décrivez précisément le trajet depuis le village le plus proche, les panneaux à suivre, et les points de repère. Indiquez aussi où se garer, surtout si le chemin est étroit.</p>

<h2>Les équipements spécifiques au gîte</h2>
<p>Cheminée (bois disponible ? Comment l'allumer ?), piscine (règles de sécurité, horaires), barbecue (charbon fourni ?), lave-linge (comment ça marche), chauffe-eau (délai pour avoir de l'eau chaude)... Tout ce qui est différent d'un logement urbain mérite une explication.</p>

<h2>Les activités locales : votre vraie valeur ajoutée</h2>
<p>Vos voyageurs ont choisi votre gîte pour l'environnement. Ils attendent de vous des recommandations authentiques : randonnées au départ du gîte, producteurs locaux, marchés, activités nautiques si vous êtes près d'un lac ou de la mer.</p>

<h2>Pour les campings : une section par service</h2>
<p>Sanitaires (horaires, codes), électricité (ampérage, branchement), eau (emplacement des bornes), restauration sur place, animations, règlement intérieur. Un camping a souvent plus de services à expliquer qu'un appartement.</p>

<h2>La nature et les règles de sécurité</h2>
<p>En zone forestière ou en montagne, informez vos voyageurs sur les risques locaux : feux de forêt (interdictions selon la période), tiques (zones à risque), animaux sauvages. C'est une responsabilité d'hôte.</p>

<h2>Un livret digital, même sans connexion</h2>
<p>La plupart des livrets Bunkly se chargent complètement dès la première ouverture. Vos voyageurs peuvent y accéder même en zone avec peu de réseau, une fois le livret chargé sur leur téléphone.</p>`,
    coverImage: "https://picsum.photos/seed/gite-camping-nature/1200/630",
    category: "Gestion locative",
    published: true,
    createdAt: now,
    updatedAt: now,
    seo: {
      metaTitle: "Livret d'accueil gîte et camping : guide complet 2024",
      metaDescription: "Créez un livret d'accueil adapté à votre gîte rural ou camping. Accès, équipements, activités locales... Tout ce que vos voyageurs doivent savoir.",
      ogImage: "https://picsum.photos/seed/gite-camping-nature/1200/630",
    },
  },
];

console.log("Connexion a Firestore...");

let created = 0;
for (const article of articles) {
  await db.collection("blog_articles").add(article);
  console.log(`✓ "${article.title}"`);
  created++;
}

console.log(`\n${created} articles crees avec succes !`);
process.exit(0);
