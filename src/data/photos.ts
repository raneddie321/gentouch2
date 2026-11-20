// Real product photos from Wikimedia Commons, used under their stated free licenses.
// Each entry keeps the attribution the license requires; the credits page renders it.

export type PhotoCredit = { file: string; author: string; license: string; url: string }

export const PHOTOS: Record<string, PhotoCredit> = {
  "ps5-pro": { file: "PlayStation 5 Pro no disc drive.jpg", author: "BeatEmUps", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:PlayStation_5_Pro_no_disc_drive.jpg" },
  "ps5-slim-digital": { file: "Playstation 5 modèle slim (édition standard avec lecteur de disque amovible.png", author: "<a href=\"//commons.wikimedia.org/w/index.php?title=User:Back_to_our_history&acti", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Playstation_5_mod%C3%A8le_slim_(%C3%A9dition_standard_avec_lecteur_de_disque_amovible.png" },
  "ps5-slim-disc": { file: "Playstation 5 modèle slim (édition standard avec lecteur de disque amovible.png", author: "<a href=\"//commons.wikimedia.org/w/index.php?title=User:Back_to_our_history&acti", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Playstation_5_mod%C3%A8le_slim_(%C3%A9dition_standard_avec_lecteur_de_disque_amovible.png" },
  "switch-2": { file: "Nintendo Switch 2 in Docking Console.jpg", author: "Crisco 1492", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Nintendo_Switch_2_in_Docking_Console.jpg" },
  "switch-2-mkw": { file: "Nintendo Switch 2 in Docking Console.jpg", author: "Crisco 1492", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Nintendo_Switch_2_in_Docking_Console.jpg" },
  "switch-oled": { file: "Nintendo Switch – OLED-Modell mit gedockter Konsole 20230506 HOF01624 RAW-Export.png", author: "PantheraLeo1359531", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Nintendo_Switch_%E2%80%93_OLED-Modell_mit_gedockter_Konsole_20230506_HOF01624_RAW-Export.png" },
  "xbox-series-s": { file: "Xbox Series S with controller.jpg", author: "<a href=\"//commons.wikimedia.org/w/index.php?title=User:AsmodeanUnderscore&actio", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Xbox_Series_S_with_controller.jpg" },
  "ps-portal": { file: "PlayStation Portal - Case open.jpg", author: "ArlindoPereira", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:PlayStation_Portal_-_Case_open.jpg" },
  "rog-ally-x": { file: "ASUS ROG-Handheld-Leistungsanalyse (极客湾Geekerwan) 15.png", author: "极客湾Geekerwan", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:ASUS_ROG-Handheld-Leistungsanalyse_(%E6%9E%81%E5%AE%A2%E6%B9%BEGeekerwan)_15.png" },
  "psvr2": { file: "PSVR2 (Non-Stereoscopic).png", author: "<table style=\"margin: 1.5em auto; width:100%; color:var(--color-base,#202122); b", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:PSVR2_(Non-Stereoscopic).png" },
  "quest-3": { file: "Meta Quest 3 - 3.jpg", author: "Kyu3a", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Meta_Quest_3_-_3.jpg" },
  "dualsense-edge": { file: "DualSense Edge Controller.jpg", author: "Sonson2", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:DualSense_Edge_Controller.jpg" },
  "dualsense-black": { file: "Playstation 5 DualSense controller in Midnight Black, 2026-02-07 (front).jpg", author: "Chris Woodrich", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Playstation_5_DualSense_controller_in_Midnight_Black,_2026-02-07_(front).jpg" },
  "switch2-pro": { file: "Nintendo-Switch-Pro-Controller-FL.jpg", author: "Evan-Amos", license: "Public domain", url: "https://commons.wikimedia.org/wiki/File:Nintendo-Switch-Pro-Controller-FL.jpg" },
  "xbox-controller": { file: "Xbox Series Controller Carbon Black.jpg", author: "<a href=\"//commons.wikimedia.org/w/index.php?title=User:UKER&action=edit&redlink", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Xbox_Series_Controller_Carbon_Black.jpg" },
  "dom-starter": { file: "Pea sant pc.jpg", author: "<a href=\"//commons.wikimedia.org/w/index.php?title=User:Pea_santsbh&action=edit&", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Pea_sant_pc.jpg" },
  "dom-viper": { file: "Ricer gaming PC with CPU watercooler.jpg", author: "Benlisquare", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ricer_gaming_PC_with_CPU_watercooler.jpg" },
  "dom-titan": { file: "2025 Wnętrze komputera PC.jpg", author: "Jacek Halicki", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2025_Wn%C4%99trze_komputera_PC.jpg" },
  "dom-apex": { file: "Water Cooled PC.jpg", author: "Dave Monk", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Water_Cooled_PC.jpg" },
  "legion-5": { file: "Lenovo Legion Y520 (1).jpg", author: "TAKA@P.P.R.S", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Lenovo_Legion_Y520_(1).jpg" },
  "blackwidow-v4": { file: "Razer BlackWidow Ultimate 2014 Elite Mechanical Gaming Keyboard.jpg", author: "osman.gucel", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Razer_BlackWidow_Ultimate_2014_Elite_Mechanical_Gaming_Keyboard.jpg" },
  "apex-pro-tkl": { file: "SteelSeries Apex 5.jpg", author: "Gregory Karastergios", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:SteelSeries_Apex_5.jpg" },
  "secretlab-titan": { file: "Gaming chair.jpg", author: "<a href=\"//commons.wikimedia.org/w/index.php?title=User:Ndurliat&action=edit&red", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Gaming_chair.jpg" },
  "g29": { file: "Logitech G29 steering wheel.jpg", author: "Antoineets", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Logitech_G29_steering_wheel.jpg" },
  "g923": { file: "Logitech G923 (PlayStation variant) complete set.jpg", author: "FreeMediaKid!</", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Logitech_G923_(PlayStation_variant)_complete_set.jpg" },
  "tlcm": { file: "Thrustmaster Ferrari GT Experience pedals, front.jpg", author: "FreeMediaKid!</", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Thrustmaster_Ferrari_GT_Experience_pedals,_front.jpg" },
  "t16000m": { file: "Thrustmaster T16000M 7937.jpg", author: "Ashley Pomeroy", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Thrustmaster_T16000M_7937.jpg" },
  "slash-vxl": { file: "Traxxas Slash 4x4 TSM OBA 68086-24 Model.jpg", author: "<a href=\"//commons.wikimedia.org/w/index.php?title=User:Sim_tcr&action=edit&redl", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Traxxas_Slash_4x4_TSM_OBA_68086-24_Model.jpg" },
  "dji-mini-4": { file: "2024 Dron DJI Mini 4 Pro (01).jpg", author: "Jacek Halicki", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2024_Dron_DJI_Mini_4_Pro_(01).jpg" },
  "dji-neo": { file: "DJI Neo 2024.jpg", author: "NAN LIU", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:DJI_Neo_2024.jpg" },
}

export const photoOf = (id: string) => (PHOTOS[id] ? `/products/${id}.webp` : undefined)
