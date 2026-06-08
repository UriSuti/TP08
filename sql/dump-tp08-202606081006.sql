--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-06-08 10:06:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: provinces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provinces (
    id integer NOT NULL,
    name text NOT NULL,
    full_name text,
    latitude double precision,
    longitude double precision,
    display_order integer
);


ALTER TABLE public.provinces OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.provinces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.provinces_id_seq OWNER TO postgres;

--
-- TOC entry 4787 (class 0 OID 0)
-- Dependencies: 215
-- Name: provinces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.provinces_id_seq OWNED BY public.provinces.id;


--
-- TOC entry 4634 (class 2604 OID 16403)
-- Name: provinces id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provinces ALTER COLUMN id SET DEFAULT nextval('public.provinces_id_seq'::regclass);


--
-- TOC entry 4781 (class 0 OID 16400)
-- Dependencies: 216
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.provinces (id, name, full_name, latitude, longitude, display_order) FROM stdin;
1	Buenos Aires	Provincia de Buenos Aires	-34.9215	-57.9545	1
2	Córdoba	Provincia de Córdoba	-31.4201	-64.1888	2
3	Santa Fe	Provincia de Santa Fe	-31.6333	-60.7	3
4	Mendoza	Provincia de Mendoza	-32.8895	-68.8458	4
5	Tucumán	Provincia de Tucumán	-26.8083	-65.2176	5
6	Salta	Provincia de Salta	-24.7859	-65.4117	6
7	Neuquén	Provincia del Neuquén	-38.9516	-68.0591	7
\.


--
-- TOC entry 4788 (class 0 OID 0)
-- Dependencies: 215
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provinces_id_seq', 7, true);


--
-- TOC entry 4636 (class 2606 OID 16407)
-- Name: provinces provinces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_pkey PRIMARY KEY (id);


-- Completed on 2026-06-08 10:06:46

--
-- PostgreSQL database dump complete
--

