--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE arigator_dev;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:Lyv/8y5o/qzWSdU0FuSC9w==$mpEyN+yB+umAFUD6mrs9LF/ROxZU2FI8hTPvUlAmW9Q=:n85NESWr/E4nFtZJ+H5LNsHNYjjeAVJEkKwsNoakg5E=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "arigator_dev" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

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

--
-- Name: arigator_dev; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE arigator_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE arigator_dev OWNER TO postgres;

\connect arigator_dev

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

--
-- Name: com_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.com_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.com_user_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: com_user_mst; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.com_user_mst (
    user_id integer DEFAULT nextval('public.com_user_id_seq'::regclass) NOT NULL,
    email character varying(250) NOT NULL,
    password character varying(10) NOT NULL
);


ALTER TABLE public.com_user_mst OWNER TO postgres;

--
-- Name: otr_teacher_code_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.otr_teacher_code_seq
    START WITH 10001
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.otr_teacher_code_seq OWNER TO postgres;

--
-- Name: otr_teacher_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.otr_teacher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.otr_teacher_id_seq OWNER TO postgres;

--
-- Name: otr_teacher_info_mst; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otr_teacher_info_mst (
    teacher_id integer DEFAULT nextval('public.otr_teacher_id_seq'::regclass) NOT NULL,
    teacher_code character varying(10),
    teacher_name character varying(200) NOT NULL,
    birthday date,
    gender integer,
    lock_mng_update_cnt integer DEFAULT 0,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.otr_teacher_info_mst OWNER TO postgres;

--
-- Name: tst_tutorial_code_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tst_tutorial_code_seq
    START WITH 10001
    INCREMENT BY 1
    MINVALUE 10001
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tst_tutorial_code_seq OWNER TO postgres;

--
-- Name: tst_tutorial_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tst_tutorial_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tst_tutorial_id_seq OWNER TO postgres;

--
-- Name: tst_tutorial_info_mst; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tst_tutorial_info_mst (
    tutorial_id integer DEFAULT nextval('public.tst_tutorial_id_seq'::regclass) NOT NULL,
    tutorial_name character varying(500) NOT NULL,
    tutorial_code character varying(10) NOT NULL,
    tutorial_start_time timestamp without time zone,
    tutorial_end_time timestamp without time zone,
    teacher_code character varying(10)
);


ALTER TABLE public.tst_tutorial_info_mst OWNER TO postgres;

--
-- Data for Name: com_user_mst; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.com_user_mst (user_id, email, password) FROM stdin;
1	hoan.lam@kmail.com	password
\.


--
-- Data for Name: otr_teacher_info_mst; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.otr_teacher_info_mst (teacher_id, teacher_code, teacher_name, birthday, gender, lock_mng_update_cnt, created_at, updated_at) FROM stdin;
3	10001	test	2022-10-11	1	0	2022-10-11 12:21:21.927	2022-10-11 12:21:21.927
4	10002	UnLock	\N	\N	0	\N	\N
5	10003	test 3333	2023-10-11	1	0	2022-10-11 05:21:21.927	2022-10-11 05:21:21.927
6	10003	test 3333	2023-10-11	1	0	2022-10-11 05:21:21.927	2022-10-11 05:21:21.927
7	10004	test 4444	2023-10-11	0	0	2022-10-11 05:21:21.927	2022-10-11 05:21:21.927
8	10008	test 888888	1990-11-11	0	0	2022-10-11 05:21:21.927	2022-10-11 05:21:21.927
9	10010	test 101010	1990-11-11	0	0	2022-10-11 05:21:21.927	2022-10-11 05:21:21.927
10		test 101011	1990-11-11	0	0	2022-10-11 05:21:21.927	2022-10-11 05:21:21.927
11		Hoan Lam	1990-11-11	0	0	2022-10-11 05:21:21.927	2022-10-11 05:21:21.927
12			1990-11-11	0	0	2022-10-11 05:21:21.927	2022-10-11 05:21:21.927
13	19999	Lam Thanh Bao Hoan	1990-11-11	0	0	2022-10-11 05:21:21.927	2022-10-11 05:21:21.927
\.


--
-- Data for Name: tst_tutorial_info_mst; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tst_tutorial_info_mst (tutorial_id, tutorial_name, tutorial_code, tutorial_start_time, tutorial_end_time, teacher_code) FROM stdin;
1	NodeJs Express + Sequelize library	10001	2022-10-11 12:21:21.927	2022-10-12 12:21:21.927	10008
\.


--
-- Name: com_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.com_user_id_seq', 1, true);


--
-- Name: otr_teacher_code_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.otr_teacher_code_seq', 10002, true);


--
-- Name: otr_teacher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.otr_teacher_id_seq', 13, true);


--
-- Name: tst_tutorial_code_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tst_tutorial_code_seq', 10001, false);


--
-- Name: tst_tutorial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tst_tutorial_id_seq', 1, true);


--
-- Name: com_user_mst com_user_mst_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.com_user_mst
    ADD CONSTRAINT com_user_mst_pkey PRIMARY KEY (user_id);


--
-- Name: otr_teacher_info_mst otr_teacher_mst_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otr_teacher_info_mst
    ADD CONSTRAINT otr_teacher_mst_pkey PRIMARY KEY (teacher_id);


--
-- Name: tst_tutorial_info_mst tst_tutorial_mst_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tst_tutorial_info_mst
    ADD CONSTRAINT tst_tutorial_mst_pkey PRIMARY KEY (tutorial_id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

