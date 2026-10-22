/*
  GLAM catalogue — services, products, gallery, FAQs.
  • Images live in /images (services, services/crops, optimized, interiors, exterior, products, Slider).
  • SHOP: the 8 products below are SAMPLE items with SAMPLE prices (INR) and placeholder artwork.
    Replace name, price, discountPrice (selling price, 0 = none), stock, description and image with your real products.
    The Node server (server/server.js) re-reads this file, so Razorpay always charges the price listed here — never a price sent by the browser.
  • price = list price, discountPrice = selling price when lower. stock = units available (0 = sold out).
*/
window.GLAM_DATA = {
  "services": [
    {
      "id": "hair-colors",
      "slug": "hair-colors",
      "name": "Hair Colors",
      "category": "Hair",
      "shortDescription": "Streaks, highlights, global colour, balayage and bleaching — plus colour without bleach, partial highlights, bangs highlights and curly-hair colours.",
      "description": "From subtle streaks to full global colour and hand-painted balayage, our stylists plan shade, placement and lightening around your hair type and lifestyle. Prefer to skip bleach? Ask about without-bleach colour, partial highlights, bangs highlights and colour for curly hair.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Hair Colors including Streaks, Highlights, Global Hair Colour, Balayage, Bleaching, Without Bleach Hair Colour, Partial Highlights and Bangs Highlights and more. Call 9345101346 or book online for an appointment.",
      "image": "images/optimized/hair-color.jpg",
      "imageAlt": "Hair colour service at GLAM: brush-applied caramel highlights on long wavy hair",
      "imagePosition": "center 30%",
      "price": "",
      "discountPrice": "",
      "duration": "Consultation recommended",
      "typeGroups": [
        {
          "title": "Colour techniques",
          "items": [
            {
              "name": "Streaks"
            },
            {
              "name": "Highlights"
            },
            {
              "name": "Global Hair Colour"
            },
            {
              "name": "Balayage"
            },
            {
              "name": "Bleaching"
            }
          ]
        },
        {
          "title": "Colour options",
          "items": [
            {
              "name": "Without Bleach Hair Colour"
            },
            {
              "name": "Partial Highlights"
            },
            {
              "name": "Bangs Highlights"
            },
            {
              "name": "Curly Hair Colours"
            }
          ]
        }
      ],
      "benefits": [
        "Shade and placement guidance",
        "Options with and without bleach",
        "Colour planned for straight, wavy and curly hair"
      ],
      "idealFor": [
        "Guests refreshing or changing their hair colour",
        "Those exploring highlights, balayage or streaks",
        "Curly-haired guests who want colour planned around their curl pattern"
      ],
      "process": [
        "Consultation and shade discussion",
        "Colour application and processing",
        "Toner, finish and styling",
        "Aftercare advice to help colour last"
      ],
      "aftercare": [
        "Use colour-safe shampoo and conditioner as advised",
        "Ask your stylist how often to wash coloured hair",
        "Book maintenance and root touch-ups as recommended"
      ],
      "faqs": [
        {
          "question": "What is balayage and how is it different from highlights?",
          "answer": "Balayage is a hand-painted colouring technique that blends lighter tones through the hair for a soft, natural look with a gradual grow-out. Classic highlights usually lighten selected strands in a more defined pattern. Our stylists will suggest which suits your hair and style."
        },
        {
          "question": "Can I colour my hair without bleach?",
          "answer": "Many shades can be applied without lightening the hair first, but what is possible depends on your natural base colour and the shade you want. Our stylists will assess your hair and explain the options before starting."
        },
        {
          "question": "What is the difference between global colour and partial highlights?",
          "answer": "Global colour covers all of the hair in one shade. Partial highlights colour only selected sections, such as around the face, for a lighter touch of dimension."
        }
      ],
      "keywords": [
        "Streaks",
        "Highlights",
        "Global Hair Colour",
        "Balayage",
        "Bleaching",
        "Without Bleach Hair Colour",
        "Partial Highlights",
        "Bangs Highlights",
        "Curly Hair Colours",
        "Hair Colors",
        "hair colour salon Chennai",
        "hair color Pallikaranai",
        "balayage Chennai",
        "highlights Pallikaranai",
        "global hair colour Chennai",
        "streaks hair colour",
        "bleaching hair salon",
        "Hair Colors in Pallikaranai, Chennai",
        "Hair Colors near me",
        "best hair colors salon in Chennai"
      ],
      "aliases": [
        "hair-color",
        "hair-colour",
        "hair-colours"
      ],
      "featured": true,
      "bookingEnabled": true,
      "seoTitle": "Hair Colors in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Hair Colors at GLAM Unisex Salon, Pallikaranai, Chennai: Streaks, Highlights, Global Hair Colour, Balayage, Bleaching and Without Bleach Hair Colour and more. Book your appointment today."
    },
    {
      "id": "hair-extensions",
      "slug": "hair-extensions",
      "name": "Hair Extension",
      "category": "Hair",
      "shortDescription": "Micro, nano, tape, butterfly, feather and glue extensions, single and double drawn hair, density solutions, hairfall and bald-hair solutions, men’s hair patches and wigs.",
      "description": "Add length, volume or coverage with a method chosen for your hair and lifestyle. GLAM offers micro, nano and tape extensions, butterfly and feather extensions, ice/glue and threading methods, single or double drawn hair, density solutions, hairfall and bald-hair solutions, plus men’s hair patches and wigs — along with extension fixing and removal.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Hair Extension including Micro Extension, Nano Extension, Tape Extension, Butterfly Extension, Feather Hair Extension, Ice / Glue Extension, Threading Extension and Double Drawn Hair and more. Call 9345101346 or book online for an appointment.",
      "image": "images/services/08_Hair_Extensions_Google_Business.jpg",
      "imageAlt": "Hair extensions at GLAM: long wavy hair with caramel highlights",
      "imagePosition": "center 35%",
      "price": "",
      "discountPrice": "",
      "duration": "Consultation recommended",
      "typeGroups": [
        {
          "title": "Extension methods",
          "items": [
            {
              "name": "Micro Extension"
            },
            {
              "name": "Nano Extension"
            },
            {
              "name": "Tape Extension"
            },
            {
              "name": "Butterfly Extension"
            },
            {
              "name": "Feather Hair Extension"
            },
            {
              "name": "Ice / Glue Extension"
            },
            {
              "name": "Threading Extension"
            }
          ]
        },
        {
          "title": "Hair quality",
          "items": [
            {
              "name": "Double Drawn Hair"
            },
            {
              "name": "Single Drawn Hair"
            }
          ]
        },
        {
          "title": "Length & density",
          "items": [
            {
              "name": "Long Hair Extension"
            },
            {
              "name": "Thick Hair Extension"
            },
            {
              "name": "Density Hair Solution"
            }
          ]
        },
        {
          "title": "Hair-loss solutions",
          "items": [
            {
              "name": "Hairfall Solution"
            },
            {
              "name": "Bald Hair Solution"
            },
            {
              "name": "Men’s Hair Patch"
            },
            {
              "name": "Men’s Wig"
            }
          ]
        },
        {
          "title": "Extension care",
          "items": [
            {
              "name": "Fixing Hair Extension"
            },
            {
              "name": "Extension Removal"
            }
          ]
        }
      ],
      "benefits": [
        "A method chosen for your hair, colour and texture",
        "Options for length, volume and density",
        "Solutions for women and men",
        "Fixing and removal handled in one place"
      ],
      "idealFor": [
        "Guests wanting more length or fullness",
        "Thinning hair, hairfall or bald patches",
        "Men looking at hair patches or wigs"
      ],
      "process": [
        "Consultation on hair type, colour and goals",
        "Choosing the method and hair quality",
        "Fitting and blending with your natural hair",
        "Care and maintenance guidance"
      ],
      "aftercare": [
        "Follow your stylist’s product and brushing guidance",
        "Detangle gently from the ends upward",
        "Keep up with recommended maintenance appointments"
      ],
      "faqs": [
        {
          "question": "What types of hair extensions are available at GLAM in Chennai?",
          "answer": "GLAM offers micro, nano and tape extensions, butterfly and feather extensions, ice/glue and threading methods, in single drawn or double drawn hair, along with fixing and removal."
        },
        {
          "question": "What is the difference between single drawn and double drawn hair?",
          "answer": "Single drawn hair contains a mix of longer and shorter strands, so the ends taper naturally. Double drawn hair has more of the shorter strands removed, so the length is more even and the ends look fuller."
        },
        {
          "question": "Do you offer hairfall or bald-hair solutions and men’s wigs?",
          "answer": "Yes. GLAM lists hairfall solutions, bald-hair solutions, men’s hair patches and men’s wigs. A short consultation helps match the option to your needs."
        },
        {
          "question": "Can extensions be fixed or removed at GLAM?",
          "answer": "Yes. Fixing hair extensions and extension removal are both available. Ask our team when booking."
        }
      ],
      "keywords": [
        "Micro Extension",
        "Nano Extension",
        "Tape Extension",
        "Butterfly Extension",
        "Feather Hair Extension",
        "Ice / Glue Extension",
        "Threading Extension",
        "Double Drawn Hair",
        "Single Drawn Hair",
        "Long Hair Extension",
        "Thick Hair Extension",
        "Density Hair Solution",
        "Hairfall Solution",
        "Bald Hair Solution",
        "Men’s Hair Patch",
        "Men’s Wig",
        "Fixing Hair Extension",
        "Extension Removal",
        "Hair Extension",
        "hair extensions Pallikaranai",
        "hair extension Chennai",
        "tape extension",
        "micro ring extension",
        "nano extension",
        "men’s hair patch Chennai",
        "men’s wig Chennai",
        "hairfall solution Chennai",
        "bald hair solution",
        "Hair Extension in Pallikaranai, Chennai",
        "Hair Extension near me",
        "best hair extension salon in Chennai"
      ],
      "aliases": [
        "hair-extension"
      ],
      "featured": true,
      "bookingEnabled": true,
      "seoTitle": "Hair Extension in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Hair Extension at GLAM Unisex Salon, Pallikaranai, Chennai: Micro Extension, Nano Extension, Tape Extension, Butterfly Extension, Feather Hair Extension and Ice / Glue Extension and more. Book your appointment today."
    },
    {
      "id": "makeup",
      "slug": "makeup",
      "name": "Makeups",
      "category": "Beauty & Makeup",
      "shortDescription": "Bridal, groom, wedding, engagement, party, HD, celebrity and simple makeup, plus eye makeup, lenses and eyelashes.",
      "description": "Look your best for the big day or a night out. GLAM offers bridal and groom makeup, wedding and engagement looks, party, HD and celebrity-style makeup, simple everyday makeup, and eye-focused services including eye makeup, lenses and eyelashes.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Makeups including Wedding Makeup, Engagement Makeup, Bridal Makeup, Groom Makeup, Simple Makeup, Party Makeup, HD Makeup and Celebrity Makeup and more. Call 9345101346 or book online for an appointment.",
      "image": "images/services/crops/makeup.svg",
      "imageAlt": "GLAM makeup services: bridal, party, HD and celebrity makeup",
      "imagePosition": "center",
      "price": "",
      "discountPrice": "",
      "duration": "Depends on the look",
      "typeGroups": [
        {
          "title": "Wedding & engagement",
          "items": [
            {
              "name": "Wedding Makeup"
            },
            {
              "name": "Engagement Makeup"
            },
            {
              "name": "Bridal Makeup"
            },
            {
              "name": "Groom Makeup"
            }
          ]
        },
        {
          "title": "Occasion & everyday",
          "items": [
            {
              "name": "Simple Makeup"
            },
            {
              "name": "Party Makeup"
            },
            {
              "name": "HD Makeup"
            },
            {
              "name": "Celebrity Makeup"
            }
          ]
        },
        {
          "title": "Eyes",
          "items": [
            {
              "name": "Best Eye Makeup"
            },
            {
              "name": "Eye Lenses"
            },
            {
              "name": "Eyelashes"
            }
          ]
        }
      ],
      "benefits": [
        "Looks planned around your outfit and occasion",
        "Options for brides, grooms and guests",
        "Eye makeup, lenses and lashes in one booking"
      ],
      "idealFor": [
        "Brides and grooms",
        "Engagements, receptions and parties",
        "Photo and video occasions"
      ],
      "process": [
        "Discuss the occasion, outfit and look you want",
        "Skin preparation",
        "Makeup application",
        "Final touch-ups and finish"
      ],
      "aftercare": [
        "Tell us about skin sensitivities when booking",
        "Ask what to do the day before for your skin type",
        "Carry a few touch-up essentials for long events"
      ],
      "faqs": [
        {
          "question": "Do you offer bridal makeup in Pallikaranai, Chennai?",
          "answer": "Yes. GLAM offers bridal makeup and groom makeup, along with wedding and engagement looks. Book early for wedding dates and tell us about your outfit and the look you have in mind."
        },
        {
          "question": "What is HD makeup?",
          "answer": "HD makeup uses fine, well-blended products designed to look smooth and natural in photographs and on camera, which makes it a popular choice for weddings and events."
        },
        {
          "question": "Do you offer eye makeup, lenses and eyelashes?",
          "answer": "Yes. Eye makeup, coloured lenses and eyelashes are available as part of our makeup services. Ask our team when booking."
        }
      ],
      "keywords": [
        "Wedding Makeup",
        "Engagement Makeup",
        "Bridal Makeup",
        "Groom Makeup",
        "Simple Makeup",
        "Party Makeup",
        "HD Makeup",
        "Celebrity Makeup",
        "Best Eye Makeup",
        "Eye Lenses",
        "Eyelashes",
        "Makeups",
        "bridal makeup Chennai",
        "bridal makeup Pallikaranai",
        "party makeup Chennai",
        "HD makeup Chennai",
        "engagement makeup",
        "groom makeup",
        "celebrity makeup artist Chennai",
        "wedding makeup Velachery",
        "Makeups in Pallikaranai, Chennai",
        "Makeups near me",
        "best makeups salon in Chennai"
      ],
      "aliases": [
        "makeup",
        "makeups",
        "bridal-makeup"
      ],
      "featured": true,
      "bookingEnabled": true,
      "seoTitle": "Makeups in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Makeups at GLAM Unisex Salon, Pallikaranai, Chennai: Wedding Makeup, Engagement Makeup, Bridal Makeup, Groom Makeup, Simple Makeup and Party Makeup and more. Book your appointment today."
    },
    {
      "id": "hair-styling",
      "slug": "hair-styling",
      "name": "Hair Cut & Styling",
      "category": "Hair",
      "shortDescription": "Haircuts for women, men and kids, trending styles, bridal hair, men’s styling, beard styles, saree draping and pre-pleating.",
      "description": "From a fresh layer cut or bob to a sharp fade, mullet or beard style, our team shapes a look that suits you. We also style hair for occasions — bridal hair, trending styles and hair designs — and help with saree draping and pre-pleating.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Hair Cut & Styling including Hair Styling, Hair Designs, Trending Hair Style, Bridal Hair, Men’s Hair Styling, Saree Draping, Pre-Pleating and V Cut and more. Call 9345101346 or book online for an appointment.",
      "image": "images/optimized/hair-salon-haircut.jpg",
      "imageAlt": "A stylist working on a guest’s hair at GLAM salon",
      "imagePosition": "center 35%",
      "price": "",
      "discountPrice": "",
      "duration": "Ask our team",
      "typeGroups": [
        {
          "title": "Hair styling & occasion looks",
          "items": [
            {
              "name": "Hair Styling"
            },
            {
              "name": "Hair Designs"
            },
            {
              "name": "Trending Hair Style"
            },
            {
              "name": "Bridal Hair"
            },
            {
              "name": "Men’s Hair Styling"
            },
            {
              "name": "Saree Draping"
            },
            {
              "name": "Pre-Pleating"
            }
          ]
        },
        {
          "title": "Haircuts",
          "items": [
            {
              "name": "V Cut"
            },
            {
              "name": "U Cut"
            },
            {
              "name": "Straight Cut"
            },
            {
              "name": "Trending Hair Cut"
            },
            {
              "name": "Layer Cut"
            },
            {
              "name": "Bob Cut"
            },
            {
              "name": "Butterfly Cut"
            },
            {
              "name": "Curtain Bangs"
            },
            {
              "name": "Bangs / Front Bangs"
            }
          ]
        },
        {
          "title": "Kids",
          "items": [
            {
              "name": "Kids Haircut"
            }
          ]
        },
        {
          "title": "Men’s grooming",
          "items": [
            {
              "name": "Men’s Haircut"
            },
            {
              "name": "Mullet"
            },
            {
              "name": "Fade"
            },
            {
              "name": "Beard Style"
            }
          ]
        }
      ],
      "benefits": [
        "Personalised consultation",
        "Cuts and styles for women, men and kids",
        "Occasion styling including bridal hair and saree draping"
      ],
      "idealFor": [
        "Anyone wanting a fresh cut or new style",
        "Brides and wedding guests",
        "Men looking for a haircut, fade or beard style"
      ],
      "process": [
        "Discuss your look and hair type",
        "Wash, cut and shaping",
        "Styling and finishing",
        "At-home styling and care tips"
      ],
      "aftercare": [
        "Use hair care products suited to your hair type",
        "Ask about the best way to style your new cut at home",
        "Book regular trims to keep the shape"
      ],
      "faqs": [
        {
          "question": "What haircuts and styles does GLAM offer?",
          "answer": "GLAM offers V cut, U cut, straight cut, layer cut, bob cut, butterfly cut, curtain bangs and front bangs, trending haircuts, kids haircuts, and men’s haircuts including fade and mullet, plus hair styling, hair designs and bridal hair."
        },
        {
          "question": "Do you offer men’s haircuts and beard styling?",
          "answer": "Yes. GLAM is a unisex salon with men’s haircuts, fade and mullet cuts, men’s hair styling and beard styling."
        },
        {
          "question": "Do you offer saree draping and pre-pleating?",
          "answer": "Yes. Saree draping and pre-pleating are available. Tell our team about the occasion when booking so we can plan your time."
        }
      ],
      "keywords": [
        "Hair Styling",
        "Hair Designs",
        "Trending Hair Style",
        "Bridal Hair",
        "Men’s Hair Styling",
        "Saree Draping",
        "Pre-Pleating",
        "V Cut",
        "U Cut",
        "Straight Cut",
        "Trending Hair Cut",
        "Layer Cut",
        "Bob Cut",
        "Butterfly Cut",
        "Curtain Bangs",
        "Bangs / Front Bangs",
        "Kids Haircut",
        "Men’s Haircut",
        "Mullet",
        "Fade",
        "Beard Style",
        "Hair Cut & Styling",
        "unisex salon Pallikaranai",
        "haircut Pallikaranai",
        "men’s haircut Chennai",
        "kids haircut Chennai",
        "layer cut Chennai",
        "beard style Chennai",
        "saree draping Chennai",
        "bridal hairstyle Chennai",
        "fade haircut Chennai",
        "Hair Cut & Styling in Pallikaranai, Chennai",
        "Hair Cut & Styling near me",
        "best hair cut & styling salon in Chennai"
      ],
      "aliases": [
        "hair-cut",
        "haircut",
        "hair-salon-haircut",
        "beard-grooming",
        "unisex-grooming",
        "grooming"
      ],
      "featured": true,
      "bookingEnabled": true,
      "seoTitle": "Hair Cut & Styling in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Hair Cut & Styling at GLAM Unisex Salon, Pallikaranai, Chennai: Hair Styling, Hair Designs, Trending Hair Style, Bridal Hair, Men’s Hair Styling and Saree Draping and more. Book your appointment today."
    },
    {
      "id": "hair-spa",
      "slug": "hair-spa",
      "name": "Hair Spa",
      "category": "Hair",
      "shortDescription": "Nourishing, curly, coloured and chemical-treated hair spa, plus frizz control, anti-dandruff, smooth hair, head massage, scrub and steam.",
      "description": "A hair spa gives your hair and scalp a deep clean and conditioning session. Choose a hair spa matched to your concern — nourishing, curly, frizz control, anti-dandruff, smooth hair, coloured or chemical-treated hair — and add a relaxing head massage, scrub or steam.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Hair Spa including Nourishing Hair Spa, Curly Hair Spa, Frizz Control Hair Spa, Anti-Dandruff Hair Spa, Smooth Hair Spa, Coloured Hair Spa, Chemical-Treated Hair Spa and Head Massage and more. Call 9345101346 or book online for an appointment.",
      "image": "images/services/crops/hair-spa.jpg",
      "imageAlt": "Hair spa and wash area at GLAM salon",
      "imagePosition": "center 30%",
      "price": "",
      "discountPrice": "",
      "duration": "Ask our team",
      "typeGroups": [
        {
          "title": "Hair spa types",
          "items": [
            {
              "name": "Nourishing Hair Spa"
            },
            {
              "name": "Curly Hair Spa"
            },
            {
              "name": "Frizz Control Hair Spa"
            },
            {
              "name": "Anti-Dandruff Hair Spa"
            },
            {
              "name": "Smooth Hair Spa"
            },
            {
              "name": "Coloured Hair Spa"
            },
            {
              "name": "Chemical-Treated Hair Spa"
            }
          ]
        },
        {
          "title": "Add-ons",
          "items": [
            {
              "name": "Head Massage"
            },
            {
              "name": "Scrub"
            },
            {
              "name": "Steam"
            }
          ]
        }
      ],
      "benefits": [
        "A hair spa matched to your hair concern",
        "Care for coloured and chemically treated hair",
        "Relaxing head massage, scrub and steam add-ons"
      ],
      "idealFor": [
        "Dry, frizzy or dull-looking hair",
        "Scalp concerns such as dandruff",
        "Coloured, curly or chemically treated hair"
      ],
      "process": [
        "Hair and scalp check",
        "Cleansing and scrub (where chosen)",
        "Spa mask, steam and massage",
        "Rinse, dry and styling advice"
      ],
      "aftercare": [
        "Use a shampoo and conditioner your stylist recommends",
        "Ask how often a hair spa suits your hair",
        "Protect hair from heat and sun between visits"
      ],
      "faqs": [
        {
          "question": "What is a hair spa?",
          "answer": "A hair spa is a salon treatment that typically combines cleansing, a conditioning or nourishing mask, steam and a scalp massage to leave hair softer and easier to manage."
        },
        {
          "question": "Which hair spa is right for frizz or dandruff?",
          "answer": "GLAM offers frizz control and anti-dandruff hair spas, along with nourishing, curly, smooth hair, coloured and chemical-treated options. Our stylists will recommend one after looking at your hair and scalp."
        },
        {
          "question": "How is a hair spa different from a hair treatment like keratin?",
          "answer": "A hair spa focuses on cleansing and conditioning care. Treatments such as keratin or smoothing are typically more involved services aimed at smoothing or reshaping the hair. Our team can explain which suits your goal."
        }
      ],
      "keywords": [
        "Nourishing Hair Spa",
        "Curly Hair Spa",
        "Frizz Control Hair Spa",
        "Anti-Dandruff Hair Spa",
        "Smooth Hair Spa",
        "Coloured Hair Spa",
        "Chemical-Treated Hair Spa",
        "Head Massage",
        "Scrub",
        "Steam",
        "Hair Spa",
        "hair spa Pallikaranai",
        "hair spa Chennai",
        "anti dandruff hair spa",
        "frizz control hair spa",
        "nourishing hair spa",
        "head massage Chennai",
        "Hair Spa in Pallikaranai, Chennai",
        "Hair Spa near me",
        "best hair spa salon in Chennai"
      ],
      "aliases": [
        "hair-spas"
      ],
      "featured": false,
      "bookingEnabled": true,
      "seoTitle": "Hair Spa in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Hair Spa at GLAM Unisex Salon, Pallikaranai, Chennai: Nourishing Hair Spa, Curly Hair Spa, Frizz Control Hair Spa, Anti-Dandruff Hair Spa, Smooth Hair Spa and Coloured Hair Spa and more. Book your appointment today."
    },
    {
      "id": "hair-treatment",
      "slug": "hair-treatment",
      "name": "Hair Treatment",
      "category": "Hair",
      "shortDescription": "Smoothing, straightening, keratin, hair botox, Botoplex, cysteine, nanoplastia, Nashi treatment and bouncy curly perming.",
      "description": "Transform frizzy, unruly or flat hair. GLAM offers smoothing, straightening, keratin, botox, Botoplex, cysteine, nanoplastia and Nashi hair treatments for smoother, shinier hair, plus bouncy and curly perming if you want more definition.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Hair Treatment including Smoothing, Straightening, Keratin, Botox, Botoplex, Cysteine, Nano Plastia and Nashi Hair Treatment and more. Call 9345101346 or book online for an appointment.",
      "image": "images/services/crops/hair-treatment.jpg",
      "imageAlt": "Smooth, shiny long hair after a hair treatment at GLAM",
      "imagePosition": "center 40%",
      "price": "",
      "discountPrice": "",
      "duration": "Consultation recommended",
      "typeGroups": [
        {
          "title": "Smoothing & straightening",
          "items": [
            {
              "name": "Smoothing"
            },
            {
              "name": "Straightening"
            },
            {
              "name": "Keratin"
            },
            {
              "name": "Botox"
            },
            {
              "name": "Botoplex"
            },
            {
              "name": "Cysteine"
            },
            {
              "name": "Nano Plastia"
            },
            {
              "name": "Nashi Hair Treatment"
            }
          ]
        },
        {
          "title": "Curls",
          "items": [
            {
              "name": "Bouncy Hair Perming"
            },
            {
              "name": "Curly Perming"
            }
          ]
        }
      ],
      "benefits": [
        "A treatment matched to your hair type and goal",
        "Options for smooth, straight or curly results",
        "Professional guidance on aftercare"
      ],
      "idealFor": [
        "Frizzy or hard-to-manage hair",
        "Guests wanting straighter, smoother hair",
        "Those wanting bouncy curls"
      ],
      "process": [
        "Hair assessment and goal discussion",
        "Treatment selection",
        "Application and processing",
        "Finish and aftercare guidance"
      ],
      "aftercare": [
        "Follow the wash and care instructions your stylist gives you",
        "Use shampoo and conditioner recommended for treated hair",
        "Ask when to book your next maintenance visit"
      ],
      "faqs": [
        {
          "question": "What is the difference between smoothing, straightening, keratin and hair botox?",
          "answer": "Straightening reshapes hair to be straighter. Smoothing reduces frizz while keeping some natural movement. Keratin treatments use keratin-based formulas to smooth and add shine, and hair botox is a deep-conditioning treatment aimed at softness and shine. Results depend on your hair, so our stylists will advise the best fit."
        },
        {
          "question": "Do you offer perming for curls?",
          "answer": "Yes. GLAM offers bouncy hair perming and curly perming. Ask our team how each would work with your hair length and condition."
        },
        {
          "question": "Which hair treatments does GLAM offer in Chennai?",
          "answer": "GLAM offers smoothing, straightening, keratin, botox, Botoplex, cysteine, nanoplastia, Nashi hair treatment and curly or bouncy perming at our Pallikaranai salon."
        }
      ],
      "keywords": [
        "Smoothing",
        "Straightening",
        "Keratin",
        "Botox",
        "Botoplex",
        "Cysteine",
        "Nano Plastia",
        "Nashi Hair Treatment",
        "Bouncy Hair Perming",
        "Curly Perming",
        "Hair Treatment",
        "keratin treatment Chennai",
        "hair smoothing Pallikaranai",
        "hair straightening Chennai",
        "hair botox Chennai",
        "nanoplastia Chennai",
        "cysteine hair treatment",
        "hair perming Chennai",
        "Hair Treatment in Pallikaranai, Chennai",
        "Hair Treatment near me",
        "best hair treatment salon in Chennai"
      ],
      "aliases": [
        "hair-treatments"
      ],
      "featured": true,
      "bookingEnabled": true,
      "seoTitle": "Hair Treatment in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Hair Treatment at GLAM Unisex Salon, Pallikaranai, Chennai: Smoothing, Straightening, Keratin, Botox, Botoplex and Cysteine and more. Book your appointment today."
    },
    {
      "id": "detan",
      "slug": "detan",
      "name": "Detan",
      "category": "Skin & Aesthetics",
      "shortDescription": "Tan removal for face, neck, hands, legs and full body, plus pigmentation and dark-spot care with peels, face masks and face packs.",
      "description": "Help your skin look fresher and more even after sun exposure. GLAM offers tan removal for the face and neck, hands, legs and full body, and care for pigmentation and dark spots using peels, face masks and face packs.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Detan including Tan Removal, Face & Neck Tan Removal, Full Body Tan Removal, Pigmentation, Dark Spots Removal, Peel, Face Mask and Face Pack. Call 9345101346 or book online for an appointment.",
      "image": "images/services/crops/detan.jpg",
      "imageAlt": "Face detan treatment with a face mask at GLAM",
      "imagePosition": "center 35%",
      "price": "",
      "discountPrice": "",
      "duration": "Ask our team",
      "typeGroups": [
        {
          "title": "Tan removal",
          "items": [
            {
              "name": "Tan Removal"
            },
            {
              "name": "Face & Neck Tan Removal"
            },
            {
              "name": "Full Body Tan Removal"
            }
          ]
        },
        {
          "title": "Pigmentation care",
          "items": [
            {
              "name": "Pigmentation"
            },
            {
              "name": "Dark Spots Removal"
            }
          ]
        },
        {
          "title": "Peels & masks",
          "items": [
            {
              "name": "Peel"
            },
            {
              "name": "Face Mask"
            },
            {
              "name": "Face Pack"
            }
          ]
        }
      ],
      "benefits": [
        "Options from face and neck to full body",
        "Care for pigmentation and dark spots",
        "Peels, masks and packs matched to your skin"
      ],
      "idealFor": [
        "Sun-exposed, tanned or uneven-looking skin",
        "Pre-event skin preparation",
        "Guests with pigmentation or dark spots"
      ],
      "process": [
        "Skin check and sensitivity discussion",
        "Cleansing and preparation",
        "Treatment with the chosen peel, mask or pack",
        "Aftercare guidance"
      ],
      "aftercare": [
        "Use sun protection as advised",
        "Avoid harsh products right after treatment unless advised otherwise",
        "Ask when to repeat the treatment"
      ],
      "faqs": [
        {
          "question": "What is a detan treatment?",
          "answer": "A detan treatment uses professional masks, packs or peels to help lift surface tan and even out the look of the skin. The right option depends on your skin, so our team will recommend one after a skin check."
        },
        {
          "question": "Do you offer full body tan removal?",
          "answer": "Yes. GLAM offers face and neck tan removal, hand and leg tan removal, and full body tan removal."
        },
        {
          "question": "Can detan help with pigmentation and dark spots?",
          "answer": "GLAM offers pigmentation and dark-spot care as part of detan and also within Skin Rejuvenation. Suitability and results vary, so our team will assess your skin first."
        }
      ],
      "keywords": [
        "Tan Removal",
        "Face & Neck Tan Removal",
        "Full Body Tan Removal",
        "Pigmentation",
        "Dark Spots Removal",
        "Peel",
        "Face Mask",
        "Face Pack",
        "Detan",
        "detan treatment Chennai",
        "tan removal Pallikaranai",
        "full body tan removal Chennai",
        "face and neck tan removal",
        "pigmentation treatment Chennai",
        "dark spots removal Chennai",
        "Detan in Pallikaranai, Chennai",
        "Detan near me",
        "best detan salon in Chennai"
      ],
      "aliases": [
        "de-tan",
        "tan-removal"
      ],
      "featured": false,
      "bookingEnabled": true,
      "seoTitle": "Detan in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Detan at GLAM Unisex Salon, Pallikaranai, Chennai: Tan Removal, Face & Neck Tan Removal, Full Body Tan Removal, Pigmentation, Dark Spots Removal and Peel and more. Book your appointment today."
    },
    {
      "id": "facials",
      "slug": "facials",
      "name": "Facial",
      "category": "Skin & Aesthetics",
      "shortDescription": "HydraFacial, skin brightening, glutathione, vitamin C and anti-aging facials, plus care for uneven skin, acne and pimples.",
      "description": "Refresh and care for your skin with a facial chosen for your skin concern. GLAM offers HydraFacial, skin brightening, glutathione, vitamin C and anti-aging facials, along with treatments for uneven skin, acne and pimples, including peels, face masks and face packs.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Facial including HydraFacial, Skin Brightening Facial, Glutathione Facial, Vitamin C Facial, Anti-Aging Facial, Uneven Skin Facial, Acne / Pimple Facial and Peel and more. Call 9345101346 or book online for an appointment.",
      "image": "images/services/04_Facials_Google_Business.jpg",
      "imageAlt": "A relaxing facial treatment at GLAM",
      "imagePosition": "center 30%",
      "price": "",
      "discountPrice": "",
      "duration": "Ask our team",
      "typeGroups": [
        {
          "title": "Signature facials",
          "items": [
            {
              "name": "HydraFacial"
            },
            {
              "name": "Skin Brightening Facial"
            },
            {
              "name": "Glutathione Facial"
            },
            {
              "name": "Vitamin C Facial"
            },
            {
              "name": "Anti-Aging Facial"
            }
          ]
        },
        {
          "title": "Skin concerns",
          "items": [
            {
              "name": "Uneven Skin Facial"
            },
            {
              "name": "Acne / Pimple Facial"
            }
          ]
        },
        {
          "title": "Peels & masks",
          "items": [
            {
              "name": "Peel"
            },
            {
              "name": "Face Mask"
            },
            {
              "name": "Face Pack"
            }
          ]
        }
      ],
      "benefits": [
        "A facial matched to your skin concern",
        "Brightening, hydration and anti-aging options",
        "Care for acne-prone and uneven skin"
      ],
      "idealFor": [
        "Dull, tired or uneven-looking skin",
        "Acne-prone skin",
        "Pre-event skin preparation"
      ],
      "process": [
        "Skin check and goal discussion",
        "Cleansing and preparation",
        "Facial treatment with massage and mask or pack",
        "Skincare and aftercare advice"
      ],
      "aftercare": [
        "Use sun protection daily",
        "Follow the skincare routine our team suggests",
        "Tell us about sensitivities before your next visit"
      ],
      "faqs": [
        {
          "question": "Which facials does GLAM offer in Pallikaranai, Chennai?",
          "answer": "GLAM offers HydraFacial, skin brightening, glutathione, vitamin C and anti-aging facials, and facials for uneven skin, acne and pimples, as well as peels, face masks and face packs."
        },
        {
          "question": "Which facial is best for dull or uneven skin?",
          "answer": "Skin brightening, glutathione and vitamin C facials are the brightness-focused options, and there is a facial for uneven skin as well. Our team will recommend one after seeing your skin."
        },
        {
          "question": "What is a HydraFacial?",
          "answer": "A HydraFacial is a multi-step facial that cleanses, exfoliates and hydrates the skin in one session. Ask our team whether it suits your skin."
        }
      ],
      "keywords": [
        "HydraFacial",
        "Skin Brightening Facial",
        "Glutathione Facial",
        "Vitamin C Facial",
        "Anti-Aging Facial",
        "Uneven Skin Facial",
        "Acne / Pimple Facial",
        "Peel",
        "Face Mask",
        "Face Pack",
        "Facial",
        "facial Pallikaranai",
        "facial Chennai",
        "HydraFacial Chennai",
        "glutathione facial Chennai",
        "vitamin C facial",
        "anti aging facial Chennai",
        "acne facial Chennai",
        "skin brightening facial",
        "Facial in Pallikaranai, Chennai",
        "Facial near me",
        "best facial salon in Chennai"
      ],
      "aliases": [
        "facial",
        "facials"
      ],
      "featured": true,
      "bookingEnabled": true,
      "seoTitle": "Facial in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Facial at GLAM Unisex Salon, Pallikaranai, Chennai: HydraFacial, Skin Brightening Facial, Glutathione Facial, Vitamin C Facial, Anti-Aging Facial and Uneven Skin Facial and more. Book your appointment today."
    },
    {
      "id": "manicure-pedicure",
      "slug": "manicure-pedicure",
      "name": "Pedicure / Manicure",
      "category": "Beauty & Makeup",
      "shortDescription": "Basic and best pedicure and manicure, deep cleansing, foot massage, foot scrub, tan removal, nail polish, gel polish, nail shaping and foot crack care.",
      "description": "Hands and feet, beautifully cared for. Choose a basic or best pedicure or manicure, and add deep cleansing, foot massage, a foot scrub, leg or hand tan removal, a peel, nail shaping, nail polish or gel polish. Foot crack care is available too.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Pedicure / Manicure including Basic Pedicure, Basic Manicure, Best Pedicure, Best Manicure, Deep Cleansing, Foot Massage, Foot Scrub and Foot Crack Treatment and more. Call 9345101346 or book online for an appointment.",
      "image": "images/services/06_Manicure_Pedicure_Google_Business.jpg",
      "imageAlt": "A pedicure and foot care service at GLAM",
      "imagePosition": "center 40%",
      "price": "",
      "discountPrice": "",
      "duration": "Ask our team",
      "typeGroups": [
        {
          "title": "Pedicure & manicure",
          "items": [
            {
              "name": "Basic Pedicure"
            },
            {
              "name": "Basic Manicure"
            },
            {
              "name": "Best Pedicure"
            },
            {
              "name": "Best Manicure"
            }
          ]
        },
        {
          "title": "Care & add-ons",
          "items": [
            {
              "name": "Deep Cleansing"
            },
            {
              "name": "Foot Massage"
            },
            {
              "name": "Foot Scrub"
            },
            {
              "name": "Foot Crack Treatment"
            },
            {
              "name": "Leg Tan Removal"
            },
            {
              "name": "Hand Tan Removal"
            },
            {
              "name": "Peel"
            }
          ]
        },
        {
          "title": "Nails",
          "items": [
            {
              "name": "Nail Polish"
            },
            {
              "name": "Gel Polish"
            },
            {
              "name": "Nail Shape"
            }
          ]
        }
      ],
      "benefits": [
        "Basic and best options for every need",
        "Care for rough, cracked or tanned feet and hands",
        "Polish, gel polish and nail shaping"
      ],
      "idealFor": [
        "Regular hand and foot care",
        "Cracked heels and tanned hands or feet",
        "Wedding and event preparation"
      ],
      "process": [
        "Soak and cleansing",
        "Nail shaping and cuticle care",
        "Scrub, massage and chosen care",
        "Polish or gel polish and finish"
      ],
      "aftercare": [
        "Moisturise hands and feet regularly",
        "Wear sun protection on exposed skin",
        "Ask how often to book a refresh"
      ],
      "faqs": [
        {
          "question": "What is the difference between a basic and a best pedicure or manicure?",
          "answer": "A basic service covers essential nail and skin care, while the best version adds extra care steps. Ask our team what is included in each when you book."
        },
        {
          "question": "Do you offer gel polish and nail shaping?",
          "answer": "Yes. GLAM offers regular nail polish, gel polish and nail shaping."
        },
        {
          "question": "Can you help with cracked heels or tanned feet?",
          "answer": "Yes. Foot crack treatment, foot scrub, foot massage and leg and hand tan removal are available."
        }
      ],
      "keywords": [
        "Basic Pedicure",
        "Basic Manicure",
        "Best Pedicure",
        "Best Manicure",
        "Deep Cleansing",
        "Foot Massage",
        "Foot Scrub",
        "Foot Crack Treatment",
        "Leg Tan Removal",
        "Hand Tan Removal",
        "Peel",
        "Nail Polish",
        "Gel Polish",
        "Nail Shape",
        "Pedicure / Manicure",
        "pedicure Pallikaranai",
        "manicure Chennai",
        "gel polish Chennai",
        "foot crack treatment",
        "best pedicure Chennai",
        "nail care salon Chennai",
        "Pedicure / Manicure in Pallikaranai, Chennai",
        "Pedicure / Manicure near me",
        "best pedicure / manicure salon in Chennai"
      ],
      "aliases": [
        "pedicure",
        "manicure",
        "pedicure-manicure"
      ],
      "featured": false,
      "bookingEnabled": true,
      "seoTitle": "Pedicure / Manicure in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Pedicure / Manicure at GLAM Unisex Salon, Pallikaranai, Chennai: Basic Pedicure, Basic Manicure, Best Pedicure, Best Manicure, Deep Cleansing and Foot Massage and more. Book your appointment today."
    },
    {
      "id": "waxing",
      "slug": "waxing",
      "name": "Waxing",
      "category": "Beauty & Makeup",
      "shortDescription": "Hair removal waxing for underarms, full arms, legs, face, back, front, bikini and full body.",
      "description": "Smooth skin with careful, professional waxing. GLAM offers underarm, full arm, leg, forehead, chin, upper lip and side-face waxing, along with back, front, bikini and full body waxing.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Waxing including Hair Removal Waxing, Underarm Wax, Full Arms Wax, Leg Wax, Back Wax, Front Wax, Bikini Wax and Full Body Wax and more. Call 9345101346 or book online for an appointment.",
      "image": "images/services/05_Waxing_Google_Business.jpg",
      "imageAlt": "A waxing service at GLAM salon",
      "imagePosition": "center 35%",
      "price": "",
      "discountPrice": "",
      "duration": "Depends on the area",
      "typeGroups": [
        {
          "title": "Body waxing",
          "items": [
            {
              "name": "Hair Removal Waxing"
            },
            {
              "name": "Underarm Wax"
            },
            {
              "name": "Full Arms Wax"
            },
            {
              "name": "Leg Wax"
            },
            {
              "name": "Back Wax"
            },
            {
              "name": "Front Wax"
            },
            {
              "name": "Bikini Wax"
            },
            {
              "name": "Full Body Wax"
            }
          ]
        },
        {
          "title": "Face waxing",
          "items": [
            {
              "name": "Forehead Wax"
            },
            {
              "name": "Chin Wax"
            },
            {
              "name": "Upper Lip Wax"
            },
            {
              "name": "Sides Wax"
            }
          ]
        }
      ],
      "benefits": [
        "Options from small areas to full body",
        "Professional, hygienic service",
        "Guidance on preparation and aftercare"
      ],
      "idealFor": [
        "Guests wanting smooth skin",
        "Pre-event or holiday preparation",
        "Men and women"
      ],
      "process": [
        "Quick skin and hair check",
        "Skin preparation",
        "Waxing of the chosen area",
        "Soothing finish and aftercare"
      ],
      "aftercare": [
        "Avoid heat, sun and harsh products on the area right after waxing unless advised otherwise",
        "Moisturise gently",
        "Ask when to return for your next session"
      ],
      "faqs": [
        {
          "question": "Which waxing services does GLAM offer?",
          "answer": "GLAM offers underarm, full arms, leg, forehead, chin, upper lip, sides, back, front, bikini and full body waxing."
        },
        {
          "question": "How should I prepare for waxing?",
          "answer": "Hair generally needs to have grown out a few millimetres for the wax to grip well. Tell our team about any skin sensitivities or recent treatments when you book."
        },
        {
          "question": "Do you offer bikini and full body waxing?",
          "answer": "Yes. Bikini wax and full body wax are both available. Let us know your preferences when booking."
        }
      ],
      "keywords": [
        "Hair Removal Waxing",
        "Underarm Wax",
        "Full Arms Wax",
        "Leg Wax",
        "Back Wax",
        "Front Wax",
        "Bikini Wax",
        "Full Body Wax",
        "Forehead Wax",
        "Chin Wax",
        "Upper Lip Wax",
        "Sides Wax",
        "Waxing",
        "waxing Pallikaranai",
        "waxing Chennai",
        "full body wax Chennai",
        "bikini wax Chennai",
        "underarm wax",
        "leg wax Chennai",
        "hair removal salon Chennai",
        "Waxing in Pallikaranai, Chennai",
        "Waxing near me",
        "best waxing salon in Chennai"
      ],
      "aliases": [
        "wax",
        "hair-removal"
      ],
      "featured": false,
      "bookingEnabled": true,
      "seoTitle": "Waxing in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Waxing at GLAM Unisex Salon, Pallikaranai, Chennai: Hair Removal Waxing, Underarm Wax, Full Arms Wax, Leg Wax, Back Wax and Front Wax and more. Book your appointment today."
    },
    {
      "id": "threading",
      "slug": "threading",
      "name": "Threading",
      "category": "Beauty & Makeup",
      "shortDescription": "Eyebrow threading plus chin, side-face, upper lip and forehead threading.",
      "description": "Clean, precise shaping with threading. GLAM offers eyebrow threading, along with chin, side-face, upper lip and forehead threading.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Threading including Eyebrow Threading, Chin Threading, Side Face Threading, Upper Lip Threading and Forehead Threading. Call 9345101346 or book online for an appointment.",
      "image": "images/services/crops/threading.svg",
      "imageAlt": "GLAM threading services: eyebrows, upper lip, chin and forehead",
      "imagePosition": "center",
      "price": "",
      "discountPrice": "",
      "duration": "Quick service",
      "typeGroups": [
        {
          "title": "Threading areas",
          "items": [
            {
              "name": "Eyebrow Threading"
            },
            {
              "name": "Chin Threading"
            },
            {
              "name": "Side Face Threading"
            },
            {
              "name": "Upper Lip Threading"
            },
            {
              "name": "Forehead Threading"
            }
          ]
        }
      ],
      "benefits": [
        "Precise eyebrow shaping",
        "Quick service for small areas",
        "Suitable for most facial hair concerns"
      ],
      "idealFor": [
        "Regular brow shaping",
        "Facial hair removal on small areas",
        "Quick pre-event touch-ups"
      ],
      "process": [
        "Discuss the shape you want",
        "Skin preparation",
        "Threading of the chosen area",
        "Soothing finish"
      ],
      "aftercare": [
        "Avoid touching or rubbing the area right after",
        "Use sun protection on the area",
        "Ask when your next touch-up is due"
      ],
      "faqs": [
        {
          "question": "Which areas can be threaded at GLAM?",
          "answer": "GLAM offers eyebrow threading, chin threading, side-face threading, upper lip threading and forehead threading."
        },
        {
          "question": "What is the difference between threading and waxing?",
          "answer": "Threading removes hair along the line using a twisted thread, which allows precise shaping, especially for eyebrows. Waxing is usually used for larger areas. Our team can suggest which suits you."
        }
      ],
      "keywords": [
        "Eyebrow Threading",
        "Chin Threading",
        "Side Face Threading",
        "Upper Lip Threading",
        "Forehead Threading",
        "Threading",
        "eyebrow threading Pallikaranai",
        "eyebrow threading Chennai",
        "upper lip threading",
        "face threading Chennai",
        "threading salon Chennai",
        "Threading in Pallikaranai, Chennai",
        "Threading near me",
        "best threading salon in Chennai"
      ],
      "aliases": [
        "eyebrow-threading",
        "eyebrows"
      ],
      "featured": false,
      "bookingEnabled": true,
      "seoTitle": "Threading in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Threading at GLAM Unisex Salon, Pallikaranai, Chennai: Eyebrow Threading, Chin Threading, Side Face Threading, Upper Lip Threading and Forehead Threading and more. Book your appointment today."
    },
    {
      "id": "microblading",
      "slug": "microblading",
      "name": "MicroBlading",
      "category": "Beauty & Makeup",
      "shortDescription": "Thick, sharp, dark and permanent eyebrow options for a natural, defined brow shape.",
      "description": "Define your brows with a semi-permanent pigment service. GLAM offers microblading for thick, sharp and dark eyebrows, along with permanent eyebrow options. A consultation helps you choose the shape, colour and finish.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers MicroBlading including Thick Eyebrow, Sharp Eyebrow, Dark Eyebrow and Permanent Eyebrow. Call 9345101346 or book online for an appointment.",
      "image": "images/services/crops/microblading.jpg",
      "imageAlt": "Microblading at GLAM: perfect brows, natural look, defined shape",
      "imagePosition": "center",
      "price": "",
      "discountPrice": "",
      "duration": "Consultation recommended",
      "typeGroups": [
        {
          "title": "Eyebrow options",
          "items": [
            {
              "name": "Thick Eyebrow"
            },
            {
              "name": "Sharp Eyebrow"
            },
            {
              "name": "Dark Eyebrow"
            },
            {
              "name": "Permanent Eyebrow"
            }
          ]
        }
      ],
      "benefits": [
        "Brow shape planned around your face",
        "Choice of thick, sharp or dark finish",
        "Clear aftercare guidance"
      ],
      "idealFor": [
        "Sparse or uneven eyebrows",
        "Guests who want defined brows every day",
        "Those who want to save time on brow makeup"
      ],
      "process": [
        "Consultation on shape, colour and suitability",
        "Brow mapping",
        "Microblading service",
        "Aftercare guidance"
      ],
      "aftercare": [
        "Follow your professional’s aftercare instructions closely",
        "Avoid touching or picking the area",
        "Ask about touch-up timing"
      ],
      "faqs": [
        {
          "question": "What is microblading?",
          "answer": "Microblading is a semi-permanent brow service that uses pigment and fine strokes to create the look of fuller, more defined brows. A consultation should cover suitability, shape, healing expectations and aftercare."
        },
        {
          "question": "What eyebrow options does GLAM offer?",
          "answer": "GLAM offers thick eyebrow, sharp eyebrow, dark eyebrow and permanent eyebrow options. Our team will help you choose."
        }
      ],
      "keywords": [
        "Thick Eyebrow",
        "Sharp Eyebrow",
        "Dark Eyebrow",
        "Permanent Eyebrow",
        "MicroBlading",
        "microblading Chennai",
        "microblading Pallikaranai",
        "permanent eyebrows Chennai",
        "eyebrow microblading",
        "thick eyebrow",
        "sharp eyebrow",
        "MicroBlading in Pallikaranai, Chennai",
        "MicroBlading near me",
        "best microblading salon in Chennai"
      ],
      "aliases": [
        "micro-blading",
        "permanent-eyebrow",
        "eyebrow-microblading"
      ],
      "featured": true,
      "bookingEnabled": true,
      "seoTitle": "MicroBlading in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "MicroBlading at GLAM Unisex Salon, Pallikaranai, Chennai: Thick Eyebrow, Sharp Eyebrow, Dark Eyebrow and Permanent Eyebrow and more. Book your appointment today."
    },
    {
      "id": "skin-rejuvenation",
      "slug": "skin-rejuvenation",
      "name": "Skin Rejuvenation",
      "category": "Skin & Aesthetics",
      "shortDescription": "Q-switch and carbon laser, cellular LED light therapy, chemical, glow and party peels, and care for pimple marks, pigmentation, dark spots, dark lips and uneven skin tone.",
      "description": "Advanced aesthetic care, planned around your skin. GLAM offers Q-switch laser, carbon laser, cellular LED light therapy, chemical peels, glow peels and party peels, with options for pimple marks, uneven skin tone, pigmentation, dark spots, dark lips, mouth-circle darkness, hydration and acne.",
      "quickAnswer": "GLAM Unisex Salon in Pallikaranai, Chennai offers Skin Rejuvenation including Q-Switch Laser, Carbon Laser, Cellular Light Therapy, Chemical Peels, Glow Peel, Party Peels, Pimple Marks and Acne / Pimples and more. Call 9345101346 or book online for an appointment.",
      "image": "images/services/crops/skin-rejuvenation.jpg",
      "imageAlt": "Advanced aesthetic skin rejuvenation at GLAM: healthy skin, natural glow",
      "imagePosition": "center",
      "price": "",
      "discountPrice": "",
      "duration": "Consultation recommended",
      "typeGroups": [
        {
          "title": "Laser & light",
          "items": [
            {
              "name": "Q-Switch Laser"
            },
            {
              "name": "Carbon Laser"
            },
            {
              "name": "Cellular Light Therapy"
            }
          ]
        },
        {
          "title": "Peels",
          "items": [
            {
              "name": "Chemical Peels"
            },
            {
              "name": "Glow Peel"
            },
            {
              "name": "Party Peels"
            }
          ]
        },
        {
          "title": "Skin concerns",
          "items": [
            {
              "name": "Pimple Marks"
            },
            {
              "name": "Acne / Pimples"
            },
            {
              "name": "Uneven Skin Tone"
            },
            {
              "name": "Pigmentation"
            },
            {
              "name": "Dark Spots"
            },
            {
              "name": "Mouth Circle"
            },
            {
              "name": "Dark Lips"
            },
            {
              "name": "Lip Pigment"
            },
            {
              "name": "Hydrating Treatment"
            }
          ]
        }
      ],
      "benefits": [
        "A consultation to review your skin, suitability and aftercare",
        "Laser, light and peel options in one place",
        "Care for pigmentation, marks, dark lips and uneven tone"
      ],
      "idealFor": [
        "Pimple marks, dark spots or uneven skin tone",
        "Dark lips or mouth-circle darkness",
        "Guests exploring advanced aesthetic skin care"
      ],
      "process": [
        "Skin consultation and suitability check",
        "Treatment plan discussion",
        "Treatment session",
        "Aftercare and follow-up guidance"
      ],
      "aftercare": [
        "Follow the aftercare plan given by your professional",
        "Use sun protection as advised",
        "Ask how many sessions and what gap may suit you"
      ],
      "faqs": [
        {
          "question": "What skin rejuvenation treatments does GLAM offer in Chennai?",
          "answer": "GLAM offers Q-switch laser, carbon laser, cellular LED light therapy, chemical peels, glow peels and party peels, with options for pimple marks, uneven skin tone, pigmentation, dark spots, dark lips, mouth-circle darkness, hydration and acne."
        },
        {
          "question": "What is carbon laser treatment?",
          "answer": "Carbon laser is an aesthetic treatment using specialist laser equipment. A qualified professional should assess suitability, explain the process and discuss potential risks and aftercare. Individual experiences vary."
        },
        {
          "question": "What is a Q-switch laser?",
          "answer": "A Q-switched laser delivers short, high-energy pulses and is used in aesthetic care to target pigment. Suitability is assessed during consultation, and individual results vary."
        },
        {
          "question": "What is LED light therapy?",
          "answer": "LED light therapy uses selected wavelengths of light in a professional or at-home device. Ask a qualified professional whether it is appropriate for you and how often sessions may be considered."
        },
        {
          "question": "What is a chemical peel, and what is a party peel?",
          "answer": "A chemical peel uses a selected formulation applied by a professional, and strength depends on your skin and goals. Glow and party peels are lighter options often chosen before an event. Ask our team about suitability and aftercare."
        }
      ],
      "keywords": [
        "Q-Switch Laser",
        "Carbon Laser",
        "Cellular Light Therapy",
        "Chemical Peels",
        "Glow Peel",
        "Party Peels",
        "Pimple Marks",
        "Acne / Pimples",
        "Uneven Skin Tone",
        "Pigmentation",
        "Dark Spots",
        "Mouth Circle",
        "Dark Lips",
        "Lip Pigment",
        "Hydrating Treatment",
        "Skin Rejuvenation",
        "skin rejuvenation Chennai",
        "skin rejuvenation Pallikaranai",
        "carbon laser Chennai",
        "Q switch laser Chennai",
        "chemical peel Chennai",
        "LED light therapy Chennai",
        "pimple marks treatment Chennai",
        "dark lips treatment Chennai",
        "pigmentation treatment Pallikaranai",
        "glow peel",
        "Skin Rejuvenation in Pallikaranai, Chennai",
        "Skin Rejuvenation near me",
        "best skin rejuvenation salon in Chennai"
      ],
      "aliases": [
        "skin-rejuvenations",
        "advanced-aesthetic-skin-rejuvenation",
        "carbon-laser",
        "carbon-laser-treatment",
        "cellular-led",
        "cellular-led-light-therapy",
        "chemical-peel",
        "q-switch",
        "glow-peel"
      ],
      "featured": true,
      "bookingEnabled": true,
      "seoTitle": "Skin Rejuvenation in Pallikaranai, Chennai | GLAM Unisex Salon",
      "seoDescription": "Skin Rejuvenation at GLAM Unisex Salon, Pallikaranai, Chennai: Q-Switch Laser, Carbon Laser, Cellular Light Therapy, Chemical Peels, Glow Peel and Party Peels and more. Book your appointment today."
    }
  ],
  "products": [
    {
      "id": "argan-hair-serum",
      "slug": "argan-hair-serum",
      "name": "Argan Hair Serum",
      "brand": "GLAM selection",
      "category": "Hair Care",
      "image": "images/products/argan-hair-serum.svg",
      "imageAlt": "Argan Hair Serum (placeholder artwork)",
      "gallery": [],
      "description": "A lightweight finishing serum to smooth and add shine to everyday hair. Ask our stylists which products suit your hair type.",
      "price": 699,
      "discountPrice": 599,
      "stock": 25,
      "sku": "GLAM-ARGANHAIRS",
      "ingredients": [],
      "usage": "Apply a small amount to damp or dry hair, focusing on the lengths and ends. Refer to the product packaging for full directions.",
      "featured": true
    },
    {
      "id": "repair-shampoo",
      "slug": "repair-shampoo",
      "name": "Repair Shampoo",
      "brand": "GLAM selection",
      "category": "Hair Care",
      "image": "images/products/repair-shampoo.svg",
      "imageAlt": "Repair Shampoo (placeholder artwork)",
      "gallery": [],
      "description": "A gentle daily shampoo recommended for colour-treated and styled hair. Check the label for full details.",
      "price": 549,
      "discountPrice": 0,
      "stock": 40,
      "sku": "GLAM-REPAIRSHAM",
      "ingredients": [],
      "usage": "Massage into wet hair and scalp, then rinse thoroughly. Follow the directions on the packaging.",
      "featured": true
    },
    {
      "id": "nourishing-hair-mask",
      "slug": "nourishing-hair-mask",
      "name": "Nourishing Hair Mask",
      "brand": "GLAM selection",
      "category": "Hair Care",
      "image": "images/products/nourishing-hair-mask.svg",
      "imageAlt": "Nourishing Hair Mask (placeholder artwork)",
      "gallery": [],
      "description": "A conditioning mask for a soft, smooth finish after salon services. Refer to the label for ingredients and usage.",
      "price": 799,
      "discountPrice": 0,
      "stock": 30,
      "sku": "GLAM-NOURISHING",
      "ingredients": [],
      "usage": "Apply to clean, damp hair, leave for the time stated on the packaging, then rinse.",
      "featured": true
    },
    {
      "id": "extension-care-kit",
      "slug": "extension-care-kit",
      "name": "Extension Care Kit",
      "brand": "GLAM selection",
      "category": "Hair Care",
      "image": "images/products/extension-care-kit.svg",
      "imageAlt": "Extension Care Kit (placeholder artwork)",
      "gallery": [],
      "description": "A care set to help you look after hair extensions between salon visits. Ask our team about the care routine for your extensions.",
      "price": 1199,
      "discountPrice": 999,
      "stock": 15,
      "sku": "GLAM-EXTENSIONC",
      "ingredients": [],
      "usage": "Use as advised by your stylist and the instructions in the kit.",
      "featured": true
    },
    {
      "id": "vitamin-c-serum",
      "slug": "vitamin-c-serum",
      "name": "Vitamin C Face Serum",
      "brand": "GLAM selection",
      "category": "Skin Care",
      "image": "images/products/vitamin-c-serum.svg",
      "imageAlt": "Vitamin C Face Serum (placeholder artwork)",
      "gallery": [],
      "description": "A daily face serum for a fresh-looking complexion. Patch test first and refer to the label for ingredients.",
      "price": 999,
      "discountPrice": 0,
      "stock": 20,
      "sku": "GLAM-VITAMINCSE",
      "ingredients": [],
      "usage": "Apply a few drops to clean skin before moisturiser. Follow the directions on the packaging.",
      "featured": true
    },
    {
      "id": "gentle-cleanser",
      "slug": "gentle-cleanser",
      "name": "Gentle Cleanser",
      "brand": "GLAM selection",
      "category": "Skin Care",
      "image": "images/products/gentle-cleanser.svg",
      "imageAlt": "Gentle Cleanser (placeholder artwork)",
      "gallery": [],
      "description": "A mild daily face cleanser designed for a comfortable, clean feel. Refer to the label for details.",
      "price": 449,
      "discountPrice": 0,
      "stock": 50,
      "sku": "GLAM-GENTLECLEA",
      "ingredients": [],
      "usage": "Massage onto damp skin and rinse well. Follow the directions on the packaging.",
      "featured": true
    },
    {
      "id": "daily-sunscreen",
      "slug": "daily-sunscreen",
      "name": "Daily Sunscreen SPF 50",
      "brand": "GLAM selection",
      "category": "Skin Care",
      "image": "images/products/daily-sunscreen.svg",
      "imageAlt": "Daily Sunscreen SPF 50 (placeholder artwork)",
      "gallery": [],
      "description": "A daily sunscreen for everyday protection after treatments and in the Chennai sun. Reapply as directed on the pack.",
      "price": 599,
      "discountPrice": 549,
      "stock": 35,
      "sku": "GLAM-DAILYSUNSC",
      "ingredients": [],
      "usage": "Apply generously to exposed skin before sun exposure and reapply as directed on the packaging.",
      "featured": true
    },
    {
      "id": "beard-oil",
      "slug": "beard-oil",
      "name": "Beard Oil",
      "brand": "GLAM selection",
      "category": "Grooming",
      "image": "images/products/beard-oil.svg",
      "imageAlt": "Beard Oil (placeholder artwork)",
      "gallery": [],
      "description": "A conditioning oil to keep your beard soft and neat between grooming visits.",
      "price": 499,
      "discountPrice": 0,
      "stock": 25,
      "sku": "GLAM-BEARDOIL",
      "ingredients": [],
      "usage": "Warm a few drops in your palms and work through the beard. Follow the directions on the packaging.",
      "featured": true
    }
  ],
  "offers": [],
  "team": [],
  "gallery": [
    {
      "id": "reception",
      "category": "Interior",
      "image": "images/optimized/reception.jpg",
      "alt": "The GLAM reception with a white desk, tan armchairs and a gold Glam wall logo",
      "caption": "Reception",
      "width": 1500,
      "height": 1000,
      "home": true
    },
    {
      "id": "exterior-night",
      "category": "Exterior",
      "image": "images/exterior/Glam_MainBoard1.jpeg",
      "alt": "The illuminated GLAM Unisex Salon signboard at night",
      "caption": "Our signboard",
      "width": 960,
      "height": 1280,
      "home": true
    },
    {
      "id": "salon-display",
      "category": "Interior",
      "image": "images/gallery/Photo1.jpg",
      "alt": "A product display and styling area inside GLAM salon",
      "caption": "Inside the salon",
      "width": 1280,
      "height": 960,
      "home": true
    },
    {
      "id": "hair-color",
      "category": "Hair",
      "image": "images/optimized/hair-color.jpg",
      "alt": "Hair colour service: highlights being applied to long wavy hair",
      "caption": "Hair colour",
      "width": 1254,
      "height": 1254,
      "home": true
    },
    {
      "id": "facials",
      "category": "Skin",
      "image": "images/services/04_Facials_Google_Business.jpg",
      "alt": "A guest enjoying a facial at GLAM",
      "caption": "Facials",
      "width": 1200,
      "height": 1200,
      "home": true
    },
    {
      "id": "exterior-sign",
      "category": "Exterior",
      "image": "images/exterior/Glam_MainBoard2.jpeg",
      "alt": "The GLAM Unisex Salon sign lit above the entrance",
      "caption": "Find us on Velachery Main Road",
      "width": 1280,
      "height": 580,
      "home": false
    },
    {
      "id": "mirror-station",
      "category": "Interior",
      "image": "images/interiors/Photo14.jpg",
      "alt": "Styling mirrors and chairs inside GLAM salon",
      "caption": "Styling stations",
      "width": 1280,
      "height": 960,
      "home": false
    },
    {
      "id": "wash-area",
      "category": "Interior",
      "image": "images/interiors/Photo3.jpg",
      "alt": "The shampoo and wash area at GLAM salon",
      "caption": "Wash area",
      "width": 1280,
      "height": 960,
      "home": false
    },
    {
      "id": "grooming-area",
      "category": "Interior",
      "image": "images/interiors/Photo13.jpg",
      "alt": "The grooming area at GLAM with a decorative partition",
      "caption": "Grooming area",
      "width": 1280,
      "height": 960,
      "home": false
    },
    {
      "id": "haircut",
      "category": "Hair",
      "image": "images/optimized/hair-salon-haircut.jpg",
      "alt": "Hair salon and haircut service at GLAM",
      "caption": "Hair salon & haircut",
      "width": 1400,
      "height": 933,
      "home": false
    },
    {
      "id": "hair-extensions",
      "category": "Hair",
      "image": "images/services/08_Hair_Extensions_Google_Business.jpg",
      "alt": "Hair extensions: long wavy hair with caramel highlights",
      "caption": "Hair extensions",
      "width": 1200,
      "height": 1200,
      "home": false
    },
    {
      "id": "beard",
      "category": "Services",
      "image": "images/services/07_Beard_Grooming_Google_Business.jpg",
      "alt": "A guest receiving a beard grooming service",
      "caption": "Beard grooming",
      "width": 1200,
      "height": 1200,
      "home": false
    },
    {
      "id": "waxing",
      "category": "Services",
      "image": "images/services/05_Waxing_Google_Business.jpg",
      "alt": "A professional waxing service",
      "caption": "Waxing",
      "width": 1200,
      "height": 1200,
      "home": false
    },
    {
      "id": "mani-pedi",
      "category": "Services",
      "image": "images/services/06_Manicure_Pedicure_Google_Business.jpg",
      "alt": "A manicure and pedicure service",
      "caption": "Manicure & pedicure",
      "width": 1200,
      "height": 1200,
      "home": false
    },
    {
      "id": "skin-rejuvenation",
      "category": "Skin",
      "image": "images/Slider/skin-spotlight.jpg",
      "alt": "Skin rejuvenation at GLAM: carbon laser, cellular LED light therapy and chemical peel",
      "caption": "Skin rejuvenation",
      "width": 1600,
      "height": 902
    },
    {
      "id": "brand-board",
      "category": "Brand",
      "image": "images/optimized/main-board-clean.jpg",
      "alt": "GLAM Unisex Salon brand board",
      "caption": "GLAM Unisex Salon",
      "width": 1079,
      "height": 538,
      "home": false
    }
  ],
  "beforeAfter": [],
  "testimonials": [
    {
      "id": "testimonial-placeholder",
      "name": "Guest feedback",
      "quote": "Customer testimonial will be added here once a verified review is supplied.",
      "source": "Placeholder — not a customer review"
    }
  ],
  "faqs": [
    {
      "question": "What services does GLAM Unisex Salon offer in Pallikaranai, Chennai?",
      "answer": "GLAM offers hair colour, hair extensions, makeup, haircuts and styling, hair spa, hair treatments, detan, facials, pedicure and manicure, waxing, threading, microblading and skin rejuvenation for women and men."
    },
    {
      "question": "Where is GLAM Unisex Salon located?",
      "answer": "GLAM is on the 1st floor, 96 Velachery Main Road, near Jeyachandran Textiles, Pallikaranai, Chennai, Tamil Nadu 600100."
    },
    {
      "question": "Is GLAM a unisex salon?",
      "answer": "Yes. GLAM is a unisex salon with services for women and men, including haircuts, beard styling, hair colour, grooming, facials and skin care."
    },
    {
      "question": "Do you offer bridal and groom makeup?",
      "answer": "Yes. GLAM offers bridal makeup, groom makeup, wedding and engagement makeup, party makeup, HD makeup and bridal hair styling. Please book early for wedding dates."
    },
    {
      "question": "How can I book an appointment at GLAM?",
      "answer": "Use the booking form on this website, or call or WhatsApp 9345101346. Our team will confirm your appointment."
    },
    {
      "question": "Can I buy hair and skin care products from GLAM online?",
      "answer": "Yes. The GLAM beauty store sells hair and skin care products with secure online payment, and you can choose home delivery or pick-up from the salon."
    },
    {
      "question": "What is carbon laser treatment?",
      "answer": "Carbon laser is an aesthetic treatment using specialist laser equipment. A qualified professional should assess suitability, explain the process and discuss potential risks and aftercare. Individual experiences vary."
    },
    {
      "question": "What is a chemical peel treatment?",
      "answer": "A chemical peel uses a selected formulation applied by a professional. Type, strength and suitability depend on your skin and goals. Consult a qualified professional and follow their preparation and aftercare advice."
    },
    {
      "question": "What is LED light therapy?",
      "answer": "LED light therapy uses selected wavelengths of light in a professional or at-home device. Ask a qualified professional whether it is appropriate for you and how often sessions may be considered."
    },
    {
      "question": "What is microblading?",
      "answer": "Microblading is a semi-permanent brow service involving pigment and fine strokes. A consultation should cover suitability, shape, healing expectations and aftercare."
    },
    {
      "question": "What are hair extensions?",
      "answer": "Hair extensions add length, volume or both using a method selected for the guest's hair and goals. A consultation helps determine an appropriate method, maintenance plan and home care."
    },
    {
      "question": "How should I prepare for a salon treatment?",
      "answer": "Preparation varies by service. When booking, tell the salon about relevant sensitivities and ask what to avoid or bring. Follow the specific instructions provided by your qualified professional."
    },
    {
      "question": "How should I care for hair extensions?",
      "answer": "Follow your stylist's product and brushing guidance, detangle gently from the ends upward and keep up with recommended maintenance appointments."
    },
    {
      "question": "How often should aesthetic treatments be performed?",
      "answer": "There is no single schedule for everyone. Frequency depends on the treatment, personal circumstances and professional assessment. Consult a qualified professional before planning repeat treatments."
    }
  ]
};

/* Price helpers (shared by the shop pages and the payment server). */
window.GLAM_DATA.sellingPrice = p => (Number(p.discountPrice) > 0 && Number(p.discountPrice) < Number(p.price)) ? Number(p.discountPrice) : Number(p.price) || 0;
window.GLAM_DATA.hasPrice = p => window.GLAM_DATA.sellingPrice(p) > 0;
