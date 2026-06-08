import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';

const MALE_NAMES = [
  'Juan', 'Carlos', 'Diego', 'Pedro', 'Miguel', 'Andres', 'Luis', 'Jorge',
  'Mateo', 'Sebastian', 'Ricardo', 'Alejandro', 'Roberto', 'Emilio', 'Hugo',
  'Pablo', 'Santiago', 'Felipe', 'Bruno', 'Ivan', 'Oscar', 'Raul', 'Marco',
  'Adrian', 'Kevin', 'Bryan', 'Cesar', 'Daniel', 'Tomas', 'Nico', 'Lucas',
  'Alan', 'Alvaro', 'Angel', 'Anibal', 'Antonio', 'Axel', 'Benjamin', 'Arturo',
  'Blas', 'Boris', 'Braian', 'Camilo', 'Christian', 'Claudio', 'Cristian', 'Damian',
  'David', 'Diego', 'Dominic', 'Donato', 'Edgar', 'Eduardo', 'Elias', 'Eloy',
  'Elvis', 'Enzo', 'Eric', 'Esau', 'Esteban', 'Fabio', 'Facundo', 'Federico',
  'Felix', 'Fernando', 'Francisco', 'Gabriel', 'Gael', 'Gaston', 'Gerardo', 'Gino',
  'Gonzalo', 'Gorka', 'Guido', 'Gustavo', 'Hector', 'Helio', 'Iago', 'Ian',
  'Ibai', 'Iker', 'Inaki', 'Isaac', 'Ismael', 'Jacobo', 'Jaime', 'Jeronimo',
  'Jesus', 'Joan', 'Joaquin', 'Jordi', 'Josue', 'Julen', 'Julio', 'Kike',
  'Leonardo', 'Liam', 'Lolo', 'Luan', 'Luciano', 'Manuel', 'Marc', 'Mariano',
  'Mario', 'Matias', 'Mauricio', 'Maximiliano', 'Maximo', 'Milton', 'Misael', 'Naim',
  'Nacho', 'Fernando', 'Nazareno', 'Neco', 'Nelson', 'Nery', 'Nestor', 'Noe',
  'Noel', 'Oliver', 'Omar', 'Orlando', 'Otto', 'Paco', 'Patricio', 'Paul',
  'Paulo', 'Pepe', 'Pol', 'Polo', 'Enrique', 'Rafael', 'Ramiro', 'Ramon',
  'Rene', 'Reynaldo', 'Riki', 'Rocco', 'Rodolfo', 'Rodrigo', 'Rogelio', 'Roman',
  'Roni', 'Roy', 'Ruben', 'Samuel', 'Saul', 'Sergio', 'Silvio', 'Tadeo',
  'Teo', 'Thiago', 'Tito', 'Tobias', 'Tono', 'Uriel', 'Valentin', 'Vasco',
  'Vicente', 'Victor', 'Xabi', 'Xavi', 'Yago', 'Yael', 'Yoel', 'Yuri',
  'Zack', 'Zinedine', 'Abel', 'Abraham', 'Adan', 'Adolfo', 'Agustin', 'Aitor',
  'Albert', 'Alberto', 'Aldo', 'Alfonso', 'Alfredo', 'Alonso', 'Amadeo', 'Amado',
  'Amadeo', 'Andoni', 'Anselmo', 'Apolinar', 'Aris', 'Armando', 'Arnaldo', 'Aron',
  'Asier', 'Augusto', 'Aureliano', 'Aurelio', 'Baldomero', 'Baltasar', 'Bartolome', 'Basilio',
  'Baudilio', 'Beltran', 'Benedicto', 'Benigno', 'Benito', 'Bernabe', 'Bernardino', 'Bernardo',
  'Berto', 'Biel', 'Bilal', 'Bonaventura', 'Bonifacio', 'Borja', 'Brais', 'Buenaventura',
  'Calixto', 'Camilo', 'Candido', 'Carles', 'Carmelo', 'Casimiro', 'Cayetano', 'Cecilio',
  'Celestino', 'Celso', 'Cesareo', 'Chema', 'Chimo', 'Cipriano', 'Ciriaco', 'Cirilo',
  'Ciro', 'Claudio', 'Clemente', 'Cleofas', 'Clodoveo', 'Conrado', 'Constancio', 'Constantino',
  'Cornelio', 'Cosme', 'Cristobal', 'Cuauhtemoc', 'Curro', 'Custodio', 'Dacio', 'Dagoberto',
  'Dalmacio', 'Dalmiro', 'Damaso', 'Danilo', 'Dante', 'Dardo', 'Dario', 'Demeter',
  'Demetrio', 'Demian', 'Denis', 'Desiderio', 'Didac', 'Didier', 'Dimas', 'Dino',
  'Diodoro', 'Diogenes', 'Dionisio', 'Divo', 'Dolfi', 'Domingo', 'Donaldo', 'Donato',
  'Duilio', 'Duvan', 'Eberardo', 'Edilberto', 'Edgardo', 'Edmundo', 'Edorta', 'Edgardo',
  'Edu', 'Eduviges', 'Efrain', 'Efren', 'Egidio', 'Egberto', 'Einar', 'Eizan',
  'Eleazar', 'Eleuterio', 'Elias', 'Eligio', 'Eliseo', 'Elmer', 'Eladio', 'Elpidio',
  'Emanol', 'Emanuel', 'Emerico', 'Emidgio', 'Emiliano', 'Eneas', 'Enki', 'Enochs',
  'Enric', 'Ephraim', 'Epifanio', 'Erasmo', 'Erasto', 'Eren', 'Erick', 'Erico',
  'Ermenegildo', 'Ernesto', 'Eros', 'Erwin', 'Esdras', 'Esopo', 'Estanislao', 'Ethelberto',
  'Etienne', 'Eudoxio', 'Eufemio', 'Eufrasio', 'Eugenio', 'Eulalio', 'Eusebio', 'Eustaquio',
  'Eutropio', 'Euzko', 'Evencio', 'Evaristo', 'Evelio', 'Evo', 'Ezequiel', 'Fabian',
  'Fabre', 'Fabrizio', 'Faustino', 'Fausto', 'Febo', 'Federico', 'Fedro', 'Feliciano',
  'Felipe', 'Felix', 'Fermin', 'Fernan', 'Fernando', 'Fidel', 'Filemon', 'Filiberto',
  'Filomeno', 'Finley', 'Flaminio', 'Flavio', 'Floreal', 'Florencio', 'Florentino', 'Florian',
  'Fortunato', 'Francesco', 'Francis', 'Franco', 'Frutos', 'Fulgencio', 'Gabino', 'Gadi',
  'Galder', 'Galdino', 'Galeano', 'Galileo', 'Galo', 'Gandhi', 'Gari', 'Gaspar',
  'Gautier', 'Gedeon', 'Genaro', 'Generoso', 'Genis', 'Geno', 'Gentil', 'Geoffrey',
  'George', 'Geraldo', 'Gerard', 'Gerasimo', 'German', 'Geronimo', 'Gerson', 'Gervasio',
  'Giacomo', 'Gian', 'Giancarlo', 'Gianluca', 'Gibert', 'Gideon', 'Gil', 'Gilbert',
  'Gilberto', 'Gildo', 'Gilles', 'Gimeno', 'Gines', 'Giovanni', 'Giraldo', 'Gisberto',
  'Giuseppe', 'Glauco', 'Godofredo', 'Gomer', 'Gorka', 'Gotzon', 'Graciano', 'Graciliano',
  'Granville', 'Gregorio', 'Gualberto', 'Gualterio', 'Guanca', 'Guarin', 'Guascar', 'Guido',
  'Guifre', 'Guilherme', 'Guillermo', 'Guiu', 'Gumersindo', 'Gunter', 'Gus', 'Gustavo',
  'Hassan', 'Hamilton', 'Hamlet', 'Hannibal', 'Hans', 'Harald', 'Hardy', 'Harold',
  'Haron', 'Haroun', 'Haroldo', 'Harrison', 'Harry', 'Harvey', 'Hassan', 'Hasso',
  'Hayden', 'Heber', 'Hebert', 'Hector', 'Hedi', 'Hedley', 'Heiko', 'Heitor',
  'Heladio', 'Heleno', 'Heliodoro', 'Helios', 'Helmut', 'Henrik', 'Henry', 'Heracleo',
  'Heraclio', 'Herberto', 'Heriberto', 'Herman', 'Hermenegildo', 'Hermes', 'Herminio', 'Hermocrates',
  'Hernan', 'Hernando', 'Herodes', 'Herodoto', 'Heron', 'Hervid', 'Hervie', 'Hervig',
  'Hezekiah', 'Hilario', 'Hilarion', 'Hildebrando', 'Hildeberto', 'Hildelberto', 'Hildo', 'Hilmar',
  'Hipolito', 'Hiram', 'Hiroshi', 'Ho', 'Hobart', 'Holden', 'Homer', 'Homero',
  'Honorato', 'Honorio', 'Horacio', 'Horacio', 'Horta', 'Hortensio', 'Hosea', 'Hosi',
  'Howard', 'Hubert', 'Huberto', 'Hudson', 'Hugh', 'Hugo', 'Humberto', 'Humphrey',
  'Hunter', 'Husein', 'Hussein', 'Hyatt', 'Hyde', 'Iago', 'Ian', 'Ianis', 'Ianthina',
  'Ianuario', 'Iarek', 'Iba', 'Ibai', 'Iban', 'Ibar', 'Ibrahim', 'Icaro', 'Ichabod',
  'Idelberto', 'Idelfonso', 'Ido', 'Idoia', 'Idomeneo', 'Idris', 'Idriss', 'Ifor',
  'Igal', 'Ignacio', 'Ignasi', 'Igor', 'Iham', 'Ihasian', 'Ihering', 'Ikaia', 'Ikatz',
  'Iker', 'Ikey', 'Iksu', 'Ilan', 'Ildefonso', 'Iledim', 'Ilham', 'Ilian', 'Ilic',
  'Ilidio', 'Illan', 'Illart', 'Imad', 'Imanol', 'Imbert', 'Imanol', 'Imran'
];

const GAMER_IDS = [
  'Juan393', 'Carlos07', 'diego99', 'MiguelFC', 'Pedro_21', 'Luis88',
  'JorgePro', 'Mateo777', 'Sebas_10', 'Ricky23', 'AlexFC26', 'Rob_99',
  'Emi_07', 'Hugo33', 'PabloX', 'Santi12', 'Pipe_88', 'BrunoFC',
  'Ivan_19', 'RaulPro', 'Marco_55', 'Adri_27', 'Kevinx9', 'BryanFC',
  'Cesar_14', 'Dani393', 'Tomas07', 'Nico_99', 'LucasFC', 'xDiego_1',
  'Alan_44', 'AlexPro_X', 'Alvaro99', 'Andres_FC', 'Angel_7', 'AnibalX',
  'Anto_22', 'Axel_93', 'Benja_FC', 'Beto007', 'Blas_X', 'Boris_99',
  'Braian7', 'Bruno_Pro', 'CamiloX', 'Chema_88', 'Chicho9', 'Chris_FC',
  'ClaudioX', 'Cris_21', 'Dami_99', 'Dano_Pro', 'Dany_FC', 'Davi_77',
  'Dego_X', 'Didi_10', 'Dino_88', 'Domi_93', 'Donato7', 'Eddy_FC',
  'EdgarX', 'Edu_23', 'Eli_99', 'Eloy_Pro', 'Elvi_77', 'Enzo_FC',
  'Eric_14', 'Esau_X', 'Esteban7', 'Fabio_99', 'Facu_FC', 'Fede_21',
  'FelixX', 'Fernan77', 'Fito_88', 'Fran_Pro', 'Gabi_10', 'Gael_FC',
  'GastonX', 'Gera_99', 'Gino_23', 'Goni_7', 'Gorka_FC', 'GuidoX',
  'Gus_88', 'Hansi_99', 'Hector7', 'Helio_FC', 'Iago_Pro', 'Ian_21',
  'Ibai_X', 'Iker_99', 'Iñaki7', 'Isaac_FC', 'Isma_88', 'Jaco_Pro',
  'JaimeX', 'Javi_10', 'Jero_99', 'Jesus77', 'Joan_FC', 'Joaco_23',
  'JordiX', 'Josu_88', 'Juancho7', 'Julen_FC', 'Julio_99', 'Kike_Pro',
  'Koke_X', 'Lalo_21', 'Lau_99', 'Leo_FC', 'Lian_77', 'Lito_X',
  'Lolo_88', 'Luan_Pro', 'Luca_10', 'Lucho_FC', 'Mani_99', 'Manu_23',
  'ManuX', 'Marc_88', 'Mario77', 'Mati_FC', 'Mau_Pro', 'Max_21',
  'Maxi_X', 'Memo_99', 'Milo7', 'Mingo_FC', 'Misa_88', 'Miti_Pro',
  'Momo_X', 'Nacho_10', 'Nando_99', 'Nano77', 'Naza_FC', 'Neco_23',
  'NeloX', 'Nery_88', 'Neto7', 'Nico_Pro', 'Noe_FC', 'Noel_99',
  'Oli_21', 'Omar_X', 'Oscar77', 'Otto_FC', 'Ovi_88', 'Paco_Pro',
  'Pato_X', 'Pau_10', 'Paulo_99', 'Pepo7', 'Pol_FC', 'Polo_23',
  'QuinoX', 'Quique88', 'Rafa77', 'Rami_FC', 'Ramon_Pro', 'Rene_21',
  'Rey_X', 'Riki_99', 'Roco7', 'Rodo_FC', 'Rodrigo88', 'Roni_Pro',
  'Roy_X', 'Ruben_10', 'Rudi_99', 'Samu77', 'Santi_FC', 'Saul_23',
  'SebeX', 'Sergio88', 'Silo7', 'Silvio_FC', 'Sofi_Pro', 'Suso_21',
  'Tadeo_X', 'Tato_99', 'Teo77', 'Thiago_FC', 'Tino_23', 'TitoX',
  'Tobi_88', 'Toño7', 'Toti_Pro', 'Uriel_FC', 'Valen_99', 'Vasco_21',
  'Veto_X', 'Vic_777', 'Viti_88', 'Xabi_Pro', 'Xavi_FC', 'Yago_99',
  'Yael7', 'Yeri_X', 'Yoel_88', 'Yuri_Pro', 'Zack_FC', 'Zizu_21',
  'Zuko_X', 'Alan777', 'Alex_X9', 'Alvaro_FC', 'Andre_99', 'AngelPro',
  'Anto_88', 'Axel_FC', 'Benja_X', 'Beto_23', 'Bruno_10', 'Cami_99',
  'Carlos_X', 'Chema77', 'ChrisPro', 'Claudio88', 'Cris_FC', 'Dami_X',
  'Dani_21', 'Dano99', 'Davi_Pro', 'Diego_77', 'Domi_FC', 'DonatoX',
  'Edgar_88', 'Edu_FC', 'Eli_Pro', 'Enzo_23', 'Eric777', 'Esteban_X',
  'Fabio_FC', 'Facu99', 'Fede_Pro', 'Felix_88', 'Fernan_X', 'Fran_10',
  'Gabi99', 'Gael_Pro', 'Gaston_FC', 'Gera_21', 'GinoX', 'Gorka88',
  'Guido_FC', 'Gus_Pro', 'Hector_X', 'Iago99', 'Ian_FC', 'Ibai_Pro',
  'Iker_23', 'Isaac777', 'Isma_X', 'Jaime_88', 'Javi_FC', 'Jero_Pro',
  'Jesus_21', 'JoanX', 'Joaco99', 'Jordi_FC', 'Juan_Pro', 'Julen88',
  'Julio_X', 'Kike_10', 'Lalo99', 'Lau_FC', 'Leo_Pro', 'Lian_23',
  'Lito777', 'Lolo_X', 'Luca_88', 'Lucho_FC', 'Manu_Pro', 'Marc_21',
  'Mario_X', 'Mati99', 'Mau_FC', 'Max_Pro', 'Memo_23', 'Milo777',
  'Misa_X', 'Nacho_88', 'Nando_FC', 'Nano_Pro', 'Naza_21', 'Neco_X',
  'Neto99', 'Nico_FC', 'Noel_Pro', 'Oli_23', 'Omar777', 'Oscar_X',
  'Otto_88', 'Paco_FC', 'Pato_Pro', 'Pau_21', 'Paulo_X', 'Pepo99',
  'Pol_FC', 'Quique_Pro', 'Rafa_23', 'Rami777', 'Ramon_X', 'Rene_88',
  'Riki_FC', 'Rodo_Pro', 'Rodrigo21', 'Roni_X', 'Ruben99', 'Samu_FC',
  'Santi_Pro', 'Saul_23', 'Sergio777', 'Silvio_X', 'Tadeo_88', 'Tato_FC',
  'Teo_Pro', 'Thiago21', 'Tito_X', 'Tobi99', 'Toño_FC', 'Uriel_Pro',
  'Valen_23', 'Vasco777', 'Vic_X', 'Xabi_88', 'Xavi_FC', 'Yago_Pro',
  'Yoel_21', 'Zack_X', 'Zizu99', 'Ace_Gamer', 'Alpha_21', 'Apex_X',
  'Aqua_FC', 'Ares_99', 'Argo_Pro', 'As_10', 'Atlas_88', 'Atom777',
  'Axe_FC', 'Bad_BoyX', 'Balko_99', 'Bane_Pro', 'Baron_21', 'Beast_FC',
  'Blade_88', 'BlazeX', 'Blitz_99', 'Bolt_Pro', 'Bone_7', 'Boss_FC',
  'BraveX', 'Breaker9', 'Bruiser88', 'Bullet_FC', 'Buster_X', 'Buzz_99',
  'Cali_Pro', 'Chaos_21', 'Chief_FC', 'ChronoX', 'Cobra_99', 'Colt_Pro',
  'Comet7', 'Cosmo_FC', 'Crash_88', 'CronosX', 'Crow_99', 'Cruz_Pro',
  'Cyber_21', 'Dark_FC', 'DashX', 'Dawn_99', 'Death_Pro', 'Delta_7',
  'Demis_FC', 'Demon_88', 'DestroX', 'Dex_99', 'Diablo_Pro', 'Dice_21',
  'Diesel_FC', 'Dino_X', 'Doom_99', 'Draco_Pro', 'Dread_7', 'Drift_FC',
  'Duke_88', 'DuskX', 'Eagle_99', 'Echo_Pro', 'Eclipse_21', 'Edge_FC',
  'Elixir_X', 'Elite_99', 'Ember_Pro', 'End_7', 'Enigma_FC', 'Epic_88',
  'Era_X', 'Eternal99', 'Evade_Pro', 'Exile_21', 'Exit_FC', 'Fade_X',
  'Falcon_99', 'Fang_Pro', 'Fate_7', 'Fear_FC', 'Fenix_88', 'Fierce_X',
  'Fire_99', 'Flame_Pro', 'Flash_21', 'Flex_FC', 'Flint_X', 'Flux_99',
  'Focus_Pro', 'Force_7', 'Fox_FC', 'Frost_88', 'Fury_X', 'Gage_99',
  'Galaxy_Pro', 'Gamma_21', 'Gash_FC', 'Ghost_X', 'Giant_99', 'Glitch_Pro',
  'Gloom_7', 'Gorgon_FC', 'Grim_88', 'Grit_X', 'Grizzly99', 'Gunner_Pro',
  'Guts_21', 'Hades_FC', 'Halo_X', 'Hammer_99', 'Hawk_Pro', 'Hazard_7',
  'Haze_FC', 'Heat_88', 'Heavy_X', 'Helios99', 'Hex_Pro', 'Hulk_21',
  'Hunter_FC', 'Hydra_X', 'Hyper_99', 'Ice_Pro', 'Icon_7', 'Impact_FC',
  'Inferno88', 'Ion_X', 'Iron_99', 'Ivory_Pro', 'Jackal_21', 'Jade_FC',
  'Jaguar_X', 'Jester_99', 'Jet_Pro', 'Jinx_7', 'Joker_FC', 'Jolt_88',
  'Judge_X', 'Kahn_99', 'Karma_Pro', 'Kendo_21', 'Khan_FC', 'Kid_X',
  'Killer_99', 'King_Pro', 'Knight_7', 'Koba_FC', 'Kratos88', 'Kraken_X',
  'Laser_99', 'Lava_Pro', 'Law_21', 'Legend_FC', 'Levi_X', 'Link_99',
  'Lion_Pro', 'Liquid_7', 'Lobo_FC', 'Loki_88', 'Lunar_X', 'Lynx_99',
  'Mach_Pro', 'Mad_21', 'Mage_FC', 'Magma_X', 'Major_99', 'Mamba_Pro',
  'Maniac_7', 'Mantis_FC', 'Mars_88', 'Matrix_X', 'Maverick99', 'Max_Pro',
  'Maze_21', 'Mega_FC', 'Mecha_X', 'Merc_99', 'Merlin_Pro', 'Metal_7',
  'Meteor_FC', 'Midnight88', 'Mind_X', 'Mamba_99', 'Mirage_Pro', 'Mist_21',
  'Mojo_FC', 'Monk_X', 'Monster99', 'Morgan_Pro', 'Morph_7', 'Mystic_FC',
  'Nadir_88', 'Nano_X', 'Nebula99', 'Necro_Pro', 'Nemesis21', 'Neon_FC',
  'Nero_X', 'Nexus_99', 'Nitro_Pro', 'Nova_7', 'Nox_FC', 'Nuke_88',
  'Onyx_X', 'Optic_99', 'Orc_Pro', 'Omega_21', 'Orion_FC', 'Outlaw_X',
  'Ozone_99', 'Panda_Pro', 'Panic_7', 'Phantom_FC', 'Phase_88', 'Phobia_X',
  'Phoenix99', 'Photon_Pro', 'Pilot_21', 'Plague_FC', 'Plasma_X', 'Pluto_99',
  'Poison_Pro', 'Polar_7', 'Prism_FC', 'Psycho_88', 'Pulse_X', 'Puma_99',
  'Pyro_Pro', 'Quantum21', 'Quake_FC', 'Quest_X', 'Radar_99', 'Rage_Pro',
  'Raid_7', 'Ranger_FC', 'Rapid_88', 'Raptor_X', 'Ray_99', 'Razor_Pro',
  'Rebel_21', 'Recon_FC', 'Red_X', 'Reflex_99', 'Relic_Pro', 'Remix_7',
  'Rex_FC', 'Rift_88', 'Riot_X', 'Riptide99', 'Risk_Pro', 'Rival_21',
  'Rogue_FC', 'Rush_X', 'Saber_99', 'Savage_Pro', 'Scalp_7', 'Scarab_FC',
  'Scout_88', 'Scrap_X', 'Scythe99', 'Sector_Pro', 'Shadow_21', 'Shark_FC',
  'Shine_X', 'Shock_99', 'Siege_Pro', 'Sigma_7', 'Silver_FC', 'Siren_88',
  'SkeletorX', 'Slayer99', 'Slick_Pro', 'Slot_21', 'Smoke_FC', 'Sniper_X',
  'Solar_99', 'SolitaryPro', 'Spark_7', 'Specter_FC', 'Speed_88', 'Sphinx_X',
  'Spike_99', 'SpitfirePro', 'Spooky_21', 'Spy_FC', 'Static_X', 'Steel_99',
  'Storm_Pro', 'Strike_7', 'Sub_FC', 'Sun_88', 'Surge_X', 'Swift_99',
  'SynapsePro', 'Talon_21', 'Tank_FC', 'Taz_X', 'Tempest99', 'Terror_Pro',
  'Thor_7', 'Thrash_FC', 'Thunder88', 'Tidal_X', 'Tiger_99', 'Titan_Pro',
  'Toxic_21', 'Trace_FC', 'Tracker_X', 'Tracer_99', 'Trauma_Pro', 'Trench_7',
  'Trigger_FC', 'Trinity88', 'Triton_X', 'Trojan_99', 'TrooperPro', 'Turbo_21',
  'Tusk_FC', 'Twitch_X', 'Typhoon99', 'Ultra_Pro', 'Uranium_7', 'Vader_FC',
  'Valkyrie88', 'Vamp_X', 'Vandal_99', 'VanguardPro', 'Vapor_21', 'Vektor_FC',
  'Venom_X', 'Viper_99', 'Void_Pro', 'Volt_7', 'Vortex_FC', 'Vulture88',
  'Xenon_X', 'Xerxes_99', 'Zeta_Pro', 'Zeus_21', 'Ziggy_FC', 'Zion_X'
];

const pickRandom = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const buildRandomBuyer = () => {
  if (Math.random() < 0.55) return pickRandom(GAMER_IDS);

  const base = pickRandom(MALE_NAMES);
  const num = Math.floor(Math.random() * 900) + 10;
  const styles = [
    `${base}${num}`,
    `${base}_${num}`,
    `${base.toLowerCase()}${num}`,
    `${base}${num}FC`,
  ];
  return pickRandom(styles);
};

const PURCHASES = [
  { text: '100K monedas' },
  { text: '300K monedas' },
  { text: '500K monedas' },
  { text: '1M monedas' },
  { text: '2M monedas' },
  { text: '5M monedas' },
  { text: '10M monedas' },
  { text: 'boosting Rango 1' },
  { text: 'boosting Rango 2' },
  { text: 'boosting Rango 3' },
  { text: 'boosting Rango 4' },
  { text: 'boosting Rango 5' },
  { text: 'boosting Division elite' },
  { text: 'boosting Division 1' },
  { text: 'boosting Division 2' },
  { text: 'Objetivo Maradona' },
  { text: 'Objetivo Messi' },
  { text: 'Objetivo Ronaldinho' },
  { text: 'Objetivo Mbappé' },
  { text: 'Objetivo Haaland' },
  { text: 'Objetivo Bellingham' },
];

type Notification = { id: number; name: string; purchase: string };

const buildNotification = (): Notification => {
  const name = buildRandomBuyer();
  const purchase = pickRandom(PURCHASES);
  return { id: Date.now() + Math.random(), name, purchase: purchase.text };
};

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomNextDelay = () => randomBetween(15_000, 45_000);

const randomVisibleDuration = () => randomBetween(4_000, 6_000);

const randomInitialDelay = () => randomBetween(6_000, 12_000);

const buildNotifications = (): Notification[] => {
  const count = Math.random() < 0.22 ? 2 : 1;
  return Array.from({ length: count }, () => buildNotification());
};

export const LivePurchaseNotification = () => {
  const { pathname } = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visible, setVisible] = useState(false);

  const isPublicPage = useMemo(
    () => !pathname.startsWith('/dashboard') && !pathname.startsWith('/login') && !pathname.startsWith('/register'),
    [pathname]
  );

  useEffect(() => {
    if (!isPublicPage) return;

    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const showNotifications = () => {
      setNotifications(buildNotifications());
      setVisible(true);

      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setVisible(false), randomVisibleDuration());
    };

    const scheduleNext = () => {
      nextTimer = setTimeout(() => {
        showNotifications();
        scheduleNext();
      }, randomNextDelay());
    };

    const initialTimer = setTimeout(() => {
      showNotifications();
      scheduleNext();
    }, randomInitialDelay());

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isPublicPage]);

  if (!isPublicPage || notifications.length === 0) return null;

  return (
    <div
      className={`pointer-events-none fixed bottom-20 left-3 z-40 flex max-w-[240px] flex-col gap-2 transition-all duration-500 sm:bottom-6 sm:left-6 sm:max-w-[280px] ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
      }`}
      aria-live="polite"
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-start gap-2 rounded-lg border border-[#00FF87]/30 bg-[#141414]/95 px-3 py-2 shadow-lg backdrop-blur-sm"
        >
          <BsCheckCircleFill className="mt-0.5 shrink-0 text-sm text-[#00FF87]" />
          <p className="text-[11px] leading-snug text-white sm:text-xs">
            <span className="font-semibold text-[#00FF87]">{notification.name}</span>
            {' '}ha comprado{' '}
            <span className="font-medium">{notification.purchase}</span>
          </p>
        </div>
      ))}
    </div>
  );
};
