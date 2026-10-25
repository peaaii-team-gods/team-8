# Hospital rate comparison

Storage: local SQLite. Parse mode: streamed.

Medicare Advantage baseline: Medicare Advantage rates in this hospital's file.

Medicare Managed Care Plan is a single-plan baseline: no code has MA n>=2 in this file.

## Codes with commercial and MA medians

Ranked by commercial median minus the Medicare Advantage baseline, descending. n and the MA single-plan caveat apply to every section.
Commercial plans exclude names matching: medicare|medicaid|masshealth|self.?pay|cash|gross.

| Code | Type | Class | Description | Commercial median | MA median | Difference | Ratio | n_commercial | n_MA | Gross | Cash | Min | Max |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Q2058 | HCPCS | facility | Obecbtge autol up to 400 mil | $535500.0 | $278250.0 | $257250.0 | 1.92 | 3 | 1 | n/a | n/a | $278250.0 | $535500.0 |
| 0308T | HCPCS | facility | Insj ocular telescope prosth | $46344.88 | $19727.44 | $26617.44 | 2.35 | 4 | 1 | n/a | n/a | $19727.44 | $46534.93 |
| 19296 | HCPCS | facility | Place po breast cath for rad | $32865.635 | $9795.38 | $23070.255 | 3.36 | 8 | 1 | n/a | n/a | $4562.0 | $33588.83 |
| C9757 | HCPCS | facility | Spine/lumbar disk surgery | $32865.635 | $15386.48 | $17479.155 | 2.14 | 8 | 1 | n/a | n/a | $11899.39 | $33588.83 |
| 27590 | HCPCS | facility | Amputate leg at thigh | $21267.94 | $3921.32 | $17346.62 | 5.42 | 6 | 1 | n/a | n/a | $3696.01 | $21267.94 |
| 27591 | HCPCS | facility | Amputate leg at thigh | $21267.94 | $3921.32 | $17346.62 | 5.42 | 6 | 1 | n/a | n/a | $3696.01 | $21267.94 |
| 27592 | HCPCS | facility | Amputate leg at thigh | $21267.94 | $3921.32 | $17346.62 | 5.42 | 6 | 1 | n/a | n/a | $3696.01 | $21267.94 |
| 27598 | HCPCS | facility | Amputate lower leg at knee | $21267.94 | $3921.32 | $17346.62 | 5.42 | 6 | 1 | n/a | n/a | $3696.01 | $21267.94 |
| G0415 | HCPCS | facility | Open tx post pelvic fxcture | $21267.94 | $3921.32 | $17346.62 | 5.42 | 6 | 1 | n/a | n/a | $3696.01 | $21267.94 |
| 24370 | HCPCS | facility | Revise reconst elbow joint | $32142.44 | $15386.48 | $16755.96 | 2.09 | 9 | 1 | n/a | n/a | $9601.88 | $33588.83 |
| A9604 | HCPCS | facility | Sm 153 lexidronam | $17888.11 | $3159.8 | $14728.31 | 5.66 | 9 | 1 | n/a | n/a | $3159.8 | $18562.49 |
| C9734 | HCPCS | facility | U/s trtmt, not leiomyomata | $28487.23 | $15386.48 | $13100.75 | 1.85 | 4 | 1 | n/a | n/a | $15386.48 | $28604.05 |
| 22865 | HCPCS | facility | Remove Lumb Artif Disc | $21267.94 | $8696.19 | $12571.75 | 2.45 | 6 | 1 | n/a | n/a | $8196.53 | $21267.94 |
| 27077 | HCPCS | facility | Resect hip tum w/innom bone | $21267.94 | $8696.19 | $12571.75 | 2.45 | 6 | 1 | n/a | n/a | $8196.53 | $21267.94 |
| 27078 | HCPCS | facility | Rsect hip tum incl femur | $21267.94 | $8696.19 | $12571.75 | 2.45 | 6 | 1 | n/a | n/a | $8196.53 | $21267.94 |
| 27122 | HCPCS | facility | Reconstruction of hip socket | $21267.94 | $8696.19 | $12571.75 | 2.45 | 6 | 1 | n/a | n/a | $8196.53 | $21267.94 |
| G0414 | HCPCS | facility | Pelvic ring fx treat int fix | $21267.94 | $8696.19 | $12571.75 | 2.45 | 6 | 1 | n/a | n/a | $8196.53 | $21267.94 |
| 22855 | HCPCS | facility | Remove spine fixation device | $20810.025 | $8696.19 | $12113.835 | 2.39 | 8 | 1 | n/a | n/a | $1172.93 | $21267.94 |
| C9780 | HCPCS | facility | Insert cv cath inf & sup app | $20810.025 | $9678.17 | $11131.855 | 2.15 | 8 | 1 | n/a | n/a | $8250.0 | $21267.94 |
| 22869 | HCPCS | facility | Insj stablj dev w/o dcmprn | $24878.015 | $15386.48 | $9491.535 | 1.62 | 10 | 1 | n/a | n/a | $9553.65 | $33588.83 |
| 54411 | HCPCS | facility | Remov/replc penis pros comp | $33588.83 | $24839.17 | $8749.66 | 1.35 | 5 | 1 | n/a | n/a | $24839.17 | $33588.83 |
| 54417 | HCPCS | facility | Remv/replc penis pros compl | $33588.83 | $24839.17 | $8749.66 | 1.35 | 5 | 1 | n/a | n/a | $24839.17 | $33588.83 |
| 22899 | HCPCS | facility | HC UNLISTED PROCEDURE, SPINE | $8915.56 | $295.62 | $8619.94 | 30.16 | 5 | 1 | $649.0 | $454.3 | $295.62 | $8915.56 |
| 29999 | HCPCS | facility | Arthroscopy of joint | $8915.56 | $295.62 | $8619.94 | 30.16 | 5 | 1 | n/a | n/a | $295.62 | $8915.56 |
| G0276 | HCPCS | facility | Pild/placebo control clin tr | $16925.98 | $8696.19 | $8229.79 | 1.95 | 4 | 1 | n/a | n/a | $8696.19 | $16995.39 |
| 20824 | HCPCS | facility | Replantation thumb complete | $9619.86 | $1927.09 | $7692.77 | 4.99 | 6 | 1 | n/a | n/a | $1816.37 | $9619.86 |
| 20816 | HCPCS | facility | Replantation digit complete | $9412.735 | $1927.09 | $7485.645 | 4.88 | 8 | 1 | n/a | n/a | $1927.09 | $9619.86 |
| 20827 | HCPCS | facility | Replantation thumb complete | $9412.735 | $1927.09 | $7485.645 | 4.88 | 8 | 1 | n/a | n/a | $1927.09 | $9619.86 |
| 38562 | HCPCS | facility | Removal pelvic lymph nodes | $17224.09 | $9795.38 | $7428.71 | 1.76 | 8 | 1 | n/a | n/a | $740.82 | $17603.1 |
| 58579 | HCPCS | facility | Hysteroscope procedure | $6735.22 | $242.29 | $6492.93 | 27.80 | 5 | 1 | n/a | n/a | $242.29 | $6735.22 |
| 20999 | HCPCS | facility | Musculoskeletal surgery | $6735.22 | $295.62 | $6439.6 | 22.78 | 5 | 1 | n/a | n/a | $295.62 | $6735.22 |
| 22999 | HCPCS | facility | Abdomen surgery procedure | $6735.22 | $295.62 | $6439.6 | 22.78 | 5 | 1 | n/a | n/a | $295.62 | $6735.22 |
| 67399 | HCPCS | facility | Unlisted px extraocular musc | $6735.22 | $380.39 | $6354.83 | 17.71 | 5 | 1 | n/a | n/a | $380.39 | $6735.22 |
| 0614T | HCPCS | facility | Rmvl&rplcmt ss impl dfb pg | $32865.635 | $26657.76 | $6207.875 | 1.23 | 8 | 1 | n/a | n/a | $14976.1 | $33588.83 |
| 46707 | HCPCS | facility | Repair anorectal fist w/plug | $9412.735 | $3326.48 | $6086.255 | 2.83 | 8 | 1 | n/a | n/a | $2365.97 | $9619.86 |
| 37501 | HCPCS | facility | Vascular endoscopy procedure | $6735.22 | $751.79 | $5983.43 | 8.96 | 6 | 1 | n/a | n/a | $751.79 | $6735.22 |
| 0202T | HCPCS | facility | HC POST VERT JOINT ARTH, F/L/F/VCF,INJ BONE CEMENT,FLUORO, SING, LUMB | $21267.94 | $15386.48 | $5881.46 | 1.38 | 6 | 1 | $13321.0 | $9324.7 | $14502.42 | $21267.94 |
| 0219T | HCPCS | facility | Plmt post facet implt cerv | $21267.94 | $15386.48 | $5881.46 | 1.38 | 6 | 1 | n/a | n/a | $14502.42 | $21267.94 |
| 0220T | HCPCS | facility | Plmt post facet implt thor | $21267.94 | $15386.48 | $5881.46 | 1.38 | 6 | 1 | n/a | n/a | $14502.42 | $21267.94 |
| 23900 | HCPCS | facility | Amputation of arm & girdle | $21267.94 | $15386.48 | $5881.46 | 1.38 | 6 | 1 | n/a | n/a | $14502.42 | $21267.94 |
| 23920 | HCPCS | facility | Amputation at shoulder joint | $21267.94 | $15386.48 | $5881.46 | 1.38 | 6 | 1 | n/a | n/a | $14502.42 | $21267.94 |
| 27596 | HCPCS | facility | Amputation follow-up surgery | $9619.86 | $3921.32 | $5698.54 | 2.45 | 7 | 1 | n/a | n/a | $1194.34 | $9619.86 |
| Q4358 | HCPCS | facility | Xwrap dual, per sq cm | $5814.0 | $149.14 | $5664.86 | 38.98 | 3 | 1 | n/a | n/a | $149.14 | $5814.0 |
| A9543 | HCPCS | facility | Y90 ibritumomab, rx | $62484.55 | $56824.55 | $5660.0 | 1.10 | 13 | 1 | n/a | n/a | $55880.37 | $68140.74 |
| 44799 | HCPCS | facility | Unlisted px small intestine | $6735.22 | $1086.97 | $5648.25 | 6.20 | 5 | 1 | n/a | n/a | $1086.97 | $6735.22 |
| 47999 | HCPCS | facility | Bile tract surgery procedure | $6735.22 | $1086.97 | $5648.25 | 6.20 | 5 | 1 | n/a | n/a | $1086.97 | $6735.22 |
| 49999 | HCPCS | facility | Abdomen surgery procedure | $6735.22 | $1086.97 | $5648.25 | 6.20 | 5 | 1 | $2469.0 | $1728.3 | $1086.97 | $6735.22 |
| 27177 | HCPCS | facility | Treat slipped epiphysis | $9412.735 | $3921.32 | $5491.415 | 2.40 | 8 | 1 | n/a | n/a | $1186.29 | $9619.86 |
| 27178 | HCPCS | facility | Treat slipped epiphysis | $9412.735 | $3921.32 | $5491.415 | 2.40 | 8 | 1 | n/a | n/a | $979.68 | $9619.86 |
| 27886 | HCPCS | facility | Amputation follow-up surgery | $9412.735 | $3921.32 | $5491.415 | 2.40 | 8 | 1 | n/a | n/a | $704.61 | $9619.86 |
| 0627T | HCPCS | facility | Perq njx algc fluor lmbr 1st | $20810.025 | $15386.48 | $5423.545 | 1.35 | 8 | 1 | n/a | n/a | $12314.76 | $21267.94 |
| 0629T | HCPCS | facility | Perq njx algc ct lmbr 1st | $20810.025 | $15386.48 | $5423.545 | 1.35 | 8 | 1 | n/a | n/a | $12314.76 | $21267.94 |
| 0744T | HCPCS | facility | Insj bioprostc vlv fem vn | $11889.17 | $6668.74 | $5220.43 | 1.78 | 7 | 1 | n/a | n/a | $5139.76 | $11889.17 |
| 43840 | HCPCS | facility | Repair of stomach lesion | $9619.86 | $4620.58 | $4999.28 | 2.08 | 6 | 1 | n/a | n/a | $4355.09 | $9619.86 |
| 27070 | HCPCS | facility | Part remove hip bone super | $8915.56 | $3921.32 | $4994.24 | 2.27 | 6 | 1 | n/a | n/a | $3696.01 | $8915.56 |
| 27259 | HCPCS | facility | Treat hip dislocation | $8915.56 | $3921.32 | $4994.24 | 2.27 | 6 | 1 | n/a | n/a | $3696.01 | $8915.56 |
| 20664 | HCPCS | facility | Application of halo | $6735.22 | $1927.09 | $4808.13 | 3.50 | 7 | 1 | n/a | n/a | $1518.86 | $6735.22 |
| 27071 | HCPCS | facility | Part removal hip bone deep | $8723.6 | $3921.32 | $4802.28 | 2.22 | 8 | 1 | n/a | n/a | $983.04 | $8915.56 |
| 27365 | HCPCS | facility | Resect femur/knee tumor | $8723.6 | $3921.32 | $4802.28 | 2.22 | 8 | 1 | n/a | n/a | $2196.11 | $8915.56 |
| 30469 | HCPCS | facility | Rpr nsl vlv collapse w/rmdlg | $11889.17 | $7094.6 | $4794.57 | 1.68 | 7 | 1 | n/a | n/a | $5339.67 | $11889.17 |
| 20661 | HCPCS | facility | Application of head brace | $6590.205 | $1927.09 | $4663.115 | 3.42 | 8 | 1 | n/a | n/a | $541.46 | $6735.22 |
| 27057 | HCPCS | facility | Buttock fasciotomy w/dbrdmt | $6590.205 | $1927.09 | $4663.115 | 3.42 | 8 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 28890 | HCPCS | facility | Hi enrgy eswt plantar fascia | $6590.205 | $1927.09 | $4663.115 | 3.42 | 8 | 1 | n/a | n/a | $1927.09 | $6735.22 |
| Q4357 | HCPCS | facility | Xwrap plus, per sq cm | $4770.0 | $149.14 | $4620.86 | 31.98 | 3 | 1 | n/a | n/a | $149.14 | $4770.0 |
| A9572 | HCPCS | facility | Indium In-111 pentetreotide | $6470.64 | $2000.94 | $4469.7 | 3.23 | 3 | 1 | $16907.6 | $11835.32 | $2000.94 | $6470.64 |
| 66174 | HCPCS | facility | Translum dil eye canal | $9412.735 | $4953.69 | $4459.045 | 1.90 | 8 | 1 | n/a | n/a | $2977.93 | $9619.86 |
| 0342T | HCPCS | facility | Thxp apheresis w/hdl delip | $9619.86 | $5219.84 | $4400.02 | 1.84 | 5 | 1 | n/a | n/a | $5219.84 | $9619.86 |
| Q4316 | HCPCS | facility | Amchoplast, per sq cm | $4415.97 | $149.14 | $4266.83 | 29.61 | 3 | 1 | n/a | n/a | $149.14 | $4415.97 |
| 44602 | HCPCS | facility | Suture small intestine | $8723.6 | $4620.58 | $4103.02 | 1.89 | 8 | 1 | n/a | n/a | $1465.05 | $8915.56 |
| 51060 | HCPCS | facility | Removal of ureter stone | $6590.205 | $2505.21 | $4084.995 | 2.63 | 8 | 1 | n/a | n/a | $2505.21 | $6735.22 |
| 19105 | HCPCS | facility | Cryosurg ablate fa each | $8723.6 | $4692.44 | $4031.16 | 1.86 | 8 | 1 | n/a | n/a | $2458.99 | $8915.56 |
| 27222 | HCPCS | facility | HC TREAT HIP SOCKET FRACTION | $4303.61 | $295.62 | $4007.99 | 14.56 | 7 | 1 | $2105.0 | $1473.5 | $229.98 | $4303.61 |
| 27125 | HCPCS | facility | Partial hip replacement | $19292.34 | $15386.48 | $3905.86 | 1.25 | 7 | 1 | n/a | n/a | $15386.48 | $19292.34 |
| 27132 | HCPCS | facility | Total hip arthroplasty | $19292.34 | $15386.48 | $3905.86 | 1.25 | 7 | 1 | n/a | n/a | $12590.08 | $19292.34 |
| 27134 | HCPCS | facility | Revise hip joint replacement | $19292.34 | $15386.48 | $3905.86 | 1.25 | 7 | 1 | n/a | n/a | $14839.54 | $19292.34 |
| 27137 | HCPCS | facility | Revise hip joint replacement | $19292.34 | $15386.48 | $3905.86 | 1.25 | 7 | 1 | n/a | n/a | $11124.75 | $19292.34 |
| 27138 | HCPCS | facility | Revise hip joint replacement | $19292.34 | $15386.48 | $3905.86 | 1.25 | 7 | 1 | n/a | n/a | $11614.83 | $19292.34 |
| 27447 | HCPCS | facility | Total knee arthroplasty | $19292.34 | $15386.48 | $3905.86 | 1.25 | 7 | 1 | n/a | n/a | $12251.93 | $19292.34 |
| 0402T | HCPCS | facility | Collagen crosslinking cornea | $6735.22 | $2849.29 | $3885.93 | 2.36 | 7 | 1 | n/a | n/a | $2072.9 | $6735.22 |
| 22867 | HCPCS | facility | Insj stablj dev w/dcmprn | $24878.015 | $21013.36 | $3864.655 | 1.18 | 10 | 1 | n/a | n/a | $9553.65 | $33588.83 |
| 33230 | HCPCS | facility | Insrt pulse gen w/dual leads | $30469.65 | $26657.76 | $3811.89 | 1.14 | 11 | 1 | n/a | n/a | $14632.83 | $33588.83 |
| 33240 | HCPCS | facility | Insrt pulse gen w/singl lead | $30469.65 | $26657.76 | $3811.89 | 1.14 | 11 | 1 | n/a | n/a | $14632.83 | $33588.83 |
| 33262 | HCPCS | facility | HC REMOVE & REPL CVD GEN, SINGLE | $30469.65 | $26657.76 | $3811.89 | 1.14 | 11 | 1 | $36006.0 | $25204.2 | $14632.83 | $33588.83 |
| 33263 | HCPCS | facility | HC REMOVE & REPL CVD GEN, DUAL | $30469.65 | $26657.76 | $3811.89 | 1.14 | 11 | 1 | $36006.0 | $25204.2 | $14632.83 | $33588.83 |
| Q4353 | HCPCS | facility | Xceed tl matrix per sq cm | $3876.0 | $149.14 | $3726.86 | 25.99 | 3 | 1 | n/a | n/a | $149.14 | $3876.0 |
| A9570 | HCPCS | facility | Indium In-111 auto WBC | $4799.35 | $1103.19 | $3696.16 | 4.35 | 2 | 1 | n/a | n/a | $1103.19 | $4799.35 |
| Q4351 | HCPCS | facility | Enclose tl matrix, per sq cm | $3825.0 | $149.14 | $3675.86 | 25.65 | 3 | 1 | n/a | n/a | $149.14 | $3825.0 |
| Q4328 | HCPCS | facility | Most, per sq cm | $3673.31 | $149.14 | $3524.17 | 24.63 | 3 | 1 | n/a | n/a | $149.14 | $3673.31 |
| A9582 | HCPCS | facility | Iodine I-123 iobenguane | $5823.59 | $2317.5 | $3506.09 | 2.51 | 2 | 1 | n/a | n/a | $2317.5 | $5823.59 |
| 23474 | HCPCS | facility | Revis reconst shoulder joint | $18876.96 | $15386.48 | $3490.48 | 1.23 | 8 | 1 | n/a | n/a | $1869.67 | $19292.34 |
| 27130 | HCPCS | facility | Total hip arthroplasty | $18876.96 | $15386.48 | $3490.48 | 1.23 | 8 | 1 | n/a | n/a | $1445.49 | $19292.34 |
| 27486 | HCPCS | facility | Revise/replace knee joint | $18876.96 | $15386.48 | $3490.48 | 1.23 | 8 | 1 | n/a | n/a | $1501.57 | $19292.34 |
| Q4346 | HCPCS | facility | Shelter dm matrix per sq cm | $3570.0 | $149.14 | $3420.86 | 23.94 | 3 | 1 | n/a | n/a | $149.14 | $3570.0 |
| Q4349 | HCPCS | facility | Mantle dl matrix per sq cm | $3570.0 | $149.14 | $3420.86 | 23.94 | 3 | 1 | n/a | n/a | $149.14 | $3570.0 |
| Q4350 | HCPCS | facility | Palisade dm matrix per sq cm | $3570.0 | $149.14 | $3420.86 | 23.94 | 3 | 1 | n/a | n/a | $149.14 | $3570.0 |
| 56630 | HCPCS | facility | Extensive vulva surgery | $9412.735 | $5995.17 | $3417.565 | 1.57 | 8 | 1 | n/a | n/a | $965.28 | $9619.86 |
| Q4313 | HCPCS | facility | Dermabind fm, per sq cm | $3520.69 | $149.14 | $3371.55 | 23.61 | 5 | 1 | n/a | n/a | $149.14 | $3520.69 |
| C9773 | HCPCS | facility | HC REVASC INTRAVASC LITHO, TIBIAL/PERON ARTERY & STENT | $25300.355 | $21969.5 | $3330.855 | 1.15 | 10 | 1 | $39312.0 | $27518.4 | $16064.0 | $33588.83 |
| C9774 | HCPCS | facility | HC REVASC INTRAVASC LITHO, TIBIAL/PERONEAL ARTERY & ARTHERECTOMY | $25300.355 | $21969.5 | $3330.855 | 1.15 | 10 | 1 | $39312.0 | $27518.4 | $16064.0 | $33588.83 |
| C9775 | HCPCS | facility | HC REVASC INTRAVASV LITHO, TIB/PERONEAL ARTH, STENT & ATHERECTOMY | $25300.355 | $21969.5 | $3330.855 | 1.15 | 10 | 1 | $39312.0 | $27518.4 | $16064.0 | $33588.83 |
| A9507 | HCPCS | facility | In111 capromab | $5011.45 | $1730.29 | $3281.16 | 2.90 | 3 | 1 | n/a | n/a | $1730.29 | $5011.45 |
| D1551 | HCPCS | facility | Recement space maint - max | $4055.22 | $774.78 | $3280.44 | 5.23 | 4 | 1 | n/a | n/a | $774.78 | $4071.85 |
| D1552 | HCPCS | facility | Recement space maint - man | $4055.22 | $774.78 | $3280.44 | 5.23 | 4 | 1 | n/a | n/a | $774.78 | $4071.85 |
| D1553 | HCPCS | facility | Recement unilat space maint | $4055.22 | $774.78 | $3280.44 | 5.23 | 4 | 1 | n/a | n/a | $774.78 | $4071.85 |
| D0240 | HCPCS | facility | Intraoral occlusal film | $3384.185 | $104.29 | $3279.895 | 32.45 | 4 | 1 | n/a | n/a | $104.29 | $3398.06 |
| D0250 | HCPCS | facility | Extraoral 2d project image | $3384.185 | $104.29 | $3279.895 | 32.45 | 4 | 1 | n/a | n/a | $104.29 | $3398.06 |
| D0270 | HCPCS | facility | Dental bitewing single image | $3370.31 | $104.29 | $3266.02 | 32.32 | 6 | 1 | n/a | n/a | $98.6 | $3398.06 |
| D0272 | HCPCS | facility | Dental bitewings two images | $3370.31 | $104.29 | $3266.02 | 32.32 | 7 | 1 | n/a | n/a | $104.29 | $3398.06 |
| Q4204 | HCPCS | facility | Xwrap 1 sq cm | $3381.985 | $149.14 | $3232.845 | 22.68 | 6 | 1 | n/a | n/a | $149.14 | $3774.77 |
| 34471 | HCPCS | facility | Removal of vein clot | $3984.43 | $751.79 | $3232.64 | 5.30 | 11 | 1 | n/a | n/a | $709.02 | $6735.22 |
| C9767 | HCPCS | facility | HC REVASC INTRAVASC LITHOTRIPSY, STENT & ATHERECTOMY | $25201.08 | $21969.5 | $3231.58 | 1.15 | 10 | 1 | $39312.0 | $27518.4 | $16064.0 | $33588.83 |
| Q4270 | HCPCS | facility | Complete sl per sq cm | $3370.8 | $149.14 | $3221.66 | 22.60 | 3 | 1 | n/a | n/a | $149.14 | $3370.8 |
| Q4303 | HCPCS | facility | Complete aa, per sq cm | $3368.0 | $149.14 | $3218.86 | 22.58 | 6 | 1 | n/a | n/a | $149.14 | $3460.88 |
| D0150 | HCPCS | facility | Comprehensve oral evaluation | $3370.31 | $159.56 | $3210.75 | 21.12 | 6 | 1 | n/a | n/a | $159.56 | $3398.06 |
| D0277 | HCPCS | facility | Vert bitewings 7 to 8 images | $3384.185 | $285.95 | $3098.235 | 11.83 | 4 | 1 | n/a | n/a | $285.95 | $3398.06 |
| D0274 | HCPCS | facility | Bitewings four images | $3370.31 | $285.95 | $3084.36 | 11.79 | 7 | 1 | n/a | n/a | $285.95 | $3398.06 |
| Q4364 | HCPCS | facility | Am bur xp mem xpl hy p sq cm | $3149.76 | $149.14 | $3000.62 | 21.12 | 3 | 1 | n/a | n/a | $149.14 | $3149.76 |
| Q4341 | HCPCS | facility | Simplimax, per sq cm | $3071.28 | $149.14 | $2922.14 | 20.59 | 3 | 1 | n/a | n/a | $149.14 | $3071.28 |
| D0600 | HCPCS | facility | Non-ionizing diag proc | $3693.045 | $774.78 | $2918.265 | 4.77 | 4 | 1 | n/a | n/a | $774.78 | $3708.19 |
| D1575 | HCPCS | facility | Dist space maint, fixed unil | $3693.045 | $774.78 | $2918.265 | 4.77 | 4 | 1 | n/a | n/a | $774.78 | $3708.19 |
| Q4355 | HCPCS | facility | Abio xpl abio xpl hy p sq cm | $3060.0 | $149.14 | $2910.86 | 20.52 | 3 | 1 | n/a | n/a | $149.14 | $3060.0 |
| A9515 | HCPCS | facility | Choline c-11 | $5400.0 | $2516.43 | $2883.57 | 2.15 | 6 | 1 | n/a | n/a | $2516.43 | $5700.0 |
| 62287 | HCPCS | facility | Percutaneous diskectomy | $5221.55 | $2340.24 | $2881.31 | 2.23 | 11 | 1 | n/a | n/a | $2340.24 | $8915.56 |
| 64831 | HCPCS | facility | Repair of digit nerve | $5221.55 | $2340.24 | $2881.31 | 2.23 | 11 | 1 | n/a | n/a | $2340.24 | $6735.22 |
| 64861 | HCPCS | facility | Repair of arm nerves | $5221.55 | $2340.24 | $2881.31 | 2.23 | 11 | 1 | n/a | n/a | $2340.24 | $6735.22 |
| 93590 | HCPCS | facility | Perq transcath cls mitral | $24850.595 | $21969.5 | $2881.095 | 1.13 | 10 | 1 | n/a | n/a | $14775.9 | $33588.83 |
| 93591 | HCPCS | facility | Perq transcath cls aortic | $24850.595 | $21969.5 | $2881.095 | 1.13 | 10 | 1 | n/a | n/a | $14775.9 | $33588.83 |
| 54400 | HCPCS | facility | Insert semi-rigid prosthesis | $18662.34 | $15811.66 | $2850.68 | 1.18 | 11 | 1 | n/a | n/a | $7635.32 | $21267.94 |
| 66175 | HCPCS | facility | Trnslum dil eye canal w/stnt | $9205.61 | $6377.3 | $2828.31 | 1.44 | 9 | 1 | n/a | n/a | $2977.93 | $9619.86 |
| 21510 | HCPCS | facility | Drainage of bone lesion | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| 25920 | HCPCS | facility | Amputate hand at wrist | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| 25924 | HCPCS | facility | Amputation follow-up surgery | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| 25927 | HCPCS | facility | Amputation of hand | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| 27054 | HCPCS | facility | Removal of hip joint lining | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| 27175 | HCPCS | facility | Treat slipped epiphysis | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| 27253 | HCPCS | facility | Treat hip dislocation | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| 27282 | HCPCS | facility | Fusion of pubic bones | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| 27888 | HCPCS | facility | Amputation of foot at ankle | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| 28800 | HCPCS | facility | Amputation of midfoot | $6735.22 | $3921.32 | $2813.9 | 1.72 | 6 | 1 | n/a | n/a | $3696.01 | $6735.22 |
| Q4343 | HCPCS | facility | Dermacyte ac matrx per sq cm | $2952.1 | $149.14 | $2802.96 | 19.79 | 3 | 1 | n/a | n/a | $149.14 | $2952.1 |
| 35372 | HCPCS | facility | Rechanneling of artery | $9412.735 | $6668.74 | $2743.995 | 1.41 | 8 | 1 | n/a | n/a | $1045.15 | $9619.86 |
| 35800 | HCPCS | facility | Explore neck vessels | $9412.735 | $6668.74 | $2743.995 | 1.41 | 8 | 1 | n/a | n/a | $769.03 | $9619.86 |
| 37619 | HCPCS | facility | Ligation of inf vena cava | $9412.735 | $6668.74 | $2743.995 | 1.41 | 8 | 1 | n/a | n/a | $3024.65 | $9619.86 |
| Q4280 | HCPCS | facility | Xcell amnio matrix per sq cm | $2892.85 | $149.14 | $2743.71 | 19.40 | 6 | 1 | n/a | n/a | $149.14 | $3180.0 |
| 33271 | HCPCS | facility | HC INSERTION, SUBCUTANEOUS IMPLANTABLE DEFIBRILLATOR ELECTRODE | $12656.05 | $9917.62 | $2738.43 | 1.28 | 10 | 1 | $7034.0 | $4923.8 | $3766.05 | $17603.1 |
| 58294 | HCPCS | facility | Vag hyst w/enterocele compl | $8723.6 | $5995.17 | $2728.43 | 1.46 | 8 | 1 | n/a | n/a | $3405.53 | $8915.56 |
| 20555 | HCPCS | facility | Place ndl musc/tis for rt | $6590.205 | $3921.32 | $2668.885 | 1.68 | 8 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25931 | HCPCS | facility | Amputation follow-up surgery | $6590.205 | $3921.32 | $2668.885 | 1.68 | 8 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 27005 | HCPCS | facility | Incision of hip tendon | $6590.205 | $3921.32 | $2668.885 | 1.68 | 8 | 1 | n/a | n/a | $776.68 | $6735.22 |
| 27025 | HCPCS | facility | Incision of hip/thigh fascia | $6590.205 | $3921.32 | $2668.885 | 1.68 | 8 | 1 | n/a | n/a | $978.84 | $6735.22 |
| 27176 | HCPCS | facility | Treat slipped epiphysis | $6590.205 | $3921.32 | $2668.885 | 1.68 | 8 | 1 | n/a | n/a | $979.68 | $6735.22 |
| 27258 | HCPCS | facility | Treat hip dislocation | $6590.205 | $3921.32 | $2668.885 | 1.68 | 8 | 1 | n/a | n/a | $1181.63 | $6735.22 |
| 27645 | HCPCS | facility | Resect tibia tumor | $6590.205 | $3921.32 | $2668.885 | 1.68 | 8 | 1 | n/a | n/a | $1890.78 | $6735.22 |
| D0460 | HCPCS | facility | Pulp vitality test | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D1520 | HCPCS | facility | Remove unilat space maintain | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D2999 | HCPCS | facility | Dental unspec restorative pr | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D3460 | HCPCS | facility | Endodontic endosseous implan | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D3999 | HCPCS | facility | Endodontic procedure | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D4263 | HCPCS | facility | Bone replce graft first site | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D4268 | HCPCS | facility | Surgical revision procedure | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D4381 | HCPCS | facility | Localized delivery antimicro | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D5911 | HCPCS | facility | Facial moulage sectional | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D5912 | HCPCS | facility | Facial moulage complete | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D5983 | HCPCS | facility | Radiation applicator | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D5984 | HCPCS | facility | Radiation shield | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D5985 | HCPCS | facility | Radiation cone locator | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D5987 | HCPCS | facility | Commissure splint | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D6920 | HCPCS | facility | Dental connector bar | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D7261 | HCPCS | facility | Primary closure sinus perf | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D7291 | HCPCS | facility | Transseptal fiberotomy | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D7940 | HCPCS | facility | Reshaping bone orthognathic | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D9930 | HCPCS | facility | Treatment of complications | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D9950 | HCPCS | facility | Occlusion analysis | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D9951 | HCPCS | facility | Limited occlusal adjustment | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D9952 | HCPCS | facility | Complete occlusal adjustment | $3384.185 | $774.78 | $2609.405 | 4.37 | 4 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D1510 | HCPCS | facility | Space maintainer fxd unilat | $3370.31 | $774.78 | $2595.53 | 4.35 | 6 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D4355 | HCPCS | facility | Full mouth debridement | $3370.31 | $774.78 | $2595.53 | 4.35 | 6 | 1 | n/a | n/a | $774.78 | $3398.06 |
| D7111 | HCPCS | facility | Extraction coronal remnants | $3370.31 | $774.78 | $2595.53 | 4.35 | 7 | 1 | n/a | n/a | $553.63 | $3398.06 |
| D7140 | HCPCS | facility | Extraction erupted tooth/exr | $3370.31 | $774.78 | $2595.53 | 4.35 | 7 | 1 | n/a | n/a | $553.63 | $3398.06 |
| D7220 | HCPCS | facility | Impact tooth remov soft tiss | $3370.31 | $774.78 | $2595.53 | 4.35 | 7 | 1 | n/a | n/a | $553.63 | $3398.06 |
| D7230 | HCPCS | facility | Impact tooth remov part bony | $3370.31 | $774.78 | $2595.53 | 4.35 | 7 | 1 | n/a | n/a | $553.63 | $3398.06 |
| D7240 | HCPCS | facility | Impact tooth remov comp bony | $3370.31 | $774.78 | $2595.53 | 4.35 | 7 | 1 | n/a | n/a | $553.63 | $3398.06 |
| D7241 | HCPCS | facility | Impact tooth rem bony w/comp | $3370.31 | $774.78 | $2595.53 | 4.35 | 7 | 1 | n/a | n/a | $553.63 | $3398.06 |
| D7250 | HCPCS | facility | Tooth root removal | $3370.31 | $774.78 | $2595.53 | 4.35 | 7 | 1 | n/a | n/a | $553.63 | $3398.06 |
| D7260 | HCPCS | facility | Oral antral fistula closure | $3370.31 | $774.78 | $2595.53 | 4.35 | 6 | 1 | n/a | n/a | $774.78 | $3398.06 |
| Q4344 | HCPCS | facility | Tri membrane wrap, per sq cm | $2689.48 | $149.14 | $2540.34 | 18.03 | 3 | 1 | n/a | n/a | $149.14 | $2689.48 |
| Q4275 | HCPCS | facility | Esano aca, per sq cm | $2675.48 | $149.14 | $2526.34 | 17.94 | 3 | 1 | n/a | n/a | $149.14 | $2675.48 |
| Q4359 | HCPCS | facility | Choriply, per sq cm | $2674.44 | $149.14 | $2525.3 | 17.93 | 3 | 1 | n/a | n/a | $149.14 | $2674.44 |
| 21045 | HCPCS | facility | Extensive jaw surgery | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 21151 | HCPCS | facility | Lefort ii w/bone grafts | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 21154 | HCPCS | facility | Lefort iii w/o lefort i | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 21155 | HCPCS | facility | Lefort iii w/ lefort i | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 21180 | HCPCS | facility | Reconstruct entire forehead | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 21182 | HCPCS | facility | Reconstruct cranial bone | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 21184 | HCPCS | facility | Reconstruct cranial bone | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 21268 | HCPCS | facility | Revise eye sockets | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 21433 | HCPCS | facility | Treat craniofacial fracture | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 21436 | HCPCS | facility | Treat craniofacial fracture | $9619.86 | $7094.6 | $2525.26 | 1.36 | 6 | 1 | n/a | n/a | $6686.97 | $9619.86 |
| 26686 | HCPCS | facility | Treat hand dislocation | $6445.19 | $3921.32 | $2523.87 | 1.64 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| Q4250 | HCPCS | facility | AmnioAMP-MP per sq cm | $2662.08 | $149.14 | $2512.94 | 17.85 | 6 | 1 | n/a | n/a | $149.14 | $2901.66 |
| 55980 | HCPCS | facility | Sex transformation f to m | $6735.22 | $4224.5 | $2510.72 | 1.59 | 7 | 1 | n/a | n/a | $3347.03 | $6735.22 |
| 61770 | HCPCS | facility | Incise skull for treatment | $6590.205 | $4094.07 | $2496.135 | 1.61 | 8 | 1 | n/a | n/a | $2481.58 | $6735.22 |
| C9739 | HCPCS | facility | Cystoscopy prostatic imp 1-3 | $8915.56 | $6425.83 | $2489.73 | 1.39 | 7 | 1 | n/a | n/a | $4597.72 | $8915.56 |
| 44314 | HCPCS | facility | Revision of ileostomy | $6735.22 | $4246.97 | $2488.25 | 1.59 | 7 | 1 | n/a | n/a | $1713.89 | $6735.22 |
| 44345 | HCPCS | facility | Revision of colostomy | $6735.22 | $4246.97 | $2488.25 | 1.59 | 7 | 1 | n/a | n/a | $1793.98 | $6735.22 |
| 41870 | HCPCS | facility | Gum graft | $4341.44 | $1859.49 | $2481.95 | 2.33 | 11 | 1 | n/a | n/a | $1859.49 | $6735.22 |
| 64584 | HCPCS | facility | Rmvl hpglsl nstim ary pg | $6553.96 | $4094.07 | $2459.89 | 1.60 | 10 | 1 | n/a | n/a | $4094.07 | $6735.22 |
| Q4345 | HCPCS | facility | Matrix hd allogrft per sq cm | $2550.0 | $149.14 | $2400.86 | 17.10 | 3 | 1 | n/a | n/a | $149.14 | $2550.0 |
| Q4356 | HCPCS | facility | Abio mem abio hyd per sq cm | $2550.0 | $149.14 | $2400.86 | 17.10 | 3 | 1 | n/a | n/a | $149.14 | $2550.0 |
| 27268 | HCPCS | facility | Cltx thigh fx w/mnpj | $4303.61 | $1927.09 | $2376.52 | 2.23 | 6 | 1 | n/a | n/a | $1816.37 | $4303.61 |
| 38129 | HCPCS | facility | Laparoscope proc spleen | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 38589 | HCPCS | facility | Laparoscope proc lymphatic | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 43289 | HCPCS | facility | Laparoscope proc esoph | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 43659 | HCPCS | facility | Laparoscope proc stom | $9619.86 | $7245.25 | $2374.61 | 1.33 | 6 | 1 | n/a | n/a | $3569.65 | $9619.86 |
| 44238 | HCPCS | facility | Laparoscope proc intestine | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 44979 | HCPCS | facility | Laparoscope proc app | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 45499 | HCPCS | facility | Laparoscope proc rectum | $9619.86 | $7245.25 | $2374.61 | 1.33 | 6 | 1 | n/a | n/a | $3569.65 | $9619.86 |
| 47379 | HCPCS | facility | Laparoscope procedure liver | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 49329 | HCPCS | facility | Laparo proc abdm/per/oment | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 49659 | HCPCS | facility | Laparo proc hernia repair | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 50549 | HCPCS | facility | Laparoscope proc renal | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 50949 | HCPCS | facility | Laparoscope proc ureter | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 51999 | HCPCS | facility | Laparoscope proc bla | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 54699 | HCPCS | facility | Laparoscope proc testis | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 55559 | HCPCS | facility | Laparo proc spermatic cord | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 58578 | HCPCS | facility | Laparo proc uterus | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 58679 | HCPCS | facility | Laparo proc oviduct-ovary | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 59898 | HCPCS | facility | Laparo proc ob care/deliver | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 60659 | HCPCS | facility | Laparo proc endocrine | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| 60699 | HCPCS | facility | Endocrine surgery procedure | $9619.86 | $7245.25 | $2374.61 | 1.33 | 5 | 1 | n/a | n/a | $7245.25 | $9619.86 |
| Q4347 | HCPCS | facility | Rampart dl matrix per sq cm | $2507.5 | $149.14 | $2358.36 | 16.81 | 3 | 1 | n/a | n/a | $149.14 | $2507.5 |
| 38243 | HCPCS | facility | Transplj hematopoietic boost | $4210.95 | $1866.49 | $2344.46 | 2.26 | 8 | 1 | n/a | n/a | $950.65 | $4303.61 |
| 0184T | HCPCS | facility | Exc rectal tumor endoscopic | $9619.86 | $7275.65 | $2344.21 | 1.32 | 7 | 1 | n/a | n/a | $5141.51 | $9619.86 |
| 44346 | HCPCS | facility | Revision of colostomy | $6590.205 | $4246.97 | $2343.235 | 1.55 | 8 | 1 | n/a | n/a | $1243.25 | $6735.22 |
| 21141 | HCPCS | facility | Lefort i-1 piece w/o graft | $9412.735 | $7094.6 | $2318.135 | 1.33 | 8 | 1 | n/a | n/a | $1472.21 | $9619.86 |
| 21142 | HCPCS | facility | Lefort i-2 piece w/o graft | $9412.735 | $7094.6 | $2318.135 | 1.33 | 8 | 1 | n/a | n/a | $1513.01 | $9619.86 |
| 21145 | HCPCS | facility | Lefort i-1 piece w/ graft | $9412.735 | $7094.6 | $2318.135 | 1.33 | 8 | 1 | n/a | n/a | $1650.12 | $9619.86 |
| 21146 | HCPCS | facility | Lefort i-2 piece w/ graft | $9412.735 | $7094.6 | $2318.135 | 1.33 | 8 | 1 | n/a | n/a | $1872.79 | $9619.86 |
| 21435 | HCPCS | facility | Treat craniofacial fracture | $9412.735 | $7094.6 | $2318.135 | 1.33 | 8 | 1 | n/a | n/a | $1362.96 | $9619.86 |
| 30468 | HCPCS | facility | Rpr nsl vlv collapse w/implt | $9412.735 | $7094.6 | $2318.135 | 1.33 | 8 | 1 | n/a | n/a | $5086.05 | $9619.86 |
| 27240 | HCPCS | facility | Treat thigh fracture | $4210.95 | $1927.09 | $2283.86 | 2.19 | 8 | 1 | n/a | n/a | $1019.65 | $4303.61 |
| 27198 | HCPCS | facility | Clsd tx pelvic ring fx | $2578.68 | $295.62 | $2283.06 | 8.72 | 10 | 1 | $679.0 | $475.3 | $257.4 | $4303.61 |
| Q4279 | HCPCS | facility | Vendaje ac, per sq cm | $2385.0 | $149.14 | $2235.86 | 15.99 | 3 | 1 | n/a | n/a | $149.14 | $2385.0 |
| 29851 | HCPCS | facility | Knee arthroscopy/surgery | $4118.29 | $1927.09 | $2191.2 | 2.14 | 11 | 1 | n/a | n/a | $1501.88 | $5187.05 |
| 31241 | HCPCS | facility | Nsl/sins ndsc w/artery lig | $4303.61 | $2133.11 | $2170.5 | 2.02 | 10 | 1 | n/a | n/a | $1565.86 | $4863.83 |
| C9772 | HCPCS | facility | HC REVASC INTRAVASC LITHOTRIPSY, TIBIAL/PERONEAL ARTERY | $15948.23 | $13835.1 | $2113.13 | 1.15 | 10 | 1 | $24587.0 | $17210.9 | $10042.94 | $21267.94 |
| Q4239 | HCPCS | facility | Amnio-maxx or lite per sq cm | $2211.75 | $149.14 | $2062.61 | 14.83 | 6 | 1 | n/a | n/a | $149.14 | $2464.7 |
| 54535 | HCPCS | facility | Extensive testis surgery | $6276.32 | $4224.5 | $2051.82 | 1.49 | 10 | 1 | n/a | n/a | $2775.49 | $9619.86 |
| Q4340 | HCPCS | facility | Simpligraft, per sq cm | $2193.0 | $149.14 | $2043.86 | 14.70 | 3 | 1 | n/a | n/a | $149.14 | $2193.0 |
| 19499 | HCPCS | facility | Breast surgery procedure | $6735.22 | $4692.44 | $2042.78 | 1.44 | 5 | 1 | n/a | n/a | $4692.44 | $6735.22 |
| 43290 | HCPCS | facility | Egd flx trnsorl dplmnt balo | $4303.61 | $2299.71 | $2003.9 | 1.87 | 7 | 1 | n/a | n/a | $1741.59 | $4303.61 |
| Q4342 | HCPCS | facility | Theramend, per sq cm | $2127.11 | $149.14 | $1977.97 | 14.26 | 3 | 1 | n/a | n/a | $149.14 | $2127.11 |
| Q4291 | HCPCS | facility | Lamellas xt, per sq cm | $2121.6 | $149.14 | $1972.46 | 14.23 | 6 | 1 | n/a | n/a | $149.14 | $2968.2 |
| 43774 | HCPCS | facility | Lap rmvl gastr adj all parts | $6590.205 | $4620.58 | $1969.625 | 1.43 | 8 | 1 | n/a | n/a | $1002.41 | $6735.22 |
| Q4300 | HCPCS | facility | Acesso tl, per sq cm | $2114.7 | $149.14 | $1965.56 | 14.18 | 4 | 1 | n/a | n/a | $149.14 | $2114.7 |
| G0429 | HCPCS | facility | Dermal filler injection(s) | $4436.3 | $2472.73 | $1963.57 | 1.79 | 4 | 1 | n/a | n/a | $2472.73 | $4454.49 |
| 64766 | HCPCS | facility | Incise hip/thigh nerve | $4303.61 | $2340.24 | $1963.37 | 1.84 | 11 | 1 | n/a | n/a | $2340.24 | $5221.55 |
| 64858 | HCPCS | facility | Repair sciatic nerve | $4303.61 | $2340.24 | $1963.37 | 1.84 | 11 | 1 | n/a | n/a | $2340.24 | $5221.55 |
| Q4301 | HCPCS | facility | Activate matrix, per sq cm | $2095.67 | $149.14 | $1946.53 | 14.05 | 6 | 1 | n/a | n/a | $149.14 | $2743.8 |
| G0460 | HCPCS | facility | Autologous PRP for ulcers | $4418.11 | $2472.73 | $1945.38 | 1.79 | 7 | 1 | n/a | n/a | $409.41 | $4454.49 |
| 44300 | HCPCS | facility | Open bowel to skin | $4210.95 | $2299.71 | $1911.24 | 1.83 | 8 | 1 | n/a | n/a | $880.31 | $4303.61 |
| Q4339 | HCPCS | facility | Artacent vericlen, per sq cm | $2055.34 | $149.14 | $1906.2 | 13.78 | 3 | 1 | n/a | n/a | $149.14 | $2055.34 |
| Q4325 | HCPCS | facility | Acapatch, per sq cm | $2045.86 | $149.14 | $1896.72 | 13.72 | 5 | 1 | n/a | n/a | $149.14 | $2091.0 |
| 27197 | HCPCS | facility | Clsd tx pelvic ring fx | $2187.845 | $295.62 | $1892.225 | 7.40 | 10 | 1 | n/a | n/a | $133.65 | $4303.61 |
| Q9983 | HCPCS | facility | florbetaben f18 diagnostic | $3468.0 | $1584.67 | $1883.33 | 2.19 | 6 | 1 | n/a | n/a | $1584.67 | $3876.0 |
| 69716 | HCPCS | facility | Impltj oi implt skl tc esp | $17261.955 | $15386.48 | $1875.475 | 1.12 | 10 | 1 | n/a | n/a | $12593.29 | $21267.94 |
| 69719 | HCPCS | facility | Revj/rplcmt oi implt tc esp | $17261.955 | $15386.48 | $1875.475 | 1.12 | 10 | 1 | n/a | n/a | $12593.29 | $21267.94 |
| 64625 | HCPCS | facility | HC RADIOFREQ ABALTION, NERVES INNERVATING THE SACROILIAC JOINT W/IG | $4210.95 | $2340.24 | $1870.71 | 1.80 | 8 | 1 | $5398.0 | $3778.6 | $1719.16 | $4303.61 |
| 38241 | HCPCS | facility | Transplt autol hct/donor | $3733.7 | $1866.49 | $1867.21 | 2.00 | 11 | 1 | n/a | n/a | $1426.02 | $8915.56 |
| 58674 | HCPCS | facility | Laps abltj uterine fibroids | $14602.555 | $12739.3 | $1863.255 | 1.15 | 10 | 1 | n/a | n/a | $6966.89 | $21267.94 |
| G0235 | HCPCS | facility | PET not otherwise specified | $2336.0 | $479.1 | $1856.9 | 4.88 | 4 | 1 | n/a | n/a | $479.1 | $2345.58 |
| Q4348 | HCPCS | facility | Sentry sl matrix per sq cm | $1989.0 | $149.14 | $1839.86 | 13.34 | 3 | 1 | n/a | n/a | $149.14 | $1989.0 |
| Q4352 | HCPCS | facility | Overlay sl matrix, per sq cm | $1989.0 | $149.14 | $1839.86 | 13.34 | 3 | 1 | n/a | n/a | $149.14 | $1989.0 |
| 21147 | HCPCS | facility | Lefort i-3/> piece w/ graft | $8915.56 | $7094.6 | $1820.96 | 1.26 | 7 | 1 | n/a | n/a | $3024.55 | $8915.56 |
| 21159 | HCPCS | facility | Lefort iii w/fhdw/o lefort i | $8915.56 | $7094.6 | $1820.96 | 1.26 | 6 | 1 | n/a | n/a | $6686.97 | $8915.56 |
| 21160 | HCPCS | facility | Lefort iii w/fhd w/ lefort i | $8915.56 | $7094.6 | $1820.96 | 1.26 | 6 | 1 | n/a | n/a | $6686.97 | $8915.56 |
| 21179 | HCPCS | facility | Reconstruct entire forehead | $8915.56 | $7094.6 | $1820.96 | 1.26 | 6 | 1 | n/a | n/a | $6686.97 | $8915.56 |
| 21183 | HCPCS | facility | Reconstruct cranial bone | $8915.56 | $7094.6 | $1820.96 | 1.26 | 6 | 1 | n/a | n/a | $6686.97 | $8915.56 |
| 21194 | HCPCS | facility | Reconst lwr jaw w/graft | $8915.56 | $7094.6 | $1820.96 | 1.26 | 6 | 1 | n/a | n/a | $6686.97 | $8915.56 |
| 21247 | HCPCS | facility | Reconstruct lower jaw bone | $8915.56 | $7094.6 | $1820.96 | 1.26 | 7 | 1 | n/a | n/a | $2801.52 | $8915.56 |
| 21255 | HCPCS | facility | Reconstruct lower jaw bone | $8915.56 | $7094.6 | $1820.96 | 1.26 | 6 | 1 | n/a | n/a | $6686.97 | $8915.56 |
| 21344 | HCPCS | facility | Open tx compl front sinus fx | $8915.56 | $7094.6 | $1820.96 | 1.26 | 7 | 1 | n/a | n/a | $2355.12 | $8915.56 |
| 21347 | HCPCS | facility | Opn tx nasomax fx multple | $8915.56 | $7094.6 | $1820.96 | 1.26 | 7 | 1 | n/a | n/a | $5932.04 | $8915.56 |
| 21348 | HCPCS | facility | Opn tx nasomax fx w/graft | $8915.56 | $7094.6 | $1820.96 | 1.26 | 6 | 1 | n/a | n/a | $6686.97 | $8915.56 |
| 21431 | HCPCS | facility | Treat craniofacial fracture | $8915.56 | $7094.6 | $1820.96 | 1.26 | 6 | 1 | n/a | n/a | $6686.97 | $8915.56 |
| 21432 | HCPCS | facility | Treat craniofacial fracture | $8915.56 | $7094.6 | $1820.96 | 1.26 | 6 | 1 | n/a | n/a | $6686.97 | $8915.56 |
| Q4248 | HCPCS | facility | Dermacyte Amn mem allo sq cm | $1966.1 | $149.14 | $1816.96 | 13.18 | 6 | 1 | n/a | n/a | $149.14 | $2824.5 |
| 64804 | HCPCS | facility | Remove sympathetic nerves | $4155.44 | $2340.24 | $1815.2 | 1.78 | 10 | 1 | n/a | n/a | $1344.72 | $6735.22 |
| Q4221 | HCPCS | facility | Amniowrap2 per sq cm | $1961.0 | $149.14 | $1811.86 | 13.15 | 6 | 1 | n/a | n/a | $149.14 | $2014.0 |
| 0440T | HCPCS | facility | Abltj perc uxtr/perph nrv | $4150.11 | $2340.24 | $1809.87 | 1.77 | 5 | 1 | n/a | n/a | $1996.93 | $4150.11 |
| 0441T | HCPCS | facility | Abltj perc lxtr/perph nrv | $4150.11 | $2340.24 | $1809.87 | 1.77 | 5 | 1 | n/a | n/a | $1996.93 | $4150.11 |
| 0698T | HCPCS | facility | Quan mr tiss w/mri mlt orgn | $2902.185 | $1114.97 | $1787.215 | 2.60 | 4 | 1 | n/a | n/a | $1114.97 | $2914.09 |
| 0520T | HCPCS | facility | Rmvl&rplcmt pg wcs new eltrd | $14297.7 | $12526.17 | $1771.53 | 1.14 | 3 | 1 | n/a | n/a | $12526.17 | $14297.7 |
| Q4297 | HCPCS | facility | Emerge matrix, per sq cm | $1919.675 | $149.14 | $1770.535 | 12.87 | 6 | 1 | n/a | n/a | $149.14 | $2279.0 |
| Q4373 | HCPCS | facility | Membrane wrp lt per sq cm | $1904.34 | $149.14 | $1755.2 | 12.77 | 3 | 1 | n/a | n/a | $149.14 | $1904.34 |
| Q4265 | HCPCS | facility | Neostim tl per sq cm | $1895.25 | $149.14 | $1746.11 | 12.71 | 8 | 1 | n/a | n/a | $149.14 | $2114.7 |
| Q4290 | HCPCS | facility | Membrane wrap hydr per sq cm | $1875.855 | $149.14 | $1726.715 | 12.58 | 6 | 1 | n/a | n/a | $149.14 | $1961.0 |
| 33274 | HCPCS | facility | HC TRANSCATH INSERT/REPLC PERM LEADLESS PACER, RT VENT, IG & DEV EVAL | $24805.885 | $23084.13 | $1721.755 | 1.07 | 10 | 1 | $36148.0 | $25303.6 | $9980.43 | $33588.83 |
| Q4314 | HCPCS | facility | Reeva, per sq cm | $1870.0 | $149.14 | $1720.86 | 12.54 | 3 | 1 | n/a | n/a | $149.14 | $1870.0 |
| Q4296 | HCPCS | facility | Rebound matrix, per sq cm | $1867.07 | $149.14 | $1717.93 | 12.52 | 6 | 1 | n/a | n/a | $149.14 | $2295.0 |
| 53860 | HCPCS | facility | Transurethral rf treatment | $4210.95 | $2505.21 | $1705.74 | 1.68 | 8 | 1 | n/a | n/a | $1409.54 | $4303.61 |
| Q4193 | HCPCS | facility | Coll-e-derm 1 sq cm | $1851.09 | $149.14 | $1701.95 | 12.41 | 6 | 1 | n/a | n/a | $149.14 | $2067.0 |
| 31652 | HCPCS | facility | Bronch ebus samplng 1/2 node | $6169.855 | $4468.23 | $1701.625 | 1.38 | 10 | 1 | n/a | n/a | $1991.92 | $9619.86 |
| 31653 | HCPCS | facility | Bronch ebus samplng 3/> node | $6169.855 | $4468.23 | $1701.625 | 1.38 | 10 | 1 | n/a | n/a | $1991.92 | $9619.86 |
| C9727 | HCPCS | facility | Insert palate implants | $3541.0 | $1859.49 | $1681.51 | 1.90 | 7 | 1 | n/a | n/a | $498.57 | $3570.16 |
| Q4322 | HCPCS | facility | Caregraft, per sq cm | $1791.29 | $149.14 | $1642.15 | 12.01 | 5 | 1 | n/a | n/a | $149.14 | $1836.0 |
| 21143 | HCPCS | facility | Lefort i-3/> piece w/o graft | $8723.6 | $7094.6 | $1629.0 | 1.23 | 8 | 1 | n/a | n/a | $1524.48 | $8915.56 |
| 21196 | HCPCS | facility | Reconst lwr jaw w/fixation | $8723.6 | $7094.6 | $1629.0 | 1.23 | 8 | 1 | n/a | n/a | $1613.8 | $8915.56 |
| 21343 | HCPCS | facility | Open tx dprsd front sinus fx | $8723.6 | $7094.6 | $1629.0 | 1.23 | 8 | 1 | n/a | n/a | $1331.62 | $8915.56 |
| 21422 | HCPCS | facility | Treat mouth roof fracture | $8723.6 | $7094.6 | $1629.0 | 1.23 | 8 | 1 | n/a | n/a | $731.75 | $8915.56 |
| 31587 | HCPCS | facility | Laryngoplasty cricoid split | $8723.6 | $7094.6 | $1629.0 | 1.23 | 8 | 1 | n/a | n/a | $1083.04 | $8915.56 |
| 40805 | HCPCS | facility | Removal foreign body mouth | $2264.42 | $646.36 | $1618.06 | 3.50 | 11 | 1 | n/a | n/a | $557.06 | $4303.61 |
| A2021 | HCPCS | facility | Neomatrix per sq cm | $1758.71 | $149.14 | $1609.57 | 11.79 | 5 | 1 | n/a | n/a | $149.14 | $1965.62 |
| 35180 | HCPCS | facility | Repair blood vessel lesion | $3466.99 | $1886.54 | $1580.45 | 1.84 | 11 | 1 | n/a | n/a | $709.02 | $6735.22 |
| 31899 | HCPCS | facility | Airways surgical procedure | $1805.48 | $239.22 | $1566.26 | 7.55 | 5 | 1 | n/a | n/a | $239.22 | $1805.48 |
| Q4332 | HCPCS | facility | Axolotl dualgraft, per sq cm | $1701.03 | $149.14 | $1551.89 | 11.41 | 6 | 1 | n/a | n/a | $149.14 | $1722.5 |
| Q4312 | HCPCS | facility | Acesso ac, per sq cm | $1700.0 | $149.14 | $1550.86 | 11.40 | 3 | 1 | n/a | n/a | $149.14 | $1700.0 |
| Q4324 | HCPCS | facility | Amniotx, per sq cm | $1683.0 | $149.14 | $1533.86 | 11.28 | 5 | 1 | n/a | n/a | $149.14 | $1683.0 |
| Q4331 | HCPCS | facility | Axolotl graft, per sq cm | $1682.055 | $149.14 | $1532.915 | 11.28 | 6 | 1 | n/a | n/a | $149.14 | $1726.56 |
| D4270 | HCPCS | facility | Pedicle soft tissue graft pr | $3384.185 | $1859.49 | $1524.695 | 1.82 | 4 | 1 | n/a | n/a | $1859.49 | $3398.06 |
| D4273 | HCPCS | facility | Auto tissue graft 1st tooth | $3384.185 | $1859.49 | $1524.695 | 1.82 | 4 | 1 | n/a | n/a | $1859.49 | $3398.06 |
| 36482 | HCPCS | facility | Endoven ther chem adhes 1st | $8191.0 | $6668.74 | $1522.26 | 1.23 | 10 | 1 | n/a | n/a | $4264.67 | $11889.17 |
| D7210 | HCPCS | facility | Rem imp tooth w mucoper flp | $3370.31 | $1859.49 | $1510.82 | 1.81 | 7 | 1 | n/a | n/a | $553.63 | $3398.06 |
| Q4161 | HCPCS | facility | Bio-connekt per square cm | $1653.82 | $149.14 | $1504.68 | 11.09 | 9 | 1 | n/a | n/a | $10.68 | $1855.9 |
| Q4164 | HCPCS | facility | Helicoll, per square cm | $1635.07 | $149.14 | $1485.93 | 10.96 | 9 | 1 | n/a | n/a | $32.36 | $1640.93 |
| Q4311 | HCPCS | facility | Acesso, per sq cm | $1610.75 | $149.14 | $1461.61 | 10.80 | 3 | 1 | n/a | n/a | $149.14 | $1610.75 |
| Q4271 | HCPCS | facility | Complete ft per sq cm | $1591.4 | $149.14 | $1442.26 | 10.67 | 8 | 1 | n/a | n/a | $149.14 | $1881.0 |
| Q4361 | HCPCS | facility | Epixpress, per sq cm | $1590.0 | $149.14 | $1440.86 | 10.66 | 3 | 1 | n/a | n/a | $149.14 | $1590.0 |
| Q4293 | HCPCS | facility | Acesso dl, per sq cm | $1584.7 | $149.14 | $1435.56 | 10.63 | 4 | 1 | n/a | n/a | $149.14 | $1584.7 |
| 54231 | HCPCS | facility | Dynamic cavernosometry | $1728.21 | $299.43 | $1428.78 | 5.77 | 11 | 1 | n/a | n/a | $264.64 | $6735.22 |
| Q4323 | HCPCS | facility | Alloply, per sq cm | $1574.54 | $149.14 | $1425.4 | 10.56 | 5 | 1 | n/a | n/a | $149.14 | $1574.54 |
| Q9982 | HCPCS | facility | flutemetamol f18 diagnostic | $3366.0 | $1944.01 | $1421.99 | 1.73 | 7 | 1 | n/a | n/a | $1944.01 | $3762.0 |
| 66987 | HCPCS | facility | Xcapsl ctrc rmvl cplx w/ecp | $6358.155 | $4953.69 | $1404.465 | 1.28 | 10 | 1 | n/a | n/a | $3817.9 | $8915.56 |
| 66988 | HCPCS | facility | Xcapsl ctrc rmvl w/ecp | $6358.155 | $4953.69 | $1404.465 | 1.28 | 10 | 1 | n/a | n/a | $3817.9 | $8915.56 |
| Q4274 | HCPCS | facility | Esano ac, per sq cm | $1543.035 | $149.14 | $1393.895 | 10.35 | 6 | 1 | n/a | n/a | $149.14 | $1832.32 |
| 0577T | HCPCS | facility | Ephys eval icds ss | $2833.25 | $1459.16 | $1374.09 | 1.94 | 7 | 1 | n/a | n/a | $33.95 | $2856.59 |
| 61050 | HCPCS | facility | Remove brain canal fluid | $1727.73 | $367.87 | $1359.86 | 4.70 | 11 | 1 | n/a | n/a | $283.01 | $1881.74 |
| C8921 | HCPCS | facility | Tte w or w/o fol w/cont, com | $2285.29 | $939.49 | $1345.8 | 2.43 | 7 | 1 | n/a | n/a | $578.36 | $2304.12 |
| C8925 | HCPCS | facility | 2d tee w or w/o fol w/con,in | $2285.29 | $939.49 | $1345.8 | 2.43 | 7 | 1 | n/a | n/a | $578.36 | $2304.12 |
| C8926 | HCPCS | facility | Tee w or w/o fol w/cont,cong | $2285.29 | $939.49 | $1345.8 | 2.43 | 7 | 1 | n/a | n/a | $578.36 | $2304.12 |
| C8927 | HCPCS | facility | TEE w or w/o fol w/cont, mon | $2285.29 | $939.49 | $1345.8 | 2.43 | 7 | 1 | n/a | n/a | $433.93 | $2304.12 |
| 95965 | HCPCS | facility | Meg spontaneous | $2354.79 | $1029.15 | $1325.64 | 2.29 | 10 | 1 | n/a | n/a | $1029.15 | $2408.54 |
| 90378 | HCPCS | facility | Rsv mab im 50mg | $1757.66 | $436.75 | $1320.91 | 4.02 | 10 | 1 | $6632.695 | $4642.885 | $436.75 | $2075.55 |
| Q4289 | HCPCS | facility | Revoshield+ amnio, per sq cm | $1468.11 | $149.14 | $1318.97 | 9.84 | 3 | 1 | n/a | n/a | $149.14 | $1468.11 |
| C8923 | HCPCS | facility | 2d tte w or w/o fol w/con,co | $2254.74 | $939.49 | $1315.25 | 2.40 | 7 | 1 | n/a | n/a | $433.93 | $2273.32 |
| A2022 | HCPCS | facility | Innovabrn/innovamatx xl sqcm | $1453.5 | $149.14 | $1304.36 | 9.75 | 8 | 1 | n/a | n/a | $149.14 | $1624.5 |
| Q4302 | HCPCS | facility | Complete aca, per sq cm | $1441.175 | $149.14 | $1292.035 | 9.66 | 6 | 1 | n/a | n/a | $149.14 | $2008.7 |
| A9584 | HCPCS | facility | Iodine i-123 ioflupane | $2665.44 | $1387.74 | $1277.7 | 1.92 | 6 | 1 | n/a | n/a | $1387.74 | $2954.88 |
| A2001 | HCPCS | facility | Miscellaneous M >=66.50 | $1425.0 | $149.14 | $1275.86 | 9.55 | 2 | 1 | n/a | n/a | $149.14 | $1425.0 |
| Q4266 | HCPCS | facility | Neostim per sq cm | $1420.25 | $149.14 | $1271.11 | 9.52 | 8 | 1 | n/a | n/a | $149.14 | $1584.7 |
| 29819 | HCPCS | facility | Shoulder arthroscopy/surgery | $5187.05 | $3921.32 | $1265.73 | 1.32 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 29821 | HCPCS | facility | Shoulder arthroscopy/surgery | $5187.05 | $3921.32 | $1265.73 | 1.32 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 29823 | HCPCS | facility | Shoulder arthroscopy/surgery | $5187.05 | $3921.32 | $1265.73 | 1.32 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 29824 | HCPCS | facility | Shoulder arthroscopy/surgery | $5187.05 | $3921.32 | $1265.73 | 1.32 | 11 | 1 | n/a | n/a | $2111.62 | $8915.56 |
| 29825 | HCPCS | facility | Shoulder arthroscopy/surgery | $5187.05 | $3921.32 | $1265.73 | 1.32 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 29830 | HCPCS | facility | Elbow arthroscopy | $5187.05 | $3921.32 | $1265.73 | 1.32 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29835 | HCPCS | facility | Elbow arthroscopy/surgery | $5187.05 | $3921.32 | $1265.73 | 1.32 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29863 | HCPCS | facility | Hip arthr0 w/synovectomy | $5187.05 | $3921.32 | $1265.73 | 1.32 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 29901 | HCPCS | facility | Mcp joint arthroscopy surg | $5187.05 | $3921.32 | $1265.73 | 1.32 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| A9586 | HCPCS | facility | Florbetapir F18 | $3085.995 | $1825.64 | $1260.355 | 1.69 | 6 | 1 | n/a | n/a | $1825.64 | $3257.44 |
| A2013 | HCPCS | facility | Innovamatrix fs, per sq cm | $1377.0 | $149.14 | $1227.86 | 9.23 | 8 | 1 | n/a | n/a | $149.14 | $1539.0 |
| Q4225 | HCPCS | facility | Amniobind, per sq cm | $1370.73 | $149.14 | $1221.59 | 9.19 | 6 | 1 | n/a | n/a | $32.07 | $1537.0 |
| 25020 | HCPCS | facility | Decompress forearm 1 space | $3137.19 | $1927.09 | $1210.1 | 1.63 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 25025 | HCPCS | facility | Decompress forearm 2 spaces | $3137.19 | $1927.09 | $1210.1 | 1.63 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 25118 | HCPCS | facility | Excise wrist tendon sheath | $3137.19 | $1927.09 | $1210.1 | 1.63 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| 25125 | HCPCS | facility | Remove/graft forearm lesion | $3137.19 | $1927.09 | $1210.1 | 1.63 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 27498 | HCPCS | facility | Decompression of thigh/knee | $3137.19 | $1927.09 | $1210.1 | 1.63 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| A9547 | HCPCS | facility | In111 oxyquinoline | $2038.46 | $831.46 | $1207.0 | 2.45 | 3 | 1 | $4981.98 | $3487.39 | $831.46 | $2038.46 |
| 78432 | HCPCS | facility | Myocrd img pet 2rtracer | $3014.73 | $1818.8 | $1195.93 | 1.66 | 10 | 1 | n/a | n/a | $1818.8 | $7349.97 |
| Q4326 | HCPCS | facility | Woundplus, per sq cm | $1338.35 | $149.14 | $1189.21 | 8.97 | 6 | 1 | n/a | n/a | $149.14 | $1593.75 |
| 46948 | HCPCS | facility | Int hrhc tranal dartlzj 2+ | $4507.14 | $3326.48 | $1180.66 | 1.35 | 10 | 1 | n/a | n/a | $2343.92 | $6735.22 |
| Q4238 | HCPCS | facility | Derm-maxx, per sq cm | $1327.125 | $149.14 | $1177.985 | 8.90 | 6 | 1 | n/a | n/a | $149.14 | $1725.04 |
| Q4309 | HCPCS | facility | Via matrix, per sq cm | $1308.55 | $149.14 | $1159.41 | 8.77 | 5 | 1 | n/a | n/a | $149.14 | $1785.0 |
| Q4299 | HCPCS | facility | Amnicore pro+, per sq cm | $1303.595 | $149.14 | $1154.455 | 8.74 | 6 | 1 | n/a | n/a | $149.14 | $2491.0 |
| 63744 | HCPCS | facility | Revision of spinal shunt | $5221.55 | $4094.07 | $1127.48 | 1.28 | 11 | 1 | n/a | n/a | $3251.09 | $6735.22 |
| 64570 | HCPCS | facility | Remove vagus n eltrd | $5221.55 | $4094.07 | $1127.48 | 1.28 | 11 | 1 | n/a | n/a | $2481.58 | $8915.56 |
| 64786 | HCPCS | facility | Remove sciatic nerve lesion | $5221.55 | $4094.07 | $1127.48 | 1.28 | 11 | 1 | n/a | n/a | $2481.58 | $6735.22 |
| 64792 | HCPCS | facility | Removal of nerve lesion | $5221.55 | $4094.07 | $1127.48 | 1.28 | 11 | 1 | n/a | n/a | $2481.58 | $6735.22 |
| 64835 | HCPCS | facility | Repair of hand or foot nerve | $5221.55 | $4094.07 | $1127.48 | 1.28 | 11 | 1 | n/a | n/a | $2481.58 | $6735.22 |
| 64836 | HCPCS | facility | Repair of hand or foot nerve | $5221.55 | $4094.07 | $1127.48 | 1.28 | 11 | 1 | n/a | n/a | $2481.58 | $6735.22 |
| 64862 | HCPCS | facility | Repair of low back nerves | $5221.55 | $4094.07 | $1127.48 | 1.28 | 11 | 1 | n/a | n/a | $2481.58 | $6735.22 |
| 64865 | HCPCS | facility | Repair of facial nerve | $5221.55 | $4094.07 | $1127.48 | 1.28 | 11 | 1 | n/a | n/a | $2481.58 | $6735.22 |
| Q4249 | HCPCS | facility | Amniply, per sq cm | $1268.095 | $149.14 | $1118.955 | 8.50 | 6 | 1 | n/a | n/a | $149.14 | $1789.55 |
| 25645 | HCPCS | facility | Treat wrist bone fracture | $5023.62 | $3921.32 | $1102.3 | 1.28 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 26615 | HCPCS | facility | Treat metacarpal fracture | $5023.62 | $3921.32 | $1102.3 | 1.28 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 26665 | HCPCS | facility | Treat thumb fracture | $5023.62 | $3921.32 | $1102.3 | 1.28 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| D2610 | HCPCS | facility | Inlay porcelain/ceramic 1 su | $1861.92 | $774.78 | $1087.14 | 2.40 | 2 | 1 | n/a | n/a | $774.78 | $1861.92 |
| D7473 | HCPCS | facility | Remove torus mandibularis | $1861.92 | $774.78 | $1087.14 | 2.40 | 2 | 1 | n/a | n/a | $774.78 | $1861.92 |
| Q4294 | HCPCS | facility | Amnio quad-core, per sq cm | $1234.9 | $149.14 | $1085.76 | 8.28 | 6 | 1 | n/a | n/a | $149.14 | $2279.0 |
| Q4292 | HCPCS | facility | Lamellas, per sq cm | $1224.0 | $149.14 | $1074.86 | 8.21 | 3 | 1 | n/a | n/a | $149.14 | $1224.0 |
| 33016 | HCPCS | facility | HC PERICARDIOCENTESIS W/IMG GUIDANCE WHEN PERFORMED | $2952.96 | $1886.54 | $1066.42 | 1.57 | 10 | 1 | $3029.0 | $2120.3 | $412.39 | $4303.61 |
| G0390 | HCPCS | facility | HC LEVEL 1 TRAUMA RESPONSE W/ PRE-NOTIFICATION & CC | $2661.57 | $1597.42 | $1064.15 | 1.67 | 7 | 1 | $12626.0 | $8838.2 | $1081.06 | $2683.49 |
| Q4169 | HCPCS | facility | Artacent wound, per sq cm | $1198.315 | $149.14 | $1049.175 | 8.03 | 6 | 1 | n/a | n/a | $149.14 | $2220.57 |
| 53080 | HCPCS | facility | Drainage of urinary leakage | $1862.4 | $835.67 | $1026.73 | 2.23 | 11 | 1 | n/a | n/a | $642.96 | $4303.61 |
| Q4298 | HCPCS | facility | Amnicore pro, per sq cm | $1172.245 | $149.14 | $1023.105 | 7.86 | 6 | 1 | n/a | n/a | $149.14 | $2173.0 |
| 31515 | HCPCS | facility | Laryngoscopy for aspiration | $1481.34 | $468.74 | $1012.6 | 3.16 | 11 | 1 | n/a | n/a | $441.98 | $1805.48 |
| 21601 | HCPCS | facility | Exc chest wall tumor w/ribs | $4493.28 | $3481.15 | $1012.13 | 1.29 | 10 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 89280 | HCPCS | facility | Assist oocyte fertilization | $1972.99 | $965.56 | $1007.43 | 2.04 | 7 | 1 | n/a | n/a | $38.1 | $1989.24 |
| 91113 | HCPCS | facility | Gi trc img intral colon i&r | $2121.05 | $1114.51 | $1006.54 | 1.90 | 7 | 1 | n/a | n/a | $810.48 | $2138.52 |
| C9725 | HCPCS | facility | Place endorectal app | $2121.05 | $1114.51 | $1006.54 | 1.90 | 7 | 1 | n/a | n/a | $439.35 | $2138.52 |
| 93596 | HCPCS | facility | R&l hrt cath chd nml nt cnj | $4888.96 | $3885.28 | $1003.68 | 1.26 | 10 | 1 | n/a | n/a | $2961.52 | $6735.22 |
| 93597 | HCPCS | facility | R&l hrt cath chd abnl nt cnj | $4888.96 | $3885.28 | $1003.68 | 1.26 | 10 | 1 | n/a | n/a | $2961.52 | $6735.22 |
| Q4295 | HCPCS | facility | Amnio tri-core, per sq cm | $1149.895 | $149.14 | $1000.755 | 7.71 | 6 | 1 | n/a | n/a | $149.14 | $2067.0 |
| 99291 | HCPCS | facility | Critical care first hour | $1967.27 | $989.95 | $977.32 | 1.99 | 7 | 1 | $2660.0 | $1862.0 | $846.26 | $1983.47 |
| Q4263 | HCPCS | facility | Surgraft tl, per sq cm | $1122.39 | $149.14 | $973.25 | 7.53 | 6 | 1 | n/a | n/a | $149.14 | $1713.0 |
| Q4259 | HCPCS | facility | Celera per sq cm | $1115.78 | $149.14 | $966.64 | 7.48 | 6 | 1 | n/a | n/a | $149.14 | $1334.35 |
| 67010 | HCPCS | facility | Partial removal of eye fluid | $3727.18 | $2765.81 | $961.37 | 1.35 | 11 | 1 | n/a | n/a | $2192.38 | $6735.22 |
| 67121 | HCPCS | facility | Remove eye implant material | $3727.18 | $2765.81 | $961.37 | 1.35 | 11 | 1 | n/a | n/a | $2192.38 | $4303.61 |
| 33275 | HCPCS | facility | HC TRANSCATH REMOVAL PERM LEADLESS PACER, RT VENTRICULAR | $4741.18 | $3784.07 | $957.11 | 1.25 | 10 | 1 | $5775.0 | $4042.5 | $2641.52 | $6735.22 |
| 36473 | HCPCS | facility | Endovenous mchnchem 1st vein | $4732.96 | $3784.07 | $948.89 | 1.25 | 10 | 1 | n/a | n/a | $2359.6 | $6735.22 |
| Q4180 | HCPCS | facility | Revita, per sq cm | $1090.07 | $149.14 | $940.93 | 7.31 | 9 | 1 | n/a | n/a | $149.14 | $1584.6 |
| 65930 | HCPCS | facility | Remove blood clot from eye | $3699.21 | $2765.81 | $933.4 | 1.34 | 11 | 1 | n/a | n/a | $2192.38 | $8915.56 |
| 66185 | HCPCS | facility | Revise aqueous shunt eye | $3699.21 | $2765.81 | $933.4 | 1.34 | 11 | 1 | n/a | n/a | $2192.38 | $4303.61 |
| 66605 | HCPCS | facility | Removal of iris | $3699.21 | $2765.81 | $933.4 | 1.34 | 11 | 1 | n/a | n/a | $2192.38 | $6735.22 |
| 43196 | HCPCS | facility | Esophagoscp guide wire dilat | $3230.19 | $2299.71 | $930.48 | 1.40 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43252 | HCPCS | facility | Egd optical endomicroscopy | $3230.19 | $2299.71 | $930.48 | 1.40 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43263 | HCPCS | facility | Ercp sphincter pressure meas | $3230.19 | $2299.71 | $930.48 | 1.40 | 11 | 1 | n/a | n/a | $1727.3 | $4303.61 |
| 43275 | HCPCS | facility | Ercp remove forgn body duct | $3230.19 | $2299.71 | $930.48 | 1.40 | 11 | 1 | n/a | n/a | $2117.02 | $4303.61 |
| 44384 | HCPCS | facility | Small bowel endoscopy | $3230.19 | $2299.71 | $930.48 | 1.40 | 11 | 1 | n/a | n/a | $829.36 | $8915.56 |
| 21602 | HCPCS | facility | Exc ch wal tum w/o lymphadec | $9619.86 | $8696.19 | $923.67 | 1.11 | 7 | 1 | n/a | n/a | $2729.28 | $9619.86 |
| 21603 | HCPCS | facility | Exc ch wal tum w/lymphadec | $9619.86 | $8696.19 | $923.67 | 1.11 | 7 | 1 | n/a | n/a | $3012.07 | $9619.86 |
| 22015 | HCPCS | facility | I&d abscess p-spine l/s/ls | $9619.86 | $8696.19 | $923.67 | 1.11 | 7 | 1 | n/a | n/a | $2869.83 | $9619.86 |
| 22206 | HCPCS | facility | Incis spine 3 column thorac | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 22207 | HCPCS | facility | Incis spine 3 column lumbar | $9619.86 | $8696.19 | $923.67 | 1.11 | 7 | 1 | n/a | n/a | $7348.45 | $9619.86 |
| 22210 | HCPCS | facility | Incis 1 vertebral seg cerv | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 22212 | HCPCS | facility | Incis 1 vertebral seg thorac | $9619.86 | $8696.19 | $923.67 | 1.11 | 7 | 1 | n/a | n/a | $7348.45 | $9619.86 |
| 22214 | HCPCS | facility | Incis 1 vertebral seg lumbar | $9619.86 | $8696.19 | $923.67 | 1.11 | 7 | 1 | n/a | n/a | $2581.93 | $9619.86 |
| 22224 | HCPCS | facility | Incis w/discectomy lumbar | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 22864 | HCPCS | facility | Remove cerv artif disc | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 23210 | HCPCS | facility | Resect scapula tumor | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 27075 | HCPCS | facility | Resect hip tumor | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 27076 | HCPCS | facility | Resect hip tum incl acetabul | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 27151 | HCPCS | facility | Incision of hip bones | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 27156 | HCPCS | facility | Revision of hip bones | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 27158 | HCPCS | facility | Revision of pelvis | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 27181 | HCPCS | facility | Treat slipped epiphysis | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 27187 | HCPCS | facility | Reinforce hip bones | $9619.86 | $8696.19 | $923.67 | 1.11 | 7 | 1 | n/a | n/a | $1693.15 | $9619.86 |
| 27457 | HCPCS | facility | Realignment of knee | $9619.86 | $8696.19 | $923.67 | 1.11 | 8 | 1 | n/a | n/a | $1018.66 | $9833.79 |
| 63266 | HCPCS | facility | Excise intrspinl lesion thrc | $9619.86 | $8696.19 | $923.67 | 1.11 | 7 | 1 | n/a | n/a | $7348.45 | $9619.86 |
| 63268 | HCPCS | facility | Excise intrspinl lesion scrl | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| G0412 | HCPCS | facility | Open tx iliac spine uni/bil | $9619.86 | $8696.19 | $923.67 | 1.11 | 6 | 1 | n/a | n/a | $8196.53 | $9619.86 |
| 59897 | HCPCS | facility | Fetal invas px w/us | $1151.97 | $242.29 | $909.68 | 4.75 | 6 | 1 | $1070.0 | $749.0 | $12.58 | $1151.97 |
| 78414 | HCPCS | facility | Non-imaging heart function | $1560.36 | $650.72 | $909.64 | 2.40 | 7 | 1 | n/a | n/a | $308.99 | $1573.22 |
| C9762 | HCPCS | facility | Cardiac MRI seg dys strain | $1559.12 | $654.85 | $904.27 | 2.38 | 7 | 1 | n/a | n/a | $482.89 | $1571.96 |
| C9763 | HCPCS | facility | Cardiac MRI seg dys stress | $1559.12 | $654.85 | $904.27 | 2.38 | 7 | 1 | n/a | n/a | $482.89 | $1571.96 |
| 62000 | HCPCS | facility | Treat skull fracture | $4876.805 | $3973.4 | $903.405 | 1.23 | 10 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 53620 | HCPCS | facility | Dilate urethra stricture | $1728.21 | $835.67 | $892.54 | 2.07 | 11 | 1 | n/a | n/a | $642.96 | $6735.22 |
| 54160 | HCPCS | facility | Circumcision neonate | $1727.73 | $835.67 | $892.06 | 2.07 | 11 | 1 | $421.0 | $294.7 | $642.96 | $2113.41 |
| Q4354 | HCPCS | facility | Palingen dual-layer sq cm | $1040.4 | $149.14 | $891.26 | 6.98 | 3 | 1 | n/a | n/a | $149.14 | $1040.4 |
| 15271 | HCPCS | facility | HC SKIN SUB GRFT TRUNK/ARMS/LEGS, 1ST 25 SQ CM OR LESS | $1771.32 | $885.74 | $885.58 | 2.00 | 11 | 1 | $2725.0 | $1907.5 | $251.48 | $1805.48 |
| 15275 | HCPCS | facility | HC SKIN SUB GRFT F/N/H/F, 1ST 25 SQ CM OR LESS | $1771.32 | $885.74 | $885.58 | 2.00 | 11 | 1 | $2725.0 | $1907.5 | $251.48 | $1805.48 |
| 27278 | HCPCS | facility | Arthrd si jt prq wo tfxj dev | $21897.63 | $21013.36 | $884.27 | 1.04 | 3 | 1 | n/a | n/a | $21013.36 | $21897.63 |
| 20697 | HCPCS | facility | Comp ext fixate strut change | $2810.085 | $1927.09 | $882.995 | 1.46 | 10 | 1 | n/a | n/a | $835.41 | $4303.61 |
| 74263 | HCPCS | facility | Ct colonography screening | $1160.62 | $285.95 | $874.67 | 4.06 | 10 | 1 | n/a | n/a | $173.58 | $1950.84 |
| C2616 | HCPCS | facility | Brachytx, non-str,Yttrium-90 | $18639.15 | $17771.01 | $868.14 | 1.05 | 13 | 1 | $42021.75 | $29415.22 | $17177.01 | $19012.64 |
| G2083 | HCPCS | facility | Visit esketamine, > 56m | $2786.69 | $1936.1 | $850.59 | 1.44 | 7 | 1 | n/a | n/a | $1080.42 | $2809.64 |
| Q4191 | HCPCS | facility | Restorigin 1 sq cm | $996.7 | $149.14 | $847.56 | 6.68 | 6 | 1 | n/a | n/a | $149.14 | $1454.88 |
| 64680 | HCPCS | facility | HC DESTRUCTION NEURO AGENT, W OR W/O RADIO MONITOR; CELIAC PLEXUS | $1881.74 | $1059.99 | $821.75 | 1.78 | 11 | 1 | $4325.0 | $3027.5 | $856.68 | $4303.61 |
| G2000 | HCPCS | facility | Blinded conv. Tx MDD clin tr | $1250.94 | $447.21 | $803.73 | 2.80 | 4 | 1 | n/a | n/a | $447.21 | $1256.07 |
| 28295 | HCPCS | facility | Correction hallux valgus | $4722.565 | $3921.32 | $801.245 | 1.20 | 10 | 1 | n/a | n/a | $2437.31 | $6735.22 |
| 36573 | HCPCS | facility | HC INSERT PICC W/O SUBQ PORT/PUMP, ALL IG/DOCU/RADIO SI 5/+ YRS | $2684.46 | $1886.54 | $797.92 | 1.42 | 10 | 1 | $2568.0 | $1797.6 | $1093.63 | $4303.61 |
| 95824 | HCPCS | facility | Eeg cerebral death only | $1237.15 | $447.21 | $789.94 | 2.77 | 7 | 1 | $1372.0 | $960.4 | $184.02 | $1247.34 |
| G0302 | HCPCS | facility | Pre-op service LVRS complete | $1237.15 | $447.21 | $789.94 | 2.77 | 7 | 1 | n/a | n/a | $447.21 | $1247.34 |
| G0304 | HCPCS | facility | Pre-op service LVRS 1-9 dos | $1237.15 | $447.21 | $789.94 | 2.77 | 7 | 1 | n/a | n/a | $172.61 | $1247.34 |
| G0305 | HCPCS | facility | Post op service LVRS min 6 | $1237.15 | $447.21 | $789.94 | 2.77 | 7 | 1 | n/a | n/a | $172.61 | $1247.34 |
| 20822 | HCPCS | facility | Replantation digit complete | $2714.39 | $1927.09 | $787.3 | 1.41 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 90935 | HCPCS | facility | HC HEMODIALYSIS PROC W/ PHYS/QHP EVALUATION | $1609.75 | $822.51 | $787.24 | 1.96 | 7 | 1 | $2113.0 | $1479.1 | $699.55 | $1623.01 |
| C9789 | HCPCS | facility | Instill pharm renal pelvis | $2250.0 | $1466.89 | $783.11 | 1.53 | 3 | 1 | n/a | n/a | $1466.89 | $2250.0 |
| 67599 | HCPCS | facility | Orbit surgery procedure | $1151.97 | $380.39 | $771.58 | 3.03 | 5 | 1 | n/a | n/a | $380.39 | $1151.97 |
| 67999 | HCPCS | facility | Revision of eyelid | $1151.97 | $380.39 | $771.58 | 3.03 | 5 | 1 | n/a | n/a | $380.39 | $1151.97 |
| 68399 | HCPCS | facility | Eyelid lining surgery | $1151.97 | $380.39 | $771.58 | 3.03 | 5 | 1 | n/a | n/a | $380.39 | $1151.97 |
| 68899 | HCPCS | facility | Tear duct system surgery | $1151.97 | $380.39 | $771.58 | 3.03 | 5 | 1 | n/a | n/a | $380.39 | $1151.97 |
| Q4268 | HCPCS | facility | Surgraft ft per sq cm | $919.14 | $149.14 | $770.0 | 6.16 | 8 | 1 | n/a | n/a | $149.14 | $5928.0 |
| 78201 | HCPCS | facility | HC LIVER IMAGE; STATIC ONLY | $1405.87 | $650.72 | $755.15 | 2.16 | 10 | 1 | $2137.0 | $1495.9 | $314.39 | $2001.24 |
| 78202 | HCPCS | facility | Liver imaging with flow | $1405.87 | $650.72 | $755.15 | 2.16 | 10 | 1 | n/a | n/a | $314.39 | $2001.24 |
| 78457 | HCPCS | facility | Venous thrombosis imaging | $1405.87 | $650.72 | $755.15 | 2.16 | 10 | 1 | n/a | n/a | $330.97 | $2013.58 |
| 78469 | HCPCS | facility | Heart infarct image (3D) | $1405.87 | $650.72 | $755.15 | 2.16 | 10 | 1 | n/a | n/a | $308.99 | $2049.98 |
| 78802 | HCPCS | facility | HC RADIOPHRM LOC TUMOR,WHOLE BODY | $1405.87 | $650.72 | $755.15 | 2.16 | 10 | 1 | $2777.0 | $1943.9 | $502.54 | $4134.12 |
| 78804 | HCPCS | facility | HC RADIOPHARM LOC TUMOR; PLANAR, WHOLE BODY, REQUIRING 2+ DAYS IMAGING | $1405.87 | $650.72 | $755.15 | 2.16 | 10 | 1 | $2718.0 | $1902.6 | $650.72 | $4149.7 |
| 27562 | HCPCS | facility | Treat kneecap dislocation | $1039.07 | $295.62 | $743.45 | 3.51 | 11 | 1 | n/a | n/a | $257.4 | $1805.48 |
| Q4256 | HCPCS | facility | Mlg complet, per sq cm | $889.685 | $149.14 | $740.545 | 5.97 | 6 | 1 | n/a | n/a | $149.14 | $1067.48 |
| Q4304 | HCPCS | facility | Grafix plus, per sq cm | $889.21 | $149.14 | $740.07 | 5.96 | 6 | 1 | n/a | n/a | $149.14 | $1189.21 |
| 55970 | HCPCS | facility | Sex transformation m to f | $6735.22 | $5995.17 | $740.05 | 1.12 | 7 | 1 | n/a | n/a | $2700.25 | $6735.22 |
| Q4276 | HCPCS | facility | Orion, per sq cm | $884.67 | $149.14 | $735.53 | 5.93 | 8 | 1 | n/a | n/a | $149.14 | $1653.0 |
| A9521 | HCPCS | facility | Tc99m exametazime | $1659.8 | $927.71 | $732.09 | 1.79 | 3 | 1 | $2508.75 | $1756.12 | $927.71 | $1659.8 |
| 78099 | HCPCS | facility | Endocrine nuclear procedure | $1208.425 | $479.1 | $729.325 | 2.52 | 4 | 1 | n/a | n/a | $479.1 | $1213.38 |
| 78199 | HCPCS | facility | Blood/lymph nuclear exam | $1208.425 | $479.1 | $729.325 | 2.52 | 4 | 1 | n/a | n/a | $479.1 | $1213.38 |
| 78299 | HCPCS | facility | GI nuclear procedure | $1208.425 | $479.1 | $729.325 | 2.52 | 4 | 1 | n/a | n/a | $479.1 | $1213.38 |
| 78399 | HCPCS | facility | Musculoskeletal nuclear exam | $1208.425 | $479.1 | $729.325 | 2.52 | 4 | 1 | n/a | n/a | $479.1 | $1213.38 |
| 78499 | HCPCS | facility | Cardiovascular nuclear exam | $1208.425 | $479.1 | $729.325 | 2.52 | 4 | 1 | n/a | n/a | $479.1 | $1213.38 |
| 78599 | HCPCS | facility | Respiratory nuclear exam | $1208.425 | $479.1 | $729.325 | 2.52 | 4 | 1 | n/a | n/a | $479.1 | $1213.38 |
| 78699 | HCPCS | facility | Nervous system nuclear exam | $1208.425 | $479.1 | $729.325 | 2.52 | 4 | 1 | n/a | n/a | $479.1 | $1213.38 |
| 78799 | HCPCS | facility | Genitourinary nuclear exam | $1208.425 | $479.1 | $729.325 | 2.52 | 4 | 1 | n/a | n/a | $479.1 | $1213.38 |
| 78999 | HCPCS | facility | Nuclear diagnostic exam | $1208.425 | $479.1 | $729.325 | 2.52 | 4 | 1 | n/a | n/a | $479.1 | $1213.38 |
| A9569 | HCPCS | facility | Technetium TC-99m auto WBC | $1659.8 | $934.13 | $725.67 | 1.78 | 3 | 1 | n/a | n/a | $934.13 | $1659.8 |
| 78282 | HCPCS | facility | GI protein loss exam | $1203.47 | $479.1 | $724.37 | 2.51 | 7 | 1 | n/a | n/a | $256.76 | $1213.38 |
| C8900 | HCPCS | facility | Mra w/cont, abd | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8902 | HCPCS | facility | Mra w/o fol w/cont, abd | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8905 | HCPCS | facility | Mri w/o fol w/cont, brst, un | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8906 | HCPCS | facility | Mri w/cont, breast,  bi | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8912 | HCPCS | facility | Mra w/cont, lwr ext | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8914 | HCPCS | facility | Mra w/o fol w/cont, lwr ext | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8918 | HCPCS | facility | MRA w/cont, pelvis | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8920 | HCPCS | facility | Mra w/o fol w/cont, pelvis | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8931 | HCPCS | facility | MRA, w/dye, spinal canal | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8933 | HCPCS | facility | MRA, w/o&w/dye, spinal canal | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8934 | HCPCS | facility | MRA, w/dye, upper extremity | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8936 | HCPCS | facility | MRA, w/o&w/dye, upper extr | $1140.64 | $418.11 | $722.53 | 2.73 | 7 | 1 | n/a | n/a | $418.11 | $1150.04 |
| 43291 | HCPCS | facility | Egd flx trnsorl rmvl balo | $1805.48 | $1086.97 | $718.51 | 1.66 | 7 | 1 | n/a | n/a | $825.51 | $1805.48 |
| 43499 | HCPCS | facility | Esophagus surgery procedure | $1805.48 | $1086.97 | $718.51 | 1.66 | 5 | 1 | n/a | n/a | $1086.97 | $1805.48 |
| 43999 | HCPCS | facility | Stomach surgery procedure | $1805.48 | $1086.97 | $718.51 | 1.66 | 5 | 1 | n/a | n/a | $1086.97 | $1805.48 |
| 27179 | HCPCS | facility | Revise head/neck of femur | $9412.735 | $8696.19 | $716.545 | 1.08 | 8 | 1 | n/a | n/a | $5862.48 | $9619.86 |
| 27236 | HCPCS | facility | Treat thigh fracture | $9412.735 | $8696.19 | $716.545 | 1.08 | 8 | 1 | n/a | n/a | $1276.67 | $9619.86 |
| 27245 | HCPCS | facility | Treat thigh fracture | $9412.735 | $8696.19 | $716.545 | 1.08 | 8 | 1 | n/a | n/a | $1312.52 | $9619.86 |
| 27506 | HCPCS | facility | Treatment of thigh fracture | $9412.735 | $8696.19 | $716.545 | 1.08 | 8 | 1 | n/a | n/a | $1427.59 | $9619.86 |
| 27507 | HCPCS | facility | Treatment of thigh fracture | $9412.735 | $8696.19 | $716.545 | 1.08 | 8 | 1 | n/a | n/a | $1036.73 | $9619.86 |
| 63265 | HCPCS | facility | Excise intraspinl lesion crv | $9412.735 | $8696.19 | $716.545 | 1.08 | 8 | 1 | n/a | n/a | $1735.66 | $9619.86 |
| 63267 | HCPCS | facility | Excise intrspinl lesion lmbr | $9412.735 | $8696.19 | $716.545 | 1.08 | 8 | 1 | n/a | n/a | $1438.72 | $9619.86 |
| 31573 | HCPCS | facility | Largsc w/ther injection | $2842.075 | $2133.11 | $708.965 | 1.33 | 10 | 1 | n/a | n/a | $1269.25 | $4303.61 |
| 31574 | HCPCS | facility | Largsc w/njx augmentation | $2842.075 | $2133.11 | $708.965 | 1.33 | 10 | 1 | n/a | n/a | $1269.25 | $4303.61 |
| 62263 | HCPCS | facility | Epidural lysis mult sessions | $1766.605 | $1059.99 | $706.615 | 1.67 | 8 | 1 | n/a | n/a | $856.68 | $1805.48 |
| 99465 | HCPCS | facility | Nb resuscitation | $1497.36 | $792.11 | $705.25 | 1.89 | 4 | 1 | n/a | n/a | $792.11 | $1503.5 |
| 26775 | HCPCS | facility | HC CL TX FING DISLOC W/ANES | $1039.07 | $335.2 | $703.87 | 3.10 | 11 | 1 | $2022.0 | $1415.4 | $168.45 | $1805.48 |
| 28665 | HCPCS | facility | HC CLOSED TX INTERPHALANGEAL JNT DISLOCATION; W/ANES | $1039.07 | $335.2 | $703.87 | 3.10 | 11 | 1 | $2272.0 | $1590.4 | $168.45 | $1805.48 |
| 89346 | HCPCS | facility | Storage/year oocyte(s) | $906.34 | $204.18 | $702.16 | 4.44 | 7 | 1 | n/a | n/a | $60.45 | $913.81 |
| 92230 | HCPCS | facility | Eye exam with photos | $1145.97 | $447.21 | $698.76 | 2.56 | 7 | 1 | n/a | n/a | $74.07 | $1155.41 |
| 29848 | HCPCS | facility | Wrist endoscopy/surgery | $2625.39 | $1927.09 | $698.3 | 1.36 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| 29850 | HCPCS | facility | Knee arthroscopy/surgery | $2625.39 | $1927.09 | $698.3 | 1.36 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| 29902 | HCPCS | facility | Mcp joint arthroscopy surg | $2625.39 | $1927.09 | $698.3 | 1.36 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 43762 | HCPCS | facility | HC REPLACE GASTRO TUBE, W/O IMAG/ENDO GUID, NO REVISION TRACT | $996.185 | $299.43 | $696.755 | 3.33 | 10 | 1 | $551.0 | $385.7 | $172.66 | $1805.48 |
| 43763 | HCPCS | facility | HC PERQ REPLACE GTUBE, W/O IMAG/ENDO GUID; REQ REV GASTRO TRACT | $996.185 | $299.43 | $696.755 | 3.33 | 10 | 1 | $551.0 | $385.7 | $172.66 | $1805.48 |
| G0186 | HCPCS | facility | Dstry eye lesn,fdr vssl tech | $1355.0 | $659.14 | $695.86 | 2.06 | 7 | 1 | n/a | n/a | $416.39 | $1366.16 |
| G0379 | HCPCS | facility | Direct refer hospital observ | $1408.445 | $713.71 | $694.735 | 1.97 | 4 | 1 | $72.0 | $50.4 | $713.71 | $1414.22 |
| 31201 | HCPCS | facility | Removal of ethmoid sinus | $2551.58 | $1859.49 | $692.09 | 1.37 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 42405 | HCPCS | facility | Biopsy of salivary gland | $2551.58 | $1859.49 | $692.09 | 1.37 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 69610 | HCPCS | facility | Repair of eardrum | $2551.58 | $1859.49 | $692.09 | 1.37 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 45399 | HCPCS | facility | Unlisted procedure colon | $1805.48 | $1114.51 | $690.97 | 1.62 | 5 | 1 | n/a | n/a | $1114.51 | $1805.48 |
| 31646 | HCPCS | facility | Bronchoscopy reclear airway | $1158.98 | $468.74 | $690.24 | 2.47 | 11 | 1 | n/a | n/a | $441.98 | $1805.48 |
| 21742 | HCPCS | facility | Repair stern/nuss w/o scope | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 21743 | HCPCS | facility | Repair sternum/nuss w/scope | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 23130 | HCPCS | facility | Remove shoulder bone part | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $8915.56 |
| 24470 | HCPCS | facility | Revision of elbow joint | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25312 | HCPCS | facility | Transplant forearm tendon | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25335 | HCPCS | facility | Realignment of hand | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25355 | HCPCS | facility | Revision of radius | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25370 | HCPCS | facility | Revise radius or ulna | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25375 | HCPCS | facility | Revise radius & ulna | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25426 | HCPCS | facility | Repair/graft radius & ulna | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25430 | HCPCS | facility | Vasc graft into carpal bone | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25450 | HCPCS | facility | Revision of wrist joint | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25455 | HCPCS | facility | Revision of wrist joint | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 25492 | HCPCS | facility | Reinforce radius and ulna | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 27105 | HCPCS | facility | Transfer of spinal muscle | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 27111 | HCPCS | facility | Transfer of iliopsoas muscle | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| 27395 | HCPCS | facility | Lengthening of thigh tendons | $4605.66 | $3921.32 | $684.34 | 1.17 | 11 | 1 | n/a | n/a | $2999.94 | $6735.22 |
| Q4281 | HCPCS | facility | Barrera slor dl per sq cm | $829.65 | $149.14 | $680.51 | 5.56 | 8 | 1 | n/a | n/a | $149.14 | $1767.0 |
| 62281 | HCPCS | facility | Treat spinal cord lesion | $1727.73 | $1059.99 | $667.74 | 1.63 | 11 | 1 | n/a | n/a | $856.68 | $1881.74 |
| 62282 | HCPCS | facility | Treat spinal canal lesion | $1727.73 | $1059.99 | $667.74 | 1.63 | 11 | 1 | n/a | n/a | $856.68 | $1881.74 |
| 64448 | HCPCS | facility | N block inj fem cont inf | $1727.73 | $1059.99 | $667.74 | 1.63 | 11 | 1 | n/a | n/a | $565.75 | $1881.74 |
| 64600 | HCPCS | facility | Injection treatment of nerve | $1727.73 | $1059.99 | $667.74 | 1.63 | 11 | 1 | n/a | n/a | $856.68 | $1881.74 |
| 64620 | HCPCS | facility | HC INJECTION TX,INTERCOSTAL NERVE | $1727.73 | $1059.99 | $667.74 | 1.63 | 11 | 1 | $2315.0 | $1620.5 | $856.68 | $1881.74 |
| 64624 | HCPCS | facility | Dstrj nulyt agt gnclr nrv | $3001.3 | $2340.24 | $661.06 | 1.28 | 10 | 1 | $5398.0 | $3778.6 | $1719.16 | $4303.61 |
| Q4283 | HCPCS | facility | Biovance tri or 3l, sq cm | $800.0 | $149.14 | $650.86 | 5.36 | 8 | 1 | n/a | n/a | $149.14 | $1710.0 |
| G2082 | HCPCS | facility | Visit esketamine 56m or less | $1880.69 | $1232.28 | $648.41 | 1.53 | 7 | 1 | n/a | n/a | $739.42 | $1896.18 |
| Q4194 | HCPCS | facility | Novachor 1 sq cm | $783.89 | $149.14 | $634.75 | 5.26 | 6 | 1 | n/a | n/a | $149.14 | $860.97 |
| 52285 | HCPCS | facility | Cystoscopy and treatment | $1467.33 | $835.67 | $631.66 | 1.76 | 11 | 1 | n/a | n/a | $642.96 | $4303.61 |
| 58291 | HCPCS | facility | Vag hyst incl t/o complex | $6624.88 | $5995.17 | $629.71 | 1.11 | 10 | 1 | n/a | n/a | $3405.53 | $8915.56 |
| 20910 | HCPCS | facility | Remove cartilage for graft | $1510.07 | $885.74 | $624.33 | 1.70 | 11 | 1 | n/a | n/a | $498.62 | $4303.61 |
| 38999 | HCPCS | facility | Blood/lymph system procedure | $1151.97 | $528.72 | $623.25 | 2.18 | 5 | 1 | $972.0 | $680.4 | $528.72 | $1151.97 |
| 66989 | HCPCS | facility | Xcpsl ctrc rmvl cplx insj 1+ | $6994.445 | $6377.3 | $617.145 | 1.10 | 10 | 1 | n/a | n/a | $4250.0 | $9619.86 |
| 66991 | HCPCS | facility | Xcapsl ctrc rmvl insj 1+ | $6994.445 | $6377.3 | $617.145 | 1.10 | 10 | 1 | n/a | n/a | $4250.0 | $9619.86 |
| Q4320 | HCPCS | facility | Pellograft, per sq cm | $765.0 | $149.14 | $615.86 | 5.13 | 3 | 1 | n/a | n/a | $149.14 | $765.0 |
| Q4333 | HCPCS | facility | Ardeograft, per sq cm | $765.0 | $149.14 | $615.86 | 5.13 | 3 | 1 | n/a | n/a | $149.14 | $765.0 |
| Q4269 | HCPCS | facility | Surgraft xt per sq cm | $763.2 | $149.14 | $614.06 | 5.12 | 5 | 1 | n/a | n/a | $149.14 | $765.0 |
| Q4321 | HCPCS | facility | Renograft, per sq cm | $763.2 | $149.14 | $614.06 | 5.12 | 3 | 1 | n/a | n/a | $149.14 | $763.2 |
| 44408 | HCPCS | facility | Colonoscopy w/decompression | $1727.73 | $1114.51 | $613.22 | 1.55 | 11 | 1 | n/a | n/a | $691.32 | $2605.47 |
| J9015 | HCPCS | facility | Aldesleukin injection | $3949.73 | $3338.87 | $610.86 | 1.18 | 10 | 1 | n/a | n/a | $1246.98 | $6908.4 |
| 15769 | HCPCS | facility | Grfg autol soft tiss dir exc | $4854.07 | $4246.97 | $607.1 | 1.14 | 10 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 15771 | HCPCS | facility | Grfg autol fat lipo 50 cc/< | $4854.07 | $4246.97 | $607.1 | 1.14 | 10 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 38210 | HCPCS | facility | T-cell depletion of harvest | $1127.165 | $528.72 | $598.445 | 2.13 | 8 | 1 | n/a | n/a | $435.79 | $1151.97 |
| 38211 | HCPCS | facility | Tumor cell deplete of harvst | $1127.165 | $528.72 | $598.445 | 2.13 | 8 | 1 | n/a | n/a | $435.79 | $1151.97 |
| 38212 | HCPCS | facility | Rbc depletion of harvest | $1127.165 | $528.72 | $598.445 | 2.13 | 8 | 1 | n/a | n/a | $435.79 | $1151.97 |
| 38213 | HCPCS | facility | Platelet deplete of harvest | $1127.165 | $528.72 | $598.445 | 2.13 | 8 | 1 | n/a | n/a | $435.79 | $1151.97 |
| 51840 | HCPCS | facility | Attach bladder/urethra | $6590.205 | $5995.17 | $595.035 | 1.10 | 8 | 1 | n/a | n/a | $702.96 | $6735.22 |
| 57292 | HCPCS | facility | Construct vagina with graft | $6590.205 | $5995.17 | $595.035 | 1.10 | 8 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 49591 | HCPCS | facility | Rpr aa hrn 1st < 3 cm rdc | $4858.22 | $4290.92 | $567.3 | 1.13 | 9 | 1 | n/a | n/a | $3934.87 | $8915.56 |
| 49613 | HCPCS | facility | Rpr aa hrn rcr < 3 rdc | $4858.22 | $4290.92 | $567.3 | 1.13 | 9 | 1 | n/a | n/a | $3934.87 | $8915.56 |
| 76390 | HCPCS | facility | Mr spectroscopy | $663.13 | $104.29 | $558.84 | 6.36 | 10 | 1 | n/a | n/a | $104.29 | $677.1 |
| Q4205 | HCPCS | facility | Membrane graft or wrap sq cm | $707.805 | $149.14 | $558.665 | 4.75 | 6 | 1 | n/a | n/a | $106.56 | $1310.45 |
| 15730 | HCPCS | facility | Mdfc flap w/prsrv vasc pedcl | $4804.21 | $4246.97 | $557.24 | 1.13 | 10 | 1 | n/a | n/a | $2710.3 | $6735.22 |
| 15733 | HCPCS | facility | Musc myoq/fscq flp h&n pedcl | $4804.21 | $4246.97 | $557.24 | 1.13 | 10 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 28405 | HCPCS | facility | Treatment of heel fracture | $835.41 | $295.62 | $539.79 | 2.83 | 11 | 1 | n/a | n/a | $257.4 | $4303.61 |
| A9596 | HCPCS | facility | Gallium illuccix 1 millicure | $1011.77 | $478.52 | $533.25 | 2.11 | 12 | 1 | n/a | n/a | $478.52 | $1071.6 |
| 24566 | HCPCS | facility | Treat humerus fracture | $2450.65 | $1927.09 | $523.56 | 1.27 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| 28546 | HCPCS | facility | Treat foot dislocation | $2450.65 | $1927.09 | $523.56 | 1.27 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| 43761 | HCPCS | facility | HC REPOSITION NASO/ORO-GASTRIC FEEDING TUBE, THROUGH DUODENUM | $816.57 | $299.43 | $517.14 | 2.73 | 11 | 1 | $547.0 | $382.9 | $264.64 | $1805.48 |
| A9800 | HCPCS | facility | Gallium locametz 1 millicuri | $878.87 | $362.5 | $516.37 | 2.42 | 9 | 1 | n/a | n/a | $362.5 | $912.0 |
| 99285 | HCPCS | facility | Emergency dept visit | $1229.08 | $713.71 | $515.37 | 1.72 | 6 | 1 | $1804.0 | $1262.8 | $600.71 | $1239.27 |
| 31648 | HCPCS | facility | Bronchial valve remov init | $4983.335 | $4468.23 | $515.105 | 1.12 | 10 | 1 | n/a | n/a | $1572.2 | $6735.22 |
| 79999 | HCPCS | facility | Nuclear medicine therapy | $769.045 | $279.64 | $489.405 | 2.75 | 4 | 1 | n/a | n/a | $279.64 | $772.2 |
| Q4319 | HCPCS | facility | Sanograft, per sq cm | $636.75 | $149.14 | $487.61 | 4.27 | 6 | 1 | n/a | n/a | $149.14 | $637.5 |
| C9733 | HCPCS | facility | Non-ophthalmic FVA | $905.59 | $418.11 | $487.48 | 2.17 | 7 | 1 | n/a | n/a | $330.97 | $913.05 |
| 0699T | HCPCS | facility | Njx pst chmbr eye medication | $3252.495 | $2765.81 | $486.685 | 1.18 | 10 | 1 | n/a | n/a | $2120.86 | $4303.61 |
| 79300 | HCPCS | facility | Nuclr rx interstit colloid | $765.89 | $279.64 | $486.25 | 2.74 | 7 | 1 | n/a | n/a | $236.71 | $772.2 |
| Q4227 | HCPCS | facility | Amniocore per sq cm | $629.97 | $149.14 | $480.83 | 4.22 | 6 | 1 | n/a | n/a | $149.14 | $1038.8 |
| J0716 | HCPCS | facility | Centruroides immune f(ab) | $5351.02 | $4871.94 | $479.08 | 1.10 | 10 | 1 | n/a | n/a | $4750.35 | $5980.55 |
| G0175 | HCPCS | facility | Opps service,sched team conf | $979.045 | $500.07 | $478.975 | 1.96 | 4 | 1 | n/a | n/a | $500.07 | $983.06 |
| 15773 | HCPCS | facility | Grfg autol fat lipo 25 cc/< | $2948.36 | $2472.73 | $475.63 | 1.19 | 10 | 1 | n/a | n/a | $1111.61 | $4303.61 |
| 90945 | HCPCS | facility | Dialysis one evaluation | $975.03 | $500.07 | $474.96 | 1.95 | 7 | 1 | n/a | n/a | $412.1 | $983.06 |
| 77520 | HCPCS | facility | Proton trmt simple w/o comp | $1136.61 | $662.19 | $474.42 | 1.72 | 10 | 1 | n/a | n/a | $594.48 | $1788.13 |
| 36465 | HCPCS | facility | Njx noncmpnd sclrsnt 1 vein | $2944.805 | $2472.73 | $472.075 | 1.19 | 10 | 1 | n/a | n/a | $1568.32 | $4303.61 |
| 36466 | HCPCS | facility | Njx noncmpnd sclrsnt mlt vn | $2944.805 | $2472.73 | $472.075 | 1.19 | 10 | 1 | n/a | n/a | $1568.32 | $4303.61 |
| 99284 | HCPCS | facility | Emergency dept visit | $970.14 | $500.07 | $470.07 | 1.94 | 6 | 1 | $1473.0 | $1031.1 | $412.1 | $978.18 |
| 0693T | HCPCS | facility | Compre ful bdy 3d mtn alys | $879.04 | $411.15 | $467.89 | 2.14 | 7 | 1 | n/a | n/a | $350.0 | $886.28 |
| 36513 | HCPCS | facility | Apheresis platelets | $995.91 | $528.72 | $467.19 | 1.88 | 10 | 1 | n/a | n/a | $437.87 | $1321.86 |
| 32562 | HCPCS | facility | Lyse chest fibrin subq day | $1218.375 | $751.79 | $466.585 | 1.62 | 10 | 1 | n/a | n/a | $412.39 | $1805.48 |
| 36572 | HCPCS | facility | Insj picc rs&i <5 yr | $1218.375 | $751.79 | $466.585 | 1.62 | 10 | 1 | n/a | n/a | $620.01 | $1805.48 |
| Q4261 | HCPCS | facility | Tag, per square centimeter | $615.26 | $149.14 | $466.12 | 4.13 | 5 | 1 | n/a | n/a | $149.14 | $687.65 |
| Q4229 | HCPCS | facility | Cogenex amnio memb per sq cm | $613.37 | $149.14 | $464.23 | 4.11 | 6 | 1 | n/a | n/a | $149.14 | $936.44 |
| A2019 | HCPCS | facility | Kerecis marigen shld sq cm | $607.31 | $149.14 | $458.17 | 4.07 | 8 | 1 | n/a | n/a | $149.14 | $678.76 |
| Q4257 | HCPCS | facility | Relese, per sq cm | $607.27 | $149.14 | $458.13 | 4.07 | 6 | 1 | n/a | n/a | $149.14 | $652.66 |
| 0598T | HCPCS | facility | Ncntc r-t fluor wnd img 1st | $715.4 | $258.77 | $456.63 | 2.76 | 7 | 1 | n/a | n/a | $258.77 | $721.29 |
| G0498 | HCPCS | facility | Chemo extend iv infus w/pump | $849.14 | $395.85 | $453.29 | 2.15 | 7 | 1 | n/a | n/a | $329.78 | $856.13 |
| 61055 | HCPCS | facility | Injection into brain canal | $815.89 | $367.87 | $448.02 | 2.22 | 11 | 1 | n/a | n/a | $283.01 | $1805.48 |
| 92512 | HCPCS | facility | Nasal function studies | $702.52 | $258.77 | $443.75 | 2.71 | 7 | 1 | n/a | n/a | $65.29 | $708.3 |
| C8901 | HCPCS | facility | Mra w/o cont, abd | $724.44 | $285.95 | $438.49 | 2.53 | 7 | 1 | n/a | n/a | $285.95 | $730.4 |
| C8913 | HCPCS | facility | Mra w/o cont, lwr ext | $724.44 | $285.95 | $438.49 | 2.53 | 7 | 1 | n/a | n/a | $285.95 | $730.4 |
| C8919 | HCPCS | facility | MRA w/o cont, pelvis | $724.44 | $285.95 | $438.49 | 2.53 | 7 | 1 | n/a | n/a | $285.95 | $730.4 |
| C8932 | HCPCS | facility | MRA, w/o dye, spinal canal | $724.44 | $285.95 | $438.49 | 2.53 | 7 | 1 | n/a | n/a | $285.95 | $730.4 |
| C8935 | HCPCS | facility | MRA, w/o dye, upper extr | $724.44 | $285.95 | $438.49 | 2.53 | 7 | 1 | n/a | n/a | $285.95 | $730.4 |
| Q4203 | HCPCS | facility | Derma-gide, 1 sq cm | $585.775 | $149.14 | $436.635 | 3.93 | 6 | 1 | n/a | n/a | $149.14 | $871.37 |
| Q4282 | HCPCS | facility | Cygnus dual per sq cm | $584.45 | $149.14 | $435.31 | 3.92 | 8 | 1 | n/a | n/a | $149.14 | $669.82 |
| 99283 | HCPCS | facility | Emergency dept visit | $758.84 | $327.15 | $431.69 | 2.32 | 6 | 1 | $1105.0 | $773.5 | $255.0 | $765.13 |
| 0071T | HCPCS | facility | Us leiomyomata ablate <200 | $4303.61 | $3879.52 | $424.09 | 1.11 | 5 | 1 | n/a | n/a | $3879.52 | $4303.61 |
| 0072T | HCPCS | facility | Us leiomyomata ablate >200 | $4303.61 | $3879.52 | $424.09 | 1.11 | 5 | 1 | n/a | n/a | $3879.52 | $4303.61 |
| Q4219 | HCPCS | facility | Surgigraft dual per sq cm | $566.35 | $149.14 | $417.21 | 3.80 | 6 | 1 | n/a | n/a | $112.7 | $1020.0 |
| 99282 | HCPCS | facility | Emergency dept visit | $595.57 | $184.01 | $411.56 | 3.24 | 6 | 1 | $741.0 | $518.7 | $146.33 | $600.5 |
| 21076 | HCPCS | facility | Prepare face/oral prosthesis | $2264.42 | $1859.49 | $404.93 | 1.22 | 11 | 1 | n/a | n/a | $1462.72 | $9619.86 |
| 21345 | HCPCS | facility | Closed tx nose/jaw fx | $2264.42 | $1859.49 | $404.93 | 1.22 | 11 | 1 | n/a | n/a | $1462.72 | $8915.56 |
| 21485 | HCPCS | facility | Reset dislocated jaw | $2264.42 | $1859.49 | $404.93 | 1.22 | 11 | 1 | n/a | n/a | $1462.72 | $4303.61 |
| 30320 | HCPCS | facility | Remove nasal foreign body | $2264.42 | $1859.49 | $404.93 | 1.22 | 11 | 1 | n/a | n/a | $1462.72 | $4303.61 |
| 42955 | HCPCS | facility | Surgical opening of throat | $2264.42 | $1859.49 | $404.93 | 1.22 | 11 | 1 | n/a | n/a | $1462.72 | $4303.61 |
| 69700 | HCPCS | facility | Close mastoid fistula | $2264.42 | $1859.49 | $404.93 | 1.22 | 11 | 1 | n/a | n/a | $1462.72 | $6735.22 |
| 32999 | HCPCS | facility | Chest surgery procedure | $1151.97 | $751.79 | $400.18 | 1.53 | 5 | 1 | n/a | n/a | $751.79 | $1151.97 |
| 33999 | HCPCS | facility | Cardiac surgery procedure | $1151.97 | $751.79 | $400.18 | 1.53 | 5 | 1 | n/a | n/a | $751.79 | $1151.97 |
| 69705 | HCPCS | facility | Nps surg dilat eust tube uni | $7493.425 | $7094.6 | $398.825 | 1.06 | 10 | 1 | n/a | n/a | $5086.05 | $9619.86 |
| 69706 | HCPCS | facility | Nps surg dilat eust tube bi | $7493.425 | $7094.6 | $398.825 | 1.06 | 10 | 1 | n/a | n/a | $5086.05 | $9619.86 |
| 0278T | HCPCS | facility | Tempr | $552.31 | $154.21 | $398.1 | 3.58 | 5 | 1 | n/a | n/a | $154.21 | $552.31 |
| 99281 | HCPCS | facility | Emergency dept visit | $495.56 | $101.06 | $394.5 | 4.90 | 6 | 1 | $385.0 | $269.5 | $79.74 | $499.66 |
| A9592 | HCPCS | facility | Copper cu 64 dotatate diag | $981.75 | $594.28 | $387.47 | 1.65 | 5 | 1 | n/a | n/a | $594.28 | $997.5 |
| A9594 | HCPCS | facility | Gallium ga-68 psma-11, ucla | $749.84 | $363.5 | $386.34 | 2.06 | 9 | 1 | n/a | n/a | $363.5 | $776.84 |
| 21627 | HCPCS | facility | Sternal debridement | $4303.61 | $3921.32 | $382.29 | 1.10 | 7 | 1 | n/a | n/a | $3306.89 | $4303.61 |
| 27646 | HCPCS | facility | Resect fibula tumor | $4303.61 | $3921.32 | $382.29 | 1.10 | 6 | 1 | n/a | n/a | $3696.01 | $4303.61 |
| 27727 | HCPCS | facility | Repair of lower leg | $4303.61 | $3921.32 | $382.29 | 1.10 | 6 | 1 | n/a | n/a | $3696.01 | $4303.61 |
| 27881 | HCPCS | facility | Amputation of lower leg | $4303.61 | $3921.32 | $382.29 | 1.10 | 6 | 1 | n/a | n/a | $3696.01 | $4303.61 |
| 27882 | HCPCS | facility | Amputation of lower leg | $4303.61 | $3921.32 | $382.29 | 1.10 | 6 | 1 | n/a | n/a | $3696.01 | $4303.61 |
| Q4160 | HCPCS | facility | HC NUSHIELD, PER 1 SQ CM | $530.0 | $149.14 | $380.86 | 3.55 | 8 | 1 | $317.0 | $221.9 | $96.4 | $3990.0 |
| Q4247 | HCPCS | facility | Amniotext patch, per sq cm | $530.0 | $149.14 | $380.86 | 3.55 | 3 | 1 | n/a | n/a | $149.14 | $530.0 |
| 21085 | HCPCS | facility | Prepare face/oral prosthesis | $663.93 | $283.85 | $380.08 | 2.34 | 11 | 1 | n/a | n/a | $235.73 | $9619.86 |
| 31605 | HCPCS | facility | HC TRACHEOSTOMY, EMERGENCY PROC; CRICOTHYROID MEMBRANE | $663.93 | $283.85 | $380.08 | 2.34 | 11 | 1 | $519.0 | $363.3 | $235.73 | $1805.48 |
| 41252 | HCPCS | facility | HC REPAIR TOUNG LACERATION | $663.93 | $283.85 | $380.08 | 2.34 | 11 | 1 | $1010.0 | $707.0 | $235.73 | $4303.61 |
| 78433 | HCPCS | facility | Myocrd img pet 2rtracer ct | $3014.73 | $2639.93 | $374.8 | 1.14 | 10 | 1 | n/a | n/a | $2639.93 | $7503.27 |
| 45000 | HCPCS | facility | Drainage of pelvic abscess | $1805.48 | $1434.11 | $371.37 | 1.26 | 11 | 1 | n/a | n/a | $1120.45 | $2325.24 |
| 45150 | HCPCS | facility | Excision of rectal stricture | $1805.48 | $1434.11 | $371.37 | 1.26 | 11 | 1 | n/a | n/a | $1120.45 | $2325.24 |
| 33208 | HCPCS | facility | HC INSERT/REPL ATR & VTR PM, NEW | $12895.61 | $12526.17 | $369.44 | 1.03 | 11 | 1 | $16299.0 | $11409.3 | $6621.28 | $17603.1 |
| 33214 | HCPCS | facility | HC UPGRADE IMPLANTED PACEMAKER SYSTEM, CONVERSION OF SINGLE TO DUAL CHAMBER | $12895.61 | $12526.17 | $369.44 | 1.03 | 11 | 1 | $6211.0 | $4347.7 | $6621.28 | $21267.94 |
| 21079 | HCPCS | facility | Prepare face/oral prosthesis | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $9619.86 |
| 21080 | HCPCS | facility | Prepare face/oral prosthesis | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $9619.86 |
| 21082 | HCPCS | facility | Prepare face/oral prosthesis | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $9619.86 |
| 21083 | HCPCS | facility | Prepare face/oral prosthesis | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $9619.86 |
| 21084 | HCPCS | facility | Prepare face/oral prosthesis | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $9619.86 |
| 21086 | HCPCS | facility | Prepare face/oral prosthesis | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $9619.86 |
| 21088 | HCPCS | facility | Prepare face/oral prosthesis | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $9619.86 |
| 21280 | HCPCS | facility | Revision of eyelid | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $8915.56 |
| 21340 | HCPCS | facility | Perq tx nasoethmoid fx | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $6735.22 |
| 21355 | HCPCS | facility | Perq tx malar fracture | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $6735.22 |
| 21421 | HCPCS | facility | Treat mouth roof fracture | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $6735.22 |
| 21490 | HCPCS | facility | Repair dislocated jaw | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $8915.56 |
| 40720 | HCPCS | facility | Repair cleft lip/nasal | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $8915.56 |
| 42205 | HCPCS | facility | Reconstruct cleft palate | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $8915.56 |
| 42510 | HCPCS | facility | Parotid duct diversion | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $6735.22 |
| 42830 | HCPCS | facility | Removal of adenoids | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $6735.22 |
| 42860 | HCPCS | facility | Excision of tonsil tags | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $6735.22 |
| 61330 | HCPCS | facility | Decompress eye socket | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $8915.56 |
| 69440 | HCPCS | facility | Exploration of middle ear | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $6735.22 |
| 69650 | HCPCS | facility | Release middle ear bone | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $8915.56 |
| 69915 | HCPCS | facility | Incise inner ear nerve | $4341.44 | $3973.4 | $368.04 | 1.09 | 11 | 1 | n/a | n/a | $2551.58 | $8915.56 |
| Q4188 | HCPCS | facility | Amnioarmor 1 sq cm | $515.395 | $149.14 | $366.255 | 3.46 | 6 | 1 | n/a | n/a | $149.14 | $722.66 |
| C8903 | HCPCS | facility | Mri w/cont, breast,  uni | $575.37 | $210.21 | $365.16 | 2.74 | 7 | 1 | n/a | n/a | $210.21 | $580.11 |
| G0384 | HCPCS | facility | Lev 5 hosp type B ED visit | $857.205 | $492.23 | $364.975 | 1.74 | 4 | 1 | n/a | n/a | $492.23 | $860.72 |
| 62328 | HCPCS | facility | Dx lmbr spi pnxr w/fluor/ct | $1206.375 | $845.96 | $360.415 | 1.43 | 10 | 1 | $1472.0 | $1030.4 | $624.98 | $1805.48 |
| 62329 | HCPCS | facility | HC SPINAL PUNCT THERPA DRAIN CSF; W/FLUORO OR CT GUID | $1206.375 | $845.96 | $360.415 | 1.43 | 10 | 1 | $1963.0 | $1374.1 | $624.98 | $1805.48 |
| 62320 | HCPCS | facility | HC INJ INTERLAMIN CRV/THRC,W/O IM | $1206.25 | $845.96 | $360.29 | 1.43 | 10 | 1 | $2315.0 | $1620.5 | $565.75 | $1805.48 |
| 62321 | HCPCS | facility | HC INJ INTERLAMIN CRV/THRC, W/IM | $1206.25 | $845.96 | $360.29 | 1.43 | 10 | 1 | $2315.0 | $1620.5 | $506.98 | $1805.48 |
| 62323 | HCPCS | facility | HC INJ INTERLAMIN LMBR/SAC, W/IM | $1206.25 | $845.96 | $360.29 | 1.43 | 10 | 1 | $2315.0 | $1620.5 | $506.98 | $1805.48 |
| 64461 | HCPCS | facility | HC NERVE BLOCK, THORACIC, SINGLE | $1206.25 | $845.96 | $360.29 | 1.43 | 10 | 1 | $2359.0 | $1651.3 | $585.17 | $1805.48 |
| 64463 | HCPCS | facility | Pvb thoracic cont infusion | $1206.25 | $845.96 | $360.29 | 1.43 | 10 | 1 | n/a | n/a | $585.17 | $1805.48 |
| 95708 | HCPCS | facility | Eeg wo vid ea 12-26hr unmntr | $806.13 | $447.21 | $358.92 | 1.80 | 10 | 1 | $1145.0 | $801.5 | $447.21 | $1247.34 |
| 95709 | HCPCS | facility | Eeg w/o vid ea 12-26hr intmt | $806.13 | $447.21 | $358.92 | 1.80 | 10 | 1 | $1166.0 | $816.2 | $447.21 | $1247.34 |
| 95710 | HCPCS | facility | Eeg w/o vid ea 12-26hr cont | $806.13 | $447.21 | $358.92 | 1.80 | 10 | 1 | n/a | n/a | $447.21 | $1247.34 |
| 95714 | HCPCS | facility | Veeg ea 12-26 hr unmntr | $806.13 | $447.21 | $358.92 | 1.80 | 10 | 1 | n/a | n/a | $447.21 | $1247.34 |
| 95715 | HCPCS | facility | HC EEG W/VIDEO BY TECH, 12-26 HOURS INTERMITTENT MONITORING & MAINTENANCE | $806.13 | $447.21 | $358.92 | 1.80 | 10 | 1 | $1179.0 | $825.3 | $447.21 | $1247.34 |
| 95807 | HCPCS | facility | HC SLEEP STUDY, ATTEND (PAP-NAP) | $806.13 | $447.21 | $358.92 | 1.80 | 10 | 1 | $1515.0 | $1060.5 | $447.21 | $1247.34 |
| 65785 | HCPCS | facility | Impltj ntrstrml crnl rng seg | $5304.02 | $4953.69 | $350.33 | 1.07 | 10 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 10035 | HCPCS | facility | HC PLACE SOFT TISSUE LOCAL DEVL, PERCUT, INCL IMAG GUIDE; 1ST LESION | $1195.12 | $848.66 | $346.46 | 1.41 | 10 | 1 | $1736.0 | $1215.2 | $480.64 | $1805.48 |
| 33286 | HCPCS | facility | HC REMOVAL, SUBCUTANEOUS CARDIAC RHYTHM MONITOR | $1195.12 | $848.66 | $346.46 | 1.41 | 10 | 1 | $2681.0 | $1876.7 | $583.61 | $1805.48 |
| 70559 | HCPCS | facility | Mri brain w/o & w/dye | $549.47 | $210.21 | $339.26 | 2.61 | 10 | 1 | n/a | n/a | $210.21 | $681.06 |
| 93745 | HCPCS | facility | Set-up cardiovert-defibrill | $704.86 | $368.09 | $336.77 | 1.91 | 7 | 1 | n/a | n/a | $33.95 | $710.66 |
| G0303 | HCPCS | facility | Pre-op service LVRS 10-15dos | $594.84 | $258.77 | $336.07 | 2.30 | 7 | 1 | n/a | n/a | $258.77 | $806.13 |
| Q4236 | HCPCS | facility | Carepatch per sq cm | $484.03 | $149.14 | $334.89 | 3.25 | 6 | 1 | n/a | n/a | $149.14 | $811.51 |
| 0509T | HCPCS | facility | Pattern erg w/i&r | $589.98 | $258.77 | $331.21 | 2.28 | 7 | 1 | n/a | n/a | $144.89 | $594.84 |
| J9226 | HCPCS | facility | Supprelin LA implant | $45350.22 | $45020.65 | $329.57 | 1.01 | 13 | 1 | n/a | n/a | $40116.0 | $45560.39 |
| G0383 | HCPCS | facility | Lev 4 hosp type B ED visit | $637.34 | $316.76 | $320.58 | 2.01 | 7 | 1 | n/a | n/a | $247.47 | $642.59 |
| 95700 | HCPCS | facility | Eeg cont rec w/vid eeg tech | $578.4 | $258.77 | $319.63 | 2.24 | 7 | 1 | $603.0 | $422.1 | $258.77 | $583.17 |
| J1560 | HCPCS | facility | Gamma globulin > 10 CC inj | $484.58 | $170.48 | $314.1 | 2.84 | 13 | 1 | n/a | n/a | $104.52 | $500.71 |
| 17999 | HCPCS | facility | HC SKIN TISSUE PROCEDURE | $552.31 | $240.45 | $311.86 | 2.30 | 5 | 1 | $387.0 | $270.9 | $240.45 | $552.31 |
| 58999 | HCPCS | facility | Genital surgery procedure | $552.31 | $242.29 | $310.02 | 2.28 | 5 | 1 | n/a | n/a | $242.29 | $552.31 |
| 59899 | HCPCS | facility | HC UNLISTED PROCEDURE MATERNITY CARE AND DELIVERY | $552.31 | $242.29 | $310.02 | 2.28 | 5 | 1 | $647.0 | $452.9 | $242.29 | $552.31 |
| 0449T | HCPCS | facility | Insj aqueous drain dev 1st | $6684.23 | $6377.3 | $306.93 | 1.05 | 10 | 1 | n/a | n/a | $3417.32 | $9619.86 |
| 15999 | HCPCS | facility | Removal of pressure sore | $1151.97 | $848.66 | $303.31 | 1.36 | 5 | 1 | n/a | n/a | $848.66 | $1151.97 |
| 47399 | HCPCS | facility | HC UNLISTED PROCEDURE, LIVER | $1151.97 | $848.66 | $303.31 | 1.36 | 5 | 1 | $1362.0 | $953.4 | $848.66 | $1151.97 |
| 48999 | HCPCS | facility | Pancreas surgery procedure | $1151.97 | $848.66 | $303.31 | 1.36 | 5 | 1 | n/a | n/a | $848.66 | $1151.97 |
| 45005 | HCPCS | facility | Drainage of rectal abscess | $1729.33 | $1434.11 | $295.22 | 1.21 | 11 | 1 | n/a | n/a | $1120.45 | $4303.61 |
| 46040 | HCPCS | facility | HC I&D RECTAL ABSCESS | $1729.33 | $1434.11 | $295.22 | 1.21 | 11 | 1 | $3164.0 | $2214.8 | $1120.45 | $6735.22 |
| 46320 | HCPCS | facility | HC REMOVE HEMORRHOID CLOT | $1729.33 | $1434.11 | $295.22 | 1.21 | 11 | 1 | $3799.0 | $2659.3 | $1120.45 | $4303.61 |
| 46505 | HCPCS | facility | Chemodenervation anal musc | $1729.33 | $1434.11 | $295.22 | 1.21 | 11 | 1 | n/a | n/a | $1120.45 | $4303.61 |
| 45393 | HCPCS | facility | Colonoscopy w/decompression | $1727.73 | $1434.11 | $293.62 | 1.20 | 11 | 1 | n/a | n/a | $691.32 | $2605.47 |
| 45905 | HCPCS | facility | Dilation of anal sphincter | $1727.73 | $1434.11 | $293.62 | 1.20 | 11 | 1 | n/a | n/a | $1120.45 | $1805.48 |
| 45910 | HCPCS | facility | Dilation of rectal narrowing | $1727.73 | $1434.11 | $293.62 | 1.20 | 11 | 1 | n/a | n/a | $1120.45 | $1805.48 |
| 45915 | HCPCS | facility | HC REMOVAL RECTAL OBSTRUCTION | $1727.73 | $1434.11 | $293.62 | 1.20 | 11 | 1 | $1866.0 | $1306.2 | $1120.45 | $1805.48 |
| 46220 | HCPCS | facility | Excise anal ext tag/papilla | $1727.73 | $1434.11 | $293.62 | 1.20 | 11 | 1 | n/a | n/a | $1120.45 | $1805.48 |
| 49442 | HCPCS | facility | HC INSERT CECOSTOMY/OTHER COLONIC TUBE, PERCUT, FLOURO GUID INCL CONT | $1727.73 | $1434.11 | $293.62 | 1.20 | 11 | 1 | $2226.0 | $1558.2 | $1120.45 | $1805.48 |
| 0707T | HCPCS | facility | Njx b1 sub mtrl sbchdrl dfct | $4210.95 | $3921.32 | $289.63 | 1.07 | 8 | 1 | n/a | n/a | $2892.28 | $4303.61 |
| 21620 | HCPCS | facility | Partial removal of sternum | $4210.95 | $3921.32 | $289.63 | 1.07 | 8 | 1 | n/a | n/a | $541.75 | $4303.61 |
| 26992 | HCPCS | facility | Drainage of bone lesion | $4210.95 | $3921.32 | $289.63 | 1.07 | 8 | 1 | n/a | n/a | $1028.26 | $4303.61 |
| 27185 | HCPCS | facility | Revision of femur epiphysis | $4210.95 | $3921.32 | $289.63 | 1.07 | 8 | 1 | n/a | n/a | $635.09 | $4303.61 |
| 27303 | HCPCS | facility | Drainage of bone lesion | $4210.95 | $3921.32 | $289.63 | 1.07 | 8 | 1 | n/a | n/a | $683.76 | $4303.61 |
| 55880 | HCPCS | facility | Abltj mal prst8 tiss hifu | $11633.185 | $11345.06 | $288.125 | 1.03 | 8 | 1 | n/a | n/a | $4413.9 | $11889.17 |
| A9591 | HCPCS | facility | Fluoroestradiol f 18 | $748.0 | $460.42 | $287.58 | 1.62 | 8 | 1 | n/a | n/a | $460.42 | $784.55 |
| 86890 | HCPCS | facility | Autologous blood process | $487.87 | $204.18 | $283.69 | 2.39 | 7 | 1 | $913.0 | $639.1 | $34.3 | $491.89 |
| 89251 | HCPCS | facility | Cultr oocyte/embryo <4 days | $487.87 | $204.18 | $283.69 | 2.39 | 7 | 1 | n/a | n/a | $60.45 | $491.89 |
| 15100 | HCPCS | facility | HC SKIN SPLT GRFT TRNK/ARM/LEG 100 SQ CM, OR 1% BODY AREA | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | $3999.0 | $2799.3 | $1510.07 | $4303.61 |
| 15130 | HCPCS | facility | Derm autograft trnk/arm/leg | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 15200 | HCPCS | facility | Skin full graft trunk | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 15610 | HCPCS | facility | Delay flap arms/legs | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15842 | HCPCS | facility | Nerve palsy microsurg graft | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15946 | HCPCS | facility | Remove hip pressure sore | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15952 | HCPCS | facility | Remove thigh pressure sore | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 20920 | HCPCS | facility | Removal of fascia for graft | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 20922 | HCPCS | facility | Removal of fascia for graft | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 23921 | HCPCS | facility | Amputation follow-up surgery | $2753.02 | $2472.73 | $280.29 | 1.11 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 89254 | HCPCS | facility | Oocyte identification | $482.82 | $204.18 | $278.64 | 2.36 | 7 | 1 | n/a | n/a | $60.45 | $486.79 |
| 89268 | HCPCS | facility | Insemination of oocytes | $482.82 | $204.18 | $278.64 | 2.36 | 7 | 1 | n/a | n/a | $60.45 | $486.79 |
| 89290 | HCPCS | facility | Biopsy oocyte polar body | $482.82 | $204.18 | $278.64 | 2.36 | 7 | 1 | n/a | n/a | $60.45 | $486.79 |
| 89291 | HCPCS | facility | Biopsy oocyte polar body | $482.82 | $204.18 | $278.64 | 2.36 | 7 | 1 | n/a | n/a | $60.45 | $486.79 |
| 89354 | HCPCS | facility | Thaw cryoprsvrd reprod tiss | $482.82 | $204.18 | $278.64 | 2.36 | 7 | 1 | n/a | n/a | $60.45 | $486.79 |
| 90611 | HCPCS | facility | Smallpox&monkeypox vac 0.5ml | $275.4 | $0.01 | $275.39 | 27540.00 | 9 | 1 | n/a | n/a | $0.01 | $324.0 |
| Q4237 | HCPCS | facility | cryo-cord, per sq cm | $424.47 | $149.14 | $275.33 | 2.85 | 3 | 1 | n/a | n/a | $149.14 | $424.47 |
| G0382 | HCPCS | facility | Lev 3 hosp type B ED visit | $480.36 | $206.0 | $274.36 | 2.33 | 7 | 1 | n/a | n/a | $187.15 | $484.31 |
| 89344 | HCPCS | facility | Storage/year reprod tissue | $475.92 | $204.18 | $271.74 | 2.33 | 7 | 1 | n/a | n/a | $60.45 | $479.85 |
| 54380 | HCPCS | facility | Repair penis | $2775.49 | $2505.21 | $270.28 | 1.11 | 11 | 1 | n/a | n/a | $1989.5 | $6735.22 |
| 54385 | HCPCS | facility | Repair penis | $2775.49 | $2505.21 | $270.28 | 1.11 | 11 | 1 | n/a | n/a | $1989.5 | $6735.22 |
| J7352 | HCPCS | facility | Afamelanotide implant, 1 mg | $3213.59 | $2943.42 | $270.17 | 1.09 | 13 | 1 | n/a | n/a | $2943.42 | $3591.66 |
| 21089 | HCPCS | facility | Prepare face/oral prosthesis | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 21299 | HCPCS | facility | Cranio/maxillofacial surgery | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 21499 | HCPCS | facility | Head surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 21899 | HCPCS | facility | Neck/chest surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 30999 | HCPCS | facility | HC NASAL SURGERY PROCEDURE | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | $160.0 | $112.0 | $283.85 | $552.31 |
| 31299 | HCPCS | facility | Sinus surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 31599 | HCPCS | facility | Larynx surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 40799 | HCPCS | facility | HC UNLISTED PROCEDURE, LIPS | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | $436.0 | $305.2 | $283.85 | $552.31 |
| 40899 | HCPCS | facility | Mouth surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 41599 | HCPCS | facility | HC UNLISTED PROCEDURE, TONGUE, FLOOR MOUTH | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | $494.0 | $345.8 | $283.85 | $552.31 |
| 41899 | HCPCS | facility | Dental surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | $684.0 | $478.8 | $283.85 | $552.31 |
| 42299 | HCPCS | facility | Palate/uvula surgery | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 42699 | HCPCS | facility | Salivary surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 42999 | HCPCS | facility | HC UNLISTED PROCEDURE; PHARYNX, ADENOIDS OR TONSILS | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | $636.0 | $445.2 | $283.85 | $552.31 |
| 69399 | HCPCS | facility | Outer ear surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 69799 | HCPCS | facility | Middle ear surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 69949 | HCPCS | facility | Inner ear surgery procedure | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 69979 | HCPCS | facility | Temporal bone surgery | $552.31 | $283.85 | $268.46 | 1.95 | 5 | 1 | n/a | n/a | $283.85 | $552.31 |
| 15002 | HCPCS | facility | HC PREP SITE TRUNK/ARM/LEG; 1ST 100 SQ CM OR 1% BODY AREA INFANT/CHILD | $1151.97 | $885.74 | $266.23 | 1.30 | 11 | 1 | $3999.0 | $2799.3 | $393.38 | $1771.32 |
| 88355 | HCPCS | facility | Analysis skeletal muscle | $468.43 | $204.18 | $264.25 | 2.29 | 7 | 1 | n/a | n/a | $38.1 | $472.29 |
| 65400 | HCPCS | facility | Removal of eye lesion | $1453.15 | $1194.71 | $258.44 | 1.22 | 11 | 1 | n/a | n/a | $923.18 | $1805.48 |
| 65772 | HCPCS | facility | Correction of astigmatism | $1453.15 | $1194.71 | $258.44 | 1.22 | 11 | 1 | n/a | n/a | $923.18 | $6735.22 |
| 65778 | HCPCS | facility | Cover eye w/membrane | $1453.15 | $1194.71 | $258.44 | 1.22 | 11 | 1 | n/a | n/a | $923.18 | $1805.48 |
| 89253 | HCPCS | facility | Embryo hatching | $462.46 | $204.18 | $258.28 | 2.26 | 7 | 1 | n/a | n/a | $60.45 | $466.27 |
| 11950 | HCPCS | facility | Tx contour defects 1 cc/< | $498.62 | $240.45 | $258.17 | 2.07 | 11 | 1 | n/a | n/a | $201.78 | $1151.97 |
| 23929 | HCPCS | facility | Shoulder surgery procedure | $552.31 | $295.62 | $256.69 | 1.87 | 5 | 1 | n/a | n/a | $295.62 | $552.31 |
| 24999 | HCPCS | facility | HC UNLISTED PROCEDURE HUMERUS/ELBOW | $552.31 | $295.62 | $256.69 | 1.87 | 5 | 1 | $510.0 | $357.0 | $295.62 | $552.31 |
| 25999 | HCPCS | facility | Forearm or wrist surgery | $552.31 | $295.62 | $256.69 | 1.87 | 5 | 1 | $226.0 | $158.2 | $295.62 | $552.31 |
| 26989 | HCPCS | facility | HC HAND/FINGER SURGERY | $552.31 | $295.62 | $256.69 | 1.87 | 5 | 1 | $226.0 | $158.2 | $295.62 | $552.31 |
| 27299 | HCPCS | facility | HC UNLISTED PROCEDURE, PELVIS OR HIP JOINT | $552.31 | $295.62 | $256.69 | 1.87 | 5 | 1 | $534.0 | $373.8 | $295.62 | $552.31 |
| 27599 | HCPCS | facility | Leg surgery procedure | $552.31 | $295.62 | $256.69 | 1.87 | 5 | 1 | n/a | n/a | $295.62 | $552.31 |
| 27899 | HCPCS | facility | HC LEG/ANKLE SURGERY PROCEDURE | $552.31 | $295.62 | $256.69 | 1.87 | 5 | 1 | $226.0 | $158.2 | $295.62 | $552.31 |
| 28899 | HCPCS | facility | Foot/toes surgery procedure | $552.31 | $295.62 | $256.69 | 1.87 | 5 | 1 | $512.0 | $358.4 | $295.62 | $552.31 |
| 77799 | HCPCS | facility | Radium/radioisotope therapy | $377.68 | $122.28 | $255.4 | 3.09 | 4 | 1 | n/a | n/a | $122.28 | $379.23 |
| 0232T | HCPCS | facility | Njx platelet plasma | $790.26 | $535.38 | $254.88 | 1.48 | 6 | 1 | n/a | n/a | $398.14 | $796.77 |
| 20802 | HCPCS | facility | Replantation arm complete | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 20805 | HCPCS | facility | Replant forearm complete | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 20808 | HCPCS | facility | Replantation hand complete | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 20838 | HCPCS | facility | Replantation foot complete | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22586 | HCPCS | facility | Prescrl fuse w/ instr l5-s1 | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22800 | HCPCS | facility | Post fusion <=6 vert seg | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22802 | HCPCS | facility | Post fusion 7-12 vert seg | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22804 | HCPCS | facility | Post fusion 13/> vert seg | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22808 | HCPCS | facility | Ant fusion 2-3 vert seg | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22810 | HCPCS | facility | Ant fusion 4-7 vert seg | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22812 | HCPCS | facility | Ant fusion 8/> vert seg | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22818 | HCPCS | facility | Kyphectomy 1-2 segments | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22819 | HCPCS | facility | Kyphectomy 3 or more | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22857 | HCPCS | facility | Lumbar Artif Diskectomy | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 22862 | HCPCS | facility | Revise Lumbar Artif Disc | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 27295 | HCPCS | facility | Amputation of leg at hip | $21267.94 | $21013.36 | $254.58 | 1.01 | 6 | 1 | n/a | n/a | $19805.99 | $21267.94 |
| 0419T | HCPCS | facility | Dstrj neurofibroma xtnsv | $1139.97 | $885.74 | $254.23 | 1.29 | 10 | 1 | n/a | n/a | $452.91 | $1805.48 |
| 0420T | HCPCS | facility | Dstrj neurofibroma xtnsv | $1139.97 | $885.74 | $254.23 | 1.29 | 10 | 1 | n/a | n/a | $452.91 | $1805.48 |
| 77299 | HCPCS | facility | Radiation therapy planning | $414.65 | $161.08 | $253.57 | 2.57 | 4 | 1 | n/a | n/a | $161.08 | $416.35 |
| 77399 | HCPCS | facility | External radiation dosimetry | $414.65 | $161.08 | $253.57 | 2.57 | 4 | 1 | n/a | n/a | $161.08 | $416.35 |
| 53899 | HCPCS | facility | HC UNLISTED PROCEDURE, URINARY SYSTEM | $552.31 | $299.43 | $252.88 | 1.84 | 5 | 1 | $738.0 | $516.6 | $299.43 | $552.31 |
| 55899 | HCPCS | facility | Genital surgery procedure | $552.31 | $299.43 | $252.88 | 1.84 | 5 | 1 | n/a | n/a | $299.43 | $552.31 |
| 86960 | HCPCS | facility | Vol reduction of blood/prod | $456.09 | $204.18 | $251.91 | 2.23 | 7 | 1 | n/a | n/a | $17.96 | $459.85 |
| 70558 | HCPCS | facility | Mri brain w/dye | $454.56 | $210.21 | $244.35 | 2.16 | 10 | 1 | n/a | n/a | $210.21 | $636.63 |
| 62324 | HCPCS | facility | HC INJ W/CATH INTR CRV/THC,W/O IM | $1301.185 | $1059.99 | $241.195 | 1.23 | 10 | 1 | $2837.0 | $1985.9 | $565.75 | $1805.48 |
| 62325 | HCPCS | facility | HC INJ W/CATH INTR CRV/THC, W/IM | $1301.185 | $1059.99 | $241.195 | 1.23 | 10 | 1 | $2315.0 | $1620.5 | $638.66 | $1805.48 |
| 62326 | HCPCS | facility | HC INJ W/CATH INTR LMB/SAC,W/O IM | $1301.185 | $1059.99 | $241.195 | 1.23 | 10 | 1 | $3700.5 | $2590.35 | $856.68 | $1805.48 |
| 62327 | HCPCS | facility | HC INJ W/CATH INTR LMB/SAC, W/IM | $1301.185 | $1059.99 | $241.195 | 1.23 | 10 | 1 | $2315.0 | $1620.5 | $638.66 | $1805.48 |
| A9595 | HCPCS | facility | Piflu f-18, dia 1 millicurie | $587.525 | $346.49 | $241.035 | 1.70 | 12 | 1 | n/a | n/a | $346.49 | $627.36 |
| 53454 | HCPCS | facility | Tprnl balo cntnc dev adjmt | $540.415 | $299.43 | $240.985 | 1.80 | 8 | 1 | n/a | n/a | $271.77 | $552.31 |
| 41530 | HCPCS | facility | Tongue base vol reduction | $4210.95 | $3973.4 | $237.55 | 1.06 | 8 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| Q4267 | HCPCS | facility | Neostim dl per sq cm | $380.43 | $149.14 | $231.29 | 2.55 | 8 | 1 | n/a | n/a | $149.14 | $783.75 |
| Q4264 | HCPCS | facility | Cocoon membrane, per sq cm | $372.89 | $149.14 | $223.75 | 2.50 | 3 | 1 | n/a | n/a | $149.14 | $372.89 |
| 94669 | HCPCS | facility | Mechanical chest wall oscill | $484.81 | $262.43 | $222.38 | 1.85 | 7 | 1 | n/a | n/a | $35.09 | $488.8 |
| 91299 | HCPCS | facility | Gastroenterology procedure | $374.175 | $154.21 | $219.965 | 2.43 | 4 | 1 | n/a | n/a | $154.21 | $375.71 |
| 93799 | HCPCS | facility | Cardiovascular procedure | $374.175 | $154.21 | $219.965 | 2.43 | 4 | 1 | $458.0 | $320.6 | $154.21 | $375.71 |
| 94799 | HCPCS | facility | HC ADMIN OF NITRIC OXIDE, PER HR | $374.175 | $154.21 | $219.965 | 2.43 | 4 | 1 | $296.0 | $207.2 | $154.21 | $375.71 |
| 95999 | HCPCS | facility | Neurological procedure | $374.175 | $154.21 | $219.965 | 2.43 | 4 | 1 | n/a | n/a | $154.21 | $375.71 |
| 96999 | HCPCS | facility | Dermatological procedure | $460.35 | $240.45 | $219.9 | 1.91 | 4 | 1 | n/a | n/a | $240.45 | $462.24 |
| 21630 | HCPCS | facility | Extensive sternum surgery | $8915.56 | $8696.19 | $219.37 | 1.03 | 6 | 1 | n/a | n/a | $8196.53 | $8915.56 |
| 22010 | HCPCS | facility | I&d p-spine c/t/cerv-thor | $8915.56 | $8696.19 | $219.37 | 1.03 | 7 | 1 | n/a | n/a | $1655.21 | $8915.56 |
| 22220 | HCPCS | facility | Incis w/discectomy cervical | $8915.56 | $8696.19 | $219.37 | 1.03 | 7 | 1 | n/a | n/a | $2793.55 | $8915.56 |
| 27140 | HCPCS | facility | Transplant femur ridge | $8915.56 | $8696.19 | $219.37 | 1.03 | 6 | 1 | n/a | n/a | $8196.53 | $8915.56 |
| 27146 | HCPCS | facility | Incision of hip bone | $8915.56 | $8696.19 | $219.37 | 1.03 | 6 | 1 | n/a | n/a | $8196.53 | $8915.56 |
| 27147 | HCPCS | facility | Revision of hip bone | $8915.56 | $8696.19 | $219.37 | 1.03 | 6 | 1 | n/a | n/a | $8196.53 | $8915.56 |
| 27161 | HCPCS | facility | Incision of neck of femur | $8915.56 | $8696.19 | $219.37 | 1.03 | 7 | 1 | n/a | n/a | $2082.37 | $8915.56 |
| 27472 | HCPCS | facility | Repair/graft of thigh | $8915.56 | $8696.19 | $219.37 | 1.03 | 7 | 1 | n/a | n/a | $2165.66 | $8915.56 |
| 27556 | HCPCS | facility | Treat knee dislocation | $8915.56 | $8696.19 | $219.37 | 1.03 | 6 | 1 | n/a | n/a | $8196.53 | $8915.56 |
| 27557 | HCPCS | facility | Treat knee dislocation | $8915.56 | $8696.19 | $219.37 | 1.03 | 6 | 1 | n/a | n/a | $8196.53 | $8915.56 |
| 27558 | HCPCS | facility | Treat knee dislocation | $8915.56 | $8696.19 | $219.37 | 1.03 | 7 | 1 | n/a | n/a | $7348.45 | $8915.56 |
| 69717 | HCPCS | facility | Temple Bone Implant Revision | $8915.56 | $8696.19 | $219.37 | 1.03 | 11 | 1 | n/a | n/a | $6517.81 | $11852.69 |
| 97610 | HCPCS | facility | HC LOW FREQUENCY NON-THERMAL US | $459.81 | $240.45 | $219.36 | 1.91 | 7 | 1 | $411.0 | $287.7 | $71.54 | $463.6 |
| 93702 | HCPCS | facility | Bis xtracell fluid analysis | $372.64 | $154.21 | $218.43 | 2.42 | 7 | 1 | n/a | n/a | $66.52 | $375.71 |
| 94775 | HCPCS | facility | Ped home apnea rec hk-up | $372.64 | $154.21 | $218.43 | 2.42 | 7 | 1 | n/a | n/a | $66.52 | $375.71 |
| 94776 | HCPCS | facility | Ped home apnea rec downld | $372.64 | $154.21 | $218.43 | 2.42 | 7 | 1 | n/a | n/a | $66.52 | $375.71 |
| 95981 | HCPCS | facility | Io anal gast n-stim subsq | $286.84 | $70.7 | $216.14 | 4.06 | 7 | 1 | n/a | n/a | $70.7 | $289.2 |
| A9593 | HCPCS | facility | Gallium ga-68 psma-11 ucsf | $765.84 | $550.13 | $215.71 | 1.39 | 9 | 1 | n/a | n/a | $550.13 | $793.42 |
| 64834 | HCPCS | facility | Repair of hand or foot nerve | $4303.61 | $4094.07 | $209.54 | 1.05 | 11 | 1 | n/a | n/a | $2481.58 | $5221.55 |
| 64857 | HCPCS | facility | Repair arm/leg nerve | $4303.61 | $4094.07 | $209.54 | 1.05 | 11 | 1 | n/a | n/a | $2481.58 | $5221.55 |
| 64893 | HCPCS | facility | Nerve graft arm/leg >4 cm | $4303.61 | $4094.07 | $209.54 | 1.05 | 11 | 1 | n/a | n/a | $2481.58 | $5221.55 |
| Q4173 | HCPCS | facility | Palingen or palingen xplus | $356.55 | $149.14 | $207.41 | 2.39 | 6 | 1 | n/a | n/a | $149.14 | $402.51 |
| Q4254 | HCPCS | facility | Novafix dl per sq cm | $355.88 | $149.14 | $206.74 | 2.39 | 3 | 1 | n/a | n/a | $149.14 | $355.88 |
| A9588 | HCPCS | facility | Fluciclovine f-18 | $526.98 | $322.27 | $204.71 | 1.64 | 9 | 1 | n/a | n/a | $322.27 | $625.97 |
| Q4184 | HCPCS | facility | Cellesta, 1 sq cm | $352.19 | $149.14 | $203.05 | 2.36 | 6 | 1 | n/a | n/a | $80.04 | $624.34 |
| 34421 | HCPCS | facility | Removal of vein clot | $3984.43 | $3784.07 | $200.36 | 1.05 | 11 | 1 | n/a | n/a | $3020.73 | $4303.61 |
| 34490 | HCPCS | facility | Removal of vein clot | $3984.43 | $3784.07 | $200.36 | 1.05 | 11 | 1 | n/a | n/a | $3020.73 | $6735.22 |
| 34530 | HCPCS | facility | Leg vein fusion | $3984.43 | $3784.07 | $200.36 | 1.05 | 11 | 1 | n/a | n/a | $3020.73 | $6735.22 |
| 35207 | HCPCS | facility | HC REPAIR BLOOD VESSEL | $3984.43 | $3784.07 | $200.36 | 1.05 | 11 | 1 | $5390.0 | $3773.0 | $3020.73 | $6735.22 |
| 36821 | HCPCS | facility | Av fusion direct any site | $3984.43 | $3784.07 | $200.36 | 1.05 | 11 | 1 | n/a | n/a | $3020.73 | $6735.22 |
| 37188 | HCPCS | facility | HC PERCUT TRANSLUM MECH THROMB, VEIN,INCL FLUORO THROM, REP/SUBS DAY | $3984.43 | $3784.07 | $200.36 | 1.05 | 11 | 1 | $5923.0 | $4146.1 | $3020.73 | $8915.56 |
| P9052 | HCPCS | facility | Platelets, hla-m, l/r, unit | $907.26 | $708.06 | $199.2 | 1.28 | 9 | 1 | n/a | n/a | $708.06 | $925.16 |
| 20150 | HCPCS | facility | Excise epiphyseal bar | $4118.29 | $3921.32 | $196.97 | 1.05 | 11 | 1 | n/a | n/a | $2999.94 | $4605.66 |
| 25394 | HCPCS | facility | Repair carpal bone shorten | $4118.29 | $3921.32 | $196.97 | 1.05 | 11 | 1 | n/a | n/a | $2999.94 | $4605.66 |
| 27202 | HCPCS | facility | Treat tail bone fracture | $4118.29 | $3921.32 | $196.97 | 1.05 | 11 | 1 | n/a | n/a | $2999.94 | $5023.62 |
| 27742 | HCPCS | facility | Repair of leg epiphyses | $4118.29 | $3921.32 | $196.97 | 1.05 | 11 | 1 | n/a | n/a | $2999.94 | $4605.66 |
| 29891 | HCPCS | facility | Ankle arthroscopy/surgery | $4118.29 | $3921.32 | $196.97 | 1.05 | 11 | 1 | n/a | n/a | $2999.94 | $5187.05 |
| Q4217 | HCPCS | facility | Woundfix biowound plus xplus | $345.29 | $149.14 | $196.15 | 2.32 | 6 | 1 | n/a | n/a | $149.14 | $573.0 |
| 64999 | HCPCS | facility | HC UNLISTED PROCEDURE, NERVOUS SYSTEM | $552.31 | $367.87 | $184.44 | 1.50 | 5 | 1 | $685.0 | $479.5 | $367.87 | $552.31 |
| 92523 | HCPCS | facility | HC LANG COMPREHENSION/EXPRESSION EVAL | $434.64 | $250.67 | $183.97 | 1.73 | 10 | 1 | $991.0 | $693.7 | $250.67 | $940.01 |
| Q2043 | HCPCS | facility | Sipuleucel-t auto cd54+ | $55453.13 | $55272.32 | $180.81 | 1.00 | 13 | 1 | n/a | n/a | $49649.41 | $55945.97 |
| 10081 | HCPCS | facility | Drainage of pilonidal cyst | $1028.58 | $848.66 | $179.92 | 1.21 | 11 | 1 | $1024.0 | $716.8 | $662.51 | $1805.48 |
| 29799 | HCPCS | facility | Casting/strapping procedure | $374.405 | $194.75 | $179.655 | 1.92 | 4 | 1 | $342.0 | $239.4 | $194.75 | $375.94 |
| Q4234 | HCPCS | facility | Xcellerate, per sq cm | $326.335 | $149.14 | $177.195 | 2.19 | 6 | 1 | n/a | n/a | $149.14 | $546.81 |
| G0104 | HCPCS | facility | CA screen;flexi sigmoidscope | $1289.775 | $1114.51 | $175.265 | 1.16 | 10 | 1 | n/a | n/a | $415.08 | $1805.48 |
| J0752 | HCPCS | facility | Hiv prep, oral lenacapavir | $623.15 | $449.03 | $174.12 | 1.39 | 2 | 1 | n/a | n/a | $449.03 | $623.15 |
| 77046 | HCPCS | facility | HC MRI BREAST, WITHOUT CONTRAST, UNILATERAL | $454.56 | $285.95 | $168.61 | 1.59 | 10 | 1 | $2829.0 | $1980.3 | $263.66 | $716.22 |
| 77047 | HCPCS | facility | HC MRI BREAST, WITHOUT CONTRAST, BILATERAL | $454.56 | $285.95 | $168.61 | 1.59 | 10 | 1 | $5080.0 | $3556.0 | $263.66 | $716.22 |
| 76498 | HCPCS | facility | HC UNLISTED MRI PROCEDURE | $270.28 | $104.29 | $165.99 | 2.59 | 7 | 1 | $692.0 | $484.4 | $104.29 | $338.49 |
| 92611 | HCPCS | facility | HC FLURO SWALLOW EVAL, VIDEO | $267.65 | $102.07 | $165.58 | 2.62 | 10 | 1 | $650.0 | $455.0 | $102.07 | $430.08 |
| 0779T | HCPCS | facility | Gi myoelectrical actv study | $612.33 | $447.21 | $165.12 | 1.37 | 7 | 1 | n/a | n/a | $447.21 | $617.41 |
| 77090 | HCPCS | facility | Tbs techl prep&transmis data | $268.07 | $104.29 | $163.78 | 2.57 | 7 | 1 | n/a | n/a | $82.61 | $270.28 |
| 77091 | HCPCS | facility | Tbs techl calculation only | $268.07 | $104.29 | $163.78 | 2.57 | 7 | 1 | n/a | n/a | $82.61 | $270.28 |
| Q4278 | HCPCS | facility | Epieffect, per sq cm | $312.79 | $149.14 | $163.65 | 2.10 | 8 | 1 | n/a | n/a | $149.14 | $570.0 |
| J1748 | HCPCS | facility | Inj, zymfentra, 10 mg | $262.69 | $99.76 | $162.93 | 2.63 | 8 | 1 | n/a | n/a | $99.76 | $305.35 |
| Q4208 | HCPCS | facility | Novafix per sq cm | $310.875 | $149.14 | $161.735 | 2.08 | 6 | 1 | n/a | n/a | $149.14 | $408.0 |
| 76496 | HCPCS | facility | Fluoroscopic procedure | $265.8 | $104.29 | $161.51 | 2.55 | 7 | 1 | $150.0 | $105.0 | $104.29 | $267.99 |
| 38214 | HCPCS | facility | Volume deplete of harvest | $689.27 | $528.72 | $160.55 | 1.30 | 11 | 1 | n/a | n/a | $435.79 | $1151.97 |
| 38215 | HCPCS | facility | Harvest stem cell concentrte | $689.27 | $528.72 | $160.55 | 1.30 | 11 | 1 | n/a | n/a | $435.79 | $1151.97 |
| 76999 | HCPCS | facility | Echo examination procedure | $263.2 | $104.29 | $158.91 | 2.52 | 4 | 1 | n/a | n/a | $104.29 | $264.28 |
| 31240 | HCPCS | facility | Nasal/sinus endoscopy surg | $2290.18 | $2133.11 | $157.07 | 1.07 | 11 | 1 | n/a | n/a | $1565.86 | $4303.61 |
| 76499 | HCPCS | facility | Radiographic procedure | $260.205 | $104.29 | $155.915 | 2.50 | 4 | 1 | n/a | n/a | $104.29 | $261.27 |
| 76497 | HCPCS | facility | Ct procedure | $259.14 | $104.29 | $154.85 | 2.48 | 7 | 1 | $272.0 | $190.4 | $98.87 | $261.27 |
| 92616 | HCPCS | facility | Fees w/laryngeal sense test | $235.59 | $81.2 | $154.39 | 2.90 | 10 | 1 | n/a | n/a | $81.2 | $610.93 |
| 99487 | HCPCS | facility | Cmplx chron care w/o pt vsit | $366.735 | $212.72 | $154.015 | 1.72 | 4 | 1 | n/a | n/a | $212.72 | $368.24 |
| G0381 | HCPCS | facility | Lev 2 hosp type B ED visit | $264.62 | $111.32 | $153.3 | 2.38 | 7 | 1 | n/a | n/a | $106.17 | $266.8 |
| 99463 | HCPCS | facility | Same day nb discharge | $309.29 | $159.56 | $149.73 | 1.94 | 4 | 1 | n/a | n/a | $159.56 | $310.56 |
| G0245 | HCPCS | facility | Initial foot exam pt lops | $309.29 | $159.56 | $149.73 | 1.94 | 4 | 1 | n/a | n/a | $159.56 | $310.56 |
| G0246 | HCPCS | facility | Followup eval of foot pt lop | $309.29 | $159.56 | $149.73 | 1.94 | 4 | 1 | n/a | n/a | $159.56 | $310.56 |
| 99495 | HCPCS | facility | Trans care mgmt 14 day disch | $308.02 | $159.56 | $148.46 | 1.93 | 7 | 1 | n/a | n/a | $132.48 | $310.56 |
| 99496 | HCPCS | facility | Trans care mgmt 7 day disch | $308.02 | $159.56 | $148.46 | 1.93 | 7 | 1 | n/a | n/a | $132.48 | $310.56 |
| Q4272 | HCPCS | facility | Esano a, per sq cm | $297.5 | $149.14 | $148.36 | 1.99 | 5 | 1 | n/a | n/a | $149.14 | $332.5 |
| 44100 | HCPCS | facility | Biopsy of bowel | $1233.79 | $1086.97 | $146.82 | 1.14 | 11 | 1 | n/a | n/a | $870.88 | $1805.48 |
| 62322 | HCPCS | facility | HC INJ INTERLAMIN LMBR/SAC,W/O IM | $1206.25 | $1059.99 | $146.26 | 1.14 | 10 | 1 | $2315.0 | $1620.5 | $565.75 | $1805.48 |
| 21010 | HCPCS | facility | Incision of jaw joint | $4118.29 | $3973.4 | $144.89 | 1.04 | 11 | 1 | n/a | n/a | $2551.58 | $4341.44 |
| 41520 | HCPCS | facility | Reconstruction tongue fold | $4118.29 | $3973.4 | $144.89 | 1.04 | 11 | 1 | n/a | n/a | $1799.78 | $4341.44 |
| 95705 | HCPCS | facility | Eeg w/o vid 2-12 hr unmntr | $403.07 | $258.77 | $144.3 | 1.56 | 10 | 1 | $597.0 | $417.9 | $258.77 | $583.17 |
| 95706 | HCPCS | facility | Eeg wo vid 2-12hr intmt mntr | $403.07 | $258.77 | $144.3 | 1.56 | 10 | 1 | $616.0 | $431.2 | $258.77 | $721.29 |
| 95707 | HCPCS | facility | Eeg w/o vid 2-12hr cont mntr | $403.07 | $258.77 | $144.3 | 1.56 | 10 | 1 | n/a | n/a | $258.77 | $721.29 |
| 95711 | HCPCS | facility | Veeg 2-12 hr unmonitored | $403.07 | $258.77 | $144.3 | 1.56 | 10 | 1 | n/a | n/a | $258.77 | $721.29 |
| 92228 | HCPCS | facility | Remote retinal imaging mgmt | $188.19 | $44.76 | $143.43 | 4.20 | 10 | 1 | n/a | n/a | $23.43 | $398.14 |
| 67141 | HCPCS | facility | Treatment of retina | $523.19 | $380.39 | $142.8 | 1.38 | 11 | 1 | n/a | n/a | $324.22 | $1151.97 |
| 67208 | HCPCS | facility | Treatment of retinal lesion | $523.19 | $380.39 | $142.8 | 1.38 | 11 | 1 | n/a | n/a | $324.22 | $1151.97 |
| 21813 | HCPCS | facility | Treatment of rib fracture | $2068.83 | $1927.09 | $141.74 | 1.07 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| 38531 | HCPCS | facility | Open bx/exc inguinofem nodes | $4832.73 | $4692.44 | $140.29 | 1.03 | 10 | 1 | n/a | n/a | $2816.01 | $6735.22 |
| 55874 | HCPCS | facility | Tprnl plmt biodegrdabl matrl | $6564.68 | $6425.83 | $138.85 | 1.02 | 10 | 1 | n/a | n/a | $2541.49 | $8915.56 |
| G0420 | HCPCS | facility | Ed svc CKD ind per session | $261.68 | $123.44 | $138.24 | 2.12 | 7 | 1 | n/a | n/a | $123.44 | $462.9 |
| 92325 | HCPCS | facility | Modification of contact lens | $296.73 | $159.45 | $137.28 | 1.86 | 7 | 1 | n/a | n/a | $74.07 | $299.18 |
| 92549 | HCPCS | facility | Cdp-sot 6 cond w/i&r mct&adt | $296.73 | $159.45 | $137.28 | 1.86 | 7 | 1 | n/a | n/a | $109.02 | $299.18 |
| 93701 | HCPCS | facility | Bioimpedance cv analysis | $296.73 | $159.45 | $137.28 | 1.86 | 7 | 1 | n/a | n/a | $26.67 | $299.18 |
| 95060 | HCPCS | facility | Eye allergy tests | $296.73 | $159.45 | $137.28 | 1.86 | 7 | 1 | n/a | n/a | $95.18 | $299.18 |
| G0166 | HCPCS | facility | Extrnl counterpulse, per tx | $296.73 | $159.45 | $137.28 | 1.86 | 7 | 1 | n/a | n/a | $99.49 | $299.18 |
| 15950 | HCPCS | facility | Remove thigh pressure sore | $2114.93 | $1979.35 | $135.58 | 1.07 | 11 | 1 | n/a | n/a | $1572.96 | $6735.22 |
| 21925 | HCPCS | facility | Biopsy soft tissue of back | $2114.93 | $1979.35 | $135.58 | 1.07 | 11 | 1 | n/a | n/a | $1572.96 | $4303.61 |
| 21931 | HCPCS | facility | Exc back les sc 3 cm/> | $2114.93 | $1979.35 | $135.58 | 1.07 | 11 | 1 | n/a | n/a | $1572.96 | $6735.22 |
| 23071 | HCPCS | facility | Exc shoulder les sc 3 cm/> | $2114.93 | $1979.35 | $135.58 | 1.07 | 11 | 1 | n/a | n/a | $1572.96 | $6735.22 |
| 25071 | HCPCS | facility | Exc forearm les sc 3 cm/> | $2114.93 | $1979.35 | $135.58 | 1.07 | 11 | 1 | n/a | n/a | $1572.96 | $6735.22 |
| 26111 | HCPCS | facility | Exc hand les sc 1.5 cm/> | $2114.93 | $1979.35 | $135.58 | 1.07 | 11 | 1 | n/a | n/a | $1572.96 | $6735.22 |
| 26113 | HCPCS | facility | Exc hand tum deep 1.5 cm/> | $2114.93 | $1979.35 | $135.58 | 1.07 | 11 | 1 | n/a | n/a | $1572.96 | $6735.22 |
| 27327 | HCPCS | facility | Exc thigh/knee les sc < 3 cm | $2114.93 | $1979.35 | $135.58 | 1.07 | 11 | 1 | n/a | n/a | $1572.96 | $4303.61 |
| 94728 | HCPCS | facility | Pulm funct test oscillometry | $288.53 | $154.21 | $134.32 | 1.87 | 10 | 1 | n/a | n/a | $45.06 | $711.49 |
| P9039 | HCPCS | facility | HC RED BLOOD CELLS, DEGLYCEROLIZED, EA UNIT | $447.27 | $313.0 | $134.27 | 1.43 | 7 | 1 | $846.0 | $592.2 | $313.0 | $479.74 |
| 59001 | HCPCS | facility | Amniocentesis therapeutic | $498.11 | $365.2 | $132.91 | 1.36 | 11 | 1 | $576.0 | $403.2 | $230.7 | $1805.48 |
| 70543 | HCPCS | facility | HC MRI;ORB/FACE/NECK, W/O & W DYE | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $6245.0 | $4371.5 | $418.11 | $1150.04 |
| 70546 | HCPCS | facility | HC MRA, HEAD W/O & W CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $6245.0 | $4371.5 | $418.11 | $1150.04 |
| 70549 | HCPCS | facility | HC MRA; NECK W/O & W CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $3220.0 | $2254.0 | $418.11 | $1150.04 |
| 70553 | HCPCS | facility | HC MRI; BRAIN WITH & W/O CONTR | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $6769.0 | $4738.3 | $418.11 | $1150.04 |
| 71552 | HCPCS | facility | HC MRI; CHEST W/O & W/CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $5948.0 | $4163.6 | $418.11 | $1150.04 |
| 72156 | HCPCS | facility | HC MRI, CERVICAL SPINE, W/ & W/O CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $5728.0 | $4009.6 | $418.11 | $1150.04 |
| 72157 | HCPCS | facility | HC MRI, THORACIC SPINE, W/ & W/O CONTRAST+S6061 | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $6769.0 | $4738.3 | $418.11 | $1150.04 |
| 72158 | HCPCS | facility | HC MRI, LUMBAR SPINE, W & W/O CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $6245.0 | $4371.5 | $418.11 | $1150.04 |
| 72197 | HCPCS | facility | HC MRI; PELVIS W/O & W/CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $5948.0 | $4163.6 | $418.11 | $1150.04 |
| 73220 | HCPCS | facility | HC MRI, UPPER EXTR, NO JNT, W/ & W/O CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $3030.0 | $2121.0 | $418.11 | $1150.04 |
| 73223 | HCPCS | facility | HC MRI, UPPER EXTR, JOINT, W/O & W/ CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $5948.0 | $4163.6 | $418.11 | $1150.04 |
| 73720 | HCPCS | facility | HC MRI, LOWER EXTRM, NO JNT, W/O & W/ CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $3030.0 | $2121.0 | $418.11 | $1150.04 |
| 73723 | HCPCS | facility | HC MRI, LOWER EXTRM, JNTS, W/O & W/ CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $5948.0 | $4163.6 | $418.11 | $1150.04 |
| 74183 | HCPCS | facility | HC MRI, ABDOMEN WO/W CONTRAST | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | $5948.0 | $4163.6 | $418.11 | $1150.04 |
| 75561 | HCPCS | facility | Cardiac mri for morph w/dye | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8908 | HCPCS | facility | Mri w/o fol w/cont, breast, | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | n/a | n/a | $418.11 | $1150.04 |
| C8911 | HCPCS | facility | MRA w/o fol w/cont, chest | $549.47 | $418.11 | $131.36 | 1.31 | 10 | 1 | n/a | n/a | $418.11 | $1150.04 |
| D3425 | HCPCS | facility | Root surgery molar | $904.75 | $774.78 | $129.97 | 1.17 | 2 | 1 | n/a | n/a | $774.78 | $904.75 |
| G0398 | HCPCS | facility | Home sleep test/type 2 porta | $388.65 | $258.77 | $129.88 | 1.50 | 7 | 1 | n/a | n/a | $172.61 | $391.88 |
| G0399 | HCPCS | facility | Home sleep test/type 3 porta | $388.65 | $258.77 | $129.88 | 1.50 | 7 | 1 | n/a | n/a | $172.61 | $391.88 |
| G0400 | HCPCS | facility | Home sleep test/type 4 porta | $388.65 | $258.77 | $129.88 | 1.50 | 7 | 1 | n/a | n/a | $172.61 | $391.88 |
| 92597 | HCPCS | facility | HC VOICE PROSTH DEV EVAL, 60 MIN | $208.035 | $78.46 | $129.575 | 2.65 | 10 | 1 | $289.0 | $202.3 | $78.46 | $296.9 |
| 70496 | HCPCS | facility | Ct angiography head | $339.24 | $210.21 | $129.03 | 1.61 | 10 | 1 | $2243.0 | $1570.1 | $210.21 | $562.93 |
| 70498 | HCPCS | facility | Ct angiography neck | $339.24 | $210.21 | $129.03 | 1.61 | 10 | 1 | $3487.0 | $2440.9 | $210.21 | $562.93 |
| 71275 | HCPCS | facility | Ct angiography chest | $339.24 | $210.21 | $129.03 | 1.61 | 10 | 1 | $3697.0 | $2587.9 | $210.21 | $562.93 |
| 72191 | HCPCS | facility | Ct angiograph pelv w/o&w/dye | $339.24 | $210.21 | $129.03 | 1.61 | 10 | 1 | $4350.0 | $3045.0 | $210.21 | $562.93 |
| 73206 | HCPCS | facility | Ct angio upr extrm w/o&w/dye | $339.24 | $210.21 | $129.03 | 1.61 | 10 | 1 | $4350.0 | $3045.0 | $210.21 | $562.93 |
| 73706 | HCPCS | facility | Ct angio lwr extr w/o&w/dye | $339.24 | $210.21 | $129.03 | 1.61 | 10 | 1 | $4546.0 | $3182.2 | $210.21 | $562.93 |
| 74175 | HCPCS | facility | Ct angio abdom w/o & w/dye | $339.24 | $210.21 | $129.03 | 1.61 | 10 | 1 | $2742.0 | $1919.4 | $210.21 | $562.93 |
| 75635 | HCPCS | facility | Ct Angio Abdominal Arteries | $339.24 | $210.21 | $129.03 | 1.61 | 10 | 1 | $1892.0 | $1324.4 | $210.21 | $562.93 |
| 95056 | HCPCS | facility | Photosensitivity tests | $286.84 | $159.45 | $127.39 | 1.80 | 7 | 1 | n/a | n/a | $95.18 | $289.2 |
| 28011 | HCPCS | facility | HC TENOT'Y,PERCUT,TOE;MULT TENDON | $2050.64 | $1927.09 | $123.55 | 1.06 | 11 | 1 | $7820.0 | $5474.0 | $1501.88 | $4303.61 |
| 28024 | HCPCS | facility | Exploration of toe joint | $2050.64 | $1927.09 | $123.55 | 1.06 | 11 | 1 | $3411.0 | $2387.7 | $1501.88 | $4303.61 |
| 28080 | HCPCS | facility | Removal of foot lesion | $2050.64 | $1927.09 | $123.55 | 1.06 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 28090 | HCPCS | facility | Removal of foot lesion | $2050.64 | $1927.09 | $123.55 | 1.06 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 28092 | HCPCS | facility | Removal of toe lesions | $2050.64 | $1927.09 | $123.55 | 1.06 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 28175 | HCPCS | facility | Resect phalanx of toe tumor | $2050.64 | $1927.09 | $123.55 | 1.06 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 28261 | HCPCS | facility | Revision of foot tendon | $2050.64 | $1927.09 | $123.55 | 1.06 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 28345 | HCPCS | facility | Repair webbed toe(s) | $2050.64 | $1927.09 | $123.55 | 1.06 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| P9048 | HCPCS | facility | Plasmaprotein fract,5%,250ml | $156.26 | $35.32 | $120.94 | 4.42 | 7 | 1 | n/a | n/a | $35.32 | $157.55 |
| Q5127 | HCPCS | facility | Inj, stimufend, 0.5 mg | $305.66 | $184.91 | $120.75 | 1.65 | 12 | 1 | n/a | n/a | $147.24 | $374.48 |
| 70470 | HCPCS | facility | Ct head/brain w/o & w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $2997.0 | $2097.9 | $210.21 | $562.93 |
| 70482 | HCPCS | facility | Ct orbit/ear/fossa w/o&w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $2401.0 | $1680.7 | $210.21 | $562.93 |
| 70488 | HCPCS | facility | Ct maxillofacial w/o & w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $2401.0 | $1680.7 | $210.21 | $562.93 |
| 70492 | HCPCS | facility | Ct sft tsue nck w/o & w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $3375.0 | $2362.5 | $210.21 | $562.93 |
| 71270 | HCPCS | facility | Ct thorax w/o & w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $3845.0 | $2691.5 | $210.21 | $562.93 |
| 72127 | HCPCS | facility | Ct neck spine w/o & w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $3101.0 | $2170.7 | $210.21 | $562.93 |
| 72130 | HCPCS | facility | Ct chest spine w/o & w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $3263.0 | $2284.1 | $210.21 | $562.93 |
| 72133 | HCPCS | facility | Ct lumbar spine w/o & w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $3263.0 | $2284.1 | $210.21 | $562.93 |
| 72194 | HCPCS | facility | Ct pelvis w/o & w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $3744.0 | $2620.8 | $210.21 | $562.93 |
| 73202 | HCPCS | facility | Ct uppr extremity w/o&w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $3706.0 | $2594.2 | $210.21 | $562.93 |
| 73702 | HCPCS | facility | Ct lwr extremity w/o&w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $3706.0 | $2594.2 | $210.21 | $562.93 |
| 74170 | HCPCS | facility | Ct abdomen w/o & w/dye | $329.34 | $210.21 | $119.13 | 1.57 | 10 | 1 | $3715.0 | $2600.5 | $210.21 | $562.93 |
| 17281 | HCPCS | facility | Destruction of skin lesions | $359.17 | $240.45 | $118.72 | 1.49 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 17282 | HCPCS | facility | Destruction of skin lesions | $359.17 | $240.45 | $118.72 | 1.49 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 0689T | HCPCS | facility | Quan us tis charac w/o dx us | $221.09 | $104.29 | $116.8 | 2.12 | 7 | 1 | n/a | n/a | $82.61 | $222.91 |
| 92610 | HCPCS | facility | Evaluate swallowing function | $177.485 | $62.25 | $115.235 | 2.85 | 10 | 1 | $631.0 | $441.7 | $62.25 | $430.08 |
| J1742 | HCPCS | facility | Ibutilide fumarate injection | $287.46 | $172.31 | $115.15 | 1.67 | 10 | 1 | $276.52 | $193.56 | $172.31 | $347.15 |
| 92521 | HCPCS | facility | Evaluation of speech fluency | $252.54 | $137.48 | $115.06 | 1.84 | 10 | 1 | $811.0 | $567.7 | $137.48 | $515.55 |
| Q5128 | HCPCS | facility | Inj, cimerli, 0.1 mg | $201.01 | $86.16 | $114.85 | 2.33 | 12 | 1 | n/a | n/a | $83.34 | $292.77 |
| Q4159 | HCPCS | facility | Affinity1 square cm | $263.31 | $149.14 | $114.17 | 1.77 | 8 | 1 | $469.0 | $328.3 | $149.14 | $1203.34 |
| 86930 | HCPCS | facility | Frozen blood prep | $313.59 | $204.18 | $109.41 | 1.54 | 9 | 1 | n/a | n/a | $34.3 | $879.46 |
| 86931 | HCPCS | facility | Frozen blood thaw | $313.59 | $204.18 | $109.41 | 1.54 | 9 | 1 | n/a | n/a | $34.3 | $871.94 |
| 86971 | HCPCS | facility | HC ARC PRETREAT RBC ENZYMES, EA | $313.59 | $204.18 | $109.41 | 1.54 | 9 | 1 | $215.0 | $150.5 | $17.96 | $868.35 |
| 88121 | HCPCS | facility | Cytp urine 3-5 probes cmptr | $313.59 | $204.18 | $109.41 | 1.54 | 9 | 1 | n/a | n/a | $157.05 | $734.04 |
| 88346 | HCPCS | facility | HC IMMUNOFLUORESC INIT SINGL STAIN | $313.59 | $204.18 | $109.41 | 1.54 | 9 | 1 | $160.0 | $112.0 | $38.1 | $892.58 |
| 88358 | HCPCS | facility | Analysis tumor | $313.59 | $204.18 | $109.41 | 1.54 | 9 | 1 | n/a | n/a | $38.1 | $491.89 |
| 88366 | HCPCS | facility | HC IN SITU HYBRIDIZATION EA MULTIPLEX PROBE STAIN | $313.59 | $204.18 | $109.41 | 1.54 | 9 | 1 | $1229.0 | $860.3 | $38.1 | $870.33 |
| Q4137 | HCPCS | facility | Amnioexcel or biodexcel, 1cm | $257.04 | $149.14 | $107.9 | 1.72 | 2 | 1 | n/a | n/a | $149.14 | $257.04 |
| 92526 | HCPCS | facility | HC SWALLOW TREATMENT | $201.29 | $93.55 | $107.74 | 2.15 | 10 | 1 | $397.0 | $277.9 | $93.55 | $350.81 |
| 92612 | HCPCS | facility | Endoscopy swallow (fees) vid | $165.3 | $57.76 | $107.54 | 2.86 | 10 | 1 | $480.0 | $336.0 | $57.76 | $245.32 |
| 93307 | HCPCS | facility | Tte w/o doppler complete | $390.49 | $285.95 | $104.54 | 1.37 | 10 | 1 | n/a | n/a | $263.66 | $602.41 |
| P9055 | HCPCS | facility | Plt, aph/pher, l/r, cmv-neg | $354.62 | $250.49 | $104.13 | 1.42 | 7 | 1 | n/a | n/a | $250.49 | $357.57 |
| G0296 | HCPCS | facility | Visit to determ ldct elig | $225.45 | $121.75 | $103.7 | 1.85 | 7 | 1 | n/a | n/a | $87.36 | $227.3 |
| 22310 | HCPCS | facility | Closed tx vert fx w/o manj | $398.86 | $295.62 | $103.24 | 1.35 | 11 | 1 | n/a | n/a | $211.26 | $1805.48 |
| 23525 | HCPCS | facility | Treat clavicle dislocation | $398.86 | $295.62 | $103.24 | 1.35 | 11 | 1 | n/a | n/a | $211.26 | $1805.48 |
| 23545 | HCPCS | facility | Treat clavicle dislocation | $398.86 | $295.62 | $103.24 | 1.35 | 11 | 1 | n/a | n/a | $211.26 | $1805.48 |
| 26341 | HCPCS | facility | Manipulat palm cord post inj | $398.86 | $295.62 | $103.24 | 1.35 | 11 | 1 | n/a | n/a | $211.26 | $1151.97 |
| 27246 | HCPCS | facility | Treat thigh fracture | $398.86 | $295.62 | $103.24 | 1.35 | 11 | 1 | n/a | n/a | $211.26 | $1805.48 |
| 27500 | HCPCS | facility | Treatment of thigh fracture | $398.86 | $295.62 | $103.24 | 1.35 | 11 | 1 | n/a | n/a | $211.26 | $1805.48 |
| 54300 | HCPCS | facility | Revision of penis | $4327.73 | $4224.5 | $103.23 | 1.02 | 11 | 1 | n/a | n/a | $2775.49 | $6735.22 |
| 54304 | HCPCS | facility | Revision of penis | $4327.73 | $4224.5 | $103.23 | 1.02 | 11 | 1 | n/a | n/a | $2775.49 | $6735.22 |
| 54324 | HCPCS | facility | Reconstruction of urethra | $4327.73 | $4224.5 | $103.23 | 1.02 | 11 | 1 | n/a | n/a | $2775.49 | $6735.22 |
| 54328 | HCPCS | facility | Revise penis/urethra | $4327.73 | $4224.5 | $103.23 | 1.02 | 11 | 1 | n/a | n/a | $2775.49 | $6735.22 |
| 54360 | HCPCS | facility | Penis plastic surgery | $4327.73 | $4224.5 | $103.23 | 1.02 | 11 | 1 | n/a | n/a | $2775.49 | $6735.22 |
| Q5124 | HCPCS | facility | Inj. byooviz, 0.1 mg | $164.255 | $61.8 | $102.455 | 2.66 | 12 | 1 | n/a | n/a | $60.22 | $233.21 |
| 92607 | HCPCS | facility | Ex for speech device rx 1hr | $228.6 | $126.35 | $102.25 | 1.81 | 10 | 1 | n/a | n/a | $126.35 | $473.81 |
| 95801 | HCPCS | facility | Slp stdy unatnd w/anal | $172.61 | $70.7 | $101.91 | 2.44 | 10 | 1 | n/a | n/a | $70.7 | $299.18 |
| G0397 | HCPCS | facility | Alcohol/subs interv >30 min | $313.44 | $212.72 | $100.72 | 1.47 | 7 | 1 | n/a | n/a | $87.36 | $316.02 |
| Q4187 | HCPCS | facility | Epicord 1 sq cm | $244.9 | $149.14 | $95.76 | 1.64 | 9 | 1 | $555.0 | $388.5 | $149.14 | $280.82 |
| 97165 | HCPCS | facility | HC OT EVAL, LOW COMPLEX, 20 MIN | $199.62 | $103.88 | $95.74 | 1.92 | 10 | 1 | $309.0 | $216.3 | $98.75 | $389.55 |
| 97166 | HCPCS | facility | HC OT EVAL, MOD COMPLEX, 30 MIN | $199.345 | $103.88 | $95.465 | 1.92 | 10 | 1 | $363.0 | $254.1 | $98.75 | $389.55 |
| J2562 | HCPCS | facility | Plerixafor injection | $119.47 | $25.33 | $94.14 | 4.72 | 13 | 1 | n/a | n/a | $25.33 | $420.72 |
| 88199 | HCPCS | facility | Cytopathology procedure | $156.37 | $62.45 | $93.92 | 2.50 | 4 | 1 | n/a | n/a | $62.45 | $157.01 |
| 88299 | HCPCS | facility | Cytogenetic study | $156.37 | $62.45 | $93.92 | 2.50 | 4 | 1 | n/a | n/a | $62.45 | $157.01 |
| 88399 | HCPCS | facility | Surgical pathology procedure | $156.37 | $62.45 | $93.92 | 2.50 | 4 | 1 | n/a | n/a | $62.45 | $157.01 |
| 89240 | HCPCS | facility | Pathology lab procedure | $156.37 | $62.45 | $93.92 | 2.50 | 4 | 1 | n/a | n/a | $62.45 | $157.01 |
| 88125 | HCPCS | facility | Forensic cytopathology | $155.73 | $62.45 | $93.28 | 2.49 | 7 | 1 | n/a | n/a | $23.43 | $157.01 |
| 89255 | HCPCS | facility | Prepare embryo for transfer | $155.73 | $62.45 | $93.28 | 2.49 | 7 | 1 | n/a | n/a | $60.45 | $157.01 |
| 89398 | HCPCS | facility | Unlisted reprod med lab proc | $155.73 | $62.45 | $93.28 | 2.49 | 6 | 1 | n/a | n/a | $57.6 | $157.01 |
| 92524 | HCPCS | facility | Behavral qualit analys voice | $213.76 | $120.69 | $93.07 | 1.77 | 10 | 1 | $560.0 | $392.0 | $120.69 | $452.59 |
| 69209 | HCPCS | facility | HC REMOVE IMPACT EAR WAX; UNILAT | $163.42 | $70.7 | $92.72 | 2.31 | 10 | 1 | $144.0 | $100.8 | $55.94 | $274.76 |
| J9050 | HCPCS | facility | Carmustine injection | $330.87 | $238.46 | $92.41 | 1.39 | 13 | 1 | n/a | n/a | $173.64 | $1743.25 |
| C9507 | HCPCS | facility | COVID-19 convalescent plasma | $770.97 | $680.03 | $90.94 | 1.13 | 7 | 1 | n/a | n/a | $680.03 | $777.37 |
| 92522 | HCPCS | facility | Evaluate speech production | $205.17 | $115.11 | $90.06 | 1.78 | 10 | 1 | $651.0 | $455.7 | $115.11 | $431.66 |
| 70010 | HCPCS | facility | Contrast x-ray of brain | $507.6 | $418.11 | $89.49 | 1.21 | 10 | 1 | n/a | n/a | $418.11 | $1150.04 |
| 97161 | HCPCS | facility | HC PT EVAL, LOW COMPLEX, 20 MIN | $190.18 | $101.06 | $89.12 | 1.88 | 10 | 1 | $205.0 | $143.5 | $101.06 | $378.98 |
| 97163 | HCPCS | facility | HC PT EVAL, HIGH COMPLEX, 45 MIN | $190.18 | $101.06 | $89.12 | 1.88 | 10 | 1 | $407.0 | $284.9 | $101.06 | $378.98 |
| Q5120 | HCPCS | facility | Inj pegfilgrastim-bmez 0.5mg | $119.29 | $30.32 | $88.97 | 3.93 | 13 | 1 | n/a | n/a | $27.99 | $297.96 |
| J9029 | HCPCS | facility | Inj, adstiladrin, per tx dos | $63431.05 | $63342.28 | $88.77 | 1.00 | 8 | 1 | n/a | n/a | $63342.28 | $64274.79 |
| 51725 | HCPCS | facility | Simple cystometrogram | $387.57 | $299.43 | $88.14 | 1.29 | 10 | 1 | n/a | n/a | $232.32 | $624.47 |
| 51726 | HCPCS | facility | Complex cystometrogram | $387.57 | $299.43 | $88.14 | 1.29 | 10 | 1 | n/a | n/a | $232.32 | $757.44 |
| 97167 | HCPCS | facility | HC OT EVAL, HIGH COMPLEX, 45 MIN | $199.345 | $112.07 | $87.275 | 1.78 | 10 | 1 | $381.0 | $266.7 | $98.75 | $420.26 |
| 70460 | HCPCS | facility | Ct head/brain w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | $2514.0 | $1759.8 | $210.21 | $562.93 |
| 70481 | HCPCS | facility | Ct orbit/ear/fossa w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | $2187.0 | $1530.9 | $210.21 | $562.93 |
| 70487 | HCPCS | facility | Ct maxillofacial w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | $2187.0 | $1530.9 | $210.21 | $562.93 |
| 70491 | HCPCS | facility | Ct soft tissue neck w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | $2821.0 | $1974.7 | $210.21 | $562.93 |
| 71260 | HCPCS | facility | Ct thorax w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | $3536.0 | $2475.2 | $210.21 | $562.93 |
| 72129 | HCPCS | facility | Ct chest spine w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | $2889.0 | $2022.3 | $210.21 | $564.81 |
| 72193 | HCPCS | facility | Ct pelvis w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | $3214.0 | $2249.8 | $210.21 | $562.93 |
| 73701 | HCPCS | facility | Ct lower extremity w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | $2946.0 | $2062.2 | $210.21 | $562.93 |
| 74160 | HCPCS | facility | Ct abdomen w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | $3112.0 | $2178.4 | $210.21 | $562.93 |
| 74262 | HCPCS | facility | Ct colonography dx w/dye | $297.15 | $210.21 | $86.94 | 1.41 | 10 | 1 | n/a | n/a | $210.21 | $562.93 |
| P9033 | HCPCS | facility | Platelets leukoreduced irrad | $274.97 | $189.59 | $85.38 | 1.45 | 7 | 1 | n/a | n/a | $156.45 | $277.25 |
| 95713 | HCPCS | facility | Veeg 2-12 hr cont mntr | $532.2 | $447.21 | $84.99 | 1.19 | 10 | 1 | n/a | n/a | $403.07 | $1247.34 |
| 57455 | HCPCS | facility | Biopsy of cervix w/scope | $449.6 | $365.2 | $84.4 | 1.23 | 11 | 1 | $767.0 | $536.9 | $234.09 | $1151.97 |
| 59070 | HCPCS | facility | HC TRANSABDOMINAL AMNIOINFUSION, INCLUDING ULTRASOUND GUIDANCE | $449.6 | $365.2 | $84.4 | 1.23 | 11 | 1 | $558.0 | $390.6 | $118.56 | $552.31 |
| 74445 | HCPCS | facility | X-ray exam of penis | $209.55 | $125.29 | $84.26 | 1.67 | 10 | 1 | n/a | n/a | $125.29 | $357.7 |
| 0868T | HCPCS | facility | Hi-res gastric ep mapping | $530.6 | $447.21 | $83.39 | 1.19 | 3 | 1 | n/a | n/a | $447.21 | $530.6 |
| 97162 | HCPCS | facility | HC PT EVAL, MOD COMPLEX, 30 MIN | $192.27 | $108.88 | $83.39 | 1.77 | 10 | 1 | $303.0 | $212.1 | $101.89 | $408.3 |
| 77066 | HCPCS | facility | Dx mammo incl cad bi | $214.37 | $131.8 | $82.57 | 1.63 | 13 | 1 | $826.0 | $578.2 | $102.75 | $494.25 |
| 97168 | HCPCS | facility | HC OT RE-EVAL, ESTAB PLAN CARE | $152.795 | $70.83 | $81.965 | 2.16 | 10 | 1 | $309.0 | $216.3 | $66.65 | $265.61 |
| 77067 | HCPCS | facility | HC SCREENING MAMMO, W/CAD, 2D DIGITAL, BILATERAL | $177.13 | $95.93 | $81.2 | 1.85 | 13 | 1 | $758.0 | $530.6 | $79.44 | $359.74 |
| G0380 | HCPCS | facility | Lev 1 hosp type B ED visit | $169.15 | $89.08 | $80.07 | 1.90 | 4 | 1 | n/a | n/a | $89.08 | $169.84 |
| 92507 | HCPCS | facility | HC SPEECH TREATMENT, INDIVIDUAL | $157.975 | $78.5 | $79.475 | 2.01 | 10 | 1 | $484.0 | $338.8 | $78.16 | $294.38 |
| J0841 | HCPCS | facility | Inj crotalidae im f(ab')2 eq | $1122.69 | $1045.15 | $77.54 | 1.07 | 13 | 1 | n/a | n/a | $1040.11 | $4925.16 |
| 92609 | HCPCS | facility | Use of speech device service | $191.74 | $114.67 | $77.07 | 1.67 | 10 | 1 | n/a | n/a | $114.67 | $430.01 |
| 77065 | HCPCS | facility | Dx mammo incl cad uni | $167.5 | $90.66 | $76.84 | 1.85 | 13 | 1 | $667.0 | $466.9 | $80.64 | $339.98 |
| 97164 | HCPCS | facility | HC PT RE-EVAL, ESTAB PLAN CARE | $146.375 | $69.77 | $76.605 | 2.10 | 10 | 1 | $225.0 | $157.5 | $69.77 | $261.64 |
| P9034 | HCPCS | facility | Platelets, pheresis | $385.47 | $308.96 | $76.51 | 1.25 | 9 | 1 | n/a | n/a | $308.96 | $431.99 |
| 92326 | HCPCS | facility | Replacement of contact lens | $146.73 | $70.7 | $76.03 | 2.08 | 7 | 1 | n/a | n/a | $48.41 | $147.93 |
| 92358 | HCPCS | facility | Aphakia prosth service temp | $146.73 | $70.7 | $76.03 | 2.08 | 7 | 1 | n/a | n/a | $48.41 | $147.93 |
| 93668 | HCPCS | facility | HC PERIPHERAL ARTERY DISEASE REHAB, PER SESSION | $146.73 | $70.7 | $76.03 | 2.08 | 6 | 1 | $172.0 | $120.4 | $63.98 | $147.93 |
| 96105 | HCPCS | facility | Assessment of aphasia | $175.54 | $99.76 | $75.78 | 1.76 | 13 | 1 | $400.0 | $280.0 | $94.24 | $374.1 |
| C8957 | HCPCS | facility | Prolonged iv inf, req pump | $329.78 | $254.91 | $74.87 | 1.29 | 10 | 1 | n/a | n/a | $230.5 | $856.13 |
| 50390 | HCPCS | facility | Drainage of kidney lesion | $922.87 | $848.66 | $74.21 | 1.09 | 11 | 1 | $2675.0 | $1872.5 | $662.51 | $1805.48 |
| 0512T | HCPCS | facility | Esw integ wnd hlg 1st wnd | $314.08 | $240.45 | $73.63 | 1.31 | 3 | 1 | n/a | n/a | $240.45 | $314.08 |
| 91010 | HCPCS | facility | Esophagus motility study | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $302.6 | $1247.34 |
| 91020 | HCPCS | facility | Gastric motility studies | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $302.6 | $1247.34 |
| 91022 | HCPCS | facility | Duodenal motility study | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $302.6 | $1247.34 |
| 91030 | HCPCS | facility | Acid perfusion of esophagus | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $302.6 | $1247.34 |
| 91034 | HCPCS | facility | Gastroesophageal reflux test | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $302.6 | $1247.34 |
| 91038 | HCPCS | facility | Esoph imped funct test > 1hr | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $302.6 | $1247.34 |
| 91040 | HCPCS | facility | Esoph balloon distension tst | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $137.27 | $1247.34 |
| 92577 | HCPCS | facility | Stenger test speech | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $116.96 | $1222.65 |
| 93660 | HCPCS | facility | Tilt table evaluation | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $303.52 | $1247.34 |
| 94013 | HCPCS | facility | Meas lung vol thru 2 yrs | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $179.86 | $1247.34 |
| 94772 | HCPCS | facility | Breath recording infant | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $179.86 | $1247.34 |
| 95070 | HCPCS | facility | Bronchial allergy tests | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $179.86 | $1247.34 |
| 95076 | HCPCS | facility | Ingest challenge ini 120 min | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $302.6 | $1247.34 |
| 95911 | HCPCS | facility | HC NERVE CONDUCTION, 9-10 STUDIES | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | $766.0 | $536.2 | $79.83 | $1247.34 |
| 95912 | HCPCS | facility | HC NERVE CONDUCTION, 11-12 STUDIES | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | $779.0 | $545.3 | $79.83 | $1247.34 |
| 95913 | HCPCS | facility | HC NERVE CONDUCTION, 13/+ STUDIES | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | $798.0 | $558.6 | $79.83 | $1247.34 |
| 95929 | HCPCS | facility | C motor evoked lwr limbs | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $79.83 | $1247.34 |
| 95954 | HCPCS | facility | EEG monitoring/giving drugs | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $79.83 | $1247.34 |
| 96000 | HCPCS | facility | Motion analysis video/3d | $520.63 | $447.21 | $73.42 | 1.16 | 10 | 1 | n/a | n/a | $184.02 | $1247.34 |
| 96125 | HCPCS | facility | Cognitive test by hc pro | $186.34 | $113.74 | $72.6 | 1.64 | 6 | 1 | $455.0 | $318.5 | $113.74 | $426.52 |
| 99426 | HCPCS | facility | Prin care mgmt staff 1st 30 | $193.06 | $121.75 | $71.31 | 1.59 | 6 | 1 | n/a | n/a | $86.0 | $194.65 |
| 99492 | HCPCS | facility | 1st psyc collab care mgmt | $193.06 | $121.75 | $71.31 | 1.59 | 7 | 1 | n/a | n/a | $87.36 | $194.65 |
| 99493 | HCPCS | facility | Sbsq psyc collab care mgmt | $193.06 | $121.75 | $71.31 | 1.59 | 7 | 1 | n/a | n/a | $87.36 | $194.65 |
| 99497 | HCPCS | facility | Advncd care plan 30 min | $193.06 | $121.75 | $71.31 | 1.59 | 7 | 1 | n/a | n/a | $87.36 | $194.65 |
| G2214 | HCPCS | facility | Init/sub psych care m 1st 30 | $193.06 | $121.75 | $71.31 | 1.59 | 7 | 1 | n/a | n/a | $85.11 | $194.65 |
| P9053 | HCPCS | facility | Plt, pher, l/r cmv-neg, irr | $573.84 | $503.45 | $70.39 | 1.14 | 7 | 1 | n/a | n/a | $503.45 | $660.47 |
| 20662 | HCPCS | facility | Application of pelvis brace | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 23035 | HCPCS | facility | Drain shoulder bone lesion | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 25000 | HCPCS | facility | Incision of tendon sheath | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 25031 | HCPCS | facility | Drainage of forearm bursa | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| 25110 | HCPCS | facility | Remove wrist tendon lesion | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 25111 | HCPCS | facility | Remove wrist tendon lesion | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 25112 | HCPCS | facility | Reremove wrist tendon lesion | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 25115 | HCPCS | facility | Remove wrist/forearm lesion | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 25248 | HCPCS | facility | Remove forearm foreign body | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| 25922 | HCPCS | facility | Amputate hand at wrist | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 27000 | HCPCS | facility | Incision of hip tendon | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $4303.61 |
| 27050 | HCPCS | facility | Biopsy of sacroiliac joint | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 27052 | HCPCS | facility | Biopsy of hip joint | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | n/a | n/a | $1501.88 | $6735.22 |
| 28002 | HCPCS | facility | HC I&D BELOW FASCIA FOOT, 1 BURSAL SPACE | $1996.23 | $1927.09 | $69.14 | 1.04 | 11 | 1 | $6300.0 | $4410.0 | $1501.88 | $6735.22 |
| 57150 | HCPCS | facility | Treat vagina infection | $138.02 | $70.7 | $67.32 | 1.95 | 10 | 1 | n/a | n/a | $70.7 | $159.42 |
| 97763 | HCPCS | facility | HC ORTHO/PROSTH M/T, SUBSEQ ENCOUNTER, EA 15 MINS | $124.335 | $57.27 | $67.065 | 2.17 | 10 | 1 | $200.0 | $140.0 | $57.27 | $214.76 |
| J9184 | HCPCS | facility | Inj gemcitabin (avyxa) 200mg | $444.6 | $378.64 | $65.96 | 1.17 | 2 | 1 | n/a | n/a | $378.64 | $444.6 |
| 11000 | HCPCS | facility | Debride infected skin | $552.21 | $487.19 | $65.02 | 1.13 | 11 | 1 | $840.0 | $588.0 | $209.65 | $552.31 |
| 13120 | HCPCS | facility | Cmplx rpr s/a/l 1.1-2.5 cm | $552.21 | $487.19 | $65.02 | 1.13 | 11 | 1 | $784.0 | $548.8 | $242.4 | $1151.97 |
| 13121 | HCPCS | facility | Cmplx rpr s/a/l 2.6-7.5 cm | $552.21 | $487.19 | $65.02 | 1.13 | 11 | 1 | $918.0 | $642.6 | $251.48 | $1151.97 |
| 13132 | HCPCS | facility | Cmplx rpr f/c/c/m/n/ax/g/h/f | $552.21 | $487.19 | $65.02 | 1.13 | 11 | 1 | $918.0 | $642.6 | $393.38 | $1151.97 |
| 15004 | HCPCS | facility | Wound prep f/n/hf/g | $552.21 | $487.19 | $65.02 | 1.13 | 11 | 1 | n/a | n/a | $251.48 | $1151.97 |
| 47537 | HCPCS | facility | HC REMOVAL BILIARY DRAINAGE CATH, PERCUT, REQ FLUORO, INCL IMAG GUID | $1151.97 | $1086.97 | $65.0 | 1.06 | 10 | 1 | $1768.0 | $1237.6 | $870.88 | $1457.06 |
| 74174 | HCPCS | facility | Ct angio abd&pelv w/o&w/dye | $482.58 | $418.11 | $64.47 | 1.15 | 10 | 1 | $2660.0 | $1862.0 | $418.11 | $1150.04 |
| 74177 | HCPCS | facility | Ct abd & pelv w/contrast | $482.58 | $418.11 | $64.47 | 1.15 | 10 | 1 | $5890.0 | $4123.0 | $418.11 | $1150.04 |
| 74178 | HCPCS | facility | Ct abd & pelv 1/> regns | $482.58 | $418.11 | $64.47 | 1.15 | 10 | 1 | $6925.0 | $4847.5 | $418.11 | $1150.04 |
| 64405 | HCPCS | facility | HC NERVE BLOCK INJ, OCCIPITAL | $431.12 | $367.87 | $63.25 | 1.17 | 11 | 1 | $1502.0 | $1051.4 | $283.01 | $1151.97 |
| 99490 | HCPCS | facility | Chron care mgmt srvc 20 min | $185.0 | $121.75 | $63.25 | 1.52 | 7 | 1 | n/a | n/a | $87.36 | $186.52 |
| P9038 | HCPCS | facility | RBC irradiated | $208.04 | $145.22 | $62.82 | 1.43 | 7 | 1 | n/a | n/a | $145.22 | $209.76 |
| 97760 | HCPCS | facility | HC ORTHO MGMT/TRAIN, INITIAL ENCOUNTER, EA 15 MINS | $113.16 | $52.38 | $60.78 | 2.16 | 10 | 1 | $178.0 | $124.6 | $50.25 | $196.42 |
| 97533 | HCPCS | facility | HC SENSORY INTEGRATIVE TECH, DIRECT PT CONTACT, EA 15 MINS | $122.745 | $63.33 | $59.415 | 1.94 | 10 | 1 | $146.0 | $102.2 | $60.71 | $237.49 |
| P9051 | HCPCS | facility | Blood, l/r, cmv-neg | $209.79 | $151.58 | $58.21 | 1.38 | 7 | 1 | n/a | n/a | $151.58 | $211.53 |
| 95992 | HCPCS | facility | Canalith repositioning proc | $87.92 | $30.23 | $57.69 | 2.91 | 10 | 1 | $183.0 | $128.1 | $30.23 | $115.0 |
| J9245 | HCPCS | facility | Inj melphalan hydrochl 50 MG | $153.54 | $95.9 | $57.64 | 1.60 | 13 | 1 | n/a | n/a | $86.94 | $310.47 |
| 90376 | HCPCS | facility | Rabies ig heat treated | $410.05 | $352.44 | $57.61 | 1.16 | 10 | 1 | n/a | n/a | $237.37 | $515.93 |
| 95052 | HCPCS | facility | Photo patch test | $126.53 | $70.7 | $55.83 | 1.79 | 7 | 1 | n/a | n/a | $24.8 | $127.57 |
| Q5111 | HCPCS | facility | Injection, udenyca 0.5 mg | $161.99 | $106.33 | $55.66 | 1.52 | 13 | 1 | n/a | n/a | $106.33 | $267.79 |
| P9054 | HCPCS | facility | Blood, l/r, froz/degly/wash | $319.61 | $265.19 | $54.42 | 1.21 | 7 | 1 | n/a | n/a | $122.44 | $322.26 |
| Q0035 | HCPCS | facility | Cardiokymography | $98.245 | $44.76 | $53.485 | 2.19 | 10 | 1 | n/a | n/a | $36.73 | $176.82 |
| 74251 | HCPCS | facility | X-ray exam of small bowel | $263.66 | $210.21 | $53.45 | 1.25 | 10 | 1 | n/a | n/a | $122.82 | $562.93 |
| J9357 | HCPCS | facility | Valrubicin injection | $1376.79 | $1323.34 | $53.45 | 1.04 | 13 | 1 | $3065.74 | $2146.02 | $1303.34 | $1513.4 |
| J0801 | HCPCS | facility | Inj. acthar gel to 40 units | $4187.43 | $4134.62 | $52.81 | 1.01 | 12 | 1 | n/a | n/a | $3479.53 | $4274.14 |
| 92137 | HCPCS | facility | Cptrz oph img pst sg rta oct | $311.4 | $258.77 | $52.63 | 1.20 | 5 | 1 | n/a | n/a | $258.77 | $348.72 |
| 97530 | HCPCS | facility | HC THERAPEUTIC ACTIVITIES, DIRECT PT CONTACT, EA 15 MIN | $88.89 | $36.3 | $52.59 | 2.45 | 10 | 1 | $174.0 | $121.8 | $36.3 | $136.12 |
| 70336 | HCPCS | facility | HC MRI; TMJ | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $3111.0 | $2177.7 | $263.66 | $730.4 |
| 70540 | HCPCS | facility | HC MRI;ORBIT,FACE,NECK W/O CONTR | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2822.0 | $1975.4 | $263.66 | $730.4 |
| 70544 | HCPCS | facility | HC MRA; HEAD W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2822.0 | $1975.4 | $263.66 | $730.4 |
| 70547 | HCPCS | facility | HC MRA; NECK W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2687.0 | $1880.9 | $263.66 | $730.4 |
| 70551 | HCPCS | facility | HC MRI, BRAIN, W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2664.0 | $1864.8 | $263.66 | $730.4 |
| 70554 | HCPCS | facility | Fmri brain by tech | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | n/a | n/a | $263.66 | $730.4 |
| 70555 | HCPCS | facility | Fmri brain by phys/psych | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | n/a | n/a | $263.66 | $730.4 |
| 71550 | HCPCS | facility | HC MRI; CHEST W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2687.0 | $1880.9 | $263.66 | $730.4 |
| 72141 | HCPCS | facility | HC MRI; CERVICAL SPINE W/O CONTR | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2917.0 | $2041.9 | $263.66 | $730.4 |
| 72146 | HCPCS | facility | HC MRI, THORACIC SPINE, W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $3141.0 | $2198.7 | $263.66 | $730.4 |
| 72148 | HCPCS | facility | HC MRI, LUMBAR SPINE, W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $3537.0 | $2475.9 | $263.66 | $730.4 |
| 72195 | HCPCS | facility | HC MRI; PELVIS W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2687.0 | $1880.9 | $263.66 | $730.4 |
| 73218 | HCPCS | facility | HC MRI, UPPER EXTRM, NO JNT, W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2687.0 | $1880.9 | $263.66 | $730.4 |
| 73221 | HCPCS | facility | HC MRI, UPPER EXTRM, JOINTS, W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2687.0 | $1880.9 | $263.66 | $730.4 |
| 73718 | HCPCS | facility | HC MRI, LOWER EXTRM, NO JNT, W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2687.0 | $1880.9 | $263.66 | $730.4 |
| 73721 | HCPCS | facility | HC MRI, LOWER EXTRM, JOINTS, W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2956.0 | $2069.2 | $263.66 | $730.4 |
| 74181 | HCPCS | facility | HC MRI, ABDOMEN, W/O CONTRAST | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | $2790.0 | $1953.0 | $263.66 | $730.4 |
| 75557 | HCPCS | facility | Cardiac mri for morph | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | n/a | n/a | $263.66 | $730.4 |
| 77084 | HCPCS | facility | Magnetic image bone marrow | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | n/a | n/a | $263.66 | $730.4 |
| C8910 | HCPCS | facility | MRA w/o cont, chest | $338.49 | $285.95 | $52.54 | 1.18 | 10 | 1 | n/a | n/a | $263.66 | $730.4 |
| P9022 | HCPCS | facility | HC RBC, WASHED, EA UNIT | $420.96 | $368.58 | $52.38 | 1.14 | 7 | 1 | $693.0 | $485.1 | $296.39 | $424.46 |
| P9010 | HCPCS | facility | HC WHOLE BLOOD, TRANSFUSION, UNIT | $242.15 | $189.84 | $52.31 | 1.28 | 7 | 1 | $550.0 | $385.0 | $169.83 | $244.16 |
| 51703 | HCPCS | facility | HC INSERT TEMP BLAD CATH; COMPLEX | $206.285 | $154.21 | $52.075 | 1.34 | 10 | 1 | $329.0 | $230.3 | $81.99 | $375.71 |
| 96379 | HCPCS | facility | Ther/prop/diag inj/inf proc | $108.17 | $56.12 | $52.05 | 1.93 | 7 | 1 | n/a | n/a | $27.01 | $109.06 |
| 96549 | HCPCS | facility | Chemotherapy unspecified | $108.17 | $56.12 | $52.05 | 1.93 | 7 | 1 | n/a | n/a | $27.01 | $109.06 |
| 92283 | HCPCS | facility | Color vision examination | $121.77 | $70.7 | $51.07 | 1.72 | 10 | 1 | n/a | n/a | $48.41 | $159.13 |
| 93226 | HCPCS | facility | Ecg monit/reprt up to 48 hrs | $121.77 | $70.7 | $51.07 | 1.72 | 10 | 1 | $993.0 | $695.1 | $66.52 | $299.18 |
| 94200 | HCPCS | facility | Lung function test (MBC/MVV) | $121.77 | $70.7 | $51.07 | 1.72 | 10 | 1 | n/a | n/a | $45.06 | $157.86 |
| 95933 | HCPCS | facility | Blink reflex test | $121.77 | $70.7 | $51.07 | 1.72 | 10 | 1 | $654.0 | $457.8 | $43.11 | $147.93 |
| A9563 | HCPCS | facility | P32 na phosphate | $329.265 | $278.24 | $51.025 | 1.18 | 6 | 1 | n/a | n/a | $278.24 | $347.56 |
| J2778 | HCPCS | facility | Ranibizumab injection | $137.14 | $86.38 | $50.76 | 1.59 | 13 | 1 | n/a | n/a | $65.44 | $322.85 |
| 97761 | HCPCS | facility | HC PROSTH MGMT/TRAIN, INITIAL ENCOUNTER, EA 15 MINS | $96.035 | $45.6 | $50.435 | 2.11 | 10 | 1 | $178.0 | $124.6 | $42.57 | $171.0 |
| J0178 | HCPCS | facility | Aflibercept injection | $821.98 | $771.56 | $50.42 | 1.07 | 13 | 1 | n/a | n/a | $763.9 | $943.64 |
| 97113 | HCPCS | facility | Aquatic therapy/exercises | $86.98 | $38.36 | $48.62 | 2.27 | 10 | 1 | $248.0 | $173.6 | $38.36 | $143.85 |
| G0473 | HCPCS | facility | Group behave couns 2-10 | $93.25 | $44.9 | $48.35 | 2.08 | 7 | 1 | n/a | n/a | $44.9 | $94.02 |
| 70450 | HCPCS | facility | Ct head/brain w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $1751.0 | $1225.7 | $125.29 | $334.27 |
| 70480 | HCPCS | facility | Ct orbit/ear/fossa w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $1934.0 | $1353.8 | $125.29 | $334.27 |
| 70486 | HCPCS | facility | Ct maxillofacial w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $1934.0 | $1353.8 | $125.29 | $334.27 |
| 70490 | HCPCS | facility | Ct soft tissue neck w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $1934.0 | $1353.8 | $125.29 | $334.27 |
| 71250 | HCPCS | facility | Ct thorax w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $2193.0 | $1535.1 | $125.29 | $334.27 |
| 72125 | HCPCS | facility | Ct neck spine w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $2392.0 | $1674.4 | $125.29 | $334.27 |
| 72128 | HCPCS | facility | Ct chest spine w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $2421.0 | $1694.7 | $125.29 | $334.27 |
| 72131 | HCPCS | facility | Ct lumbar spine w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $2421.0 | $1694.7 | $125.29 | $334.27 |
| 72192 | HCPCS | facility | Ct pelvis w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $2201.0 | $1540.7 | $125.29 | $334.27 |
| 73200 | HCPCS | facility | Ct upper extremity w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $2523.0 | $1766.1 | $125.29 | $334.27 |
| 73700 | HCPCS | facility | Ct lower extremity w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $2776.0 | $1943.2 | $125.29 | $334.27 |
| 74150 | HCPCS | facility | Ct abdomen w/o dye | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | $2110.0 | $1477.0 | $125.29 | $334.27 |
| 74261 | HCPCS | facility | Ct colonography dx | $173.58 | $125.29 | $48.29 | 1.39 | 10 | 1 | n/a | n/a | $125.29 | $334.27 |
| 0696T | HCPCS | facility | Bdy surf mapg pm/cvdfb f/up | $92.98 | $44.73 | $48.25 | 2.08 | 7 | 1 | n/a | n/a | $38.03 | $93.75 |
| Q5130 | HCPCS | facility | Inj, fylnetra, 0.5 mg | $186.19 | $137.96 | $48.23 | 1.35 | 12 | 1 | n/a | n/a | $127.23 | $224.24 |
| 97755 | HCPCS | facility | Assistive technology assess | $85.8 | $38.89 | $46.91 | 2.21 | 10 | 1 | n/a | n/a | $38.73 | $145.84 |
| 95982 | HCPCS | facility | Io ga n-stim subsq w/reprog | $91.53 | $44.73 | $46.8 | 2.05 | 7 | 1 | n/a | n/a | $44.73 | $111.47 |
| G0013 | HCPCS | facility | Hiv prep counsel, clin staff | $91.6 | $44.9 | $46.7 | 2.04 | 2 | 1 | n/a | n/a | $44.9 | $91.6 |
| J7327 | HCPCS | facility | Monovisc inj per dose | $683.17 | $636.59 | $46.58 | 1.07 | 13 | 1 | n/a | n/a | $528.58 | $790.99 |
| 95976 | HCPCS | facility | Alys smpl cn npgt prgrmg | $91.155 | $44.73 | $46.425 | 2.04 | 10 | 1 | n/a | n/a | $42.49 | $111.47 |
| 0650T | HCPCS | facility | Prgrmg dev eval scrms remote | $90.78 | $44.73 | $46.05 | 2.03 | 7 | 1 | n/a | n/a | $38.03 | $91.53 |
| 92614 | HCPCS | facility | Laryngoscopic sensory vid | $103.57 | $57.66 | $45.91 | 1.80 | 5 | 1 | n/a | n/a | $57.66 | $216.22 |
| C9250 | HCPCS | facility | Artiss fibrin sealant | $187.57 | $141.89 | $45.68 | 1.32 | 13 | 1 | n/a | n/a | $141.89 | $209.64 |
| 97550 | HCPCS | facility | Caregiver traing 1st 30 min | $86.05 | $40.53 | $45.52 | 2.12 | 5 | 1 | $130.0 | $91.0 | $40.53 | $151.99 |
| 92519 | HCPCS | facility | Vemp tst i&r cervical&ocular | $304.17 | $258.77 | $45.4 | 1.18 | 9 | 1 | n/a | n/a | $258.77 | $721.29 |
| 97112 | HCPCS | facility | HC NEUROMUSCULAR RE-EDUCATION | $79.04 | $33.76 | $45.28 | 2.34 | 10 | 1 | $174.0 | $121.8 | $33.76 | $126.6 |
| J9046 | HCPCS | facility | Inj, bortezomib, dr. reddy's | $48.55 | $3.46 | $45.09 | 14.03 | 9 | 1 | n/a | n/a | $3.46 | $52.21 |
| J1807 | HCPCS | facility | Inj, ethacrynate sod, 1 mg | $64.98 | $20.97 | $44.01 | 3.10 | 2 | 1 | n/a | n/a | $20.97 | $64.98 |
| J1073 | HCPCS | facility | Testosterone pellet 75 mg | $119.85 | $76.11 | $43.74 | 1.57 | 2 | 1 | n/a | n/a | $76.11 | $119.85 |
| 97750 | HCPCS | facility | HC FUNC CAPACITY EVAL, EA 15 MIN | $78.525 | $34.88 | $43.645 | 2.25 | 10 | 1 | $205.0 | $143.5 | $34.54 | $130.8 |
| 90912 | HCPCS | facility | Bfb training 1st 15 min | $81.99 | $39.56 | $42.43 | 2.07 | 13 | 1 | n/a | n/a | $39.56 | $346.29 |
| 95065 | HCPCS | facility | Nose allergy test | $86.8 | $44.76 | $42.04 | 1.94 | 7 | 1 | n/a | n/a | $24.8 | $87.52 |
| G0118 | HCPCS | facility | Glaucoma scrn hgh risk direc | $86.8 | $44.76 | $42.04 | 1.94 | 7 | 1 | n/a | n/a | $44.76 | $87.52 |
| 92652 | HCPCS | facility | Aep thrshld est mlt freq i&r | $300.6 | $258.77 | $41.83 | 1.16 | 10 | 1 | n/a | n/a | $184.02 | $718.13 |
| 92653 | HCPCS | facility | Aep neurodiagnostic i&r | $300.6 | $258.77 | $41.83 | 1.16 | 10 | 1 | n/a | n/a | $184.02 | $718.13 |
| 97036 | HCPCS | facility | Hydrotherapy | $81.58 | $39.94 | $41.64 | 2.04 | 10 | 1 | n/a | n/a | $35.24 | $149.78 |
| 96146 | HCPCS | facility | Psycl/nrpsyc tst auto result | $76.06 | $34.66 | $41.4 | 2.19 | 7 | 1 | n/a | n/a | $17.17 | $76.06 |
| 99473 | HCPCS | facility | Self-meas bp pt educaj/train | $76.06 | $34.66 | $41.4 | 2.19 | 7 | 1 | n/a | n/a | $25.19 | $76.06 |
| 16035 | HCPCS | facility | Incision of burn scab initi | $528.52 | $487.19 | $41.33 | 1.08 | 9 | 1 | n/a | n/a | $106.96 | $552.31 |
| P9023 | HCPCS | facility | Frozen plasma, pooled, sd | $96.91 | $55.96 | $40.95 | 1.73 | 7 | 1 | n/a | n/a | $55.96 | $97.72 |
| J9179 | HCPCS | facility | Eribulin mesylate injection | $130.25 | $89.34 | $40.91 | 1.46 | 13 | 1 | n/a | n/a | $72.61 | $141.29 |
| 77778 | HCPCS | facility | Apply interstit radiat compl | $875.52 | $834.69 | $40.83 | 1.05 | 10 | 1 | $3806.0 | $2664.2 | $805.89 | $2243.57 |
| 77332 | HCPCS | facility | HC TEMPLATE STEPPER UNIT | $201.76 | $161.08 | $40.68 | 1.25 | 10 | 1 | $945.0 | $661.5 | $141.54 | $416.35 |
| 77333 | HCPCS | facility | Radiation treatment aid(s) | $201.76 | $161.08 | $40.68 | 1.25 | 10 | 1 | n/a | n/a | $141.54 | $416.35 |
| 0807T | HCPCS | facility | Pulm tiss vntj alys prev ct | $299.37 | $258.77 | $40.6 | 1.16 | 3 | 1 | n/a | n/a | $258.77 | $299.37 |
| 0808T | HCPCS | facility | Pulm tiss vntj alys w/ct | $299.37 | $258.77 | $40.6 | 1.16 | 3 | 1 | n/a | n/a | $258.77 | $299.37 |
| 97537 | HCPCS | facility | Community/work reintegration | $73.65 | $33.09 | $40.56 | 2.23 | 10 | 1 | n/a | n/a | $32.45 | $124.09 |
| 97535 | HCPCS | facility | HC SELF/HOME MGMT-ADL, EA 15 MINS | $76.835 | $36.28 | $40.555 | 2.12 | 10 | 1 | $174.0 | $121.8 | $33.85 | $136.05 |
| 90913 | HCPCS | facility | Bfb training ea addl 15 min | $62.245 | $22.27 | $39.975 | 2.80 | 10 | 1 | n/a | n/a | $22.27 | $346.29 |
| 97542 | HCPCS | facility | HC WHEELCHAIR MGMT, EA 15 MINS | $73.97 | $34.53 | $39.44 | 2.14 | 10 | 1 | $146.0 | $102.2 | $32.8 | $129.49 |
| Q4262 | HCPCS | facility | Dual layer impax, per sq cm | $188.445 | $149.14 | $39.305 | 1.26 | 6 | 1 | n/a | n/a | $62.85 | $706.77 |
| 21172 | HCPCS | facility | Reconstruct orbit/forehead | $7132.485 | $7094.6 | $37.885 | 1.01 | 10 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 45999 | HCPCS | facility | HC UNLISTED PROCEDURE; RECTUM | $1151.97 | $1114.51 | $37.46 | 1.03 | 5 | 1 | $1585.0 | $1109.5 | $1102.36 | $1151.97 |
| 46999 | HCPCS | facility | Anus surgery procedure | $1151.97 | $1114.51 | $37.46 | 1.03 | 5 | 1 | n/a | n/a | $1102.36 | $1151.97 |
| 70542 | HCPCS | facility | HC MRI ORBIT, FACE AND/OR NECK; WITH CONTRAST | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $1330.0 | $931.0 | $418.11 | $1150.04 |
| 70545 | HCPCS | facility | HC MRA, HEAD W/CONTRAST | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $3220.0 | $2254.0 | $418.11 | $1150.04 |
| 70548 | HCPCS | facility | HC MRA, NECK W/CONTRAST | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $2872.0 | $2010.4 | $418.11 | $1150.04 |
| 70552 | HCPCS | facility | HC MRI; BRAIN WITH CONTRAST | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $3662.0 | $2563.4 | $418.11 | $1150.04 |
| 72142 | HCPCS | facility | HC MRI; CERVICAL SPINE WITH CONTR | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $3541.0 | $2478.7 | $418.11 | $1150.04 |
| 72147 | HCPCS | facility | HC MRI; THORACIC SPINE WITH CONTR | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $3390.0 | $2373.0 | $418.11 | $1150.04 |
| 72149 | HCPCS | facility | HC MRI; LUMBAR SPINE WITH CONTR | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $3845.0 | $2691.5 | $418.11 | $1150.04 |
| 72196 | HCPCS | facility | HC MRI, PELVIS W/CONTRAST | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $3220.0 | $2254.0 | $418.11 | $1150.04 |
| 73219 | HCPCS | facility | HC MRI, UPPER EXTRM NO JOINT, W/ CONTRAST | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $2898.0 | $2028.6 | $418.11 | $1150.04 |
| 73719 | HCPCS | facility | HC MRI, LOWER EXTRM, NO JOINT, W/ CONTRAST | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $3220.0 | $2254.0 | $418.11 | $1150.04 |
| 74182 | HCPCS | facility | HC MRI, ABDOMEN W/CONTRAST | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | $3220.0 | $2254.0 | $418.11 | $1150.04 |
| C8909 | HCPCS | facility | MRA w/cont, chest | $454.56 | $418.11 | $36.45 | 1.09 | 10 | 1 | n/a | n/a | $418.11 | $1150.04 |
| Q5108 | HCPCS | facility | Injection, fulphila | $135.53 | $99.13 | $36.4 | 1.37 | 13 | 1 | n/a | n/a | $98.87 | $248.18 |
| Q5146 | HCPCS | facility | Inj, hercessi, 10 mg | $76.18 | $40.02 | $36.16 | 1.90 | 5 | 1 | n/a | n/a | $37.15 | $76.18 |
| 97110 | HCPCS | facility | HC THERAPEUTIC EXERCISE, 1 OR MORE AREAS, EA 15 MINS | $68.38 | $32.29 | $36.09 | 2.12 | 10 | 1 | $264.0 | $184.8 | $30.36 | $121.09 |
| 97116 | HCPCS | facility | Gait training therapy | $68.06 | $32.29 | $35.77 | 2.11 | 10 | 1 | $161.0 | $112.7 | $30.36 | $121.09 |
| J3398 | HCPCS | facility | Inj luxturna 1 billion vec g | $3038.06 | $3002.58 | $35.48 | 1.01 | 7 | 1 | n/a | n/a | $3002.58 | $3106.75 |
| G0108 | HCPCS | facility | Diab manage trn  per indiv | $92.74 | $57.28 | $35.46 | 1.62 | 13 | 1 | $300.0 | $210.0 | $52.06 | $214.8 |
| 92608 | HCPCS | facility | Ex for speech device rx addl | $88.68 | $53.45 | $35.23 | 1.66 | 6 | 1 | n/a | n/a | $53.45 | $200.44 |
| 41800 | HCPCS | facility | Drainage of gum lesion | $194.45 | $159.45 | $35.0 | 1.22 | 11 | 1 | $248.0 | $173.6 | $121.77 | $1805.48 |
| 97124 | HCPCS | facility | HC MASSAGE | $68.24 | $33.6 | $34.64 | 2.03 | 10 | 1 | $146.0 | $102.2 | $29.66 | $126.0 |
| Q4190 | HCPCS | facility | Artacent ac 1 sq cm | $183.6 | $149.14 | $34.46 | 1.23 | 6 | 1 | n/a | n/a | $129.42 | $314.3 |
| 31000 | HCPCS | facility | Irrigation maxillary sinus | $317.98 | $283.85 | $34.13 | 1.12 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 40490 | HCPCS | facility | Biopsy of lip | $317.98 | $283.85 | $34.13 | 1.12 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 40830 | HCPCS | facility | HC CL LACERA MOUTH VESTIB;<=2.5CM | $317.98 | $283.85 | $34.13 | 1.12 | 11 | 1 | $456.0 | $319.2 | $229.81 | $1151.97 |
| 41005 | HCPCS | facility | Drainage of mouth lesion | $317.98 | $283.85 | $34.13 | 1.12 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 41251 | HCPCS | facility | HC REPAIR TOUNGE LACERATION | $317.98 | $283.85 | $34.13 | 1.12 | 11 | 1 | $1010.0 | $707.0 | $229.81 | $1151.97 |
| 42000 | HCPCS | facility | Drainage mouth roof lesion | $317.98 | $283.85 | $34.13 | 1.12 | 11 | 1 | $788.0 | $551.6 | $229.81 | $1151.97 |
| 42700 | HCPCS | facility | Drainage of tonsil abscess | $317.98 | $283.85 | $34.13 | 1.12 | 11 | 1 | $547.0 | $382.9 | $229.81 | $1805.48 |
| 69100 | HCPCS | facility | Biopsy of external ear | $317.98 | $283.85 | $34.13 | 1.12 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 69420 | HCPCS | facility | Incision of eardrum | $317.98 | $283.85 | $34.13 | 1.12 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 10005 | HCPCS | facility | Fna bx w/us gdn 1st les | $882.435 | $848.66 | $33.775 | 1.04 | 10 | 1 | $1654.0 | $1157.8 | $345.52 | $1151.97 |
| 10007 | HCPCS | facility | Fna bx w/fluor gdn 1st les | $882.435 | $848.66 | $33.775 | 1.04 | 10 | 1 | $1377.0 | $963.9 | $345.52 | $1151.97 |
| 10009 | HCPCS | facility | Fna bx w/ct gdn 1st les | $882.435 | $848.66 | $33.775 | 1.04 | 10 | 1 | $1377.0 | $963.9 | $345.52 | $1151.97 |
| 10011 | HCPCS | facility | Fna bx w/mr gdn 1st les | $882.435 | $848.66 | $33.775 | 1.04 | 10 | 1 | $1377.0 | $963.9 | $345.52 | $1151.97 |
| Q4163 | HCPCS | facility | Amnio bio and woundex sq cm | $182.18 | $149.14 | $33.04 | 1.22 | 9 | 1 | n/a | n/a | $149.14 | $425.13 |
| Q4286 | HCPCS | facility | Nudyn sl or slw, per sq cm | $181.94 | $149.14 | $32.8 | 1.22 | 3 | 1 | n/a | n/a | $149.14 | $181.94 |
| Q4232 | HCPCS | facility | Corplex, per sq cm | $181.93 | $149.14 | $32.79 | 1.22 | 6 | 1 | n/a | n/a | $130.11 | $251.85 |
| 20974 | HCPCS | facility | Electrical bone stimulation | $84.05 | $51.35 | $32.7 | 1.64 | 13 | 1 | n/a | n/a | $51.35 | $552.31 |
| J0840 | HCPCS | facility | Crotalidae poly immune fab | $1861.13 | $1828.72 | $32.41 | 1.02 | 13 | 1 | n/a | n/a | $1762.35 | $2908.21 |
| G0539 | HCPCS | facility | Initial care training 30 m | $72.72 | $40.53 | $32.19 | 1.79 | 5 | 1 | n/a | n/a | $40.53 | $151.99 |
| 97140 | HCPCS | facility | HC MANUAL THERAPY, 1 OR MORE REGIONS, EA 15 MIN | $62.39 | $30.8 | $31.59 | 2.03 | 10 | 1 | $146.0 | $102.2 | $27.91 | $115.5 |
| 96164 | HCPCS | facility | Hlth bhv ivntj grp 1st 30 | $76.06 | $44.9 | $31.16 | 1.69 | 7 | 1 | n/a | n/a | $29.94 | $76.06 |
| 96167 | HCPCS | facility | Hlth bhv ivntj fam 1st 30 | $76.06 | $44.9 | $31.16 | 1.69 | 7 | 1 | n/a | n/a | $29.94 | $76.06 |
| J1454 | HCPCS | facility | Inj fosnetupitant, palonoset | $606.35 | $575.5 | $30.85 | 1.05 | 13 | 1 | n/a | n/a | $445.67 | $695.56 |
| J9293 | HCPCS | facility | Mitoxantrone hydrochl / 5 MG | $54.65 | $23.88 | $30.77 | 2.29 | 13 | 1 | n/a | n/a | $23.88 | $55.74 |
| G0396 | HCPCS | facility | Alcohol/subs interv 15-30mn | $75.58 | $44.9 | $30.68 | 1.68 | 7 | 1 | n/a | n/a | $38.17 | $76.2 |
| 97130 | HCPCS | facility | HC THERAPEUTIC IVNT, COGNITIVE FUNC, DIRECT PT CONTACT, EA ADD 15 MIN | $49.355 | $18.75 | $30.605 | 2.63 | 10 | 1 | $190.0 | $133.0 | $18.75 | $70.31 |
| 97802 | HCPCS | facility | HC MED NUTRI, INITIAL, EA 15 MIN | $57.29 | $27.04 | $30.25 | 2.12 | 13 | 1 | $129.0 | $90.3 | $27.04 | $101.4 |
| P9056 | HCPCS | facility | Blood, l/r, irradiated | $114.66 | $84.55 | $30.11 | 1.36 | 7 | 1 | n/a | n/a | $84.55 | $175.91 |
| 0778T | HCPCS | facility | Smmg cncrnt appl imu snr | $184.21 | $154.21 | $30.0 | 1.19 | 7 | 1 | n/a | n/a | $145.43 | $185.74 |
| 0783T | HCPCS | facility | Tc auriculr neurostimulation | $184.21 | $154.21 | $30.0 | 1.19 | 7 | 1 | n/a | n/a | $145.43 | $185.74 |
| 97129 | HCPCS | facility | HC THERAPEUTIC IVNT, COGNITIVE FUNC, DIRECT PT CONTACT, 1ST 15 MIN | $49.925 | $20.05 | $29.875 | 2.49 | 10 | 1 | $196.0 | $137.2 | $20.05 | $75.19 |
| 92584 | HCPCS | facility | Electrocochleography | $184.02 | $154.21 | $29.81 | 1.19 | 10 | 1 | n/a | n/a | $154.21 | $375.71 |
| G0279 | HCPCS | facility | Tomosynthesis, mammo | $44.94 | $15.15 | $29.79 | 2.97 | 13 | 1 | n/a | n/a | $12.25 | $74.04 |
| 43753 | HCPCS | facility | HC GASTRIC INTUBATION | $288.53 | $258.77 | $29.76 | 1.12 | 11 | 1 | $442.0 | $309.4 | $49.64 | $552.31 |
| 43754 | HCPCS | facility | Dx gastr intub w/asp spec | $288.53 | $258.77 | $29.76 | 1.12 | 11 | 1 | n/a | n/a | $49.64 | $552.31 |
| 76936 | HCPCS | facility | Echo guide for artery repair | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $108.61 | $874.55 |
| 90867 | HCPCS | facility | Tcranial magn stim tx plan | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $184.02 | $721.29 |
| 91037 | HCPCS | facility | Esoph imped function test | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $137.27 | $721.29 |
| 92235 | HCPCS | facility | Fluorescein angrph uni/bi | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $144.89 | $721.29 |
| 92240 | HCPCS | facility | Icg angiography uni/bi | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $144.89 | $721.29 |
| 92242 | HCPCS | facility | Fluorescein icg angiography | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $232.21 | $721.29 |
| 92273 | HCPCS | facility | Full field erg w/i&r | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $144.89 | $721.29 |
| 92587 | HCPCS | facility | Evoked auditory test limited | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $65.29 | $708.3 |
| 92950 | HCPCS | facility | HC CARDIOPULMONARY RESUSCITATION | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | $1056.0 | $739.2 | $160.83 | $721.29 |
| 93017 | HCPCS | facility | Cardiovascular stress test | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | $1686.0 | $1180.2 | $176.82 | $721.29 |
| 94012 | HCPCS | facility | Spirmtry w/brnchdil inf-2 yr | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $45.06 | $696.94 |
| 94015 | HCPCS | facility | Patient recorded spirometry | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $62.87 | $706.94 |
| 94375 | HCPCS | facility | HC FLOW VOLUME LOOP | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | $641.0 | $448.7 | $45.06 | $711.49 |
| 95812 | HCPCS | facility | Eeg 41-60 minutes | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | $1650.0 | $1155.0 | $172.61 | $721.29 |
| 95813 | HCPCS | facility | Eeg over 1 hour | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | $1850.0 | $1295.0 | $172.61 | $721.29 |
| 95816 | HCPCS | facility | Eeg awake and drowsy | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | $1347.0 | $942.9 | $172.61 | $721.29 |
| 95819 | HCPCS | facility | Eeg awake and asleep | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | $1490.0 | $1043.0 | $172.61 | $721.29 |
| 95822 | HCPCS | facility | Eeg coma or sleep only | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $172.61 | $721.29 |
| 95857 | HCPCS | facility | Cholinesterase challenge | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $79.83 | $716.45 |
| 95908 | HCPCS | facility | HC NERVE CONDUCTION, 3-4 STUDIES | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | $480.0 | $336.0 | $43.11 | $721.29 |
| 95909 | HCPCS | facility | HC NERVE CONDUCTION, 5-6 STUDIES | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | $530.0 | $371.0 | $43.11 | $721.29 |
| 95925 | HCPCS | facility | Somatosensory testing | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $184.02 | $721.29 |
| 95926 | HCPCS | facility | Somatosensory testing | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $184.02 | $721.29 |
| 96116 | HCPCS | facility | Neurobehavioral status exam | $288.53 | $258.77 | $29.76 | 1.12 | 10 | 1 | n/a | n/a | $177.31 | $721.29 |
| J1097 | HCPCS | facility | Phenylep ketorolac opth soln | $126.445 | $96.91 | $29.535 | 1.30 | 6 | 1 | n/a | n/a | $96.91 | $134.52 |
| 76873 | HCPCS | facility | Echograp trans r pros study | $154.74 | $125.29 | $29.45 | 1.24 | 10 | 1 | n/a | n/a | $125.29 | $334.27 |
| 93882 | HCPCS | facility | Extracranial uni/ltd study | $154.74 | $125.29 | $29.45 | 1.24 | 10 | 1 | $1362.0 | $953.4 | $125.29 | $275.69 |
| 93976 | HCPCS | facility | HC DUPLEX SCAN ARTERIAL INFLOW/VENOUS OUT;LIMITED | $154.74 | $125.29 | $29.45 | 1.24 | 10 | 1 | $714.0 | $499.8 | $125.29 | $280.23 |
| 93980 | HCPCS | facility | Penile vascular study | $154.74 | $125.29 | $29.45 | 1.24 | 10 | 1 | n/a | n/a | $125.29 | $275.69 |
| 93981 | HCPCS | facility | Penile vascular study | $154.74 | $125.29 | $29.45 | 1.24 | 10 | 1 | n/a | n/a | $125.29 | $280.23 |
| P9019 | HCPCS | facility | Platelets, each unit | $82.52 | $53.17 | $29.35 | 1.55 | 7 | 1 | n/a | n/a | $53.17 | $91.61 |
| Q4157 | HCPCS | facility | Revitalon 1 square cm | $178.13 | $149.14 | $28.99 | 1.19 | 3 | 1 | n/a | n/a | $149.14 | $178.13 |
| M0249 | HCPCS | facility | Adm tocilizu covid-19 1st | $557.1 | $528.45 | $28.65 | 1.05 | 7 | 1 | n/a | n/a | $450.0 | $557.1 |
| M0250 | HCPCS | facility | Adm tocilizu covid-19 2nd | $557.1 | $528.45 | $28.65 | 1.05 | 7 | 1 | n/a | n/a | $450.0 | $557.1 |
| P9100 | HCPCS | facility | HC PATHOGEN(S) TEST FOR PLATELETS | $98.44 | $70.7 | $27.74 | 1.39 | 6 | 1 | $111.0 | $77.7 | $29.16 | $99.25 |
| 27165 | HCPCS | facility | Incision/fixation of femur | $8723.6 | $8696.19 | $27.41 | 1.00 | 8 | 1 | n/a | n/a | $1469.23 | $8915.56 |
| 27170 | HCPCS | facility | Repair/graft femur head/neck | $8723.6 | $8696.19 | $27.41 | 1.00 | 8 | 1 | n/a | n/a | $1252.24 | $8915.56 |
| 27724 | HCPCS | facility | Repair/graft of tibia | $8723.6 | $8696.19 | $27.41 | 1.00 | 8 | 1 | n/a | n/a | $1349.68 | $8915.56 |
| 99406 | HCPCS | facility | Behav chng smoking 3-10 min | $72.19 | $44.9 | $27.29 | 1.61 | 7 | 1 | n/a | n/a | $38.17 | $72.79 |
| 99407 | HCPCS | facility | Behav chng smoking > 10 min | $72.19 | $44.9 | $27.29 | 1.61 | 7 | 1 | n/a | n/a | $38.17 | $72.79 |
| 97033 | HCPCS | facility | Electric current therapy | $46.395 | $19.64 | $26.755 | 2.36 | 10 | 1 | $295.0 | $206.5 | $19.64 | $73.65 |
| Q2049 | HCPCS | facility | Imported Lipodox inj | $325.04 | $298.74 | $26.3 | 1.09 | 10 | 1 | n/a | n/a | $277.68 | $546.82 |
| 97552 | HCPCS | facility | Group caregiver training | $35.55 | $9.48 | $26.07 | 3.75 | 5 | 1 | $31.0 | $21.7 | $9.48 | $37.77 |
| 94680 | HCPCS | facility | Exhaled air analysis o2 | $179.86 | $154.21 | $25.65 | 1.17 | 10 | 1 | n/a | n/a | $154.21 | $375.71 |
| 98980 | HCPCS | facility | Rem ther mntr 1st 20 min | $51.5 | $26.06 | $25.44 | 1.98 | 5 | 1 | n/a | n/a | $26.06 | $97.72 |
| 98966 | HCPCS | facility | Hc pro phone call 5-10 min | $35.94 | $10.51 | $25.43 | 3.42 | 7 | 1 | n/a | n/a | $10.51 | $39.41 |
| 97803 | HCPCS | facility | HC MED NUTRI, RE-EVAL, EA 15 MIN | $48.94 | $23.92 | $25.02 | 2.05 | 13 | 1 | $108.0 | $75.6 | $23.92 | $89.7 |
| 97022 | HCPCS | facility | Whirlpool therapy | $41.125 | $16.23 | $24.895 | 2.53 | 10 | 1 | n/a | n/a | $16.23 | $60.86 |
| 90675 | HCPCS | facility | Rabies vaccine im | $338.49 | $313.68 | $24.81 | 1.08 | 13 | 1 | $672.21 | $470.55 | $312.03 | $364.21 |
| 98981 | HCPCS | facility | Rem ther mntr ea addl 20 min | $51.39 | $26.89 | $24.5 | 1.91 | 5 | 1 | n/a | n/a | $26.89 | $100.84 |
| J1190 | HCPCS | facility | Dexrazoxane hcl injection | $87.49 | $63.06 | $24.43 | 1.39 | 13 | 1 | n/a | n/a | $32.09 | $195.98 |
| 92508 | HCPCS | facility | HC SPEECH TREATMENT, GROUP | $49.06 | $24.83 | $24.23 | 1.98 | 10 | 1 | $417.0 | $291.9 | $24.83 | $93.11 |
| G0560 | HCPCS | facility | Safety plan interven | $65.6 | $41.39 | $24.21 | 1.58 | 5 | 1 | n/a | n/a | $41.39 | $155.21 |
| 86999 | HCPCS | facility | Transfusion procedure | $58.59 | $34.66 | $23.93 | 1.69 | 7 | 1 | n/a | n/a | $17.96 | $59.08 |
| 86486 | HCPCS | facility | Skin test nos antigen | $58.5 | $34.66 | $23.84 | 1.69 | 7 | 1 | n/a | n/a | $6.82 | $58.98 |
| J9331 | HCPCS | facility | Inj sirolimus prot part 1 mg | $108.31 | $84.57 | $23.74 | 1.28 | 12 | 1 | n/a | n/a | $84.53 | $114.21 |
| P9099 | HCPCS | facility | Blood component/product noc | $58.885 | $35.32 | $23.565 | 1.67 | 4 | 1 | n/a | n/a | $35.32 | $59.13 |
| 78801 | HCPCS | facility | HC RADIOPHARM LOC TUMOR; 2+AREAS 1+DAYIMG/1 AREA  IMG >2+ DAY | $502.54 | $479.1 | $23.44 | 1.05 | 10 | 1 | $785.0 | $549.5 | $404.24 | $1213.38 |
| A9551 | HCPCS | facility | Tc99m succimer | $683.34 | $659.93 | $23.41 | 1.04 | 3 | 1 | n/a | n/a | $659.93 | $683.34 |
| 72126 | HCPCS | facility | Ct neck spine w/dye | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | $2744.0 | $1920.8 | $297.15 | $1150.04 |
| 72132 | HCPCS | facility | Ct lumbar spine w/dye | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | $2889.0 | $2022.3 | $297.15 | $1150.04 |
| 73040 | HCPCS | facility | Contrast x-ray of shoulder | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | $1612.0 | $1128.4 | $298.67 | $1150.04 |
| 73085 | HCPCS | facility | Contrast x-ray of elbow | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | n/a | n/a | $298.67 | $1150.04 |
| 73115 | HCPCS | facility | Contrast x-ray of wrist | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | n/a | n/a | $298.67 | $1150.04 |
| 73201 | HCPCS | facility | Ct upper extremity w/dye | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | $2678.0 | $1874.6 | $297.15 | $1150.04 |
| 73525 | HCPCS | facility | Contrast x-ray of hip | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | n/a | n/a | $298.67 | $1150.04 |
| 73580 | HCPCS | facility | Contrast x-ray of knee joint | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | n/a | n/a | $298.67 | $1150.04 |
| 73615 | HCPCS | facility | Contrast x-ray of ankle | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | n/a | n/a | $298.67 | $1150.04 |
| 74420 | HCPCS | facility | Contrst x-ray urinary tract | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | $672.0 | $470.4 | $209.55 | $1150.04 |
| 74425 | HCPCS | facility | Contrst x-ray urinary tract | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | $707.0 | $494.9 | $209.55 | $1150.04 |
| 74430 | HCPCS | facility | Contrast x-ray bladder | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | $1040.0 | $728.0 | $209.55 | $1150.04 |
| C8924 | HCPCS | facility | 2d tte w or w/o fol w/con,fu | $441.28 | $418.11 | $23.17 | 1.06 | 10 | 1 | n/a | n/a | $418.11 | $1150.04 |
| 93025 | HCPCS | facility | Microvolt t-wave assess | $176.82 | $154.21 | $22.61 | 1.15 | 10 | 1 | n/a | n/a | $154.21 | $375.71 |
| 90901 | HCPCS | facility | Biofeedback train any meth | $39.81 | $17.34 | $22.47 | 2.30 | 12 | 1 | $177.0 | $123.9 | $17.34 | $122.75 |
| J9280 | HCPCS | facility | Mitomycin injection | $42.51 | $20.35 | $22.16 | 2.09 | 13 | 1 | $328.44 | $229.91 | $20.35 | $56.73 |
| 93298 | HCPCS | facility | Ilr device interrogat remote | $66.82 | $44.73 | $22.09 | 1.49 | 7 | 1 | n/a | n/a | $43.82 | $67.37 |
| 90377 | HCPCS | facility | Rabies ig ht&sol human im/sc | $244.24 | $222.25 | $21.99 | 1.10 | 12 | 1 | $1000.71 | $700.5 | $222.25 | $265.51 |
| 93270 | HCPCS | facility | HC EXTERNAL PT ACTIVATED ECG RECORD MONITOR 30 DAYS | $66.52 | $44.73 | $21.79 | 1.49 | 10 | 1 | $294.0 | $205.8 | $42.49 | $91.53 |
| J9282 | HCPCS | facility | Mitomycin intravesical inst | $306.38 | $284.88 | $21.5 | 1.08 | 2 | 1 | n/a | n/a | $284.88 | $306.38 |
| 79200 | HCPCS | facility | Nuclear rx intracav admin | $301.01 | $279.64 | $21.37 | 1.08 | 10 | 1 | n/a | n/a | $264.04 | $772.2 |
| 79403 | HCPCS | facility | Hematopoietic nuclear tx | $301.01 | $279.64 | $21.37 | 1.08 | 10 | 1 | n/a | n/a | $264.04 | $772.2 |
| 79440 | HCPCS | facility | Nuclear rx intra-articular | $301.01 | $279.64 | $21.37 | 1.08 | 10 | 1 | n/a | n/a | $264.04 | $772.2 |
| J2840 | HCPCS | facility | Inj sebelipase alfa 1 mg | $561.25 | $539.91 | $21.34 | 1.04 | 10 | 1 | n/a | n/a | $520.71 | $581.97 |
| Q4285 | HCPCS | facility | Nudyn dl or dl mesh pr sq cm | $170.17 | $149.14 | $21.03 | 1.14 | 3 | 1 | n/a | n/a | $149.14 | $170.17 |
| 97150 | HCPCS | facility | Group therapeutic procedures | $40.685 | $19.95 | $20.735 | 2.04 | 10 | 1 | $157.0 | $109.9 | $18.14 | $74.81 |
| 74210 | HCPCS | facility | Contrst x-ray exam of throat | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | n/a | n/a | $82.72 | $562.93 |
| 74220 | HCPCS | facility | Contrast x-ray esophagus | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | $693.0 | $485.1 | $82.72 | $562.93 |
| 74240 | HCPCS | facility | HC X-RAY EXAM, ESOPHAGUS; SINGLE CONTRAST STUDY | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | $913.0 | $639.1 | $122.82 | $562.93 |
| 74246 | HCPCS | facility | Contrst x-ray uppr gi tract | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | $1079.0 | $755.3 | $122.82 | $562.93 |
| 74270 | HCPCS | facility | Contrast x-ray exam of colon | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | $1264.0 | $884.8 | $122.82 | $562.93 |
| 74280 | HCPCS | facility | Contrast x-ray exam of colon | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | $1264.0 | $884.8 | $122.82 | $562.93 |
| 74283 | HCPCS | facility | Contrast x-ray exam of colon | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | n/a | n/a | $122.82 | $562.93 |
| 74290 | HCPCS | facility | Contrast x-ray gallbladder | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | n/a | n/a | $82.72 | $562.93 |
| 74400 | HCPCS | facility | Contrst x-ray urinary tract | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | $1450.0 | $1015.0 | $209.55 | $562.93 |
| 74410 | HCPCS | facility | Contrst x-ray urinary tract | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | n/a | n/a | $209.55 | $562.93 |
| 74415 | HCPCS | facility | Contrst x-ray urinary tract | $230.7 | $210.21 | $20.49 | 1.10 | 10 | 1 | n/a | n/a | $209.55 | $562.93 |
| 93271 | HCPCS | facility | Ecg/monitoring and analysis | $134.41 | $113.94 | $20.47 | 1.18 | 10 | 1 | $493.0 | $345.1 | $111.47 | $256.72 |
| 93750 | HCPCS | facility | Interrogation vad in person | $134.41 | $113.94 | $20.47 | 1.18 | 10 | 1 | n/a | n/a | $111.47 | $256.72 |
| 95971 | HCPCS | facility | Analyze neurostim simple | $134.41 | $113.94 | $20.47 | 1.18 | 10 | 1 | $285.0 | $199.5 | $111.47 | $256.72 |
| 95972 | HCPCS | facility | Analyze neurostim complex | $134.41 | $113.94 | $20.47 | 1.18 | 10 | 1 | $247.0 | $172.9 | $111.47 | $256.72 |
| 95977 | HCPCS | facility | Alys cplx cn npgt prgrmg | $134.41 | $113.94 | $20.47 | 1.18 | 10 | 1 | n/a | n/a | $111.47 | $256.72 |
| P9058 | HCPCS | facility | RBC, l/r, cmv-neg, irrad | $269.63 | $249.4 | $20.23 | 1.08 | 7 | 1 | n/a | n/a | $249.4 | $286.56 |
| G0117 | HCPCS | facility | Glaucoma scrn hgh risk direc | $54.85 | $34.66 | $20.19 | 1.58 | 7 | 1 | n/a | n/a | $34.66 | $74.07 |
| J2515 | HCPCS | facility | Pentobarbital sodium inj | $48.17 | $27.99 | $20.18 | 1.72 | 3 | 1 | $3950.78 | $2765.55 | $27.99 | $48.17 |
| 74176 | HCPCS | facility | Ct abd & pelvis w/o contrast | $306.05 | $285.95 | $20.1 | 1.07 | 10 | 1 | $3857.0 | $2699.9 | $263.66 | $730.4 |
| 97813 | HCPCS | facility | Acupunct w/stimul 15 min | $54.52 | $34.66 | $19.86 | 1.57 | 7 | 1 | n/a | n/a | $34.66 | $55.73 |
| 97034 | HCPCS | facility | Contrast bath therapy | $33.93 | $14.43 | $19.5 | 2.35 | 10 | 1 | n/a | n/a | $14.43 | $54.11 |
| 20560 | HCPCS | facility | HC NEEDLE INSERTION(S) W/O INJECTION(S); 1 OR 2 MUSCLE(S) | $54.07 | $34.66 | $19.41 | 1.56 | 6 | 1 | $87.0 | $60.9 | $27.52 | $54.52 |
| 20561 | HCPCS | facility | HC NEEDLE INSERTION(S) W/O INJECTION(S); 3 OR MORE MUSCLE(S) | $54.07 | $34.66 | $19.41 | 1.56 | 6 | 1 | $101.0 | $70.7 | $34.66 | $54.52 |
| 97810 | HCPCS | facility | Acupunct w/o stimul 15 min | $54.07 | $34.66 | $19.41 | 1.56 | 7 | 1 | n/a | n/a | $34.66 | $54.52 |
| G2011 | HCPCS | facility | Alcohol/sub abuse assess | $54.07 | $34.66 | $19.41 | 1.56 | 7 | 1 | n/a | n/a | $19.63 | $54.52 |
| 92700 | HCPCS | facility | Ent procedure/service | $53.88 | $34.66 | $19.22 | 1.55 | 4 | 1 | n/a | n/a | $34.66 | $54.1 |
| 86510 | HCPCS | facility | Histoplasmosis skin test | $63.92 | $44.76 | $19.16 | 1.43 | 9 | 1 | n/a | n/a | $6.82 | $179.36 |
| 92285 | HCPCS | facility | Eye photography | $63.92 | $44.76 | $19.16 | 1.43 | 10 | 1 | n/a | n/a | $44.76 | $147.93 |
| Q5126 | HCPCS | facility | Inj alymsys 10 mg | $56.86 | $37.82 | $19.04 | 1.50 | 12 | 1 | n/a | n/a | $33.01 | $79.6 |
| 51792 | HCPCS | facility | Urinary reflex study | $89.27 | $70.7 | $18.57 | 1.26 | 10 | 1 | n/a | n/a | $63.92 | $147.93 |
| 95146 | HCPCS | facility | Antigen therapy services | $74.69 | $56.12 | $18.57 | 1.33 | 10 | 1 | n/a | n/a | $43.32 | $109.06 |
| 96423 | HCPCS | facility | Chemo ia infuse each addl hr | $74.69 | $56.12 | $18.57 | 1.33 | 10 | 1 | n/a | n/a | $43.32 | $109.06 |
| 92499 | HCPCS | facility | Eye service or procedure | $53.18 | $34.66 | $18.52 | 1.53 | 4 | 1 | n/a | n/a | $34.66 | $53.4 |
| 93246 | HCPCS | facility | Ext ecg>7d<15d recording | $63.27 | $44.76 | $18.51 | 1.41 | 10 | 1 | $256.0 | $179.2 | $44.76 | $172.99 |
| 97032 | HCPCS | facility | Electrical stimulation | $33.18 | $15.08 | $18.1 | 2.20 | 10 | 1 | $146.0 | $102.2 | $15.0 | $56.55 |
| 97012 | HCPCS | facility | HC TRACTION, MECHANICAL | $32.655 | $14.74 | $17.915 | 2.22 | 10 | 1 | $146.0 | $102.2 | $14.74 | $55.28 |
| 20100 | HCPCS | facility | Explore wound neck | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | n/a | n/a | $498.57 | $1805.48 |
| 21400 | HCPCS | facility | Closed tx orbit w/o manipulj | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | n/a | n/a | $498.57 | $4303.61 |
| 31615 | HCPCS | facility | HC VISUALIZATION OF WINDPIPE | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | $1578.0 | $1104.6 | $498.57 | $1805.48 |
| 40650 | HCPCS | facility | HC REPAIR LIP | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | $1010.0 | $707.0 | $498.57 | $6735.22 |
| 40652 | HCPCS | facility | Repair lip | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | n/a | n/a | $498.57 | $6735.22 |
| 40801 | HCPCS | facility | Drainage of mouth lesion | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | $1235.0 | $864.5 | $498.57 | $4303.61 |
| 40831 | HCPCS | facility | Repair mouth laceration | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | n/a | n/a | $498.57 | $1805.48 |
| 41000 | HCPCS | facility | Drainage of mouth lesion | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | $2002.0 | $1401.4 | $498.57 | $1805.48 |
| 41100 | HCPCS | facility | Biopsy of tongue | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | n/a | n/a | $498.57 | $1805.48 |
| 69222 | HCPCS | facility | Clean out mastoid cavity | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | n/a | n/a | $498.57 | $1805.48 |
| 69433 | HCPCS | facility | Create eardrum opening | $663.93 | $646.36 | $17.57 | 1.03 | 11 | 1 | n/a | n/a | $498.57 | $1805.48 |
| G0540 | HCPCS | facility | Train for caregiver add 15 | $39.05 | $21.49 | $17.56 | 1.82 | 5 | 1 | n/a | n/a | $21.49 | $80.59 |
| 93998 | HCPCS | facility | HC UNLISTED NONINVASIVE VASCULAR DIAGNOSTICE STUDY | $52.18 | $34.66 | $17.52 | 1.51 | 7 | 1 | $82.0 | $57.4 | $23.43 | $52.61 |
| 97551 | HCPCS | facility | Caregiver traing ea addl 15 | $38.94 | $21.49 | $17.45 | 1.81 | 5 | 1 | $70.0 | $49.0 | $21.49 | $80.59 |
| 97035 | HCPCS | facility | HC ULTRASOUND, EA 15 MINS | $32.12 | $14.78 | $17.34 | 2.17 | 10 | 1 | $146.0 | $102.2 | $14.66 | $55.42 |
| P9070 | HCPCS | facility | Pathogen reduced plasma pool | $73.08 | $55.78 | $17.3 | 1.31 | 9 | 1 | n/a | n/a | $47.38 | $77.77 |
| 20979 | HCPCS | facility | Us bone stimulation | $51.855 | $34.66 | $17.195 | 1.50 | 10 | 1 | n/a | n/a | $19.63 | $65.08 |
| 77063 | HCPCS | facility | Breast tomosynthesis bi | $44.94 | $27.92 | $17.02 | 1.61 | 13 | 1 | $125.0 | $87.5 | $12.25 | $104.7 |
| Q5129 | HCPCS | facility | Inj, vegzelma, 10 mg | $56.82 | $39.96 | $16.86 | 1.42 | 12 | 1 | n/a | n/a | $38.16 | $72.91 |
| G0281 | HCPCS | facility | Elec stim unattend for press | $29.585 | $12.94 | $16.645 | 2.29 | 10 | 1 | n/a | n/a | $12.94 | $48.52 |
| 96202 | HCPCS | facility | Mlt fam grp bhv train 1st 60 | $34.37 | $18.44 | $15.93 | 1.86 | 5 | 1 | n/a | n/a | $18.44 | $69.15 |
| G2252 | HCPCS | facility | Brief chkin by md/qhp, 11-20 | $38.53 | $22.6 | $15.93 | 1.70 | 6 | 1 | n/a | n/a | $22.6 | $84.75 |
| J1930 | HCPCS | facility | Lanreotide injection | $49.97 | $34.05 | $15.92 | 1.47 | 13 | 1 | n/a | n/a | $34.05 | $68.46 |
| 95199 | HCPCS | facility | Allergy immunology services | $50.545 | $34.66 | $15.885 | 1.46 | 4 | 1 | n/a | n/a | $34.66 | $50.75 |
| J8510 | HCPCS | facility | Oral busulfan | $25.44 | $10.12 | $15.32 | 2.51 | 6 | 1 | n/a | n/a | $10.12 | $156.6 |
| C2641 | HCPCS | facility | Brachytx, non-stranded,P-103 | $79.77 | $64.48 | $15.29 | 1.24 | 10 | 1 | n/a | n/a | $64.48 | $85.84 |
| 94016 | HCPCS | facility | Review patient spirometry | $41.96 | $26.7 | $15.26 | 1.57 | 13 | 1 | n/a | n/a | $24.16 | $100.12 |
| Q5112 | HCPCS | facility | Inj ontruzant 10 mg | $34.17 | $19.0 | $15.17 | 1.80 | 13 | 1 | n/a | n/a | $19.0 | $88.17 |
| J0802 | HCPCS | facility | Inj. (ani), up to 40 units | $3549.53 | $3534.6 | $14.93 | 1.00 | 12 | 1 | n/a | n/a | $3416.97 | $3634.03 |
| J7354 | HCPCS | facility | Cantharidin top, applicator | $669.59 | $654.76 | $14.83 | 1.02 | 8 | 1 | n/a | n/a | $654.76 | $719.58 |
| P9016 | HCPCS | facility | HC RBC,LEUKOCYTES REDUCED,EA UNIT | $199.74 | $184.91 | $14.83 | 1.08 | 9 | 1 | $741.0 | $518.7 | $184.91 | $211.31 |
| 98967 | HCPCS | facility | Hc pro phone call 11-20 min | $35.94 | $21.17 | $14.77 | 1.70 | 7 | 1 | n/a | n/a | $21.17 | $79.39 |
| 95782 | HCPCS | facility | HC POLYSOMNOGRAPHY; <6 YRS, SLEEP STAGE 4/+, ATTENDED TECH | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | $3397.0 | $2377.9 | $806.13 | $2408.54 |
| 95783 | HCPCS | facility | HC COMP SLEEP STUDY; <6 YRS, W/CPAP, STAGING & 4/+ PARAMETERS | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | $3546.0 | $2482.2 | $806.13 | $2408.54 |
| 95808 | HCPCS | facility | Polysom any age 1-3> param | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | n/a | n/a | $806.13 | $2408.54 |
| 95810 | HCPCS | facility | HC COMP SLEEP STUDY W/O CPAP, +6 | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | $5162.0 | $3613.4 | $806.13 | $2408.54 |
| 95811 | HCPCS | facility | HC COMP SLEEP STUDY W/CPAP, 6+ | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | $5469.0 | $3828.3 | $806.13 | $2408.54 |
| 95928 | HCPCS | facility | C motor evoked uppr limbs | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | n/a | n/a | $79.83 | $2405.21 |
| 95939 | HCPCS | facility | C motor evoked upr&lwr limbs | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | n/a | n/a | $79.83 | $2405.21 |
| 95958 | HCPCS | facility | EEG monitoring/function test | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | n/a | n/a | $172.61 | $2408.54 |
| 95961 | HCPCS | facility | Electrode stimulation brain | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | n/a | n/a | $184.02 | $2408.54 |
| 95966 | HCPCS | facility | Meg evoked single | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | n/a | n/a | $978.25 | $2408.54 |
| 96001 | HCPCS | facility | Motion test w/ft press meas | $1043.83 | $1029.15 | $14.68 | 1.01 | 10 | 1 | n/a | n/a | $184.02 | $2402.21 |
| 97016 | HCPCS | facility | Vasopneumatic device therapy | $27.865 | $13.34 | $14.525 | 2.09 | 10 | 1 | n/a | n/a | $13.34 | $50.02 |
| 97804 | HCPCS | facility | HC MED NUTRI, INITIAL GROUP, EA 30 MIN | $26.84 | $12.62 | $14.22 | 2.13 | 13 | 1 | $146.0 | $102.2 | $12.62 | $47.32 |
| 70332 | HCPCS | facility | X-ray exam of jaw joint | $298.67 | $285.95 | $12.72 | 1.04 | 10 | 1 | n/a | n/a | $263.66 | $730.4 |
| A9517 | HCPCS | facility | I131 iodide cap, rx | $36.41 | $24.07 | $12.34 | 1.51 | 10 | 1 | n/a | n/a | $20.85 | $40.7 |
| Q5123 | HCPCS | facility | Inj. riabni, 10 mg | $38.65 | $26.51 | $12.14 | 1.46 | 12 | 1 | n/a | n/a | $20.9 | $50.79 |
| A9587 | HCPCS | facility | Gallium ga-68 | $61.265 | $49.63 | $11.635 | 1.23 | 6 | 1 | n/a | n/a | $49.63 | $73.89 |
| 77402 | HCPCS | facility | Radiation treatment delivery | $133.78 | $122.28 | $11.5 | 1.09 | 10 | 1 | n/a | n/a | $95.5 | $379.23 |
| 77789 | HCPCS | facility | Apply surf ldr radionuclide | $133.78 | $122.28 | $11.5 | 1.09 | 10 | 1 | n/a | n/a | $95.5 | $379.23 |
| 95851 | HCPCS | facility | Range of motion measurements | $18.22 | $6.75 | $11.47 | 2.70 | 13 | 1 | n/a | n/a | $6.75 | $25.31 |
| 12035 | HCPCS | facility | HC REPAIR, INTERMED-SCALP,AXILLAE,TRUNK,EXTREM(EXCL HANDS&FEET); 12.6-20.0 | $498.62 | $487.19 | $11.43 | 1.02 | 11 | 1 | $590.0 | $413.0 | $251.48 | $1151.97 |
| G0283 | HCPCS | facility | Elec stim other than wound | $24.19 | $13.06 | $11.13 | 1.85 | 12 | 1 | n/a | n/a | $13.06 | $48.98 |
| 12018 | HCPCS | facility | Rpr f/e/e/n/l/m >30.0 cm | $251.48 | $240.45 | $11.03 | 1.05 | 11 | 1 | n/a | n/a | $101.98 | $4303.61 |
| J2353 | HCPCS | facility | Octreotide injection, depot | $214.49 | $203.58 | $10.91 | 1.05 | 13 | 1 | n/a | n/a | $193.72 | $216.27 |
| 0473T | HCPCS | facility | Reprgrmg io rta eltrd ra | $124.79 | $113.94 | $10.85 | 1.10 | 6 | 1 | n/a | n/a | $113.94 | $134.41 |
| G0421 | HCPCS | facility | Ed svc CKD grp per session | $40.67 | $29.84 | $10.83 | 1.36 | 3 | 1 | n/a | n/a | $29.84 | $111.9 |
| 98972 | HCPCS | facility | Qnhp ol dig e/m svc 21+ min | $40.19 | $29.49 | $10.7 | 1.36 | 3 | 1 | n/a | n/a | $29.49 | $110.59 |
| J9027 | HCPCS | facility | Clofarabine injection | $14.72 | $4.19 | $10.53 | 3.51 | 13 | 1 | n/a | n/a | $4.19 | $30.18 |
| 0589T | HCPCS | facility | Elec alys smpl prgrmg iins | $124.3 | $113.94 | $10.36 | 1.09 | 10 | 1 | n/a | n/a | $113.41 | $256.72 |
| 0590T | HCPCS | facility | Elec alys cplx prgrmg iins | $124.3 | $113.94 | $10.36 | 1.09 | 10 | 1 | n/a | n/a | $113.41 | $256.72 |
| C9307 | HCPCS | facility | Inj linvoseltamab-gcpt 1 mg | $107.16 | $96.82 | $10.34 | 1.11 | 2 | 1 | n/a | n/a | $96.82 | $107.16 |
| 70370 | HCPCS | facility | Throat x-ray & fluoroscopy | $114.26 | $104.29 | $9.97 | 1.10 | 10 | 1 | n/a | n/a | $71.24 | $267.99 |
| Q5147 | HCPCS | facility | Inj, aflibercept-ayyh, 1 mg | $869.08 | $859.36 | $9.72 | 1.01 | 5 | 1 | n/a | n/a | $859.36 | $869.08 |
| 97028 | HCPCS | facility | Ultraviolet therapy | $18.93 | $9.46 | $9.47 | 2.00 | 10 | 1 | n/a | n/a | $9.46 | $35.48 |
| Q4186 | HCPCS | facility | Epifix 1 sq cm | $158.49 | $149.14 | $9.35 | 1.06 | 9 | 1 | $555.0 | $388.5 | $149.14 | $159.86 |
| 95803 | HCPCS | facility | Actigraphy testing | $79.83 | $70.7 | $9.13 | 1.13 | 10 | 1 | n/a | n/a | $63.92 | $147.93 |
| J0654 | HCPCS | facility | Inj, liothyronine, 1 mcg | $50.24 | $41.19 | $9.05 | 1.22 | 2 | 1 | n/a | n/a | $41.19 | $50.24 |
| 97024 | HCPCS | facility | Diathermy eg microwave | $16.605 | $7.58 | $9.025 | 2.19 | 10 | 1 | n/a | n/a | $7.58 | $28.42 |
| J7323 | HCPCS | facility | Euflexxa inj per dose | $121.31 | $112.45 | $8.86 | 1.08 | 13 | 1 | n/a | n/a | $105.46 | $136.78 |
| G2251 | HCPCS | facility | Brief chkin, 5-10, non-e/m | $20.15 | $11.38 | $8.77 | 1.77 | 6 | 1 | n/a | n/a | $11.38 | $42.68 |
| J2792 | HCPCS | facility | Rho(D) immune globulin h, sd | $33.91 | $25.46 | $8.45 | 1.33 | 13 | 1 | $3040.785 | $2128.55 | $25.46 | $36.37 |
| J1932 | HCPCS | facility | Inj, lanreotide, (cipla) 1mg | $38.22 | $29.84 | $8.38 | 1.28 | 12 | 1 | n/a | n/a | $24.45 | $63.63 |
| J7324 | HCPCS | facility | Orthovisc inj per dose | $122.91 | $114.54 | $8.37 | 1.07 | 13 | 1 | n/a | n/a | $97.7 | $156.2 |
| J0177 | HCPCS | facility | Inj, aflibercept hd, 1 mg | $319.74 | $311.38 | $8.36 | 1.03 | 8 | 1 | n/a | n/a | $306.99 | $335.71 |
| 97018 | HCPCS | facility | HC PARAFFIN BATH | $15.105 | $6.77 | $8.335 | 2.23 | 10 | 1 | $146.0 | $102.2 | $6.77 | $25.39 |
| P9040 | HCPCS | facility | HC RBC,LEUKO REDUCE,IRRAD,EA UNIT | $273.64 | $265.41 | $8.23 | 1.03 | 9 | 1 | $985.0 | $689.5 | $265.41 | $292.27 |
| J2781 | HCPCS | facility | Inj, pegcetacoplan, 1mg | $147.36 | $139.18 | $8.18 | 1.06 | 12 | 1 | n/a | n/a | $138.05 | $160.43 |
| 97026 | HCPCS | facility | Infrared therapy | $14.91 | $6.87 | $8.04 | 2.17 | 10 | 1 | n/a | n/a | $6.87 | $25.76 |
| P9073 | HCPCS | facility | HC PLATELETS, PHERESIS PATHOGEN-REDUCED, EACH UNIT | $615.4 | $607.43 | $7.97 | 1.01 | 6 | 1 | $1561.0 | $1092.7 | $607.43 | $714.64 |
| 95027 | HCPCS | facility | Icut allergy titrate-airborn | $42.57 | $34.66 | $7.91 | 1.23 | 10 | 1 | n/a | n/a | $24.8 | $54.52 |
| J1327 | HCPCS | facility | Eptifibatide injection | $10.84 | $2.99 | $7.85 | 3.63 | 11 | 1 | $288.38 | $201.865 | $2.99 | $30.92 |
| G0109 | HCPCS | facility | Diab manage trn ind/group | $25.55 | $17.76 | $7.79 | 1.44 | 13 | 1 | $178.0 | $124.6 | $13.95 | $66.6 |
| G0270 | HCPCS | facility | HC MED NUTRI THERAPY; REASSESS/SUBSEQ INTVNT, CHNG DX, SINGLE | $31.61 | $23.92 | $7.69 | 1.32 | 8 | 1 | $182.0 | $127.4 | $23.92 | $89.7 |
| J9323 | HCPCS | facility | Inj pemetrexed ditromethamin | $7.78 | $0.12 | $7.66 | 64.83 | 12 | 1 | n/a | n/a | $0.12 | $10.34 |
| Q2050 | HCPCS | facility | Doxorubicin inj 10mg | $116.07 | $108.47 | $7.6 | 1.07 | 13 | 1 | $573.64 | $401.55 | $104.01 | $298.8 |
| 95852 | HCPCS | facility | Range of motion measurements | $12.62 | $5.05 | $7.57 | 2.50 | 13 | 1 | n/a | n/a | $5.05 | $18.94 |
| J2820 | HCPCS | facility | Sargramostim injection | $57.93 | $50.36 | $7.57 | 1.15 | 13 | 1 | n/a | n/a | $48.83 | $61.75 |
| J1628 | HCPCS | facility | Inj., guselkumab, 1 mg | $83.49 | $75.97 | $7.52 | 1.10 | 13 | 1 | n/a | n/a | $72.94 | $141.5 |
| 98971 | HCPCS | facility | Qnhp ol dig em svc 11-20min | $26.35 | $19.33 | $7.02 | 1.36 | 3 | 1 | n/a | n/a | $19.33 | $72.49 |
| J1610 | HCPCS | facility | Glucagon hydrochloride/1 mg | $189.46 | $182.45 | $7.01 | 1.04 | 13 | 1 | $366.6 | $256.62 | $164.86 | $195.79 |
| P9012 | HCPCS | facility | Cryoprecipitate each unit | $78.64 | $71.95 | $6.69 | 1.09 | 9 | 1 | $243.0 | $170.1 | $56.49 | $79.74 |
| Q5114 | HCPCS | facility | Inj  ogivri 10 mg | $46.97 | $40.29 | $6.68 | 1.17 | 13 | 1 | n/a | n/a | $37.71 | $73.06 |
| J1573 | HCPCS | facility | Hepagam B intravenous, inj | $73.17 | $66.64 | $6.53 | 1.10 | 13 | 1 | n/a | n/a | $66.64 | $96.71 |
| 98968 | HCPCS | facility | Hc pro phone call 21-30 min | $35.94 | $29.5 | $6.44 | 1.22 | 7 | 1 | n/a | n/a | $29.5 | $110.62 |
| J9304 | HCPCS | facility | Inj. pemetrexed, 10 mg | $52.74 | $46.32 | $6.42 | 1.14 | 12 | 1 | n/a | n/a | $39.93 | $79.2 |
| 42400 | HCPCS | facility | Biopsy of salivary gland | $855.06 | $848.66 | $6.4 | 1.01 | 11 | 1 | $1362.0 | $953.4 | $625.24 | $1805.48 |
| Q5160 | HCPCS | facility | Inj, jobevne, 10 mg | $90.74 | $84.38 | $6.36 | 1.08 | 2 | 1 | n/a | n/a | $84.38 | $90.74 |
| J1426 | HCPCS | facility | Injection, casimersen, 10 mg | $172.35 | $166.06 | $6.29 | 1.04 | 9 | 1 | n/a | n/a | $163.2 | $182.4 |
| J1451 | HCPCS | facility | Fomepizole 1.5 GM/1.5ML solution 1.5 mL Vial | $12.55 | $6.28 | $6.27 | 2.00 | 10 | 1 | $1314.56 | $920.19 | $6.28 | $14.4 |
| 92517 | HCPCS | facility | Vemp test i&r cervical | $160.46 | $154.21 | $6.25 | 1.04 | 9 | 1 | n/a | n/a | $139.55 | $375.71 |
| 92518 | HCPCS | facility | Vemp test i&r ocular | $160.46 | $154.21 | $6.25 | 1.04 | 9 | 1 | n/a | n/a | $139.55 | $375.71 |
| P9059 | HCPCS | facility | HC FRESH FROZEN PLASMA, S/D, UNIT | $79.95 | $73.77 | $6.18 | 1.08 | 9 | 1 | $460.0 | $322.0 | $73.77 | $87.67 |
| J3245 | HCPCS | facility | Inj., tildrakizumab, 1 mg | $133.55 | $127.45 | $6.1 | 1.05 | 13 | 1 | n/a | n/a | $123.79 | $145.55 |
| 44390 | HCPCS | facility | Colonoscopy for foreign body | $1120.45 | $1114.51 | $5.94 | 1.01 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45337 | HCPCS | facility | Sigmoidoscopy & decompress | $1120.45 | $1114.51 | $5.94 | 1.01 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45341 | HCPCS | facility | Sigmoidoscopy W/Ultrasound | $1120.45 | $1114.51 | $5.94 | 1.01 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| C9779 | HCPCS | facility | ESD endoscopy or colonoscopy | $4626.485 | $4620.58 | $5.905 | 1.00 | 10 | 1 | n/a | n/a | $2495.04 | $6735.22 |
| 91117 | HCPCS | facility | Colon motility 6 hr study | $264.64 | $258.77 | $5.87 | 1.02 | 10 | 1 | n/a | n/a | $232.32 | $624.47 |
| G2250 | HCPCS | facility | Remot img sub by pt, non e/m | $14.37 | $8.55 | $5.82 | 1.68 | 6 | 1 | n/a | n/a | $8.55 | $32.06 |
| 90371 | HCPCS | facility | Hep b ig im | $139.93 | $134.19 | $5.74 | 1.04 | 13 | 1 | $1018.85 | $713.2 | $126.86 | $143.77 |
| J9330 | HCPCS | facility | Temsirolimus injection | $32.29 | $26.71 | $5.58 | 1.21 | 13 | 1 | n/a | n/a | $20.32 | $42.86 |
| C2638 | HCPCS | facility | Brachytx, stranded, I-125 | $40.83 | $35.26 | $5.57 | 1.16 | 13 | 1 | $242.0 | $169.4 | $35.26 | $41.78 |
| J1428 | HCPCS | facility | Inj, eteplirsen, 10 mg | $172.8 | $167.35 | $5.45 | 1.03 | 6 | 1 | n/a | n/a | $163.2 | $182.4 |
| 43755 | HCPCS | facility | Dx gastr intub w/asp specs | $159.62 | $154.21 | $5.41 | 1.04 | 11 | 1 | n/a | n/a | $66.52 | $552.31 |
| C2698 | HCPCS | facility | Brachytx, stranded, NOS | $40.66 | $35.26 | $5.4 | 1.15 | 10 | 1 | n/a | n/a | $35.26 | $41.78 |
| P9060 | HCPCS | facility | Fr frz plasma donor retested | $58.64 | $53.25 | $5.39 | 1.10 | 7 | 1 | n/a | n/a | $53.25 | $59.13 |
| J0720 | HCPCS | facility | Chloramphenicol sodium injec | $55.46 | $50.26 | $5.2 | 1.10 | 3 | 1 | n/a | n/a | $35.21 | $55.46 |
| 0637T | HCPCS | facility | Ct breast w/3d bi c+ | $423.23 | $418.11 | $5.12 | 1.01 | 9 | 1 | n/a | n/a | $368.12 | $948.51 |
| 0638T | HCPCS | facility | Ct breast w/3d bi c-/c+ | $423.23 | $418.11 | $5.12 | 1.01 | 9 | 1 | n/a | n/a | $368.12 | $948.51 |
| J1571 | HCPCS | facility | HepaGam B IM injection | $71.66 | $66.64 | $5.02 | 1.08 | 13 | 1 | n/a | n/a | $62.78 | $89.93 |
| 94780 | HCPCS | facility | Car seat/bed test 60 min | $49.64 | $44.76 | $4.88 | 1.11 | 10 | 1 | n/a | n/a | $36.73 | $87.52 |
| G0293 | HCPCS | facility | Non-cov surg proc,clin trial | $49.64 | $44.76 | $4.88 | 1.11 | 3 | 1 | n/a | n/a | $44.76 | $49.64 |
| G0294 | HCPCS | facility | Non-cov proc, clinical trial | $49.64 | $44.76 | $4.88 | 1.11 | 3 | 1 | n/a | n/a | $44.76 | $49.64 |
| 98925 | HCPCS | facility | Osteopath manj 1-2 regions | $30.65 | $25.88 | $4.77 | 1.18 | 9 | 1 | n/a | n/a | $19.53 | $65.55 |
| 98929 | HCPCS | facility | Osteopath manj 9-10 regions | $30.65 | $25.88 | $4.77 | 1.18 | 9 | 1 | n/a | n/a | $19.53 | $65.55 |
| 33285 | HCPCS | facility | HC INSERT, SUBCUTANEOUS CARDIAC RHYTHM MONITOR, INCL PROGRAMMING | $9922.11 | $9917.62 | $4.49 | 1.00 | 10 | 1 | $12880.0 | $9016.0 | $3830.61 | $11889.17 |
| Q5158 | HCPCS | facility | Inj, denosumab-bnht, 1 mg | $33.17 | $28.72 | $4.45 | 1.15 | 2 | 1 | n/a | n/a | $28.72 | $33.17 |
| Q5157 | HCPCS | facility | Inj, denosumab-bmwo, 1 mg | $32.49 | $28.13 | $4.36 | 1.15 | 2 | 1 | n/a | n/a | $28.13 | $32.49 |
| 96203 | HCPCS | facility | Mlt fam grp bhv train ea add | $9.62 | $5.27 | $4.35 | 1.83 | 5 | 1 | n/a | n/a | $5.27 | $19.76 |
| J9324 | HCPCS | facility | Inj, pemrydi rtu, 10 mg | $80.1 | $75.81 | $4.29 | 1.06 | 8 | 1 | n/a | n/a | $73.32 | $81.5 |
| Q5103 | HCPCS | facility | Injection, inflectra | $24.22 | $19.99 | $4.23 | 1.21 | 13 | 1 | n/a | n/a | $10.66 | $43.06 |
| Q5115 | HCPCS | facility | Inj truxima 10 mg | $33.59 | $29.38 | $4.21 | 1.14 | 13 | 1 | $5823.28 | $4076.3 | $29.38 | $68.5 |
| 98979 | HCPCS | facility | Rtm tx mgmt 1st 10 min | $15.66 | $11.49 | $4.17 | 1.36 | 3 | 1 | n/a | n/a | $11.49 | $43.09 |
| C9067 | HCPCS | facility | Gallium ga-68 dotatoc | $7.73 | $3.61 | $4.12 | 2.14 | 6 | 1 | n/a | n/a | $0.62 | $8.64 |
| J9318 | HCPCS | facility | Inj romidepsin non-lyo 0.1mg | $32.62 | $28.52 | $4.1 | 1.14 | 12 | 1 | n/a | n/a | $28.52 | $35.44 |
| J9302 | HCPCS | facility | Ofatumumab injection | $66.29 | $62.23 | $4.06 | 1.07 | 10 | 1 | n/a | n/a | $62.15 | $68.78 |
| 98970 | HCPCS | facility | Qnhp ol dig e/m svc 5-10min | $14.97 | $10.98 | $3.99 | 1.36 | 3 | 1 | n/a | n/a | $10.98 | $41.18 |
| Q4251 | HCPCS | facility | Vim, per square centimeter | $153.0 | $149.14 | $3.86 | 1.03 | 5 | 1 | n/a | n/a | $149.14 | $171.0 |
| Q2009 | HCPCS | facility | Fosphenytoin inj pe | $5.29 | $1.47 | $3.82 | 3.60 | 7 | 1 | $54.5 | $38.15 | $1.47 | $5.47 |
| 92260 | HCPCS | facility | Ophthalmoscopy/dynamometry | $48.41 | $44.76 | $3.65 | 1.08 | 10 | 1 | n/a | n/a | $36.73 | $87.52 |
| 92317 | HCPCS | facility | Rx corneoscleral cntact lens | $48.41 | $44.76 | $3.65 | 1.08 | 10 | 1 | n/a | n/a | $36.73 | $87.52 |
| 92354 | HCPCS | facility | Fit spectacles single system | $48.41 | $44.76 | $3.65 | 1.08 | 10 | 1 | n/a | n/a | $36.73 | $87.52 |
| 92355 | HCPCS | facility | Fit spectacles compound lens | $48.41 | $44.76 | $3.65 | 1.08 | 10 | 1 | n/a | n/a | $36.73 | $87.52 |
| J9065 | HCPCS | facility | Inj cladribine per 1 mg | $14.25 | $10.68 | $3.57 | 1.33 | 13 | 1 | n/a | n/a | $7.42 | $25.4 |
| J9033 | HCPCS | facility | Inj., treanda 1 mg | $5.43 | $1.88 | $3.55 | 2.89 | 13 | 1 | n/a | n/a | $1.85 | $24.58 |
| J0517 | HCPCS | facility | Inj., benralizumab, 1 mg | $168.13 | $164.59 | $3.54 | 1.02 | 13 | 1 | $10735.55 | $7514.88 | $163.97 | $177.1 |
| Q5121 | HCPCS | facility | Inj. avsola, 10 mg | $23.81 | $20.4 | $3.41 | 1.17 | 13 | 1 | n/a | n/a | $20.4 | $51.34 |
| 11719 | HCPCS | facility | HC TRIM NONDYSTROPHIC NAILS, ANY NUMBER | $74.08 | $70.7 | $3.38 | 1.05 | 11 | 1 | $304.0 | $212.8 | $28.4 | $274.76 |
| 11720 | HCPCS | facility | Debride nail 1-5 | $74.08 | $70.7 | $3.38 | 1.05 | 11 | 1 | $316.0 | $221.2 | $63.92 | $274.76 |
| 11721 | HCPCS | facility | Debride nail 6 or more | $74.08 | $70.7 | $3.38 | 1.05 | 11 | 1 | $347.0 | $242.9 | $63.92 | $274.76 |
| 17340 | HCPCS | facility | Cryotherapy of skin | $74.08 | $70.7 | $3.38 | 1.05 | 11 | 1 | n/a | n/a | $36.73 | $274.76 |
| 70110 | HCPCS | facility | HC MANDIBLE BILATERAL | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $516.0 | $361.2 | $70.84 | $334.27 |
| 70120 | HCPCS | facility | X-ray exam of mastoids | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $70.84 | $334.27 |
| 70130 | HCPCS | facility | X-ray exam of mastoids | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $45.95 | $334.27 |
| 70150 | HCPCS | facility | HC FACIAL BONES COMPLETE | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $516.0 | $361.2 | $70.84 | $334.27 |
| 70200 | HCPCS | facility | HC ORBITS BILAT COMPLETE | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $698.0 | $488.6 | $70.84 | $334.27 |
| 70250 | HCPCS | facility | HC SKULL < 4 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $523.0 | $366.1 | $45.95 | $334.27 |
| 70260 | HCPCS | facility | HC SKULL COMPLETE, MINI 4 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $619.0 | $433.3 | $70.84 | $334.27 |
| 71048 | HCPCS | facility | HC XRAY EXAM, CHEST, 4+ VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $594.0 | $415.8 | $114.26 | $334.27 |
| 71101 | HCPCS | facility | HC RIBS W PA CHEST 3+ VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $516.0 | $361.2 | $70.84 | $334.27 |
| 71110 | HCPCS | facility | HC RIBS BILATERAL | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $641.0 | $448.7 | $70.84 | $334.27 |
| 71111 | HCPCS | facility | HC RIBS BILATERAL AND PA CHEST | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $672.0 | $470.4 | $70.84 | $334.27 |
| 72050 | HCPCS | facility | HC CERVICAL SPINE; 4 OR 5 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $590.0 | $413.0 | $70.84 | $334.27 |
| 72052 | HCPCS | facility | HC CERVICAL SPINE; 6 OR MORE VIEW | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $742.0 | $519.4 | $70.84 | $334.27 |
| 72070 | HCPCS | facility | HC SPINE; THORACIC, 2 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $542.0 | $379.4 | $45.95 | $334.27 |
| 72072 | HCPCS | facility | HC DORSAL/THORACIC SPINE, 3 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $619.0 | $433.3 | $70.84 | $334.27 |
| 72074 | HCPCS | facility | X-ray exam thorac spine4/>vw | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $45.95 | $334.27 |
| 72082 | HCPCS | facility | HC X-RAY ENTIRE SPINE, 2 OR 3 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $335.0 | $234.5 | $70.84 | $334.27 |
| 72083 | HCPCS | facility | HC X-RAY SPINE, THORACIC/LUMBAR (EG, SCOLIOSIS EVAL); 4 OR 5 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $597.0 | $417.9 | $70.84 | $350.0 |
| 72084 | HCPCS | facility | HC X-RAY SPINE, ENTIRE THORACIC/LUMBAR (EG, SCOLIOSIS EVAL); MIN 6 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $716.0 | $501.2 | $70.84 | $350.0 |
| 72100 | HCPCS | facility | HC LUMBOSACRAL SPINE 2 OR 3 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $573.0 | $401.1 | $45.95 | $334.27 |
| 72110 | HCPCS | facility | HC LUMBAR SPINE 4 OR MORE VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $618.0 | $432.6 | $70.84 | $334.27 |
| 72114 | HCPCS | facility | HC LUM SAC;COMPL W/BND,MIN 6 VIEW | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $906.0 | $634.2 | $70.84 | $334.27 |
| 72120 | HCPCS | facility | HC SPINE, LOWER; BENDING, 2/3 VWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $334.0 | $233.8 | $70.84 | $334.27 |
| 72170 | HCPCS | facility | HC PELVIS EXAM,  1 OR 2 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $376.0 | $263.2 | $45.95 | $334.27 |
| 72190 | HCPCS | facility | HC RADIOLOGIC EXAM PELVIS; COMPLETE MINIMUM 3 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $354.0 | $247.8 | $45.95 | $334.27 |
| 72200 | HCPCS | facility | HC SACROILIAC JOINTS, < 3 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $242.0 | $169.4 | $45.95 | $334.27 |
| 72202 | HCPCS | facility | HC SACROILLIAC JOINTS, 3/+ VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $488.0 | $341.6 | $45.95 | $334.27 |
| 73010 | HCPCS | facility | HC SCAPULA COMPLETE | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $406.0 | $284.2 | $45.95 | $334.27 |
| 73092 | HCPCS | facility | HC UPPER EXTREMITY, INFANT, MIN 2 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $406.0 | $284.2 | $45.95 | $334.27 |
| 73120 | HCPCS | facility | HC HAND, 2 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $290.0 | $203.0 | $45.95 | $334.27 |
| 73503 | HCPCS | facility | X-ray exam hip uni 4/> views | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $70.84 | $334.27 |
| 73521 | HCPCS | facility | HC XRAY, HIPS BILAT, 2 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $274.0 | $191.8 | $70.84 | $334.27 |
| 73522 | HCPCS | facility | HC XRAY, HIPS BILAT, 3/4 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $329.0 | $230.3 | $70.84 | $334.27 |
| 73523 | HCPCS | facility | HC XRAY, HIPS BILAT, W PELVIS WHEN PERFORMED; MINIMUM 5 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $404.0 | $282.8 | $70.84 | $350.0 |
| 73564 | HCPCS | facility | HC KNEE, 4 OR MORE VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $494.0 | $345.8 | $70.84 | $334.27 |
| 74019 | HCPCS | facility | HC XRAY EXAM, ABDOMEN, 2 VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $516.0 | $361.2 | $45.95 | $334.27 |
| 74021 | HCPCS | facility | HC XRAY EXAM, ABDOMEN, 3+ VIEWS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $637.0 | $445.9 | $45.95 | $334.27 |
| 74022 | HCPCS | facility | X-ray exam series abdomen | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $70.84 | $334.27 |
| 75809 | HCPCS | facility | HC SHUNTOGRAM FOR NON VASC SHUNT, S & I | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $659.0 | $461.3 | $70.84 | $334.27 |
| 76100 | HCPCS | facility | X-ray exam of body section | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $70.84 | $334.27 |
| 76120 | HCPCS | facility | Cine/video x-rays | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $114.26 | $334.27 |
| 76506 | HCPCS | facility | Echo exam of head | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $575.0 | $402.5 | $64.57 | $334.27 |
| 76511 | HCPCS | facility | Ophth us quant a only | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $99.32 | $334.27 |
| 76512 | HCPCS | facility | HC OPHTHALMIC US, DIAGNOS; B-SCAN | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $550.0 | $385.0 | $99.32 | $334.27 |
| 76513 | HCPCS | facility | Echo exam of eye water bath | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $433.0 | $303.1 | $99.32 | $334.27 |
| 76516 | HCPCS | facility | Echo exam of eye | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $64.57 | $334.27 |
| 76519 | HCPCS | facility | Echo exam of eye | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $99.32 | $334.27 |
| 76536 | HCPCS | facility | HC ULTRASOUND, SOFT TISSUE, HEAD & NECK | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $698.0 | $488.6 | $99.32 | $334.27 |
| 76604 | HCPCS | facility | HC ULTRASOUND, CHEST | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $347.0 | $242.9 | $64.57 | $334.27 |
| 76641 | HCPCS | facility | HC US BREAST, UNILAT, COMPLETE | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $243.0 | $170.1 | $64.57 | $334.27 |
| 76700 | HCPCS | facility | HC ABDOMINAL/GALLBLADDER ULTRASOU | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $1079.0 | $755.3 | $99.32 | $335.0 |
| 76705 | HCPCS | facility | Echo exam of abdomen | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $768.0 | $537.6 | $99.32 | $334.27 |
| 76706 | HCPCS | facility | HC ULTRA, ABDOMINAL AORTA, REAL TIME W/IMAGE DOC, SCREEN STUDY AAA | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $599.0 | $419.3 | $112.69 | $334.27 |
| 76770 | HCPCS | facility | HC US, RETROPERITONEAL, COMPL | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $411.0 | $287.7 | $99.32 | $334.27 |
| 76775 | HCPCS | facility | HC US, RETROPERITONEAL; LMTD | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $1014.0 | $709.8 | $99.32 | $334.27 |
| 76776 | HCPCS | facility | Us exam k transpl w/doppler | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $99.32 | $334.27 |
| 76800 | HCPCS | facility | HC SPINAL CANAL US | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $554.0 | $387.8 | $99.32 | $334.27 |
| 76801 | HCPCS | facility | HC PREG ECHO, SINGLE GEST <14 WKS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $991.0 | $693.7 | $99.32 | $334.27 |
| 76805 | HCPCS | facility | HC PREG US, SINGLE GEST >/=14 WKS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $1219.0 | $853.3 | $99.32 | $334.27 |
| 76813 | HCPCS | facility | HC NUCHAL TRANSLUCENCY, <14 WKS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $1037.0 | $725.9 | $64.57 | $334.27 |
| 76815 | HCPCS | facility | HC PREG US, 1 OR MORE FETUSES, LIMITED | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $745.0 | $521.5 | $64.57 | $334.27 |
| 76816 | HCPCS | facility | HC PREG ECHO, FOLLOW UP PER GEST | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $962.0 | $673.4 | $64.57 | $334.27 |
| 76817 | HCPCS | facility | HC PREG ECHO, TRANSVAGINAL | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $745.0 | $521.5 | $64.57 | $334.27 |
| 76818 | HCPCS | facility | Fetal biophys profile w/nst | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $1058.0 | $740.6 | $99.32 | $334.27 |
| 76819 | HCPCS | facility | Fetal biophys profil w/o nst | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $881.0 | $616.7 | $99.32 | $334.27 |
| 76820 | HCPCS | facility | HC UMBILICAL ARTERY ECHO | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $407.0 | $284.9 | $64.57 | $334.27 |
| 76821 | HCPCS | facility | HC CEREBRAL ARTERY ECHO | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $338.0 | $236.6 | $64.57 | $334.27 |
| 76827 | HCPCS | facility | Echo exam of fetal heart | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $599.0 | $419.3 | $64.57 | $334.27 |
| 76828 | HCPCS | facility | Echo exam of fetal heart | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $486.0 | $340.2 | $64.57 | $334.27 |
| 76830 | HCPCS | facility | HC ULTRASOUND,TRANSVAGINAL | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $931.0 | $651.7 | $99.32 | $334.27 |
| 76856 | HCPCS | facility | HC US, PELVIC, NON-OBSTETRIC, COMPLETE | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $961.0 | $672.7 | $99.32 | $334.27 |
| 76857 | HCPCS | facility | HC US, PELVIC, NON-OBSTETRIC, LIMITED | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $450.0 | $315.0 | $64.57 | $334.27 |
| 76870 | HCPCS | facility | HC US, SCROTUM & CONTENTS | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $1037.0 | $725.9 | $99.32 | $334.27 |
| 76872 | HCPCS | facility | Us transrectal | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $99.32 | $334.27 |
| 76881 | HCPCS | facility | HC US EXTREMITY, NON-VASC; COMPLETE | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $832.0 | $582.4 | $99.32 | $334.27 |
| 76882 | HCPCS | facility | HC US EXTREMITY, NON-VASC; LIMITED | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $360.0 | $252.0 | $64.57 | $334.27 |
| 76977 | HCPCS | facility | Us bone density measure | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $49.64 | $334.0 |
| 77072 | HCPCS | facility | HC HAND & WRIST FOR BONE AGE | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $417.0 | $291.9 | $45.95 | $334.27 |
| 77073 | HCPCS | facility | HC BONE MEASUREMENT | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $582.0 | $407.4 | $70.84 | $334.27 |
| 77074 | HCPCS | facility | X-rays bone survey limited | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $70.84 | $334.27 |
| 77075 | HCPCS | facility | HC OSSEOUS SURVEY, ADULT COMPLETE | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $913.0 | $639.1 | $70.84 | $334.27 |
| 77076 | HCPCS | facility | HC OSSEOUS SURVEY, INFANT | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $582.0 | $407.4 | $70.84 | $334.27 |
| 77077 | HCPCS | facility | Joint survey single view | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $45.95 | $334.27 |
| 77080 | HCPCS | facility | Dxa bone density axial | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $651.0 | $455.7 | $73.87 | $334.27 |
| 77085 | HCPCS | facility | Dxa bone density study | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $694.0 | $485.8 | $70.84 | $334.27 |
| 92352 | HCPCS | facility | Fit aphakia spectcl monofocl | $74.07 | $70.7 | $3.37 | 1.05 | 10 | 1 | n/a | n/a | $63.92 | $147.93 |
| 92353 | HCPCS | facility | Fit aphakia spectcl multifoc | $74.07 | $70.7 | $3.37 | 1.05 | 10 | 1 | n/a | n/a | $63.92 | $147.93 |
| 92371 | HCPCS | facility | Repair & adjust spectacles | $74.07 | $70.7 | $3.37 | 1.05 | 10 | 1 | n/a | n/a | $63.92 | $147.93 |
| 93888 | HCPCS | facility | Intracranial limited study | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $64.57 | $275.69 |
| 93892 | HCPCS | facility | Tcd emboli detect w/o inj | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $99.32 | $275.69 |
| 93893 | HCPCS | facility | Tcd emboli detect w/inj | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $99.32 | $275.69 |
| 93926 | HCPCS | facility | HC ARTERIAL DUPLEX LOWER EXTR UNI | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $575.0 | $402.5 | $99.32 | $275.69 |
| 93931 | HCPCS | facility | HC ARTERIAL DUPLEX UPPER EXTR UNI | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $575.0 | $402.5 | $99.32 | $275.69 |
| 93971 | HCPCS | facility | Extremity study | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $2027.0 | $1418.9 | $99.32 | $275.69 |
| 93979 | HCPCS | facility | HC DUP-SCAN AORTA IVC, ILIAC VASCL/BPGS; UNILATERAL/LIMITED | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $278.0 | $194.6 | $99.32 | $275.69 |
| 93990 | HCPCS | facility | Doppler flow testing | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | $736.0 | $515.2 | $99.32 | $275.69 |
| G0130 | HCPCS | facility | Single energy x-ray study | $128.66 | $125.29 | $3.37 | 1.03 | 10 | 1 | n/a | n/a | $70.84 | $275.69 |
| J7308 | HCPCS | facility | Aminolevulinic acid hcl top | $395.24 | $392.09 | $3.15 | 1.01 | 13 | 1 | n/a | n/a | $388.42 | $411.17 |
| J9355 | HCPCS | facility | Trastuzumab injection | $77.94 | $75.03 | $2.91 | 1.04 | 13 | 1 | n/a | n/a | $73.48 | $97.92 |
| J9026 | HCPCS | facility | Inj, tarlatamab-dlle, 1 mg | $1567.49 | $1564.64 | $2.85 | 1.00 | 5 | 1 | n/a | n/a | $1564.64 | $1567.49 |
| J7314 | HCPCS | facility | Inj., yutiq, 0.01 mg | $532.58 | $529.89 | $2.69 | 1.01 | 13 | 1 | n/a | n/a | $496.42 | $541.67 |
| J9286 | HCPCS | facility | Inj glofitamab gxbm, 2.5 mg | $2770.57 | $2767.88 | $2.69 | 1.00 | 8 | 1 | n/a | n/a | $2701.04 | $2843.59 |
| J1449 | HCPCS | facility | Inj eflapegrastim-xnst 0.1mg | $23.55 | $20.87 | $2.68 | 1.13 | 12 | 1 | n/a | n/a | $20.87 | $36.69 |
| J9316 | HCPCS | facility | Pertuzu, trastuzu, 10 mg | $64.58 | $62.1 | $2.48 | 1.04 | 13 | 1 | n/a | n/a | $60.96 | $72.99 |
| 98926 | HCPCS | facility | Osteopath manj 3-4 regions | $28.34 | $25.88 | $2.46 | 1.10 | 10 | 1 | n/a | n/a | $19.53 | $65.55 |
| 98927 | HCPCS | facility | Osteopath manj 5-6 regions | $28.34 | $25.88 | $2.46 | 1.10 | 10 | 1 | n/a | n/a | $19.53 | $65.55 |
| 98928 | HCPCS | facility | Osteopath manj 7-8 regions | $28.34 | $25.88 | $2.46 | 1.10 | 10 | 1 | n/a | n/a | $19.53 | $65.55 |
| 98940 | HCPCS | facility | Chiropract manj 1-2 regions | $28.34 | $25.88 | $2.46 | 1.10 | 10 | 1 | n/a | n/a | $19.53 | $65.55 |
| 98941 | HCPCS | facility | Chiropract manj 3-4 regions | $28.34 | $25.88 | $2.46 | 1.10 | 10 | 1 | n/a | n/a | $19.53 | $65.55 |
| 98942 | HCPCS | facility | Chiropractic manj 5 regions | $28.34 | $25.88 | $2.46 | 1.10 | 10 | 1 | n/a | n/a | $19.53 | $65.55 |
| J0208 | HCPCS | facility | Inj sodium thiosulfate 100mg | $97.5 | $95.11 | $2.39 | 1.03 | 9 | 1 | n/a | n/a | $93.16 | $104.12 |
| J9356 | HCPCS | facility | Inj. herceptin hylecta, 10mg | $63.79 | $61.44 | $2.35 | 1.04 | 13 | 1 | n/a | n/a | $61.07 | $74.59 |
| G0271 | HCPCS | facility | Group MNT 2 or more 30 mins | $15.65 | $13.38 | $2.27 | 1.17 | 6 | 1 | $94.0 | $65.8 | $13.38 | $50.18 |
| J0577 | HCPCS | facility | Inj, brixadi, 7 days or less | $422.83 | $420.64 | $2.19 | 1.01 | 8 | 1 | n/a | n/a | $420.05 | $429.16 |
| Q4134 | HCPCS | facility | hMatrix | $151.325 | $149.14 | $2.185 | 1.01 | 6 | 1 | n/a | n/a | $3.3 | $162.08 |
| P9035 | HCPCS | facility | HC PLATE, PHERESIS, LEUK EA UNIT | $513.75 | $511.59 | $2.16 | 1.00 | 9 | 1 | $2006.0 | $1404.2 | $511.27 | $556.11 |
| 0740T | HCPCS | facility | Rem auton alg nsln cal setup | $72.81 | $70.7 | $2.11 | 1.03 | 7 | 1 | n/a | n/a | $57.48 | $73.41 |
| 92066 | HCPCS | facility | Orthop traing supvj phys/qhp | $72.81 | $70.7 | $2.11 | 1.03 | 6 | 1 | n/a | n/a | $63.86 | $73.41 |
| J0911 | HCPCS | facility | Inst tauro 1.35mg/hep 100u | $8.5 | $6.41 | $2.09 | 1.33 | 5 | 1 | n/a | n/a | $6.41 | $9.5 |
| J9264 | HCPCS | facility | Paclitaxel protein bound | $12.63 | $10.54 | $2.09 | 1.20 | 13 | 1 | n/a | n/a | $8.18 | $13.43 |
| J9312 | HCPCS | facility | Inj., rituximab, 10 mg | $77.31 | $75.22 | $2.09 | 1.03 | 13 | 1 | n/a | n/a | $74.77 | $91.26 |
| 86077 | HCPCS | facility | HC TXRXN- PATHOLOGIST REVIEW | $36.73 | $34.66 | $2.07 | 1.06 | 9 | 1 | $187.0 | $130.9 | $12.71 | $66.1 |
| 86485 | HCPCS | facility | Skin test candida | $36.73 | $34.66 | $2.07 | 1.06 | 9 | 1 | n/a | n/a | $6.82 | $66.1 |
| 88161 | HCPCS | facility | Cytopath smear other source | $36.73 | $34.66 | $2.07 | 1.06 | 9 | 1 | $72.0 | $50.4 | $12.71 | $66.1 |
| 93050 | HCPCS | facility | Art pressure waveform analys | $36.73 | $34.66 | $2.07 | 1.06 | 10 | 1 | n/a | n/a | $26.67 | $54.52 |
| 95017 | HCPCS | facility | Perq & icut allg test venoms | $36.73 | $34.66 | $2.07 | 1.06 | 10 | 1 | n/a | n/a | $24.8 | $54.52 |
| Q4154 | HCPCS | facility | Biovance 1 square cm | $151.13 | $149.14 | $1.99 | 1.01 | 9 | 1 | n/a | n/a | $142.86 | $333.74 |
| J1569 | HCPCS | facility | Gammagard liquid injection | $47.29 | $45.31 | $1.98 | 1.04 | 13 | 1 | n/a | n/a | $43.63 | $49.69 |
| J7329 | HCPCS | facility | Inj, trivisc 1 mg | $6.67 | $4.69 | $1.98 | 1.42 | 12 | 1 | n/a | n/a | $3.61 | $10.72 |
| J9326 | HCPCS | facility | Telisotuzumab vedotin-tllv | $145.87 | $143.99 | $1.88 | 1.01 | 2 | 1 | n/a | n/a | $143.99 | $145.87 |
| J0289 | HCPCS | facility | Amphotericin b liposome inj | $23.33 | $21.48 | $1.85 | 1.09 | 13 | 1 | $475.25 | $332.675 | $20.72 | $27.24 |
| J9275 | HCPCS | facility | Inj cosibelimab-ipdl, 2 mg | $24.65 | $22.92 | $1.73 | 1.08 | 2 | 1 | n/a | n/a | $22.92 | $24.65 |
| J0606 | HCPCS | facility | Inj, etelcalcetide, 0.1 mg | $4.01 | $2.29 | $1.72 | 1.75 | 13 | 1 | n/a | n/a | $2.29 | $4.7 |
| J9342 | HCPCS | facility | Inj thiotepa nos 1 mg | $12.24 | $10.54 | $1.7 | 1.16 | 5 | 1 | n/a | n/a | $8.86 | $12.24 |
| J7165 | HCPCS | facility | Inj, human-lans, per i.u | $3.21 | $1.55 | $1.66 | 2.07 | 5 | 1 | n/a | n/a | $1.55 | $3.59 |
| P9045 | HCPCS | facility | Albumin (human), 5%, 250 ml | $54.585 | $53.08 | $1.505 | 1.03 | 10 | 1 | n/a | n/a | $52.45 | $60.67 |
| P9047 | HCPCS | facility | Albumin (human), 25%, 50ml | $54.585 | $53.08 | $1.505 | 1.03 | 10 | 1 | $242.4 | $169.68 | $52.45 | $69.2 |
| J3060 | HCPCS | facility | Inj, taliglucerace alfa 10 u | $42.58 | $41.11 | $1.47 | 1.04 | 13 | 1 | n/a | n/a | $40.94 | $44.57 |
| J1627 | HCPCS | facility | Inj, granisetron, xr, 0.1 mg | $5.71 | $4.29 | $1.42 | 1.33 | 13 | 1 | n/a | n/a | $4.29 | $7.73 |
| Q5122 | HCPCS | facility | Inj, nyvepria | $132.545 | $131.16 | $1.385 | 1.01 | 12 | 1 | n/a | n/a | $79.6 | $179.09 |
| J9294 | HCPCS | facility | Inj pemetrexed, hospira 10mg | $4.93 | $3.55 | $1.38 | 1.39 | 12 | 1 | n/a | n/a | $0.62 | $10.93 |
| J9036 | HCPCS | facility | Inj. belrapzo/bendamustine | $13.65 | $12.28 | $1.37 | 1.11 | 13 | 1 | n/a | n/a | $3.59 | $22.27 |
| J1745 | HCPCS | facility | Infliximab not biosimil 10mg | $32.42 | $31.09 | $1.33 | 1.04 | 13 | 1 | n/a | n/a | $31.09 | $44.9 |
| J2506 | HCPCS | facility | Inj pegfilgrast ex bio 0.5mg | $90.62 | $89.34 | $1.28 | 1.01 | 12 | 1 | $10615.41 | $7430.79 | $31.14 | $137.32 |
| 0464T | HCPCS | facility | Visual ep test for glaucoma | $155.47 | $154.21 | $1.26 | 1.01 | 3 | 1 | n/a | n/a | $154.21 | $155.47 |
| 50686 | HCPCS | facility | Measure ureter pressure | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $81.99 | $375.71 |
| 51784 | HCPCS | facility | Anal/urinary muscle study | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $81.99 | $375.71 |
| 53660 | HCPCS | facility | Dilation of urethra | $155.47 | $154.21 | $1.26 | 1.01 | 11 | 1 | n/a | n/a | $81.99 | $552.31 |
| 91200 | HCPCS | facility | HC LIVER ELASTOGRAPHY, W/O IMAG W/I&R | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | $592.0 | $414.4 | $99.32 | $372.98 |
| 92274 | HCPCS | facility | Multifocal erg w/i&r | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $144.89 | $375.71 |
| 92537 | HCPCS | facility | Caloric vstblr test w/rec | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $132.06 | $375.71 |
| 92544 | HCPCS | facility | Optokinetic nystagmus test | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $65.29 | $375.71 |
| 92546 | HCPCS | facility | Sinusoidal rotational test | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $132.06 | $375.71 |
| 92553 | HCPCS | facility | Audiometry air & bone | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $88.6 | $375.71 |
| 92557 | HCPCS | facility | Comprehensive hearing test | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $88.6 | $375.71 |
| 92570 | HCPCS | facility | Acoustic immitance testing | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $88.6 | $375.71 |
| 92572 | HCPCS | facility | Staggered spondaic word test | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $116.96 | $375.71 |
| 92582 | HCPCS | facility | Conditioning play audiometry | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $88.6 | $375.71 |
| 92601 | HCPCS | facility | Cochlear implt f/up exam <7 | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $116.96 | $375.71 |
| 92602 | HCPCS | facility | Reprogram cochlear implt 7/> | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $116.96 | $375.71 |
| 92603 | HCPCS | facility | Cochlear implt f/up exam 7/> | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $116.96 | $375.71 |
| 92604 | HCPCS | facility | Reprogram cochlear implt 7/> | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $116.96 | $375.71 |
| 92620 | HCPCS | facility | Auditory function 60 min | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $88.6 | $375.71 |
| 92625 | HCPCS | facility | Tinnitus assessment | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $88.6 | $375.71 |
| 92626 | HCPCS | facility | Eval aud rehab status | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $116.96 | $375.71 |
| 92640 | HCPCS | facility | Aud brainstem implt programg | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $88.6 | $375.71 |
| 93740 | HCPCS | facility | Temperature gradient studies | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $62.87 | $375.71 |
| 94011 | HCPCS | facility | Spirometry up to 2 yrs old | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $45.06 | $375.71 |
| 94150 | HCPCS | facility | HC VITAL CAPACITY, TOTAL | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | $218.0 | $152.6 | $45.06 | $375.71 |
| 94450 | HCPCS | facility | Hypoxia response curve | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $62.87 | $594.84 |
| 94762 | HCPCS | facility | HC OXIMETRY OVERNIGHT | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | $289.0 | $202.3 | $66.52 | $375.71 |
| 95863 | HCPCS | facility | HC NDL EMG 3 XTR W/WO RELATED PARASPINAL AREAS | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | $469.0 | $328.3 | $79.83 | $375.71 |
| 95864 | HCPCS | facility | HC NDL EMG 4 XTR W/WO RELATED PARASPINAL AREAS | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | $469.0 | $328.3 | $79.83 | $375.71 |
| 95866 | HCPCS | facility | Muscle test hemidiaphragm | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $79.83 | $375.71 |
| 95875 | HCPCS | facility | Limb exercise test | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $79.83 | $375.71 |
| 95921 | HCPCS | facility | Autonomic nrv parasym inervj | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $79.83 | $375.71 |
| 95937 | HCPCS | facility | HC NEUROMUSCULAR JUNCTION TEST | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | $371.0 | $259.7 | $79.83 | $375.71 |
| 96112 | HCPCS | facility | Devel tst phys/qhp 1st hr | $155.47 | $154.21 | $1.26 | 1.01 | 10 | 1 | n/a | n/a | $86.49 | $556.0 |
| J1323 | HCPCS | facility | Inj, elranatamab-bcmm, 1 mg | $185.31 | $184.07 | $1.24 | 1.01 | 8 | 1 | n/a | n/a | $178.85 | $188.52 |
| P9021 | HCPCS | facility | HC RED BLOOD CELLS, EA UNIT | $151.79 | $150.57 | $1.22 | 1.01 | 9 | 1 | $410.0 | $287.0 | $144.06 | $160.24 |
| J7325 | HCPCS | facility | Synvisc or Synvisc-One | $9.16 | $7.95 | $1.21 | 1.15 | 13 | 1 | n/a | n/a | $7.56 | $10.67 |
| J0759 | HCPCS | facility | Inj, clevidepine, 1 mg | $4.02 | $2.85 | $1.17 | 1.41 | 2 | 1 | n/a | n/a | $2.85 | $4.02 |
| J3285 | HCPCS | facility | Treprostinil injection | $55.82 | $54.71 | $1.11 | 1.02 | 12 | 1 | n/a | n/a | $54.48 | $64.03 |
| Q5107 | HCPCS | facility | Inj mvasi 10 mg | $28.85 | $27.86 | $0.99 | 1.04 | 13 | 1 | n/a | n/a | $23.84 | $56.73 |
| J9056 | HCPCS | facility | Inj, bendamustine, 1 mg | $30.83 | $29.85 | $0.98 | 1.03 | 12 | 1 | n/a | n/a | $27.84 | $34.83 |
| J3380 | HCPCS | facility | Injection, vedolizumab | $22.26 | $21.31 | $0.95 | 1.04 | 13 | 1 | n/a | n/a | $20.35 | $23.3 |
| J2601 | HCPCS | facility | Inj, vasopressin (baxter) | $2.94 | $2.01 | $0.93 | 1.46 | 7 | 1 | n/a | n/a | $2.01 | $3.83 |
| J7501 | HCPCS | facility | Azathioprine parenteral | $255.0 | $254.07 | $0.93 | 1.00 | 10 | 1 | n/a | n/a | $245.41 | $285.0 |
| J7168 | HCPCS | facility | Prothrombin complex kcentra | $3.04 | $2.14 | $0.9 | 1.42 | 9 | 1 | $3375.0 | $2362.5 | $2.14 | $3.4 |
| J1552 | HCPCS | facility | Inj, alyglo, 500 mg | $131.12 | $130.24 | $0.88 | 1.01 | 5 | 1 | n/a | n/a | $123.84 | $131.12 |
| J9313 | HCPCS | facility | Inj., lumoxiti, 0.01 mg | $24.24 | $23.39 | $0.85 | 1.04 | 10 | 1 | n/a | n/a | $22.48 | $25.16 |
| J1301 | HCPCS | facility | Injection, edaravone, 1 mg | $21.82 | $20.99 | $0.83 | 1.04 | 13 | 1 | n/a | n/a | $17.47 | $22.38 |
| J1437 | HCPCS | facility | Inj. fe derisomaltose 10 mg | $22.83 | $22.02 | $0.81 | 1.04 | 13 | 1 | n/a | n/a | $18.95 | $28.09 |
| J2782 | HCPCS | facility | Inj avacincaptad pegol 0.1mg | $105.9 | $105.12 | $0.78 | 1.01 | 8 | 1 | n/a | n/a | $102.92 | $110.46 |
| Q5104 | HCPCS | facility | Injection, renflexis | $27.75 | $27.0 | $0.75 | 1.03 | 13 | 1 | n/a | n/a | $25.05 | $50.84 |
| J0717 | HCPCS | facility | Certolizumab Pegol 2 X 200 MG kit 1 each Box | $4.65 | $3.91 | $0.74 | 1.19 | 13 | 1 | $5728.12 | $4009.68 | $3.87 | $8.18 |
| J0129 | HCPCS | facility | Abatacept injection | $44.77 | $44.11 | $0.66 | 1.01 | 13 | 1 | n/a | n/a | $43.44 | $56.87 |
| Q5116 | HCPCS | facility | Inj., trazimera, 10 mg | $28.62 | $27.99 | $0.63 | 1.02 | 13 | 1 | n/a | n/a | $8.21 | $74.02 |
| J2468 | HCPCS | facility | Inj, palonosetron (avyxa) | $58.84 | $58.24 | $0.6 | 1.01 | 3 | 1 | n/a | n/a | $58.24 | $58.84 |
| J2777 | HCPCS | facility | Inj, faricimab-svoa, 0.1mg | $34.48 | $33.88 | $0.6 | 1.02 | 12 | 1 | n/a | n/a | $32.9 | $39.77 |
| J9256 | HCPCS | facility | Inj, nipocalimab-aahu, 3 mg | $32.74 | $32.14 | $0.6 | 1.02 | 2 | 1 | n/a | n/a | $32.14 | $32.74 |
| P9046 | HCPCS | facility | Albumin (human), 25%, 20 ml | $21.83 | $21.23 | $0.6 | 1.03 | 10 | 1 | n/a | n/a | $20.98 | $30.24 |
| J1602 | HCPCS | facility | Golimumab for iv use 1mg | $11.63 | $11.04 | $0.59 | 1.05 | 13 | 1 | n/a | n/a | $11.03 | $18.12 |
| J0883 | HCPCS | facility | Argatroban nonesrd use 1mg | $1.37 | $0.8 | $0.57 | 1.71 | 13 | 1 | $517.77 | $362.44 | $0.61 | $5.23 |
| J0594 | HCPCS | facility | Busulfan injection | $1.44 | $0.88 | $0.56 | 1.64 | 13 | 1 | n/a | n/a | $0.88 | $2.13 |
| C9308 | HCPCS | facility | Inj, carboplatin (avyxa) | $5.7 | $5.15 | $0.55 | 1.11 | 2 | 1 | n/a | n/a | $5.15 | $5.7 |
| J9071 | HCPCS | facility | Inj cyclophosphamd auromedic | $1.16 | $0.63 | $0.53 | 1.84 | 12 | 1 | n/a | n/a | $0.61 | $2.87 |
| J0287 | HCPCS | facility | Amphotericin b lipid complex | $10.77 | $10.3 | $0.47 | 1.05 | 13 | 1 | n/a | n/a | $9.37 | $11.97 |
| J9347 | HCPCS | facility | Inj, tremelimumab-actl, 1 mg | $141.35 | $140.9 | $0.45 | 1.00 | 12 | 1 | n/a | n/a | $135.45 | $143.02 |
| C9257 | HCPCS | facility | Bevacizumab injection | $2.27 | $1.83 | $0.44 | 1.24 | 10 | 1 | n/a | n/a | $1.83 | $12.54 |
| G0237 | HCPCS | facility | Therapeutic procd strg endur | $35.09 | $34.66 | $0.43 | 1.01 | 10 | 1 | n/a | n/a | $25.19 | $80.86 |
| G0238 | HCPCS | facility | HC OTHER RESP PROCEDURE, INDIVIDUAL, PER 15 MIN | $35.09 | $34.66 | $0.43 | 1.01 | 10 | 1 | $134.0 | $93.8 | $25.19 | $69.64 |
| J1786 | HCPCS | facility | Imuglucerase injection | $43.62 | $43.19 | $0.43 | 1.01 | 13 | 1 | n/a | n/a | $43.19 | $46.27 |
| J3299 | HCPCS | facility | Inj xipere 1 mg | $48.4 | $47.97 | $0.43 | 1.01 | 12 | 1 | n/a | n/a | $47.85 | $49.75 |
| J2350 | HCPCS | facility | Injection, ocrelizumab, 1 mg | $59.8 | $59.41 | $0.39 | 1.01 | 13 | 1 | $34937.5 | $24456.25 | $57.33 | $62.78 |
| J9332 | HCPCS | facility | Inj efgartigimod 2mg | $32.485 | $32.15 | $0.335 | 1.01 | 12 | 1 | n/a | n/a | $32.12 | $32.95 |
| 95012 | HCPCS | facility | Exhaled Nitric Oxide Meas | $45.06 | $44.76 | $0.3 | 1.01 | 10 | 1 | n/a | n/a | $36.73 | $87.52 |
| J2062 | HCPCS | facility | Loxapine for inhalation 1 mg | $16.2 | $15.9 | $0.3 | 1.02 | 6 | 1 | n/a | n/a | $15.3 | $17.1 |
| J9319 | HCPCS | facility | Inj romidepsin lyophil 0.1mg | $31.08 | $30.78 | $0.3 | 1.01 | 12 | 1 | $6293.5 | $4405.45 | $29.77 | $34.27 |
| P9041 | HCPCS | facility | Albumin (human),5%, 50ml | $10.915 | $10.62 | $0.295 | 1.03 | 10 | 1 | n/a | n/a | $10.49 | $22.63 |
| J2356 | HCPCS | facility | Inj tezepelumab-ekko, 1mg | $18.3 | $18.01 | $0.29 | 1.02 | 12 | 1 | n/a | n/a | $17.82 | $18.82 |
| J2406 | HCPCS | facility | Injection, oritavancin 10 mg | $42.77 | $42.48 | $0.29 | 1.01 | 12 | 1 | n/a | n/a | $41.4 | $43.4 |
| J0651 | HCPCS | facility | Inj, levothyroxine, freskabi | $7.1 | $6.83 | $0.27 | 1.04 | 8 | 1 | n/a | n/a | $6.83 | $9.04 |
| J1809 | HCPCS | facility | Inj, fosdenopterin, 0.1mg | $17.24 | $16.97 | $0.27 | 1.02 | 2 | 1 | n/a | n/a | $16.97 | $17.24 |
| J8560 | HCPCS | facility | Etoposide oral 50 mg | $77.73 | $77.46 | $0.27 | 1.00 | 12 | 1 | n/a | n/a | $75.76 | $86.79 |
| J9074 | HCPCS | facility | Inj, cyclophosphamd, sandoz | $4.21 | $3.94 | $0.27 | 1.07 | 8 | 1 | n/a | n/a | $3.84 | $4.47 |
| J9311 | HCPCS | facility | Inj rituximab, hyaluronidase | $36.96 | $36.69 | $0.27 | 1.01 | 13 | 1 | n/a | n/a | $36.53 | $40.23 |
| Q5135 | HCPCS | facility | Inj, tyenne, 1 mg | $4.69 | $4.42 | $0.27 | 1.06 | 7 | 1 | n/a | n/a | $4.19 | $5.0 |
| J7320 | HCPCS | facility | Genvisc 850, inj, 1mg | $6.02 | $5.77 | $0.25 | 1.04 | 13 | 1 | n/a | n/a | $4.76 | $18.19 |
| J3262 | HCPCS | facility | Tocilizumab injection | $5.95 | $5.71 | $0.24 | 1.04 | 13 | 1 | $2037.08 | $1425.96 | $5.47 | $6.44 |
| J9220 | HCPCS | facility | Indigotindisulfonate sod 1mg | $10.2 | $9.96 | $0.24 | 1.02 | 5 | 1 | n/a | n/a | $9.96 | $11.4 |
| J2428 | HCPCS | facility | Inj, erzofri, 1 mg | $16.98 | $16.76 | $0.22 | 1.01 | 5 | 1 | n/a | n/a | $15.3 | $16.98 |
| J1440 | HCPCS | facility | Fecal?microbiota jslm 1 ml | $64.04 | $63.84 | $0.2 | 1.00 | 12 | 1 | n/a | n/a | $63.28 | $64.63 |
| J2794 | HCPCS | facility | Risperidone, long acting | $11.18 | $10.98 | $0.2 | 1.02 | 10 | 1 | n/a | n/a | $10.53 | $12.11 |
| C2645 | HCPCS | facility | Brachytx planar, p-103 | $4.88 | $4.69 | $0.19 | 1.04 | 10 | 1 | n/a | n/a | $4.69 | $5.36 |
| J0586 | HCPCS | facility | Abobotulinumtoxina | $8.94 | $8.75 | $0.19 | 1.02 | 13 | 1 | n/a | n/a | $8.27 | $9.02 |
| J0138 | HCPCS | facility | Injection, acetaminoph 10 mg | $0.22 | $0.04 | $0.18 | 5.50 | 7 | 1 | n/a | n/a | $0.04 | $0.24 |
| J2561 | HCPCS | facility | Inj, sezaby, 1 mg | $1.36 | $1.19 | $0.17 | 1.14 | 5 | 1 | n/a | n/a | $1.19 | $1.52 |
| J0218 | HCPCS | facility | Inj olipudase alfa-rpcp 1mg | $393.82 | $393.66 | $0.16 | 1.00 | 12 | 1 | n/a | n/a | $381.83 | $395.56 |
| J2323 | HCPCS | facility | Natalizumab injection | $24.15 | $24.0 | $0.15 | 1.01 | 13 | 1 | n/a | n/a | $22.39 | $25.11 |
| J2779 | HCPCS | facility | Inj, susvimo 0.1 mg | $79.08 | $78.93 | $0.15 | 1.00 | 12 | 1 | n/a | n/a | $76.22 | $84.51 |
| J9073 | HCPCS | facility | Inj cyclophosphamd (ingenus) | $0.93 | $0.78 | $0.15 | 1.19 | 8 | 1 | n/a | n/a | $0.7 | $1.16 |
| J1837 | HCPCS | facility | Inj, posaconazole, 1 mg | $0.35 | $0.21 | $0.14 | 1.67 | 2 | 1 | n/a | n/a | $0.21 | $0.35 |
| J9075 | HCPCS | facility | Inj, cyclophosphamide, nos | $0.62 | $0.48 | $0.14 | 1.29 | 8 | 1 | n/a | n/a | $0.48 | $1.11 |
| J0184 | HCPCS | facility | Inj, amisulpride, 1 mg | $9.73 | $9.61 | $0.12 | 1.01 | 8 | 1 | n/a | n/a | $9.18 | $10.88 |
| J0681 | HCPCS | facility | Inj ceftobipole medocarl 3mg | $1.21 | $1.09 | $0.12 | 1.11 | 2 | 1 | n/a | n/a | $1.09 | $1.21 |
| J7209 | HCPCS | facility | Factor viii nuwiq recomb 1iu | $1.24 | $1.12 | $0.12 | 1.11 | 13 | 1 | n/a | n/a | $1.12 | $1.38 |
| Q5133 | HCPCS | facility | Inj, tofidence, 1 mg | $5.66 | $5.54 | $0.12 | 1.02 | 8 | 1 | n/a | n/a | $5.54 | $5.79 |
| J0881 | HCPCS | facility | Darbepoetin alfa, non-esrd | $3.04 | $2.93 | $0.11 | 1.04 | 13 | 1 | n/a | n/a | $2.93 | $3.56 |
| J0882 | HCPCS | facility | Darbepoetin alfa, esrd use | $3.04 | $2.93 | $0.11 | 1.04 | 13 | 1 | n/a | n/a | $2.93 | $3.56 |
| J1447 | HCPCS | facility | Inj tbo filgrastim 1 microg | $0.39 | $0.28 | $0.11 | 1.39 | 13 | 1 | n/a | n/a | $0.25 | $0.46 |
| J7353 | HCPCS | facility | Anacaulase-bcdb 8.8% gel 1 g | $58.42 | $58.31 | $0.11 | 1.00 | 5 | 1 | n/a | n/a | $58.31 | $65.29 |
| J8611 | HCPCS | facility | Oral methotrexate (jylamvo) | $18.575 | $18.47 | $0.105 | 1.01 | 6 | 1 | n/a | n/a | $18.47 | $18.62 |
| J0185 | HCPCS | facility | Inj., aprepitant, 1 mg | $1.74 | $1.64 | $0.1 | 1.06 | 11 | 1 | n/a | n/a | $1.59 | $1.77 |
| J0791 | HCPCS | facility | Inj crizanlizumab-tmca 5mg | $129.58 | $129.48 | $0.1 | 1.00 | 13 | 1 | n/a | n/a | $122.43 | $130.23 |
| J1306 | HCPCS | facility | Injection, inclisiran, 1 mg | $12.42 | $12.32 | $0.1 | 1.01 | 12 | 1 | n/a | n/a | $12.19 | $12.69 |
| J1456 | HCPCS | facility | Inj, fosaprepitant (teva) | $1.13 | $1.03 | $0.1 | 1.10 | 8 | 1 | n/a | n/a | $0.64 | $2.04 |
| J1743 | HCPCS | facility | Idursulfase injection | $558.56 | $558.46 | $0.1 | 1.00 | 13 | 1 | n/a | n/a | $537.93 | $567.03 |
| J1566 | HCPCS | facility | Immune globulin, powder | $78.89 | $78.8 | $0.09 | 1.00 | 13 | 1 | n/a | n/a | $66.97 | $82.08 |
| J3263 | HCPCS | facility | Inj, toripalimab-tpzi, 1 mg | $39.5 | $39.41 | $0.09 | 1.00 | 8 | 1 | n/a | n/a | $38.87 | $40.21 |
| J7203 | HCPCS | facility | Factor ix recomb gly rebinyn | $4.55 | $4.46 | $0.09 | 1.02 | 13 | 1 | n/a | n/a | $3.96 | $4.58 |
| Q5125 | HCPCS | facility | Inj, releuko 1 mcg | $0.47 | $0.38 | $0.09 | 1.24 | 11 | 1 | $259.8 | $181.86 | $0.34 | $0.62 |
| J1303 | HCPCS | facility | Inj., ravulizumab-cwvz 10 mg | $225.19 | $225.11 | $0.08 | 1.00 | 13 | 1 | n/a | n/a | $220.75 | $233.41 |
| J1737 | HCPCS | facility | Inj meloxicam (azurity) 1mg | $1.14 | $1.06 | $0.08 | 1.08 | 2 | 1 | n/a | n/a | $1.06 | $1.14 |
| J2547 | HCPCS | facility | Injection, peramivir | $1.75 | $1.68 | $0.07 | 1.04 | 10 | 1 | $2137.46 | $1496.22 | $1.62 | $1.81 |
| J7318 | HCPCS | facility | Inj, durolane 1 mg | $6.84 | $6.77 | $0.07 | 1.01 | 12 | 1 | n/a | n/a | $6.52 | $9.69 |
| J9024 | HCPCS | facility | Inj atezolizumb 5mg hya-tqjs | $31.64 | $31.58 | $0.06 | 1.00 | 5 | 1 | n/a | n/a | $31.58 | $32.1 |
| J0668 | HCPCS | facility | Instill, bupivac and meloxic | $0.86 | $0.81 | $0.05 | 1.06 | 2 | 1 | n/a | n/a | $0.81 | $0.86 |
| J1833 | HCPCS | facility | Injection, isavuconazonium | $1.05 | $1.0 | $0.05 | 1.05 | 13 | 1 | n/a | n/a | $0.89 | $1.21 |
| J2403 | HCPCS | facility | Chloroprocaine opht gel, 1mg | $0.63 | $0.58 | $0.05 | 1.09 | 12 | 1 | n/a | n/a | $0.58 | $0.75 |
| J7332 | HCPCS | facility | Inj., triluron, 1 mg | $10.32 | $10.27 | $0.05 | 1.00 | 13 | 1 | n/a | n/a | $10.12 | $27.87 |
| Q0138 | HCPCS | facility | Ferumoxytol 510 MG/17ML solution 17 mL Vial | $0.36 | $0.32 | $0.04 | 1.13 | 13 | 1 | $699.03 | $489.32 | $0.31 | $0.93 |
| Q0139 | HCPCS | facility | Ferumoxytol, esrd use | $0.36 | $0.32 | $0.04 | 1.13 | 13 | 1 | n/a | n/a | $0.31 | $0.93 |
| J0565 | HCPCS | facility | Bezlotoxumab 1000 MG/40ML solution 40 mL Vial | $39.86 | $39.83 | $0.03 | 1.00 | 13 | 1 | $8169.9 | $5718.93 | $39.67 | $41.7 |
| J1434 | HCPCS | facility | Inj, focinvez, 1mg | $2.87 | $2.84 | $0.03 | 1.01 | 7 | 1 | n/a | n/a | $2.63 | $3.11 |
| J1439 | HCPCS | facility | Inj ferric carboxymaltos 1mg | $1.14 | $1.11 | $0.03 | 1.03 | 13 | 1 | n/a | n/a | $1.1 | $1.19 |
| J1885 | HCPCS | facility | Ketorolac tromethamine inj | $0.33 | $0.3 | $0.03 | 1.10 | 3 | 1 | $20.0 | $14.0 | $0.3 | $0.39 |
| J7190 | HCPCS | facility | Factor viii | $1.11 | $1.08 | $0.03 | 1.03 | 10 | 1 | n/a | n/a | $0.96 | $1.18 |
| J7207 | HCPCS | facility | Factor viii pegylated recomb | $2.13 | $2.1 | $0.03 | 1.01 | 13 | 1 | n/a | n/a | $1.85 | $2.16 |
| J7214 | HCPCS | facility | Altuviiio per factor viii iu | $4.69 | $4.66 | $0.03 | 1.01 | 12 | 1 | n/a | n/a | $4.61 | $4.94 |
| J8705 | HCPCS | facility | Topotecan oral | $124.86 | $124.83 | $0.03 | 1.00 | 13 | 1 | n/a | n/a | $103.59 | $125.09 |
| J9276 | HCPCS | facility | Inj zanidatamab-hrii, 2 mg | $25.08 | $25.05 | $0.03 | 1.00 | 5 | 1 | n/a | n/a | $25.0 | $25.08 |
| Q5118 | HCPCS | facility | Inj., zirabev, 10 mg | $25.8 | $25.77 | $0.03 | 1.00 | 13 | 1 | n/a | n/a | $20.97 | $59.47 |
| J0174 | HCPCS | facility | Inj, lecanemab-irmb | $1.34 | $1.32 | $0.02 | 1.02 | 12 | 1 | n/a | n/a | $1.32 | $1.41 |
| J0666 | HCPCS | facility | Inj, bupivacaine liposome | $1.49 | $1.47 | $0.02 | 1.01 | 5 | 1 | n/a | n/a | $1.44 | $1.49 |
| J2186 | HCPCS | facility | Inj., meropenem, vaborbactam | $2.2 | $2.18 | $0.02 | 1.01 | 13 | 1 | $374.63 | $262.24 | $2.03 | $2.54 |
| J7179 | HCPCS | facility | Vonvendi inj 1 iu vwf:rco | $1.87 | $1.85 | $0.02 | 1.01 | 13 | 1 | n/a | n/a | $1.83 | $1.89 |
| J9076 | HCPCS | facility | Inj, cyclophos (baxter) 5mg | $5.03 | $5.01 | $0.02 | 1.00 | 5 | 1 | n/a | n/a | $4.92 | $5.03 |
| C9145 | HCPCS | facility | Inj, aponvie, 1 mg | $1.92 | $1.91 | $0.01 | 1.01 | 12 | 1 | n/a | n/a | $1.84 | $2.18 |
| J0175 | HCPCS | facility | Inj, donanemab-azbt, 2 mg | $4.14 | $4.13 | $0.01 | 1.00 | 7 | 1 | n/a | n/a | $4.09 | $4.17 |
| J0291 | HCPCS | facility | Inj., plazomicin, 5 mg | $3.51 | $3.5 | $0.01 | 1.00 | 13 | 1 | n/a | n/a | $3.07 | $3.59 |
| J0739 | HCPCS | facility | Injection, cabotegravir 1 mg | $7.03 | $7.02 | $0.01 | 1.00 | 8 | 1 | n/a | n/a | $6.58 | $7.15 |
| J0751 | HCPCS | facility | Hiv prep, ftc/taf 200/25mg | $71.33 | $71.32 | $0.01 | 1.00 | 8 | 1 | n/a | n/a | $71.27 | $74.88 |
| J1072 | HCPCS | facility | Inj, testosterone, azmiro | $1.33 | $1.32 | $0.01 | 1.01 | 5 | 1 | n/a | n/a | $1.32 | $1.33 |
| J1834 | HCPCS | facility | Inj, isoniazid, 1 mg | $0.33 | $0.32 | $0.01 | 1.03 | 2 | 1 | n/a | n/a | $0.32 | $0.33 |
| J1961 | HCPCS | facility | Inj, lenacapavir, 1 mg | $22.16 | $22.15 | $0.01 | 1.00 | 12 | 1 | n/a | n/a | $21.92 | $22.65 |
| J2351 | HCPCS | facility | Inj ocrelizumab 1mg hya-ocsq | $47.24 | $47.23 | $0.01 | 1.00 | 5 | 1 | n/a | n/a | $47.05 | $47.24 |
| J2724 | HCPCS | facility | Protein C concentrate | $15.05 | $15.04 | $0.01 | 1.00 | 13 | 1 | n/a | n/a | $1.5 | $15.75 |
| J3396 | HCPCS | facility | Verteporfin injection | $11.55 | $11.54 | $0.01 | 1.00 | 13 | 1 | n/a | n/a | $11.25 | $12.04 |
| J7402 | HCPCS | facility | Mometasone sinus sinuva | $11.35 | $11.34 | $0.01 | 1.00 | 9 | 1 | n/a | n/a | $11.33 | $11.42 |
| J8522 | HCPCS | facility | Capecitabine, oral, 50 mg | $0.05 | $0.04 | $0.01 | 1.25 | 7 | 1 | n/a | n/a | $0.04 | $0.06 |
| J9295 | HCPCS | facility | Injection, necitumumab, 1 mg | $5.74 | $5.73 | $0.01 | 1.00 | 11 | 1 | n/a | n/a | $5.73 | $6.0 |
| J9328 | HCPCS | facility | Temozolomide injection | $10.4 | $10.39 | $0.01 | 1.00 | 13 | 1 | n/a | n/a | $10.38 | $10.87 |
| 90622 | HCPCS | facility | Vaccinia vrs vac 0.3 ml perq | $0.01 | $0.01 | $0.0 | 1.00 | 4 | 1 | n/a | n/a | $0.01 | $0.01 |
| J0458 | HCPCS | facility | Aztreonam/avibactam 10 mg | $1.68 | $1.68 | $0.0 | 1.00 | 2 | 1 | n/a | n/a | $1.68 | $1.68 |
| J0585 | HCPCS | facility | Injection,onabotulinumtoxina | $6.5 | $6.5 | $0.0 | 1.00 | 13 | 1 | $1352.25 | $946.58 | $6.06 | $6.51 |
| J0738 | HCPCS | facility | Hiv prep, inj, lenacapavir | $16.13 | $16.13 | $0.0 | 1.00 | 2 | 1 | n/a | n/a | $16.13 | $16.13 |
| J0875 | HCPCS | facility | Dalbavancin HCl 500 MG reconstituted solution 1 each Vial | $15.61 | $15.61 | $0.0 | 1.00 | 13 | 1 | $2245.695 | $1571.985 | $15.39 | $15.84 |
| J0891 | HCPCS | facility | Argatroban nonesrd (accord) | $1.82 | $1.82 | $0.0 | 1.00 | 9 | 1 | n/a | n/a | $0.59 | $4.51 |
| J1442 | HCPCS | facility | Inj filgrastim excl biosimil | $1.0 | $1.0 | $0.0 | 1.00 | 13 | 1 | n/a | n/a | $0.94 | $1.03 |
| J2277 | HCPCS | facility | Inj, motixafortide, 0.25 mg | $25.22 | $25.22 | $0.0 | 1.00 | 5 | 1 | n/a | n/a | $25.22 | $26.48 |
| J2798 | HCPCS | facility | Inj., perseris, 0.5 mg | $12.14 | $12.14 | $0.0 | 1.00 | 13 | 1 | n/a | n/a | $10.16 | $12.21 |
| J2799 | HCPCS | facility | Inj, uzedy, 1 mg | $25.04 | $25.04 | $0.0 | 1.00 | 7 | 1 | n/a | n/a | $24.77 | $25.08 |
| J3247 | HCPCS | facility | Inj secukinumab intrav 1mg | $17.84 | $17.84 | $0.0 | 1.00 | 8 | 1 | n/a | n/a | $17.54 | $18.07 |
| J3485 | HCPCS | facility | Zidovudine | $1.51 | $1.51 | $0.0 | 1.00 | 3 | 1 | $110.88 | $77.62 | $1.51 | $1.51 |
| J7188 | HCPCS | facility | Factor viii recomb obizur | $3.23 | $3.23 | $0.0 | 1.00 | 13 | 1 | n/a | n/a | $3.19 | $3.34 |
| J9296 | HCPCS | facility | Inj pemetrexed (accord) 10mg | $9.74 | $9.74 | $0.0 | 1.00 | 12 | 1 | n/a | n/a | $9.66 | $10.18 |
| J9333 | HCPCS | facility | Inj ronzanolixizum-noli 1 mg | $23.16 | $23.16 | $0.0 | 1.00 | 8 | 1 | n/a | n/a | $22.8 | $23.38 |
| Q2057 | HCPCS | facility | Afamitresgene autoleucel | $770620.0 | $770620.0 | $0.0 | 1.00 | 3 | 1 | n/a | n/a | $770620.0 | $770620.0 |
| J0122 | HCPCS | facility | Inj., eravacycline, 1 mg | $1.29 | $1.3 | $-0.01 | 0.99 | 9 | 1 | n/a | n/a | $1.04 | $1.3 |
| J0402 | HCPCS | facility | Inj, abilify asimtufii, 1 mg | $6.02 | $6.03 | $-0.01 | 1.00 | 8 | 1 | n/a | n/a | $5.92 | $6.03 |
| J0485 | HCPCS | facility | Belatacept injection | $3.88 | $3.89 | $-0.01 | 1.00 | 12 | 1 | n/a | n/a | $3.79 | $3.95 |
| J0870 | HCPCS | facility | Injection, imetelstat, 1 mg | $57.02 | $57.03 | $-0.01 | 1.00 | 5 | 1 | n/a | n/a | $57.02 | $58.3 |
| J2327 | HCPCS | facility | Inj risankizumab-rzaa 1 mg | $14.93 | $14.94 | $-0.01 | 1.00 | 12 | 1 | n/a | n/a | $14.63 | $16.52 |
| J2802 | HCPCS | facility | Inj, romiplostim 1 microgram | $11.0 | $11.01 | $-0.01 | 1.00 | 5 | 1 | n/a | n/a | $11.0 | $11.05 |
| J3300 | HCPCS | facility | Triamcinolone A inj PRS-free | $24.49 | $24.5 | $-0.01 | 1.00 | 9 | 1 | $319.91 | $223.94 | $3.86 | $24.51 |
| J9011 | HCPCS | facility | Datopotamab deruxtecan, 1 mg | $51.55 | $51.56 | $-0.01 | 1.00 | 2 | 1 | n/a | n/a | $51.55 | $51.56 |
| J9381 | HCPCS | facility | Inj teplizumab mzwv 5 mcg | $37.65 | $37.66 | $-0.01 | 1.00 | 12 | 1 | n/a | n/a | $36.9 | $38.39 |
| Q5110 | HCPCS | facility | Nivestym | $0.29 | $0.3 | $-0.01 | 0.97 | 13 | 1 | n/a | n/a | $0.27 | $0.52 |
| J1551 | HCPCS | facility | Inj cutaquig 100 mg | $14.21 | $14.23 | $-0.02 | 1.00 | 12 | 1 | n/a | n/a | $13.18 | $14.82 |
| J1555 | HCPCS | facility | Inj cuvitru, 100 mg | $16.82 | $16.84 | $-0.02 | 1.00 | 13 | 1 | n/a | n/a | $13.94 | $17.59 |
| J7183 | HCPCS | facility | Wilate injection | $1.27 | $1.29 | $-0.02 | 0.98 | 12 | 1 | n/a | n/a | $1.04 | $1.32 |
| J9329 | HCPCS | facility | Inj, tislelizumab-jsgr | $57.42 | $57.44 | $-0.02 | 1.00 | 5 | 1 | n/a | n/a | $57.42 | $58.37 |
| Q5148 | HCPCS | facility | Inj, nyposi 1 mcg | $0.53 | $0.55 | $-0.02 | 0.96 | 5 | 1 | n/a | n/a | $0.53 | $1.0 |
| J7204 | HCPCS | facility | Inj recombin esperoct per iu | $2.19 | $2.22 | $-0.03 | 0.99 | 13 | 1 | n/a | n/a | $2.17 | $2.26 |
| J7328 | HCPCS | facility | Gel-syn injection 0.1 mg | $0.67 | $0.7 | $-0.03 | 0.96 | 13 | 1 | n/a | n/a | $0.56 | $2.34 |
| J0589 | HCPCS | facility | Inj daxibotulinumtoxina-lanm | $3.11 | $3.15 | $-0.04 | 0.99 | 8 | 1 | n/a | n/a | $3.11 | $4.28 |
| J7336 | HCPCS | facility | Capsaicin 8% patch | $3.38 | $3.42 | $-0.04 | 0.99 | 13 | 1 | n/a | n/a | $3.25 | $3.42 |
| P9043 | HCPCS | facility | Plasma protein fract,5%,50ml | $8.07 | $8.11 | $-0.04 | 1.00 | 7 | 1 | n/a | n/a | $8.0 | $20.31 |
| J1299 | HCPCS | facility | Inj, eculizumab, 2 mg | $44.77 | $44.82 | $-0.05 | 1.00 | 5 | 1 | n/a | n/a | $44.77 | $45.03 |
| J1943 | HCPCS | facility | Inj., aristada initio, 1 mg | $3.19 | $3.24 | $-0.05 | 0.98 | 13 | 1 | n/a | n/a | $2.91 | $3.26 |
| J0209 | HCPCS | facility | Inj, sod thiosulfate (hope) | $0.82 | $0.88 | $-0.06 | 0.93 | 8 | 1 | n/a | n/a | $0.79 | $0.91 |
| J8670 | HCPCS | facility | Rolapitant, oral, 1mg | $1.8 | $1.86 | $-0.06 | 0.97 | 13 | 1 | n/a | n/a | $1.56 | $2.34 |
| J3358 | HCPCS | facility | Ustekinumab, iv inject, 1 mg | $12.92 | $12.99 | $-0.07 | 0.99 | 13 | 1 | n/a | n/a | $11.95 | $13.29 |
| J7212 | HCPCS | facility | Factor viia recomb sevenfact | $2.3 | $2.37 | $-0.07 | 0.97 | 13 | 1 | n/a | n/a | $2.19 | $2.41 |
| J7312 | HCPCS | facility | Dexamethasone intra implant | $204.54 | $204.61 | $-0.07 | 1.00 | 10 | 1 | n/a | n/a | $195.36 | $209.07 |
| J7345 | HCPCS | facility | Aminolevulinic acid, 10% gel | $1.72 | $1.79 | $-0.07 | 0.96 | 13 | 1 | n/a | n/a | $1.52 | $1.81 |
| J7213 | HCPCS | facility | Inj, ixinity, 1 i.u. | $1.83 | $1.91 | $-0.08 | 0.96 | 12 | 1 | n/a | n/a | $1.72 | $2.07 |
| J9177 | HCPCS | facility | Inj enfort vedo-ejfv 0.25mg | $36.66 | $36.74 | $-0.08 | 1.00 | 13 | 1 | n/a | n/a | $27.96 | $36.74 |
| J3424 | HCPCS | facility | Inj hydroxocobalamin iv 25mg | $5.09 | $5.18 | $-0.09 | 0.98 | 6 | 1 | n/a | n/a | $4.94 | $5.98 |
| J7177 | HCPCS | facility | Inj., fibryga, 1 mg | $1.14 | $1.23 | $-0.09 | 0.93 | 13 | 1 | n/a | n/a | $1.09 | $1.23 |
| J7211 | HCPCS | facility | Inj, kovaltry, 1 i.u. | $1.48 | $1.57 | $-0.09 | 0.94 | 13 | 1 | n/a | n/a | $1.22 | $1.58 |
| J1448 | HCPCS | facility | Injection, trilaciclib, 1mg | $5.36 | $5.46 | $-0.1 | 0.98 | 12 | 1 | n/a | n/a | $5.19 | $5.46 |
| Q5101 | HCPCS | facility | Inj filgrastim gcsf biosimil | $0.36 | $0.46 | $-0.1 | 0.78 | 9 | 1 | n/a | n/a | $0.25 | $0.46 |
| J1944 | HCPCS | facility | Aripirazole lauroxil 1 mg | $3.23 | $3.34 | $-0.11 | 0.97 | 13 | 1 | n/a | n/a | $2.9 | $3.34 |
| J2265 | HCPCS | facility | Minocycline hydrochloride | $2.56 | $2.67 | $-0.11 | 0.96 | 13 | 1 | n/a | n/a | $2.2 | $2.95 |
| J7171 | HCPCS | facility | Inj, adzynma, 10 iu | $35.48 | $35.59 | $-0.11 | 1.00 | 8 | 1 | n/a | n/a | $34.6 | $35.59 |
| J7210 | HCPCS | facility | Inj, afstyla, 1 i.u. | $1.46 | $1.57 | $-0.11 | 0.93 | 13 | 1 | n/a | n/a | $1.35 | $1.58 |
| J9072 | HCPCS | facility | Inj cyclophos dr.reddy's 5mg | $8.99 | $9.1 | $-0.11 | 0.99 | 8 | 1 | n/a | n/a | $3.72 | $9.1 |
| J2315 | HCPCS | facility | Naltrexone 380 MG reconstituted suspension 1 each Vial | $4.12 | $4.24 | $-0.12 | 0.97 | 13 | 1 | $20.0 | $14.0 | $3.43 | $4.24 |
| J3095 | HCPCS | facility | Telavancin injection | $6.99 | $7.11 | $-0.12 | 0.98 | 13 | 1 | n/a | n/a | $5.94 | $7.47 |
| J3145 | HCPCS | facility | Testosterone undecanoate 1mg | $1.95 | $2.07 | $-0.12 | 0.94 | 13 | 1 | n/a | n/a | $1.53 | $2.07 |
| J0349 | HCPCS | facility | Inj, rezafungin, 1 mg | $10.49 | $10.62 | $-0.13 | 0.99 | 12 | 1 | n/a | n/a | $10.12 | $10.82 |
| J1568 | HCPCS | facility | Octagam injection | $47.39 | $47.52 | $-0.13 | 1.00 | 13 | 1 | n/a | n/a | $41.63 | $49.0 |
| J7186 | HCPCS | facility | Antihemophilic viii/vwf comp | $1.12 | $1.25 | $-0.13 | 0.90 | 13 | 1 | n/a | n/a | $0.9 | $1.24 |
| J0699 | HCPCS | facility | Cefiderocol 1 g reconstituted solution 1 each Vial | $2.28 | $2.42 | $-0.14 | 0.94 | 12 | 1 | $396.2 | $277.34 | $2.19 | $2.42 |
| J3090 | HCPCS | facility | Inj tedizolid phosphate | $1.82 | $1.96 | $-0.14 | 0.93 | 13 | 1 | n/a | n/a | $1.59 | $1.96 |
| J7178 | HCPCS | facility | Human fibrinogen conc inj | $1.38 | $1.52 | $-0.14 | 0.91 | 13 | 1 | $1000.0 | $700.0 | $1.26 | $1.53 |
| J9030 | HCPCS | facility | Bcg live intravesical 1mg | $3.12 | $3.26 | $-0.14 | 0.96 | 9 | 1 | n/a | n/a | $2.85 | $3.28 |
| J9054 | HCPCS | facility | Inj bortezomib boruzu 0.1 mg | $26.01 | $26.15 | $-0.14 | 0.99 | 5 | 1 | n/a | n/a | $25.63 | $26.15 |
| J0222 | HCPCS | facility | Inj., patisiran, 0.1 mg | $99.82 | $99.97 | $-0.15 | 1.00 | 13 | 1 | n/a | n/a | $97.68 | $105.32 |
| J1326 | HCPCS | facility | Inj, zolbetuximab-clzb, 2 mg | $33.56 | $33.71 | $-0.15 | 1.00 | 5 | 1 | n/a | n/a | $33.56 | $33.71 |
| J9334 | HCPCS | facility | Inj efgart-alfa 2mg hya-qvfc | $33.74 | $33.89 | $-0.15 | 1.00 | 8 | 1 | n/a | n/a | $33.13 | $34.12 |
| Q2028 | HCPCS | facility | Inj, sculptra, 0.5mg | $2.01 | $2.16 | $-0.15 | 0.93 | 10 | 1 | n/a | n/a | $0.66 | $2.6 |
| 0633T | HCPCS | facility | Ct breast w/3d uni c- | $125.13 | $125.29 | $-0.16 | 1.00 | 9 | 1 | n/a | n/a | $108.97 | $275.69 |
| J7182 | HCPCS | facility | Factor viii recomb novoeight | $1.38 | $1.54 | $-0.16 | 0.90 | 13 | 1 | n/a | n/a | $1.17 | $1.55 |
| J1460 | HCPCS | facility | Gamma globulin 1 CC inj | $48.86 | $49.03 | $-0.17 | 1.00 | 13 | 1 | $359.12 | $251.38 | $43.3 | $50.07 |
| J7205 | HCPCS | facility | Factor viii fc fusion recomb | $2.26 | $2.43 | $-0.17 | 0.93 | 13 | 1 | n/a | n/a | $2.17 | $2.47 |
| J7322 | HCPCS | facility | Hymovis injection 1 mg | $17.45 | $17.62 | $-0.17 | 0.99 | 13 | 1 | n/a | n/a | $17.44 | $34.06 |
| J9118 | HCPCS | facility | Inj. calaspargase pegol-mknl | $81.91 | $82.08 | $-0.17 | 1.00 | 9 | 1 | n/a | n/a | $72.96 | $82.08 |
| J0206 | HCPCS | facility | Inj allopurinol sodium 1 mg | $4.54 | $4.72 | $-0.18 | 0.96 | 8 | 1 | n/a | n/a | $4.4 | $5.49 |
| J0217 | HCPCS | facility | Inj velmanase alfa-tycv 1 mg | $465.05 | $465.23 | $-0.18 | 1.00 | 8 | 1 | n/a | n/a | $428.4 | $465.23 |
| J9305 | HCPCS | facility | PEMEtrexed 100 MG reconstituted solution 1 each Vial | $4.18 | $4.36 | $-0.18 | 0.96 | 13 | 1 | $1396.76 | $977.73 | $3.59 | $73.19 |
| J9321 | HCPCS | facility | Inj epcoritamab-bysp 0.16 mg | $55.66 | $55.84 | $-0.18 | 1.00 | 8 | 1 | n/a | n/a | $54.17 | $56.81 |
| J9155 | HCPCS | facility | Degarelix injection | $4.26 | $4.45 | $-0.19 | 0.96 | 13 | 1 | n/a | n/a | $3.89 | $4.45 |
| J0401 | HCPCS | facility | Inj aripiprazole ext rel 1mg | $7.07 | $7.28 | $-0.21 | 0.97 | 13 | 1 | n/a | n/a | $5.7 | $7.28 |
| J7193 | HCPCS | facility | Factor ix non-recombinant | $1.19 | $1.4 | $-0.21 | 0.85 | 13 | 1 | n/a | n/a | $1.09 | $1.4 |
| J7208 | HCPCS | facility | Inj. jivi 1 iu | $2.44 | $2.65 | $-0.21 | 0.92 | 13 | 1 | n/a | n/a | $2.03 | $2.65 |
| J0121 | HCPCS | facility | Inj., omadacycline, 1 mg | $3.8 | $4.02 | $-0.22 | 0.95 | 13 | 1 | n/a | n/a | $3.27 | $4.14 |
| J2407 | HCPCS | facility | Injection, oritavancin | $28.46 | $28.68 | $-0.22 | 0.99 | 13 | 1 | n/a | n/a | $23.82 | $28.68 |
| J3055 | HCPCS | facility | Inj talquetamab-tgvs 0.25 mg | $72.4 | $72.62 | $-0.22 | 1.00 | 8 | 1 | n/a | n/a | $67.61 | $74.92 |
| J7187 | HCPCS | facility | Humate-P, inj | $1.27 | $1.49 | $-0.22 | 0.85 | 13 | 1 | $2916.0 | $2041.2 | $1.19 | $1.49 |
| J7194 | HCPCS | facility | Factor ix complex | $1.48 | $1.7 | $-0.22 | 0.87 | 13 | 1 | n/a | n/a | $1.21 | $1.7 |
| A0435 | HCPCS | facility | Fixed wing air mileage | $10.73 | $10.96 | $-0.23 | 0.98 | 8 | 5 | n/a | n/a | $8.32 | $16.13 |
| J0211 | HCPCS | facility | Inj, nithiodote, 3mg / 125mg | $2.0 | $2.23 | $-0.23 | 0.90 | 8 | 1 | n/a | n/a | $1.94 | $2.23 |
| J1554 | HCPCS | facility | Inj. asceniv | $496.51 | $496.74 | $-0.23 | 1.00 | 12 | 1 | n/a | n/a | $490.46 | $503.45 |
| J7200 | HCPCS | facility | Factor ix recombinan rixubis | $1.46 | $1.69 | $-0.23 | 0.86 | 13 | 1 | n/a | n/a | $1.4 | $1.74 |
| J7201 | HCPCS | facility | Factor ix alprolix recomb | $3.36 | $3.59 | $-0.23 | 0.94 | 13 | 1 | n/a | n/a | $3.23 | $3.6 |
| Q5106 | HCPCS | facility | Epoetin Alfa-epbx 10000 UNIT/ML solution 1 mL Vial | $7.62 | $7.85 | $-0.23 | 0.97 | 13 | 1 | $226.76 | $158.73 | $6.82 | $8.55 |
| J0257 | HCPCS | facility | Glassia injection | $5.39 | $5.64 | $-0.25 | 0.96 | 13 | 1 | n/a | n/a | $0.57 | $5.69 |
| J7185 | HCPCS | facility | Xyntha inj | $1.42 | $1.67 | $-0.25 | 0.85 | 13 | 1 | n/a | n/a | $1.23 | $1.67 |
| J7197 | HCPCS | facility | Antithrombin iii injection | $3.85 | $4.1 | $-0.25 | 0.94 | 13 | 1 | n/a | n/a | $3.48 | $4.1 |
| J7192 | HCPCS | facility | Factor viii recombinant nos | $1.35 | $1.61 | $-0.26 | 0.84 | 13 | 1 | $20.0 | $14.0 | $1.25 | $1.61 |
| J7202 | HCPCS | facility | Factor ix idelvion inj | $5.05 | $5.32 | $-0.27 | 0.95 | 13 | 1 | n/a | n/a | $4.46 | $5.34 |
| Q5136 | HCPCS | facility | Inj. denosumab-bbdz, 1 mg | $27.27 | $27.54 | $-0.27 | 0.99 | 5 | 1 | n/a | n/a | $27.27 | $28.23 |
| J0588 | HCPCS | facility | Incobotulinumtoxin a | $5.28 | $5.57 | $-0.29 | 0.95 | 13 | 1 | n/a | n/a | $5.06 | $5.57 |
| J0593 | HCPCS | facility | Inj., lanadelumab-flyo, 1 mg | $86.99 | $87.28 | $-0.29 | 1.00 | 9 | 1 | n/a | n/a | $86.38 | $87.28 |
| J0712 | HCPCS | facility | Ceftaroline fosamil inj | $3.94 | $4.23 | $-0.29 | 0.93 | 13 | 1 | $379.08 | $265.36 | $3.35 | $4.24 |
| J9176 | HCPCS | facility | Injection, elotuzumab, 1mg | $7.58 | $7.88 | $-0.3 | 0.96 | 13 | 1 | n/a | n/a | $6.67 | $8.04 |
| Q5151 | HCPCS | facility | Inj, eculizumab-aagh, 2 mg | $31.05 | $31.35 | $-0.3 | 0.99 | 5 | 1 | n/a | n/a | $31.05 | $31.67 |
| J0850 | HCPCS | facility | Cytomegalovirus imm IV /vial | $1808.33 | $1808.64 | $-0.31 | 1.00 | 13 | 1 | n/a | n/a | $1479.74 | $1814.94 |
| J7195 | HCPCS | facility | Coagulation Factor IX (Recomb) 1000 units kit 1 each Box | $1.53 | $1.85 | $-0.32 | 0.83 | 13 | 1 | $2272.5 | $1590.75 | $1.49 | $1.85 |
| J7198 | HCPCS | facility | Anti-inhibitor | $2.09 | $2.41 | $-0.32 | 0.87 | 13 | 1 | n/a | n/a | $1.94 | $2.44 |
| J2427 | HCPCS | facility | Inj, invega hafyera/trinza | $12.66 | $13.0 | $-0.34 | 0.97 | 12 | 1 | n/a | n/a | $12.53 | $13.0 |
| J7313 | HCPCS | facility | Fluocinol acet intravit imp | $497.8 | $498.14 | $-0.34 | 1.00 | 13 | 1 | n/a | n/a | $488.7 | $513.04 |
| J9035 | HCPCS | facility | Bevacizumab injection | $72.86 | $73.2 | $-0.34 | 1.00 | 13 | 1 | $4323.4 | $3026.38 | $72.26 | $75.16 |
| J2426 | HCPCS | facility | Paliperidone palmitate inj | $14.76 | $15.11 | $-0.35 | 0.98 | 13 | 1 | n/a | n/a | $12.12 | $15.11 |
| Q9968 | HCPCS | facility | Methylene Blue (Antidote) 50 MG/10ML solution 10 mL Ampule | $8.37 | $8.72 | $-0.35 | 0.96 | 13 | 1 | $431.37 | $301.96 | $3.08 | $15.96 |
| A0425 | HCPCS | facility | Ground mileage | $8.965 | $9.33 | $-0.365 | 0.96 | 10 | 5 | $49.0 | $34.3 | $6.45 | $14.97 |
| J9034 | HCPCS | facility | Bendamustine HCl 100 MG/4ML solution 4 mL Vial | $13.12 | $13.49 | $-0.37 | 0.97 | 13 | 1 | $3130.855 | $2191.6 | $12.83 | $20.17 |
| J9345 | HCPCS | facility | Inj, retifanlimab-dlwr, 1 mg | $30.19 | $30.56 | $-0.37 | 0.99 | 12 | 1 | n/a | n/a | $29.2 | $30.65 |
| J0750 | HCPCS | facility | Hiv prep, ftc/tdf 200/300mg | $1.34 | $1.73 | $-0.39 | 0.77 | 8 | 1 | n/a | n/a | $1.08 | $1.74 |
| J2786 | HCPCS | facility | Injection, reslizumab, 1mg | $10.56 | $10.95 | $-0.39 | 0.96 | 13 | 1 | n/a | n/a | $9.75 | $11.13 |
| J7172 | HCPCS | facility | Inj marstacim-hncq, 0.5 mg | $50.71 | $51.1 | $-0.39 | 0.99 | 5 | 1 | n/a | n/a | $50.47 | $51.1 |
| Q5152 | HCPCS | facility | Inj, eculizumab-aeeb, 2 mg? | $39.92 | $40.31 | $-0.39 | 0.99 | 5 | 1 | n/a | n/a | $39.92 | $42.35 |
| 0741T | HCPCS | facility | Rem auton alg nsln data coll | $44.33 | $44.73 | $-0.4 | 0.99 | 7 | 1 | n/a | n/a | $35.0 | $44.73 |
| 98978 | HCPCS | facility | Rem ther mntr dev sply cbt | $44.33 | $44.73 | $-0.4 | 0.99 | 7 | 1 | n/a | n/a | $38.03 | $44.73 |
| J7189 | HCPCS | facility | Factor viia | $2.26 | $2.66 | $-0.4 | 0.85 | 13 | 1 | $8616.34 | $6031.44 | $2.13 | $2.66 |
| C2639 | HCPCS | facility | Brachytx, non-stranded,I-125 | $36.23 | $36.64 | $-0.41 | 0.99 | 13 | 1 | n/a | n/a | $34.95 | $40.04 |
| J1558 | HCPCS | facility | Inj. xembify, 100 mg | $14.4 | $14.84 | $-0.44 | 0.97 | 13 | 1 | n/a | n/a | $14.12 | $15.06 |
| J1750 | HCPCS | facility | Inj iron dextran | $17.67 | $18.11 | $-0.44 | 0.98 | 13 | 1 | $25.17 | $17.62 | $15.05 | $18.11 |
| G0329 | HCPCS | facility | Electromagntic tx for ulcers | $11.895 | $12.35 | $-0.455 | 0.96 | 6 | 1 | n/a | n/a | $10.21 | $46.31 |
| J3304 | HCPCS | facility | Inj triamcinolone ace xr 1mg | $17.83 | $18.3 | $-0.47 | 0.97 | 13 | 1 | n/a | n/a | $17.55 | $18.58 |
| J2278 | HCPCS | facility | Ziconotide injection | $9.65 | $10.14 | $-0.49 | 0.95 | 13 | 1 | n/a | n/a | $8.48 | $10.57 |
| J2801 | HCPCS | facility | Inj, rykindo, 0.5 mg | $12.54 | $13.03 | $-0.49 | 0.96 | 5 | 1 | n/a | n/a | $12.54 | $14.01 |
| J9400 | HCPCS | facility | Inj, ziv-aflibercept, 1mg | $7.39 | $7.88 | $-0.49 | 0.94 | 13 | 1 | n/a | n/a | $6.5 | $8.5 |
| C9460 | HCPCS | facility | Injection, cangrelor | $19.47 | $19.98 | $-0.51 | 0.97 | 13 | 1 | $283.86 | $198.7 | $17.08 | $22.83 |
| Q5138 | HCPCS | facility | Inj, wezlana, iv, 1 mg | $11.12 | $11.64 | $-0.52 | 0.96 | 5 | 1 | n/a | n/a | $11.12 | $11.64 |
| J9028 | HCPCS | facility | Inj, nogapendekin pmln, 1mcg | $94.12 | $94.66 | $-0.54 | 0.99 | 5 | 1 | n/a | n/a | $94.12 | $94.73 |
| J7311 | HCPCS | facility | Fluocinolone acetonide implt | $339.76 | $340.31 | $-0.55 | 1.00 | 13 | 1 | n/a | n/a | $316.27 | $353.87 |
| J9349 | HCPCS | facility | Inj., tafasitamab-cxix | $13.745 | $14.31 | $-0.565 | 0.96 | 12 | 1 | n/a | n/a | $13.44 | $14.31 |
| J2329 | HCPCS | facility | Inj ublituximab-xiiy, 1 mg | $70.18 | $70.75 | $-0.57 | 0.99 | 12 | 1 | n/a | n/a | $69.44 | $71.9 |
| A0436 | HCPCS | facility | Rotary wing air mileage | $28.65 | $29.23 | $-0.58 | 0.98 | 8 | 5 | n/a | n/a | $22.21 | $42.99 |
| J1612 | HCPCS | facility | Inj glucagon (gvoke) 0.01 mg | $2.87 | $3.45 | $-0.58 | 0.83 | 2 | 1 | n/a | n/a | $2.87 | $3.45 |
| J7180 | HCPCS | facility | Factor XIII anti-hem factor | $10.16 | $10.76 | $-0.6 | 0.94 | 13 | 1 | n/a | n/a | $8.78 | $10.78 |
| J9382 | HCPCS | facility | Inj zenocutuzumab-zbco 1 mg | $32.3 | $32.91 | $-0.61 | 0.98 | 5 | 1 | n/a | n/a | $32.3 | $33.57 |
| J7174 | HCPCS | facility | Injection fitusiran 0.04 mg | $132.62 | $133.25 | $-0.63 | 1.00 | 2 | 1 | n/a | n/a | $132.62 | $133.25 |
| J2182 | HCPCS | facility | Injection, mepolizumab, 1mg | $30.63 | $31.27 | $-0.64 | 0.98 | 13 | 1 | n/a | n/a | $28.86 | $31.89 |
| J1575 | HCPCS | facility | Hyqvia 100mg immuneglobulin | $17.5 | $18.15 | $-0.65 | 0.96 | 13 | 1 | n/a | n/a | $14.34 | $18.39 |
| Q9997 | HCPCS | facility | Ustekinumab-ttwe iv inj 1 mg | $8.63 | $9.29 | $-0.66 | 0.93 | 5 | 1 | n/a | n/a | $8.27 | $9.29 |
| J7175 | HCPCS | facility | Inj, factor x, (human), 1iu | $9.11 | $9.78 | $-0.67 | 0.93 | 13 | 1 | n/a | n/a | $7.89 | $9.92 |
| J0248 | HCPCS | facility | Inj, remdesivir, 1 mg? | $6.055 | $6.73 | $-0.675 | 0.90 | 12 | 1 | $1170.0 | $819.0 | $5.51 | $6.73 |
| J0256 | HCPCS | facility | Alpha 1 proteinase inhibitor | $4.78 | $5.46 | $-0.68 | 0.88 | 13 | 1 | $1035.0 | $724.5 | $0.52 | $5.46 |
| J0587 | HCPCS | facility | Inj, rimabotulinumtoxinb | $12.61 | $13.29 | $-0.68 | 0.95 | 13 | 1 | $597.71 | $418.4 | $11.97 | $13.29 |
| 93291 | HCPCS | facility | HC ILR DEVICE INTERROGATE | $33.95 | $34.66 | $-0.71 | 0.98 | 10 | 1 | $83.0 | $58.1 | $19.63 | $54.52 |
| J9210 | HCPCS | facility | Inj., emapalumab-lzsg, 1 mg | $384.13 | $384.85 | $-0.72 | 1.00 | 13 | 1 | n/a | n/a | $366.67 | $393.16 |
| J9063 | HCPCS | facility | Inj, elahere, 1 mg | $68.76 | $69.49 | $-0.73 | 0.99 | 12 | 1 | n/a | n/a | $66.76 | $71.17 |
| J0741 | HCPCS | facility | Inj, cabote rilpivir 2mg 3mg | $22.91 | $23.65 | $-0.74 | 0.97 | 12 | 1 | n/a | n/a | $21.83 | $24.16 |
| J1302 | HCPCS | facility | Inj, sutimlimab-jome, 10 mg | $18.11 | $18.86 | $-0.75 | 0.96 | 12 | 1 | n/a | n/a | $17.63 | $19.03 |
| J1201 | HCPCS | facility | Inj. cetirizine hcl 0.5mg | $15.76 | $16.52 | $-0.76 | 0.95 | 13 | 1 | n/a | n/a | $14.87 | $17.1 |
| J0491 | HCPCS | facility | Inj anifrolumab-fnia 1mg | $17.31 | $18.08 | $-0.77 | 0.96 | 12 | 1 | n/a | n/a | $16.75 | $18.34 |
| J0885 | HCPCS | facility | Epoetin alfa, non-esrd | $7.74 | $8.54 | $-0.8 | 0.91 | 13 | 1 | $296.74 | $207.72 | $7.53 | $8.82 |
| J9119 | HCPCS | facility | Inj., cemiplimab-rwlc, 1 mg | $28.49 | $29.29 | $-0.8 | 0.97 | 13 | 1 | n/a | n/a | $27.4 | $29.29 |
| J9322 | HCPCS | facility | Inj pemetrexed (bluepoint) | $9.8 | $10.6 | $-0.8 | 0.92 | 8 | 1 | n/a | n/a | $9.29 | $10.6 |
| J1951 | HCPCS | facility | Inj fensolvi 0.25 mg | $140.16 | $140.99 | $-0.83 | 0.99 | 12 | 1 | n/a | n/a | $139.0 | $140.99 |
| J0695 | HCPCS | facility | Inj ceftolozane tazobactam | $8.23 | $9.07 | $-0.84 | 0.91 | 13 | 1 | $281.73 | $197.21 | $6.43 | $9.13 |
| J9289 | HCPCS | facility | Inj nivolumab 2 mg hyaluron | $26.48 | $27.36 | $-0.88 | 0.97 | 5 | 1 | n/a | n/a | $26.48 | $27.8 |
| J3111 | HCPCS | facility | Inj. romosozumab-aqqg 1 mg | $11.17 | $12.07 | $-0.9 | 0.93 | 13 | 1 | n/a | n/a | $9.0 | $12.11 |
| J7173 | HCPCS | facility | Inj. concizumab-mtci, 0.5 mg | $85.5 | $86.4 | $-0.9 | 0.99 | 2 | 1 | n/a | n/a | $85.5 | $86.4 |
| J7181 | HCPCS | facility | Factor xiii recomb a-subunit | $17.26 | $18.16 | $-0.9 | 0.95 | 13 | 1 | n/a | n/a | $15.45 | $18.56 |
| J9306 | HCPCS | facility | Injection, pertuzumab, 1 mg | $16.12 | $17.02 | $-0.9 | 0.95 | 13 | 1 | $11377.83 | $7964.48 | $12.99 | $17.02 |
| 93297 | HCPCS | facility | Icm device interrogat remote | $43.82 | $44.73 | $-0.91 | 0.98 | 3 | 1 | n/a | n/a | $43.82 | $44.73 |
| J1561 | HCPCS | facility | Gamunex-c/gammaked | $48.03 | $48.96 | $-0.93 | 0.98 | 13 | 1 | n/a | n/a | $43.67 | $49.58 |
| J9172 | HCPCS | facility | Docetaxel (ingenus), 1 mg | $49.76 | $50.78 | $-1.02 | 0.98 | 7 | 1 | n/a | n/a | $49.08 | $50.78 |
| J2850 | HCPCS | facility | Inj secretin synthetic human | $39.48 | $40.52 | $-1.04 | 0.97 | 10 | 1 | n/a | n/a | $34.78 | $47.1 |
| J1559 | HCPCS | facility | Hizentra injection | $13.23 | $14.34 | $-1.11 | 0.92 | 13 | 1 | n/a | n/a | $11.09 | $14.54 |
| J0614 | HCPCS | facility | Inj, treosulfan, 50 mg | $31.21 | $32.33 | $-1.12 | 0.97 | 2 | 1 | n/a | n/a | $31.21 | $32.33 |
| J2998 | HCPCS | facility | Inj plasminogen tvmh 1mg | $31.65 | $32.77 | $-1.12 | 0.97 | 9 | 1 | n/a | n/a | $30.1 | $45.5 |
| J2267 | HCPCS | facility | Inj, mirikizumab-mrkz, 1 mg | $41.92 | $43.05 | $-1.13 | 0.97 | 8 | 1 | n/a | n/a | $34.74 | $48.27 |
| J9246 | HCPCS | facility | Inj., evomela, 1 mg | $17.35 | $18.5 | $-1.15 | 0.94 | 13 | 1 | n/a | n/a | $15.06 | $45.6 |
| J1931 | HCPCS | facility | Laronidase injection | $38.7 | $39.87 | $-1.17 | 0.97 | 13 | 1 | n/a | n/a | $33.12 | $39.95 |
| J9299 | HCPCS | facility | Injection, nivolumab | $31.75 | $32.96 | $-1.21 | 0.96 | 13 | 1 | n/a | n/a | $28.54 | $33.57 |
| J9205 | HCPCS | facility | Inj irinotecan liposome 1 mg | $64.77 | $66.0 | $-1.23 | 0.98 | 13 | 1 | n/a | n/a | $54.31 | $66.0 |
| J9380 | HCPCS | facility | Inj teclistamab cqyv 0.5 mg | $32.33 | $33.58 | $-1.25 | 0.96 | 12 | 1 | n/a | n/a | $31.75 | $34.58 |
| J3032 | HCPCS | facility | Inj. eptinezumab-jjmr 1 mg | $18.69 | $19.97 | $-1.28 | 0.94 | 13 | 1 | n/a | n/a | $15.6 | $20.5 |
| Q5119 | HCPCS | facility | Inj ruxience, 10 mg | $26.5 | $27.84 | $-1.34 | 0.95 | 13 | 1 | $3726.905 | $2608.835 | $13.27 | $67.32 |
| J0896 | HCPCS | facility | Inj luspatercept-aamt 0.25mg | $40.62 | $41.98 | $-1.36 | 0.97 | 13 | 1 | n/a | n/a | $36.31 | $42.77 |
| J1203 | HCPCS | facility | Inj, cipaglucosidase, 5 mg | $89.8 | $91.21 | $-1.41 | 0.98 | 8 | 1 | n/a | n/a | $88.06 | $91.21 |
| A9615 | HCPCS | facility | Inj, pegulicianine, 1 mg | $36.09 | $37.51 | $-1.42 | 0.96 | 5 | 1 | n/a | n/a | $36.09 | $40.34 |
| J1096 | HCPCS | facility | Dexametha opth insert 0.1 mg | $101.49 | $102.94 | $-1.45 | 0.99 | 9 | 1 | n/a | n/a | $98.66 | $153.57 |
| J7351 | HCPCS | facility | Inj bimatoprost itc imp 1mcg | $212.36 | $213.84 | $-1.48 | 0.99 | 13 | 1 | n/a | n/a | $206.38 | $215.61 |
| C2699 | HCPCS | facility | Brachytx, non-stranded, NOS | $35.11 | $36.64 | $-1.53 | 0.96 | 10 | 1 | n/a | n/a | $34.95 | $36.64 |
| J8612 | HCPCS | facility | Oral methotrexate (xatmep) | $21.08 | $22.68 | $-1.6 | 0.93 | 6 | 1 | n/a | n/a | $19.5 | $22.68 |
| J9317 | HCPCS | facility | Sacituzumab govitecan-hziy | $34.67 | $36.28 | $-1.61 | 0.96 | 13 | 1 | n/a | n/a | $29.51 | $36.98 |
| J9354 | HCPCS | facility | Inj, ado-trastuzumab emt 1mg | $40.45 | $42.16 | $-1.71 | 0.96 | 13 | 1 | n/a | n/a | $32.85 | $42.19 |
| J9292 | HCPCS | facility | Inj, pemetrexed (avyxa) 10mg | $80.58 | $82.34 | $-1.76 | 0.98 | 5 | 1 | n/a | n/a | $80.58 | $82.34 |
| J9061 | HCPCS | facility | Inj, amivantamab-vmjw | $20.67 | $22.54 | $-1.87 | 0.92 | 12 | 1 | n/a | n/a | $19.59 | $22.56 |
| J0490 | HCPCS | facility | Belimumab injection | $54.15 | $56.07 | $-1.92 | 0.97 | 13 | 1 | n/a | n/a | $46.84 | $57.16 |
| 98976 | HCPCS | facility | Rem ther mntr dev sply resp | $42.8 | $44.73 | $-1.93 | 0.96 | 9 | 1 | n/a | n/a | $38.03 | $93.75 |
| 98977 | HCPCS | facility | Rem ther mntr dv sply mscskl | $42.8 | $44.73 | $-1.93 | 0.96 | 9 | 1 | n/a | n/a | $38.03 | $93.75 |
| J1459 | HCPCS | facility | Inj IVIG privigen 500 mg | $48.8 | $50.74 | $-1.94 | 0.96 | 13 | 1 | $1551.6 | $1086.12 | $42.43 | $50.74 |
| J0391 | HCPCS | facility | Inj, artesunate, 1mg | $49.87 | $51.83 | $-1.96 | 0.96 | 8 | 1 | n/a | n/a | $46.18 | $55.74 |
| J1640 | HCPCS | facility | Hemin 350 MG reconstituted solution 1 each Vial | $32.2 | $34.18 | $-1.98 | 0.94 | 13 | 1 | $15547.83 | $10883.48 | $24.43 | $35.31 |
| J9174 | HCPCS | facility | Inj, docetaxel (beizray) 1mg | $50.49 | $52.47 | $-1.98 | 0.96 | 5 | 1 | n/a | n/a | $50.49 | $52.47 |
| 89264 | HCPCS | facility | Identify sperm tissue | $60.45 | $62.45 | $-2.0 | 0.97 | 9 | 1 | n/a | n/a | $58.3 | $157.69 |
| 89335 | HCPCS | facility | Cryopreserve testicular tiss | $60.45 | $62.45 | $-2.0 | 0.97 | 9 | 1 | n/a | n/a | $58.86 | $157.01 |
| 89353 | HCPCS | facility | Thawing cryopresrved sperm | $60.45 | $62.45 | $-2.0 | 0.97 | 9 | 1 | n/a | n/a | $58.3 | $157.01 |
| J0596 | HCPCS | facility | Injection, ruconest | $34.72 | $36.77 | $-2.05 | 0.94 | 13 | 1 | n/a | n/a | $28.98 | $36.78 |
| J9271 | HCPCS | facility | Inj pembrolizumab | $58.22 | $60.29 | $-2.07 | 0.97 | 13 | 1 | n/a | n/a | $50.65 | $60.29 |
| J9038 | HCPCS | facility | Inj axatilimab-csfr 0.1 mg | $53.55 | $55.65 | $-2.1 | 0.96 | 5 | 1 | n/a | n/a | $53.55 | $55.65 |
| J9358 | HCPCS | facility | Inj fam-trastu deru-nxki 1mg | $27.81 | $29.98 | $-2.17 | 0.93 | 13 | 1 | n/a | n/a | $24.13 | $31.3 |
| J0598 | HCPCS | facility | C-1 esterase, cinryze | $63.45 | $65.63 | $-2.18 | 0.97 | 13 | 1 | n/a | n/a | $56.41 | $65.63 |
| J0567 | HCPCS | facility | Inj., cerliponase alfa 1 mg | $118.17 | $120.36 | $-2.19 | 0.98 | 9 | 1 | n/a | n/a | $104.65 | $133.65 |
| J1746 | HCPCS | facility | Inj., ibalizumab-uiyk, 10 mg | $77.06 | $79.26 | $-2.2 | 0.97 | 13 | 1 | n/a | n/a | $64.05 | $79.39 |
| J2508 | HCPCS | facility | Pegunigalsidase alfa-iwxj | $225.95 | $228.16 | $-2.21 | 0.99 | 8 | 1 | n/a | n/a | $221.43 | $230.28 |
| 93260 | HCPCS | facility | HC PROGRAMMING DEVICE EVAL; IMPLANTABLE SUBCUT LEAD DEFIBRILLATOR SYSTEM | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | $382.0 | $267.4 | $33.95 | $91.53 |
| 93261 | HCPCS | facility | HC IMPL SUBQ DEFIB INTERROGATION | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | $126.0 | $88.2 | $33.95 | $91.53 |
| 93279 | HCPCS | facility | HC PROG DEVICE EVAL; SINGLE LEAD PACER/LEADLESS PACER 1 CARDIAC CHAMBER | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | $87.0 | $60.9 | $33.95 | $91.53 |
| 93280 | HCPCS | facility | Pm device progr eval dual | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $33.95 | $91.53 |
| 93281 | HCPCS | facility | Pm device progr eval multi | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $33.95 | $91.53 |
| 93282 | HCPCS | facility | Prgrmg eval implantable dfb | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $33.95 | $91.53 |
| 93283 | HCPCS | facility | HC ICD DEVICE PROGR EVAL, DUAL | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | $182.0 | $127.4 | $33.95 | $91.53 |
| 93284 | HCPCS | facility | Prgrmg eval implantable dfb | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $33.95 | $91.53 |
| 93285 | HCPCS | facility | Ilr device eval progr | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $33.95 | $91.53 |
| 93288 | HCPCS | facility | HC INTERROGATE DEV EVAL;SINGLE, DUAL, MULTI LEAD PACER/LEADLESS PACER SYS | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | $87.0 | $60.9 | $33.95 | $91.53 |
| 93289 | HCPCS | facility | HC ICD DEVICE INTERROGATE | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | $131.0 | $91.7 | $33.95 | $91.53 |
| 93290 | HCPCS | facility | Icm device eval | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $23.43 | $91.53 |
| 93292 | HCPCS | facility | Wcd device interrogate | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $33.95 | $91.53 |
| 93293 | HCPCS | facility | Pm phone r-strip device eval | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $33.95 | $91.53 |
| 93296 | HCPCS | facility | HC INTERROG DEV EVAL REMOTE, UP TO 90 DAYS; PM/LDLS PM/IDS | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | $118.0 | $82.6 | $33.95 | $91.53 |
| 95836 | HCPCS | facility | Ecog impltd brn npgt <=30 d | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $37.16 | $91.53 |
| 99454 | HCPCS | facility | Rem mntr physiol param dev | $42.49 | $44.73 | $-2.24 | 0.95 | 10 | 1 | n/a | n/a | $37.16 | $91.53 |
| J0578 | HCPCS | facility | Inj brixadi, more than 7 day | $1680.21 | $1682.54 | $-2.33 | 1.00 | 8 | 1 | n/a | n/a | $1363.66 | $1716.62 |
| J9274 | HCPCS | facility | Inj, tebentafusp-tebn, 1 mcg | $214.76 | $217.09 | $-2.33 | 0.99 | 12 | 1 | n/a | n/a | $206.1 | $222.21 |
| J9314 | HCPCS | facility | Inj pemetrexed (teva) 10mg | $13.165 | $15.54 | $-2.375 | 0.85 | 12 | 1 | n/a | n/a | $3.79 | $33.43 |
| J9032 | HCPCS | facility | Injection, belinostat, 10mg | $50.09 | $52.47 | $-2.38 | 0.95 | 13 | 1 | n/a | n/a | $42.7 | $53.11 |
| J0897 | HCPCS | facility | Denosumab injection | $26.96 | $29.38 | $-2.42 | 0.92 | 13 | 1 | n/a | n/a | $20.11 | $29.46 |
| 76981 | HCPCS | facility | HC ULTRASOUND, ELASTOGRAPHY; PARENCHYMA | $122.85 | $125.29 | $-2.44 | 0.98 | 10 | 1 | $668.0 | $467.6 | $112.51 | $334.0 |
| 76982 | HCPCS | facility | HC ULTRASOUND, ELASTOGRAPHY; 1ST TARGET LESION | $122.85 | $125.29 | $-2.44 | 0.98 | 10 | 1 | $668.0 | $467.6 | $112.51 | $334.0 |
| 93986 | HCPCS | facility | Dup-scan hemo compl uni std | $122.84 | $125.29 | $-2.45 | 0.98 | 10 | 1 | $294.0 | $205.8 | $112.07 | $275.69 |
| J9249 | HCPCS | facility | Inj, melphalan (apotex) 1 mg | $62.33 | $64.78 | $-2.45 | 0.96 | 5 | 1 | n/a | n/a | $62.33 | $69.66 |
| J2997 | HCPCS | facility | Alteplase recombinant | $91.99 | $94.45 | $-2.46 | 0.97 | 13 | 1 | $13757.765 | $9630.435 | $87.43 | $94.45 |
| J0223 | HCPCS | facility | Inj givosiran 0.5 mg | $114.82 | $117.36 | $-2.54 | 0.98 | 13 | 1 | n/a | n/a | $106.88 | $120.69 |
| C9482 | HCPCS | facility | Sotalol hydrochloride IV | $22.41 | $25.05 | $-2.64 | 0.89 | 13 | 1 | n/a | n/a | $17.2 | $27.53 |
| 90480 | HCPCS | facility | Admn sarscov2 vacc 1 dose | $46.05 | $48.7 | $-2.65 | 0.95 | 9 | 1 | $55.0 | $38.5 | $45.88 | $48.7 |
| J9021 | HCPCS | facility | Inj, aspara, rylaze, 0.1 mg | $52.79 | $55.47 | $-2.68 | 0.95 | 12 | 1 | n/a | n/a | $48.22 | $56.18 |
| J1747 | HCPCS | facility | Inj, spesolimab-sbzo, 1 mg | $62.93 | $65.73 | $-2.8 | 0.96 | 12 | 1 | n/a | n/a | $61.42 | $65.73 |
| J9055 | HCPCS | facility | Cetuximab injection | $75.48 | $78.37 | $-2.89 | 0.96 | 13 | 1 | n/a | n/a | $65.48 | $80.34 |
| J3397 | HCPCS | facility | Inj., vestronidase alfa-vjbk | $277.03 | $279.93 | $-2.9 | 0.99 | 9 | 1 | n/a | n/a | $247.15 | $309.62 |
| M0201 | HCPCS | facility | Covid-19 vaccine home admin | $40.26 | $43.23 | $-2.97 | 0.93 | 9 | 1 | n/a | n/a | $39.95 | $43.23 |
| J0219 | HCPCS | facility | Inj aval alfa-nqpt 4mg | $77.75 | $80.91 | $-3.16 | 0.96 | 12 | 1 | n/a | n/a | $75.21 | $81.3 |
| G0008 | HCPCS | facility | Admin influenza virus vac | $52.89 | $56.12 | $-3.23 | 0.94 | 10 | 1 | $133.0 | $93.1 | $27.01 | $109.06 |
| G0009 | HCPCS | facility | Admin pneumococcal vaccine | $52.89 | $56.12 | $-3.23 | 0.94 | 10 | 1 | $165.0 | $115.5 | $27.01 | $109.06 |
| G0010 | HCPCS | facility | Admin hepatitis b vaccine | $52.89 | $56.12 | $-3.23 | 0.94 | 10 | 1 | $165.0 | $115.5 | $27.01 | $109.06 |
| J7355 | HCPCS | facility | Inj travoprost intra impl | $192.485 | $195.72 | $-3.235 | 0.98 | 6 | 1 | n/a | n/a | $189.72 | $195.72 |
| J7170 | HCPCS | facility | Inj., emicizumab-kxwh 0.5 mg | $52.82 | $56.1 | $-3.28 | 0.94 | 13 | 1 | n/a | n/a | $47.75 | $57.43 |
| J9308 | HCPCS | facility | Injection, ramucirumab | $71.07 | $74.36 | $-3.29 | 0.96 | 13 | 1 | n/a | n/a | $61.66 | $75.58 |
| J9173 | HCPCS | facility | Inj., durvalumab, 10 mg | $81.82 | $85.12 | $-3.3 | 0.96 | 13 | 1 | n/a | n/a | $77.05 | $86.27 |
| J9376 | HCPCS | facility | Inj pozelimab-bbfg, 1 mg | $88.27 | $91.73 | $-3.46 | 0.96 | 5 | 1 | n/a | n/a | $88.27 | $98.66 |
| J2760 | HCPCS | facility | Phentolaine mesylate inj | $428.52 | $432.02 | $-3.5 | 0.99 | 7 | 1 | $803.88 | $562.72 | $356.88 | $432.08 |
| J0475 | HCPCS | facility | Baclofen 10 mg injection | $177.7 | $181.22 | $-3.52 | 0.98 | 13 | 1 | $251.875 | $176.31 | $174.58 | $190.49 |
| J9223 | HCPCS | facility | Inj. lurbinectedin, 0.1 mg | $203.6 | $207.13 | $-3.53 | 0.98 | 13 | 1 | n/a | n/a | $158.76 | $210.78 |
| J9325 | HCPCS | facility | Inj talimogene laherparepvec | $70.36 | $73.94 | $-3.58 | 0.95 | 13 | 1 | n/a | n/a | $54.02 | $73.94 |
| A9530 | HCPCS | facility | I131 iodide sol, rx | $17.17 | $20.77 | $-3.6 | 0.83 | 12 | 1 | n/a | n/a | $12.4 | $20.88 |
| J1576 | HCPCS | facility | Inj, panzyga, 500 mg | $69.235 | $73.0 | $-3.765 | 0.95 | 12 | 1 | n/a | n/a | $67.46 | $74.46 |
| J0224 | HCPCS | facility | Inj. lumasiran, 0.5 mg | $325.26 | $329.05 | $-3.79 | 0.99 | 12 | 1 | n/a | n/a | $317.88 | $329.1 |
| J9227 | HCPCS | facility | Inj. isatuximab-irfc 10 mg | $78.05 | $81.9 | $-3.85 | 0.95 | 13 | 1 | n/a | n/a | $66.37 | $84.3 |
| J7169 | HCPCS | facility | Inj andexxa, 10 mg | $127.5 | $131.38 | $-3.88 | 0.97 | 10 | 1 | n/a | n/a | $106.39 | $313.5 |
| J9217 | HCPCS | facility | Leuprolide acetate suspnsion | $172.53 | $176.45 | $-3.92 | 0.98 | 13 | 1 | $2850.91 | $1995.64 | $155.42 | $228.93 |
| J1304 | HCPCS | facility | Inj tofersen intrathec 1 mg | $155.34 | $159.4 | $-4.06 | 0.97 | 8 | 1 | n/a | n/a | $150.83 | $160.01 |
| J1611 | HCPCS | facility | Glucagon HCl (Diagnostic) 1 MG reconstituted solution 1 each Vial | $144.88 | $148.99 | $-4.11 | 0.97 | 12 | 1 | $238.52 | $166.96 | $108.93 | $169.3 |
| P9037 | HCPCS | facility | HC PLTS, PHERESIS, IRRAD, UNIT | $676.5 | $680.61 | $-4.11 | 0.99 | 9 | 1 | $2006.0 | $1404.2 | $674.16 | $714.64 |
| 86079 | HCPCS | facility | Phys blood bank serv authrj | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | n/a | n/a | $23.43 | $157.01 |
| 86850 | HCPCS | facility | HC ANTIBODY SCREEN, RBC | $58.3 | $62.45 | $-4.15 | 0.93 | 10 | 1 | $257.0 | $179.9 | $9.77 | $157.01 |
| 88112 | HCPCS | facility | Cytopath cell enhance tech | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | $615.0 | $430.5 | $23.43 | $157.01 |
| 88162 | HCPCS | facility | Cytopath smear other source | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | n/a | n/a | $23.43 | $157.01 |
| 88173 | HCPCS | facility | Cytopath eval fna report | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | $274.0 | $191.8 | $38.1 | $157.01 |
| 88182 | HCPCS | facility | Cell marker study | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | $212.0 | $148.4 | $38.1 | $157.01 |
| 88304 | HCPCS | facility | HC LEVEL III (SMALL) | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | $335.0 | $234.5 | $23.43 | $157.01 |
| 88305 | HCPCS | facility | HC LEVEL IV (LARGE) | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | $538.0 | $376.6 | $38.1 | $157.01 |
| 88312 | HCPCS | facility | HC SPECIAL STAIN FOR ORGANISM | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | $719.0 | $503.3 | $23.43 | $157.01 |
| 88323 | HCPCS | facility | HC CONSULT & REPORT, REF MATERIAL REQ PREP OF SLIDES | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | $255.0 | $178.5 | $38.1 | $157.01 |
| 88356 | HCPCS | facility | Analysis nerve | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | n/a | n/a | $38.1 | $157.01 |
| 89230 | HCPCS | facility | Collect sweat for test | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | n/a | n/a | $38.1 | $157.01 |
| 89257 | HCPCS | facility | Sperm identification | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | n/a | n/a | $23.43 | $157.01 |
| 89260 | HCPCS | facility | Sperm isolation simple | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | n/a | n/a | $38.1 | $157.01 |
| 89261 | HCPCS | facility | Sperm isolation complex | $58.3 | $62.45 | $-4.15 | 0.93 | 9 | 1 | n/a | n/a | $38.1 | $157.01 |
| J0714 | HCPCS | facility | Ceftazidime and avibactam | $100.58 | $104.73 | $-4.15 | 0.96 | 13 | 1 | $806.92 | $564.84 | $92.28 | $104.95 |
| J9144 | HCPCS | facility | Daratumumab, hyaluronidase | $51.41 | $55.57 | $-4.16 | 0.93 | 13 | 1 | n/a | n/a | $43.85 | $55.57 |
| 92145 | HCPCS | facility | Corneal hysteresis deter | $66.52 | $70.7 | $-4.18 | 0.94 | 9 | 1 | n/a | n/a | $48.41 | $87.52 |
| P9017 | HCPCS | facility | Plasma 1 donor frz w/in 8 hr | $81.8 | $85.98 | $-4.18 | 0.95 | 9 | 1 | n/a | n/a | $78.71 | $90.48 |
| J9048 | HCPCS | facility | Inj, bortezomib freseniuskab | $2.78 | $6.97 | $-4.19 | 0.40 | 9 | 1 | n/a | n/a | $2.68 | $52.21 |
| J2357 | HCPCS | facility | Omalizumab injection | $40.39 | $44.6 | $-4.21 | 0.91 | 13 | 1 | n/a | n/a | $37.42 | $45.5 |
| J9353 | HCPCS | facility | Inj. margetuximab-cmkb, 5 mg | $48.21 | $52.49 | $-4.28 | 0.92 | 12 | 1 | n/a | n/a | $45.78 | $53.75 |
| J9301 | HCPCS | facility | Obinutuzumab inj | $74.59 | $79.0 | $-4.41 | 0.94 | 13 | 1 | n/a | n/a | $63.54 | $81.63 |
| J0221 | HCPCS | facility | Lumizyme injection | $201.97 | $206.59 | $-4.62 | 0.98 | 13 | 1 | n/a | n/a | $174.63 | $207.39 |
| 29131 | HCPCS | facility | Application of finger splint | $65.97 | $70.7 | $-4.73 | 0.93 | 10 | 1 | $365.0 | $255.5 | $53.93 | $147.93 |
| 29550 | HCPCS | facility | HC STRAPPING, TOES | $65.97 | $70.7 | $-4.73 | 0.93 | 10 | 1 | $363.0 | $254.1 | $53.93 | $147.93 |
| J0775 | HCPCS | facility | Collagenase, clost hist inj | $71.16 | $75.9 | $-4.74 | 0.94 | 13 | 1 | n/a | n/a | $52.62 | $75.9 |
| 93153 | HCPCS | facility | Interrog w/o prgrmg ipnss | $109.17 | $113.94 | $-4.77 | 0.96 | 3 | 1 | n/a | n/a | $109.17 | $113.94 |
| 0634T | HCPCS | facility | Ct breast w/3d uni c+ | $205.3 | $210.21 | $-4.91 | 0.98 | 9 | 1 | n/a | n/a | $178.55 | $464.28 |
| 0635T | HCPCS | facility | Ct breast w/3d uni c-/c+ | $205.3 | $210.21 | $-4.91 | 0.98 | 9 | 1 | n/a | n/a | $178.55 | $464.28 |
| J9023 | HCPCS | facility | Injection, avelumab, 10 mg | $95.18 | $100.09 | $-4.91 | 0.95 | 13 | 1 | n/a | n/a | $85.33 | $104.99 |
| 90471 | HCPCS | facility | HC IMMUNIZATION ADMIN, SINGLE VACCINE | $81.33 | $86.29 | $-4.96 | 0.94 | 10 | 1 | $165.0 | $115.5 | $39.13 | $170.05 |
| 90473 | HCPCS | facility | Immune admin oral/nasal | $81.33 | $86.29 | $-4.96 | 0.94 | 9 | 1 | n/a | n/a | $27.01 | $170.05 |
| G0012 | HCPCS | facility | HC INJ PRE-EXPOSURE PROPHYLAXIS DRUG FOR HIV PREVENTION | $81.33 | $86.29 | $-4.96 | 0.94 | 2 | 1 | $165.0 | $115.5 | $81.33 | $86.29 |
| J9022 | HCPCS | facility | Atezolizumab 1200 MG/20ML solution 20 mL Vial | $86.24 | $91.34 | $-5.1 | 0.94 | 13 | 1 | $19767.19 | $13837.03 | $78.18 | $93.91 |
| J9207 | HCPCS | facility | Ixabepilone injection | $134.06 | $139.21 | $-5.15 | 0.96 | 13 | 1 | n/a | n/a | $102.12 | $139.98 |
| 92622 | HCPCS | facility | Dx aly aud oi snd prcsr 1st | $148.98 | $154.21 | $-5.23 | 0.97 | 5 | 1 | n/a | n/a | $148.98 | $160.51 |
| J7326 | HCPCS | facility | Gel-one | $524.02 | $529.26 | $-5.24 | 0.99 | 13 | 1 | n/a | n/a | $510.15 | $1311.0 |
| J7191 | HCPCS | facility | Factor viii (porcine) | $0.21 | $5.46 | $-5.25 | 0.04 | 7 | 1 | n/a | n/a | $0.21 | $5.46 |
| 80503 | HCPCS | facility | Path clin consltj sf 5-20 | $57.11 | $62.45 | $-5.34 | 0.91 | 9 | 1 | n/a | n/a | $50.75 | $157.01 |
| 76380 | HCPCS | facility | CAT scan follow-up study | $98.87 | $104.29 | $-5.42 | 0.95 | 10 | 1 | $150.0 | $105.0 | $71.24 | $261.27 |
| 29044 | HCPCS | facility | Application of body cast | $189.14 | $194.75 | $-5.61 | 0.97 | 10 | 1 | n/a | n/a | $153.95 | $375.94 |
| 69210 | HCPCS | facility | HC REMOVE IMPACTED CERUMEN,WO AFT | $65.08 | $70.7 | $-5.62 | 0.92 | 11 | 1 | $126.0 | $88.2 | $49.64 | $274.76 |
| J1557 | HCPCS | facility | Gammaplex injection | $57.93 | $63.68 | $-5.75 | 0.91 | 13 | 1 | n/a | n/a | $49.81 | $63.93 |
| J0558 | HCPCS | facility | PenG benzathine/procaine inj | $13.76 | $19.52 | $-5.76 | 0.70 | 7 | 1 | n/a | n/a | $12.01 | $19.52 |
| P9057 | HCPCS | facility | RBC, frz/deg/wsh, l/r, irrad | $416.87 | $422.69 | $-5.82 | 0.99 | 7 | 1 | n/a | n/a | $368.69 | $422.69 |
| 0417T | HCPCS | facility | Prgrmg eval cardiac modulj | $38.81 | $44.73 | $-5.92 | 0.87 | 6 | 1 | n/a | n/a | $35.13 | $44.73 |
| 0418T | HCPCS | facility | Interro eval cardiac modulj | $38.81 | $44.73 | $-5.92 | 0.87 | 6 | 1 | n/a | n/a | $35.13 | $44.73 |
| J9047 | HCPCS | facility | Injection, carfilzomib, 1 mg | $49.58 | $55.65 | $-6.07 | 0.89 | 13 | 1 | $1024.11 | $716.88 | $39.35 | $55.65 |
| 51798 | HCPCS | facility | HC MEASURE POST-VOIDING RESIDUAL URINE/BLADDER CAP ULTRA, NON-IMAG | $64.5 | $70.7 | $-6.2 | 0.91 | 10 | 1 | $191.0 | $133.7 | $49.64 | $147.93 |
| J2783 | HCPCS | facility | Rasburicase | $371.29 | $377.52 | $-6.23 | 0.98 | 13 | 1 | $2205.29 | $1543.7 | $306.14 | $383.37 |
| J9145 | HCPCS | facility | Injection, daratumumab 10 mg | $65.12 | $71.37 | $-6.25 | 0.91 | 13 | 1 | $4983.18 | $3488.23 | $56.04 | $71.37 |
| 93242 | HCPCS | facility | Ext ecg>48hr<7d recording | $38.46 | $44.76 | $-6.3 | 0.86 | 10 | 1 | $151.0 | $105.7 | $33.84 | $98.65 |
| J3385 | HCPCS | facility | Velaglucerase alfa | $375.05 | $381.36 | $-6.31 | 0.98 | 13 | 1 | n/a | n/a | $346.63 | $386.43 |
| 97037 | HCPCS | facility | Appl modality 1+lllt po pain | $38.26 | $44.76 | $-6.5 | 0.85 | 3 | 1 | n/a | n/a | $38.26 | $44.76 |
| 76883 | HCPCS | facility | Us nrv&acc strux 1xtr compre | $118.74 | $125.29 | $-6.55 | 0.95 | 9 | 1 | n/a | n/a | $106.88 | $136.5 |
| J9228 | HCPCS | facility | Ipilimumab injection | $176.88 | $183.48 | $-6.6 | 0.96 | 13 | 1 | n/a | n/a | $157.23 | $186.91 |
| 94625 | HCPCS | facility | HC PHYS/QHP SRVC PULM REHAB, W/O CONT OXIMETRY MNTR, PER SESSION | $63.98 | $70.7 | $-6.72 | 0.90 | 9 | 1 | $134.0 | $93.8 | $56.85 | $147.93 |
| 94626 | HCPCS | facility | HC PHYS/QHP SRVC PULM REHAB, W/CONT OXIMETRY MNTR, PER SESSION | $63.98 | $70.7 | $-6.72 | 0.90 | 9 | 1 | $161.0 | $112.7 | $56.85 | $147.93 |
| 96160 | HCPCS | facility | HC ADMIN PT-FOCUS HLTH RISK ASSESS W/SCORING/DOCUM, PER STD INSTRU | $38.17 | $44.9 | $-6.73 | 0.85 | 10 | 1 | $134.0 | $93.8 | $25.22 | $72.79 |
| 96161 | HCPCS | facility | Caregiver health risk assmt | $38.17 | $44.9 | $-6.73 | 0.85 | 10 | 1 | n/a | n/a | $25.22 | $72.79 |
| 97154 | HCPCS | facility | Grp adapt bhv tx by tech | $38.17 | $44.9 | $-6.73 | 0.85 | 10 | 1 | n/a | n/a | $33.38 | $76.06 |
| 97156 | HCPCS | facility | Fam adapt bhv tx gdn phy/qhp | $38.17 | $44.9 | $-6.73 | 0.85 | 10 | 1 | n/a | n/a | $33.38 | $76.06 |
| 97157 | HCPCS | facility | Mult fam adapt bhv tx gdn | $38.17 | $44.9 | $-6.73 | 0.85 | 10 | 1 | n/a | n/a | $33.38 | $76.06 |
| 97158 | HCPCS | facility | Grp adapt bhv tx by phy/qhp | $38.17 | $44.9 | $-6.73 | 0.85 | 10 | 1 | n/a | n/a | $33.38 | $76.06 |
| 92025 | HCPCS | facility | Corneal Topography | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 92060 | HCPCS | facility | Special eye evaluation | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 92081 | HCPCS | facility | Visual field examination(s) | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 92082 | HCPCS | facility | Visual field examination(s) | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 92132 | HCPCS | facility | Cmptr ophth dx img ant segmt | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 92133 | HCPCS | facility | Cmptr ophth img optic nerve | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 92134 | HCPCS | facility | Cptr ophth dx img post segmt | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 92265 | HCPCS | facility | Eye muscle evaluation | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 93005 | HCPCS | facility | Electrocardiogram tracing | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | $268.0 | $187.6 | $26.67 | $147.93 |
| 93041 | HCPCS | facility | HC MIH - RHYTHM ECG, 1-3 LEADS, TRACING ONLY, W/O INTERPRETATION & REPORT | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | $173.0 | $121.1 | $23.43 | $147.93 |
| 93278 | HCPCS | facility | ECG/signal-averaged | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $23.43 | $147.93 |
| 95249 | HCPCS | facility | Cont gluc mntr pt prov eqp | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $55.96 | $147.93 |
| 96523 | HCPCS | facility | HC IRRIG VENOUS ACC DEV, DRUG DEL | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | $202.0 | $141.4 | $49.13 | $147.93 |
| 96910 | HCPCS | facility | Photochemotherapy with UV-B | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $37.15 | $147.93 |
| 96912 | HCPCS | facility | Photochemotherapy with UV-A | $63.92 | $70.7 | $-6.78 | 0.90 | 10 | 1 | n/a | n/a | $37.15 | $147.93 |
| G0127 | HCPCS | facility | HC TRIM DYSTROPH NAIL, ANY NUMBER | $63.92 | $70.7 | $-6.78 | 0.90 | 9 | 1 | $207.0 | $144.9 | $28.4 | $147.93 |
| J9309 | HCPCS | facility | Inj, polatuzumab vedotin 1mg | $129.78 | $136.67 | $-6.89 | 0.95 | 13 | 1 | n/a | n/a | $112.12 | $136.77 |
| J1556 | HCPCS | facility | Inj, imm glob bivigam, 500mg | $70.49 | $77.39 | $-6.9 | 0.91 | 13 | 1 | n/a | n/a | $59.57 | $79.65 |
| J9203 | HCPCS | facility | Gemtuzumab ozogamicin 0.1 mg | $229.67 | $236.62 | $-6.95 | 0.97 | 13 | 1 | n/a | n/a | $205.36 | $240.17 |
| J9273 | HCPCS | facility | Inj tisotu vedotin-tftv, 1mg | $181.6 | $188.76 | $-7.16 | 0.96 | 12 | 1 | n/a | n/a | $161.57 | $196.07 |
| J9248 | HCPCS | facility | Inj melphalan (hepzato) 1 mg | $787.79 | $795.0 | $-7.21 | 0.99 | 8 | 1 | n/a | n/a | $744.6 | $795.0 |
| J9272 | HCPCS | facility | Inj, dostarlimab-gxly, 10 mg | $236.435 | $243.71 | $-7.275 | 0.97 | 12 | 1 | n/a | n/a | $228.79 | $247.44 |
| G0323 | HCPCS | facility | Care manage beh svs 20mins | $37.59 | $44.9 | $-7.31 | 0.84 | 6 | 1 | n/a | n/a | $32.97 | $44.9 |
| J9261 | HCPCS | facility | Nelarabine injection | $72.53 | $79.86 | $-7.33 | 0.91 | 13 | 1 | n/a | n/a | $63.38 | $151.89 |
| J9298 | HCPCS | facility | Inj nivol relatlimab 3mg/1mg | $190.48 | $197.83 | $-7.35 | 0.96 | 12 | 1 | n/a | n/a | $187.22 | $201.65 |
| 92229 | HCPCS | facility | Img rta detc/mntr ds poc aly | $63.27 | $70.7 | $-7.43 | 0.89 | 9 | 1 | n/a | n/a | $55.66 | $147.93 |
| 94619 | HCPCS | facility | Exercise tst brncspsm wo ecg | $63.27 | $70.7 | $-7.43 | 0.89 | 10 | 1 | n/a | n/a | $55.66 | $147.93 |
| 0926T | HCPCS | facility | Prgrmg dev eval ccm-d ip | $37.29 | $44.73 | $-7.44 | 0.83 | 3 | 1 | n/a | n/a | $37.29 | $44.73 |
| 0927T | HCPCS | facility | Interrog dev eval ccm-d ip | $37.29 | $44.73 | $-7.44 | 0.83 | 3 | 1 | n/a | n/a | $37.29 | $44.73 |
| 0929T | HCPCS | facility | Rem interrog dev ccm-d tech | $37.29 | $44.73 | $-7.44 | 0.83 | 3 | 1 | n/a | n/a | $37.29 | $44.73 |
| J1305 | HCPCS | facility | Inj, evinacumab-dgnb, 5mg | $186.31 | $193.76 | $-7.45 | 0.96 | 12 | 1 | n/a | n/a | $178.52 | $197.17 |
| J0597 | HCPCS | facility | C-1 esterase, berinert | $68.36 | $75.86 | $-7.5 | 0.90 | 13 | 1 | n/a | n/a | $54.33 | $75.86 |
| 0522T | HCPCS | facility | Prgrmg dev eval wcs ip | $37.16 | $44.73 | $-7.57 | 0.83 | 3 | 1 | n/a | n/a | $37.16 | $44.73 |
| 0528T | HCPCS | facility | Prgrmg dev eval iims ip | $37.16 | $44.73 | $-7.57 | 0.83 | 3 | 1 | n/a | n/a | $37.16 | $44.73 |
| 0529T | HCPCS | facility | Interrog dev eval iims ip | $37.16 | $44.73 | $-7.57 | 0.83 | 3 | 1 | n/a | n/a | $37.16 | $44.73 |
| 96900 | HCPCS | facility | Ultraviolet light therapy | $37.15 | $44.76 | $-7.61 | 0.83 | 10 | 1 | n/a | n/a | $36.73 | $87.52 |
| C9293 | HCPCS | facility | Injection, glucarpidase | $419.98 | $427.72 | $-7.74 | 0.98 | 7 | 1 | n/a | n/a | $378.95 | $492.86 |
| G0404 | HCPCS | facility | EKG tracing for initial prev | $26.67 | $34.66 | $-7.99 | 0.77 | 10 | 1 | n/a | n/a | $19.63 | $50.26 |
| 86901 | HCPCS | facility | Blood typing serologic rh(d) | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | $103.0 | $72.1 | $2.99 | $106.11 |
| 86906 | HCPCS | facility | Bld typing serologic rh phnt | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | $99.0 | $69.3 | $7.75 | $106.11 |
| 86932 | HCPCS | facility | Frozen blood freeze/thaw | $36.73 | $44.76 | $-8.03 | 0.82 | 9 | 1 | n/a | n/a | $34.3 | $106.11 |
| 86945 | HCPCS | facility | Blood product/irradiation | $36.73 | $44.76 | $-8.03 | 0.82 | 9 | 1 | $81.0 | $56.7 | $17.96 | $106.11 |
| 88104 | HCPCS | facility | Cytopath fl nongyn smears | $36.73 | $44.76 | $-8.03 | 0.82 | 9 | 1 | $295.0 | $206.5 | $23.43 | $106.11 |
| 88108 | HCPCS | facility | Cytopath concentrate tech | $36.73 | $44.76 | $-8.03 | 0.82 | 9 | 1 | $593.0 | $415.1 | $23.43 | $106.11 |
| 88302 | HCPCS | facility | HC LEVEL II (GROSS/MICRO) | $36.73 | $44.76 | $-8.03 | 0.82 | 9 | 1 | $246.0 | $172.2 | $23.43 | $66.1 |
| 88321 | HCPCS | facility | HC CONSULTATION & REPORT, REFERRED SLIDES PREP ELSEWHERE | $36.73 | $44.76 | $-8.03 | 0.82 | 9 | 1 | $72.0 | $50.4 | $12.71 | $106.11 |
| 92563 | HCPCS | facility | Tone decay hearing test | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $35.88 | $87.52 |
| 92567 | HCPCS | facility | Tympanometry | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $35.88 | $87.52 |
| 92568 | HCPCS | facility | Acoustic refl threshold tst | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $35.88 | $87.52 |
| 92571 | HCPCS | facility | Filtered speech hearing test | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $35.88 | $87.52 |
| 92575 | HCPCS | facility | Sensorineural acuity test | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $35.88 | $87.52 |
| 92576 | HCPCS | facility | Synthetic sentence test | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $35.88 | $87.52 |
| 92596 | HCPCS | facility | Ear protector evaluation | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $35.88 | $87.52 |
| 95018 | HCPCS | facility | Perq&ic allg test drugs/biol | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $24.8 | $87.52 |
| 95028 | HCPCS | facility | Icut allergy test-delayed | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $24.8 | $87.52 |
| 96127 | HCPCS | facility | Brief emotional/behav assmt | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | n/a | n/a | $29.23 | $87.52 |
| G0239 | HCPCS | facility | HC OTHER RESP PROCEDURE, GROUP | $36.73 | $44.76 | $-8.03 | 0.82 | 10 | 1 | $274.0 | $191.8 | $35.09 | $87.52 |
| 58322 | HCPCS | facility | Artificial insemination | $234.09 | $242.29 | $-8.2 | 0.97 | 11 | 1 | n/a | n/a | $154.27 | $1151.97 |
| 58323 | HCPCS | facility | Sperm washing | $234.09 | $242.29 | $-8.2 | 0.97 | 11 | 1 | n/a | n/a | $154.27 | $1151.97 |
| P9031 | HCPCS | facility | Platelets leukocytes reduced | $135.9 | $144.26 | $-8.36 | 0.94 | 9 | 1 | n/a | n/a | $118.34 | $172.26 |
| J7525 | HCPCS | facility | Tacrolimus injection | $254.78 | $263.15 | $-8.37 | 0.97 | 13 | 1 | n/a | n/a | $212.22 | $263.15 |
| J7340 | HCPCS | facility | Carbidopa levodopa ent 100ml | $235.06 | $243.61 | $-8.55 | 0.96 | 13 | 1 | n/a | n/a | $213.76 | $243.79 |
| A2011 | HCPCS | facility | Supra sdrm, per sq cm | $140.57 | $149.14 | $-8.57 | 0.94 | 2 | 1 | n/a | n/a | $140.57 | $149.14 |
| A2012 | HCPCS | facility | Suprathel, per sq cm | $140.57 | $149.14 | $-8.57 | 0.94 | 2 | 1 | n/a | n/a | $140.57 | $149.14 |
| Q4125 | HCPCS | facility | Arthroflex | $140.57 | $149.14 | $-8.57 | 0.94 | 3 | 1 | n/a | n/a | $3.3 | $149.14 |
| Q4130 | HCPCS | facility | Strattice TM | $140.57 | $149.14 | $-8.57 | 0.94 | 3 | 1 | n/a | n/a | $39.9 | $149.14 |
| Q4135 | HCPCS | facility | Mediskin | $140.57 | $149.14 | $-8.57 | 0.94 | 3 | 1 | n/a | n/a | $8.76 | $149.14 |
| Q4136 | HCPCS | facility | EZderm | $140.57 | $149.14 | $-8.57 | 0.94 | 3 | 1 | n/a | n/a | $8.76 | $149.14 |
| Q4392 | HCPCS | facility | Grafix duo per sq cm | $140.57 | $149.14 | $-8.57 | 0.94 | 2 | 1 | n/a | n/a | $140.57 | $149.14 |
| 0804T | HCPCS | facility | Prgrmg evl ldls pm 2chmbr ip | $35.98 | $44.73 | $-8.75 | 0.80 | 3 | 1 | n/a | n/a | $35.98 | $44.73 |
| 0826T | HCPCS | facility | Prgrmg evl ldls pm 1chmbr ip | $35.98 | $44.73 | $-8.75 | 0.80 | 5 | 1 | n/a | n/a | $35.98 | $44.73 |
| J2860 | HCPCS | facility | Injection, siltuximab | $157.07 | $165.83 | $-8.76 | 0.95 | 13 | 1 | n/a | n/a | $111.5 | $168.68 |
| 0736T | HCPCS | facility | Colonic lavage 35+l water | $145.43 | $154.21 | $-8.78 | 0.94 | 3 | 1 | n/a | n/a | $145.43 | $154.21 |
| Q5113 | HCPCS | facility | Inj herzuma 10 mg | $60.44 | $69.37 | $-8.93 | 0.87 | 13 | 1 | n/a | n/a | $54.9 | $86.43 |
| 0362T | HCPCS | facility | Expose behav assessment | $35.94 | $44.9 | $-8.96 | 0.80 | 4 | 1 | n/a | n/a | $35.94 | $44.9 |
| 0373T | HCPCS | facility | Exposure behavior treatment | $35.94 | $44.9 | $-8.96 | 0.80 | 4 | 1 | n/a | n/a | $35.94 | $44.9 |
| Q4151 | HCPCS | facility | Amnioband, guardian 1 sq cm | $139.99 | $149.14 | $-9.15 | 0.94 | 8 | 1 | n/a | n/a | $137.19 | $149.14 |
| J2502 | HCPCS | facility | Inj, pasireotide long acting | $563.79 | $572.96 | $-9.17 | 0.98 | 13 | 1 | n/a | n/a | $390.75 | $648.3 |
| J1410 | HCPCS | facility | Inj estrogen conjugate 25 MG | $382.79 | $392.06 | $-9.27 | 0.98 | 13 | 1 | $650.7 | $455.49 | $325.51 | $392.06 |
| J2425 | HCPCS | facility | Palifermin injection | $26.25 | $35.55 | $-9.3 | 0.74 | 13 | 1 | n/a | n/a | $22.82 | $36.63 |
| J9204 | HCPCS | facility | Inj mogamulizumab-kpkc, 1 mg | $238.85 | $248.5 | $-9.65 | 0.96 | 13 | 1 | n/a | n/a | $206.42 | $253.47 |
| 29260 | HCPCS | facility | Strapping of elbow or wrist | $60.975 | $70.7 | $-9.725 | 0.86 | 10 | 1 | n/a | n/a | $36.73 | $129.95 |
| 29280 | HCPCS | facility | HC STRAPPING OF HAND OR FINGER | $60.975 | $70.7 | $-9.725 | 0.86 | 10 | 1 | $365.0 | $255.5 | $36.73 | $129.95 |
| 76014 | HCPCS | facility | HC MR SAFETY IMPLANT &/OR FB ASSESSMENT CLIN STF, INITIAL 15 MIN | $24.49 | $34.66 | $-10.17 | 0.71 | 5 | 1 | $79.0 | $55.3 | $24.49 | $34.66 |
| 92201 | HCPCS | facility | Opscpy extnd rta draw uni/bi | $60.29 | $70.7 | $-10.41 | 0.85 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 92202 | HCPCS | facility | Opscpy extnd on/mac draw | $60.29 | $70.7 | $-10.41 | 0.85 | 10 | 1 | n/a | n/a | $48.41 | $147.93 |
| 0485T | HCPCS | facility | Oct mid ear i&r unilateral | $34.265 | $44.76 | $-10.495 | 0.77 | 6 | 1 | n/a | n/a | $31.8 | $44.76 |
| 0486T | HCPCS | facility | Oct mid ear i&r bilateral | $34.265 | $44.76 | $-10.495 | 0.77 | 6 | 1 | n/a | n/a | $31.8 | $44.76 |
| J9359 | HCPCS | facility | Inj lon tesirin-lpyl 0.075mg | $206.395 | $216.9 | $-10.505 | 0.95 | 12 | 1 | n/a | n/a | $195.86 | $221.22 |
| 74221 | HCPCS | facility | HC X-RAY EXAM, UPPER GASTRO TRACT; DOUBLE CONTRAST STUDY | $199.7 | $210.21 | $-10.51 | 0.95 | 10 | 1 | $359.0 | $251.3 | $182.2 | $562.93 |
| C1717 | HCPCS | facility | Brachytx, non-str,hdr ir-192 | $346.98 | $357.49 | $-10.51 | 0.97 | 13 | 1 | n/a | n/a | $332.52 | $357.49 |
| J3401 | HCPCS | facility | Vyjuvek 5x10^9pfu/ml, 0.1 ml | $1014.79 | $1025.44 | $-10.65 | 0.99 | 8 | 1 | n/a | n/a | $996.94 | $1037.12 |
| 0575T | HCPCS | facility | Prgrmg dev eval icds ss ip | $33.95 | $44.73 | $-10.78 | 0.76 | 3 | 1 | n/a | n/a | $33.95 | $44.73 |
| 0576T | HCPCS | facility | Interrog dev eval icds ss ip | $33.95 | $44.73 | $-10.78 | 0.76 | 3 | 1 | n/a | n/a | $33.95 | $44.73 |
| 0579T | HCPCS | facility | Rem interrog dev icds tech | $33.95 | $44.73 | $-10.78 | 0.76 | 3 | 1 | n/a | n/a | $33.95 | $44.73 |
| J9043 | HCPCS | facility | Cabazitaxel injection | $216.46 | $227.28 | $-10.82 | 0.95 | 13 | 1 | n/a | n/a | $184.85 | $230.8 |
| 90899 | HCPCS | facility | Psychiatric service/therapy | $33.93 | $44.9 | $-10.97 | 0.76 | 4 | 1 | n/a | n/a | $33.93 | $44.9 |
| J1823 | HCPCS | facility | Inj. inebilizumab-cdon, 1 mg | $484.4 | $495.54 | $-11.14 | 0.98 | 13 | 1 | n/a | n/a | $418.06 | $495.55 |
| J9281 | HCPCS | facility | Mitomycin instillation | $307.34 | $318.53 | $-11.19 | 0.96 | 13 | 1 | n/a | n/a | $282.17 | $323.91 |
| C2634 | HCPCS | facility | Brachytx, non-str, HA, I-125 | $162.84 | $174.06 | $-11.22 | 0.94 | 10 | 1 | n/a | n/a | $150.81 | $192.55 |
| 76514 | HCPCS | facility | Echo exam of eye thickness | $23.43 | $34.66 | $-11.23 | 0.68 | 10 | 1 | n/a | n/a | $19.63 | $66.1 |
| 88106 | HCPCS | facility | Cytopath fl nongyn filter | $23.43 | $34.66 | $-11.23 | 0.68 | 9 | 1 | $139.0 | $97.3 | $19.63 | $66.1 |
| 0904T | HCPCS | facility | Ecg alg 12 ld rdcd trcg only | $59.4 | $70.7 | $-11.3 | 0.84 | 3 | 1 | n/a | n/a | $59.4 | $70.7 |
| 76019 | HCPCS | facility | HC MR SAFETY IMPLANT POSITION &/OR IMMOBLIZ, UNDER SUPER PHYS/QHP | $59.4 | $70.7 | $-11.3 | 0.84 | 5 | 1 | $191.0 | $133.7 | $59.4 | $70.7 |
| 57452 | HCPCS | facility | Exam of cervix w/scope | $230.7 | $242.29 | $-11.59 | 0.95 | 11 | 1 | $346.0 | $242.2 | $118.56 | $552.31 |
| 58100 | HCPCS | facility | Biopsy of uterus lining | $230.7 | $242.29 | $-11.59 | 0.95 | 11 | 1 | $346.0 | $242.2 | $118.56 | $552.31 |
| 95147 | HCPCS | facility | Antigen therapy services | $74.69 | $86.29 | $-11.6 | 0.87 | 10 | 1 | n/a | n/a | $68.33 | $170.05 |
| 96411 | HCPCS | facility | Chemo iv push addl drug | $74.69 | $86.29 | $-11.6 | 0.87 | 10 | 1 | n/a | n/a | $68.33 | $170.05 |
| 96417 | HCPCS | facility | Chemo iv infus each addl seq | $74.69 | $86.29 | $-11.6 | 0.87 | 10 | 1 | n/a | n/a | $68.33 | $170.05 |
| J3315 | HCPCS | facility | Triptorelin pamoate | $463.2 | $474.84 | $-11.64 | 0.98 | 13 | 1 | n/a | n/a | $387.4 | $503.81 |
| 0555T | HCPCS | facility | B1 str&fx rsk transmis data | $22.98 | $34.66 | $-11.68 | 0.66 | 3 | 1 | n/a | n/a | $22.98 | $34.66 |
| P9011 | HCPCS | facility | Blood split unit | $144.16 | $155.84 | $-11.68 | 0.93 | 9 | 1 | n/a | n/a | $136.36 | $155.84 |
| 0897T | HCPCS | facility | N-invas augmnt arrhyt alys | $1017.39 | $1029.15 | $-11.76 | 0.99 | 3 | 1 | n/a | n/a | $1017.39 | $1029.15 |
| 0898T | HCPCS | facility | N-invas prst8 cancer est map | $1017.39 | $1029.15 | $-11.76 | 0.99 | 3 | 1 | n/a | n/a | $1017.39 | $1029.15 |
| G0555 | HCPCS | facility | Replacment pt electronic sys | $1017.39 | $1029.15 | $-11.76 | 0.99 | 3 | 1 | n/a | n/a | $1017.39 | $1029.15 |
| C7900 | HCPCS | facility | Hopd mntl hlt, 15-29 min | $32.97 | $44.9 | $-11.93 | 0.73 | 9 | 1 | n/a | n/a | $29.68 | $44.9 |
| C2640 | HCPCS | facility | Brachytx, stranded, P-103 | $76.19 | $88.26 | $-12.07 | 0.86 | 10 | 1 | n/a | n/a | $69.69 | $95.63 |
| J9039 | HCPCS | facility | Injection, blinatumomab | $152.18 | $164.25 | $-12.07 | 0.93 | 13 | 1 | n/a | n/a | $118.12 | $164.25 |
| Q4133 | HCPCS | facility | Grafix prime | $136.96 | $149.14 | $-12.18 | 0.92 | 9 | 1 | $495.0 | $346.5 | $135.23 | $268.5 |
| 0794T | HCPCS | facility | Pt spec alg rx-onc tx option | $58.34 | $70.7 | $-12.36 | 0.83 | 3 | 1 | n/a | n/a | $58.34 | $70.7 |
| A9506 | HCPCS | facility | Tc-99m graphite crucible | $316.2 | $328.6 | $-12.4 | 0.96 | 3 | 1 | n/a | n/a | $316.2 | $328.6 |
| 74712 | HCPCS | facility | Mri fetal sngl/1st gestation | $273.54 | $285.95 | $-12.41 | 0.96 | 10 | 1 | n/a | n/a | $263.66 | $691.85 |
| J0561 | HCPCS | facility | Penicillin g benzathine inj | $17.48 | $30.01 | $-12.53 | 0.58 | 7 | 1 | $411.48 | $288.035 | $15.1 | $31.97 |
| 95115 | HCPCS | facility | Immunotherapy one injection | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | n/a | n/a | $27.01 | $109.06 |
| 95117 | HCPCS | facility | Immunotherapy injections | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | n/a | n/a | $27.01 | $109.06 |
| 95144 | HCPCS | facility | Antigen therapy services | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | n/a | n/a | $39.13 | $109.06 |
| 95145 | HCPCS | facility | Antigen therapy services | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | n/a | n/a | $27.01 | $109.06 |
| 95165 | HCPCS | facility | Antigen therapy services | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | n/a | n/a | $27.01 | $109.06 |
| 95170 | HCPCS | facility | Antigen therapy services | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | n/a | n/a | $39.13 | $109.06 |
| 96361 | HCPCS | facility | HC IV HYDRATION, EA ADD HOUR | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | $351.0 | $245.7 | $27.01 | $109.06 |
| 96366 | HCPCS | facility | HC IV INFUSION, EA ADD HOUR | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | $367.0 | $256.9 | $27.01 | $109.06 |
| 96370 | HCPCS | facility | Sc ther infusion addl hr | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | n/a | n/a | $39.13 | $109.06 |
| 96375 | HCPCS | facility | HC INJ, EA SEQ IV PUSH SUBS/DRUG | $43.32 | $56.12 | $-12.8 | 0.77 | 10 | 1 | $382.0 | $267.4 | $39.13 | $109.06 |
| 96377 | HCPCS | facility | Applicaton on-body injector | $43.32 | $56.12 | $-12.8 | 0.77 | 9 | 1 | $121.0 | $84.7 | $39.13 | $109.06 |
| J0180 | HCPCS | facility | Agalsidase beta injection | $217.21 | $230.15 | $-12.94 | 0.94 | 13 | 1 | n/a | n/a | $189.29 | $230.32 |
| 0716T | HCPCS | facility | Car acous wavfrm rec cad rsk | $57.48 | $70.7 | $-13.22 | 0.81 | 3 | 1 | n/a | n/a | $57.48 | $70.7 |
| 0731T | HCPCS | facility | Augmnt ai-based fcl phnt a/r | $57.48 | $70.7 | $-13.22 | 0.81 | 3 | 1 | n/a | n/a | $57.48 | $70.7 |
| A9607 | HCPCS | facility | Lutetium lu 177 vipivotide | $242.58 | $255.84 | $-13.26 | 0.95 | 12 | 1 | n/a | n/a | $226.85 | $283.17 |
| J8655 | HCPCS | facility | Netupitant palonosetron oral | $409.52 | $422.89 | $-13.37 | 0.97 | 13 | 1 | n/a | n/a | $270.65 | $422.89 |
| Q5117 | HCPCS | facility | Inj., kanjinti, 10 mg | $34.17 | $47.55 | $-13.38 | 0.72 | 13 | 1 | n/a | n/a | $19.34 | $72.5 |
| 90375 | HCPCS | facility | Rabies ig im/sc | $266.44 | $279.85 | $-13.41 | 0.95 | 13 | 1 | $1056.8 | $739.76 | $221.0 | $288.38 |
| J0179 | HCPCS | facility | Inj, brolucizumab-dbll, 1 mg | $332.57 | $346.11 | $-13.54 | 0.96 | 13 | 1 | n/a | n/a | $314.95 | $352.81 |
| J9153 | HCPCS | facility | Inj daunorubicin, cytarabine | $242.5 | $256.09 | $-13.59 | 0.95 | 13 | 1 | n/a | n/a | $201.69 | $260.49 |
| J9303 | HCPCS | facility | Panitumumab injection | $159.33 | $173.03 | $-13.7 | 0.92 | 13 | 1 | n/a | n/a | $124.17 | $173.67 |
| J0638 | HCPCS | facility | Canakinumab injection | $127.81 | $141.6 | $-13.79 | 0.90 | 13 | 1 | n/a | n/a | $113.26 | $147.74 |
| A9606 | HCPCS | facility | Radium ra223 dichloride ther | $158.4 | $172.22 | $-13.82 | 0.92 | 13 | 1 | n/a | n/a | $150.31 | $172.4 |
| 0658T | HCPCS | facility | Elec impd spectrsc 1+skn les | $56.85 | $70.7 | $-13.85 | 0.80 | 3 | 1 | n/a | n/a | $56.85 | $70.7 |
| J1290 | HCPCS | facility | Ecallantide injection | $565.83 | $579.96 | $-14.13 | 0.98 | 13 | 1 | n/a | n/a | $492.12 | $579.99 |
| Q4218 | HCPCS | facility | Surgicord per sq cm | $135.0 | $149.14 | $-14.14 | 0.91 | 6 | 1 | n/a | n/a | $127.5 | $149.14 |
| C2643 | HCPCS | facility | Brachytx, non-stranded,C-131 | $85.6 | $99.8 | $-14.2 | 0.86 | 13 | 1 | n/a | n/a | $80.33 | $99.8 |
| J3101 | HCPCS | facility | Tenecteplase injection | $157.72 | $172.22 | $-14.5 | 0.92 | 13 | 1 | $17214.75 | $12050.32 | $129.27 | $186.97 |
| 43285 | HCPCS | facility | Rmvl esophgl sphnctr dev | $7230.615 | $7245.25 | $-14.635 | 1.00 | 10 | 1 | n/a | n/a | $4197.36 | $9619.86 |
| 76510 | HCPCS | facility | Ophth us b & quant a | $144.79 | $159.45 | $-14.66 | 0.91 | 10 | 1 | n/a | n/a | $121.77 | $367.26 |
| J1322 | HCPCS | facility | Elosulfase alfa, injection | $293.92 | $308.68 | $-14.76 | 0.95 | 13 | 1 | n/a | n/a | $245.34 | $311.94 |
| 0506T | HCPCS | facility | Mac pgmt opt dns meas hfp | $55.9 | $70.7 | $-14.8 | 0.79 | 3 | 1 | n/a | n/a | $55.9 | $70.7 |
| 0507T | HCPCS | facility | Near ifr 2img mibmn glnd i&r | $55.9 | $70.7 | $-14.8 | 0.79 | 3 | 1 | n/a | n/a | $55.9 | $70.7 |
| 86976 | HCPCS | facility | Rbc serum pretx id dilution | $19.63 | $34.66 | $-15.03 | 0.57 | 9 | 1 | n/a | n/a | $17.96 | $66.1 |
| 88160 | HCPCS | facility | Cytopath smear other source | $19.63 | $34.66 | $-15.03 | 0.57 | 9 | 1 | $33.0 | $23.1 | $12.71 | $59.08 |
| 88300 | HCPCS | facility | HC LEVEL I (GROSS ONLY) | $19.63 | $34.66 | $-15.03 | 0.57 | 9 | 1 | $98.0 | $68.6 | $12.71 | $66.1 |
| 88363 | HCPCS | facility | HC EXAM/SELECT RETRIEVE ARCH TISS, MOLEC ANAL | $19.63 | $34.66 | $-15.03 | 0.57 | 9 | 1 | $38.0 | $26.6 | $12.71 | $59.08 |
| Q0091 | HCPCS | facility | Obtaining screen pap smear | $19.63 | $34.66 | $-15.03 | 0.57 | 10 | 1 | n/a | n/a | $8.25 | $48.72 |
| G0537 | HCPCS | facility | Risk ascvd tst once pr 12 mo | $29.79 | $44.9 | $-15.11 | 0.66 | 3 | 1 | n/a | n/a | $29.79 | $44.9 |
| G0556 | HCPCS | facility | Adv prim care mgmt lvl 1 | $29.79 | $44.9 | $-15.11 | 0.66 | 3 | 1 | n/a | n/a | $29.79 | $44.9 |
| G0557 | HCPCS | facility | Adv prim care mgmt lvl 2 | $29.79 | $44.9 | $-15.11 | 0.66 | 3 | 1 | n/a | n/a | $29.79 | $44.9 |
| J9350 | HCPCS | facility | Inj mosunetuzumab-axgb, 1 mg | $639.41 | $654.63 | $-15.22 | 0.98 | 12 | 1 | n/a | n/a | $634.15 | $655.38 |
| J3241 | HCPCS | facility | Inj. teprotumumab-trbw 10 mg | $343.89 | $359.19 | $-15.3 | 0.96 | 13 | 1 | n/a | n/a | $315.88 | $369.31 |
| 79005 | HCPCS | facility | HC RADIOPHARM THERAPY, ORAL ADMIN | $264.04 | $279.64 | $-15.6 | 0.94 | 10 | 1 | $1066.0 | $746.2 | $236.71 | $772.2 |
| 79101 | HCPCS | facility | Nuclear rx iv admin | $264.04 | $279.64 | $-15.6 | 0.94 | 10 | 1 | n/a | n/a | $236.71 | $772.2 |
| 79445 | HCPCS | facility | HC RADIOPHARMACEUTICAL THERAPY, INTRA-ARTERIAL PARTICULATE ADMIN | $264.04 | $279.64 | $-15.6 | 0.94 | 10 | 1 | $568.0 | $397.6 | $236.71 | $772.2 |
| 0563T | HCPCS | facility | Evac meibomian glnd heat bi | $55.01 | $70.7 | $-15.69 | 0.78 | 3 | 1 | n/a | n/a | $55.01 | $70.7 |
| J1670 | HCPCS | facility | Tetanus immune globulin inj | $577.05 | $593.0 | $-15.95 | 0.97 | 13 | 1 | $1013.92 | $709.74 | $469.95 | $593.0 |
| 76016 | HCPCS | facility | HC MR SAFETY DETERMINATION PHYS/QHP | $88.05 | $104.29 | $-16.24 | 0.84 | 5 | 1 | $282.0 | $197.4 | $88.05 | $104.29 |
| J0675 | HCPCS | facility | Inj, carboprost, 0.1 mg | $34.2 | $51.05 | $-16.85 | 0.67 | 2 | 1 | n/a | n/a | $34.2 | $51.05 |
| J0740 | HCPCS | facility | Cidofovir injection | $529.38 | $546.29 | $-16.91 | 0.97 | 13 | 1 | n/a | n/a | $524.48 | $645.36 |
| J1430 | HCPCS | facility | Ethanolamine oleate 100 mg | $491.68 | $508.96 | $-17.28 | 0.97 | 13 | 1 | $892.64 | $624.85 | $444.1 | $519.52 |
| 0521T | HCPCS | facility | Interrog dev eval wcs ip | $17.17 | $34.66 | $-17.49 | 0.50 | 3 | 1 | n/a | n/a | $17.17 | $34.66 |
| C7903 | HCPCS | facility | Hopd mntl hlt, grp | $27.38 | $44.9 | $-17.52 | 0.61 | 5 | 1 | n/a | n/a | $27.38 | $44.9 |
| A9513 | HCPCS | facility | Lutetium lu 177 dotatat ther | $299.32 | $316.99 | $-17.67 | 0.94 | 13 | 1 | n/a | n/a | $285.07 | $347.73 |
| J9269 | HCPCS | facility | Inj. tagraxofusp-erzs 10 mcg | $339.03 | $356.93 | $-17.9 | 0.95 | 13 | 1 | n/a | n/a | $283.33 | $357.02 |
| G0247 | HCPCS | facility | Routine footcare pt w lops | $222.52 | $240.45 | $-17.93 | 0.93 | 9 | 1 | n/a | n/a | $71.54 | $463.6 |
| 95148 | HCPCS | facility | Antigen therapy services | $68.33 | $86.29 | $-17.96 | 0.79 | 10 | 1 | n/a | n/a | $39.13 | $170.05 |
| 95149 | HCPCS | facility | Antigen therapy services | $68.33 | $86.29 | $-17.96 | 0.79 | 10 | 1 | n/a | n/a | $39.13 | $170.05 |
| 96367 | HCPCS | facility | HC IV INFUS, ADD SEQUEN, TO 1 HR | $68.33 | $86.29 | $-17.96 | 0.79 | 10 | 1 | $391.0 | $273.7 | $39.13 | $170.05 |
| 96371 | HCPCS | facility | Sc ther infusion reset pump | $68.33 | $86.29 | $-17.96 | 0.79 | 10 | 1 | n/a | n/a | $39.13 | $170.05 |
| 96372 | HCPCS | facility | HC INJECTION, SUBQ OR INTRAMUSC | $68.33 | $86.29 | $-17.96 | 0.79 | 10 | 1 | $194.0 | $135.8 | $39.13 | $170.05 |
| 96401 | HCPCS | facility | Chemo anti-neopl sq/im | $68.33 | $86.29 | $-17.96 | 0.79 | 10 | 1 | $254.0 | $177.8 | $39.13 | $170.05 |
| 96402 | HCPCS | facility | Chemo hormon antineopl sq/im | $68.33 | $86.29 | $-17.96 | 0.79 | 10 | 1 | n/a | n/a | $39.13 | $170.05 |
| 96405 | HCPCS | facility | Chemo intralesional up to 7 | $68.33 | $86.29 | $-17.96 | 0.79 | 10 | 1 | n/a | n/a | $39.13 | $170.05 |
| 96415 | HCPCS | facility | Chemo iv infusion addl hr | $68.33 | $86.29 | $-17.96 | 0.79 | 10 | 1 | $437.0 | $305.9 | $39.13 | $170.05 |
| J9394 | HCPCS | facility | Inj, fulvestrant (fresenius) | $8.2 | $26.77 | $-18.57 | 0.31 | 12 | 1 | n/a | n/a | $3.32 | $53.0 |
| 31233 | HCPCS | facility | Nasal/sinus endoscopy dx | $450.09 | $468.74 | $-18.65 | 0.96 | 11 | 1 | n/a | n/a | $142.88 | $1151.97 |
| 31513 | HCPCS | facility | Injection into vocal cord | $450.09 | $468.74 | $-18.65 | 0.96 | 11 | 1 | n/a | n/a | $142.88 | $1151.97 |
| 31520 | HCPCS | facility | Dx laryngoscopy newborn | $450.09 | $468.74 | $-18.65 | 0.96 | 11 | 1 | n/a | n/a | $142.88 | $552.31 |
| 31577 | HCPCS | facility | Largsc w/rmvl foreign bdy(s) | $450.09 | $468.74 | $-18.65 | 0.96 | 11 | 1 | n/a | n/a | $337.25 | $1151.97 |
| 31579 | HCPCS | facility | Laryngoscopy telescopic | $450.09 | $468.74 | $-18.65 | 0.96 | 11 | 1 | n/a | n/a | $337.25 | $1151.97 |
| 31717 | HCPCS | facility | Bronchial brush biopsy | $450.09 | $468.74 | $-18.65 | 0.96 | 11 | 1 | n/a | n/a | $337.25 | $1151.97 |
| J9042 | HCPCS | facility | Brentuximab vedotin inj | $239.86 | $258.64 | $-18.78 | 0.93 | 13 | 1 | n/a | n/a | $182.08 | $268.45 |
| J9307 | HCPCS | facility | Pralatrexate injection | $373.77 | $392.63 | $-18.86 | 0.95 | 13 | 1 | n/a | n/a | $299.13 | $392.72 |
| 0946T | HCPCS | facility | Ortho impl mvmt alys pair ct | $106.34 | $125.29 | $-18.95 | 0.85 | 3 | 1 | n/a | n/a | $106.34 | $125.29 |
| 93797 | HCPCS | facility | Cardiac rehab | $135.11 | $154.49 | $-19.38 | 0.87 | 10 | 1 | $322.0 | $225.4 | $79.91 | $308.82 |
| 93798 | HCPCS | facility | Cardiac rehab/monitor | $135.11 | $154.49 | $-19.38 | 0.87 | 10 | 1 | $439.0 | $307.3 | $79.91 | $308.82 |
| G0422 | HCPCS | facility | Intens cardiac rehab w/exerc | $135.11 | $154.49 | $-19.38 | 0.87 | 10 | 1 | n/a | n/a | $79.91 | $308.82 |
| G0423 | HCPCS | facility | Intens cardiac rehab no exer | $135.11 | $154.49 | $-19.38 | 0.87 | 10 | 1 | n/a | n/a | $79.91 | $308.82 |
| 77280 | HCPCS | facility | Set radiation therapy field | $141.54 | $161.08 | $-19.54 | 0.88 | 10 | 1 | n/a | n/a | $109.73 | $416.35 |
| 77300 | HCPCS | facility | Radiation therapy dose plan | $141.54 | $161.08 | $-19.54 | 0.88 | 10 | 1 | n/a | n/a | $109.73 | $416.35 |
| 77331 | HCPCS | facility | Special radiation dosimetry | $141.54 | $161.08 | $-19.54 | 0.88 | 10 | 1 | n/a | n/a | $109.73 | $416.35 |
| 77336 | HCPCS | facility | Radiation physics consult | $141.54 | $161.08 | $-19.54 | 0.88 | 10 | 1 | n/a | n/a | $109.73 | $416.35 |
| 77370 | HCPCS | facility | Radiation physics consult | $141.54 | $161.08 | $-19.54 | 0.88 | 10 | 1 | n/a | n/a | $109.73 | $416.35 |
| J0225 | HCPCS | facility | Inj, vutrisiran, 1 mg | $4983.86 | $5003.64 | $-19.78 | 1.00 | 12 | 1 | n/a | n/a | $4926.0 | $5009.56 |
| Q9999 | HCPCS | facility | Inj ustekinumab-aauz 1 mg | $13.23 | $33.09 | $-19.86 | 0.40 | 5 | 1 | n/a | n/a | $13.23 | $33.09 |
| J9120 | HCPCS | facility | Dactinomycin injection | $307.99 | $328.34 | $-20.35 | 0.94 | 13 | 1 | n/a | n/a | $282.13 | $934.16 |
| 0857T | HCPCS | facility | Opto-acoustic img breast uni | $104.87 | $125.29 | $-20.42 | 0.84 | 3 | 1 | n/a | n/a | $104.87 | $125.29 |
| J9393 | HCPCS | facility | Inj, fulvestrant (teva) | $21.2 | $41.67 | $-20.47 | 0.51 | 9 | 1 | n/a | n/a | $16.0 | $41.67 |
| A0428 | HCPCS | facility | HC BLS NON-EMERGENCY TRANSPORT | $309.19 | $329.67 | $-20.48 | 0.94 | 10 | 5 | $649.0 | $454.3 | $208.87 | $363.93 |
| 78601 | HCPCS | facility | Brain image w/flow < 4 views | $458.34 | $479.1 | $-20.76 | 0.96 | 10 | 1 | $1626.0 | $1138.2 | $404.24 | $1213.38 |
| J1307 | HCPCS | facility | Inj, crovalimab-akkz, 10 mg | $530.7 | $551.51 | $-20.81 | 0.96 | 5 | 1 | n/a | n/a | $530.7 | $551.51 |
| 0636T | HCPCS | facility | Ct breast w/3d bi c- | $264.46 | $285.95 | $-21.49 | 0.92 | 9 | 1 | n/a | n/a | $230.13 | $602.41 |
| Q4222 | HCPCS | facility | Progenamatrix, per sq cm | $127.55 | $149.14 | $-21.59 | 0.86 | 6 | 1 | n/a | n/a | $108.67 | $149.14 |
| 0788T | HCPCS | facility | Elec aly smp iins sp/sac nrv | $92.33 | $113.94 | $-21.61 | 0.81 | 3 | 1 | n/a | n/a | $92.33 | $113.94 |
| 0789T | HCPCS | facility | Elec aly cpx iins sp/sac nrv | $92.33 | $113.94 | $-21.61 | 0.81 | 3 | 1 | n/a | n/a | $92.33 | $113.94 |
| 93150 | HCPCS | facility | Therapy activation ipnss | $92.33 | $113.94 | $-21.61 | 0.81 | 3 | 1 | n/a | n/a | $92.33 | $113.94 |
| 93151 | HCPCS | facility | Interrog&prgrmg ipnss | $92.33 | $113.94 | $-21.61 | 0.81 | 3 | 1 | n/a | n/a | $92.33 | $113.94 |
| Q5100 | HCPCS | facility | Inj ustekinumab-kfce, 1 mg | $3.14 | $24.98 | $-21.84 | 0.13 | 5 | 1 | n/a | n/a | $3.14 | $24.98 |
| 76018 | HCPCS | facility | HC MR SAFETY IMPLANT ELEC PREP UNDER SUPERVISION PHYS/QHP | $91.79 | $113.94 | $-22.15 | 0.81 | 5 | 1 | $294.0 | $205.8 | $91.79 | $113.94 |
| 91133 | HCPCS | facility | Electrogastrography W/Test | $137.27 | $159.45 | $-22.18 | 0.86 | 10 | 1 | n/a | n/a | $121.77 | $299.18 |
| 49465 | HCPCS | facility | Fluoro exam of g/colon tube | $263.66 | $285.95 | $-22.29 | 0.92 | 11 | 1 | $664.0 | $464.8 | $122.82 | $552.31 |
| 70170 | HCPCS | facility | X-ray exam of tear duct | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $255.46 | $730.4 |
| 70310 | HCPCS | facility | X-ray exam of teeth | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $35.88 | $730.4 |
| 70320 | HCPCS | facility | Full mouth x-ray of teeth | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $35.88 | $705.67 |
| 70371 | HCPCS | facility | Speech evaluation complex | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $114.26 | $730.4 |
| 70390 | HCPCS | facility | X-ray exam of salivary duct | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $255.46 | $730.4 |
| 74440 | HCPCS | facility | X-ray male genital tract | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $209.55 | $730.4 |
| 74450 | HCPCS | facility | X-ray urethra/bladder | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $209.55 | $730.4 |
| 74455 | HCPCS | facility | HC VCUG URETHROCYSTOG | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $1037.0 | $725.9 | $209.55 | $730.4 |
| 74740 | HCPCS | facility | HC HYSTEROSALPINGOGRAPHY | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $1674.0 | $1171.8 | $255.46 | $730.4 |
| 74775 | HCPCS | facility | X-ray exam of perineum | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $209.55 | $730.4 |
| 76000 | HCPCS | facility | Fluoroscope examination | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $650.0 | $455.0 | $114.26 | $730.4 |
| 76811 | HCPCS | facility | HC PREG ECHO, DETAIL, SINGLE GEST | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $1590.0 | $1113.0 | $154.74 | $730.4 |
| 76826 | HCPCS | facility | Echo exam of fetal heart | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $924.0 | $646.8 | $212.66 | $730.4 |
| 76831 | HCPCS | facility | Echo exam uterus | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $1307.0 | $914.9 | $154.74 | $730.4 |
| 76975 | HCPCS | facility | GI endoscopic ultrasound | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $154.74 | $730.4 |
| 77053 | HCPCS | facility | HC MAMMO DUCTOGRAM SINGLE, S & I | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $815.0 | $570.5 | $255.46 | $716.22 |
| 77054 | HCPCS | facility | HC MAMMARY DUCTOGRAM MULTIPLE | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $1382.0 | $967.4 | $255.46 | $730.4 |
| 93308 | HCPCS | facility | HC 2D TTE W OR W/O CNTRST, FOLLOW W/CNTRST F/U OR LMTD | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $1048.0 | $733.6 | $212.66 | $602.41 |
| 93880 | HCPCS | facility | Extracranial bilat study | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $1362.0 | $953.4 | $154.74 | $602.41 |
| 93886 | HCPCS | facility | Intracranial complete study | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | n/a | n/a | $154.74 | $602.41 |
| 93925 | HCPCS | facility | HC ARTERIAL DUPLEX LOWER EXTR BIL | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $784.0 | $548.8 | $154.74 | $602.41 |
| 93930 | HCPCS | facility | HC ARTERIAL DUPLEX UPPER EXTR BIL | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $784.0 | $548.8 | $154.74 | $602.41 |
| 93970 | HCPCS | facility | Extremity study | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $2027.0 | $1418.9 | $154.74 | $602.41 |
| 93975 | HCPCS | facility | HC VISCERAL VASCULAR COMPLETE US | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $1056.0 | $739.2 | $154.74 | $602.41 |
| 93978 | HCPCS | facility | HC DUP-SCAN AORTA IVC, ILIAC VASCL/BPGS; COMPLETE | $263.66 | $285.95 | $-22.29 | 0.92 | 10 | 1 | $555.0 | $388.5 | $154.74 | $602.41 |
| J1952 | HCPCS | facility | Leuprolide inj, camcevi, 1mg | $56.335 | $78.92 | $-22.585 | 0.71 | 12 | 1 | n/a | n/a | $51.41 | $102.86 |
| C2642 | HCPCS | facility | Brachytx, stranded, C-131 | $96.47 | $119.11 | $-22.64 | 0.81 | 13 | 1 | n/a | n/a | $91.42 | $119.11 |
| 98975 | HCPCS | facility | Rem ther mntr 1st setup&edu | $136.56 | $159.56 | $-23.0 | 0.86 | 9 | 1 | n/a | n/a | $121.35 | $310.56 |
| J1458 | HCPCS | facility | Galsulfase injection | $484.75 | $508.76 | $-24.01 | 0.95 | 13 | 1 | n/a | n/a | $404.07 | $513.86 |
| 0558T | HCPCS | facility | Ct scan f/biomchn ct alys | $79.8 | $104.29 | $-24.49 | 0.77 | 3 | 1 | n/a | n/a | $79.8 | $104.29 |
| P9027 | HCPCS | facility | Rbc o2 co2 reduced | $487.1 | $511.59 | $-24.49 | 0.95 | 3 | 1 | n/a | n/a | $487.1 | $511.59 |
| A0426 | HCPCS | facility | Als 1 | $371.03 | $395.6 | $-24.57 | 0.94 | 10 | 5 | $806.0 | $564.2 | $250.65 | $436.72 |
| 99484 | HCPCS | facility | Care mgmt svc bhvl hlth cond | $19.72 | $44.9 | $-25.18 | 0.44 | 7 | 1 | n/a | n/a | $19.72 | $44.9 |
| G0442 | HCPCS | facility | Annual alcohol screen 15 min | $19.72 | $44.9 | $-25.18 | 0.44 | 7 | 1 | n/a | n/a | $19.72 | $44.9 |
| A9608 | HCPCS | facility | Flotufolastat f18 diag 1 mci | $645.89 | $671.22 | $-25.33 | 0.96 | 8 | 1 | n/a | n/a | $627.08 | $680.44 |
| 94690 | HCPCS | facility | Exhaled air analysis | $45.06 | $70.7 | $-25.64 | 0.64 | 10 | 1 | n/a | n/a | $36.73 | $127.04 |
| 95250 | HCPCS | facility | Glucose monitoring cont | $132.48 | $159.56 | $-27.08 | 0.83 | 10 | 1 | n/a | n/a | $96.96 | $310.56 |
| 99453 | HCPCS | facility | Rem mntr physiol param setup | $132.48 | $159.56 | $-27.08 | 0.83 | 10 | 1 | n/a | n/a | $115.85 | $310.56 |
| G0248 | HCPCS | facility | Demonstrate use home inr mon | $132.48 | $159.56 | $-27.08 | 0.83 | 10 | 1 | n/a | n/a | $128.48 | $310.56 |
| G0249 | HCPCS | facility | Provide INR test mater/equip | $132.48 | $159.56 | $-27.08 | 0.83 | 10 | 1 | n/a | n/a | $128.48 | $310.56 |
| G0463 | HCPCS | facility | Hospital outpt clinic visit | $132.48 | $159.56 | $-27.08 | 0.83 | 2 | 1 | n/a | n/a | $132.48 | $159.56 |
| 92520 | HCPCS | facility | Laryngeal function studies | $132.06 | $159.45 | $-27.39 | 0.83 | 10 | 1 | n/a | n/a | $121.77 | $299.18 |
| 92548 | HCPCS | facility | Posturography | $132.06 | $159.45 | $-27.39 | 0.83 | 10 | 1 | n/a | n/a | $121.77 | $299.18 |
| 86580 | HCPCS | facility | HC SKIN TEST; TUBERCULOSIS, INTRADERMAL | $6.85 | $34.66 | $-27.81 | 0.20 | 9 | 1 | $70.0 | $49.0 | $6.82 | $58.98 |
| 95024 | HCPCS | facility | Icut allergy test drug/bug | $42.57 | $70.7 | $-28.13 | 0.60 | 10 | 1 | n/a | n/a | $24.8 | $147.93 |
| 0780T | HCPCS | facility | Instlj fecal microbiota ssp | $131.26 | $159.45 | $-28.19 | 0.82 | 2 | 1 | n/a | n/a | $131.26 | $159.45 |
| J9352 | HCPCS | facility | Injection trabectedin 0.1mg | $362.82 | $391.07 | $-28.25 | 0.93 | 13 | 1 | n/a | n/a | $318.92 | $391.07 |
| 0395T | HCPCS | facility | Hdr elctr ntrst/ntrcv brchtx | $805.89 | $834.69 | $-28.8 | 0.97 | 3 | 1 | n/a | n/a | $805.89 | $834.69 |
| 77605 | HCPCS | facility | Hyperthermia treatment | $805.89 | $834.69 | $-28.8 | 0.97 | 10 | 1 | n/a | n/a | $392.41 | $2243.57 |
| 77763 | HCPCS | facility | Apply intrcav radiat compl | $805.89 | $834.69 | $-28.8 | 0.97 | 10 | 1 | n/a | n/a | $410.83 | $2243.57 |
| 77770 | HCPCS | facility | Hdr rdncl ntrstl/icav brchtx | $805.89 | $834.69 | $-28.8 | 0.97 | 10 | 1 | n/a | n/a | $797.41 | $2243.57 |
| 77771 | HCPCS | facility | Hdr rdncl ntrstl/icav brchtx | $805.89 | $834.69 | $-28.8 | 0.97 | 10 | 1 | n/a | n/a | $797.41 | $2243.57 |
| 77772 | HCPCS | facility | Hdr rdncl ntrstl/icav brchtx | $805.89 | $834.69 | $-28.8 | 0.97 | 10 | 1 | n/a | n/a | $797.41 | $2243.57 |
| G0538 | HCPCS | facility | Ascvd rsk mng clin stf pr mo | $92.5 | $121.75 | $-29.25 | 0.76 | 3 | 1 | n/a | n/a | $92.5 | $121.75 |
| G0544 | HCPCS | facility | Post d/c phone follow up | $92.5 | $121.75 | $-29.25 | 0.76 | 3 | 1 | n/a | n/a | $92.5 | $121.75 |
| G0558 | HCPCS | facility | Adv prim care mgmt lvl 3 | $92.5 | $121.75 | $-29.25 | 0.76 | 3 | 1 | n/a | n/a | $92.5 | $121.75 |
| Q9998 | HCPCS | facility | Ustekinumab-aekn inj | $10.98 | $40.35 | $-29.37 | 0.27 | 5 | 1 | n/a | n/a | $10.98 | $43.2 |
| 35261 | HCPCS | facility | Repair blood vessel lesion | $3754.61 | $3784.07 | $-29.46 | 0.99 | 11 | 1 | n/a | n/a | $2671.31 | $6735.22 |
| 23473 | HCPCS | facility | Revis reconst shoulder joint | $15356.755 | $15386.48 | $-29.725 | 1.00 | 10 | 1 | n/a | n/a | $9601.88 | $19292.34 |
| 61000 | HCPCS | facility | Remove cranial cavity fluid | $815.89 | $845.96 | $-30.07 | 0.96 | 11 | 1 | n/a | n/a | $565.75 | $1805.48 |
| 61001 | HCPCS | facility | Remove cranial cavity fluid | $815.89 | $845.96 | $-30.07 | 0.96 | 11 | 1 | n/a | n/a | $565.75 | $1805.48 |
| 61026 | HCPCS | facility | Injection into brain canal | $815.89 | $845.96 | $-30.07 | 0.96 | 11 | 1 | n/a | n/a | $565.75 | $1805.48 |
| 62273 | HCPCS | facility | HC BLOOD PATCH | $815.89 | $845.96 | $-30.07 | 0.96 | 11 | 1 | $1017.0 | $711.9 | $565.75 | $1805.48 |
| 64445 | HCPCS | facility | HC INJ,ANESTH; SCIATIC NERV, SNGL | $815.89 | $845.96 | $-30.07 | 0.96 | 11 | 1 | $1468.0 | $1027.6 | $565.75 | $1805.48 |
| 77078 | HCPCS | facility | Ct bone density axial | $73.87 | $104.29 | $-30.42 | 0.71 | 10 | 1 | $391.0 | $273.7 | $71.24 | $261.27 |
| 95919 | HCPCS | facility | Quan puplmtry phy/qhp uni/bi | $128.99 | $159.45 | $-30.46 | 0.81 | 9 | 1 | n/a | n/a | $116.11 | $159.45 |
| 0902T | HCPCS | facility | Qtc ntrvl augmnt alg aly ecg | $128.9 | $159.45 | $-30.55 | 0.81 | 3 | 1 | n/a | n/a | $128.9 | $159.45 |
| 76391 | HCPCS | facility | Mr elastography | $255.39 | $285.95 | $-30.56 | 0.89 | 10 | 1 | n/a | n/a | $230.56 | $730.4 |
| 93985 | HCPCS | facility | Dup-scan hemo compl bi std | $255.39 | $285.95 | $-30.56 | 0.89 | 10 | 1 | $610.0 | $427.0 | $233.01 | $602.41 |
| G0552 | HCPCS | facility | Supply of digital device | $128.87 | $159.56 | $-30.69 | 0.81 | 5 | 1 | n/a | n/a | $128.87 | $159.56 |
| G0553 | HCPCS | facility | Monthly tx for dmht 20mins | $128.87 | $159.56 | $-30.69 | 0.81 | 5 | 1 | n/a | n/a | $128.87 | $159.56 |
| M0224 | HCPCS | facility | Pemivibart infusion | $497.7 | $528.45 | $-30.75 | 0.94 | 5 | 1 | n/a | n/a | $485.86 | $528.45 |
| 36598 | HCPCS | facility | HC CONT INJ, RADIOLOGIC EVAL CVAD, INCL FLUOROSCOPY | $223.8 | $254.91 | $-31.11 | 0.88 | 11 | 1 | $2391.0 | $1673.7 | $172.66 | $552.31 |
| 75580 | HCPCS | facility | N-invas est c ffr sw aly cta | $997.22 | $1029.15 | $-31.93 | 0.97 | 5 | 1 | n/a | n/a | $997.22 | $1074.38 |
| C9793 | HCPCS | facility | Pre-plan 3d model w/ccta | $997.22 | $1029.15 | $-31.93 | 0.97 | 3 | 1 | n/a | n/a | $997.22 | $1029.15 |
| 62367 | HCPCS | facility | Analyze spine infus pump | $335.99 | $368.09 | $-32.1 | 0.91 | 11 | 1 | $2136.0 | $1495.2 | $191.68 | $1805.48 |
| 62368 | HCPCS | facility | Analyze sp inf pump w/reprog | $335.99 | $368.09 | $-32.1 | 0.91 | 11 | 1 | $2350.0 | $1645.0 | $191.68 | $1805.48 |
| 62369 | HCPCS | facility | Anal sp inf pmp w/reprg&fill | $335.99 | $368.09 | $-32.1 | 0.91 | 11 | 1 | $2367.0 | $1656.9 | $191.68 | $1805.48 |
| 62370 | HCPCS | facility | Anl sp inf pmp w/mdreprg&fil | $335.99 | $368.09 | $-32.1 | 0.91 | 11 | 1 | $477.0 | $333.9 | $191.68 | $1805.48 |
| 93247 | HCPCS | facility | Ext ecg>7d<15d scan a/r | $127.25 | $159.45 | $-32.2 | 0.80 | 10 | 1 | $494.0 | $345.8 | $111.95 | $299.18 |
| Q4132 | HCPCS | facility | Grafix core | $116.59 | $149.14 | $-32.55 | 0.78 | 9 | 1 | $478.0 | $334.6 | $89.18 | $535.8 |
| 80504 | HCPCS | facility | Path clin consltj mod 21-40 | $171.41 | $204.18 | $-32.77 | 0.84 | 9 | 1 | n/a | n/a | $152.32 | $239.3 |
| 80505 | HCPCS | facility | Path clin consltj high 41-60 | $171.41 | $204.18 | $-32.77 | 0.84 | 9 | 1 | n/a | n/a | $152.32 | $239.3 |
| 86972 | HCPCS | facility | HC PRETX RBC'S-AB DETECT, ID &/OR COMP TEST; DENSITY GRADIENT SEPARATION | $171.41 | $204.18 | $-32.77 | 0.84 | 9 | 1 | $354.0 | $247.8 | $17.96 | $459.85 |
| 89342 | HCPCS | facility | Storage/year embryo(s) | $171.41 | $204.18 | $-32.77 | 0.84 | 9 | 1 | n/a | n/a | $60.45 | $479.85 |
| A0429 | HCPCS | facility | BLS-emergency | $494.695 | $527.47 | $-32.775 | 0.94 | 10 | 5 | $1028.0 | $719.6 | $334.19 | $659.06 |
| J1212 | HCPCS | facility | Dimethyl sulfoxide 50% 50 ML | $715.9 | $748.84 | $-32.94 | 0.96 | 13 | 1 | n/a | n/a | $635.87 | $749.23 |
| 95716 | HCPCS | facility | Veeg ea 12-26hr cont mntr | $996.15 | $1029.15 | $-33.0 | 0.97 | 10 | 1 | n/a | n/a | $806.13 | $2408.54 |
| 70030 | HCPCS | facility | HC SCREENING EYE, FOREIGN BODY | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $467.0 | $326.9 | $45.95 | $261.27 |
| 70100 | HCPCS | facility | X-ray exam of jaw <4views | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $45.95 | $261.27 |
| 70140 | HCPCS | facility | HC FACIAL BONES < 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $352.0 | $246.4 | $45.95 | $261.27 |
| 70160 | HCPCS | facility | HC NASAL BONES | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $467.0 | $326.9 | $45.95 | $261.27 |
| 70190 | HCPCS | facility | X-ray exam of eye sockets | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $45.95 | $267.97 |
| 70210 | HCPCS | facility | HC SINUSES < 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $514.0 | $359.8 | $45.95 | $261.27 |
| 70220 | HCPCS | facility | HC SINUSES COMPLETE | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $619.0 | $433.3 | $70.84 | $267.84 |
| 70240 | HCPCS | facility | X-ray exam pituitary saddle | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $45.95 | $261.27 |
| 70300 | HCPCS | facility | X-ray exam of teeth | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $35.88 | $260.62 |
| 70328 | HCPCS | facility | X-ray exam of jaw joint | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $45.95 | $261.27 |
| 70330 | HCPCS | facility | HC TEMPEROMANDIBULAR JOINTS BILAT | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $516.0 | $361.2 | $45.95 | $261.27 |
| 70350 | HCPCS | facility | X-ray head for orthodontia | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $45.95 | $261.27 |
| 70355 | HCPCS | facility | Panoramic x-ray of jaws | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $35.88 | $260.62 |
| 70360 | HCPCS | facility | HC SOFT TISSUE NECKAP | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $429.0 | $300.3 | $45.95 | $261.27 |
| 70380 | HCPCS | facility | X-ray exam of salivary gland | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $45.95 | $267.99 |
| 71045 | HCPCS | facility | HC XRAY EXAM, CHEST, 1 VIEW | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $367.0 | $256.9 | $45.95 | $261.27 |
| 71046 | HCPCS | facility | HC XRAY EXAM, CHEST, 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $400.0 | $280.0 | $45.95 | $261.27 |
| 71047 | HCPCS | facility | HC XRAY EXAM, CHEST, 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $568.0 | $397.6 | $45.95 | $261.27 |
| 71100 | HCPCS | facility | HC RIBS, 2 VIEWS, UNILATERAL | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $242.0 | $169.4 | $45.95 | $261.27 |
| 71120 | HCPCS | facility | HC STERNUM | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $376.0 | $263.2 | $45.95 | $261.27 |
| 71130 | HCPCS | facility | HC STERNO CLAVICULAR JOINTS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $451.0 | $315.7 | $45.95 | $261.27 |
| 72020 | HCPCS | facility | HC SPINE, SINGLE VIEW | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $312.0 | $218.4 | $45.95 | $261.27 |
| 72040 | HCPCS | facility | HC CERVICAL SPINE; 2 OR 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $376.0 | $263.2 | $45.95 | $261.27 |
| 72080 | HCPCS | facility | X-ray exam thoracolmb 2/> vw | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $45.95 | $261.27 |
| 72081 | HCPCS | facility | HC XRAY, ENTIRE SPINE, 1 VIEW | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $205.0 | $143.5 | $45.95 | $261.27 |
| 72220 | HCPCS | facility | HC SACRUM & COCCYX | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $476.0 | $333.2 | $45.95 | $261.27 |
| 73000 | HCPCS | facility | HC CLAVICLE COMPLETE | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $446.0 | $312.2 | $45.95 | $261.27 |
| 73020 | HCPCS | facility | HC SHOULDER ONE VIEW | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $254.0 | $177.8 | $45.95 | $261.27 |
| 73030 | HCPCS | facility | HC SHOULDER COMPLETE, MIN 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $312.0 | $218.4 | $45.95 | $261.27 |
| 73050 | HCPCS | facility | HC ACROMIOCLAVICULAR JOINTS BILAT | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $698.0 | $488.6 | $45.95 | $261.27 |
| 73060 | HCPCS | facility | HC HUMERUS, MIN 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $416.0 | $291.2 | $45.95 | $261.27 |
| 73070 | HCPCS | facility | HC ELBOW, 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $325.0 | $227.5 | $45.95 | $261.27 |
| 73080 | HCPCS | facility | HC ELBOW, MIN 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $365.0 | $255.5 | $45.95 | $267.84 |
| 73090 | HCPCS | facility | HC FOREARM, 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $419.0 | $293.3 | $45.95 | $267.84 |
| 73100 | HCPCS | facility | HC WRIST, 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $333.0 | $233.1 | $45.95 | $261.27 |
| 73110 | HCPCS | facility | HC WRIST COMPLETE, MIN 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $363.0 | $254.1 | $45.95 | $261.27 |
| 73130 | HCPCS | facility | HC HAND, MIN 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $376.0 | $263.2 | $45.95 | $267.84 |
| 73140 | HCPCS | facility | HC FINGERS, MIN 2 VIEW | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $312.0 | $218.4 | $45.95 | $261.27 |
| 73501 | HCPCS | facility | HC XRAY, HIP UNILAT, 1 VIEW | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $218.0 | $152.6 | $70.84 | $261.27 |
| 73502 | HCPCS | facility | HC XRAY, HIP UNILAT, 2/3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $242.0 | $169.4 | $70.84 | $261.27 |
| 73551 | HCPCS | facility | HC XRAY, FEMUR, 1 VIEW | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $261.0 | $182.7 | $45.95 | $261.27 |
| 73552 | HCPCS | facility | HC XRAY, FEMUR, MINIMUM 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $289.0 | $202.3 | $45.95 | $261.27 |
| 73560 | HCPCS | facility | HC KNEE, 1 OR 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $325.0 | $227.5 | $45.95 | $261.27 |
| 73562 | HCPCS | facility | HC KNEE, 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $458.0 | $320.6 | $45.95 | $261.27 |
| 73565 | HCPCS | facility | HC STANDING KNEES | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $433.0 | $303.1 | $45.95 | $261.27 |
| 73590 | HCPCS | facility | HC TIBIA & FIBULA, 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $419.0 | $293.3 | $45.95 | $261.27 |
| 73592 | HCPCS | facility | HC LOWER EXTREMITY, INFANT, MIN 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $406.0 | $284.2 | $45.95 | $261.27 |
| 73600 | HCPCS | facility | HC ANKLE, 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $312.0 | $218.4 | $45.95 | $267.84 |
| 73610 | HCPCS | facility | HC ANKLE COMPLETE, MIN 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $368.0 | $257.6 | $45.95 | $267.84 |
| 73620 | HCPCS | facility | HC FOOT, 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $325.0 | $227.5 | $45.95 | $261.27 |
| 73630 | HCPCS | facility | HC FOOT COMPLETE, MIN 3 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $376.0 | $263.2 | $45.95 | $261.27 |
| 73650 | HCPCS | facility | HC CALCANEUS, MIN 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $345.0 | $241.5 | $45.95 | $261.27 |
| 73660 | HCPCS | facility | HC TOE(S), MIN 2 VIEWS | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $312.0 | $218.4 | $45.95 | $261.27 |
| 74018 | HCPCS | facility | HC XRAY EXAM, ABDOMEN, 1 VIEW | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $407.0 | $284.9 | $45.95 | $261.27 |
| 75571 | HCPCS | facility | Ct hrt w/o dye w/ca test | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $138.0 | $96.6 | $49.64 | $241.88 |
| 76010 | HCPCS | facility | HC SCOUT FILM CHILD FOREIGN BODY | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $438.0 | $306.6 | $45.95 | $261.27 |
| 76529 | HCPCS | facility | Echo exam of eye | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $64.57 | $264.28 |
| 76642 | HCPCS | facility | HC ULTRASOUND, BREAST(S), LIMITED | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $725.0 | $507.5 | $64.57 | $267.99 |
| 76885 | HCPCS | facility | HC US,INFANT HIPS; DYNAMIC | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $567.0 | $396.9 | $64.57 | $264.28 |
| 76886 | HCPCS | facility | HC US, INFANT HIPS, LMT'D STATIC | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | $322.0 | $225.4 | $64.57 | $267.99 |
| 77071 | HCPCS | facility | X-Ray Stress View | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $45.95 | $261.27 |
| 77081 | HCPCS | facility | Dxa bone density/peripheral | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $35.24 | $260.62 |
| 77086 | HCPCS | facility | Fracture assessment via dxa | $71.24 | $104.29 | $-33.05 | 0.68 | 10 | 1 | n/a | n/a | $45.95 | $261.27 |
| A9532 | HCPCS | facility | I125 serum albumin, dx | $435.99 | $469.06 | $-33.07 | 0.93 | 2 | 1 | n/a | n/a | $435.99 | $469.06 |
| 71271 | HCPCS | facility | Ct thorax lung cancer scr c- | $91.96 | $125.29 | $-33.33 | 0.73 | 10 | 1 | $169.0 | $118.3 | $80.9 | $266.44 |
| 0811T | HCPCS | facility | Rem mlt day uroflow setup | $126.08 | $159.56 | $-33.48 | 0.79 | 3 | 1 | n/a | n/a | $126.08 | $159.56 |
| 29580 | HCPCS | facility | Application of paste boot | $161.2 | $194.75 | $-33.55 | 0.83 | 10 | 1 | $432.0 | $302.4 | $94.54 | $375.94 |
| 86880 | HCPCS | facility | Coombs test direct | $36.73 | $70.7 | $-33.97 | 0.52 | 10 | 1 | $134.0 | $93.8 | $5.39 | $154.03 |
| 86904 | HCPCS | facility | Blood typing patient serum | $36.73 | $70.7 | $-33.97 | 0.52 | 10 | 1 | n/a | n/a | $16.34 | $106.11 |
| 86970 | HCPCS | facility | HC ARC PRETREAT RBC;CHEM OR DRUG | $36.73 | $70.7 | $-33.97 | 0.52 | 9 | 1 | $134.0 | $93.8 | $17.96 | $106.11 |
| 86978 | HCPCS | facility | HC ARC SERUM PRETX;RBC ABSRPT, EA | $36.73 | $70.7 | $-33.97 | 0.52 | 9 | 1 | $161.0 | $112.7 | $24.99 | $106.11 |
| 88329 | HCPCS | facility | HC INTRAOPERATIVE PROCEDURE | $36.73 | $70.7 | $-33.97 | 0.52 | 9 | 1 | $254.0 | $177.8 | $12.71 | $106.11 |
| 92227 | HCPCS | facility | Remote dx retinal imaging | $36.73 | $70.7 | $-33.97 | 0.52 | 10 | 1 | n/a | n/a | $23.43 | $87.52 |
| 92555 | HCPCS | facility | Speech threshold audiometry | $36.73 | $70.7 | $-33.97 | 0.52 | 10 | 1 | n/a | n/a | $35.88 | $87.52 |
| 92556 | HCPCS | facility | Speech audiometry complete | $36.73 | $70.7 | $-33.97 | 0.52 | 10 | 1 | n/a | n/a | $35.88 | $128.86 |
| 92565 | HCPCS | facility | Stenger test pure tone | $36.73 | $70.7 | $-33.97 | 0.52 | 10 | 1 | n/a | n/a | $35.88 | $87.52 |
| 92583 | HCPCS | facility | HC SELECT PICTURE AUDIOMETRY | $36.73 | $70.7 | $-33.97 | 0.52 | 10 | 1 | $92.0 | $64.4 | $35.88 | $128.86 |
| G0277 | HCPCS | facility | HC HBOT,FULL BODY CHAMBER,30 MIN | $130.82 | $164.92 | $-34.1 | 0.79 | 10 | 1 | $612.0 | $428.4 | $107.75 | $322.29 |
| 46083 | HCPCS | facility | HC INCISE EXT HEMORRHOID | $264.64 | $299.43 | $-34.79 | 0.88 | 11 | 1 | $372.0 | $260.4 | $152.75 | $552.31 |
| 50391 | HCPCS | facility | Instll rx agnt into rnal tub | $264.64 | $299.43 | $-34.79 | 0.88 | 11 | 1 | n/a | n/a | $81.99 | $552.31 |
| 51100 | HCPCS | facility | Drain bladder by needle | $264.64 | $299.43 | $-34.79 | 0.88 | 11 | 1 | $547.0 | $382.9 | $152.75 | $552.31 |
| 51700 | HCPCS | facility | HC BLADDER IRRIGATION, SIMPLE | $264.64 | $299.43 | $-34.79 | 0.88 | 10 | 1 | $372.0 | $260.4 | $152.75 | $624.47 |
| 51705 | HCPCS | facility | Change of bladder tube | $264.64 | $299.43 | $-34.79 | 0.88 | 10 | 1 | $651.0 | $455.7 | $152.75 | $624.47 |
| 51785 | HCPCS | facility | Anal/urinary muscle study | $264.64 | $299.43 | $-34.79 | 0.88 | 10 | 1 | n/a | n/a | $152.75 | $624.47 |
| 53600 | HCPCS | facility | Dilate urethra stricture | $264.64 | $299.43 | $-34.79 | 0.88 | 11 | 1 | n/a | n/a | $232.32 | $1151.97 |
| 53621 | HCPCS | facility | Dilate urethra stricture | $264.64 | $299.43 | $-34.79 | 0.88 | 11 | 1 | n/a | n/a | $152.75 | $552.31 |
| 54200 | HCPCS | facility | Treatment of penis lesion | $264.64 | $299.43 | $-34.79 | 0.88 | 11 | 1 | n/a | n/a | $152.75 | $1151.97 |
| 54220 | HCPCS | facility | HC IRR CORPORA CAVERNOSA PRIAPISM | $264.64 | $299.43 | $-34.79 | 0.88 | 11 | 1 | $636.0 | $445.2 | $152.75 | $1805.48 |
| 54235 | HCPCS | facility | Penile injection | $264.64 | $299.43 | $-34.79 | 0.88 | 10 | 1 | n/a | n/a | $152.75 | $624.47 |
| 54250 | HCPCS | facility | Penis study | $264.64 | $299.43 | $-34.79 | 0.88 | 10 | 1 | n/a | n/a | $152.75 | $624.47 |
| 54450 | HCPCS | facility | HC FORESKIN MANIPULATION | $264.64 | $299.43 | $-34.79 | 0.88 | 11 | 1 | $740.0 | $518.0 | $232.32 | $1805.48 |
| C2636 | HCPCS | facility | Brachy linear, non-str,P-103 | $54.05 | $89.4 | $-35.35 | 0.60 | 10 | 1 | n/a | n/a | $52.91 | $89.4 |
| G0444 | HCPCS | facility | Depression Screen annual | $9.48 | $44.9 | $-35.42 | 0.21 | 7 | 1 | n/a | n/a | $9.48 | $44.9 |
| G0446 | HCPCS | facility | Intens behave ther cardio dx | $9.48 | $44.9 | $-35.42 | 0.21 | 4 | 1 | n/a | n/a | $9.48 | $44.9 |
| J0584 | HCPCS | facility | Injection, burosumab-twza 1m | $448.7 | $484.14 | $-35.44 | 0.93 | 13 | 1 | n/a | n/a | $361.95 | $498.02 |
| 75872 | HCPCS | facility | HC VENOGRAPHY, EPIDURAL, RADIOLOGIAL S&I | $716.01 | $751.79 | $-35.78 | 0.95 | 10 | 1 | $1456.0 | $1019.2 | $709.02 | $1799.39 |
| 75880 | HCPCS | facility | HC VENOGRAPHY, ORBITAL, RADIOLOGIAL S&I | $716.01 | $751.79 | $-35.78 | 0.95 | 10 | 1 | $1456.0 | $1019.2 | $709.02 | $1799.39 |
| 30200 | HCPCS | facility | Injection treatment of nose | $610.495 | $646.36 | $-35.865 | 0.94 | 10 | 1 | n/a | n/a | $498.57 | $1176.62 |
| C7901 | HCPCS | facility | Hopd mntl hlt, 30-60 min | $84.26 | $121.75 | $-37.49 | 0.69 | 9 | 1 | n/a | n/a | $75.85 | $121.75 |
| 29125 | HCPCS | facility | Apply forearm splint | $121.905 | $159.45 | $-37.545 | 0.76 | 10 | 1 | $394.0 | $275.8 | $94.54 | $299.18 |
| 29126 | HCPCS | facility | Apply forearm splint | $121.905 | $159.45 | $-37.545 | 0.76 | 10 | 1 | $352.0 | $246.4 | $94.54 | $299.18 |
| 0712T | HCPCS | facility | N-nvs artl plaq alys quan | $221.09 | $258.77 | $-37.68 | 0.85 | 7 | 1 | n/a | n/a | $82.61 | $258.77 |
| 11740 | HCPCS | facility | Drain blood from under nail | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | $185.0 | $129.5 | $28.4 | $552.31 |
| 11981 | HCPCS | facility | Insert drug implant device | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | n/a | n/a | $49.64 | $552.31 |
| 29240 | HCPCS | facility | HC STRAPPING OF SHOULDER | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $365.0 | $255.5 | $53.93 | $289.2 |
| 29530 | HCPCS | facility | HC STRAPPING, KNEE | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $365.0 | $255.5 | $53.93 | $289.2 |
| 30300 | HCPCS | facility | HC REMOVE FB NOSE | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | $255.0 | $178.5 | $49.64 | $552.31 |
| 30901 | HCPCS | facility | Control of nosebleed | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $333.0 | $233.1 | $78.09 | $299.18 |
| 30903 | HCPCS | facility | Control of nosebleed | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $399.0 | $279.3 | $78.09 | $299.18 |
| 30905 | HCPCS | facility | Control of nosebleed | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | $399.0 | $279.3 | $78.09 | $1805.48 |
| 36591 | HCPCS | facility | Draw blood off venous device | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $202.0 | $141.4 | $49.13 | $299.18 |
| 36592 | HCPCS | facility | Collect blood from picc | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $185.0 | $129.5 | $49.13 | $299.18 |
| 36600 | HCPCS | facility | HC ARTERIAL PUNCTURE, WITHDRAWAL BLOOD | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $173.0 | $121.1 | $23.43 | $294.5 |
| 46600 | HCPCS | facility | Diagnostic anoscopy spx | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | $185.0 | $129.5 | $49.64 | $552.31 |
| 51701 | HCPCS | facility | HC INSERT URINARY CATHETER | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $185.0 | $129.5 | $49.64 | $299.18 |
| 51702 | HCPCS | facility | HC INS TEMP BLADDER CATH | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $235.0 | $164.5 | $49.64 | $299.18 |
| 51736 | HCPCS | facility | Urine flow measurement | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $49.64 | $299.18 |
| 53601 | HCPCS | facility | Dilate urethra stricture | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | n/a | n/a | $81.99 | $552.31 |
| 53661 | HCPCS | facility | Dilation of urethra | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | n/a | n/a | $81.99 | $552.31 |
| 65205 | HCPCS | facility | HC REMOVE FB EYE | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | $185.0 | $129.5 | $74.07 | $552.31 |
| 65222 | HCPCS | facility | HC REMOVE FB EYE | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | $185.0 | $129.5 | $74.07 | $552.31 |
| 67820 | HCPCS | facility | Revise eyelashes | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | n/a | n/a | $74.07 | $274.76 |
| 69200 | HCPCS | facility | Clear outer ear canal | $121.77 | $159.45 | $-37.68 | 0.76 | 11 | 1 | $185.0 | $129.5 | $49.64 | $552.31 |
| 86900 | HCPCS | facility | Blood typing serologic abo | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $329.0 | $230.3 | $2.99 | $334.87 |
| 92020 | HCPCS | facility | Special eye evaluation | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $48.41 | $299.18 |
| 92083 | HCPCS | facility | Visual field examination(s) | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $74.07 | $299.18 |
| 92136 | HCPCS | facility | Ophthalmic biometry | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $74.07 | $299.18 |
| 92250 | HCPCS | facility | Eye exam with photos | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $48.41 | $299.18 |
| 92270 | HCPCS | facility | Electro-oculography | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $48.41 | $299.18 |
| 92286 | HCPCS | facility | Internal eye photography | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $74.07 | $299.18 |
| 92287 | HCPCS | facility | Internal eye photography | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $74.07 | $299.18 |
| 92312 | HCPCS | facility | Contact lens fitting | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $48.41 | $299.18 |
| 92313 | HCPCS | facility | Contact lens fitting | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $74.07 | $299.18 |
| 92315 | HCPCS | facility | Rx cntact lens aphakia 1 eye | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $74.07 | $299.18 |
| 92541 | HCPCS | facility | Spontaneous nystagmus test | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $65.29 | $299.18 |
| 92542 | HCPCS | facility | Positional nystagmus test | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $65.29 | $299.18 |
| 92552 | HCPCS | facility | Pure tone audiometry air | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $35.88 | $299.18 |
| 93225 | HCPCS | facility | Ecg monit/reprt up to 48 hrs | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $956.0 | $669.2 | $66.52 | $299.18 |
| 93786 | HCPCS | facility | Ambulatory BP recording | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $66.52 | $299.18 |
| 93788 | HCPCS | facility | Ambulatory BP analysis | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $66.52 | $299.18 |
| 93922 | HCPCS | facility | HC BILAT, NONINVASIVE STUDIES, UP & LOW EXTREM, 1-2 LEVELS | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $577.0 | $403.9 | $66.52 | $299.18 |
| 94452 | HCPCS | facility | Hast w/report | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $62.87 | $299.18 |
| 94453 | HCPCS | facility | Hast w/oxygen titrate | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $62.87 | $299.18 |
| 94617 | HCPCS | facility | Exercise tst brncspsm | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $105.03 | $299.18 |
| 94618 | HCPCS | facility | HC PULMONARY STRESS TESTING (6 MINUTE WALK TEST) | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $348.0 | $243.6 | $105.03 | $299.18 |
| 94644 | HCPCS | facility | Cbt 1st hour | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $185.0 | $129.5 | $49.64 | $299.18 |
| 94667 | HCPCS | facility | Chest wall manipulation | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $234.0 | $163.8 | $35.09 | $299.18 |
| 94668 | HCPCS | facility | Chest wall manipulation | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $189.0 | $132.3 | $35.09 | $288.42 |
| 95860 | HCPCS | facility | HC EMG, 1 EXTREM W/WO PARASPINAL | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $736.0 | $515.2 | $79.83 | $299.18 |
| 95861 | HCPCS | facility | HC NDL EMG 2 XTR W/WO RELATED PARASPINAL AREAS | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $469.0 | $328.3 | $79.83 | $299.18 |
| 95865 | HCPCS | facility | Muscle test larynx | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $79.83 | $299.18 |
| 95922 | HCPCS | facility | Autonomic nrv adrenrg inervj | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $79.83 | $299.18 |
| 95923 | HCPCS | facility | Autonomic nrv syst funj test | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $79.83 | $299.18 |
| 95970 | HCPCS | facility | Analyze neurostim no prog | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | n/a | n/a | $79.83 | $299.18 |
| 99195 | HCPCS | facility | HC THERAPEUTIC PHLEMBOTOMY | $121.77 | $159.45 | $-37.68 | 0.76 | 10 | 1 | $212.0 | $148.4 | $49.13 | $299.18 |
| A0432 | HCPCS | facility | PI volunteer ambulance co | $538.85 | $576.92 | $-38.07 | 0.93 | 5 | 5 | n/a | n/a | $239.66 | $605.77 |
| 21480 | HCPCS | facility | HC CLOSED TX TEMPOROMANDIBULAR | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $78.09 | $1805.48 |
| 21820 | HCPCS | facility | Treat sternum fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $1805.48 |
| 23500 | HCPCS | facility | HC CLOSED TX CLAVICLE FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $507.0 | $354.9 | $131.74 | $1805.48 |
| 23540 | HCPCS | facility | Treat clavicle dislocation | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $1805.48 |
| 23570 | HCPCS | facility | Treat shoulder blade fx | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $1805.48 |
| 23600 | HCPCS | facility | Treat humerus fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $1805.48 |
| 23620 | HCPCS | facility | Treat humerus fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $1805.48 |
| 23650 | HCPCS | facility | HC CL TX SHOULDER DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $1805.48 |
| 24500 | HCPCS | facility | HC CL TX HUMERAL SHAFT FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $1805.48 |
| 24530 | HCPCS | facility | Treat humerus fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $1805.48 |
| 24560 | HCPCS | facility | Treat humerus fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $1805.48 |
| 24576 | HCPCS | facility | Treat humerus fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $1805.48 |
| 24600 | HCPCS | facility | HC TX ELBOW DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $1805.48 |
| 24640 | HCPCS | facility | HC CL TX ELBOW DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $552.31 |
| 24650 | HCPCS | facility | HC CL TX RADIUS FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $605.0 | $423.5 | $133.65 | $552.31 |
| 24670 | HCPCS | facility | HC CL TX ULNA FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $131.74 | $1805.48 |
| 25500 | HCPCS | facility | Treat fracture of radius | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $552.31 |
| 25530 | HCPCS | facility | Treat fracture of ulna | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $552.31 |
| 25535 | HCPCS | facility | HC TREAT FRACTURE OF ULNA | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $1805.48 |
| 25560 | HCPCS | facility | Treat fracture radius & ulna | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $552.31 |
| 25600 | HCPCS | facility | HC CL TX COLLES FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $750.0 | $525.0 | $133.65 | $552.31 |
| 25622 | HCPCS | facility | Treat wrist bone fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $552.31 |
| 25630 | HCPCS | facility | HC TREAT WRIST BONE FRACTURE | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $552.31 |
| 25650 | HCPCS | facility | HC CL TX ULNA STYLOID FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $552.31 |
| 25660 | HCPCS | facility | HC CL TW WRIST DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $1805.48 |
| 25675 | HCPCS | facility | HC CL TX DISTAL RADIOULNAR DIS | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $1805.48 |
| 25680 | HCPCS | facility | Treat wrist fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $4303.61 |
| 26600 | HCPCS | facility | HC CL TX METACARPAL FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $471.0 | $329.7 | $131.74 | $552.31 |
| 26605 | HCPCS | facility | HC CL TX METACARPAL FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $471.0 | $329.7 | $133.65 | $4303.61 |
| 26641 | HCPCS | facility | HC CL TX CARPOMETACARPAL DISLO | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $552.31 |
| 26670 | HCPCS | facility | HC CL TX CMC DISL,W MANIP, EA JT | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $296.0 | $207.2 | $131.74 | $552.31 |
| 26700 | HCPCS | facility | HC TREAT KNUCKLE DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $552.31 |
| 26720 | HCPCS | facility | HC CL TX FINGER FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $374.0 | $261.8 | $131.74 | $552.31 |
| 26725 | HCPCS | facility | HC CL TX FINGER FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $1805.48 |
| 26740 | HCPCS | facility | HC TREAT FINGER FRACTURE, EACH | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $374.0 | $261.8 | $133.65 | $552.31 |
| 26750 | HCPCS | facility | HC CL TX FINGER FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $337.0 | $235.9 | $131.74 | $552.31 |
| 26755 | HCPCS | facility | HC CL TX FINGER FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $552.31 |
| 26770 | HCPCS | facility | HC CL TX FINGER DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $497.0 | $347.9 | $131.74 | $552.31 |
| 27200 | HCPCS | facility | Treat tail bone fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $552.31 |
| 27220 | HCPCS | facility | Treat hip socket fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $1151.97 |
| 27230 | HCPCS | facility | Treat thigh fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $1805.48 |
| 27250 | HCPCS | facility | HC CLOSED TX HIP DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $498.0 | $348.6 | $133.65 | $1805.48 |
| 27256 | HCPCS | facility | Treat hip dislocation | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $4303.61 |
| 27265 | HCPCS | facility | HC TREAT HIP DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $1805.48 |
| 27501 | HCPCS | facility | Treatment of thigh fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $4303.61 |
| 27508 | HCPCS | facility | Treatment of thigh fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $1805.48 |
| 27516 | HCPCS | facility | Treat thigh fx growth plate | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $1805.48 |
| 27520 | HCPCS | facility | Treat kneecap fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $1805.48 |
| 27530 | HCPCS | facility | HC TX PATELLA FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $1805.48 |
| 27538 | HCPCS | facility | Treat knee fracture(s) | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $133.65 | $1805.48 |
| 27550 | HCPCS | facility | HC TX KNEE DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $1805.48 |
| 27560 | HCPCS | facility | HC TX KNEECAP DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $131.74 | $1805.48 |
| 27750 | HCPCS | facility | HC TX TIBIAL FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $328.0 | $229.6 | $133.65 | $1805.48 |
| 27760 | HCPCS | facility | Cltx medial ankle fx | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $1805.48 |
| 27767 | HCPCS | facility | Cltx post ankle fx | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $552.31 |
| 27780 | HCPCS | facility | HC TX FIBULA FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $1805.48 |
| 27786 | HCPCS | facility | HC TX ANKLE FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $1805.48 |
| 27788 | HCPCS | facility | HC TX ANKLE FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $1805.48 |
| 27808 | HCPCS | facility | HC TX ANKLE FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $1805.48 |
| 27816 | HCPCS | facility | HC TX ANKLE FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $328.0 | $229.6 | $133.65 | $1805.48 |
| 27824 | HCPCS | facility | HC TREAT LOWER LEG FRACTURE | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $1805.48 |
| 27830 | HCPCS | facility | Treat lower leg dislocation | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $1805.48 |
| 27840 | HCPCS | facility | HC TX ANKLE DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $1005.0 | $703.5 | $133.65 | $1805.48 |
| 28400 | HCPCS | facility | HC TX HEEL FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $226.0 | $158.2 | $133.65 | $1805.48 |
| 28430 | HCPCS | facility | Treatment of ankle fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $1151.97 |
| 28450 | HCPCS | facility | Treat midfoot fracture each | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $552.31 |
| 28470 | HCPCS | facility | HC TX METATARSAL FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $503.0 | $352.1 | $133.65 | $552.31 |
| 28475 | HCPCS | facility | HC TREAT METATARSAL FRACTURE | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $503.0 | $352.1 | $133.65 | $552.31 |
| 28490 | HCPCS | facility | HC TX BIG TOE FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $328.0 | $229.6 | $131.74 | $552.31 |
| 28495 | HCPCS | facility | HC TX BIG TOE FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $328.0 | $229.6 | $133.65 | $552.31 |
| 28510 | HCPCS | facility | HC CLOSED TX TOE FX OTHER THAN | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $424.0 | $296.8 | $131.74 | $552.31 |
| 28515 | HCPCS | facility | HC TX TOE FX | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $419.0 | $293.3 | $133.65 | $552.31 |
| 28530 | HCPCS | facility | Treat sesamoid bone fracture | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $552.31 |
| 28540 | HCPCS | facility | HC CLS TX TARSAL DISLOC; W/O ANES | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $1221.0 | $854.7 | $131.74 | $1151.97 |
| 28570 | HCPCS | facility | HC CL TX TALOTARSAL JOINT;WO ANES | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $436.0 | $305.2 | $133.65 | $1805.48 |
| 28600 | HCPCS | facility | Treat foot dislocation | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $552.31 |
| 28605 | HCPCS | facility | Treat foot dislocation | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | n/a | n/a | $131.74 | $1805.48 |
| 28630 | HCPCS | facility | HC TREAT TOE DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $133.65 | $552.31 |
| 28660 | HCPCS | facility | HC TREAT TOE DISLOCATION | $257.4 | $295.62 | $-38.22 | 0.87 | 11 | 1 | $341.0 | $238.7 | $131.74 | $552.31 |
| C9047 | HCPCS | facility | Injection, caplacizumab-yhdp | $764.26 | $802.49 | $-38.23 | 0.95 | 13 | 1 | n/a | n/a | $745.38 | $888.34 |
| 10040 | HCPCS | facility | Acne surgery | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 10060 | HCPCS | facility | Drainage of skin abscess | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $594.0 | $415.8 | $125.45 | $552.31 |
| 11055 | HCPCS | facility | HC PARE BENIGN HYPERKERATOTIC LESION, SINGLE | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $320.0 | $224.0 | $71.54 | $552.31 |
| 11056 | HCPCS | facility | HC PARE BENIGN HYPERKERATOTIC, LESIONS, 2 - 4 | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $320.0 | $224.0 | $71.54 | $274.76 |
| 11057 | HCPCS | facility | HC PARE BENIGN HYPERKERATOTIC,  LESIONS, > 4 | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $320.0 | $224.0 | $106.96 | $552.31 |
| 11200 | HCPCS | facility | HC REMOVAL OF SKIN TAGS, ANY AREA; UP TO 15 LESIONS | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $294.0 | $205.8 | $71.54 | $552.31 |
| 11301 | HCPCS | facility | Shave skin lesion 0.6-1.0 cm | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 11302 | HCPCS | facility | Shave skin lesion 1.1-2.0 cm | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 11305 | HCPCS | facility | HC SHAVE LES S/N/H/F/G; 0.5 CM/< | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $511.0 | $357.7 | $71.54 | $274.76 |
| 11306 | HCPCS | facility | Shave skin lesion 0.6-1.0 cm | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 11307 | HCPCS | facility | Shave skin lesion 1.1-2.0 cm | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 11310 | HCPCS | facility | Shave skin lesion 0.5 cm/< | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 11311 | HCPCS | facility | Shave skin lesion 0.6-1.0 cm | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 11730 | HCPCS | facility | HC REMOVAL NAIL PLATE | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $363.0 | $254.1 | $71.54 | $552.31 |
| 11900 | HCPCS | facility | HC INJECTION, INTERLESIONAL, UP TO 7 LESIONS | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $408.0 | $285.6 | $71.54 | $274.76 |
| 11901 | HCPCS | facility | HC INJECTION, INTERLESIONAL; >7 | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $380.0 | $266.0 | $71.54 | $274.76 |
| 12001 | HCPCS | facility | HC SIMPLE REPAIR-SCALP,NECK,AXILLAE,EXT GENITALIA,TRUNK,EXTREM; 2.5 CM-LESS | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $374.0 | $261.8 | $85.75 | $552.31 |
| 12002 | HCPCS | facility | HC SIMPLE REPAIR-SCALP,NECK,AXILLAE,EXT GENITALIA,TRUNK,EXTREM; 2.6-7.5 | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $429.0 | $300.3 | $85.75 | $552.31 |
| 12004 | HCPCS | facility | HC SIMPLE REPAIR-SCALP,NECK,AXILLAE,EXT GENITALIA,TRUNK,EXTREM; 7.6-12.5 | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $454.0 | $317.8 | $85.75 | $1805.48 |
| 12007 | HCPCS | facility | HC SIMPLE REPAIR, +30.0 CM | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $372.0 | $260.4 | $85.75 | $4303.61 |
| 12011 | HCPCS | facility | HC SIMPLE REPAIR-FACE,EARS,EYELIDS,NOSE,LIPS,MUCOUS MEMBRANES; 2.5 CM-LESS | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $333.0 | $233.1 | $85.75 | $1805.48 |
| 12013 | HCPCS | facility | HC SIMPLE REPAIR-FACE,EARS,EYELIDS,NOSE,LIPS,MUCOUS MEMBRANES; 2.6-5.0 | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $406.0 | $284.2 | $85.75 | $1805.48 |
| 12014 | HCPCS | facility | HC SIMPLE REPAIR-FACE,EARS,EYELIDS,NOSE,LIPS,MUCOUS MEMBRANES; 5.1-7.5 | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $493.0 | $345.1 | $85.75 | $1805.48 |
| 12015 | HCPCS | facility | HC SIMPLE REPAIR-FACE,EARS,EYELIDS,NOSE,LIPS,MUCOUS MEMBRANES; 7.5-12.5 | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $559.0 | $391.3 | $85.75 | $552.31 |
| 15786 | HCPCS | facility | Abrasion lesion single | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 16000 | HCPCS | facility | HC INIT TREATMENT OF BURNS | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $286.0 | $200.2 | $71.54 | $552.31 |
| 16020 | HCPCS | facility | Dress/debrid p-thick burn s | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $286.0 | $200.2 | $106.96 | $552.31 |
| 16025 | HCPCS | facility | Dress/debrid p-thick burn m | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $286.0 | $200.2 | $106.96 | $552.31 |
| 17000 | HCPCS | facility | Destruct premalg lesion | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $289.0 | $202.3 | $71.54 | $274.76 |
| 17110 | HCPCS | facility | Destruct b9 lesion 1-14 | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $293.0 | $205.1 | $71.54 | $274.76 |
| 17111 | HCPCS | facility | Destruct lesion 15 or more | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $567.0 | $396.9 | $106.96 | $552.31 |
| 17250 | HCPCS | facility | Chemical cautery tissue | $201.78 | $240.45 | $-38.67 | 0.84 | 10 | 1 | $566.0 | $396.2 | $106.96 | $463.6 |
| 17260 | HCPCS | facility | Destruction of skin lesions | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 17261 | HCPCS | facility | Destruction of skin lesions | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 17262 | HCPCS | facility | Destruction of skin lesions | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 17263 | HCPCS | facility | Destruction of skin lesions | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 17270 | HCPCS | facility | Destruction of skin lesions | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 17271 | HCPCS | facility | Destruction of skin lesions | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 17272 | HCPCS | facility | Destruction of skin lesions | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 17280 | HCPCS | facility | Destruction of skin lesions | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 17360 | HCPCS | facility | Skin peel therapy | $201.78 | $240.45 | $-38.67 | 0.84 | 10 | 1 | n/a | n/a | $106.96 | $463.6 |
| 26010 | HCPCS | facility | Drainage of finger abscess | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $286.0 | $200.2 | $125.45 | $552.31 |
| 46916 | HCPCS | facility | Cryosurgery anal lesion(s) | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 54056 | HCPCS | facility | Cryosurgery penis lesion(s) | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 69220 | HCPCS | facility | Clean out mastoid cavity | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | n/a | n/a | $71.54 | $274.76 |
| 86078 | HCPCS | facility | HC TXRXN - CLERICAL CHECK | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $238.0 | $166.6 | $23.43 | $462.33 |
| 86860 | HCPCS | facility | HC ANTIBODY ELUTION, RBC, EACH | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $238.0 | $166.6 | $24.99 | $464.62 |
| 86885 | HCPCS | facility | Coombs test indirect qual | $165.51 | $204.18 | $-38.67 | 0.81 | 10 | 1 | $221.0 | $154.7 | $5.72 | $454.21 |
| 86886 | HCPCS | facility | Coombs test indirect titer | $165.51 | $204.18 | $-38.67 | 0.81 | 10 | 1 | $248.0 | $173.6 | $5.18 | $452.98 |
| 86920 | HCPCS | facility | Compatibility test spin | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $307.0 | $214.9 | $17.96 | $459.85 |
| 86921 | HCPCS | facility | Compatibility test incubate | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $248.0 | $173.6 | $17.96 | $454.23 |
| 86922 | HCPCS | facility | Compatibility test antiglob | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $255.0 | $178.5 | $24.99 | $464.62 |
| 86923 | HCPCS | facility | Compatibility test electric | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $248.0 | $173.6 | $17.96 | $459.85 |
| 86927 | HCPCS | facility | Plasma fresh frozen | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $17.96 | $489.63 |
| 86950 | HCPCS | facility | Leukacyte transfusion | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $17.96 | $454.23 |
| 86965 | HCPCS | facility | Pooling blood platelets | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $24.99 | $464.62 |
| 86977 | HCPCS | facility | HC PRETREATMENT SERUM, RBC,AB ID; INCUBATION W/INHIB, EACH | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $255.0 | $178.5 | $34.3 | $470.96 |
| 86985 | HCPCS | facility | HC SPLIT PACKED CELL | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $137.0 | $95.9 | $17.96 | $458.1 |
| 88120 | HCPCS | facility | Cytp urne 3-5 probes ea spec | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $157.05 | $491.89 |
| 88172 | HCPCS | facility | Cytp dx eval fna 1st ea site | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $905.0 | $633.5 | $23.43 | $470.31 |
| 88331 | HCPCS | facility | HC FROZEN SECTION | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $320.0 | $224.0 | $23.43 | $466.27 |
| 88342 | HCPCS | facility | HC IMMUNOHISTOCHEMISTRY | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $304.0 | $212.8 | $38.1 | $491.89 |
| 88360 | HCPCS | facility | HC IMMUNOHISTOCHEM, SEMIQUANT | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $378.0 | $264.6 | $38.1 | $491.89 |
| 88365 | HCPCS | facility | HC IN SITU HYBRIDIZATION 1ST PROBE STAIN | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $658.0 | $460.6 | $38.1 | $466.27 |
| 88374 | HCPCS | facility | HC M/PHMTRC ALYS ISH QUANT/SEMIQ CPTR EACH MULTIPRB | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | $694.0 | $485.8 | $23.43 | $491.89 |
| 88377 | HCPCS | facility | M/phmtrc alys ishquant/semiq | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $23.43 | $491.89 |
| 89049 | HCPCS | facility | Chct for mal hyperthermia | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $12.71 | $455.03 |
| 89220 | HCPCS | facility | Sputum specimen collection | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $23.43 | $462.33 |
| 89250 | HCPCS | facility | Cultr oocyte/embryo <4 days | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $60.45 | $486.79 |
| 89259 | HCPCS | facility | Cryopreservation sperm | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $23.43 | $462.33 |
| 89281 | HCPCS | facility | Assist oocyte fertilization | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $60.45 | $486.79 |
| 89337 | HCPCS | facility | Cryopreservation oocyte(s) | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $60.45 | $486.79 |
| 89343 | HCPCS | facility | Storage/year sperm/semen | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $60.45 | $466.27 |
| 89352 | HCPCS | facility | Thawing cryopresrved embryo | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $60.45 | $486.79 |
| 89356 | HCPCS | facility | Thawing cryopresrved oocyte | $165.51 | $204.18 | $-38.67 | 0.81 | 9 | 1 | n/a | n/a | $60.45 | $486.79 |
| 96567 | HCPCS | facility | Photodynamic tx skin | $201.78 | $240.45 | $-38.67 | 0.84 | 10 | 1 | n/a | n/a | $106.96 | $463.6 |
| 96573 | HCPCS | facility | Pdt dstr prmlg les phys/qhp | $201.78 | $240.45 | $-38.67 | 0.84 | 9 | 1 | n/a | n/a | $168.93 | $463.6 |
| 96574 | HCPCS | facility | Dbrdmt prmlg les w/pdt | $201.78 | $240.45 | $-38.67 | 0.84 | 9 | 1 | n/a | n/a | $168.93 | $463.6 |
| 96920 | HCPCS | facility | Laser tx skin < 250 sq cm | $201.78 | $240.45 | $-38.67 | 0.84 | 10 | 1 | n/a | n/a | $106.96 | $463.6 |
| 96921 | HCPCS | facility | Laser tx skin 250-500 sq cm | $201.78 | $240.45 | $-38.67 | 0.84 | 10 | 1 | n/a | n/a | $106.96 | $463.6 |
| 97597 | HCPCS | facility | HC SEL DEBRID,W/O ANES <=20 SQ CM | $201.78 | $240.45 | $-38.67 | 0.84 | 11 | 1 | $573.0 | $401.1 | $106.96 | $552.31 |
| 97602 | HCPCS | facility | HC NS DEBRID,W/O ANES,PER SESSION | $201.78 | $240.45 | $-38.67 | 0.84 | 10 | 1 | $573.0 | $401.1 | $71.54 | $463.6 |
| 97605 | HCPCS | facility | HC NEG PRESS WOUND TX, <=50SQ CM | $201.78 | $240.45 | $-38.67 | 0.84 | 10 | 1 | $316.0 | $221.2 | $71.54 | $463.6 |
| 0422T | HCPCS | facility | Tactile breast img uni/bi | $65.54 | $104.29 | $-38.75 | 0.63 | 6 | 1 | n/a | n/a | $59.84 | $104.29 |
| A0427 | HCPCS | facility | ALS1-emergency | $587.455 | $626.37 | $-38.915 | 0.94 | 10 | 5 | $1219.0 | $853.3 | $396.86 | $789.27 |
| 90676 | HCPCS | facility | Rabies vaccine id | $197.345 | $236.86 | $-39.515 | 0.83 | 10 | 1 | n/a | n/a | $119.86 | $236.86 |
| Q4167 | HCPCS | facility | Truskin, per sq centimeter | $108.845 | $149.14 | $-40.295 | 0.73 | 6 | 1 | n/a | n/a | $102.8 | $149.14 |
| Q4153 | HCPCS | facility | Dermavest, plurivest sq cm | $108.6 | $149.14 | $-40.54 | 0.73 | 6 | 1 | n/a | n/a | $44.23 | $154.58 |
| Q4235 | HCPCS | facility | Amniorepair or altiply sq cm | $108.42 | $149.14 | $-40.72 | 0.73 | 6 | 1 | n/a | n/a | $80.48 | $149.97 |
| 29085 | HCPCS | facility | Apply hand/wrist cast | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | $439.0 | $307.3 | $94.54 | $375.94 |
| 29086 | HCPCS | facility | Apply finger cast | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | $439.0 | $307.3 | $94.54 | $375.94 |
| 29105 | HCPCS | facility | Apply long arm splint | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | $432.0 | $302.4 | $94.54 | $375.94 |
| 29200 | HCPCS | facility | Strapping of chest | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | n/a | n/a | $53.93 | $375.94 |
| 29440 | HCPCS | facility | Addition of walker to cast | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | n/a | n/a | $94.54 | $375.94 |
| 29450 | HCPCS | facility | Application of leg cast | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | n/a | n/a | $94.54 | $375.94 |
| 29505 | HCPCS | facility | Application long leg splint | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | $519.0 | $363.3 | $94.54 | $375.94 |
| 29515 | HCPCS | facility | Application lower leg splint | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | $432.0 | $302.4 | $94.54 | $375.94 |
| 29540 | HCPCS | facility | HC STRAPPING, ANKLE/FOOT | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | $360.0 | $252.0 | $53.93 | $375.94 |
| 29581 | HCPCS | facility | Apply multlay comprs lwr leg | $153.95 | $194.75 | $-40.8 | 0.79 | 11 | 1 | $499.0 | $349.3 | $94.54 | $552.31 |
| 29584 | HCPCS | facility | Appl multlay comprs arm/hand | $153.95 | $194.75 | $-40.8 | 0.79 | 11 | 1 | $449.0 | $314.3 | $53.93 | $274.76 |
| 29720 | HCPCS | facility | Repair of body cast | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | n/a | n/a | $94.54 | $375.94 |
| 29730 | HCPCS | facility | Windowing of cast | $153.95 | $194.75 | $-40.8 | 0.79 | 10 | 1 | n/a | n/a | $94.54 | $375.94 |
| 96360 | HCPCS | facility | HC HYDRATION, INITIAL, TO 1 HOUR | $214.05 | $254.91 | $-40.86 | 0.84 | 10 | 1 | $520.0 | $364.0 | $74.69 | $531.94 |
| 96365 | HCPCS | facility | HC IV INFUSION, INITIAL, TO 1 HR | $214.05 | $254.91 | $-40.86 | 0.84 | 10 | 1 | $562.0 | $393.4 | $146.24 | $531.94 |
| 96369 | HCPCS | facility | Sc ther infusion up to 1 hr | $214.05 | $254.91 | $-40.86 | 0.84 | 10 | 1 | n/a | n/a | $146.24 | $531.94 |
| 96373 | HCPCS | facility | HC MIH - THERAP/PROPHYL/DIAGNOSTIC INJECTION; INTRA-ARTERIAL | $214.05 | $254.91 | $-40.86 | 0.84 | 10 | 1 | $577.0 | $403.9 | $39.13 | $517.54 |
| 96374 | HCPCS | facility | HC INJECT, IV PUSH, 1ST SUBS/DRUG | $214.05 | $254.91 | $-40.86 | 0.84 | 10 | 1 | $486.0 | $340.2 | $39.13 | $517.54 |
| 96406 | HCPCS | facility | Chemo intralesional over 7 | $214.05 | $254.91 | $-40.86 | 0.84 | 10 | 1 | n/a | n/a | $146.24 | $531.94 |
| 96521 | HCPCS | facility | Refill/maint portable pump | $214.05 | $254.91 | $-40.86 | 0.84 | 10 | 1 | n/a | n/a | $146.24 | $531.94 |
| 96522 | HCPCS | facility | Refill/maint pump/resvr syst | $214.05 | $254.91 | $-40.86 | 0.84 | 9 | 1 | n/a | n/a | $146.24 | $531.94 |
| 0906T | HCPCS | facility | Coms ther 1st appl<=50 sq cm | $198.7 | $240.45 | $-41.75 | 0.83 | 3 | 1 | n/a | n/a | $198.7 | $240.45 |
| J7511 | HCPCS | facility | Antithymocyte globuln rabbit | $956.74 | $999.37 | $-42.63 | 0.96 | 13 | 1 | n/a | n/a | $790.6 | $1009.75 |
| 32552 | HCPCS | facility | HC REMOVAL INDWELLING TUNNELED PLEURAL CATH W CUFF | $709.02 | $751.79 | $-42.77 | 0.94 | 11 | 1 | $1456.0 | $1019.2 | $412.39 | $1805.48 |
| 32554 | HCPCS | facility | Aspirate pleura w/o imaging | $709.02 | $751.79 | $-42.77 | 0.94 | 11 | 1 | $1827.0 | $1278.9 | $412.39 | $1805.48 |
| 32555 | HCPCS | facility | Aspirate pleura w/ imaging | $709.02 | $751.79 | $-42.77 | 0.94 | 11 | 1 | $993.0 | $695.1 | $412.39 | $1805.48 |
| 32560 | HCPCS | facility | HC INSTL VIA CHEST TUBE/CATH AGENT FOR PLEURODESIS | $709.02 | $751.79 | $-42.77 | 0.94 | 11 | 1 | $2547.0 | $1782.9 | $412.39 | $1805.48 |
| 32561 | HCPCS | facility | Lyse chest fibrin init day | $709.02 | $751.79 | $-42.77 | 0.94 | 11 | 1 | n/a | n/a | $412.39 | $1805.48 |
| 32960 | HCPCS | facility | Therapeutic pneumothorax | $709.02 | $751.79 | $-42.77 | 0.94 | 11 | 1 | n/a | n/a | $412.39 | $1805.48 |
| 36575 | HCPCS | facility | HC REPAIR TUNNEL/NON-TUN CVA CATH, W/O SUBQ PORT/PUMP, CENTRAL/PERIPH | $709.02 | $751.79 | $-42.77 | 0.94 | 11 | 1 | $1456.0 | $1019.2 | $439.63 | $1151.97 |
| 36589 | HCPCS | facility | HC REMOVE TUNNEL CV CATH W/O P/P | $709.02 | $751.79 | $-42.77 | 0.94 | 11 | 1 | $993.0 | $695.1 | $439.63 | $1151.97 |
| 75801 | HCPCS | facility | Lymph vessel x-ray arm/leg | $709.02 | $751.79 | $-42.77 | 0.94 | 10 | 1 | n/a | n/a | $322.04 | $1789.74 |
| Q4122 | HCPCS | facility | Dermacell | $106.195 | $149.14 | $-42.945 | 0.71 | 6 | 1 | n/a | n/a | $102.85 | $149.14 |
| 78120 | HCPCS | facility | Red cell mass single | $435.79 | $479.1 | $-43.31 | 0.91 | 10 | 1 | n/a | n/a | $404.24 | $1213.38 |
| 78130 | HCPCS | facility | Red cell survival study | $435.79 | $479.1 | $-43.31 | 0.91 | 10 | 1 | n/a | n/a | $404.24 | $1213.38 |
| 78140 | HCPCS | facility | HC LABELED RED CELL SEQUESTRATION, DIFF ORGAN/TISSUE | $435.79 | $479.1 | $-43.31 | 0.91 | 10 | 1 | $1494.0 | $1045.8 | $404.24 | $1213.38 |
| 31720 | HCPCS | facility | Clearance of airways | $219.11 | $262.43 | $-43.32 | 0.83 | 11 | 1 | $441.0 | $308.7 | $35.09 | $1805.48 |
| 94610 | HCPCS | facility | HC SURFACTANT ADMINISTRATION | $219.11 | $262.43 | $-43.32 | 0.83 | 10 | 1 | $879.0 | $615.3 | $35.09 | $488.8 |
| 94640 | HCPCS | facility | Airway inhalation treatment | $219.11 | $262.43 | $-43.32 | 0.83 | 10 | 1 | $258.0 | $180.6 | $35.09 | $488.8 |
| 94642 | HCPCS | facility | Aerosol inhalation treatment | $219.11 | $262.43 | $-43.32 | 0.83 | 10 | 1 | n/a | n/a | $100.94 | $488.8 |
| 94660 | HCPCS | facility | HC CPAP INITIATION & MANAGEMENT INITIAL | $219.11 | $262.43 | $-43.32 | 0.83 | 10 | 1 | $710.0 | $497.0 | $100.94 | $488.8 |
| 94664 | HCPCS | facility | Evaluate pt use of inhaler | $219.11 | $262.43 | $-43.32 | 0.83 | 10 | 1 | $303.0 | $212.1 | $35.09 | $488.8 |
| J9348 | HCPCS | facility | Inj. naxitamab-gqgk, 1 mg | $642.15 | $686.0 | $-43.85 | 0.94 | 12 | 1 | n/a | n/a | $577.71 | $686.08 |
| 95712 | HCPCS | facility | HC EEG W/VIDEO BY TECH, 2-12 HOURS INTERMITTENT MONITORING & MAINTENANCE | $403.07 | $447.21 | $-44.14 | 0.90 | 10 | 1 | $637.0 | $445.9 | $277.38 | $721.29 |
| 0944T | HCPCS | facility | 3d cntr simula trgt lvr les | $241.72 | $285.95 | $-44.23 | 0.85 | 3 | 1 | n/a | n/a | $241.72 | $285.95 |
| 76017 | HCPCS | facility | HC MR SFTY MEDICAL PHYSICS EXAM CUSTOM, PLAN & PERFORM | $241.72 | $285.95 | $-44.23 | 0.85 | 5 | 1 | $771.0 | $539.7 | $241.72 | $285.95 |
| 90385 | HCPCS | facility | Rh ig minidose im | $34.02 | $80.0 | $-45.98 | 0.43 | 3 | 1 | n/a | n/a | $33.0 | $80.0 |
| 62252 | HCPCS | facility | Csf Shunt Reprogram | $320.66 | $368.09 | $-47.43 | 0.87 | 11 | 1 | n/a | n/a | $141.06 | $552.31 |
| 93724 | HCPCS | facility | Analyze pacemaker system | $320.66 | $368.09 | $-47.43 | 0.87 | 10 | 1 | n/a | n/a | $33.95 | $710.66 |
| 0615T | HCPCS | facility | Eye mvmt alys w/o calbrj i&r | $111.95 | $159.45 | $-47.5 | 0.70 | 3 | 1 | n/a | n/a | $111.95 | $159.45 |
| Q4196 | HCPCS | facility | HC PURAPLY AM, 1 SQ CM | $101.145 | $149.14 | $-47.995 | 0.68 | 6 | 1 | $287.0 | $200.9 | $98.54 | $149.14 |
| 30000 | HCPCS | facility | Drainage of nose lesion | $235.73 | $283.85 | $-48.12 | 0.83 | 11 | 1 | n/a | n/a | $102.45 | $1151.97 |
| 30906 | HCPCS | facility | HC REPEAT CONTROL OF NOSEBLEED | $235.73 | $283.85 | $-48.12 | 0.83 | 11 | 1 | $329.0 | $230.3 | $78.09 | $1805.48 |
| 31500 | HCPCS | facility | HC EMERGENCY INTUBATION | $235.73 | $283.85 | $-48.12 | 0.83 | 10 | 1 | $684.0 | $478.8 | $160.83 | $531.46 |
| 31502 | HCPCS | facility | Change of windpipe airway | $235.73 | $283.85 | $-48.12 | 0.83 | 11 | 1 | n/a | n/a | $100.94 | $552.31 |
| 42970 | HCPCS | facility | Control nose/throat bleeding | $235.73 | $283.85 | $-48.12 | 0.83 | 11 | 1 | n/a | n/a | $78.09 | $552.31 |
| 0649T | HCPCS | facility | Quan mr alys tiss w/mri | $1065.8 | $1114.97 | $-49.17 | 0.96 | 6 | 1 | n/a | n/a | $1055.95 | $1114.97 |
| 31231 | HCPCS | facility | HC DX NASAL ENDOSCOPY, UNI/BILAT | $187.51 | $239.22 | $-51.71 | 0.78 | 11 | 1 | $423.0 | $296.1 | $142.88 | $552.31 |
| 31505 | HCPCS | facility | Diagnostic laryngoscopy | $187.51 | $239.22 | $-51.71 | 0.78 | 11 | 1 | $374.0 | $261.8 | $77.3 | $552.31 |
| 31511 | HCPCS | facility | Remove foreign body larynx | $187.51 | $239.22 | $-51.71 | 0.78 | 11 | 1 | n/a | n/a | $142.88 | $1151.97 |
| 31575 | HCPCS | facility | Diagnostic laryngoscopy | $187.51 | $239.22 | $-51.71 | 0.78 | 11 | 1 | $317.0 | $221.9 | $142.88 | $552.31 |
| 92511 | HCPCS | facility | HC NASOPHARYNGOSCOPY W/ENDOSCOPE | $187.51 | $239.22 | $-51.71 | 0.78 | 10 | 1 | $283.0 | $198.1 | $77.3 | $450.69 |
| 0865T | HCPCS | facility | Quan mri alys brn w/o dx mri | $233.71 | $285.95 | $-52.24 | 0.82 | 3 | 1 | n/a | n/a | $233.71 | $285.95 |
| 0866T | HCPCS | facility | Quan mri alys brn w/dx mri | $233.71 | $285.95 | $-52.24 | 0.82 | 3 | 1 | n/a | n/a | $233.71 | $285.95 |
| 56420 | HCPCS | facility | Drainage of gland abscess | $189.75 | $242.29 | $-52.54 | 0.78 | 11 | 1 | $272.5 | $190.75 | $118.56 | $1805.48 |
| 56820 | HCPCS | facility | Exam of vulva w/scope | $189.75 | $242.29 | $-52.54 | 0.78 | 11 | 1 | $289.0 | $202.3 | $118.56 | $552.31 |
| 57160 | HCPCS | facility | HC FITTING/INSERTION OF PESSARY | $189.75 | $242.29 | $-52.54 | 0.78 | 11 | 1 | $355.0 | $248.5 | $118.56 | $552.31 |
| 57170 | HCPCS | facility | Fitting of diaphragm/cap | $189.75 | $242.29 | $-52.54 | 0.78 | 10 | 1 | n/a | n/a | $8.25 | $436.12 |
| 57180 | HCPCS | facility | Treat vaginal bleeding | $189.75 | $242.29 | $-52.54 | 0.78 | 11 | 1 | n/a | n/a | $118.56 | $552.31 |
| 59020 | HCPCS | facility | Fetal contract stress test | $189.75 | $242.29 | $-52.54 | 0.78 | 10 | 1 | n/a | n/a | $118.56 | $456.36 |
| 59025 | HCPCS | facility | Fetal non-stress test | $189.75 | $242.29 | $-52.54 | 0.78 | 11 | 1 | $1165.0 | $815.5 | $118.56 | $456.36 |
| 99170 | HCPCS | facility | Anogenital exam child w imag | $189.75 | $242.29 | $-52.54 | 0.78 | 10 | 1 | n/a | n/a | $8.25 | $436.12 |
| 0648T | HCPCS | facility | Quan mr alys tiss w/o mri | $1062.33 | $1114.97 | $-52.64 | 0.95 | 9 | 1 | n/a | n/a | $950.0 | $1114.97 |
| 0556T | HCPCS | facility | B1 str & fx rsk assessment | $233.01 | $285.95 | $-52.94 | 0.81 | 3 | 1 | n/a | n/a | $233.01 | $285.95 |
| 56405 | HCPCS | facility | HC I&D VULVA | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $462.0 | $323.4 | $118.56 | $1805.48 |
| 56821 | HCPCS | facility | Exam/biopsy of vulva w/scope | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $852.0 | $596.4 | $118.56 | $552.31 |
| 57156 | HCPCS | facility | Ins vag brachytx device | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | n/a | n/a | $230.7 | $1151.97 |
| 57420 | HCPCS | facility | Exam of vagina w/scope | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $767.0 | $536.9 | $230.7 | $1151.97 |
| 57454 | HCPCS | facility | Bx/curett of cervix w/scope | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $889.0 | $622.3 | $230.7 | $1151.97 |
| 57456 | HCPCS | facility | Endocerv curettage w/scope | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $1515.0 | $1060.5 | $230.7 | $1151.97 |
| 57511 | HCPCS | facility | Cryocautery of cervix | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | n/a | n/a | $118.56 | $552.31 |
| 58321 | HCPCS | facility | Artificial insemination | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | n/a | n/a | $230.7 | $1151.97 |
| 58976 | HCPCS | facility | Transfer of embryo | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | n/a | n/a | $230.7 | $552.31 |
| 59012 | HCPCS | facility | Fetal cord puncture prenatal | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | n/a | n/a | $230.7 | $1151.97 |
| 59030 | HCPCS | facility | Fetal scalp blood sample | $312.19 | $365.2 | $-53.01 | 0.85 | 10 | 1 | n/a | n/a | $230.7 | $763.03 |
| 59072 | HCPCS | facility | HC FETAL UMBILICAL CORD OCCLUSION, INCL US GUIDANCE | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $1134.0 | $793.8 | $230.7 | $1151.97 |
| 59074 | HCPCS | facility | Fetal fluid drainage w/us | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $2029.0 | $1420.3 | $230.7 | $1151.97 |
| 59076 | HCPCS | facility | Fetal shunt placement w/us | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $1070.0 | $749.0 | $230.7 | $4303.61 |
| 59200 | HCPCS | facility | HC CERVICAL DILATOR INSERT | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $1244.0 | $870.8 | $118.56 | $552.31 |
| 59866 | HCPCS | facility | Abortion (mpr) | $312.19 | $365.2 | $-53.01 | 0.85 | 11 | 1 | $594.0 | $415.8 | $230.7 | $4303.61 |
| C2635 | HCPCS | facility | Brachytx, non-str, HA, P-103 | $52.92 | $106.75 | $-53.83 | 0.50 | 13 | 1 | n/a | n/a | $31.01 | $106.75 |
| 40812 | HCPCS | facility | Excise/repair mouth lesion | $1805.48 | $1859.49 | $-54.01 | 0.97 | 11 | 1 | n/a | n/a | $1147.39 | $2551.58 |
| 41828 | HCPCS | facility | Excision of gum lesion | $1805.48 | $1859.49 | $-54.01 | 0.97 | 11 | 1 | n/a | n/a | $1727.73 | $2551.58 |
| 42800 | HCPCS | facility | Biopsy of throat | $1805.48 | $1859.49 | $-54.01 | 0.97 | 11 | 1 | $4299.0 | $3009.3 | $1147.39 | $2551.58 |
| Q4107 | HCPCS | facility | Graftjacket | $94.33 | $149.14 | $-54.81 | 0.63 | 6 | 1 | n/a | n/a | $92.59 | $149.14 |
| 0609T | HCPCS | facility | Mrs disc pain acquisj data | $230.13 | $285.95 | $-55.82 | 0.80 | 3 | 1 | n/a | n/a | $230.13 | $285.95 |
| 0611T | HCPCS | facility | Mrs disc pain alg alys data | $230.13 | $285.95 | $-55.82 | 0.80 | 3 | 1 | n/a | n/a | $230.13 | $285.95 |
| Q4178 | HCPCS | facility | Floweramniopatch, per sq cm | $93.11 | $149.14 | $-56.03 | 0.62 | 6 | 1 | n/a | n/a | $83.49 | $149.14 |
| 65450 | HCPCS | facility | Treatment of corneal lesion | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $144.89 | $1151.97 |
| 67345 | HCPCS | facility | Destroy nerve of eye muscle | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 67500 | HCPCS | facility | Inject/treat eye socket | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $144.89 | $552.31 |
| 67505 | HCPCS | facility | Inject/treat eye socket | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 67515 | HCPCS | facility | Inject/treat eye socket | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 67700 | HCPCS | facility | Drainage of eyelid abscess | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | $434.0 | $303.8 | $231.76 | $1151.97 |
| 67800 | HCPCS | facility | Remove eyelid lesion | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 67805 | HCPCS | facility | Remove eyelid lesions | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 67810 | HCPCS | facility | Biopsy eyelid & lid margin | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 67825 | HCPCS | facility | Revise eyelashes | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 67938 | HCPCS | facility | HC REMOVE FB EYELID | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | $426.0 | $298.2 | $144.89 | $552.31 |
| 68440 | HCPCS | facility | Incise tear duct opening | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 68530 | HCPCS | facility | Clearance of tear duct | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 68705 | HCPCS | facility | Revise tear duct opening | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 68760 | HCPCS | facility | Close tear duct opening | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 68761 | HCPCS | facility | Close tear duct opening | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 68810 | HCPCS | facility | Probe nasolacrimal duct | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 68840 | HCPCS | facility | Explore/irrigate tear ducts | $324.22 | $380.39 | $-56.17 | 0.85 | 11 | 1 | n/a | n/a | $144.89 | $552.31 |
| 53866 | HCPCS | facility | Cathj rmvl dev ischmc rmdlg | $243.21 | $299.43 | $-56.22 | 0.81 | 3 | 1 | n/a | n/a | $243.21 | $299.43 |
| A0433 | HCPCS | facility | HC ALS LEVEL 2 | $850.265 | $906.58 | $-56.315 | 0.94 | 10 | 5 | $1817.0 | $1271.9 | $574.4 | $1000.81 |
| J9202 | HCPCS | facility | Goserelin acetate implant | $674.77 | $733.66 | $-58.89 | 0.92 | 13 | 1 | n/a | n/a | $501.27 | $777.5 |
| Q4195 | HCPCS | facility | Puraply 1 sq cm | $89.575 | $149.14 | $-59.565 | 0.60 | 6 | 1 | n/a | n/a | $71.23 | $149.14 |
| 21073 | HCPCS | facility | Mnpj of tmj w/anesth | $1799.78 | $1859.49 | $-59.71 | 0.97 | 11 | 1 | n/a | n/a | $1462.72 | $2264.42 |
| 30124 | HCPCS | facility | Removal of nose lesion | $1799.78 | $1859.49 | $-59.71 | 0.97 | 11 | 1 | n/a | n/a | $1462.72 | $2264.42 |
| 41006 | HCPCS | facility | Drainage of mouth lesion | $1799.78 | $1859.49 | $-59.71 | 0.97 | 11 | 1 | n/a | n/a | $1462.72 | $2264.42 |
| 41007 | HCPCS | facility | Drainage of mouth lesion | $1799.78 | $1859.49 | $-59.71 | 0.97 | 11 | 1 | n/a | n/a | $1462.72 | $2264.42 |
| 41805 | HCPCS | facility | HC REMOVAL EMBEDDED FB, DENTOALVEOLAR STRUXS; SOFT TISSUES | $1799.78 | $1859.49 | $-59.71 | 0.97 | 11 | 1 | $2655.0 | $1858.5 | $1462.72 | $2264.42 |
| 41850 | HCPCS | facility | Treatment of gum lesion | $1799.78 | $1859.49 | $-59.71 | 0.97 | 11 | 1 | n/a | n/a | $1462.72 | $2264.42 |
| 42900 | HCPCS | facility | Repair throat wound | $1799.78 | $1859.49 | $-59.71 | 0.97 | 11 | 1 | n/a | n/a | $1462.72 | $2264.42 |
| 50020 | HCPCS | facility | Renal abscess open drain | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 50382 | HCPCS | facility | Change ureter stent percut | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | $7342.0 | $5139.4 | $1908.86 | $6735.22 |
| 50385 | HCPCS | facility | Change stent via transureth | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | $3674.0 | $2571.8 | $1908.86 | $4303.61 |
| 51040 | HCPCS | facility | Incise & drain bladder | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52005 | HCPCS | facility | Cystoscopy & ureter catheter | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | $3121.0 | $2184.7 | $1908.86 | $4303.61 |
| 52275 | HCPCS | facility | Cystoscopy & revise urethra | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52276 | HCPCS | facility | Cystoscopy and treatment | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52283 | HCPCS | facility | Cystoscopy and treatment | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52290 | HCPCS | facility | Cystoscopy and treatment | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52315 | HCPCS | facility | Cystoscopy and treatment | $2444.72 | $2505.21 | $-60.49 | 0.98 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 38230 | HCPCS | facility | Bone marrow harvest allogen | $1805.48 | $1866.49 | $-61.01 | 0.97 | 11 | 1 | n/a | n/a | $1426.02 | $3733.7 |
| Q4126 | HCPCS | facility | Memoderm/derma/tranz/integup | $87.51 | $149.14 | $-61.63 | 0.59 | 9 | 1 | n/a | n/a | $59.81 | $149.14 |
| Q4201 | HCPCS | facility | Matrion 1 sq cm | $86.24 | $149.14 | $-62.9 | 0.58 | 6 | 1 | n/a | n/a | $79.23 | $149.14 |
| G0563 | HCPCS | facility | Sbrt w/positron emission del | $3750.0 | $3812.97 | $-62.97 | 0.98 | 3 | 1 | n/a | n/a | $3750.0 | $3812.97 |
| 0864T | HCPCS | facility | Low ntsty eswt corpus cvrnsm | $235.72 | $299.43 | $-63.71 | 0.79 | 3 | 1 | n/a | n/a | $235.72 | $299.43 |
| P9044 | HCPCS | facility | Cryoprecipitatereducedplasma | $67.97 | $132.05 | $-64.08 | 0.51 | 7 | 1 | $278.0 | $194.6 | $67.81 | $132.05 |
| Q4183 | HCPCS | facility | Surgigraft, 1 sq cm | $85.0 | $149.14 | $-64.14 | 0.57 | 3 | 1 | n/a | n/a | $85.0 | $149.14 |
| 38228 | HCPCS | facility | Car-t admn autologous | $331.69 | $395.85 | $-64.16 | 0.84 | 5 | 1 | n/a | n/a | $331.69 | $395.85 |
| Q4150 | HCPCS | facility | Allowrap ds or dry 1 sq cm | $84.86 | $149.14 | $-64.28 | 0.57 | 6 | 1 | n/a | n/a | $79.0 | $149.14 |
| 29000 | HCPCS | facility | Application of body cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $94.54 | $616.42 |
| 29010 | HCPCS | facility | Application of body cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29015 | HCPCS | facility | Application of body cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29035 | HCPCS | facility | Application of body cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29040 | HCPCS | facility | Application of body cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $94.54 | $616.42 |
| 29046 | HCPCS | facility | Application of body cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29049 | HCPCS | facility | Application of figure eight | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $94.54 | $616.42 |
| 29055 | HCPCS | facility | Application of shoulder cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29058 | HCPCS | facility | Application of shoulder cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $94.54 | $616.42 |
| 29065 | HCPCS | facility | Application of long arm cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | $707.0 | $494.9 | $168.45 | $616.42 |
| 29075 | HCPCS | facility | Application of forearm cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | $745.0 | $521.5 | $168.45 | $616.42 |
| 29305 | HCPCS | facility | Application of hip cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29325 | HCPCS | facility | Application of hip casts | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29345 | HCPCS | facility | Application of long leg cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | $439.0 | $307.3 | $168.45 | $616.42 |
| 29355 | HCPCS | facility | Application of long leg cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29358 | HCPCS | facility | Apply long leg cast brace | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29365 | HCPCS | facility | Application of long leg cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29405 | HCPCS | facility | Apply short leg cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | $845.0 | $591.5 | $168.45 | $616.42 |
| 29425 | HCPCS | facility | Apply short leg cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | $566.0 | $396.2 | $168.45 | $616.42 |
| 29435 | HCPCS | facility | Apply short leg cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29445 | HCPCS | facility | Apply rigid leg cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | $962.0 | $673.4 | $168.45 | $616.42 |
| 29700 | HCPCS | facility | HC REMOVE/BIVALVE;GAUNTLET,BOO | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | $365.0 | $255.5 | $94.54 | $616.42 |
| 29705 | HCPCS | facility | HC REPAIR FULL ARM OR LEG CAST | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | $365.0 | $255.5 | $94.54 | $616.42 |
| 29710 | HCPCS | facility | Removal/revision of cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $168.45 | $616.42 |
| 29740 | HCPCS | facility | Wedging of cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $94.54 | $616.42 |
| 29750 | HCPCS | facility | Wedging of clubfoot cast | $269.4 | $335.2 | $-65.8 | 0.80 | 10 | 1 | n/a | n/a | $94.54 | $616.42 |
| P9025 | HCPCS | facility | Plasma cryo redu path each | $67.81 | $133.76 | $-65.95 | 0.51 | 9 | 1 | n/a | n/a | $67.08 | $133.76 |
| 36593 | HCPCS | facility | Declot vascular device | $329.78 | $395.85 | $-66.07 | 0.83 | 10 | 1 | $511.5 | $358.05 | $172.66 | $856.13 |
| 37195 | HCPCS | facility | HC THROMBOLYTIC THERAPY | $329.78 | $395.85 | $-66.07 | 0.83 | 11 | 1 | $325.0 | $227.5 | $172.66 | $1805.48 |
| 67028 | HCPCS | facility | Injection eye drug | $329.78 | $395.85 | $-66.07 | 0.83 | 11 | 1 | n/a | n/a | $231.76 | $1151.97 |
| 95990 | HCPCS | facility | Spin/brain pump refil & main | $329.78 | $395.85 | $-66.07 | 0.83 | 10 | 1 | n/a | n/a | $146.24 | $856.13 |
| 96413 | HCPCS | facility | Chemo iv infusion 1 hr | $329.78 | $395.85 | $-66.07 | 0.83 | 10 | 1 | $650.0 | $455.0 | $230.5 | $856.13 |
| 96416 | HCPCS | facility | Chemo prolong infuse w/pump | $329.78 | $395.85 | $-66.07 | 0.83 | 10 | 1 | n/a | n/a | $230.5 | $856.13 |
| 96420 | HCPCS | facility | Chemo ia push tecnique | $329.78 | $395.85 | $-66.07 | 0.83 | 10 | 1 | $686.0 | $480.2 | $74.69 | $814.59 |
| 96425 | HCPCS | facility | Chemotherapy infusion method | $329.78 | $395.85 | $-66.07 | 0.83 | 10 | 1 | n/a | n/a | $230.5 | $856.13 |
| 96440 | HCPCS | facility | Chemotherapy intracavitary | $329.78 | $395.85 | $-66.07 | 0.83 | 10 | 1 | n/a | n/a | $146.24 | $856.13 |
| 96446 | HCPCS | facility | Chemotx admn prtl cavity | $329.78 | $395.85 | $-66.07 | 0.83 | 10 | 1 | n/a | n/a | $146.24 | $856.13 |
| 96450 | HCPCS | facility | Chemotherapy into cns | $329.78 | $395.85 | $-66.07 | 0.83 | 10 | 1 | n/a | n/a | $230.5 | $856.13 |
| C8001 | HCPCS | facility | 3d anat seg imaging preop | $88.05 | $154.21 | $-66.16 | 0.57 | 5 | 1 | n/a | n/a | $88.05 | $154.21 |
| Q4197 | HCPCS | facility | Puraply xt 1 sq cm | $82.74 | $149.14 | $-66.4 | 0.55 | 6 | 1 | n/a | n/a | $71.04 | $149.14 |
| Q4258 | HCPCS | facility | Enverse, per sq cm | $82.41 | $149.14 | $-66.73 | 0.55 | 8 | 1 | n/a | n/a | $67.67 | $1584.6 |
| 44380 | HCPCS | facility | Small bowel endoscopy br/wa | $1019.6 | $1086.97 | $-67.37 | 0.94 | 11 | 1 | n/a | n/a | $750.68 | $1805.48 |
| 44382 | HCPCS | facility | Small bowel endoscopy | $1019.6 | $1086.97 | $-67.37 | 0.94 | 11 | 1 | n/a | n/a | $750.68 | $1805.48 |
| 36420 | HCPCS | facility | Vein access cutdown < 1 yr | $91.79 | $159.45 | $-67.66 | 0.58 | 10 | 1 | n/a | n/a | $23.43 | $245.78 |
| 77423 | HCPCS | facility | Neutron beam tx complex | $594.48 | $662.19 | $-67.71 | 0.90 | 10 | 1 | n/a | n/a | $179.52 | $1741.07 |
| 77470 | HCPCS | facility | Special radiation treatment | $594.48 | $662.19 | $-67.71 | 0.90 | 10 | 1 | n/a | n/a | $392.41 | $1788.13 |
| 77610 | HCPCS | facility | Hyperthermia treatment | $594.48 | $662.19 | $-67.71 | 0.90 | 10 | 1 | n/a | n/a | $392.41 | $1788.13 |
| 77615 | HCPCS | facility | Hyperthermia treatment | $594.48 | $662.19 | $-67.71 | 0.90 | 10 | 1 | n/a | n/a | $392.41 | $1788.13 |
| 77620 | HCPCS | facility | Hyperthermia treatment | $594.48 | $662.19 | $-67.71 | 0.90 | 10 | 1 | n/a | n/a | $392.41 | $1788.13 |
| 77761 | HCPCS | facility | Apply intrcav radiat simple | $594.48 | $662.19 | $-67.71 | 0.90 | 10 | 1 | n/a | n/a | $410.83 | $1788.13 |
| 77762 | HCPCS | facility | Apply intrcav radiat interm | $594.48 | $662.19 | $-67.71 | 0.90 | 10 | 1 | n/a | n/a | $410.83 | $1783.94 |
| 19020 | HCPCS | facility | HC MASTOTOMY W/EXPLORATION/DRAINAGE ABSCESS; DEEP | $1911.47 | $1979.35 | $-67.88 | 0.97 | 11 | 1 | $5274.0 | $3691.8 | $1319.12 | $4303.61 |
| 54015 | HCPCS | facility | Drain penis lesion | $1911.47 | $1979.35 | $-67.88 | 0.97 | 11 | 1 | n/a | n/a | $1319.12 | $6735.22 |
| 0415T | HCPCS | facility | Repos car modulj tranvns elt | $683.84 | $751.79 | $-67.95 | 0.91 | 5 | 1 | n/a | n/a | $683.84 | $751.79 |
| 11010 | HCPCS | facility | Debride skin at fx site | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $961.0 | $672.7 | $336.38 | $1151.97 |
| 11403 | HCPCS | facility | Exc tr-ext b9+marg 2.1-3cm/< | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $2470.0 | $1729.0 | $583.61 | $1805.48 |
| 11421 | HCPCS | facility | Exc h-f-nk-sp b9+marg 0.6-1 | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $2674.0 | $1871.8 | $583.61 | $1805.48 |
| 11442 | HCPCS | facility | Exc face-mm b9+marg 1.1-2 cm | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $2231.0 | $1561.7 | $583.61 | $1805.48 |
| 11600 | HCPCS | facility | Exc tr-ext mal+marg 0.5 cm/< | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $828.0 | $579.6 | $583.61 | $1805.48 |
| 11603 | HCPCS | facility | Exc tr-ext mal+marg 2.1-3 cm | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $1435.0 | $1004.5 | $583.61 | $1805.48 |
| 11604 | HCPCS | facility | Exc tr-ext mal+marg 3.1-4 cm | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | n/a | n/a | $583.61 | $4303.61 |
| 11621 | HCPCS | facility | Exc s/n/h/f/g mal+mrg 0.6-1 | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | n/a | n/a | $336.38 | $1151.97 |
| 11622 | HCPCS | facility | Exc s/n/h/f/g mal+mrg 1.1-2 | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | n/a | n/a | $583.61 | $1805.48 |
| 11640 | HCPCS | facility | Exc f/e/e/n/l mal+mrg 0.5cm< | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $1694.0 | $1185.8 | $336.38 | $1151.97 |
| 11641 | HCPCS | facility | Exc f/e/e/n/l mal+mrg 0.6-1 | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $2044.0 | $1430.8 | $336.38 | $1151.97 |
| 11642 | HCPCS | facility | Exc f/e/e/n/l mal+mrg 1.1-2 | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $2171.0 | $1519.7 | $336.38 | $1151.97 |
| 15781 | HCPCS | facility | Dermabrasion segmental face | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | n/a | n/a | $336.38 | $1151.97 |
| 28190 | HCPCS | facility | HC REMOVE FOREIGN BODY FOOT, SUBQ | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $2092.0 | $1464.4 | $583.61 | $1805.48 |
| 35226 | HCPCS | facility | HC REPAIR BLOOD VESSEL, LOW EXTRM | $780.56 | $848.66 | $-68.1 | 0.92 | 11 | 1 | $1088.0 | $761.6 | $583.61 | $6735.22 |
| 0932T | HCPCS | facility | N-invs det hrt fail aug echo | $299.91 | $368.09 | $-68.18 | 0.81 | 3 | 1 | n/a | n/a | $299.91 | $368.09 |
| D2740 | HCPCS | facility | Crown porcelain/ceramic subs | $705.82 | $774.78 | $-68.96 | 0.91 | 3 | 1 | n/a | n/a | $495.34 | $774.78 |
| 77600 | HCPCS | facility | Hyperthermia treatment | $392.41 | $462.24 | $-69.83 | 0.85 | 10 | 1 | n/a | n/a | $256.68 | $803.98 |
| A0434 | HCPCS | facility | HC ALS SPECIALTY CARE TRANSPORT (SCT) | $1000.71 | $1071.42 | $-70.71 | 0.93 | 10 | 5 | $2302.0 | $1611.4 | $678.83 | $1182.77 |
| J9268 | HCPCS | facility | Pentostatin injection | $2537.1 | $2608.16 | $-71.06 | 0.97 | 13 | 1 | n/a | n/a | $2001.9 | $2608.16 |
| 95983 | HCPCS | facility | Alys brn npgt prgrmg 15 min | $42.49 | $113.94 | $-71.45 | 0.37 | 10 | 1 | n/a | n/a | $27.87 | $256.72 |
| 67516 | HCPCS | facility | Sprchoroidal spc njx rx agt | $323.02 | $395.85 | $-72.83 | 0.82 | 3 | 1 | n/a | n/a | $323.02 | $395.85 |
| J2326 | HCPCS | facility | Inj, nusinersen, 0.1mg | $1207.32 | $1280.25 | $-72.93 | 0.94 | 13 | 1 | n/a | n/a | $1162.91 | $1389.84 |
| Q9991 | HCPCS | facility | Buprenorph xr 100 mg or less | $1943.06 | $2016.42 | $-73.36 | 0.96 | 13 | 1 | $3732.75 | $2612.92 | $1737.26 | $2016.42 |
| Q9992 | HCPCS | facility | Buprenorphine extended release 300 MG/1.5ML solution prefilled syringe 1.5 mL Syringe | $1943.06 | $2016.42 | $-73.36 | 0.96 | 13 | 1 | $1244.25 | $870.98 | $1737.26 | $2016.42 |
| 0766T | HCPCS | facility | Tc mag stimj pn 1st tx 1nrv | $184.21 | $258.77 | $-74.56 | 0.71 | 7 | 1 | n/a | n/a | $145.43 | $258.77 |
| 90868 | HCPCS | facility | Tcranial magn stim tx deli | $184.02 | $258.77 | $-74.75 | 0.71 | 10 | 1 | n/a | n/a | $155.47 | $615.82 |
| 90869 | HCPCS | facility | Tcran magn stim redetemine | $184.02 | $258.77 | $-74.75 | 0.71 | 10 | 1 | n/a | n/a | $155.47 | $594.84 |
| 95927 | HCPCS | facility | Somatosensory testing | $184.02 | $258.77 | $-74.75 | 0.71 | 10 | 1 | n/a | n/a | $155.47 | $594.84 |
| 95930 | HCPCS | facility | Visual evoked potential test | $184.02 | $258.77 | $-74.75 | 0.71 | 10 | 1 | n/a | n/a | $155.47 | $594.84 |
| 38792 | HCPCS | facility | HC INJECTION RADIOACTIVE TRACERE ID SENTINEL NODE | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1156.0 | $809.2 | $196.59 | $1000.75 |
| 78012 | HCPCS | facility | HC THYROID UPTAKE, SINGLE/MULTI | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $614.0 | $429.8 | $114.03 | $1213.38 |
| 78013 | HCPCS | facility | Thyroid imaging w/blood flow | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $150.04 | $1213.38 |
| 78014 | HCPCS | facility | Thyroid imaging w/blood flow | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $232.94 | $1213.38 |
| 78015 | HCPCS | facility | Thyroid met imaging | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $300.09 | $1213.38 |
| 78016 | HCPCS | facility | Thyroid met imaging/studies | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $300.09 | $1213.38 |
| 78070 | HCPCS | facility | HC PARATHYROID SCAN, PLANAR IMAGE | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1728.0 | $1209.6 | $232.94 | $1213.38 |
| 78071 | HCPCS | facility | HC PARATHYROID PLANAR W/SPECT | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $2319.0 | $1623.3 | $322.04 | $1213.38 |
| 78102 | HCPCS | facility | Bone marrow imaging ltd | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $3143.0 | $2200.1 | $279.95 | $1213.38 |
| 78103 | HCPCS | facility | Bone marrow imaging mult | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $3143.0 | $2200.1 | $279.95 | $1213.38 |
| 78104 | HCPCS | facility | Bone marrow imaging body | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $279.95 | $1213.38 |
| 78185 | HCPCS | facility | Spleen imaging | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $279.95 | $1213.38 |
| 78191 | HCPCS | facility | Platelet survival | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $196.59 | $1213.38 |
| 78215 | HCPCS | facility | HC LIVER & SPLEEN IMAGING; STATIC ONLY | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1309.0 | $916.3 | $314.39 | $1213.38 |
| 78216 | HCPCS | facility | Liver & spleen image/flow | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $314.39 | $1213.38 |
| 78226 | HCPCS | facility | HC HEPATOBILIARY SYSTEM IMAGING | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1560.0 | $1092.0 | $314.39 | $1213.38 |
| 78230 | HCPCS | facility | Salivary gland imaging | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $256.76 | $1213.38 |
| 78231 | HCPCS | facility | Serial salivary imaging | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $256.76 | $1213.38 |
| 78232 | HCPCS | facility | Salivary gland function exam | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $256.76 | $1213.38 |
| 78258 | HCPCS | facility | Esophageal motility study | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $256.76 | $1213.38 |
| 78261 | HCPCS | facility | Gastric mucosa imaging | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $256.76 | $1213.38 |
| 78262 | HCPCS | facility | Gastroesophageal reflux exam | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $256.76 | $1213.38 |
| 78264 | HCPCS | facility | Gastric emptying imag study | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1778.0 | $1244.6 | $256.76 | $1213.38 |
| 78265 | HCPCS | facility | Gastric emptying imag study | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $332.65 | $1213.38 |
| 78278 | HCPCS | facility | Acute GI blood loss imaging | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1040.0 | $728.0 | $256.76 | $1213.38 |
| 78290 | HCPCS | facility | HC MECKELS SCAN | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1040.0 | $728.0 | $256.76 | $1213.38 |
| 78291 | HCPCS | facility | HC SHUNT PATENCY | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1348.0 | $943.6 | $256.76 | $1213.38 |
| 78300 | HCPCS | facility | Bone imaging limited area | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $261.68 | $1213.38 |
| 78305 | HCPCS | facility | Bone imaging multiple areas | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $261.68 | $1213.38 |
| 78306 | HCPCS | facility | Bone imaging whole body | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $2001.0 | $1400.7 | $261.68 | $1213.38 |
| 78315 | HCPCS | facility | Bone imaging 3 phase | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $2284.0 | $1598.8 | $261.68 | $1213.38 |
| 78428 | HCPCS | facility | Cardiac shunt imaging | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $308.99 | $1213.38 |
| 78445 | HCPCS | facility | HC VASCULAR FLOW SCAN | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $906.0 | $634.2 | $330.97 | $1213.38 |
| 78458 | HCPCS | facility | Ven thrombosis images bilat | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $330.97 | $1213.38 |
| 78466 | HCPCS | facility | Heart infarct image | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $308.99 | $1213.38 |
| 78472 | HCPCS | facility | Gated heart planar single | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $308.99 | $1213.38 |
| 78473 | HCPCS | facility | Gated heart multiple | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1491.0 | $1043.7 | $308.99 | $1213.38 |
| 78494 | HCPCS | facility | Heart image spect | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $308.99 | $1213.38 |
| 78579 | HCPCS | facility | HC LUNG VENTILIATION IMAGING | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $957.0 | $669.9 | $220.96 | $1213.38 |
| 78580 | HCPCS | facility | HC PERFUSION SCAN,EG. PARTICULATE | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1807.0 | $1264.9 | $220.96 | $1213.38 |
| 78597 | HCPCS | facility | HC LUNG PERFUSION DIFFERENTIAL | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | $1169.0 | $818.3 | $220.96 | $1213.38 |
| 78600 | HCPCS | facility | Brain image < 4 views | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $264.09 | $1213.38 |
| 78660 | HCPCS | facility | Nuclear exam of tear flow | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $264.09 | $1213.38 |
| 78700 | HCPCS | facility | Kidney imaging morphol | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $332.91 | $1213.38 |
| 78701 | HCPCS | facility | Kidney imaging with flow | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $332.91 | $1213.38 |
| 78725 | HCPCS | facility | Kidney function study | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $196.59 | $1213.38 |
| 78740 | HCPCS | facility | Ureteral reflux study | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $332.91 | $1213.38 |
| 78761 | HCPCS | facility | Testicular imaging w/flow | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $332.91 | $1213.38 |
| 78800 | HCPCS | facility | Tumor imaging limited area | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $300.09 | $1213.38 |
| 78808 | HCPCS | facility | Iv inj ra drug dx study | $404.24 | $479.1 | $-74.86 | 0.84 | 10 | 1 | n/a | n/a | $196.59 | $1213.38 |
| Q4158 | HCPCS | facility | Marigen 1 square cm | $73.89 | $149.14 | $-75.25 | 0.50 | 6 | 1 | n/a | n/a | $66.32 | $174.25 |
| 64616 | HCPCS | facility | Chemodenerv musc neck dyston | $291.74 | $367.87 | $-76.13 | 0.79 | 11 | 1 | $723.0 | $506.1 | $246.27 | $1151.97 |
| 0472T | HCPCS | facility | Prgrmg io rta eltrd ra | $291.265 | $368.09 | $-76.825 | 0.79 | 6 | 1 | n/a | n/a | $261.87 | $368.09 |
| G0451 | HCPCS | facility | Devlopment test interpt&rep | $44.86 | $121.75 | $-76.89 | 0.37 | 3 | 1 | n/a | n/a | $44.86 | $121.75 |
| Q4123 | HCPCS | facility | Alloskin | $71.55 | $149.14 | $-77.59 | 0.48 | 9 | 1 | n/a | n/a | $37.6 | $149.14 |
| 37617 | HCPCS | facility | Ligation of abdomen artery | $6590.205 | $6668.74 | $-78.535 | 0.99 | 8 | 1 | n/a | n/a | $1404.75 | $6735.22 |
| 90880 | HCPCS | facility | Hypnotherapy | $43.0 | $121.75 | $-78.75 | 0.35 | 7 | 1 | n/a | n/a | $43.0 | $121.75 |
| J9229 | HCPCS | facility | Inj inotuzumab ozogam 0.1 mg | $2618.85 | $2698.05 | $-79.2 | 0.97 | 13 | 1 | n/a | n/a | $2341.3 | $2816.77 |
| Q2026 | HCPCS | facility | Radiesse injection | $268.95 | $349.19 | $-80.24 | 0.77 | 6 | 1 | n/a | n/a | $266.74 | $349.19 |
| C9363 | HCPCS | facility | Integra Meshed Bil Wound Mat | $68.81 | $149.14 | $-80.33 | 0.46 | 9 | 1 | n/a | n/a | $52.6 | $149.14 |
| Q4127 | HCPCS | facility | Talymed | $68.49 | $149.14 | $-80.65 | 0.46 | 9 | 1 | n/a | n/a | $35.8 | $149.14 |
| 77285 | HCPCS | facility | Set radiation therapy field | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $290.99 | $1118.71 |
| 77290 | HCPCS | facility | Set radiation therapy field | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $290.99 | $1118.71 |
| 77306 | HCPCS | facility | Telethx isodose plan simple | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $109.73 | $1076.49 |
| 77307 | HCPCS | facility | Telethx isodose plan cplx | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $109.73 | $1076.49 |
| 77316 | HCPCS | facility | Brachytx isodose plan simple | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $109.73 | $991.22 |
| 77317 | HCPCS | facility | Brachytx isodose intermed | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $290.99 | $1118.71 |
| 77318 | HCPCS | facility | Brachytx isodose complex | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $290.99 | $1118.71 |
| 77321 | HCPCS | facility | Special teletx port plan | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $290.99 | $1118.71 |
| 77334 | HCPCS | facility | Radiation treatment aid(s) | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $201.76 | $1118.71 |
| 77338 | HCPCS | facility | Design mlc device for imrt | $368.02 | $448.73 | $-80.71 | 0.82 | 10 | 1 | n/a | n/a | $290.99 | $1118.71 |
| 74230 | HCPCS | facility | Cine/vid x-ray throat/esoph | $128.66 | $210.21 | $-81.55 | 0.61 | 10 | 1 | $693.0 | $485.1 | $82.72 | $538.14 |
| 74250 | HCPCS | facility | HC SMALL BOWEL ALONE | $128.66 | $210.21 | $-81.55 | 0.61 | 10 | 1 | $861.0 | $602.7 | $82.72 | $538.14 |
| Q4175 | HCPCS | facility | Miroderm | $66.615 | $149.14 | $-82.525 | 0.45 | 6 | 1 | n/a | n/a | $62.86 | $149.14 |
| Q4156 | HCPCS | facility | Neox 100 1 square cm | $66.35 | $149.14 | $-82.79 | 0.44 | 6 | 1 | n/a | n/a | $66.2 | $149.14 |
| 93152 | HCPCS | facility | Interrog&prgrmg ipnss polysm | $284.88 | $368.09 | $-83.21 | 0.77 | 3 | 1 | n/a | n/a | $284.88 | $368.09 |
| Q4176 | HCPCS | facility | Neopatch, per sq centimeter | $65.92 | $149.14 | $-83.22 | 0.44 | 3 | 1 | n/a | n/a | $65.92 | $149.14 |
| 96136 | HCPCS | facility | Psycl/nrpsyc tst phy/qhp 1st | $76.06 | $159.45 | $-83.39 | 0.48 | 10 | 1 | n/a | n/a | $19.63 | $159.45 |
| 97151 | HCPCS | facility | Bhv id assmt by phys/qhp | $38.17 | $121.75 | $-83.58 | 0.31 | 10 | 1 | n/a | n/a | $33.38 | $121.75 |
| 97152 | HCPCS | facility | Bhv id suprt assmt by 1 tech | $38.17 | $121.75 | $-83.58 | 0.31 | 10 | 1 | n/a | n/a | $33.38 | $121.75 |
| 97153 | HCPCS | facility | Adaptive behavior tx by tech | $38.17 | $121.75 | $-83.58 | 0.31 | 10 | 1 | n/a | n/a | $33.38 | $121.75 |
| Q4110 | HCPCS | facility | Primatrix | $65.41 | $149.14 | $-83.73 | 0.44 | 7 | 1 | n/a | n/a | $42.33 | $149.14 |
| 20526 | HCPCS | facility | HC INJ,THERAP,CARPAL TUNNEL | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $618.0 | $432.6 | $182.61 | $552.31 |
| 20527 | HCPCS | facility | Inj dupuytren cord w/enzyme | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | n/a | n/a | $182.61 | $552.31 |
| 20550 | HCPCS | facility | HC INJ SGL TENDON SHEATH/LIGAMENT | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $806.0 | $564.2 | $182.61 | $552.31 |
| 20551 | HCPCS | facility | HC INJ SINGL TENDON ORIGIN/INSERT | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $719.0 | $503.3 | $182.61 | $552.31 |
| 20552 | HCPCS | facility | HC INJ TRIGGER POINTS, 1-2 MUSCLES | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $859.0 | $601.3 | $182.61 | $552.31 |
| 20553 | HCPCS | facility | HC INJ TRIGGER POINTS, 3 OR MORE MUSCLES | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $884.0 | $618.8 | $182.61 | $552.31 |
| 20600 | HCPCS | facility | Drain/inj joint/bursa w/o us | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $872.0 | $610.4 | $182.61 | $552.31 |
| 20604 | HCPCS | facility | Drain/inj joint/bursa w/us | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $879.0 | $615.3 | $140.56 | $552.31 |
| 20605 | HCPCS | facility | Drain/inj joint/bursa w/o us | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $828.0 | $579.6 | $182.61 | $552.31 |
| 20610 | HCPCS | facility | Drain/inj joint/bursa w/o us | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $852.0 | $596.4 | $182.61 | $552.31 |
| 20611 | HCPCS | facility | Drain/inj joint/bursa w/us | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $879.0 | $615.3 | $140.56 | $552.31 |
| 20612 | HCPCS | facility | Aspirate/inj ganglion cyst | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $777.0 | $543.9 | $182.61 | $552.31 |
| 64400 | HCPCS | facility | HC INJ ANEST, TRIGEMINAL NERVE | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $1292.0 | $904.4 | $182.61 | $1151.97 |
| 64408 | HCPCS | facility | HC INJECTION, ANESTHETIC AGENT; VAGUS NERVE | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $555.0 | $388.5 | $182.61 | $1151.97 |
| 64455 | HCPCS | facility | HC NERVE BLOCK INJ PLANTAR DIGIT | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $852.0 | $596.4 | $182.61 | $552.31 |
| 64505 | HCPCS | facility | HC NB; SPHENOPALATINE GANGLION | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $1422.0 | $995.4 | $182.61 | $552.31 |
| 64566 | HCPCS | facility | Neuroeltrd stim post tibial | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | n/a | n/a | $182.61 | $552.31 |
| 64611 | HCPCS | facility | Chemodenerv saliv glands | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $792.0 | $554.4 | $182.61 | $552.31 |
| 64612 | HCPCS | facility | Destroy nerve face muscle | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $755.0 | $528.5 | $182.61 | $1151.97 |
| 64615 | HCPCS | facility | Chemodenerv musc migraine | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $820.0 | $574.0 | $182.61 | $1151.97 |
| 64632 | HCPCS | facility | HC DEST NEURO AGENT, PLANTAR COMMOM DIGIT NERVE | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $844.0 | $590.8 | $182.61 | $552.31 |
| 64650 | HCPCS | facility | Chemodenerv eccrine glands | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $854.0 | $597.8 | $182.61 | $1151.97 |
| 64653 | HCPCS | facility | Chemodenerv eccrine glands | $283.01 | $367.87 | $-84.86 | 0.77 | 11 | 1 | $563.0 | $394.1 | $182.61 | $1151.97 |
| 95991 | HCPCS | facility | HC IMPLANT PUMP REFILL/MAINT,PHYS | $283.01 | $367.87 | $-84.86 | 0.77 | 10 | 1 | $737.0 | $515.9 | $146.24 | $703.83 |
| 77371 | HCPCS | facility | Srs multisource | $8741.63 | $8826.91 | $-85.28 | 0.99 | 10 | 1 | n/a | n/a | $7910.51 | $24162.16 |
| 77372 | HCPCS | facility | Srs linear based | $8741.63 | $8826.91 | $-85.28 | 0.99 | 10 | 1 | n/a | n/a | $3300.64 | $24162.16 |
| 77424 | HCPCS | facility | Io rad tx delivery by x-ray | $8741.63 | $8826.91 | $-85.28 | 0.99 | 10 | 1 | n/a | n/a | $978.25 | $24162.16 |
| 77425 | HCPCS | facility | Io rad tx deliver by elctrns | $8741.63 | $8826.91 | $-85.28 | 0.99 | 10 | 1 | n/a | n/a | $978.25 | $24162.16 |
| 92316 | HCPCS | facility | Rx cntact lens aphakia 2 eye | $74.07 | $159.45 | $-85.38 | 0.46 | 10 | 1 | n/a | n/a | $63.92 | $245.78 |
| 37183 | HCPCS | facility | HC REVISION TRANSVENOUS INTRAHEPATIC PERTOSYSTEMIC SHUNT (TIPS) | $6735.22 | $6821.04 | $-85.82 | 0.99 | 11 | 1 | $12082.0 | $8457.4 | $5350.17 | $11106.88 |
| 37246 | HCPCS | facility | HC TRLUML BALO ANGIOP 1ST ARTERY | $6735.22 | $6821.04 | $-85.82 | 0.99 | 10 | 1 | $11796.0 | $8257.2 | $5350.17 | $8046.1 |
| 70134 | HCPCS | facility | X-ray exam of middle ear | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | n/a | n/a | $70.84 | $1396.96 |
| 70557 | HCPCS | facility | Mri brain w/o dye | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | n/a | n/a | $338.49 | $1438.43 |
| 74190 | HCPCS | facility | HC PERITONEOGRAM (W/ INJECTION AIR/CONTRAST), RADOLOGICAL S&I | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | $1157.0 | $809.9 | $255.46 | $1571.96 |
| 74470 | HCPCS | facility | X-ray exam of kidney lesion | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | n/a | n/a | $255.46 | $1532.48 |
| 75559 | HCPCS | facility | Cardiac mri w/stress img | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | n/a | n/a | $338.49 | $1571.96 |
| 76080 | HCPCS | facility | HC SINUS TRACT INJECT, S&I | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | $1303.0 | $912.1 | $255.46 | $1571.96 |
| 76098 | HCPCS | facility | HC SURGICAL SPECIMEN | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | $957.0 | $669.9 | $322.04 | $1549.09 |
| 76825 | HCPCS | facility | Echo exam of fetal heart | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | $1004.0 | $702.8 | $212.66 | $1571.96 |
| 93303 | HCPCS | facility | Echo transthoracic | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | $1609.0 | $1126.3 | $558.66 | $1296.5 |
| 93304 | HCPCS | facility | Echo transthoracic | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | $1609.0 | $1126.3 | $390.49 | $1296.5 |
| 93306 | HCPCS | facility | HC TTE W OR W/O CNTRST, FOLLOW W/ CNTRST, COMP W/ DOPPLER & COLOR FLOW | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | $1609.0 | $1126.3 | $390.49 | $1296.5 |
| 93312 | HCPCS | facility | Echo transesophageal | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | $2317.0 | $1621.9 | $558.66 | $1296.5 |
| 93313 | HCPCS | facility | Echo transesophageal | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | n/a | n/a | $390.49 | $1296.5 |
| 93315 | HCPCS | facility | Echo transesophageal | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | n/a | n/a | $390.49 | $1296.5 |
| 93316 | HCPCS | facility | Echo transesophageal | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | n/a | n/a | $558.66 | $1296.5 |
| 93318 | HCPCS | facility | Echo Transesophageal Intraop | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | n/a | n/a | $558.66 | $1296.5 |
| 93350 | HCPCS | facility | HC TTE, STRESS TEST | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | $1564.0 | $1094.8 | $390.49 | $1296.5 |
| 93351 | HCPCS | facility | Stress tte complete | $568.91 | $654.85 | $-85.94 | 0.87 | 10 | 1 | n/a | n/a | $558.66 | $1296.5 |
| 95800 | HCPCS | facility | Slp stdy unattended | $172.61 | $258.77 | $-86.16 | 0.67 | 10 | 1 | n/a | n/a | $155.47 | $375.71 |
| 95806 | HCPCS | facility | HC HOME SLEEP STUDY | $172.61 | $258.77 | $-86.16 | 0.67 | 10 | 1 | $911.0 | $637.7 | $155.47 | $375.71 |
| D1110 | HCPCS | facility | Dental prophylaxis adult | $72.48 | $159.56 | $-87.08 | 0.45 | 7 | 1 | n/a | n/a | $41.59 | $159.56 |
| 0447T | HCPCS | facility | Rmvl impltbl glucose sensor | $153.05 | $240.45 | $-87.4 | 0.64 | 5 | 1 | n/a | n/a | $153.05 | $240.45 |
| D2783 | HCPCS | facility | Crown 3/4 porcelain/ceramic | $687.15 | $774.78 | $-87.63 | 0.89 | 3 | 1 | n/a | n/a | $482.24 | $774.78 |
| P9020 | HCPCS | facility | Plaelet rich plasma unit | $471.98 | $559.79 | $-87.81 | 0.84 | 7 | 1 | n/a | n/a | $175.62 | $559.79 |
| 96156 | HCPCS | facility | Hlth bhv assmt/reassessment | $33.93 | $121.75 | $-87.82 | 0.28 | 7 | 1 | n/a | n/a | $33.93 | $121.75 |
| 99483 | HCPCS | facility | Assmt & care pln pt cog imp | $33.93 | $121.75 | $-87.82 | 0.28 | 7 | 1 | n/a | n/a | $33.93 | $121.75 |
| D0220 | HCPCS | facility | Intraoral periapical first | $16.19 | $104.29 | $-88.1 | 0.16 | 3 | 1 | n/a | n/a | $11.71 | $104.29 |
| A9697 | HCPCS | facility | Inj, magtrace per study dose | $1165.59 | $1254.0 | $-88.41 | 0.93 | 2 | 1 | n/a | n/a | $1165.59 | $1254.0 |
| 21450 | HCPCS | facility | Treat lower jaw fracture | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $6735.22 |
| 30020 | HCPCS | facility | Drainage of nose lesion | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 30560 | HCPCS | facility | Release of nasal adhesions | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $4303.61 |
| 40806 | HCPCS | facility | Incision of lip fold | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 40808 | HCPCS | facility | Biopsy of mouth lesion | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 40818 | HCPCS | facility | Excise oral mucosa for graft | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 41009 | HCPCS | facility | Drainage of mouth lesion | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 41015 | HCPCS | facility | Drainage of mouth lesion | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 42180 | HCPCS | facility | HC RPR PALATE LACERATION; TO 2 CM | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | $788.0 | $551.6 | $229.81 | $1151.97 |
| 42280 | HCPCS | facility | Preparation palate mold | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 42310 | HCPCS | facility | Drainage of salivary gland | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 42320 | HCPCS | facility | Drainage of salivary gland | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 42660 | HCPCS | facility | Dilation of salivary duct | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | n/a | n/a | $229.81 | $1151.97 |
| 42960 | HCPCS | facility | Control throat bleeding | $557.06 | $646.36 | $-89.3 | 0.86 | 11 | 1 | $248.0 | $173.6 | $78.09 | $1805.48 |
| 92502 | HCPCS | facility | Ear and throat examination | $557.06 | $646.36 | $-89.3 | 0.86 | 10 | 1 | n/a | n/a | $229.81 | $1176.62 |
| 36430 | HCPCS | facility | Blood transfusion service | $437.87 | $528.72 | $-90.85 | 0.83 | 10 | 1 | $2690.0 | $1883.0 | $260.44 | $1049.75 |
| 36440 | HCPCS | facility | Bl push transfuse 2 yr/< | $437.87 | $528.72 | $-90.85 | 0.83 | 10 | 1 | n/a | n/a | $260.44 | $1049.75 |
| 36450 | HCPCS | facility | Bl exchange/transfuse nb | $437.87 | $528.72 | $-90.85 | 0.83 | 10 | 1 | n/a | n/a | $260.44 | $1049.75 |
| 36455 | HCPCS | facility | Bl exchange/transfuse non-nb | $437.87 | $528.72 | $-90.85 | 0.83 | 10 | 1 | n/a | n/a | $260.44 | $1049.75 |
| 36456 | HCPCS | facility | Prtl exchange transfuse nb | $437.87 | $528.72 | $-90.85 | 0.83 | 9 | 1 | n/a | n/a | $354.39 | $1049.75 |
| 36460 | HCPCS | facility | Transfusion service fetal | $437.87 | $528.72 | $-90.85 | 0.83 | 11 | 1 | n/a | n/a | $260.44 | $4303.61 |
| 38207 | HCPCS | facility | Cryopreserve stem cells | $437.87 | $528.72 | $-90.85 | 0.83 | 11 | 1 | n/a | n/a | $260.44 | $1151.97 |
| 38208 | HCPCS | facility | Thaw preserved stem cells | $437.87 | $528.72 | $-90.85 | 0.83 | 11 | 1 | n/a | n/a | $260.44 | $1151.97 |
| 38209 | HCPCS | facility | Wash harvest stem cells | $437.87 | $528.72 | $-90.85 | 0.83 | 11 | 1 | n/a | n/a | $260.44 | $1151.97 |
| 65855 | HCPCS | facility | Trabeculoplasty laser surg | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 65860 | HCPCS | facility | Incise inner eye adhesions | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 66761 | HCPCS | facility | Revision of iris | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 66762 | HCPCS | facility | Revision of iris | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 66770 | HCPCS | facility | Removal of inner eye lesion | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 66821 | HCPCS | facility | After cataract laser surgery | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 67031 | HCPCS | facility | Laser surgery eye strands | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 67105 | HCPCS | facility | Repair detached retina pc | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 67145 | HCPCS | facility | Treatment of retina | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 67210 | HCPCS | facility | Treatment of retinal lesion | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 67220 | HCPCS | facility | Treatment of choroid lesion | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $416.39 | $1151.97 |
| 67221 | HCPCS | facility | Ocular Photodynamic Ther | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $416.39 | $1151.97 |
| 67228 | HCPCS | facility | Treatment x10sv retinopathy | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1805.48 |
| 67229 | HCPCS | facility | Tr retinal les preterm inf | $567.41 | $659.14 | $-91.73 | 0.86 | 11 | 1 | n/a | n/a | $410.79 | $1151.97 |
| J0202 | HCPCS | facility | Injection, alemtuzumab | $2337.69 | $2429.89 | $-92.2 | 0.96 | 13 | 1 | n/a | n/a | $2017.45 | $2447.1 |
| 29130 | HCPCS | facility | Application of finger splint | $65.97 | $159.45 | $-93.48 | 0.41 | 10 | 1 | $438.0 | $306.6 | $53.93 | $245.78 |
| 29520 | HCPCS | facility | Strapping of hip | $65.97 | $159.45 | $-93.48 | 0.41 | 10 | 1 | n/a | n/a | $53.93 | $245.78 |
| Q4104 | HCPCS | facility | Integra bmwd | $53.76 | $149.14 | $-95.38 | 0.36 | 9 | 1 | n/a | n/a | $48.79 | $149.14 |
| 95870 | HCPCS | facility | HC EMG, LIMITED STUDY MUSCLES | $63.92 | $159.45 | $-95.53 | 0.40 | 10 | 1 | $571.0 | $399.7 | $43.11 | $252.25 |
| G0260 | HCPCS | facility | HC INJ PROC SACRO JOINT, ANESTH/STEROID AND/OR OTHER AGENT, W OR W/O ARTHRO | $750.33 | $845.96 | $-95.63 | 0.89 | 10 | 1 | $1492.0 | $1044.4 | $565.75 | $1660.06 |
| 93243 | HCPCS | facility | Ext ecg>48hr<7d scan a/r | $63.27 | $159.45 | $-96.18 | 0.40 | 10 | 1 | $333.0 | $233.1 | $55.66 | $225.13 |
| 90853 | HCPCS | facility | Group psychotherapy | $24.14 | $121.75 | $-97.61 | 0.20 | 7 | 1 | $157.0 | $109.9 | $24.14 | $121.75 |
| J0480 | HCPCS | facility | Basiliximab | $4588.77 | $4686.85 | $-98.08 | 0.98 | 13 | 1 | n/a | n/a | $4019.07 | $4781.07 |
| 11401 | HCPCS | facility | Exc tr-ext b9+marg 0.6-1 cm | $388.25 | $487.19 | $-98.94 | 0.80 | 11 | 1 | $985.0 | $689.5 | $336.38 | $1151.97 |
| 11602 | HCPCS | facility | Exc tr-ext mal+marg 1.1-2 cm | $388.25 | $487.19 | $-98.94 | 0.80 | 11 | 1 | $1321.0 | $924.7 | $336.38 | $1151.97 |
| 11750 | HCPCS | facility | HC REMOVAL NAIL BED, PART/COMPL | $388.25 | $487.19 | $-98.94 | 0.80 | 11 | 1 | $1997.0 | $1397.9 | $336.38 | $1151.97 |
| Q4108 | HCPCS | facility | Integra matrix | $49.12 | $149.14 | $-100.02 | 0.33 | 9 | 1 | n/a | n/a | $46.9 | $149.14 |
| 0893T | HCPCS | facility | N-invas assmt bld oxygnation | $59.4 | $159.45 | $-100.05 | 0.37 | 3 | 1 | n/a | n/a | $59.4 | $159.45 |
| 92651 | HCPCS | facility | Aep hearing status deter i&r | $158.63 | $258.77 | $-100.14 | 0.61 | 10 | 1 | n/a | n/a | $79.83 | $375.71 |
| Q4121 | HCPCS | facility | Theraskin | $48.85 | $149.14 | $-100.29 | 0.33 | 9 | 1 | n/a | n/a | $43.45 | $149.14 |
| Q4170 | HCPCS | facility | Cygnus, per sq cm | $47.17 | $149.14 | $-101.97 | 0.32 | 6 | 1 | n/a | n/a | $41.55 | $149.14 |
| G0443 | HCPCS | facility | Brief alcohol misuse counsel | $19.72 | $121.75 | $-102.03 | 0.16 | 4 | 1 | n/a | n/a | $19.72 | $121.75 |
| G0447 | HCPCS | facility | Behavior counsel obesity 15m | $19.72 | $121.75 | $-102.03 | 0.16 | 4 | 1 | n/a | n/a | $19.72 | $121.75 |
| G0101 | HCPCS | facility | CA screen;pelvic/breast exam | $19.18 | $121.75 | $-102.57 | 0.16 | 7 | 1 | n/a | n/a | $19.18 | $121.75 |
| 51741 | HCPCS | facility | Electro-uroflowmetry first | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $81.99 | $375.71 |
| 54240 | HCPCS | facility | Penis study | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $81.99 | $594.84 |
| 91065 | HCPCS | facility | Breath hydrogen/methane test | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $137.27 | $375.71 |
| 91132 | HCPCS | facility | Electrogastrography | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $137.27 | $594.84 |
| 92516 | HCPCS | facility | Facial nerve function test | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $65.29 | $594.84 |
| 92538 | HCPCS | facility | Caloric vstblr test w/rec | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $132.06 | $375.71 |
| 92540 | HCPCS | facility | Basic vestibular evaluation | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $132.06 | $375.71 |
| 92545 | HCPCS | facility | Oscillating tracking test | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $65.29 | $594.84 |
| 92550 | HCPCS | facility | Tympanometry & reflex thresh | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $35.88 | $375.71 |
| 92562 | HCPCS | facility | Loudness balance test | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $35.88 | $375.71 |
| 92579 | HCPCS | facility | Visual audiometry (vra) | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $88.6 | $375.71 |
| 93923 | HCPCS | facility | HC BILAT, NONINVASIVE STUDIES, UP & LOW EXTREM, 3+ LEVELS | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | $783.0 | $548.1 | $108.61 | $375.71 |
| 93924 | HCPCS | facility | Lwr xtr vasc stdy bilat | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $108.61 | $594.84 |
| 94010 | HCPCS | facility | Breathing capacity test | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | $337.0 | $235.9 | $62.87 | $375.71 |
| 94727 | HCPCS | facility | HC PULMONARY FUNCTION TEST, GAS | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | $250.0 | $175.0 | $45.06 | $375.71 |
| 95867 | HCPCS | facility | HC EMG, CRANIAL NERVE, UNILAT | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | $430.0 | $301.0 | $79.83 | $594.84 |
| 95868 | HCPCS | facility | HC NEEDLE ELECTROMYOGRAPHY CRANIAL NRV MUSCLE BI | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | $506.0 | $354.2 | $79.83 | $594.84 |
| 95869 | HCPCS | facility | HC EMG, THORACIC PARASPINAL | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | $166.0 | $116.2 | $43.11 | $375.71 |
| 95872 | HCPCS | facility | HC NEEDLE EMG W/1 FIBER ELECTRODE QUAN MEAS JITTER | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | $469.0 | $328.3 | $79.83 | $375.71 |
| 95907 | HCPCS | facility | HC NERVE CONDUCTION, 1-2 STUDIES | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | $429.0 | $300.3 | $43.11 | $375.71 |
| 95924 | HCPCS | facility | Ans parasymp & symp w/tilt | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $79.83 | $594.84 |
| 96002 | HCPCS | facility | Dynamic surface emg | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $79.83 | $375.71 |
| 96130 | HCPCS | facility | Psycl tst eval phys/qhp 1st | $155.47 | $258.77 | $-103.3 | 0.60 | 10 | 1 | n/a | n/a | $76.06 | $258.77 |
| Q4152 | HCPCS | facility | Dermapure 1 square cm | $45.41 | $149.14 | $-103.73 | 0.30 | 6 | 1 | n/a | n/a | $43.45 | $149.14 |
| 0559T | HCPCS | facility | Antmc mdl 3d print 1st cmpnt | $55.01 | $159.45 | $-104.44 | 0.34 | 3 | 1 | n/a | n/a | $55.01 | $159.45 |
| 0561T | HCPCS | facility | Antmc guide 3d print 1st gd | $55.01 | $159.45 | $-104.44 | 0.34 | 3 | 1 | n/a | n/a | $55.01 | $159.45 |
| G0439 | HCPCS | facility | PPPS, subseq visit | $36.25 | $141.42 | $-105.17 | 0.26 | 7 | 1 | n/a | n/a | $36.25 | $530.32 |
| 68040 | HCPCS | facility | Treatment of eyelid lesions | $274.76 | $380.39 | $-105.63 | 0.72 | 11 | 1 | n/a | n/a | $74.07 | $380.39 |
| 54110 | HCPCS | facility | Treatment of penis lesion | $4118.29 | $4224.5 | $-106.21 | 0.97 | 11 | 1 | n/a | n/a | $2775.49 | $4327.73 |
| D2780 | HCPCS | facility | Crown 3/4 cast hi noble met | $667.96 | $774.78 | $-106.82 | 0.86 | 3 | 1 | n/a | n/a | $468.83 | $774.78 |
| Q4182 | HCPCS | facility | Transcyte, per sq centimeter | $40.12 | $149.14 | $-109.02 | 0.27 | 3 | 1 | n/a | n/a | $40.12 | $149.14 |
| A9508 | HCPCS | facility | I131 iodobenguate, dx | $842.61 | $953.01 | $-110.4 | 0.88 | 3 | 1 | n/a | n/a | $842.61 | $953.01 |
| G0445 | HCPCS | facility | High inten beh couns STD 30m | $9.48 | $121.75 | $-112.27 | 0.08 | 4 | 1 | n/a | n/a | $9.48 | $121.75 |
| J1950 | HCPCS | facility | Leuprolide acetate /3.75 mg | $1617.65 | $1730.32 | $-112.67 | 0.93 | 13 | 1 | $2392.38 | $1674.67 | $1531.33 | $1763.87 |
| 0721T | HCPCS | facility | Quan ct tiss charac w/o ct | $650.0 | $763.06 | $-113.06 | 0.85 | 3 | 1 | n/a | n/a | $650.0 | $763.06 |
| 0722T | HCPCS | facility | Quan ct tiss charac w/ct | $650.0 | $763.06 | $-113.06 | 0.85 | 3 | 1 | n/a | n/a | $650.0 | $763.06 |
| 0877T | HCPCS | facility | Augmnt alys ch ct ild w/o ct | $650.0 | $763.06 | $-113.06 | 0.85 | 3 | 1 | n/a | n/a | $650.0 | $763.06 |
| 0878T | HCPCS | facility | Augmnt alys ch ct ild w/ct | $650.0 | $763.06 | $-113.06 | 0.85 | 3 | 1 | n/a | n/a | $650.0 | $763.06 |
| G0138 | HCPCS | facility | Iv cipaglucosidase alfa-atga | $650.0 | $763.06 | $-113.06 | 0.85 | 5 | 1 | n/a | n/a | $650.0 | $763.06 |
| Q4105 | HCPCS | facility | Integra drt or omnigraft | $34.68 | $149.14 | $-114.46 | 0.23 | 9 | 1 | n/a | n/a | $25.17 | $149.14 |
| D2722 | HCPCS | facility | Crown resin w/ noble metal | $658.92 | $774.78 | $-115.86 | 0.85 | 3 | 1 | n/a | n/a | $462.41 | $774.78 |
| 86870 | HCPCS | facility | HC AB ID, RBC, EA PANEL/TECHNIQUE | $313.59 | $429.58 | $-115.99 | 0.73 | 9 | 1 | $480.5 | $336.35 | $34.3 | $889.88 |
| 86902 | HCPCS | facility | Blood type antigen donor ea | $313.59 | $429.58 | $-115.99 | 0.73 | 10 | 1 | $512.0 | $358.4 | $6.35 | $868.35 |
| 86905 | HCPCS | facility | Blood typing rbc antigens | $313.59 | $429.58 | $-115.99 | 0.73 | 10 | 1 | $480.5 | $336.35 | $3.83 | $862.73 |
| 88184 | HCPCS | facility | Flowcytometry/ tc 1 marker | $313.59 | $429.58 | $-115.99 | 0.73 | 9 | 1 | $512.0 | $358.4 | $23.43 | $892.58 |
| 88307 | HCPCS | facility | HC LEVEL V (COMPLEX) | $313.59 | $429.58 | $-115.99 | 0.73 | 9 | 1 | $657.0 | $459.9 | $60.45 | $829.54 |
| 88344 | HCPCS | facility | HC IMMUNOHISTOCHEM; EACH MULTI STAIN | $313.59 | $429.58 | $-115.99 | 0.73 | 9 | 1 | $512.0 | $358.4 | $38.1 | $900.56 |
| 88361 | HCPCS | facility | Tumor immunohistochem/comput | $313.59 | $429.58 | $-115.99 | 0.73 | 9 | 1 | n/a | n/a | $38.1 | $892.58 |
| 88367 | HCPCS | facility | HC M/PHMTRC ALYS ISH CPTR-ASST TECH 1ST PROBE STAIN | $313.59 | $429.58 | $-115.99 | 0.73 | 9 | 1 | $1260.0 | $882.0 | $38.1 | $892.58 |
| 88368 | HCPCS | facility | HC MORPHOMETRIC ANALYSIS, IN SITU HYBRIDIZATION (QUANTITATIVE OR SEMI-QUANTITATIVE) | $313.59 | $429.58 | $-115.99 | 0.73 | 9 | 1 | $130.0 | $91.0 | $60.45 | $892.58 |
| G0416 | HCPCS | facility | HC SURG PATH, GROSS/MICRO, PROSTATE NEEDLE BIO | $313.59 | $429.58 | $-115.99 | 0.73 | 9 | 1 | $452.0 | $316.4 | $157.05 | $773.08 |
| Q4116 | HCPCS | facility | Alloderm | $31.11 | $149.14 | $-118.03 | 0.21 | 6 | 1 | n/a | n/a | $31.11 | $149.14 |
| 0812T | HCPCS | facility | Rem mlt day uroflow dev sply | $35.98 | $154.21 | $-118.23 | 0.23 | 3 | 1 | n/a | n/a | $35.98 | $154.21 |
| Q4128 | HCPCS | facility | Flexhd/allopatchhd/matrixhd | $30.7 | $149.14 | $-118.44 | 0.21 | 9 | 1 | n/a | n/a | $3.3 | $149.14 |
| 25332 | HCPCS | facility | Revise wrist joint | $3802.83 | $3921.32 | $-118.49 | 0.97 | 11 | 1 | n/a | n/a | $2868.01 | $8915.56 |
| 25447 | HCPCS | facility | Repair wrist joints | $3802.83 | $3921.32 | $-118.49 | 0.97 | 11 | 1 | n/a | n/a | $2868.01 | $8915.56 |
| 26535 | HCPCS | facility | Revise finger joint | $3802.83 | $3921.32 | $-118.49 | 0.97 | 11 | 1 | n/a | n/a | $2868.01 | $8915.56 |
| Q4165 | HCPCS | facility | Keramatrix, per square cm | $30.58 | $149.14 | $-118.56 | 0.21 | 9 | 1 | n/a | n/a | $12.31 | $149.14 |
| Q4101 | HCPCS | facility | Apligraf | $30.57 | $149.14 | $-118.57 | 0.20 | 9 | 1 | $82.0 | $57.4 | $30.3 | $149.14 |
| 92002 | HCPCS | facility | Eye exam new patient | $39.55 | $159.56 | $-120.01 | 0.25 | 7 | 1 | n/a | n/a | $39.55 | $159.56 |
| 92004 | HCPCS | facility | Eye exam new patient | $39.55 | $159.56 | $-120.01 | 0.25 | 7 | 1 | n/a | n/a | $39.55 | $159.56 |
| 25250 | HCPCS | facility | Removal of wrist prosthesis | $1805.48 | $1927.09 | $-121.61 | 0.94 | 11 | 1 | n/a | n/a | $1501.88 | $3137.19 |
| 28264 | HCPCS | facility | Release of midfoot joint | $1805.48 | $1927.09 | $-121.61 | 0.94 | 11 | 1 | n/a | n/a | $1501.88 | $5930.31 |
| 11102 | HCPCS | facility | HC TANGENTIAL BIOPSY OF SKIN; SINGLE LESION | $365.15 | $487.19 | $-122.04 | 0.75 | 10 | 1 | $421.0 | $294.7 | $106.96 | $552.31 |
| 11104 | HCPCS | facility | HC PUNCH BIOPSY OF SKIN; SINGLE LESION | $365.15 | $487.19 | $-122.04 | 0.75 | 10 | 1 | $590.0 | $413.0 | $106.96 | $552.31 |
| 88313 | HCPCS | facility | HC SPECIAL STAIN OTHER | $36.73 | $159.45 | $-122.72 | 0.23 | 9 | 1 | $601.0 | $420.7 | $23.43 | $159.45 |
| J2690 | HCPCS | facility | Procainamide hcl injection | $171.77 | $294.69 | $-122.92 | 0.58 | 7 | 1 | $41.78 | $29.25 | $81.75 | $344.53 |
| G0257 | HCPCS | facility | HC HEMODIALYSIS UNSCHEDULED ESRD | $699.55 | $822.51 | $-122.96 | 0.85 | 10 | 1 | $1009.0 | $706.3 | $496.32 | $1623.01 |
| D2782 | HCPCS | facility | Crown 3/4 cast noble metal | $649.29 | $774.78 | $-125.49 | 0.84 | 3 | 1 | n/a | n/a | $455.73 | $774.78 |
| 92012 | HCPCS | facility | Eye exam establish patient | $33.75 | $159.56 | $-125.81 | 0.21 | 7 | 1 | n/a | n/a | $33.75 | $159.56 |
| 92014 | HCPCS | facility | Eye exam&tx estab pt 1/>vst | $33.75 | $159.56 | $-125.81 | 0.21 | 7 | 1 | n/a | n/a | $33.75 | $159.56 |
| 99460 | HCPCS | facility | Init nb em per day hosp | $33.75 | $159.56 | $-125.81 | 0.21 | 7 | 1 | n/a | n/a | $33.75 | $159.56 |
| D2792 | HCPCS | facility | Crown full cast noble metal | $648.79 | $774.78 | $-125.99 | 0.84 | 3 | 1 | n/a | n/a | $455.31 | $774.78 |
| Q4117 | HCPCS | facility | Hyalomatrix | $21.835 | $149.14 | $-127.305 | 0.15 | 6 | 1 | n/a | n/a | $16.91 | $149.14 |
| 10021 | HCPCS | facility | Fna w/o image | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $504.0 | $352.8 | $122.62 | $552.31 |
| 10061 | HCPCS | facility | Drainage of skin abscess | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $125.45 | $552.31 |
| 10120 | HCPCS | facility | HC INCISION & REMOVAL FB, SQ, SIMPLE | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $209.65 | $552.31 |
| 10160 | HCPCS | facility | HC PUNC ASPIRATION-ABSC, HEMATOMA, BULLA OR CYST | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $598.0 | $418.6 | $125.45 | $552.31 |
| 11042 | HCPCS | facility | Deb subq tissue 20 sq cm/< | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $1040.0 | $728.0 | $209.65 | $552.31 |
| 11303 | HCPCS | facility | Shave skin lesion >2.0 cm | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 11308 | HCPCS | facility | Shave skin lesion >2.0 cm | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 11312 | HCPCS | facility | Shave skin lesion 1.1-2.0 cm | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 11313 | HCPCS | facility | Shave skin lesion >2.0 cm | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 11765 | HCPCS | facility | Excision of nail fold toe | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $504.0 | $352.8 | $71.54 | $552.31 |
| 12005 | HCPCS | facility | HC SIMPLE REPAIR-SCALP,NECK,AXILLAE,EXT GENITALIA,TRUNK,EXTREM; 12.6-20.0 | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $85.75 | $1805.48 |
| 12006 | HCPCS | facility | HC SIMPLE REPAIR 20.1-30.0 | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $85.75 | $4303.61 |
| 12016 | HCPCS | facility | HC SREP F/E/N/L/MM; 12.6-20.0CM | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $584.0 | $408.8 | $85.75 | $4303.61 |
| 12017 | HCPCS | facility | Rpr fe/e/en/l/m 20.1-30.0 cm | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $85.75 | $4303.61 |
| 12021 | HCPCS | facility | Closure of split wound | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $242.4 | $1151.97 |
| 12031 | HCPCS | facility | HC REPAIR, INTERMED-SCALP,AXILLAE,TRUNK,EXTREM(EXCL HANDS&FEET);2.5 CM-LESS | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $547.0 | $382.9 | $242.4 | $1151.97 |
| 12032 | HCPCS | facility | HC INTMD REPAIR, SCALP/AXILLAE/TRUNK/EXTREM; 2.6-7.5CM | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $551.0 | $385.7 | $242.4 | $1151.97 |
| 12034 | HCPCS | facility | HC REPAIR, INTERMED-SCALP,AXILLAE,TRUNK,EXTREM(EXCL HANDS & FEET) 7.6-12.5 | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $242.4 | $1151.97 |
| 12041 | HCPCS | facility | HC INTMD WND RPR N/H/F/G =<2.5CM | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $572.5 | $400.75 | $85.75 | $552.31 |
| 12042 | HCPCS | facility | HC INTMD WD RPR N/H/F/G;2.6-7.5CM | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $572.0 | $400.4 | $242.4 | $1151.97 |
| 12051 | HCPCS | facility | HC INTMD RPR,F/E/E/N/L/MM;=<2.5CM | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $547.0 | $382.9 | $242.4 | $1151.97 |
| 12052 | HCPCS | facility | HC REPAIR,INTERMED-FACE,EARS,EYELIDS,NOSE,LIPS,MUCOUS MEMBRANES; 2.6-50 | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $242.4 | $1151.97 |
| 12053 | HCPCS | facility | HC REPAIR,INTERMED-FACE,EARS,EYELIDS,NOSE,LIPS,MUCOUS MEMBRANES; 5.1-7.5 | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $242.4 | $1151.97 |
| 12054 | HCPCS | facility | HC REPAIR,INTERMED-FACE,EARS,EYELIDS,NOSE,LIPS,MUCOUS MEMBRANES; 7.6-12.5 | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $85.75 | $552.31 |
| 12055 | HCPCS | facility | HC LAYER CLOSURE OF WOUND(S) | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $732.0 | $512.4 | $242.4 | $1151.97 |
| 12056 | HCPCS | facility | Intmd rpr face/mm 20.1-30.0 | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $242.4 | $1151.97 |
| 12057 | HCPCS | facility | Intmd rpr face/mm >30.0 cm | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $242.4 | $1151.97 |
| 13131 | HCPCS | facility | Cmplx rpr f/c/c/m/n/ax/g/h/f | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $242.4 | $1151.97 |
| 15775 | HCPCS | facility | Hair trnspl 1-15 punch grfts | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $85.75 | $552.31 |
| 15776 | HCPCS | facility | Hair trnspl >15 punch grafts | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $85.75 | $552.31 |
| 15783 | HCPCS | facility | Dermabrasion suprfl any site | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 16030 | HCPCS | facility | Dress/debrid p-thick burn l | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | $590.0 | $413.0 | $106.96 | $552.31 |
| 17004 | HCPCS | facility | Destroy premal lesions 15/> | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 17106 | HCPCS | facility | Destruction of skin lesions | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 17264 | HCPCS | facility | Destruction of skin lesions | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 17266 | HCPCS | facility | Destruction of skin lesions | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 17273 | HCPCS | facility | Destruction of skin lesions | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 17274 | HCPCS | facility | Destruction of skin lesions | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 17276 | HCPCS | facility | Destruction of skin lesions | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 17283 | HCPCS | facility | Destruction of skin lesions | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 36470 | HCPCS | facility | Injection therapy of vein | $359.17 | $487.19 | $-128.02 | 0.74 | 10 | 1 | n/a | n/a | $106.96 | $915.86 |
| 36471 | HCPCS | facility | Injection therapy of veins | $359.17 | $487.19 | $-128.02 | 0.74 | 10 | 1 | n/a | n/a | $106.96 | $915.86 |
| 46900 | HCPCS | facility | Destruction anal lesion(s) | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $209.65 | $552.31 |
| 54050 | HCPCS | facility | Destruction penis lesion(s) | $359.17 | $487.19 | $-128.02 | 0.74 | 11 | 1 | n/a | n/a | $106.96 | $552.31 |
| 96913 | HCPCS | facility | Photochemotherapy uv-a or b | $359.17 | $487.19 | $-128.02 | 0.74 | 10 | 1 | n/a | n/a | $172.3 | $927.31 |
| 96922 | HCPCS | facility | Laser tx skin >500 sq cm | $359.17 | $487.19 | $-128.02 | 0.74 | 10 | 1 | n/a | n/a | $106.96 | $876.12 |
| 97606 | HCPCS | facility | HC NEG PRESS WOUND TX, >50SQ CM | $359.17 | $487.19 | $-128.02 | 0.74 | 10 | 1 | $689.0 | $482.3 | $106.96 | $896.54 |
| 97607 | HCPCS | facility | HC NEG PRESSURE WOUND TX, DISPOS MED-EQUIP, PER SESSION, SA <= 50 SQ CM | $359.17 | $487.19 | $-128.02 | 0.74 | 10 | 1 | $754.0 | $527.8 | $106.96 | $927.31 |
| 97608 | HCPCS | facility | HC NEG PRS WND TX, MPD >50 SQ CM | $359.17 | $487.19 | $-128.02 | 0.74 | 10 | 1 | $831.0 | $581.7 | $106.96 | $927.31 |
| Q4166 | HCPCS | facility | Cytal, per square centimeter | $20.85 | $149.14 | $-128.29 | 0.14 | 9 | 1 | n/a | n/a | $18.98 | $149.14 |
| 78018 | HCPCS | facility | HC THYROID METS; WHOLE BODY | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $1440.0 | $1008.0 | $300.09 | $1573.22 |
| 78072 | HCPCS | facility | Parathyrd planar w/spect&ct | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $322.04 | $1573.22 |
| 78121 | HCPCS | facility | Red cell mass multiple | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $435.79 | $1573.22 |
| 78122 | HCPCS | facility | Blood volume | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $435.79 | $1573.22 |
| 78195 | HCPCS | facility | HC LYMPHOSCINTIGRAPHY | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $1764.0 | $1234.8 | $279.95 | $1573.22 |
| 78227 | HCPCS | facility | HC HEPATOBILIARY SYS IMAG W/DRUG | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $1604.0 | $1122.8 | $314.39 | $1573.22 |
| 78266 | HCPCS | facility | Gastric emptying imag study | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $441.36 | $1573.22 |
| 78468 | HCPCS | facility | Heart infarct image (ef) | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $308.99 | $1573.22 |
| 78481 | HCPCS | facility | Heart first pass single | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $308.99 | $1573.22 |
| 78483 | HCPCS | facility | Heart first pass multiple | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $308.99 | $1573.22 |
| 78582 | HCPCS | facility | HC LUNG VENT & PERFUSION IMAGING | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $1634.0 | $1143.8 | $336.4 | $1573.22 |
| 78598 | HCPCS | facility | HC LUNG PERF & VENT DIFFERENTIAL | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $2046.0 | $1432.2 | $336.4 | $1573.22 |
| 78605 | HCPCS | facility | Brain image 4+ views | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $264.09 | $1573.22 |
| 78606 | HCPCS | facility | Brain image w/flow 4 + views | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $458.34 | $1573.22 |
| 78610 | HCPCS | facility | Brain flow imaging only | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $264.09 | $1573.22 |
| 78630 | HCPCS | facility | Cerebrospinal fluid scan | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $1461.0 | $1022.7 | $458.34 | $1573.22 |
| 78635 | HCPCS | facility | CSF ventriculography | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | n/a | n/a | $458.34 | $1573.22 |
| 78645 | HCPCS | facility | CSF shunt evaluation | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $1327.0 | $928.9 | $264.09 | $1573.22 |
| 78707 | HCPCS | facility | HC RENAL KIDNEY SCAN | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $2002.0 | $1401.4 | $332.91 | $1573.22 |
| 78708 | HCPCS | facility | HC RENAL SCAN,SINGL W/PHARM INTRV | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $2235.0 | $1564.5 | $332.91 | $1573.22 |
| 78709 | HCPCS | facility | HC RENAL SCAN,MULTI W/PHARM INTRV | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $3545.0 | $2481.5 | $332.91 | $1573.22 |
| 78803 | HCPCS | facility | HC RADIOPHARM LOC TUMOR; TOMOGRAPHIC (SPECT); SINGLE AREA, SINGLE DAY IMG | $520.91 | $650.72 | $-129.81 | 0.80 | 10 | 1 | $2094.0 | $1465.8 | $502.54 | $2800.15 |
| 78429 | HCPCS | facility | Myocrd img pet 1 std w/ct | $1581.62 | $1713.72 | $-132.1 | 0.92 | 10 | 1 | n/a | n/a | $1443.0 | $4632.43 |
| 78430 | HCPCS | facility | Myocrd img pet rst/strs w/ct | $1581.62 | $1713.72 | $-132.1 | 0.92 | 10 | 1 | n/a | n/a | $1443.0 | $4632.43 |
| 78832 | HCPCS | facility | Rp loclzj tum spect w/ct 2 | $1581.62 | $1713.72 | $-132.1 | 0.92 | 10 | 1 | n/a | n/a | $502.54 | $4632.43 |
| 0924T | HCPCS | facility | Rpos prv ccm-d trnsvns eltrd | $618.26 | $751.79 | $-133.53 | 0.82 | 3 | 1 | n/a | n/a | $618.26 | $751.79 |
| J3240 | HCPCS | facility | Thyrotropin injection | $1982.49 | $2116.32 | $-133.83 | 0.94 | 13 | 1 | $3898.725 | $2729.105 | $1776.21 | $2125.64 |
| 58301 | HCPCS | facility | HC REMOVE INTRAUTERINE DEVICE | $230.7 | $365.2 | $-134.5 | 0.63 | 11 | 1 | $445.0 | $311.5 | $118.56 | $552.31 |
| Q4115 | HCPCS | facility | Alloskin | $14.48 | $149.14 | $-134.66 | 0.10 | 9 | 1 | n/a | n/a | $13.58 | $149.14 |
| D0120 | HCPCS | facility | Periodic oral evaluation | $24.84 | $159.56 | $-134.72 | 0.16 | 2 | 1 | n/a | n/a | $24.84 | $159.56 |
| A9553 | HCPCS | facility | Cr51 chromate | $1782.74 | $1917.96 | $-135.22 | 0.93 | 2 | 1 | n/a | n/a | $1782.74 | $1917.96 |
| 90396 | HCPCS | facility | Varicella-Zoster Immune Glob 125 UNIT/1.2ML solution 1.2 mL Vial | $2226.22 | $2361.82 | $-135.6 | 0.94 | 13 | 1 | $18590.62 | $13013.435 | $2056.72 | $2600.06 |
| 0881T | HCPCS | facility | Cryotherapy oral cavity | $399.04 | $535.38 | $-136.34 | 0.75 | 3 | 1 | n/a | n/a | $399.04 | $535.38 |
| Q4103 | HCPCS | facility | Oasis burn matrix | $12.38 | $149.14 | $-136.76 | 0.08 | 9 | 1 | n/a | n/a | $9.69 | $149.14 |
| 11980 | HCPCS | facility | Implant hormone pellet(s) | $398.14 | $535.38 | $-137.24 | 0.74 | 11 | 1 | n/a | n/a | $49.64 | $552.31 |
| 11982 | HCPCS | facility | HC REMOVAL NON-BIODEGRADABLE DRUG DELIVERY IMPLANT | $398.14 | $535.38 | $-137.24 | 0.74 | 11 | 1 | $699.0 | $489.3 | $49.64 | $552.31 |
| 11983 | HCPCS | facility | Remove/insert drug implant | $398.14 | $535.38 | $-137.24 | 0.74 | 11 | 1 | n/a | n/a | $49.64 | $552.31 |
| 36425 | HCPCS | facility | Vein access cutdown > 1 yr | $398.14 | $535.38 | $-137.24 | 0.74 | 10 | 1 | n/a | n/a | $23.43 | $796.77 |
| 36680 | HCPCS | facility | HC PLACE NEEDL INTRAOSSEOUS INFUS | $398.14 | $535.38 | $-137.24 | 0.74 | 11 | 1 | $597.0 | $417.9 | $65.08 | $552.31 |
| 43752 | HCPCS | facility | HC NASAL/OROGASTRIC W/STE | $398.14 | $535.38 | $-137.24 | 0.74 | 11 | 1 | $574.0 | $401.8 | $114.26 | $552.31 |
| 65210 | HCPCS | facility | HC REMOVE FOR'N BODY, EYE, EMB | $398.14 | $535.38 | $-137.24 | 0.74 | 11 | 1 | $597.0 | $417.9 | $74.07 | $552.31 |
| 65220 | HCPCS | facility | HC REMOVE FB EYE | $398.14 | $535.38 | $-137.24 | 0.74 | 11 | 1 | $597.0 | $417.9 | $74.07 | $552.31 |
| 65430 | HCPCS | facility | Corneal smear | $398.14 | $535.38 | $-137.24 | 0.74 | 11 | 1 | n/a | n/a | $74.07 | $552.31 |
| 92284 | HCPCS | facility | Dark adaptation eye exam | $398.14 | $535.38 | $-137.24 | 0.74 | 10 | 1 | n/a | n/a | $48.41 | $796.77 |
| 92311 | HCPCS | facility | Contact lens fitting | $398.14 | $535.38 | $-137.24 | 0.74 | 10 | 1 | n/a | n/a | $74.07 | $796.77 |
| 93024 | HCPCS | facility | Cardiac drug stress test | $398.14 | $535.38 | $-137.24 | 0.74 | 10 | 1 | n/a | n/a | $176.82 | $796.77 |
| 94014 | HCPCS | facility | Patient recorded spirometry | $398.14 | $535.38 | $-137.24 | 0.74 | 10 | 1 | n/a | n/a | $62.87 | $796.77 |
| 95180 | HCPCS | facility | Rapid desensitization | $398.14 | $535.38 | $-137.24 | 0.74 | 10 | 1 | n/a | n/a | $95.18 | $796.77 |
| G0516 | HCPCS | facility | Insert drug del implant, >4 | $398.14 | $535.38 | $-137.24 | 0.74 | 9 | 1 | n/a | n/a | $329.99 | $847.77 |
| G0517 | HCPCS | facility | Remove drug implant | $398.14 | $535.38 | $-137.24 | 0.74 | 9 | 1 | n/a | n/a | $329.99 | $847.77 |
| G0518 | HCPCS | facility | Remove w insert drug implant | $398.14 | $535.38 | $-137.24 | 0.74 | 9 | 1 | n/a | n/a | $329.99 | $847.77 |
| Q4102 | HCPCS | facility | Oasis wound matrix | $11.79 | $149.14 | $-137.35 | 0.08 | 9 | 1 | n/a | n/a | $9.56 | $149.14 |
| D2791 | HCPCS | facility | Crown full cast base metal | $635.99 | $774.78 | $-138.79 | 0.82 | 3 | 1 | n/a | n/a | $447.08 | $774.78 |
| Q4124 | HCPCS | facility | Oasis tri-layer wound matrix | $9.16 | $149.14 | $-139.98 | 0.06 | 9 | 1 | n/a | n/a | $2.48 | $149.14 |
| 78491 | HCPCS | facility | Heart image (pet) single | $1573.01 | $1713.72 | $-140.71 | 0.92 | 10 | 1 | n/a | n/a | $1056.12 | $4632.43 |
| 78492 | HCPCS | facility | Heart image (pet) multiple | $1573.01 | $1713.72 | $-140.71 | 0.92 | 10 | 1 | n/a | n/a | $1056.12 | $4632.43 |
| 78608 | HCPCS | facility | Brain imaging (PET) | $1573.01 | $1713.72 | $-140.71 | 0.92 | 10 | 1 | n/a | n/a | $1056.12 | $4632.43 |
| 78812 | HCPCS | facility | Pet image skull-thigh | $1573.01 | $1713.72 | $-140.71 | 0.92 | 10 | 1 | n/a | n/a | $1056.12 | $4632.43 |
| 78813 | HCPCS | facility | Pet image full body | $1573.01 | $1713.72 | $-140.71 | 0.92 | 10 | 1 | n/a | n/a | $1056.12 | $4632.43 |
| 78814 | HCPCS | facility | Pet image w/ct lmtd | $1573.01 | $1713.72 | $-140.71 | 0.92 | 10 | 1 | n/a | n/a | $1056.12 | $4632.43 |
| 78815 | HCPCS | facility | Pet image w/ct skull-thigh | $1573.01 | $1713.72 | $-140.71 | 0.92 | 10 | 1 | n/a | n/a | $1056.12 | $4632.43 |
| 78816 | HCPCS | facility | Pet image w/ct full body | $1573.01 | $1713.72 | $-140.71 | 0.92 | 10 | 1 | n/a | n/a | $1056.12 | $4632.43 |
| Q4111 | HCPCS | facility | Gammagraft | $7.14 | $149.14 | $-142.0 | 0.05 | 9 | 1 | n/a | n/a | $7.02 | $149.14 |
| 66850 | HCPCS | facility | Removal of lens material | $2623.78 | $2765.81 | $-142.03 | 0.95 | 11 | 1 | n/a | n/a | $2095.45 | $8915.56 |
| 66920 | HCPCS | facility | Extraction of lens | $2623.78 | $2765.81 | $-142.03 | 0.95 | 11 | 1 | n/a | n/a | $2095.45 | $6735.22 |
| G0438 | HCPCS | facility | PPPS, initial visit | $36.25 | $178.93 | $-142.68 | 0.20 | 7 | 1 | n/a | n/a | $36.25 | $670.99 |
| 88325 | HCPCS | facility | Comprehensive review of data | $60.45 | $204.18 | $-143.73 | 0.30 | 9 | 1 | n/a | n/a | $58.3 | $312.02 |
| 78075 | HCPCS | facility | Adrenal cortex & medulla img | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | n/a | n/a | $955.6 | $4149.7 |
| 78110 | HCPCS | facility | Plasma volume single | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | n/a | n/a | $435.79 | $4078.96 |
| 78111 | HCPCS | facility | Plasma volume multiple | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | n/a | n/a | $435.79 | $4078.96 |
| 78451 | HCPCS | facility | HC MYOCARDIAL IMAGE SPECT/SINGLE | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | $3446.0 | $2412.2 | $679.68 | $4149.7 |
| 78452 | HCPCS | facility | HC MYOCARDIAL IMAGE SPECT/MULTI | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | $5873.0 | $4111.1 | $679.68 | $4149.7 |
| 78453 | HCPCS | facility | Ht muscle image planar sing | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | n/a | n/a | $679.68 | $4149.7 |
| 78454 | HCPCS | facility | Ht musc image planar mult | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | n/a | n/a | $679.68 | $4149.7 |
| 78456 | HCPCS | facility | Acute venous thrombus image | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | n/a | n/a | $330.97 | $4137.06 |
| 78459 | HCPCS | facility | Heart muscle imaging (PET) | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | n/a | n/a | $1056.12 | $4149.7 |
| 78650 | HCPCS | facility | CSF leakage imaging | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | n/a | n/a | $458.34 | $4110.34 |
| 78811 | HCPCS | facility | Pet image ltd area | $1405.87 | $1551.57 | $-145.7 | 0.91 | 10 | 1 | n/a | n/a | $1056.12 | $4149.7 |
| Q4367 | HCPCS | facility | Amniocore sl, per sq cm | $3.44 | $149.14 | $-145.7 | 0.02 | 3 | 1 | n/a | n/a | $3.44 | $149.14 |
| 62302 | HCPCS | facility | HC MYELOGRAPHY VIA LUMBAR INJ, W/S&I; CERVICAL | $791.06 | $939.49 | $-148.43 | 0.84 | 11 | 1 | $1764.0 | $1234.8 | $257.66 | $1805.48 |
| 62303 | HCPCS | facility | HC MYELOGRAPHY VIA LUMBAR INJ, W/S&I; THORACIC | $791.06 | $939.49 | $-148.43 | 0.84 | 11 | 1 | $1868.0 | $1307.6 | $257.66 | $1805.48 |
| 62304 | HCPCS | facility | HC MYELOGRAPHY VIA LUMBAR INJ, W/S&I; LUMBOSACRAL | $791.06 | $939.49 | $-148.43 | 0.84 | 11 | 1 | $1764.0 | $1234.8 | $257.66 | $1805.48 |
| 62305 | HCPCS | facility | HC MYELOGRAPHY VIA LUMBAR INJECTION, INCL RADIO S&I, 2 OR MORE REGIONS | $791.06 | $939.49 | $-148.43 | 0.84 | 11 | 1 | $1645.0 | $1151.5 | $257.66 | $1805.48 |
| 70015 | HCPCS | facility | Contrast x-ray of brain | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | n/a | n/a | $507.6 | $2252.65 |
| 71551 | HCPCS | facility | HC MRI; CHEST W/CONTRAST | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | $3058.0 | $2140.6 | $454.56 | $2273.32 |
| 72240 | HCPCS | facility | HC MYELOGRAM CERVICAL SPINE | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | $2175.0 | $1522.5 | $507.6 | $2284.46 |
| 72255 | HCPCS | facility | HC MYELOGRAM DORSAL SPINE | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | $1760.0 | $1232.0 | $507.6 | $2284.46 |
| 72265 | HCPCS | facility | HC MYELOGRAM LUMBAR SPINE | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | $2466.0 | $1726.2 | $507.6 | $2284.46 |
| 72270 | HCPCS | facility | HC MYELOGRAPHY MULT | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | $2175.0 | $1522.5 | $507.6 | $2284.46 |
| 73222 | HCPCS | facility | HC MRI, UPPER EXTRM, JOINTS, W/ CONTRAST | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | $3220.0 | $2254.0 | $454.56 | $2273.32 |
| 73722 | HCPCS | facility | HC MRI, LOWER EXTRM, JOINTS, W/ CONTRAST | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | $3541.0 | $2478.7 | $454.56 | $2273.32 |
| 75563 | HCPCS | facility | Card mri w/stress img & dye | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | n/a | n/a | $549.47 | $2304.12 |
| C8922 | HCPCS | facility | Tte w or w/o fol w/cont, f/u | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | n/a | n/a | $433.93 | $2304.12 |
| C8928 | HCPCS | facility | Tte w or w/o fol w/con,stres | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | n/a | n/a | $578.36 | $2304.12 |
| C8929 | HCPCS | facility | TTE w or wo fol wcon,Doppler | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | n/a | n/a | $578.36 | $2298.4 |
| C8930 | HCPCS | facility | TTE w or w/o contr, cont ECG | $791.06 | $939.49 | $-148.43 | 0.84 | 10 | 1 | n/a | n/a | $578.36 | $2304.12 |
| 75572 | HCPCS | facility | Ct hrt w/3d image | $267.2 | $418.11 | $-150.91 | 0.64 | 10 | 1 | n/a | n/a | $230.7 | $562.93 |
| 75573 | HCPCS | facility | Ct hrt w/3d image congen | $267.2 | $418.11 | $-150.91 | 0.64 | 10 | 1 | n/a | n/a | $230.7 | $562.93 |
| 75574 | HCPCS | facility | Ct angio hrt w/3d image | $267.2 | $418.11 | $-150.91 | 0.64 | 10 | 1 | $1013.0 | $709.1 | $230.7 | $562.93 |
| 94002 | HCPCS | facility | HC VENTILATOR, INP/OBSERV, 1ST DAY | $583.18 | $740.39 | $-157.21 | 0.79 | 10 | 1 | $831.0 | $581.7 | $247.41 | $1363.88 |
| 94003 | HCPCS | facility | HC VENT, INP/OBSERV, EA SUBSEQ DAY | $583.18 | $740.39 | $-157.21 | 0.79 | 10 | 1 | $831.0 | $581.7 | $247.41 | $1363.88 |
| 78830 | HCPCS | facility | Rp loclzj tum spect w/ct 1 | $1394.25 | $1551.57 | $-157.32 | 0.90 | 10 | 1 | n/a | n/a | $502.54 | $4149.7 |
| 78831 | HCPCS | facility | Rp loclzj tum spect 2 areas | $1394.25 | $1551.57 | $-157.32 | 0.90 | 10 | 1 | n/a | n/a | $502.54 | $4149.7 |
| 92588 | HCPCS | facility | Evoked auditory tst complete | $288.53 | $447.21 | $-158.68 | 0.65 | 10 | 1 | n/a | n/a | $65.29 | $708.3 |
| 94060 | HCPCS | facility | Evaluation of wheezing | $288.53 | $447.21 | $-158.68 | 0.65 | 10 | 1 | $1075.0 | $752.5 | $100.94 | $721.29 |
| 94070 | HCPCS | facility | Evaluation of wheezing | $288.53 | $447.21 | $-158.68 | 0.65 | 10 | 1 | $1377.0 | $963.9 | $179.86 | $721.29 |
| 94621 | HCPCS | facility | Pulm stress test/complex | $288.53 | $447.21 | $-158.68 | 0.65 | 10 | 1 | n/a | n/a | $179.86 | $721.29 |
| 94681 | HCPCS | facility | Exhaled air analysis o2/co2 | $288.53 | $447.21 | $-158.68 | 0.65 | 10 | 1 | n/a | n/a | $179.86 | $721.29 |
| 94726 | HCPCS | facility | HC PULM FUNC TEST,PLETHYSMOGRAPHY | $288.53 | $447.21 | $-158.68 | 0.65 | 10 | 1 | $442.0 | $309.4 | $45.06 | $711.49 |
| 95910 | HCPCS | facility | HC NERVE CONDUCTION, 7-8 STUDIES | $288.53 | $447.21 | $-158.68 | 0.65 | 10 | 1 | $584.0 | $408.8 | $43.11 | $721.29 |
| 93593 | HCPCS | facility | R hrt cath chd nml nt cnj | $3725.51 | $3885.28 | $-159.77 | 0.96 | 10 | 1 | n/a | n/a | $2961.52 | $4303.61 |
| 93594 | HCPCS | facility | R hrt cath chd abnl nt cnj | $3725.51 | $3885.28 | $-159.77 | 0.96 | 10 | 1 | n/a | n/a | $2961.52 | $4303.61 |
| 93595 | HCPCS | facility | L hrt cath chd nm/abn nt cnj | $3725.51 | $3885.28 | $-159.77 | 0.96 | 10 | 1 | n/a | n/a | $2961.52 | $4303.61 |
| 91111 | HCPCS | facility | Esophageal Capsule Endoscopy | $926.78 | $1086.97 | $-160.19 | 0.85 | 10 | 1 | n/a | n/a | $870.88 | $2126.75 |
| 27232 | HCPCS | facility | Treat thigh fracture | $1766.605 | $1927.09 | $-160.485 | 0.92 | 8 | 1 | n/a | n/a | $806.69 | $1927.09 |
| 64451 | HCPCS | facility | HC INJECT, ANESTH AGENT/STEROID; NERVES INNERVATING SACROILIAC JOINT, W/IG | $685.02 | $845.96 | $-160.94 | 0.81 | 9 | 1 | $3181.0 | $2226.7 | $624.98 | $1660.06 |
| 64454 | HCPCS | facility | HC INJECT, ANESTH AGENT/STEROID; GENICULAR NERVE BRANCHES, IMAG GUID | $685.02 | $845.96 | $-160.94 | 0.81 | 9 | 1 | $3181.0 | $2226.7 | $624.98 | $1660.06 |
| 61070 | HCPCS | facility | Brain canal shunt procedure | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1317.0 | $921.9 | $439.63 | $1151.97 |
| 62270 | HCPCS | facility | HC LUMBAR PUNCTURE | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1001.0 | $700.7 | $291.74 | $1805.48 |
| 62272 | HCPCS | facility | Drain cerebro spinal fluid | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $985.0 | $689.5 | $291.74 | $1805.48 |
| 64418 | HCPCS | facility | HC INJ ANEST; SUPRASCAPULAR NERVE | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1099.0 | $769.3 | $291.74 | $1151.97 |
| 64420 | HCPCS | facility | HC NERVE BLOCK INJ,INTERCOS SINGL | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $2136.0 | $1495.2 | $291.74 | $1151.97 |
| 64425 | HCPCS | facility | HC NERV BLK INJ,ILIO-INGUIN/HYPOG | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1572.0 | $1100.4 | $291.74 | $1151.97 |
| 64435 | HCPCS | facility | HC INJECTION, ANESTHETIC AGENT; PARACERVICAL NERVE | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1109.0 | $776.3 | $291.74 | $1151.97 |
| 64447 | HCPCS | facility | HC INJ ANES; FEMORAL NERVE, SINGL | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1236.0 | $865.2 | $291.74 | $1151.97 |
| 64450 | HCPCS | facility | HC INJ ANESTH; OTHER PERIPH NERVE | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1815.0 | $1270.5 | $291.74 | $1151.97 |
| 64642 | HCPCS | facility | Chemodenerv 1 extremity 1-4 | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1236.0 | $865.2 | $291.74 | $1151.97 |
| 64644 | HCPCS | facility | Chemodenerv 1 extrem 5/> mus | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1485.0 | $1039.5 | $291.74 | $1151.97 |
| 64646 | HCPCS | facility | Chemodenerv trunk musc 1-5 | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1236.0 | $865.2 | $291.74 | $1151.97 |
| 64647 | HCPCS | facility | Chemodenerv trunk musc 6/> | $684.77 | $845.96 | $-161.19 | 0.81 | 11 | 1 | $1236.0 | $865.2 | $291.74 | $1151.97 |
| 0723T | HCPCS | facility | Qmrcp w/o dx mri sm anat ses | $950.0 | $1114.97 | $-164.97 | 0.85 | 3 | 1 | n/a | n/a | $950.0 | $1114.97 |
| 0724T | HCPCS | facility | Qmrcp w/dx mri same anatomy | $950.0 | $1114.97 | $-164.97 | 0.85 | 3 | 1 | n/a | n/a | $950.0 | $1114.97 |
| 0889T | HCPCS | facility | Prsnlz trgt dvl arhfcmrigtbs | $950.0 | $1114.97 | $-164.97 | 0.85 | 5 | 1 | n/a | n/a | $950.0 | $1114.97 |
| 90846 | HCPCS | facility | Family psytx w/o pt 50 min | $47.72 | $212.72 | $-165.0 | 0.22 | 7 | 1 | n/a | n/a | $47.72 | $212.72 |
| 90847 | HCPCS | facility | Family psytx w/pt 50 min | $47.72 | $212.72 | $-165.0 | 0.22 | 7 | 1 | n/a | n/a | $47.72 | $212.72 |
| 46608 | HCPCS | facility | Anoscopy remove for body | $949.17 | $1114.51 | $-165.34 | 0.85 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 46611 | HCPCS | facility | Anoscopy | $949.17 | $1114.51 | $-165.34 | 0.85 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 96422 | HCPCS | facility | Chemo ia infusion up to 1 hr | $230.5 | $395.85 | $-165.35 | 0.58 | 10 | 1 | n/a | n/a | $214.05 | $531.94 |
| D3330 | HCPCS | facility | End thxpy, molar | $609.34 | $774.78 | $-165.44 | 0.79 | 3 | 1 | n/a | n/a | $428.02 | $774.78 |
| 90791 | HCPCS | facility | Psych diagnostic evaluation | $43.0 | $212.72 | $-169.72 | 0.20 | 7 | 1 | n/a | n/a | $43.0 | $212.72 |
| 90792 | HCPCS | facility | HC PSYCH DIAGNOSTIC EVALULATION W/MEDICAL SERVICES | $43.0 | $212.72 | $-169.72 | 0.20 | 7 | 1 | $352.0 | $246.4 | $43.0 | $212.72 |
| 90834 | HCPCS | facility | Psytx w pt 45 minutes | $43.0 | $212.72 | $-169.72 | 0.20 | 7 | 1 | n/a | n/a | $43.0 | $212.72 |
| 90837 | HCPCS | facility | Psytx w pt 60 minutes | $43.0 | $212.72 | $-169.72 | 0.20 | 7 | 1 | n/a | n/a | $43.0 | $212.72 |
| 90839 | HCPCS | facility | Psytx crisis initial 60 min | $43.0 | $212.72 | $-169.72 | 0.20 | 7 | 1 | n/a | n/a | $43.0 | $212.72 |
| 90845 | HCPCS | facility | Psychoanalysis | $43.0 | $212.72 | $-169.72 | 0.20 | 7 | 1 | n/a | n/a | $43.0 | $212.72 |
| 90865 | HCPCS | facility | Narcosynthesis | $43.0 | $212.72 | $-169.72 | 0.20 | 7 | 1 | n/a | n/a | $43.0 | $212.72 |
| G2086 | HCPCS | facility | Off base opioid tx 70min | $43.0 | $212.72 | $-169.72 | 0.20 | 7 | 1 | n/a | n/a | $43.0 | $212.72 |
| G2087 | HCPCS | facility | Off base opioid tx, 60 m | $43.0 | $212.72 | $-169.72 | 0.20 | 7 | 1 | n/a | n/a | $43.0 | $212.72 |
| A0430 | HCPCS | facility | Fixed wing air transport | $4065.71 | $4236.19 | $-170.48 | 0.96 | 8 | 5 | n/a | n/a | $3152.35 | $6914.0 |
| 78431 | HCPCS | facility | Myocrd img pet rst&strs ct | $2466.7 | $2639.93 | $-173.23 | 0.93 | 10 | 1 | n/a | n/a | $2250.0 | $7541.7 |
| 97155 | HCPCS | facility | Adapt behavior tx phys/qhp | $38.17 | $212.72 | $-174.55 | 0.18 | 10 | 1 | n/a | n/a | $33.38 | $212.72 |
| J2507 | HCPCS | facility | Pegloticase injection | $3482.15 | $3660.83 | $-178.68 | 0.95 | 13 | 1 | n/a | n/a | $2771.29 | $3768.81 |
| 90832 | HCPCS | facility | Psytx w pt 30 minutes | $33.93 | $212.72 | $-178.79 | 0.16 | 7 | 1 | n/a | n/a | $33.93 | $212.72 |
| 96158 | HCPCS | facility | Hlth bhv ivntj indiv 1st 30 | $33.93 | $212.72 | $-178.79 | 0.16 | 7 | 1 | n/a | n/a | $33.93 | $212.72 |
| 50389 | HCPCS | facility | HC REMOVAL OF NEPHROSOTMY TUBE, REQUIRING FLUORO GUIDANCE | $656.46 | $835.67 | $-179.21 | 0.79 | 11 | 1 | $1346.0 | $942.2 | $509.76 | $1805.48 |
| 50572 | HCPCS | facility | Kidney endoscopy | $656.46 | $835.67 | $-179.21 | 0.79 | 11 | 1 | n/a | n/a | $509.76 | $1805.48 |
| 52000 | HCPCS | facility | Cystoscopy | $656.46 | $835.67 | $-179.21 | 0.79 | 11 | 1 | $2046.0 | $1432.2 | $509.76 | $1805.48 |
| 52010 | HCPCS | facility | Cystoscopy & duct catheter | $656.46 | $835.67 | $-179.21 | 0.79 | 11 | 1 | n/a | n/a | $509.76 | $4303.61 |
| 96409 | HCPCS | facility | Chemo iv push sngl drug | $214.05 | $395.85 | $-181.8 | 0.54 | 10 | 1 | $290.0 | $203.0 | $146.24 | $531.94 |
| 96542 | HCPCS | facility | Chemotherapy injection | $214.05 | $395.85 | $-181.8 | 0.54 | 10 | 1 | n/a | n/a | $74.69 | $531.94 |
| 61020 | HCPCS | facility | Remove brain cavity fluid | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | n/a | n/a | $565.75 | $1805.48 |
| 62264 | HCPCS | facility | Epidural lysis on single day | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | n/a | n/a | $815.89 | $1805.48 |
| 62268 | HCPCS | facility | Drain spinal cord cyst | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | n/a | n/a | $565.75 | $1805.48 |
| 62280 | HCPCS | facility | Treat spinal cord lesion | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | n/a | n/a | $565.75 | $1805.48 |
| 62294 | HCPCS | facility | Injection into spinal artery | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | n/a | n/a | $565.75 | $6735.22 |
| 64415 | HCPCS | facility | HC NERVE BLOCK INJ,BRACHAIL PLEX | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $2180.0 | $1526.0 | $291.74 | $1805.48 |
| 64416 | HCPCS | facility | N block cont infuse b plex | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | n/a | n/a | $565.75 | $1805.48 |
| 64417 | HCPCS | facility | HC NERVE BLOCK, AXILLARY | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $1796.0 | $1257.2 | $291.74 | $1151.97 |
| 64421 | HCPCS | facility | HC NERVE BLOCK INJ,INTERCOS MULTI | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $2627.0 | $1838.9 | $565.75 | $1805.48 |
| 64430 | HCPCS | facility | HC INJ ANESTHETIC; PUDENDAL NERVE | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $3448.0 | $2413.6 | $565.75 | $1805.48 |
| 64446 | HCPCS | facility | N blk inj sciatic cont inf | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | n/a | n/a | $565.75 | $1805.48 |
| 64449 | HCPCS | facility | N block inj lumbar plexus | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | n/a | n/a | $565.75 | $1805.48 |
| 64479 | HCPCS | facility | HC INJ,TRANSF EPID;CERV/THOR, SGL | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $1763.0 | $1234.1 | $565.75 | $1805.48 |
| 64483 | HCPCS | facility | HC INJ, TRANSF EPID; LUMB/SAC,SGL | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $2296.0 | $1607.2 | $565.75 | $1805.48 |
| 64490 | HCPCS | facility | HC INJ PARAV FAC JNT, C/T, 1 LEV | $874.64 | $1059.99 | $-185.35 | 0.83 | 10 | 1 | $2594.0 | $1815.8 | $565.75 | $2193.68 |
| 64493 | HCPCS | facility | HC INJ PARAV FAC JNT, L/S, 1 LEV | $874.64 | $1059.99 | $-185.35 | 0.83 | 10 | 1 | $2594.0 | $1815.8 | $565.75 | $2193.68 |
| 64510 | HCPCS | facility | HC NERVE BLOCK,STELLATE GANGLION | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $2315.0 | $1620.5 | $565.75 | $1805.48 |
| 64517 | HCPCS | facility | HC INB INJ; SUPER HYPOGASTR PLEXU | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $2933.0 | $2053.1 | $565.75 | $4303.61 |
| 64520 | HCPCS | facility | HC NERVE BLOCK, LUMBAR/THORACIC | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $2315.0 | $1620.5 | $565.75 | $1805.48 |
| 64530 | HCPCS | facility | HC INJECT, ANESTH; CELIAC PLEXUS | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $2315.0 | $1620.5 | $565.75 | $1805.48 |
| 64630 | HCPCS | facility | HC DESTR W/NEUROLYT; PUDENDAL NRV | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $2341.0 | $1638.7 | $565.75 | $4303.61 |
| 64640 | HCPCS | facility | HC INJ TX, OTHER PERIPHERAL NERVE | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $2315.0 | $1620.5 | $565.75 | $1805.48 |
| 64681 | HCPCS | facility | HC DESTRUCT NEURO AGENT, W OR W/O RADIO MONITOR; SUPER HYPOGASTRIC PLEXUS | $874.64 | $1059.99 | $-185.35 | 0.83 | 11 | 1 | $3762.0 | $2633.4 | $815.89 | $4303.61 |
| 10080 | HCPCS | facility | Drainage of pilonidal cyst | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $1024.0 | $716.8 | $125.45 | $1805.48 |
| 11011 | HCPCS | facility | Debride skin musc at fx site | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $564.0 | $394.8 | $336.38 | $1151.97 |
| 11400 | HCPCS | facility | Exc tr-ext b9+marg 0.5 cm< | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $961.0 | $672.7 | $336.38 | $1151.97 |
| 11402 | HCPCS | facility | Exc tr-ext b9+marg 1.1-2 cm | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $961.0 | $672.7 | $336.38 | $1151.97 |
| 11440 | HCPCS | facility | Exc face-mm b9+marg 0.5 cm/< | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $961.0 | $672.7 | $336.38 | $1151.97 |
| 11441 | HCPCS | facility | Exc face-mm b9+marg 0.6-1 cm | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $1403.0 | $982.1 | $336.38 | $1151.97 |
| 11601 | HCPCS | facility | Exc tr-ext mal+marg 0.6-1 cm | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $961.0 | $672.7 | $336.38 | $1151.97 |
| 11755 | HCPCS | facility | Biopsy nail unit | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | n/a | n/a | $336.38 | $1151.97 |
| 11976 | HCPCS | facility | Remove contraceptive capsule | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | n/a | n/a | $336.38 | $1151.97 |
| 19000 | HCPCS | facility | Drainage of breast lesion | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $1008.5 | $705.95 | $345.52 | $1151.97 |
| 20615 | HCPCS | facility | Treatment of bone cyst | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | n/a | n/a | $345.52 | $1151.97 |
| 21725 | HCPCS | facility | Revision of neck muscle | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | n/a | n/a | $125.45 | $6735.22 |
| 55000 | HCPCS | facility | Drainage of hydrocele | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | n/a | n/a | $345.52 | $1151.97 |
| 60100 | HCPCS | facility | Biopsy of thyroid | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $2266.0 | $1586.2 | $345.52 | $1151.97 |
| 60300 | HCPCS | facility | Aspir/inj thyroid cyst | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $1438.0 | $1006.6 | $345.52 | $1151.97 |
| 62267 | HCPCS | facility | HC PERCUTANEOUS ASPIRATION FOR DIAGNOSTIC PURPOSES | $662.51 | $848.66 | $-186.15 | 0.78 | 11 | 1 | $1300.0 | $910.0 | $345.52 | $1151.97 |
| 76978 | HCPCS | facility | HC ULTRASOUND TRGT DYNAMIC MICROBUBBLE; 1ST LESION | $230.7 | $418.11 | $-187.41 | 0.55 | 10 | 1 | $428.0 | $299.6 | $201.74 | $562.93 |
| 90849 | HCPCS | facility | Multiple family group psytx | $24.14 | $212.72 | $-188.58 | 0.11 | 7 | 1 | n/a | n/a | $24.14 | $212.72 |
| 92953 | HCPCS | facility | HC TEMPORARY EXTERNAL PACING | $602.07 | $792.11 | $-190.04 | 0.76 | 10 | 1 | $845.0 | $591.5 | $160.83 | $1503.5 |
| 92960 | HCPCS | facility | Cardioversion electric ext | $602.07 | $792.11 | $-190.04 | 0.76 | 10 | 1 | $1741.0 | $1218.7 | $399.69 | $1514.28 |
| 92961 | HCPCS | facility | Cardioversion electric int | $602.07 | $792.11 | $-190.04 | 0.76 | 10 | 1 | n/a | n/a | $399.69 | $1514.28 |
| 50396 | HCPCS | facility | Measure kidney pressure | $642.96 | $835.67 | $-192.71 | 0.77 | 11 | 1 | n/a | n/a | $152.75 | $1151.97 |
| 50430 | HCPCS | facility | HC INJ NEPH/UGRAM,W/GUID & SI,NEW | $642.96 | $835.67 | $-192.71 | 0.77 | 9 | 1 | $1320.0 | $924.0 | $209.55 | $1578.34 |
| 50431 | HCPCS | facility | HC INJ NEPH/UGRAM,W/GUID&SI,EXIST | $642.96 | $835.67 | $-192.71 | 0.77 | 9 | 1 | $1320.0 | $924.0 | $209.55 | $1578.34 |
| 51710 | HCPCS | facility | Change of bladder tube | $642.96 | $835.67 | $-192.71 | 0.77 | 10 | 1 | $1346.0 | $942.2 | $439.63 | $1578.34 |
| 51727 | HCPCS | facility | Cystometrogram w/up | $642.96 | $835.67 | $-192.71 | 0.77 | 10 | 1 | n/a | n/a | $232.32 | $1578.34 |
| 51728 | HCPCS | facility | Cystometrogram w/vp | $642.96 | $835.67 | $-192.71 | 0.77 | 10 | 1 | n/a | n/a | $232.32 | $1578.34 |
| 51729 | HCPCS | facility | Cystometrogram w/vp&up | $642.96 | $835.67 | $-192.71 | 0.77 | 10 | 1 | n/a | n/a | $232.32 | $1578.34 |
| A0431 | HCPCS | facility | Rotary wing air transport | $4727.0 | $4925.22 | $-198.22 | 0.96 | 8 | 5 | n/a | n/a | $3665.08 | $8038.57 |
| 20694 | HCPCS | facility | Remove bone fixation device | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | n/a | n/a | $1501.88 | $1996.23 |
| 26991 | HCPCS | facility | Drainage of pelvis bursa | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | n/a | n/a | $1501.88 | $1996.23 |
| 27605 | HCPCS | facility | HC TENOTOMY,PERC,ACHILLES TENDON | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | $7108.0 | $4975.6 | $1501.88 | $2050.64 |
| 28010 | HCPCS | facility | HC TENOTOMY, PERC, TOE, SINGLE TENDON | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | $7108.0 | $4975.6 | $1501.88 | $2050.64 |
| 28108 | HCPCS | facility | Removal of toe lesions | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | n/a | n/a | $1501.88 | $2050.64 |
| 28220 | HCPCS | facility | Release of foot tendon | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | n/a | n/a | $1501.88 | $2050.64 |
| 28230 | HCPCS | facility | Incision of foot tendon(s) | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | n/a | n/a | $1501.88 | $2050.64 |
| 28232 | HCPCS | facility | Incision of toe tendon | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | n/a | n/a | $1501.88 | $2050.64 |
| 28234 | HCPCS | facility | Incision of foot tendon | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | n/a | n/a | $1501.88 | $2050.64 |
| 28272 | HCPCS | facility | Release of toe joint each | $1727.73 | $1927.09 | $-199.36 | 0.90 | 11 | 1 | n/a | n/a | $1501.88 | $2050.64 |
| 36002 | HCPCS | facility | HC INJ PERC EXTR ANEURYSM | $552.31 | $751.79 | $-199.48 | 0.73 | 11 | 1 | $855.0 | $598.5 | $154.74 | $751.79 |
| 37799 | HCPCS | facility | HC UNLISTED PROCEDURE, VASCULAR SURGERY | $552.31 | $751.79 | $-199.48 | 0.73 | 5 | 1 | $1527.0 | $1068.9 | $528.52 | $751.79 |
| 53850 | HCPCS | facility | Prostatic microwave thermotx | $4024.3 | $4224.5 | $-200.2 | 0.95 | 11 | 1 | n/a | n/a | $3261.04 | $8915.56 |
| 53852 | HCPCS | facility | Prostatic rf thermotx | $4024.3 | $4224.5 | $-200.2 | 0.95 | 11 | 1 | n/a | n/a | $3261.04 | $6735.22 |
| 27290 | HCPCS | facility | Amputation of leg at hip | $20810.025 | $21013.36 | $-203.335 | 0.99 | 8 | 1 | n/a | n/a | $1725.71 | $21267.94 |
| D0210 | HCPCS | facility | Intraor complete film series | $82.03 | $285.95 | $-203.92 | 0.29 | 3 | 1 | n/a | n/a | $59.15 | $285.95 |
| P9071 | HCPCS | facility | Pathogen reduced plasma sing | $89.6 | $294.48 | $-204.88 | 0.30 | 9 | 1 | n/a | n/a | $72.56 | $294.48 |
| 0481T | HCPCS | facility | Njx autol wbc concentrate | $329.99 | $535.38 | $-205.39 | 0.62 | 5 | 1 | n/a | n/a | $329.99 | $535.38 |
| 77407 | HCPCS | facility | Radiation treatment delivery | $256.68 | $462.24 | $-205.56 | 0.56 | 10 | 1 | n/a | n/a | $95.5 | $710.01 |
| 77750 | HCPCS | facility | Infuse radioactive materials | $256.68 | $462.24 | $-205.56 | 0.56 | 10 | 1 | n/a | n/a | $179.52 | $803.98 |
| 77767 | HCPCS | facility | Hdr rdncl skn surf brachytx | $256.68 | $462.24 | $-205.56 | 0.56 | 10 | 1 | n/a | n/a | $194.35 | $803.98 |
| 77768 | HCPCS | facility | Hdr rdncl skn surf brachytx | $256.68 | $462.24 | $-205.56 | 0.56 | 10 | 1 | n/a | n/a | $194.35 | $803.98 |
| 77373 | HCPCS | facility | SBRT Delivery | $1933.26 | $2142.89 | $-209.63 | 0.90 | 10 | 1 | n/a | n/a | $978.25 | $5522.21 |
| 86891 | HCPCS | facility | Autologous blood op salvage | $753.18 | $965.56 | $-212.38 | 0.78 | 9 | 1 | n/a | n/a | $17.96 | $1922.64 |
| 15793 | HCPCS | facility | Chemical peel nonfacial | $274.76 | $487.19 | $-212.43 | 0.56 | 11 | 1 | n/a | n/a | $71.54 | $487.19 |
| 0673T | HCPCS | facility | Abltj b9 thyr ndul perq lasr | $1766.605 | $1979.35 | $-212.745 | 0.89 | 8 | 1 | n/a | n/a | $1436.99 | $1979.35 |
| 43197 | HCPCS | facility | Esophagoscopy flex dx brush | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | n/a | n/a | $623.45 | $1805.48 |
| 43198 | HCPCS | facility | Esophagosc flex trnsn biopsy | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | n/a | n/a | $623.45 | $1805.48 |
| 43200 | HCPCS | facility | Esophagoscopy flexible brush | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | n/a | n/a | $623.45 | $1805.48 |
| 43235 | HCPCS | facility | Egd diagnostic brush wash | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $1158.0 | $810.6 | $623.45 | $1805.48 |
| 43236 | HCPCS | facility | Uppr gi scope w/submuc inj | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | n/a | n/a | $623.45 | $1805.48 |
| 43239 | HCPCS | facility | Egd biopsy single/multiple | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $1238.0 | $866.6 | $623.45 | $1805.48 |
| 43247 | HCPCS | facility | Egd remove foreign body | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $1238.0 | $866.6 | $623.45 | $4303.61 |
| 43248 | HCPCS | facility | Egd guide wire insertion | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | n/a | n/a | $623.45 | $4303.61 |
| 43450 | HCPCS | facility | Dilate esophagus 1/mult pass | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | n/a | n/a | $483.05 | $1805.48 |
| 43510 | HCPCS | facility | Surgical opening of stomach | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | n/a | n/a | $623.45 | $4303.61 |
| 43831 | HCPCS | facility | Place gastrostomy tube | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | n/a | n/a | $623.45 | $1805.48 |
| 44500 | HCPCS | facility | HC INTRODUCTION LONG GI TUBE SEPARATE PROCEDURE (ABBOTT) | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $1427.0 | $998.9 | $439.63 | $1805.48 |
| 49082 | HCPCS | facility | Abd paracentesis | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $2422.0 | $1695.4 | $412.39 | $1805.48 |
| 49083 | HCPCS | facility | Abd paracentesis w/imaging | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $2038.0 | $1426.6 | $412.39 | $1805.48 |
| 49084 | HCPCS | facility | HC PERITONEAL LAVAGE, W/IMAG GUID | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $1819.0 | $1273.3 | $412.39 | $1805.48 |
| 49450 | HCPCS | facility | HC REPL G/C TUBE,PERC,IMAG/CONTRS | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $1304.0 | $912.8 | $439.63 | $1151.97 |
| 49451 | HCPCS | facility | HC RPL DUOD/JEJU TUBE PERC,FLUORO | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $1434.0 | $1003.8 | $439.63 | $1151.97 |
| 49452 | HCPCS | facility | HC REPLACE GASTRO-JEJUNO TUBE, PERCUTANEOUS, FLUORO GUID INCL. CONT | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $1555.0 | $1088.5 | $439.63 | $1151.97 |
| 49460 | HCPCS | facility | Fix g/colon tube w/device | $870.88 | $1086.97 | $-216.09 | 0.80 | 11 | 1 | $1741.0 | $1218.7 | $439.63 | $1151.97 |
| 91110 | HCPCS | facility | Gi tract capsule endoscopy | $870.88 | $1086.97 | $-216.09 | 0.80 | 10 | 1 | n/a | n/a | $750.68 | $2126.75 |
| 91112 | HCPCS | facility | Gi wireless capsule measure | $870.88 | $1086.97 | $-216.09 | 0.80 | 10 | 1 | n/a | n/a | $302.6 | $2126.75 |
| C9791 | HCPCS | facility | Mri hyperpolarized xenon129 | $1250.0 | $1466.89 | $-216.89 | 0.85 | 3 | 1 | n/a | n/a | $1250.0 | $1466.89 |
| 44385 | HCPCS | facility | Endoscopy of bowel pouch | $897.4 | $1114.51 | $-217.11 | 0.81 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 44386 | HCPCS | facility | Endoscopy bowel pouch/biop | $897.4 | $1114.51 | $-217.11 | 0.81 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 44388 | HCPCS | facility | Colonoscopy thru stoma spx | $897.4 | $1114.51 | $-217.11 | 0.81 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45378 | HCPCS | facility | Diagnostic colonoscopy | $897.4 | $1114.51 | $-217.11 | 0.81 | 11 | 1 | $1209.0 | $846.3 | $691.32 | $1805.48 |
| 0813T | HCPCS | facility | Egd vol adjmt bariatric balo | $864.59 | $1086.97 | $-222.38 | 0.80 | 3 | 1 | n/a | n/a | $864.59 | $1086.97 |
| 95805 | HCPCS | facility | HC MULTIPLE SLEEP LATENCY | $806.13 | $1029.15 | $-223.02 | 0.78 | 10 | 1 | $3827.0 | $2678.9 | $520.63 | $1268.09 |
| 69726 | HCPCS | facility | Rmvl oi implt skl perq esp | $3686.55 | $3921.32 | $-234.77 | 0.94 | 10 | 1 | n/a | n/a | $2892.28 | $4303.61 |
| 69727 | HCPCS | facility | Rmvl oi implt skl tc esp | $3686.55 | $3921.32 | $-234.77 | 0.94 | 10 | 1 | n/a | n/a | $2892.28 | $4303.61 |
| C9778 | HCPCS | facility | Colpopexy, min/inv, ex-perit | $5756.585 | $5995.17 | $-238.585 | 0.96 | 10 | 1 | n/a | n/a | $4503.49 | $6735.22 |
| D3346 | HCPCS | facility | Retreat root canal anterior | $534.7 | $774.78 | $-240.08 | 0.69 | 3 | 1 | n/a | n/a | $375.61 | $774.78 |
| P9032 | HCPCS | facility | Platelets, irradiated | $151.75 | $392.97 | $-241.22 | 0.39 | 7 | 1 | n/a | n/a | $134.23 | $392.97 |
| C1716 | HCPCS | facility | Brachytx, non-str, Gold-198 | $270.91 | $513.57 | $-242.66 | 0.53 | 10 | 1 | n/a | n/a | $250.5 | $868.33 |
| G0455 | HCPCS | facility | Fecal microbiota prep instil | $870.88 | $1114.51 | $-243.63 | 0.78 | 10 | 1 | n/a | n/a | $49.64 | $1827.24 |
| 0930T | HCPCS | facility | Ephys eval ccm-d ld 1st impl | $1213.99 | $1459.16 | $-245.17 | 0.83 | 3 | 1 | n/a | n/a | $1213.99 | $1459.16 |
| 0931T | HCPCS | facility | Ephys eval ccm-d ld separate | $1213.99 | $1459.16 | $-245.17 | 0.83 | 3 | 1 | n/a | n/a | $1213.99 | $1459.16 |
| 69205 | HCPCS | facility | Clear outer ear canal | $1727.73 | $1979.35 | $-251.62 | 0.87 | 11 | 1 | n/a | n/a | $1572.96 | $2114.93 |
| J9052 | HCPCS | facility | Inj, carmustine (accord) | $0.05 | $259.7 | $-259.65 | 0.00 | 5 | 1 | n/a | n/a | $0.05 | $279.3 |
| 0651T | HCPCS | facility | Mag ctrld capsule endoscopy | $826.39 | $1086.97 | $-260.58 | 0.76 | 3 | 1 | n/a | n/a | $826.39 | $1086.97 |
| 15860 | HCPCS | facility | Test for blood flow in graft | $274.76 | $535.38 | $-260.62 | 0.51 | 11 | 1 | n/a | n/a | $49.64 | $535.38 |
| 20665 | HCPCS | facility | Removal of fixation device | $274.76 | $535.38 | $-260.62 | 0.51 | 11 | 1 | n/a | n/a | $49.64 | $535.38 |
| 42809 | HCPCS | facility | HC REMOVE PHARYNX FOREIGN BODY | $274.76 | $535.38 | $-260.62 | 0.51 | 11 | 1 | $597.0 | $417.9 | $49.64 | $535.38 |
| 68801 | HCPCS | facility | Dilate tear duct opening | $274.76 | $535.38 | $-260.62 | 0.51 | 11 | 1 | n/a | n/a | $74.07 | $535.38 |
| 0596T | HCPCS | facility | Temp fml iu vlv-pmp 1st insj | $574.77 | $835.67 | $-260.9 | 0.69 | 3 | 1 | n/a | n/a | $574.77 | $835.67 |
| 0597T | HCPCS | facility | Temp fml iu valve-pmp rplcmt | $574.77 | $835.67 | $-260.9 | 0.69 | 3 | 1 | n/a | n/a | $574.77 | $835.67 |
| 45300 | HCPCS | facility | HC PROCTOSIGMOIDOSCOPY, RIGID; DX | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | $1312.0 | $918.4 | $420.32 | $1805.48 |
| 45330 | HCPCS | facility | Diagnostic sigmoidoscopy | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | n/a | n/a | $420.32 | $1805.48 |
| 45331 | HCPCS | facility | Sigmoidoscopy and biopsy | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | n/a | n/a | $420.32 | $1805.48 |
| 45333 | HCPCS | facility | Sigmoidoscopy & polypectomy | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | n/a | n/a | $420.32 | $1151.97 |
| 45335 | HCPCS | facility | Sigmoidoscopy w/submuc inj | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | n/a | n/a | $420.32 | $1151.97 |
| 45900 | HCPCS | facility | HC REDUCTION OF RECTAL PROLAPSE | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | $1203.0 | $842.1 | $439.35 | $1151.97 |
| 46050 | HCPCS | facility | HC I&D ANAL ABSCESS | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | $2240.0 | $1568.0 | $439.35 | $1151.97 |
| 46221 | HCPCS | facility | Ligation of hemorrhoid(s) | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | n/a | n/a | $439.35 | $1805.48 |
| 46500 | HCPCS | facility | Injection into hemorrhoid(s) | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | n/a | n/a | $439.35 | $1805.48 |
| 46942 | HCPCS | facility | Treatment of anal fissure | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | n/a | n/a | $439.35 | $1151.97 |
| G0105 | HCPCS | facility | Colorectal scrn; hi risk ind | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | n/a | n/a | $611.77 | $1805.48 |
| G0121 | HCPCS | facility | Colon ca scrn not hi rsk ind | $851.82 | $1114.51 | $-262.69 | 0.76 | 11 | 1 | n/a | n/a | $611.77 | $1805.48 |
| 77522 | HCPCS | facility | Proton trmt simple w/comp | $1233.86 | $1497.75 | $-263.89 | 0.82 | 10 | 1 | n/a | n/a | $1136.61 | $4156.3 |
| 77523 | HCPCS | facility | Proton trmt intermediate | $1233.86 | $1497.75 | $-263.89 | 0.82 | 10 | 1 | n/a | n/a | $682.36 | $4156.3 |
| 77525 | HCPCS | facility | Proton treatment complex | $1233.86 | $1497.75 | $-263.89 | 0.82 | 10 | 1 | n/a | n/a | $682.36 | $4156.3 |
| 65435 | HCPCS | facility | Curette/treat cornea | $923.18 | $1194.71 | $-271.53 | 0.77 | 11 | 1 | n/a | n/a | $615.69 | $1805.48 |
| 67710 | HCPCS | facility | Incision of eyelid | $923.18 | $1194.71 | $-271.53 | 0.77 | 11 | 1 | n/a | n/a | $615.69 | $1805.48 |
| 67801 | HCPCS | facility | Remove eyelid lesions | $923.18 | $1194.71 | $-271.53 | 0.77 | 11 | 1 | n/a | n/a | $615.69 | $1805.48 |
| 67830 | HCPCS | facility | Revise eyelashes | $923.18 | $1194.71 | $-271.53 | 0.77 | 11 | 1 | n/a | n/a | $615.69 | $4303.61 |
| 67840 | HCPCS | facility | Remove eyelid lesion | $923.18 | $1194.71 | $-271.53 | 0.77 | 11 | 1 | n/a | n/a | $615.69 | $1805.48 |
| 67850 | HCPCS | facility | Treat eyelid lesion | $923.18 | $1194.71 | $-271.53 | 0.77 | 11 | 1 | n/a | n/a | $615.69 | $1805.48 |
| 67875 | HCPCS | facility | Closure of eyelid by suture | $923.18 | $1194.71 | $-271.53 | 0.77 | 11 | 1 | n/a | n/a | $615.69 | $1805.48 |
| 68020 | HCPCS | facility | Incise/drain eyelid lining | $923.18 | $1194.71 | $-271.53 | 0.77 | 11 | 1 | n/a | n/a | $231.76 | $1194.71 |
| 68400 | HCPCS | facility | Incise/drain tear gland | $923.18 | $1194.71 | $-271.53 | 0.77 | 11 | 1 | n/a | n/a | $231.76 | $1194.71 |
| A9548 | HCPCS | facility | In111 pentetate | $471.04 | $745.62 | $-274.58 | 0.63 | 3 | 1 | $4398.51 | $3078.96 | $471.04 | $745.62 |
| 93229 | HCPCS | facility | HC EXTERNAL MOBILE CARDIOVASC TELEMETRY W/TECH SUPPORT | $172.61 | $447.21 | $-274.6 | 0.39 | 10 | 1 | $689.0 | $482.3 | $155.47 | $447.21 |
| D2664 | HCPCS | facility | Dental onlay resin 4/mre sur | $495.26 | $774.78 | $-279.52 | 0.64 | 3 | 1 | n/a | n/a | $347.54 | $774.78 |
| 45172 | HCPCS | facility | Exc rect tum transanal full | $3046.35 | $3326.48 | $-280.13 | 0.92 | 11 | 1 | n/a | n/a | $2365.97 | $6735.22 |
| 45505 | HCPCS | facility | Repair of rectum | $3046.35 | $3326.48 | $-280.13 | 0.92 | 11 | 1 | n/a | n/a | $2365.97 | $4303.61 |
| 45541 | HCPCS | facility | Correct rectal prolapse | $3046.35 | $3326.48 | $-280.13 | 0.92 | 11 | 1 | n/a | n/a | $2365.97 | $6735.22 |
| 45560 | HCPCS | facility | Repair of rectocele | $3046.35 | $3326.48 | $-280.13 | 0.92 | 11 | 1 | n/a | n/a | $2365.97 | $4303.61 |
| 46288 | HCPCS | facility | Repair anal fistula | $3046.35 | $3326.48 | $-280.13 | 0.92 | 11 | 1 | n/a | n/a | $2365.97 | $6735.22 |
| 46750 | HCPCS | facility | Repair of anal sphincter | $3046.35 | $3326.48 | $-280.13 | 0.92 | 11 | 1 | n/a | n/a | $2365.97 | $6735.22 |
| 46760 | HCPCS | facility | Repair of anal sphincter | $3046.35 | $3326.48 | $-280.13 | 0.92 | 11 | 1 | n/a | n/a | $2365.97 | $4303.61 |
| 46761 | HCPCS | facility | Repair of anal sphincter | $3046.35 | $3326.48 | $-280.13 | 0.92 | 11 | 1 | n/a | n/a | $2365.97 | $6735.22 |
| 46947 | HCPCS | facility | Hemorrhoidopexy by stapling | $3046.35 | $3326.48 | $-280.13 | 0.92 | 11 | 1 | n/a | n/a | $2365.97 | $4303.61 |
| J1162 | HCPCS | facility | Digoxin immune fab (ovine) | $4888.1 | $5168.23 | $-280.13 | 0.95 | 13 | 1 | $7964.59 | $5575.21 | $3969.27 | $5168.23 |
| 11300 | HCPCS | facility | HC SHAVE LESION T/A/L; 0.5 CM/< | $201.78 | $487.19 | $-285.41 | 0.41 | 11 | 1 | $332.0 | $232.4 | $71.54 | $487.19 |
| 15788 | HCPCS | facility | Chemical peel face epiderm | $201.78 | $487.19 | $-285.41 | 0.41 | 11 | 1 | n/a | n/a | $71.54 | $487.19 |
| 36468 | HCPCS | facility | Injection(s) spider veins | $201.78 | $487.19 | $-285.41 | 0.41 | 10 | 1 | n/a | n/a | $71.54 | $761.93 |
| 96132 | HCPCS | facility | Nrpsyc tst eval phys/qhp 1st | $155.47 | $447.21 | $-291.74 | 0.35 | 10 | 1 | n/a | n/a | $76.06 | $447.21 |
| 20606 | HCPCS | facility | Drain/inj joint/bursa w/us | $552.31 | $845.96 | $-293.65 | 0.65 | 11 | 1 | $1017.0 | $711.9 | $140.56 | $845.96 |
| P9036 | HCPCS | facility | Platelet pheresis irradiated | $655.01 | $949.13 | $-294.12 | 0.69 | 7 | 1 | n/a | n/a | $649.62 | $949.13 |
| 32553 | HCPCS | facility | Ins mark thor for rt perq | $1363.03 | $1658.81 | $-295.78 | 0.82 | 11 | 1 | n/a | n/a | $984.49 | $4303.61 |
| 49411 | HCPCS | facility | HC PLACE INTERSTITAL DEV RAD TX GUID, P/IA/IP/R, SINGLE/MULTI | $1363.03 | $1658.81 | $-295.78 | 0.82 | 11 | 1 | $4679.0 | $3275.3 | $984.49 | $4303.61 |
| 55876 | HCPCS | facility | Place rt device/marker pros | $1363.03 | $1658.81 | $-295.78 | 0.82 | 11 | 1 | n/a | n/a | $984.49 | $4303.61 |
| 77295 | HCPCS | facility | 3-d radiotherapy plan | $1363.03 | $1658.81 | $-295.78 | 0.82 | 10 | 1 | n/a | n/a | $984.49 | $4176.32 |
| 77301 | HCPCS | facility | Radiotherapy dose plan imrt | $1363.03 | $1658.81 | $-295.78 | 0.82 | 10 | 1 | n/a | n/a | $984.49 | $4176.32 |
| C9728 | HCPCS | facility | Place device/marker, non pro | $1363.03 | $1658.81 | $-295.78 | 0.82 | 10 | 1 | n/a | n/a | $984.49 | $3444.47 |
| 10030 | HCPCS | facility | Guide cathet fluid drainage | $552.31 | $848.66 | $-296.35 | 0.65 | 11 | 1 | $1362.0 | $953.4 | $125.45 | $848.66 |
| 19283 | HCPCS | facility | Perq dev breast 1st strtctc | $552.31 | $848.66 | $-296.35 | 0.65 | 11 | 1 | n/a | n/a | $49.64 | $848.66 |
| 19285 | HCPCS | facility | HC PERQ PLACEMENT DEVICE BRST; 1ST LES US | $552.31 | $848.66 | $-296.35 | 0.65 | 11 | 1 | $1024.0 | $716.8 | $49.64 | $848.66 |
| 19287 | HCPCS | facility | HC PERQ DEV BREAST;1ST LES MRI | $552.31 | $848.66 | $-296.35 | 0.65 | 11 | 1 | $346.0 | $242.2 | $49.64 | $848.66 |
| 20950 | HCPCS | facility | Fluid pressure muscle | $552.31 | $848.66 | $-296.35 | 0.65 | 11 | 1 | $202.0 | $141.4 | $125.45 | $848.66 |
| 40800 | HCPCS | facility | Drainage of mouth lesion | $552.31 | $848.66 | $-296.35 | 0.65 | 11 | 1 | $679.0 | $475.3 | $125.45 | $848.66 |
| 69000 | HCPCS | facility | Drain external ear lesion | $552.31 | $848.66 | $-296.35 | 0.65 | 11 | 1 | $1024.0 | $716.8 | $125.45 | $848.66 |
| 69020 | HCPCS | facility | Drain outer ear canal lesion | $552.31 | $848.66 | $-296.35 | 0.65 | 11 | 1 | $969.0 | $678.3 | $125.45 | $848.66 |
| 31551 | HCPCS | facility | Laryngoplasty laryngeal sten | $6795.5 | $7094.6 | $-299.1 | 0.96 | 10 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 31552 | HCPCS | facility | Laryngoplasty laryngeal sten | $6795.5 | $7094.6 | $-299.1 | 0.96 | 10 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 31553 | HCPCS | facility | Laryngoplasty laryngeal sten | $6795.5 | $7094.6 | $-299.1 | 0.96 | 10 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 31554 | HCPCS | facility | Laryngoplasty laryngeal sten | $6795.5 | $7094.6 | $-299.1 | 0.96 | 10 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 31591 | HCPCS | facility | Laryngoplasty medialization | $6795.5 | $7094.6 | $-299.1 | 0.96 | 10 | 1 | n/a | n/a | $4129.2 | $8915.56 |
| 31592 | HCPCS | facility | Cricotracheal resection | $6795.5 | $7094.6 | $-299.1 | 0.96 | 10 | 1 | n/a | n/a | $4129.2 | $8915.56 |
| 76145 | HCPCS | facility | HC MEDICAL PHYSICS DOSE EVAL RADIATION EXPOSURE W/RPRT | $144.21 | $447.21 | $-303.0 | 0.32 | 10 | 1 | $1268.0 | $887.6 | $126.87 | $594.21 |
| A9602 | HCPCS | facility | Fluorodopa f-18 diag per mci | $548.05 | $855.55 | $-307.5 | 0.64 | 9 | 1 | n/a | n/a | $508.84 | $855.55 |
| J2993 | HCPCS | facility | Reteplase injection | $2592.415 | $2904.58 | $-312.165 | 0.89 | 10 | 1 | n/a | n/a | $2301.91 | $3443.98 |
| J1954 | HCPCS | facility | Leuprolide depot cipla 7.5mg | $394.415 | $706.67 | $-312.255 | 0.56 | 12 | 1 | n/a | n/a | $220.74 | $706.67 |
| 44389 | HCPCS | facility | Colonoscopy with biopsy | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 44391 | HCPCS | facility | Colonoscopy for bleeding | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 44392 | HCPCS | facility | Colonoscopy & polypectomy | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 44394 | HCPCS | facility | Colonoscopy w/snare | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $4303.61 |
| 44401 | HCPCS | facility | Colonoscopy with ablation | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $457.45 | $1805.48 |
| 44403 | HCPCS | facility | Colonoscopy w/resection | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $257.66 | $1805.48 |
| 44404 | HCPCS | facility | Colonoscopy w/injection | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $457.45 | $1805.48 |
| 44405 | HCPCS | facility | Colonoscopy w/dilation | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $604.04 | $1805.48 |
| 44406 | HCPCS | facility | Colonoscopy w/ultrasound | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $457.45 | $1805.48 |
| 44407 | HCPCS | facility | Colonoscopy w/ndl aspir/bx | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $457.45 | $1805.48 |
| 45303 | HCPCS | facility | Proctosigmoidoscopy dilate | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45305 | HCPCS | facility | Proctosigmoidoscopy w/bx | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45309 | HCPCS | facility | Proctosigmoidoscopy removal | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45315 | HCPCS | facility | Proctosigmoidoscopy removal | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45317 | HCPCS | facility | Proctosigmoidoscopy bleed | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45332 | HCPCS | facility | Sigmoidoscopy w/fb removal | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $420.32 | $1434.11 |
| 45334 | HCPCS | facility | Sigmoidoscopy for bleeding | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45338 | HCPCS | facility | Sigmoidoscopy w/tumr remove | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45340 | HCPCS | facility | Sig w/tndsc balloon dilation | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45342 | HCPCS | facility | Sigmoidoscopy W/Us Guide Bx | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 45346 | HCPCS | facility | Sigmoidoscopy w/ablation | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $457.45 | $1805.48 |
| 45350 | HCPCS | facility | Sgmdsc w/band ligation | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $457.45 | $1805.48 |
| 45379 | HCPCS | facility | Colonoscopy w/fb removal | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45380 | HCPCS | facility | Colonoscopy and biopsy | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45381 | HCPCS | facility | Colonoscopy submucous njx | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | $20.0 | $14.0 | $691.32 | $1805.48 |
| 45382 | HCPCS | facility | Colonoscopy w/control bleed | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45384 | HCPCS | facility | Colonoscopy w/lesion removal | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45385 | HCPCS | facility | Colonoscopy w/lesion removal | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45386 | HCPCS | facility | Colonoscopy w/balloon dilat | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45388 | HCPCS | facility | Colonoscopy w/ablation | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $457.45 | $1805.48 |
| 45391 | HCPCS | facility | Colonoscopy w/endoscope us | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45392 | HCPCS | facility | Colonoscopy w/endoscopic fnb | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $691.32 | $1805.48 |
| 45398 | HCPCS | facility | Colonoscopy w/band ligation | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $457.45 | $1805.48 |
| 46030 | HCPCS | facility | Removal of rectal marker | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $439.35 | $1434.11 |
| 46604 | HCPCS | facility | Anoscopy and dilation | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 46606 | HCPCS | facility | Anoscopy and biopsy | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $715.56 | $1805.48 |
| 46607 | HCPCS | facility | Diagnostic anoscopy & biopsy | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $257.66 | $1805.48 |
| 46614 | HCPCS | facility | Anoscopy control bleeding | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $420.32 | $1805.48 |
| 46930 | HCPCS | facility | Destroy internal hemorrhoids | $1120.45 | $1434.11 | $-313.66 | 0.78 | 11 | 1 | n/a | n/a | $439.35 | $1434.11 |
| 32408 | HCPCS | facility | Core ndl bx lng/med perq | $1663.525 | $1979.35 | $-315.825 | 0.84 | 10 | 1 | $2367.0 | $1656.9 | $713.56 | $1979.35 |
| 35184 | HCPCS | facility | Repair blood vessel lesion | $3466.99 | $3784.07 | $-317.08 | 0.92 | 11 | 1 | n/a | n/a | $2149.26 | $4303.61 |
| 35206 | HCPCS | facility | HC REPAIR BLOOD VESSEL LESION | $3466.99 | $3784.07 | $-317.08 | 0.92 | 11 | 1 | $4696.0 | $3287.2 | $2149.26 | $4303.61 |
| 35231 | HCPCS | facility | Repair blood vessel lesion | $3466.99 | $3784.07 | $-317.08 | 0.92 | 11 | 1 | n/a | n/a | $2149.26 | $6735.22 |
| 35903 | HCPCS | facility | Excision graft extremity | $3466.99 | $3784.07 | $-317.08 | 0.92 | 11 | 1 | n/a | n/a | $2149.26 | $6735.22 |
| 37600 | HCPCS | facility | Ligation of neck artery | $3466.99 | $3784.07 | $-317.08 | 0.92 | 11 | 1 | n/a | n/a | $2149.26 | $4303.61 |
| A9600 | HCPCS | facility | Sr89 strontium | $3825.0 | $4146.34 | $-321.34 | 0.92 | 10 | 1 | n/a | n/a | $2200.1 | $4343.62 |
| D2652 | HCPCS | facility | Dental inlay resin 3/mre sur | $452.59 | $774.78 | $-322.19 | 0.58 | 3 | 1 | n/a | n/a | $317.66 | $774.78 |
| 36810 | HCPCS | facility | Insertion of cannula | $3461.72 | $3784.07 | $-322.35 | 0.91 | 11 | 1 | n/a | n/a | $2679.73 | $6735.22 |
| 36835 | HCPCS | facility | Artery to vein shunt | $3461.72 | $3784.07 | $-322.35 | 0.91 | 11 | 1 | n/a | n/a | $2679.73 | $6735.22 |
| 85097 | HCPCS | facility | Bone marrow interpretation | $638.24 | $965.56 | $-327.32 | 0.66 | 9 | 1 | $1226.0 | $858.2 | $38.1 | $1989.24 |
| 88309 | HCPCS | facility | HC LEVEL VI (COMPREHENSIVE) | $638.24 | $965.56 | $-327.32 | 0.66 | 9 | 1 | $1226.0 | $858.2 | $157.05 | $2127.92 |
| 88319 | HCPCS | facility | Enzyme histochemistry | $638.24 | $965.56 | $-327.32 | 0.66 | 9 | 1 | $1643.0 | $1150.1 | $23.43 | $1979.29 |
| 88333 | HCPCS | facility | HC INTEROP CYTOLOGY, INITIAL SITE | $638.24 | $965.56 | $-327.32 | 0.66 | 9 | 1 | $1226.0 | $858.2 | $23.43 | $2127.92 |
| 88348 | HCPCS | facility | Electron microscopy | $638.24 | $965.56 | $-327.32 | 0.66 | 9 | 1 | $1842.0 | $1289.4 | $157.05 | $2061.09 |
| 88362 | HCPCS | facility | Nerve teasing preparations | $638.24 | $965.56 | $-327.32 | 0.66 | 9 | 1 | n/a | n/a | $60.45 | $2004.45 |
| 89258 | HCPCS | facility | Cryopreservation embryo(s) | $638.24 | $965.56 | $-327.32 | 0.66 | 9 | 1 | n/a | n/a | $60.45 | $2004.45 |
| 89272 | HCPCS | facility | Extended culture of oocytes | $638.24 | $965.56 | $-327.32 | 0.66 | 9 | 1 | n/a | n/a | $60.45 | $2004.45 |
| 11043 | HCPCS | facility | Deb musc/fascia 20 sq cm/< | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | $1040.0 | $728.0 | $209.65 | $885.74 |
| 11760 | HCPCS | facility | HC REPAIR NAIL BED | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | $918.0 | $642.6 | $85.75 | $885.74 |
| 11920 | HCPCS | facility | Correct skin color 6.0 cm/< | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $251.48 | $1151.97 |
| 11921 | HCPCS | facility | Correct skn color 6.1-20.0cm | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $251.48 | $1151.97 |
| 11951 | HCPCS | facility | Tx contour defects 1.1-5.0cc | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $251.48 | $1151.97 |
| 11952 | HCPCS | facility | Tx contour defects 5.1-10cc | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $251.48 | $1151.97 |
| 12020 | HCPCS | facility | Closure of split wound | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | $1256.0 | $879.2 | $393.38 | $1151.97 |
| 12036 | HCPCS | facility | HC LAYER CLOSURE OF WOUND(S) | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | $784.0 | $548.8 | $251.48 | $1151.97 |
| 12044 | HCPCS | facility | HC REPAIR, INTERMED-NECK, HANDS, FEET, EXTERNAL GENITALIA; 7.6-12.5 | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | $918.0 | $642.6 | $242.4 | $1151.97 |
| 12045 | HCPCS | facility | HC REPAIR, INTERMED-NECK, HANDS, FEET, EXTERNAL GENITALIA; 12.6-20.0 | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | $814.0 | $569.8 | $242.4 | $1151.97 |
| 13100 | HCPCS | facility | Cmplx rpr trunk 1.1-2.5 cm | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $393.38 | $1151.97 |
| 13101 | HCPCS | facility | Cmplx rpr trunk 2.6-7.5 cm | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | $1002.0 | $701.4 | $393.38 | $1151.97 |
| 13151 | HCPCS | facility | Cmplx rpr e/n/e/l 1.1-2.5 cm | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | $918.0 | $642.6 | $393.38 | $1151.97 |
| 13152 | HCPCS | facility | Cmplx rpr e/n/e/l 2.6-7.5 cm | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | $918.0 | $642.6 | $393.38 | $1151.97 |
| 15050 | HCPCS | facility | Skin pinch graft | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $251.48 | $1151.97 |
| 15789 | HCPCS | facility | Chemical peel face dermal | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $106.96 | $885.74 |
| 17107 | HCPCS | facility | Destruction of skin lesions | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $209.65 | $885.74 |
| 17284 | HCPCS | facility | Destruction of skin lesions | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $209.65 | $885.74 |
| 17286 | HCPCS | facility | Destruction of skin lesions | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $209.65 | $885.74 |
| 17311 | HCPCS | facility | Mohs 1 stage h/n/hf/g | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $367.87 | $1151.97 |
| 17313 | HCPCS | facility | Mohs 1 stage t/a/l | $552.21 | $885.74 | $-333.53 | 0.62 | 11 | 1 | n/a | n/a | $367.87 | $1151.97 |
| 17380 | HCPCS | facility | Hair removal by electrolysis | $552.21 | $885.74 | $-333.53 | 0.62 | 10 | 1 | n/a | n/a | $106.96 | $1380.19 |
| G0562 | HCPCS | facility | Complex simulation w/pet-ct | $1950.0 | $2288.01 | $-338.01 | 0.85 | 3 | 1 | n/a | n/a | $1950.0 | $2288.01 |
| D3421 | HCPCS | facility | Root surgery bicuspid | $435.55 | $774.78 | $-339.23 | 0.56 | 2 | 1 | n/a | n/a | $435.55 | $774.78 |
| J3316 | HCPCS | facility | Inj., triptorelin xr 3.75 mg | $3477.62 | $3817.28 | $-339.66 | 0.91 | 13 | 1 | n/a | n/a | $3233.55 | $3817.28 |
| A9527 | HCPCS | facility | Iodine I-125 sodium iodide | $45.94 | $396.32 | $-350.38 | 0.12 | 13 | 1 | n/a | n/a | $43.31 | $396.32 |
| A9557 | HCPCS | facility | Tc99m bicisate | $424.18 | $775.52 | $-351.34 | 0.55 | 3 | 1 | $5087.12 | $3560.98 | $424.18 | $775.52 |
| 32998 | HCPCS | facility | HC ABLATION THER 1+ PULM TUMORS PERQ IG, UNI; RADIOFREQ | $6893.63 | $7245.25 | $-351.62 | 0.95 | 10 | 1 | $12386.0 | $8670.2 | $4046.61 | $8915.56 |
| 60660 | HCPCS | facility | Abltj 1/+thyr ndul 1lobe prq | $1620.24 | $1979.35 | $-359.11 | 0.82 | 3 | 1 | $5155.0 | $3608.5 | $1620.24 | $1979.35 |
| 21188 | HCPCS | facility | Reconstruction of midface | $6735.22 | $7094.6 | $-359.38 | 0.95 | 6 | 1 | n/a | n/a | $6445.19 | $7094.6 |
| 31584 | HCPCS | facility | Laryngoplasty fx rdctj fixj | $6735.22 | $7094.6 | $-359.38 | 0.95 | 5 | 1 | n/a | n/a | $6445.19 | $7094.6 |
| 0784T | HCPCS | facility | Ins/rplmt eltrd ra spi nstim | $12992.46 | $13353.93 | $-361.47 | 0.97 | 3 | 1 | n/a | n/a | $12992.46 | $13353.93 |
| 0786T | HCPCS | facility | Insj/rplcmt prq ra sac nstim | $12992.46 | $13353.93 | $-361.47 | 0.97 | 3 | 1 | n/a | n/a | $12992.46 | $13353.93 |
| 33288 | HCPCS | facility | Rmv&rplcmt phrnc nrv stim ld | $12992.46 | $13353.93 | $-361.47 | 0.97 | 3 | 1 | n/a | n/a | $12992.46 | $13353.93 |
| 64596 | HCPCS | facility | Ins/rplcmt prq eltrd ra pn 1 | $12992.46 | $13353.93 | $-361.47 | 0.97 | 5 | 1 | n/a | n/a | $12992.46 | $13997.78 |
| 93503 | HCPCS | facility | Insert/place heart catheter | $1524.13 | $1886.54 | $-362.41 | 0.81 | 11 | 1 | n/a | n/a | $1156.5 | $1886.54 |
| D3310 | HCPCS | facility | End thxpy, anterior tooth | $400.36 | $774.78 | $-374.42 | 0.52 | 3 | 1 | n/a | n/a | $281.36 | $774.78 |
| 0733T | HCPCS | facility | Rem bdy&lmb knmtc ther sply | $35.0 | $411.15 | $-376.15 | 0.09 | 3 | 1 | n/a | n/a | $35.0 | $411.15 |
| 21451 | HCPCS | facility | HC CLS TX MANDIBULAR FX; W MANIP | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | $4239.0 | $2967.3 | $1147.39 | $6735.22 |
| 30220 | HCPCS | facility | Insert nasal septal button | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 30802 | HCPCS | facility | Ablate inf turbinate submuc | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | n/a | n/a | $1147.39 | $1859.49 |
| 40819 | HCPCS | facility | Excise lip or cheek fold | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | n/a | n/a | $1147.39 | $1859.49 |
| 41806 | HCPCS | facility | Removal foreign body jawbone | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | n/a | n/a | $1147.39 | $1859.49 |
| 42650 | HCPCS | facility | Dilation of salivary duct | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 69105 | HCPCS | facility | Biopsy of external ear canal | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | n/a | n/a | $1147.39 | $1859.49 |
| 69436 | HCPCS | facility | Create eardrum opening | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 69540 | HCPCS | facility | Remove ear lesion | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | n/a | n/a | $1147.39 | $1859.49 |
| 69801 | HCPCS | facility | Incise inner ear | $1483.2 | $1859.49 | $-376.29 | 0.80 | 11 | 1 | n/a | n/a | $1147.39 | $8915.56 |
| D2662 | HCPCS | facility | Dental onlay resin 2 surface | $392.89 | $774.78 | $-381.89 | 0.51 | 3 | 1 | n/a | n/a | $276.07 | $774.78 |
| 54161 | HCPCS | facility | Circum 28 days or older | $2113.41 | $2505.21 | $-391.8 | 0.84 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 54162 | HCPCS | facility | Lysis penil circumic lesion | $2113.41 | $2505.21 | $-391.8 | 0.84 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 54163 | HCPCS | facility | Repair of circumcision | $2113.41 | $2505.21 | $-391.8 | 0.84 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 54164 | HCPCS | facility | Frenulotomy of penis | $2113.41 | $2505.21 | $-391.8 | 0.84 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 54560 | HCPCS | facility | Exploration for testis | $2113.41 | $2505.21 | $-391.8 | 0.84 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 54700 | HCPCS | facility | Drainage of scrotum | $2113.41 | $2505.21 | $-391.8 | 0.84 | 11 | 1 | $4341.0 | $3038.7 | $1696.84 | $4303.61 |
| 54840 | HCPCS | facility | Remove epididymis lesion | $2113.41 | $2505.21 | $-391.8 | 0.84 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 54900 | HCPCS | facility | Fusion of spermatic ducts | $2113.41 | $2505.21 | $-391.8 | 0.84 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 55120 | HCPCS | facility | Removal of scrotum lesion | $2113.41 | $2505.21 | $-391.8 | 0.84 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 0339T | HCPCS | facility | Trnscth renal symp denrv bil | $6429.12 | $6821.04 | $-391.92 | 0.94 | 1 | 1 | n/a | n/a | $6429.12 | $6821.04 |
| 46601 | HCPCS | facility | Diagnostic anoscopy | $140.56 | $535.38 | $-394.82 | 0.26 | 11 | 1 | n/a | n/a | $49.64 | $552.31 |
| 20500 | HCPCS | facility | Injection of sinus tract | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 21110 | HCPCS | facility | Interdental fixation | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $4303.61 |
| 21295 | HCPCS | facility | Revision of jaw muscle/bone | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $4303.61 |
| 21315 | HCPCS | facility | Closed tx nose fx w/o stablj | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $663.93 | $1859.49 |
| 21401 | HCPCS | facility | Closed tx orbit w/manipulj | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $6735.22 |
| 21497 | HCPCS | facility | Interdental wiring | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $4303.61 |
| 30100 | HCPCS | facility | Intranasal biopsy | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 30110 | HCPCS | facility | Removal of nose polyp(s) | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 30210 | HCPCS | facility | Nasal sinus therapy | $1462.72 | $1859.49 | $-396.77 | 0.79 | 10 | 1 | n/a | n/a | $498.57 | $3570.16 |
| 30801 | HCPCS | facility | Ablate inf turbinate superf | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $663.93 | $1859.49 |
| 31002 | HCPCS | facility | Irrigation sphenoid sinus | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 31603 | HCPCS | facility | Incision of windpipe | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 40654 | HCPCS | facility | HC REPAIR LIP | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | $2192.0 | $1534.4 | $498.57 | $6735.22 |
| 41010 | HCPCS | facility | HC INCISION OF LINGUAL FRENUM (FRENOTOMY) | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | $3286.0 | $2300.2 | $498.57 | $1859.49 |
| 41018 | HCPCS | facility | Drainage of mouth lesion | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 41115 | HCPCS | facility | Excision of tongue fold | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | $1642.0 | $1149.4 | $498.57 | $1859.49 |
| 41821 | HCPCS | facility | Excision of gum flap | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 41822 | HCPCS | facility | Excision of gum lesion | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $663.93 | $1859.49 |
| 42100 | HCPCS | facility | Biopsy roof of mouth | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 42300 | HCPCS | facility | Drainage of salivary gland | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 43020 | HCPCS | facility | Incision of esophagus | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $6735.22 |
| 60000 | HCPCS | facility | Drain thyroid/tongue cyst | $1462.72 | $1859.49 | $-396.77 | 0.79 | 11 | 1 | n/a | n/a | $498.57 | $1859.49 |
| 36901 | HCPCS | facility | HC INTRO CATH DIALYSIS CIRCUIT | $1489.18 | $1886.54 | $-397.36 | 0.79 | 10 | 1 | $2568.0 | $1797.6 | $716.01 | $1886.54 |
| 23520 | HCPCS | facility | Treat clavicle dislocation | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | n/a | n/a | $398.86 | $1927.09 |
| 23605 | HCPCS | facility | HC CL TX HUMERUS FX W/MANIP | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $2430.0 | $1701.0 | $835.41 | $4303.61 |
| 23625 | HCPCS | facility | HC CLOSED TX GREATER HUMERAL TUBEROSITY FX, W/MANIPULATION | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $4293.0 | $3005.1 | $835.41 | $4303.61 |
| 24620 | HCPCS | facility | HC TREAT ELBOW FRACTURE | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $2430.0 | $1701.0 | $835.41 | $4303.61 |
| 25259 | HCPCS | facility | Manipulate wrist w/anesthes | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | n/a | n/a | $835.41 | $6735.22 |
| 25690 | HCPCS | facility | HC CLOSED TREATMENT OF LUNATE | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $2430.0 | $1701.0 | $835.41 | $1927.09 |
| 27502 | HCPCS | facility | HC TREATMENT OF THIGH FRACTURE | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $2430.0 | $1701.0 | $835.41 | $4303.61 |
| 27752 | HCPCS | facility | HC TREATMENT OF TIBIA FRACTURE | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $2916.0 | $2041.2 | $835.41 | $1927.09 |
| 27762 | HCPCS | facility | Cltx med ankle fx w/mnpj | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $2430.0 | $1701.0 | $835.41 | $1927.09 |
| 27825 | HCPCS | facility | HC TX LOWER LEG FX | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $2430.0 | $1701.0 | $835.41 | $1927.09 |
| 28435 | HCPCS | facility | HC TX ANKLE FX | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $619.0 | $433.3 | $133.65 | $4303.61 |
| 28635 | HCPCS | facility | HC TREAT TOE DISLOCATION | $1525.0 | $1927.09 | $-402.09 | 0.79 | 11 | 1 | $2263.0 | $1584.1 | $1039.07 | $1927.09 |
| 26034 | HCPCS | facility | Treat hand bone lesion | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26040 | HCPCS | facility | Release palm contracture | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26055 | HCPCS | facility | Incise finger tendon sheath | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26060 | HCPCS | facility | Incision of finger tendon | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26070 | HCPCS | facility | Explore/treat hand joint | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26080 | HCPCS | facility | Explore/treat finger joint | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | $2249.0 | $1574.3 | $1185.44 | $6735.22 |
| 26110 | HCPCS | facility | Biopsy finger joint lining | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $1927.09 |
| 26140 | HCPCS | facility | Revise finger joint each | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26145 | HCPCS | facility | Tendon excision palm/finger | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26160 | HCPCS | facility | Remove tendon sheath lesion | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26170 | HCPCS | facility | Removal of palm tendon each | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26180 | HCPCS | facility | Removal of finger tendon | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26185 | HCPCS | facility | Remove finger bone | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26200 | HCPCS | facility | Remove hand bone lesion | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26210 | HCPCS | facility | Removal of finger lesion | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26235 | HCPCS | facility | Partial removal finger bone | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26236 | HCPCS | facility | Partial removal finger bone | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26262 | HCPCS | facility | Resect distal finger tumor | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26410 | HCPCS | facility | Repair hand tendon | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26418 | HCPCS | facility | HC REPAIR, EXTENSOR TENDON, FINGER; W/O GRAFT, EACH TENDON | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | $2601.0 | $1820.7 | $1185.44 | $6735.22 |
| 26432 | HCPCS | facility | Repair finger tendon | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26440 | HCPCS | facility | Release palm/finger tendon | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26455 | HCPCS | facility | Incision of finger tendon | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26460 | HCPCS | facility | Incise hand/finger tendon | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26474 | HCPCS | facility | Fusion of finger tendons | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26525 | HCPCS | facility | Release finger contracture | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26560 | HCPCS | facility | Repair of web finger | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26590 | HCPCS | facility | Repair finger deformity | $1523.12 | $1927.09 | $-403.97 | 0.79 | 11 | 1 | n/a | n/a | $1185.44 | $8915.56 |
| 77412 | HCPCS | facility | Radiation treatment delivery | $256.68 | $662.19 | $-405.51 | 0.39 | 10 | 1 | n/a | n/a | $179.52 | $803.98 |
| 10121 | HCPCS | facility | HC REMOVE FOREIGN BODY | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2367.0 | $1656.9 | $1121.75 | $1979.35 |
| 10140 | HCPCS | facility | Drainage of hematoma/fluid | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2882.0 | $2017.4 | $725.58 | $1979.35 |
| 11044 | HCPCS | facility | Deb bone 20 sq cm/< | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3210.0 | $2247.0 | $583.61 | $4303.61 |
| 11404 | HCPCS | facility | Exc tr-ext b9+marg 3.1-4 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3475.0 | $2432.5 | $1121.75 | $1979.35 |
| 11406 | HCPCS | facility | Exc tr-ext b9+marg >4.0 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 11420 | HCPCS | facility | Exc h-f-nk-sp b9+marg 0.5/< | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2674.0 | $1871.8 | $583.61 | $1979.35 |
| 11422 | HCPCS | facility | Exc h-f-nk-sp b9+marg 1.1-2 | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2700.0 | $1890.0 | $583.61 | $1979.35 |
| 11423 | HCPCS | facility | Exc h-f-nk-sp b9+marg 2.1-3 | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $4689.0 | $3282.3 | $1121.75 | $4303.61 |
| 11424 | HCPCS | facility | Exc h-f-nk-sp b9+marg 3.1-4 | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $4689.0 | $3282.3 | $1121.75 | $4303.61 |
| 11443 | HCPCS | facility | Exc face-mm b9+marg 2.1-3 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2636.0 | $1845.2 | $583.61 | $1979.35 |
| 11444 | HCPCS | facility | Exc face-mm b9+marg 3.1-4 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2636.0 | $1845.2 | $583.61 | $1979.35 |
| 11606 | HCPCS | facility | Exc tr-ext mal+marg >4 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 11620 | HCPCS | facility | Exc h-f-nk-sp mal+marg 0.5/< | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $583.61 | $1979.35 |
| 11623 | HCPCS | facility | Exc s/n/h/f/g mal+mrg 2.1-3 | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2920.0 | $2044.0 | $583.61 | $1979.35 |
| 11624 | HCPCS | facility | Exc s/n/h/f/g mal+mrg 3.1-4 | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 11643 | HCPCS | facility | Exc f/e/e/n/l mal+mrg 2.1-3 | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $583.61 | $1979.35 |
| 11644 | HCPCS | facility | Exc f/e/e/n/l mal+mrg 3.1-4 | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 19081 | HCPCS | facility | Bx breast 1st lesion strtctc | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2935.0 | $2054.5 | $625.24 | $1979.35 |
| 19083 | HCPCS | facility | Bx breast 1st lesion us imag | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2935.0 | $2054.5 | $625.24 | $1979.35 |
| 19085 | HCPCS | facility | Bx breast 1st lesion mr imag | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2935.0 | $2054.5 | $625.24 | $1979.35 |
| 20200 | HCPCS | facility | Muscle biopsy | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 20206 | HCPCS | facility | HC BIOPSY, MUSCLE, PERCUT NEEDLE | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2367.0 | $1656.9 | $625.24 | $1979.35 |
| 20220 | HCPCS | facility | Bone biopsy trocar/needle | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2384.0 | $1668.8 | $583.61 | $1979.35 |
| 20225 | HCPCS | facility | Bone biopsy trocar/needle | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2847.0 | $1992.9 | $1121.75 | $4303.61 |
| 20670 | HCPCS | facility | HC REMOVAL IMPLANT; SUPERFICIAL | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3164.0 | $2214.8 | $1121.75 | $1979.35 |
| 21011 | HCPCS | facility | Exc face les sc <2 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $583.61 | $1979.35 |
| 21012 | HCPCS | facility | Exc face les sbq 2 cm/> | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $583.61 | $1979.35 |
| 21013 | HCPCS | facility | Exc face tum deep < 2 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $583.61 | $1979.35 |
| 21550 | HCPCS | facility | Biopsy of neck/chest | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3431.0 | $2401.7 | $1121.75 | $1979.35 |
| 21555 | HCPCS | facility | Exc neck les sc < 3 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 21920 | HCPCS | facility | Biopsy soft tissue of back | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2201.0 | $1540.7 | $583.61 | $1979.35 |
| 21930 | HCPCS | facility | Exc back les sc < 3 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 22902 | HCPCS | facility | Exc abd les sc < 3 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 23065 | HCPCS | facility | Biopsy shoulder tissues | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $583.61 | $1979.35 |
| 23075 | HCPCS | facility | Exc shoulder les sc < 3 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 23931 | HCPCS | facility | Drainage of arm bursa | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2564.0 | $1794.8 | $725.58 | $4303.61 |
| 24065 | HCPCS | facility | Biopsy arm/elbow soft tissue | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $1979.35 |
| 24075 | HCPCS | facility | Exc arm/elbow les sc < 3 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 24200 | HCPCS | facility | HC REMOVE FB UPPER ARM | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $1600.0 | $1120.0 | $336.38 | $1979.35 |
| 25065 | HCPCS | facility | Biopsy forearm soft tissues | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $583.61 | $1979.35 |
| 25075 | HCPCS | facility | Exc forearm les sc < 3 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 25076 | HCPCS | facility | Exc forearm tum deep < 3 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 26011 | HCPCS | facility | Drainage of finger abscess | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2161.0 | $1512.7 | $725.58 | $1979.35 |
| 26115 | HCPCS | facility | Exc hand les sc < 1.5 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 26116 | HCPCS | facility | Exc hand tum deep < 1.5 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 26320 | HCPCS | facility | Removal of implant from hand | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $1979.35 |
| 27040 | HCPCS | facility | Biopsy of soft tissues | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2363.0 | $1654.1 | $583.61 | $1979.35 |
| 27041 | HCPCS | facility | Biopsy of soft tissues | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $583.61 | $4303.61 |
| 27323 | HCPCS | facility | Biopsy thigh soft tissues | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $583.61 | $1979.35 |
| 27613 | HCPCS | facility | Biopsy lower leg soft tissue | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2504.0 | $1752.8 | $583.61 | $1979.35 |
| 27618 | HCPCS | facility | Exc leg/ankle tum < 3 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 28001 | HCPCS | facility | Drainage of bursa of foot | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $4373.0 | $3061.1 | $725.58 | $1979.35 |
| 28043 | HCPCS | facility | Exc foot/toe tum sc < 1.5 cm | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3845.0 | $2691.5 | $1121.75 | $4303.61 |
| 28192 | HCPCS | facility | Removal of foot foreign body | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 28193 | HCPCS | facility | HC REMOVAL FOREIGN BODY; FOOT, COMPLICATED | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3550.0 | $2485.0 | $583.61 | $6735.22 |
| 32400 | HCPCS | facility | HC BIOPSY, PLEURA, PERCUTANEOUS NEEDLE | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3203.0 | $2242.1 | $713.56 | $1979.35 |
| 37609 | HCPCS | facility | Temporal artery procedure | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 38220 | HCPCS | facility | Bone marrow aspiration | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2458.0 | $1720.6 | $270.4 | $1979.35 |
| 38221 | HCPCS | facility | Bone marrow biopsy | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2367.0 | $1656.9 | $270.4 | $1979.35 |
| 38505 | HCPCS | facility | HC BIOPSY/EXCISION OF LYMPH NODE | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2974.0 | $2081.8 | $625.24 | $1979.35 |
| 47000 | HCPCS | facility | HC LIVER BIOPSY, NEEDLE; PERCUT | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2367.0 | $1656.9 | $713.56 | $1979.35 |
| 48102 | HCPCS | facility | HC BIOPSY PANCREAS, PERCUTANEOUS NEEDLE | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3203.0 | $2242.1 | $713.56 | $1979.35 |
| 49180 | HCPCS | facility | Biopsy abdominal mass | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2367.0 | $1656.9 | $713.56 | $1979.35 |
| 49405 | HCPCS | facility | HC IMAGE-GUID FLUID COLL DRAIN BY CATH; VISCERAL, PERCUT | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $5751.0 | $4025.7 | $1118.54 | $4303.61 |
| 49406 | HCPCS | facility | HC IMAGE-GUIDED FLUID COLLECTION DRAINAGE BY CATH; PERI/RETRO, PERCUT | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3203.0 | $2242.1 | $1118.54 | $4303.61 |
| 49407 | HCPCS | facility | Image cath fluid trns/vgnl | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $922.87 | $1979.35 |
| 50200 | HCPCS | facility | HC RENAL BIOPSY; PERCUT, NEEDLE | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2367.0 | $1656.9 | $713.56 | $1979.35 |
| 54100 | HCPCS | facility | Biopsy of penis | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $1121.75 | $1979.35 |
| 54800 | HCPCS | facility | Biopsy of epididymis | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $345.52 | $1979.35 |
| 55100 | HCPCS | facility | Drainage of scrotum abscess | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $2367.0 | $1656.9 | $725.58 | $1979.35 |
| 62269 | HCPCS | facility | Needle biopsy spinal cord | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | n/a | n/a | $713.56 | $1979.35 |
| 69005 | HCPCS | facility | Drain external ear lesion | $1572.96 | $1979.35 | $-406.39 | 0.79 | 11 | 1 | $3062.0 | $2143.4 | $725.58 | $1979.35 |
| 93603 | HCPCS | facility | Right ventricular recording | $1051.31 | $1459.16 | $-407.85 | 0.72 | 10 | 1 | n/a | n/a | $705.36 | $2856.59 |
| 93615 | HCPCS | facility | Esophageal recording | $1051.31 | $1459.16 | $-407.85 | 0.72 | 10 | 1 | n/a | n/a | $705.36 | $2856.59 |
| 93616 | HCPCS | facility | Esophageal recording | $1051.31 | $1459.16 | $-407.85 | 0.72 | 10 | 1 | n/a | n/a | $705.36 | $2856.59 |
| 93618 | HCPCS | facility | Heart rhythm pacing | $1051.31 | $1459.16 | $-407.85 | 0.72 | 11 | 1 | n/a | n/a | $705.36 | $1805.48 |
| 93642 | HCPCS | facility | Electrophysiology evaluation | $1051.31 | $1459.16 | $-407.85 | 0.72 | 10 | 1 | $3194.0 | $2235.8 | $705.36 | $2856.59 |
| 43772 | HCPCS | facility | Lap rmvl gastr adj device | $4210.95 | $4620.58 | $-409.63 | 0.91 | 8 | 1 | n/a | n/a | $994.43 | $4620.58 |
| D2650 | HCPCS | facility | Inlay composite/resin one su | $361.43 | $774.78 | $-413.35 | 0.47 | 3 | 1 | n/a | n/a | $253.65 | $774.78 |
| 41250 | HCPCS | facility | HC REPAIR TONGUE LACERATION | $121.77 | $535.38 | $-413.61 | 0.23 | 11 | 1 | $248.0 | $173.6 | $78.09 | $4303.61 |
| 68200 | HCPCS | facility | Treat eyelid by injection | $121.77 | $535.38 | $-413.61 | 0.23 | 10 | 1 | n/a | n/a | $48.41 | $628.0 |
| 95905 | HCPCS | facility | Motor &/ sens nrve cndj test | $121.77 | $535.38 | $-413.61 | 0.23 | 10 | 1 | n/a | n/a | $43.11 | $619.33 |
| 64617 | HCPCS | facility | Chemodener muscle larynx emg | $431.12 | $845.96 | $-414.84 | 0.51 | 11 | 1 | n/a | n/a | $283.01 | $1151.97 |
| 31649 | HCPCS | facility | Bronchial valve remov addl | $1714.33 | $2133.11 | $-418.78 | 0.80 | 10 | 1 | n/a | n/a | $763.88 | $2133.11 |
| 22505 | HCPCS | facility | Manipulation of spine | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $1039.07 | $4303.61 |
| 23505 | HCPCS | facility | Treat clavicle fracture | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $546.74 | $1927.09 |
| 23575 | HCPCS | facility | HC TREAT SHOULDER BLADE FX | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $1755.0 | $1228.5 | $211.26 | $1927.09 |
| 23655 | HCPCS | facility | HC CL TX SHOULDER DISL W/MANIP | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $1039.07 | $1927.09 |
| 23665 | HCPCS | facility | HC TREAT DISLOCATION/FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $398.86 | $4303.61 |
| 23675 | HCPCS | facility | HC TREAT DISLOCATION/FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $133.65 | $4303.61 |
| 23700 | HCPCS | facility | Fixation of shoulder | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $1039.07 | $1927.09 |
| 24300 | HCPCS | facility | Manipulate elbow w/anesth | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $1039.07 | $4303.61 |
| 24505 | HCPCS | facility | HC CL TX SHAFT FX W/MANIP | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $619.0 | $433.3 | $133.65 | $1927.09 |
| 24535 | HCPCS | facility | HC TREAT HUMERUS FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $818.0 | $572.6 | $211.26 | $1927.09 |
| 24565 | HCPCS | facility | HC TREAT HUMERUS FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $226.0 | $158.2 | $133.65 | $4303.61 |
| 24577 | HCPCS | facility | HC TREAT HUMERUS FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $818.0 | $572.6 | $133.65 | $1927.09 |
| 24605 | HCPCS | facility | HC TX ELBOW DISLOC W/ANES | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2022.0 | $1415.4 | $1039.07 | $4303.61 |
| 24655 | HCPCS | facility | HC OPEN TX RADIUS FX | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $211.26 | $1927.09 |
| 24675 | HCPCS | facility | HC TREAT ULNAR FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $133.65 | $1927.09 |
| 25505 | HCPCS | facility | HC CL TX RADIAL SHAFT FX W/MAN | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $398.86 | $1927.09 |
| 25520 | HCPCS | facility | HC CLTX RADIAL SHAFT FX/CLTX DISLOC DISTAL RAIOULNAR JOINT | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $3818.0 | $2672.6 | $211.26 | $4303.61 |
| 25565 | HCPCS | facility | HC CL TX RADIUS/ULNA FX | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $211.26 | $4303.61 |
| 25605 | HCPCS | facility | HC CL TX COLLES FX | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $398.86 | $1927.09 |
| 25624 | HCPCS | facility | HC CL TX WRIST FX W/MANIP | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $398.86 | $4303.61 |
| 25635 | HCPCS | facility | HC CLOSED TX CARPAL BONE FRACTURE; W/MANIPULATION, EA BONE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2293.0 | $1605.1 | $133.65 | $1927.09 |
| 26340 | HCPCS | facility | Manipulate finger w/anesth | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $211.26 | $1927.09 |
| 26645 | HCPCS | facility | HC TREAT THUMB FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $672.0 | $470.4 | $211.26 | $1927.09 |
| 26675 | HCPCS | facility | Treat hand dislocation | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $133.65 | $4303.61 |
| 26705 | HCPCS | facility | Treat knuckle dislocation | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $133.65 | $4303.61 |
| 26742 | HCPCS | facility | HC TREAT FINGER FRACTURE, EACH | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $133.65 | $4303.61 |
| 27238 | HCPCS | facility | Treat thigh fracture | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $211.26 | $1927.09 |
| 27252 | HCPCS | facility | HC TX HIP DISLOCATION | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2022.0 | $1415.4 | $546.74 | $4303.61 |
| 27257 | HCPCS | facility | HC TREAT HIP DISLOCATION | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2263.0 | $1584.1 | $546.74 | $4303.61 |
| 27266 | HCPCS | facility | HC TX HIP DISLOCATION | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2133.0 | $1493.1 | $1039.07 | $1927.09 |
| 27275 | HCPCS | facility | Manipulation of hip joint | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $1039.07 | $4303.61 |
| 27503 | HCPCS | facility | Treatment of thigh fracture | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $133.65 | $4303.61 |
| 27510 | HCPCS | facility | HC TREATMENT OF THIGH FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $806.0 | $564.2 | $211.26 | $1927.09 |
| 27517 | HCPCS | facility | Treat thigh fx growth plate | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $133.65 | $1927.09 |
| 27552 | HCPCS | facility | Treat knee dislocation | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $1039.07 | $1927.09 |
| 27570 | HCPCS | facility | Fixation of knee joint | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $1039.07 | $1927.09 |
| 27781 | HCPCS | facility | HC TX FIBULA FX | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2430.0 | $1701.0 | $546.74 | $1927.09 |
| 27810 | HCPCS | facility | HC TREATMENT OF ANKLE FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2916.0 | $2041.2 | $133.65 | $1927.09 |
| 27818 | HCPCS | facility | HC TREATMENT OF ANKLE FRACTURE | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2430.0 | $1701.0 | $398.86 | $1927.09 |
| 27842 | HCPCS | facility | HC CLOSED TX ANKLE DISLOCATION | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | $2022.0 | $1415.4 | $1039.07 | $1927.09 |
| 28455 | HCPCS | facility | Treat midfoot fracture each | $1501.88 | $1927.09 | $-425.21 | 0.78 | 11 | 1 | n/a | n/a | $131.74 | $1927.09 |
| 67405 | HCPCS | facility | Explore/drain eye socket | $2419.84 | $2849.29 | $-429.45 | 0.85 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 67413 | HCPCS | facility | Explore/treat eye socket | $2419.84 | $2849.29 | $-429.45 | 0.85 | 11 | 1 | n/a | n/a | $1904.06 | $8915.56 |
| 67900 | HCPCS | facility | Repair brow defect | $2419.84 | $2849.29 | $-429.45 | 0.85 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 67973 | HCPCS | facility | Reconstruction of eyelid | $2419.84 | $2849.29 | $-429.45 | 0.85 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68320 | HCPCS | facility | Revise/graft eyelid lining | $2419.84 | $2849.29 | $-429.45 | 0.85 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68328 | HCPCS | facility | Revise/graft eyelid lining | $2419.84 | $2849.29 | $-429.45 | 0.85 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68770 | HCPCS | facility | Close tear system fistula | $2419.84 | $2849.29 | $-429.45 | 0.85 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| J9600 | HCPCS | facility | Porfimer sodium injection | $23789.46 | $24228.42 | $-438.96 | 0.98 | 11 | 1 | n/a | n/a | $23308.66 | $26588.22 |
| 36511 | HCPCS | facility | Apheresis wbc | $1426.02 | $1866.49 | $-440.47 | 0.76 | 10 | 1 | n/a | n/a | $950.65 | $3474.53 |
| 36512 | HCPCS | facility | Apheresis rbc | $1426.02 | $1866.49 | $-440.47 | 0.76 | 10 | 1 | n/a | n/a | $950.65 | $3474.53 |
| 36514 | HCPCS | facility | Apheresis plasma | $1426.02 | $1866.49 | $-440.47 | 0.76 | 10 | 1 | n/a | n/a | $950.65 | $3474.53 |
| 38206 | HCPCS | facility | Harvest auto stem cells | $1426.02 | $1866.49 | $-440.47 | 0.76 | 11 | 1 | n/a | n/a | $950.65 | $1866.49 |
| 38242 | HCPCS | facility | Transplt allo lymphocytes | $1426.02 | $1866.49 | $-440.47 | 0.76 | 11 | 1 | n/a | n/a | $950.65 | $8915.56 |
| 11106 | HCPCS | facility | HC INCISIONAL BIOPSY OF SKIN; SINGLE LESION | $443.845 | $885.74 | $-441.895 | 0.50 | 10 | 1 | $918.0 | $642.6 | $106.96 | $885.74 |
| J0600 | HCPCS | facility | Edetate calcium disodium inj | $5965.48 | $6408.38 | $-442.9 | 0.93 | 13 | 1 | n/a | n/a | $5594.42 | $6454.57 |
| C8006 | HCPCS | facility | Inst pleu-perit shnt w pump | $7312.75 | $7758.53 | $-445.78 | 0.94 | 1 | 1 | n/a | n/a | $7312.75 | $7758.53 |
| 1019T | HCPCS | facility | Lymphovenous bypass per xtr | $7500.65 | $7957.89 | $-457.24 | 0.94 | 1 | 1 | n/a | n/a | $7500.65 | $7957.89 |
| 61791 | HCPCS | facility | Treat trigeminal tract | $1881.74 | $2340.24 | $-458.5 | 0.80 | 11 | 1 | n/a | n/a | $856.68 | $6735.22 |
| 62292 | HCPCS | facility | Injection into disk lesion | $1881.74 | $2340.24 | $-458.5 | 0.80 | 11 | 1 | n/a | n/a | $565.75 | $6735.22 |
| 63746 | HCPCS | facility | Removal of spinal shunt | $1881.74 | $2340.24 | $-458.5 | 0.80 | 11 | 1 | n/a | n/a | $856.68 | $4303.61 |
| 96138 | HCPCS | facility | Psycl/nrpsyc tech 1st | $76.06 | $535.38 | $-459.32 | 0.14 | 10 | 1 | n/a | n/a | $19.63 | $535.38 |
| 55870 | HCPCS | facility | Electroejaculation | $638.15 | $1103.83 | $-465.68 | 0.58 | 10 | 1 | n/a | n/a | $234.09 | $1749.92 |
| 56605 | HCPCS | facility | Biopsy of vulva/perineum | $638.15 | $1103.83 | $-465.68 | 0.58 | 11 | 1 | $1110.0 | $777.0 | $234.09 | $1151.97 |
| 57100 | HCPCS | facility | Biopsy of vagina | $638.15 | $1103.83 | $-465.68 | 0.58 | 11 | 1 | $1262.0 | $883.4 | $449.6 | $1805.48 |
| 57421 | HCPCS | facility | Exam/biopsy of vag w/scope | $638.15 | $1103.83 | $-465.68 | 0.58 | 11 | 1 | $741.0 | $518.7 | $234.09 | $1151.97 |
| 57500 | HCPCS | facility | Biopsy of cervix | $638.15 | $1103.83 | $-465.68 | 0.58 | 11 | 1 | $1110.0 | $777.0 | $449.6 | $1805.48 |
| 57505 | HCPCS | facility | Endocervical curettage | $638.15 | $1103.83 | $-465.68 | 0.58 | 11 | 1 | $1110.0 | $777.0 | $449.6 | $1805.48 |
| 58974 | HCPCS | facility | Transfer of embryo | $638.15 | $1103.83 | $-465.68 | 0.58 | 11 | 1 | n/a | n/a | $234.09 | $1151.97 |
| 59000 | HCPCS | facility | Amniocentesis diagnostic | $638.15 | $1103.83 | $-465.68 | 0.58 | 11 | 1 | $1270.0 | $889.0 | $234.09 | $1151.97 |
| 59015 | HCPCS | facility | Chorion biopsy | $638.15 | $1103.83 | $-465.68 | 0.58 | 11 | 1 | $1110.0 | $777.0 | $234.09 | $1151.97 |
| P9026 | HCPCS | facility | Cryo fib comp path redu each | $81.53 | $549.28 | $-467.75 | 0.15 | 9 | 1 | n/a | n/a | $79.09 | $549.28 |
| 59612 | HCPCS | facility | Vbac delivery only | $3409.27 | $3879.52 | $-470.25 | 0.88 | 10 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 27325 | HCPCS | facility | Neurectomy hamstring | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 27326 | HCPCS | facility | Neurectomy popliteal | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 28035 | HCPCS | facility | Decompression of tibia nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $6735.22 |
| 28055 | HCPCS | facility | Neurectomy foot | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 61790 | HCPCS | facility | Treat trigeminal nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $6735.22 |
| 63600 | HCPCS | facility | Remove spinal cord lesion | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64708 | HCPCS | facility | Revise arm/leg nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64712 | HCPCS | facility | Revision of sciatic nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64713 | HCPCS | facility | Revision of arm nerve(s) | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64714 | HCPCS | facility | Revise low back nerve(s) | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64716 | HCPCS | facility | Revision of cranial nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64718 | HCPCS | facility | Revise ulnar nerve at elbow | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64719 | HCPCS | facility | Revise ulnar nerve at wrist | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64721 | HCPCS | facility | Carpal tunnel surgery | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | $4817.0 | $3371.9 | $1344.72 | $4303.61 |
| 64732 | HCPCS | facility | Incision of brow nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64734 | HCPCS | facility | Incision of cheek nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64736 | HCPCS | facility | Incision of chin nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64738 | HCPCS | facility | Incision of jaw nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64740 | HCPCS | facility | Incision of tongue nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64742 | HCPCS | facility | Incision of facial nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64744 | HCPCS | facility | Incise nerve back of head | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64746 | HCPCS | facility | Incise diaphragm nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64763 | HCPCS | facility | Incise hip/thigh nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $6735.22 |
| 64771 | HCPCS | facility | Sever cranial nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64772 | HCPCS | facility | Incision of spinal nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64774 | HCPCS | facility | Remove skin nerve lesion | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64776 | HCPCS | facility | Remove digit nerve lesion | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $6735.22 |
| 64782 | HCPCS | facility | Remove limb nerve lesion | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $6735.22 |
| 64784 | HCPCS | facility | Remove nerve lesion | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $6735.22 |
| 64788 | HCPCS | facility | Remove skin nerve lesion | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $6735.22 |
| 64790 | HCPCS | facility | Removal of nerve lesion | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $6735.22 |
| 64795 | HCPCS | facility | Biopsy of nerve | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64802 | HCPCS | facility | Sympathectomy cervical | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 64820 | HCPCS | facility | Sympathectomy digital artery | $1865.69 | $2340.24 | $-474.55 | 0.80 | 11 | 1 | n/a | n/a | $1344.72 | $4303.61 |
| 72285 | HCPCS | facility | Discography cerv/thor spine | $1865.69 | $2340.24 | $-474.55 | 0.80 | 10 | 1 | n/a | n/a | $1730.97 | $5610.03 |
| 72295 | HCPCS | facility | HC DISKOGRAPHY, LUMBER S&I | $1865.69 | $2340.24 | $-474.55 | 0.80 | 10 | 1 | $5855.0 | $4098.5 | $1730.97 | $5610.03 |
| A9611 | HCPCS | facility | Flurpiridaz f18, diag, 1 mci | $53.69 | $530.0 | $-476.31 | 0.10 | 5 | 1 | n/a | n/a | $53.69 | $570.0 |
| 51101 | HCPCS | facility | Drain bladder by trocar/cath | $552.31 | $1029.15 | $-476.84 | 0.54 | 11 | 1 | n/a | n/a | $81.99 | $1043.83 |
| 67311 | HCPCS | facility | Revise eye muscle | $2371.38 | $2849.29 | $-477.91 | 0.83 | 11 | 1 | n/a | n/a | $1797.67 | $6735.22 |
| 67314 | HCPCS | facility | Revise eye muscle | $2371.38 | $2849.29 | $-477.91 | 0.83 | 11 | 1 | n/a | n/a | $1797.67 | $6735.22 |
| 67316 | HCPCS | facility | Revise two eye muscles | $2371.38 | $2849.29 | $-477.91 | 0.83 | 11 | 1 | n/a | n/a | $1797.67 | $6735.22 |
| 67318 | HCPCS | facility | Revise eye muscle(s) | $2371.38 | $2849.29 | $-477.91 | 0.83 | 11 | 1 | n/a | n/a | $1797.67 | $6735.22 |
| 67343 | HCPCS | facility | Release eye tissue | $2371.38 | $2849.29 | $-477.91 | 0.83 | 11 | 1 | n/a | n/a | $1797.67 | $4303.61 |
| J9200 | HCPCS | facility | Floxuridine injection | $3641.45 | $4128.02 | $-486.57 | 0.88 | 10 | 1 | n/a | n/a | $70.13 | $4254.92 |
| 54437 | HCPCS | facility | Repair corporeal tear | $3732.66 | $4224.5 | $-491.84 | 0.88 | 10 | 1 | n/a | n/a | $1506.42 | $4303.61 |
| 43216 | HCPCS | facility | Esophagoscopy lesion removal | $1805.48 | $2299.71 | $-494.23 | 0.79 | 11 | 1 | n/a | n/a | $1696.3 | $2397.74 |
| 43830 | HCPCS | facility | Place gastrostomy tube | $1805.48 | $2299.71 | $-494.23 | 0.79 | 11 | 1 | n/a | n/a | $1696.3 | $2397.74 |
| D2710 | HCPCS | facility | Crown resin-based indirect | $278.8 | $774.78 | $-495.98 | 0.36 | 3 | 1 | n/a | n/a | $195.34 | $774.78 |
| D2712 | HCPCS | facility | Crown 3/4 resin-based compos | $278.8 | $774.78 | $-495.98 | 0.36 | 3 | 1 | n/a | n/a | $195.34 | $774.78 |
| D2799 | HCPCS | facility | Provisional crown | $278.8 | $774.78 | $-495.98 | 0.36 | 3 | 1 | n/a | n/a | $195.34 | $774.78 |
| 86975 | HCPCS | facility | Rbc serum pretx incubj drugs | $36.73 | $535.38 | $-498.65 | 0.07 | 9 | 1 | n/a | n/a | $34.3 | $675.16 |
| 21423 | HCPCS | facility | Treat mouth roof fracture | $6590.205 | $7094.6 | $-504.395 | 0.93 | 8 | 1 | n/a | n/a | $898.81 | $7094.6 |
| 90870 | HCPCS | facility | Electroconvulsive therapy | $520.63 | $1029.15 | $-508.52 | 0.51 | 11 | 1 | n/a | n/a | $438.65 | $1151.97 |
| 91035 | HCPCS | facility | G-esoph reflx tst w/electrod | $520.63 | $1029.15 | $-508.52 | 0.51 | 10 | 1 | n/a | n/a | $302.6 | $1247.34 |
| 95938 | HCPCS | facility | Somatosensory testing | $520.63 | $1029.15 | $-508.52 | 0.51 | 10 | 1 | n/a | n/a | $184.02 | $1247.34 |
| D7280 | HCPCS | facility | Exposure of unerupted tooth | $265.1 | $774.78 | $-509.68 | 0.34 | 2 | 1 | n/a | n/a | $265.1 | $774.78 |
| 47579 | HCPCS | facility | Laparoscope proc biliary | $6735.22 | $7245.25 | $-510.03 | 0.93 | 5 | 1 | n/a | n/a | $6445.19 | $7245.25 |
| 37248 | HCPCS | facility | HC TRLUML BALO ANGIOP 1ST VEIN | $6308.75 | $6821.04 | $-512.29 | 0.92 | 10 | 1 | $11796.0 | $8257.2 | $5350.17 | $6821.04 |
| 50384 | HCPCS | facility | Remove ureter stent percut | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1131.27 | $6735.22 |
| 51045 | HCPCS | facility | Incise bladder/drain ureter | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $509.76 | $6735.22 |
| 52260 | HCPCS | facility | Cystoscopy and treatment | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1131.27 | $4303.61 |
| 52270 | HCPCS | facility | Cystoscopy & revise urethra | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1131.27 | $4303.61 |
| 52281 | HCPCS | facility | Cystoscopy and treatment | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1131.27 | $4303.61 |
| 52287 | HCPCS | facility | Cystoscopy chemodenervation | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1131.27 | $4303.61 |
| 52310 | HCPCS | facility | Cystoscopy and treatment | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1131.27 | $4303.61 |
| 53060 | HCPCS | facility | Drainage of urethra abscess | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1540.12 | $4303.61 |
| 53085 | HCPCS | facility | Drainage of urinary leakage | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1540.12 | $6735.22 |
| 53265 | HCPCS | facility | Treatment of urethra lesion | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1540.12 | $4303.61 |
| 54001 | HCPCS | facility | Slitting of prepuce | $1989.5 | $2505.21 | $-515.71 | 0.79 | 11 | 1 | n/a | n/a | $1540.12 | $4303.61 |
| 74485 | HCPCS | facility | HC DILATION URETER/URETHRA, RADIO S&I | $1989.5 | $2505.21 | $-515.71 | 0.79 | 10 | 1 | $741.0 | $518.7 | $1131.27 | $5794.26 |
| 0697T | HCPCS | facility | Quan mr tis wo mri mlt orgn | $597.49 | $1114.97 | $-517.48 | 0.54 | 7 | 1 | n/a | n/a | $235.0 | $1114.97 |
| C1719 | HCPCS | facility | Brachytx, NS, Non-HDRIr-192 | $389.555 | $908.7 | $-519.145 | 0.43 | 10 | 1 | n/a | n/a | $348.42 | $908.7 |
| 11954 | HCPCS | facility | Tx contour defects >10.0 cc | $359.17 | $885.74 | $-526.57 | 0.41 | 11 | 1 | n/a | n/a | $85.75 | $1151.97 |
| 12046 | HCPCS | facility | Intmd rpr n-hf/genit20.1-30 | $359.17 | $885.74 | $-526.57 | 0.41 | 11 | 1 | n/a | n/a | $242.4 | $1151.97 |
| 15792 | HCPCS | facility | Chemical peel nonfacial | $359.17 | $885.74 | $-526.57 | 0.41 | 11 | 1 | n/a | n/a | $106.96 | $885.74 |
| 43756 | HCPCS | facility | Dx duod intub w/asp spec | $552.31 | $1086.97 | $-534.66 | 0.51 | 11 | 1 | n/a | n/a | $114.26 | $1086.97 |
| 43757 | HCPCS | facility | Dx duod intub w/asp specs | $552.31 | $1086.97 | $-534.66 | 0.51 | 11 | 1 | n/a | n/a | $114.26 | $1086.97 |
| 62194 | HCPCS | facility | Replace/irrigate catheter | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | n/a | n/a | $565.75 | $2340.24 |
| 62355 | HCPCS | facility | HC REMOVAL IMPLANT INTRATHECAL/EPI CATH | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | $4740.0 | $3318.0 | $856.68 | $2340.24 |
| 63610 | HCPCS | facility | Stimulation of spinal cord | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | n/a | n/a | $1344.72 | $2340.24 |
| 63661 | HCPCS | facility | HC REMOVE SPINAL NEUROSTIMULATOR ELECTRODE | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | $3749.0 | $2624.3 | $1511.08 | $2340.24 |
| 64605 | HCPCS | facility | Injection treatment of nerve | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | n/a | n/a | $1344.72 | $2340.24 |
| 64610 | HCPCS | facility | Injection treatment of nerve | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | n/a | n/a | $1344.72 | $2340.24 |
| 64633 | HCPCS | facility | Destroy cerv/thor facet jnt | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | $2963.0 | $2074.1 | $565.75 | $2340.24 |
| 64635 | HCPCS | facility | Destroy lumb/sac facet jnt | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | $4256.0 | $2979.2 | $856.68 | $2340.24 |
| 64702 | HCPCS | facility | Revise finger/toe nerve | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | n/a | n/a | $1344.72 | $2340.24 |
| 64704 | HCPCS | facility | Revise hand/foot nerve | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | n/a | n/a | $1344.72 | $2340.24 |
| 64722 | HCPCS | facility | Relieve pressure on nerve(s) | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | n/a | n/a | $1344.72 | $2340.24 |
| 64726 | HCPCS | facility | Release foot/toe nerve | $1805.48 | $2340.24 | $-534.76 | 0.77 | 11 | 1 | n/a | n/a | $1344.72 | $2340.24 |
| 58970 | HCPCS | facility | Retrieval of oocyte | $552.31 | $1103.83 | $-551.52 | 0.50 | 11 | 1 | n/a | n/a | $234.09 | $1103.83 |
| D2933 | HCPCS | facility | Prefab stainless steel crown | $215.88 | $774.78 | $-558.9 | 0.28 | 3 | 1 | n/a | n/a | $151.17 | $774.78 |
| D2934 | HCPCS | facility | Prefab steel crown primary | $215.88 | $774.78 | $-558.9 | 0.28 | 3 | 1 | n/a | n/a | $151.17 | $774.78 |
| 45520 | HCPCS | facility | HC PERIRECTAL INJ SCLEROSING SOLUTION PROLAPSE | $552.31 | $1114.51 | $-562.2 | 0.50 | 11 | 1 | $2397.0 | $1677.9 | $106.96 | $1114.51 |
| D4346 | HCPCS | facility | Scaling gingiv inflammation | $209.5 | $774.78 | $-565.28 | 0.27 | 2 | 1 | n/a | n/a | $209.5 | $774.78 |
| 31235 | HCPCS | facility | Nasal/sinus endoscopy dx | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $1352.05 | $2133.11 |
| 31237 | HCPCS | facility | Nasal/sinus endoscopy surg | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $1352.05 | $4303.61 |
| 31238 | HCPCS | facility | HC NASAL/SINUS ENDO, SURG; W CONTROL NASAL HEMORRHAGE | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | $4492.0 | $3144.4 | $1352.05 | $2133.11 |
| 31525 | HCPCS | facility | Dx laryngoscopy excl nb | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | $2859.0 | $2001.3 | $1352.05 | $2133.11 |
| 31526 | HCPCS | facility | Dx laryngoscopy w/oper scope | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $1352.05 | $4303.61 |
| 31530 | HCPCS | facility | HC OPERATIVE LARYNGOSCOPY | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | $3429.0 | $2400.3 | $1352.05 | $4303.61 |
| 31576 | HCPCS | facility | Laryngoscopy with biopsy | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $1352.05 | $4303.61 |
| 31622 | HCPCS | facility | Dx bronchoscope/wash | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | $1375.0 | $962.5 | $763.88 | $2133.11 |
| 31623 | HCPCS | facility | Dx bronchoscope/brush | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $763.88 | $2133.11 |
| 31624 | HCPCS | facility | Dx bronchoscope/lavage | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $763.88 | $2133.11 |
| 31625 | HCPCS | facility | Bronchoscopy w/biopsy(s) | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $763.88 | $4303.61 |
| 31635 | HCPCS | facility | Bronchoscopy w/fb removal | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $763.88 | $4303.61 |
| 31643 | HCPCS | facility | Diag bronchoscope/catheter | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $763.88 | $2133.11 |
| 31645 | HCPCS | facility | Bronchoscopy clear airways | $1565.86 | $2133.11 | $-567.25 | 0.73 | 11 | 1 | n/a | n/a | $763.88 | $2133.11 |
| 51720 | HCPCS | facility | HC BLADDER INSTILLATION OF ANTICARCINOGENIC AGENT | $264.64 | $835.67 | $-571.03 | 0.32 | 10 | 1 | $1230.0 | $861.0 | $232.32 | $936.78 |
| 65235 | HCPCS | facility | Remove foreign body from eye | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1129.46 | $4303.61 |
| 65265 | HCPCS | facility | Remove foreign body from eye | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1442.12 | $6735.22 |
| 65810 | HCPCS | facility | Drainage of eye | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 65815 | HCPCS | facility | Drainage of eye | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $4303.61 |
| 65850 | HCPCS | facility | Incision of eye | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 65870 | HCPCS | facility | Incise inner eye adhesions | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 65875 | HCPCS | facility | Incise inner eye adhesions | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 65920 | HCPCS | facility | Remove implant of eye | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $8915.56 |
| 66160 | HCPCS | facility | Glaucoma surgery | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $4303.61 |
| 66170 | HCPCS | facility | Glaucoma surgery | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 66172 | HCPCS | facility | Incision of eye | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 66184 | HCPCS | facility | Revision of aqueous shunt | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1129.46 | $4303.61 |
| 66625 | HCPCS | facility | Removal of iris | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $662.84 | $6735.22 |
| 66630 | HCPCS | facility | Removal of iris | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 66635 | HCPCS | facility | Removal of iris | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 66680 | HCPCS | facility | Repair iris & ciliary body | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 66682 | HCPCS | facility | Repair iris & ciliary body | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $4303.61 |
| 66700 | HCPCS | facility | Destruction ciliary body | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1129.46 | $4303.61 |
| 66711 | HCPCS | facility | Ciliary endoscopic ablation | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $4303.61 |
| 66825 | HCPCS | facility | Reposition intraocular lens | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 66830 | HCPCS | facility | Removal of lens lesion | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $662.84 | $6735.22 |
| 66840 | HCPCS | facility | Removal of lens material | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1129.46 | $6735.22 |
| 66940 | HCPCS | facility | Extraction of lens | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $662.84 | $8915.56 |
| 66982 | HCPCS | facility | Cataract surgery complex | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1730.47 | $4303.61 |
| 66983 | HCPCS | facility | Cataract surg w/iol 1 stage | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1730.47 | $4303.61 |
| 66984 | HCPCS | facility | Cataract surg w/iol 1 stage | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1730.47 | $4303.61 |
| 66985 | HCPCS | facility | Insert lens prosthesis | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1730.47 | $4303.61 |
| 66986 | HCPCS | facility | Exchange lens prosthesis | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1730.47 | $4303.61 |
| 67005 | HCPCS | facility | Partial removal of eye fluid | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1442.12 | $6735.22 |
| 67015 | HCPCS | facility | Release of eye fluid | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1727.73 | $3727.18 |
| 67025 | HCPCS | facility | Replace eye fluid | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1727.73 | $3727.18 |
| 67101 | HCPCS | facility | Repair detached retina crtx | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1442.12 | $6735.22 |
| 67110 | HCPCS | facility | Repair detached retina | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1442.12 | $6735.22 |
| 67120 | HCPCS | facility | Remove eye implant material | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1442.12 | $4303.61 |
| 68330 | HCPCS | facility | Revise eyelid lining | $2192.38 | $2765.81 | $-573.43 | 0.79 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 0479T | HCPCS | facility | Fxjl abl lsr 1st 100 sq cm | $310.78 | $885.74 | $-574.96 | 0.35 | 5 | 1 | n/a | n/a | $310.78 | $885.74 |
| 50590 | HCPCS | facility | Fragmenting of kidney stone | $3642.91 | $4224.5 | $-581.59 | 0.86 | 11 | 1 | $10511.0 | $7357.7 | $2838.29 | $8915.56 |
| D2394 | HCPCS | facility | Post >=4srfc resinbase cmpst | $192.46 | $774.78 | $-582.32 | 0.25 | 3 | 1 | n/a | n/a | $135.06 | $774.78 |
| C9796 | HCPCS | facility | Rpr intst excl anrect fist | $2742.39 | $3326.48 | $-584.09 | 0.82 | 3 | 1 | n/a | n/a | $2742.39 | $3326.48 |
| 43211 | HCPCS | facility | Esophagoscop mucosal resect | $1712.015 | $2299.71 | $-587.695 | 0.74 | 10 | 1 | n/a | n/a | $623.45 | $2299.71 |
| 43233 | HCPCS | facility | Egd balloon dil esoph30 mm/> | $1712.015 | $2299.71 | $-587.695 | 0.74 | 10 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 52204 | HCPCS | facility | Cystoscopy w/biopsy(s) | $1908.86 | $2505.21 | $-596.35 | 0.76 | 11 | 1 | n/a | n/a | $1727.73 | $2505.21 |
| D2931 | HCPCS | facility | Prefab stnlss steel crown pe | $177.01 | $774.78 | $-597.77 | 0.23 | 3 | 1 | n/a | n/a | $123.88 | $774.78 |
| 32556 | HCPCS | facility | HC INSERT CATH PLEURA W/O IMAGE | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | $3975.0 | $2782.5 | $412.39 | $2299.71 |
| 43191 | HCPCS | facility | Esophagoscopy rigid trnso dx | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $623.45 | $2299.71 |
| 43192 | HCPCS | facility | Esophagoscp rig trnso inject | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43193 | HCPCS | facility | Esophagoscp rig trnso biopsy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43194 | HCPCS | facility | Esophagoscp rig trnso rem fb | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43201 | HCPCS | facility | Esoph scope w/submucous inj | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 43202 | HCPCS | facility | Esophagoscopy flex biopsy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $623.45 | $2299.71 |
| 43204 | HCPCS | facility | Esoph scope w/sclerosis inj | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $623.45 | $2299.71 |
| 43205 | HCPCS | facility | Esophagus endoscopy/ligation | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 43206 | HCPCS | facility | Esoph optical endomicroscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43213 | HCPCS | facility | Esophagoscopy retro balloon | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $483.05 | $4303.61 |
| 43214 | HCPCS | facility | Esophagosc dilate balloon 30 | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 43215 | HCPCS | facility | Esophagoscopy flex remove fb | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 43217 | HCPCS | facility | Esophagoscopy snare les remv | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 43220 | HCPCS | facility | Esophagoscopy balloon <30mm | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 43226 | HCPCS | facility | Esoph endoscopy dilation | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 43227 | HCPCS | facility | Esophagoscopy control bleed | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43231 | HCPCS | facility | Esophagoscop ultrasound exam | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43232 | HCPCS | facility | Esophagoscopy w/us needle bx | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43237 | HCPCS | facility | Endoscopic us exam esoph | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 43238 | HCPCS | facility | Egd us fine needle bx/aspir | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $2299.71 |
| 43241 | HCPCS | facility | Egd tube/cath insertion | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $623.45 | $4303.61 |
| 43242 | HCPCS | facility | Egd us fine needle bx/aspir | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43243 | HCPCS | facility | Egd injection varices | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $623.45 | $4303.61 |
| 43244 | HCPCS | facility | Egd varices ligation | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43245 | HCPCS | facility | Egd dilate stricture | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | $4359.0 | $3051.3 | $926.78 | $4303.61 |
| 43246 | HCPCS | facility | Egd place gastrostomy tube | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | $3333.0 | $2333.1 | $926.78 | $4303.61 |
| 43249 | HCPCS | facility | Esoph egd dilation <30 mm | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | $3436.0 | $2405.2 | $926.78 | $2299.71 |
| 43250 | HCPCS | facility | Egd cautery tumor polyp | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43251 | HCPCS | facility | Egd remove lesion snare | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43253 | HCPCS | facility | Egd us transmural injxn/mark | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43254 | HCPCS | facility | Egd endo mucosal resection | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $623.45 | $2299.71 |
| 43255 | HCPCS | facility | Egd control bleeding any | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43259 | HCPCS | facility | Egd us exam duodenum/jejunum | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $4303.61 |
| 43270 | HCPCS | facility | Egd lesion ablation | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $926.78 | $6735.22 |
| 43453 | HCPCS | facility | Dilate esophagus | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $483.05 | $2299.71 |
| 44360 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $750.68 | $4303.61 |
| 44361 | HCPCS | facility | Small bowel endoscopy/biopsy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $750.68 | $4303.61 |
| 44363 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $750.68 | $4303.61 |
| 44364 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $1108.11 | $4303.61 |
| 44365 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $1108.11 | $2299.71 |
| 44366 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $1108.11 | $4303.61 |
| 44369 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $1108.11 | $4303.61 |
| 44372 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $1108.11 | $4303.61 |
| 44373 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $1108.11 | $4303.61 |
| 44376 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $750.68 | $2299.71 |
| 44377 | HCPCS | facility | Small bowel endoscopy/biopsy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $750.68 | $4303.61 |
| 44378 | HCPCS | facility | Small bowel endoscopy | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $1108.11 | $4303.61 |
| 44381 | HCPCS | facility | Small bowel endoscopy br/wa | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $750.68 | $8915.56 |
| 49423 | HCPCS | facility | Exchange drainage catheter | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | $3392.0 | $2374.4 | $1201.6 | $2299.71 |
| 49436 | HCPCS | facility | Embedded IP Cath Exit-Site | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | n/a | n/a | $1201.6 | $2299.71 |
| 49440 | HCPCS | facility | HC INSERT GASTROSTOMY TUBE, PERCUTANEOUS, FLUORO GUID INCL. CONT | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | $3266.0 | $2286.2 | $926.78 | $2299.71 |
| 49441 | HCPCS | facility | HC INSERT DUODENOSTOMY/JEJUMO TUBE, PERCUTANEOUS, FLUORO GUID, INCL CONT | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | $3266.0 | $2286.2 | $926.78 | $2299.71 |
| 49446 | HCPCS | facility | Change g-tube to g-j perc | $1696.3 | $2299.71 | $-603.41 | 0.74 | 11 | 1 | $3392.0 | $2374.4 | $926.78 | $2299.71 |
| D2390 | HCPCS | facility | Ant resin-based cmpst crown | $168.97 | $774.78 | $-605.81 | 0.22 | 3 | 1 | n/a | n/a | $118.59 | $774.78 |
| A9554 | HCPCS | facility | I125 iothalamate, dx | $42.75 | $649.64 | $-606.89 | 0.07 | 2 | 1 | n/a | n/a | $42.75 | $649.64 |
| 50432 | HCPCS | facility | HC PLMT NEPHR CATH,PERC,W/GUID&SI | $1897.49 | $2505.21 | $-607.72 | 0.76 | 10 | 1 | $4944.0 | $3460.8 | $1727.73 | $2505.21 |
| D2932 | HCPCS | facility | Prefabricated resin crown | $165.98 | $774.78 | $-608.8 | 0.21 | 2 | 1 | n/a | n/a | $165.98 | $774.78 |
| 15852 | HCPCS | facility | Dressing change not for burn | $274.76 | $885.74 | $-610.98 | 0.31 | 11 | 1 | n/a | n/a | $49.64 | $885.74 |
| 69728 | HCPCS | facility | Rmv ntr oi imp sktc esp>=100 | $3306.89 | $3921.32 | $-614.43 | 0.84 | 9 | 1 | n/a | n/a | $2976.66 | $6735.22 |
| D4341 | HCPCS | facility | Periodontal scaling & root | $158.2 | $774.78 | $-616.58 | 0.20 | 2 | 1 | n/a | n/a | $158.2 | $774.78 |
| D2393 | HCPCS | facility | Post 3 srfc resinbased cmpst | $157.26 | $774.78 | $-617.52 | 0.20 | 3 | 1 | n/a | n/a | $110.36 | $774.78 |
| D2930 | HCPCS | facility | Prefab stnlss steel crwn pri | $155.67 | $774.78 | $-619.11 | 0.20 | 3 | 1 | n/a | n/a | $109.58 | $774.78 |
| D4265 | HCPCS | facility | Bio mtrls to aid soft/os reg | $153.34 | $774.78 | $-621.44 | 0.20 | 2 | 1 | n/a | n/a | $153.34 | $774.78 |
| D2335 | HCPCS | facility | Resin 4/> surf or w incis an | $152.45 | $774.78 | $-622.33 | 0.20 | 3 | 1 | n/a | n/a | $106.99 | $774.78 |
| D2929 | HCPCS | facility | Prefab porc/ceram crown pri | $147.95 | $774.78 | $-626.83 | 0.19 | 2 | 1 | n/a | n/a | $147.95 | $774.78 |
| 33272 | HCPCS | facility | HC REMOVAL, SUBCUTANEOUS IMPLANTABLE DEFIBRILLATOR ELECTRODE | $3849.115 | $4478.55 | $-629.435 | 0.86 | 10 | 1 | $5434.0 | $3803.8 | $1683.13 | $4478.55 |
| 33273 | HCPCS | facility | HC REPOSITIONING, PREVIOUS IMPLANTED SUBCUT IMPLANT DEFIBRILLATOR ELECTRODE | $3849.115 | $4478.55 | $-629.435 | 0.86 | 10 | 1 | $5434.0 | $3803.8 | $1683.13 | $4478.55 |
| 54065 | HCPCS | facility | Destruction penis lesion(s) | $1840.34 | $2472.73 | $-632.39 | 0.74 | 11 | 1 | n/a | n/a | $1417.8 | $4303.61 |
| 56515 | HCPCS | facility | Destroy vulva lesion/s compl | $1840.34 | $2472.73 | $-632.39 | 0.74 | 11 | 1 | n/a | n/a | $1417.8 | $6735.22 |
| 32551 | HCPCS | facility | HC CHEST TUBE INSERTION | $1250.63 | $1886.54 | $-635.91 | 0.66 | 11 | 1 | $1895.5 | $1326.85 | $412.39 | $4303.61 |
| 32557 | HCPCS | facility | HC PLEURAL DRAINAGE, PERCUT, W/INSERTION INDWELLING CATH W/IMAG GUID | $1250.63 | $1886.54 | $-635.91 | 0.66 | 11 | 1 | $2568.0 | $1797.6 | $412.39 | $1886.54 |
| 36569 | HCPCS | facility | HC PICC INSETION, W/O PORT/PUMP, W/O IM GUID, 5 YEARS + | $1250.63 | $1886.54 | $-635.91 | 0.66 | 11 | 1 | $930.0 | $651.0 | $786.08 | $4303.61 |
| 36576 | HCPCS | facility | HC REPAIR CVAD, W/ SUBCUTANEOUS PORT/PUMP, CENTRAL/PERIPH INSERTION | $1250.63 | $1886.54 | $-635.91 | 0.66 | 11 | 1 | $2337.0 | $1635.9 | $786.08 | $1886.54 |
| 36580 | HCPCS | facility | HC RPL, NON-TNL CV CATH W/O P/P | $1250.63 | $1886.54 | $-635.91 | 0.66 | 11 | 1 | $2568.0 | $1797.6 | $786.08 | $4303.61 |
| 36584 | HCPCS | facility | HC REPL CMPL PICC, W/O PORT/PUMP, SAME VEIN ACCESS, IM GUID & RADIO S&I | $1250.63 | $1886.54 | $-635.91 | 0.66 | 11 | 1 | $2568.0 | $1797.6 | $786.08 | $4303.61 |
| 36596 | HCPCS | facility | HC MECHICAL REMOVAL INTERLUMINAL OBST MATERIAL CVD, DEVICE LUMEN | $1250.63 | $1886.54 | $-635.91 | 0.66 | 11 | 1 | $2348.0 | $1643.6 | $786.08 | $4303.61 |
| 36597 | HCPCS | facility | HC REPOSIT CV CATH W/FLUORO GUID | $1250.63 | $1886.54 | $-635.91 | 0.66 | 11 | 1 | $2568.0 | $1797.6 | $786.08 | $4303.61 |
| 75803 | HCPCS | facility | Lymph vessel x-ray arms/legs | $1250.63 | $1886.54 | $-635.91 | 0.66 | 10 | 1 | n/a | n/a | $322.04 | $4190.97 |
| 75822 | HCPCS | facility | HC VENOGRAPHY, EXTREMITY; BILAT | $1250.63 | $1886.54 | $-635.91 | 0.66 | 10 | 1 | $2568.0 | $1797.6 | $716.01 | $4401.31 |
| 0647T | HCPCS | facility | Insj gtube perq mag gastrpxy | $1658.81 | $2299.71 | $-640.9 | 0.72 | 3 | 1 | n/a | n/a | $1658.81 | $2299.71 |
| 0925T | HCPCS | facility | Rlcj skin pocket ccm-d pg | $1829.23 | $2472.73 | $-643.5 | 0.74 | 3 | 1 | n/a | n/a | $1829.23 | $2472.73 |
| 15011 | HCPCS | facility | HC HARVEST SKIN, SKIN CELL SUSP AUTOGRAFT; 1ST 25 SQ CM/LESS | $1829.23 | $2472.73 | $-643.5 | 0.74 | 3 | 1 | $4900.0 | $3430.0 | $1829.23 | $2472.73 |
| 15015 | HCPCS | facility | App skn cl ssp agrft t/a/l 1 | $1829.23 | $2472.73 | $-643.5 | 0.74 | 3 | 1 | $4900.0 | $3430.0 | $1829.23 | $2472.73 |
| 15017 | HCPCS | facility | App skn cll ssp f/n/g/hf 1st | $1829.23 | $2472.73 | $-643.5 | 0.74 | 3 | 1 | $4900.0 | $3430.0 | $1829.23 | $2472.73 |
| 49185 | HCPCS | facility | HC SCLEROTHERAPY FLUID COLLECT, PERCUT, INCL CNTRS/SCLE INJ, DX STUDY, W/IG | $1334.855 | $1979.35 | $-644.495 | 0.67 | 10 | 1 | $2367.0 | $1656.9 | $662.51 | $1979.35 |
| D2332 | HCPCS | facility | Resin three surfaces-anterio | $129.02 | $774.78 | $-645.76 | 0.17 | 3 | 1 | n/a | n/a | $90.52 | $774.78 |
| 36221 | HCPCS | facility | HC NON-SELECTIVE CATH PLACE, THORACIC AORTA, INCL. ANGIO CERVICO ARCH, IF PERFORM | $3137.85 | $3784.07 | $-646.22 | 0.83 | 11 | 1 | $6479.0 | $4535.3 | $2219.82 | $8915.56 |
| 36222 | HCPCS | facility | HC SEL CATH PLACE,CAROT/INNO ART,INCL ANG IP EXT CAROT,ANGIO CERVICL ARCH | $3137.85 | $3784.07 | $-646.22 | 0.83 | 11 | 1 | $5923.0 | $4146.1 | $2219.82 | $8915.56 |
| 36225 | HCPCS | facility | HC SEL CATH PLACE, SUBCLAV/INNO ART, INCL ANGIO IPSILAT VERT, INCL ANGIO | $3137.85 | $3784.07 | $-646.22 | 0.83 | 11 | 1 | $5923.0 | $4146.1 | $2219.82 | $8915.56 |
| 36251 | HCPCS | facility | HC INS CATH REN ART 1ST; UNILAT | $3137.85 | $3784.07 | $-646.22 | 0.83 | 11 | 1 | $9660.0 | $6762.0 | $2219.82 | $6735.22 |
| 36252 | HCPCS | facility | HC INS CATH REN ART 1ST; BILAT | $3137.85 | $3784.07 | $-646.22 | 0.83 | 11 | 1 | $9660.0 | $6762.0 | $2219.82 | $6735.22 |
| 36254 | HCPCS | facility | HC SUPERSELECT CATH PLACE RENAL ARTERY, FOR RENAL ANGIO; BILAT | $3137.85 | $3784.07 | $-646.22 | 0.83 | 11 | 1 | $9517.0 | $6661.9 | $2219.82 | $6735.22 |
| D2161 | HCPCS | facility | Amalgam 4 or > surfaces perm | $127.95 | $774.78 | $-646.83 | 0.17 | 3 | 1 | n/a | n/a | $89.74 | $774.78 |
| D2392 | HCPCS | facility | Post 2 srfc resinbased cmpst | $126.87 | $774.78 | $-647.91 | 0.16 | 3 | 1 | n/a | n/a | $88.71 | $774.78 |
| D3240 | HCPCS | facility | Pulpal therapy posterior pri | $125.8 | $774.78 | $-648.98 | 0.16 | 3 | 1 | n/a | n/a | $88.35 | $774.78 |
| 0891T | HCPCS | facility | Arhfcmrigtbs sbsq tx day | $3750.5 | $4399.49 | $-648.99 | 0.85 | 5 | 1 | n/a | n/a | $3750.5 | $4399.49 |
| 0892T | HCPCS | facility | Arhfcmrigtbs sbsq per tx day | $3750.5 | $4399.49 | $-648.99 | 0.85 | 5 | 1 | n/a | n/a | $3750.5 | $4399.49 |
| 0890T | HCPCS | facility | Arhfcmrigtbs 1st tx day | $3750.0 | $4399.49 | $-649.49 | 0.85 | 5 | 1 | n/a | n/a | $3750.0 | $4399.49 |
| J1412 | HCPCS | facility | Inj roctavian ml 2x10^13vc g | $11901.49 | $12553.71 | $-652.22 | 0.95 | 8 | 1 | n/a | n/a | $11554.69 | $13501.16 |
| 45020 | HCPCS | facility | Drainage of rectal abscess | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | $6149.0 | $4304.3 | $1278.85 | $4303.61 |
| 45108 | HCPCS | facility | Removal of anorectal lesion | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $4303.61 |
| 45160 | HCPCS | facility | Excision of rectal lesion | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 45171 | HCPCS | facility | Exc rect tum transanal part | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $4303.61 |
| 45190 | HCPCS | facility | Destruction rectal tumor | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $8915.56 |
| 45500 | HCPCS | facility | Repair of rectum | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $4303.61 |
| 45990 | HCPCS | facility | Surg dx exam anorectal | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1278.85 | $4303.61 |
| 46020 | HCPCS | facility | Placement of seton | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46045 | HCPCS | facility | Incision of rectal abscess | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $4303.61 |
| 46060 | HCPCS | facility | Incision of rectal abscess | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1278.85 | $4303.61 |
| 46080 | HCPCS | facility | Incision of anal sphincter | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1278.85 | $6735.22 |
| 46200 | HCPCS | facility | Removal of anal fissure | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $4303.61 |
| 46250 | HCPCS | facility | Remove ext hem groups 2+ | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46255 | HCPCS | facility | Remove int/ext hem 1 group | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46257 | HCPCS | facility | Remove in/ex hem grp & fiss | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46258 | HCPCS | facility | Remove in/ex hem grp w/fistu | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46260 | HCPCS | facility | Remove in/ex hem groups 2+ | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46261 | HCPCS | facility | Remove in/ex hem grps & fiss | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46262 | HCPCS | facility | Remove in/ex hem grps w/fist | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46270 | HCPCS | facility | Remove anal fist subq | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46275 | HCPCS | facility | Remove anal fist inter | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46280 | HCPCS | facility | Remove anal fist complex | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46700 | HCPCS | facility | Repair of anal stricture | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46753 | HCPCS | facility | Reconstruction of anus | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46754 | HCPCS | facility | Removal of suture from anus | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1278.85 | $4303.61 |
| 46917 | HCPCS | facility | Laser surgery anal lesions | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1417.8 | $4303.61 |
| 46945 | HCPCS | facility | Remove by ligat int hem grp | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| 46946 | HCPCS | facility | Remove by ligat int hem grps | $2669.73 | $3326.48 | $-656.75 | 0.80 | 11 | 1 | n/a | n/a | $1829.43 | $6735.22 |
| D3221 | HCPCS | facility | Gross pulpal debridement | $106.11 | $774.78 | $-668.67 | 0.14 | 3 | 1 | n/a | n/a | $74.42 | $774.78 |
| 0933T | HCPCS | facility | Tcat impl wrls l atr prs snr | $3216.41 | $3885.28 | $-668.87 | 0.83 | 3 | 1 | n/a | n/a | $3216.41 | $3885.28 |
| D2331 | HCPCS | facility | Resin two surfaces-anterior | $105.54 | $774.78 | $-669.24 | 0.14 | 3 | 1 | n/a | n/a | $74.05 | $774.78 |
| D2160 | HCPCS | facility | Amalgam three surfaces perma | $104.46 | $774.78 | $-670.32 | 0.13 | 3 | 1 | n/a | n/a | $73.27 | $774.78 |
| 93451 | HCPCS | facility | HC RIGHT HEART CATH | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $4668.0 | $3267.6 | $2649.52 | $4303.61 |
| 93452 | HCPCS | facility | Left hrt cath w/ventrclgrphy | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | n/a | n/a | $2649.52 | $4303.61 |
| 93453 | HCPCS | facility | HC COMBINED RT/LT HEART CATH INCL. INTRAPROC INJ LT VENTRICUL, S&I | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $8626.0 | $6038.2 | $2649.52 | $4303.61 |
| 93454 | HCPCS | facility | Coronary artery angio s&i | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $6677.0 | $4673.9 | $2649.52 | $4303.61 |
| 93455 | HCPCS | facility | Coronary art/grft angio s&i | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $7189.0 | $5032.3 | $2649.52 | $4303.61 |
| 93456 | HCPCS | facility | HC CORONARY ANGIO & RT HRT CATH | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $10964.0 | $7674.8 | $2649.52 | $4303.61 |
| 93457 | HCPCS | facility | HC CORONARY ART/GRFT ANGIO & RHC | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $11479.0 | $8035.3 | $2649.52 | $4303.61 |
| 93458 | HCPCS | facility | HC ANGIO & LFT HRT CATH W/WO VENT | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $13922.0 | $9745.4 | $2649.52 | $4303.61 |
| 93459 | HCPCS | facility | HC L HRT ART/GRFT ANGIO | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $14148.0 | $9903.6 | $2649.52 | $4303.61 |
| 93460 | HCPCS | facility | HC R&L HRT ART/VENTRICLE ANGIO | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $17328.0 | $12129.6 | $2649.52 | $4303.61 |
| 93461 | HCPCS | facility | HC R&L HRT ART/VENTR ANGIO & GRFT | $3213.86 | $3885.28 | $-671.42 | 0.83 | 11 | 1 | $15581.0 | $10906.7 | $2649.52 | $4303.61 |
| D3230 | HCPCS | facility | Pulpal therapy anterior prim | $102.37 | $774.78 | $-672.41 | 0.13 | 3 | 1 | n/a | n/a | $71.83 | $774.78 |
| 0869T | HCPCS | facility | Njx b1 sub mtrl hw fixj aug | $3244.61 | $3921.32 | $-676.71 | 0.83 | 3 | 1 | n/a | n/a | $3244.61 | $3921.32 |
| 25448 | HCPCS | facility | Arthrp ntrcrpl/crp/mtcrp ssp | $3244.61 | $3921.32 | $-676.71 | 0.83 | 5 | 1 | n/a | n/a | $3244.61 | $3921.32 |
| D3910 | HCPCS | facility | Isolation- tooth w rubb dam | $97.12 | $774.78 | $-677.66 | 0.13 | 2 | 1 | n/a | n/a | $97.12 | $774.78 |
| D2391 | HCPCS | facility | Post 1 srfc resinbased cmpst | $96.48 | $774.78 | $-678.3 | 0.12 | 3 | 1 | n/a | n/a | $67.74 | $774.78 |
| D3220 | HCPCS | facility | Therapeutic pulpotomy | $96.48 | $774.78 | $-678.3 | 0.12 | 3 | 1 | n/a | n/a | $67.74 | $774.78 |
| 52282 | HCPCS | facility | Cystoscopy implant stent | $3538.02 | $4224.5 | $-686.48 | 0.84 | 11 | 1 | n/a | n/a | $2737.09 | $8915.56 |
| D2150 | HCPCS | facility | Amalgam two surfaces permane | $86.35 | $774.78 | $-688.43 | 0.11 | 3 | 1 | n/a | n/a | $60.65 | $774.78 |
| D2330 | HCPCS | facility | Resin one surface-anterior | $82.62 | $774.78 | $-692.16 | 0.11 | 3 | 1 | n/a | n/a | $57.95 | $774.78 |
| 50386 | HCPCS | facility | Remove stent via transureth | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | n/a | n/a | $509.76 | $2505.21 |
| 50387 | HCPCS | facility | Change nephroureteral cath | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | $4458.0 | $3120.6 | $1201.6 | $2505.21 |
| 50434 | HCPCS | facility | Convert nephrostomy catheter | $1805.48 | $2505.21 | $-699.73 | 0.72 | 10 | 1 | $3225.0 | $2257.5 | $524.48 | $2505.21 |
| 50435 | HCPCS | facility | Exchange nephrostomy cath | $1805.48 | $2505.21 | $-699.73 | 0.72 | 10 | 1 | $2928.0 | $2049.6 | $1411.15 | $2505.21 |
| 50688 | HCPCS | facility | Change of ureter tube/stent | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | $5786.0 | $4050.2 | $1201.6 | $2505.21 |
| 51102 | HCPCS | facility | Drain bl w/cath insertion | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | $4030.0 | $2821.0 | $1409.54 | $2505.21 |
| 52265 | HCPCS | facility | Cystoscopy and treatment | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | n/a | n/a | $509.76 | $2505.21 |
| 53000 | HCPCS | facility | Incision of urethra | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | n/a | n/a | $1540.12 | $2505.21 |
| 53020 | HCPCS | facility | Incision of urethra | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | n/a | n/a | $1540.12 | $2505.21 |
| 53025 | HCPCS | facility | Incision of urethra | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | n/a | n/a | $1540.12 | $2505.21 |
| 53200 | HCPCS | facility | Biopsy of urethra | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | $3427.0 | $2398.9 | $1540.12 | $2505.21 |
| 53665 | HCPCS | facility | Dilation of urethra | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | n/a | n/a | $1540.12 | $2505.21 |
| 54150 | HCPCS | facility | Circumcision w/regionl block | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | n/a | n/a | $1696.84 | $2505.21 |
| 55250 | HCPCS | facility | Removal of sperm duct(s) | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | n/a | n/a | $1696.84 | $2505.21 |
| 55600 | HCPCS | facility | Incise sperm duct pouch | $1805.48 | $2505.21 | $-699.73 | 0.72 | 11 | 1 | n/a | n/a | $1696.84 | $2505.21 |
| 11762 | HCPCS | facility | Reconstruction of nail bed | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $4303.61 |
| 14000 | HCPCS | facility | Tis trnfr trunk 10 sq cm/< | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $4303.61 |
| 14001 | HCPCS | facility | Tis trnfr trunk 10.1-30sqcm | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 14020 | HCPCS | facility | Tis trnfr s/a/l 10 sq cm/< | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 14021 | HCPCS | facility | Tis trnfr s/a/l 10.1-30 sqcm | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 14040 | HCPCS | facility | HC ADJACENT TISS TRANS/REARNG F/C/C/M/N/A/G/H&F; DEFECT <=10 SQ CM | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | $5537.0 | $3875.9 | $1111.61 | $4303.61 |
| 14041 | HCPCS | facility | Tis trnfr f/c/c/m/n/a/g/h/f | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 14060 | HCPCS | facility | HC ADJ TISS TRANSFER OR REARRANGE, EYE/NOSE/LIPS; DEFECT 10 SQ CM OR < | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | $5637.0 | $3945.9 | $1111.61 | $6735.22 |
| 14061 | HCPCS | facility | Tis trnfr e/n/e/l10.1-30sqcm | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 14350 | HCPCS | facility | Filleted finger/toe flap | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15115 | HCPCS | facility | Epidrm a-grft face/nck/hf/g | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | $3999.0 | $2799.3 | $1111.61 | $6735.22 |
| 15220 | HCPCS | facility | Skin full graft sclp/arm/leg | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $4303.61 |
| 15240 | HCPCS | facility | HC FULL THICKNESS GRAFT | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | $2555.0 | $1788.5 | $1111.61 | $6735.22 |
| 15260 | HCPCS | facility | Skin full graft een & lips | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $4303.61 |
| 15570 | HCPCS | facility | Skin pedicle flap trunk | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15574 | HCPCS | facility | Pedcle fh/ch/ch/m/n/ax/g/h/f | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15576 | HCPCS | facility | Pedicle e/n/e/l/ntroral | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15620 | HCPCS | facility | Delay flap f/c/c/n/ax/g/h/f | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15630 | HCPCS | facility | Delay flap eye/nos/ear/lip | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15650 | HCPCS | facility | Transfer skin pedicle flap | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $8915.56 |
| 15736 | HCPCS | facility | Muscle-skin graft arm | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15740 | HCPCS | facility | Island pedicle flap graft | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $4303.61 |
| 15760 | HCPCS | facility | Composite skin graft | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15820 | HCPCS | facility | Revision of lower eyelid | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15821 | HCPCS | facility | Revision of lower eyelid | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15822 | HCPCS | facility | Revision of upper eyelid | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15823 | HCPCS | facility | Revision of upper eyelid | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15824 | HCPCS | facility | Removal of forehead wrinkles | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15878 | HCPCS | facility | Suction lipectomy upr extrem | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $2753.02 |
| 15936 | HCPCS | facility | Remove sacrum pressure sore | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 15937 | HCPCS | facility | Remove sacrum pressure sore | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15945 | HCPCS | facility | Remove hip pressure sore | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $498.62 | $6735.22 |
| 15956 | HCPCS | facility | Remove thigh pressure sore | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 20101 | HCPCS | facility | Explore wound chest | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1510.07 | $2472.73 |
| 20102 | HCPCS | facility | Explore wound abdomen | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | $3160.0 | $2212.0 | $1510.07 | $2472.73 |
| 25929 | HCPCS | facility | Amputation follow-up surgery | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 33222 | HCPCS | facility | HC RELOCATION POCKET PACEMAKER | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | $2725.0 | $1907.5 | $1111.61 | $2472.73 |
| 33223 | HCPCS | facility | HC RELOCATE POCKET FOR DEFIB | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | $2555.0 | $1788.5 | $1111.61 | $2472.73 |
| 43887 | HCPCS | facility | Remove gastric port open | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1111.61 | $4303.61 |
| 46910 | HCPCS | facility | Destruction anal lesion(s) | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1417.8 | $2472.73 |
| 54055 | HCPCS | facility | Destruction penis lesion(s) | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1417.8 | $2472.73 |
| 54057 | HCPCS | facility | Laser surg penis lesion(s) | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1417.8 | $2472.73 |
| 54060 | HCPCS | facility | Excision of penis lesion(s) | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1417.8 | $2472.73 |
| 56501 | HCPCS | facility | Destroy vulva lesions sim | $1771.32 | $2472.73 | $-701.41 | 0.72 | 11 | 1 | n/a | n/a | $1417.8 | $2472.73 |
| D2140 | HCPCS | facility | Amalgam one surface permanen | $67.18 | $774.78 | $-707.6 | 0.09 | 3 | 1 | n/a | n/a | $47.13 | $774.78 |
| 43651 | HCPCS | facility | Laparoscopy vagus nerve | $6534.54 | $7245.25 | $-710.71 | 0.90 | 11 | 1 | n/a | n/a | $5121.39 | $33588.83 |
| 43652 | HCPCS | facility | Laparoscopy vagus nerve | $6534.54 | $7245.25 | $-710.71 | 0.90 | 11 | 1 | n/a | n/a | $5121.39 | $33588.83 |
| 54692 | HCPCS | facility | Laparoscopy orchiopexy | $6534.54 | $7245.25 | $-710.71 | 0.90 | 11 | 1 | n/a | n/a | $5121.39 | $33588.83 |
| 58550 | HCPCS | facility | Laparo-asst vag hysterectomy | $6534.54 | $7245.25 | $-710.71 | 0.90 | 11 | 1 | n/a | n/a | $5121.39 | $8915.56 |
| 0583T | HCPCS | facility | Tmpst auto tube dlvr sys | $1147.39 | $1859.49 | $-712.1 | 0.62 | 3 | 1 | n/a | n/a | $1147.39 | $1859.49 |
| D2940 | HCPCS | facility | Protective restoration | $59.7 | $774.78 | $-715.08 | 0.08 | 3 | 1 | n/a | n/a | $41.84 | $774.78 |
| 65272 | HCPCS | facility | Repair of eye wound | $2130.05 | $2849.29 | $-719.24 | 0.75 | 11 | 1 | n/a | n/a | $1676.62 | $4303.61 |
| 65426 | HCPCS | facility | Removal of eye lesion | $2130.05 | $2849.29 | $-719.24 | 0.75 | 11 | 1 | n/a | n/a | $1676.62 | $8915.56 |
| 66130 | HCPCS | facility | Remove eye lesion | $2130.05 | $2849.29 | $-719.24 | 0.75 | 11 | 1 | n/a | n/a | $1676.62 | $8915.56 |
| 66740 | HCPCS | facility | Destruction ciliary body | $2130.05 | $2849.29 | $-719.24 | 0.75 | 11 | 1 | n/a | n/a | $1676.62 | $4303.61 |
| 68362 | HCPCS | facility | Revise eyelid lining | $2130.05 | $2849.29 | $-719.24 | 0.75 | 11 | 1 | n/a | n/a | $1676.62 | $4303.61 |
| 68371 | HCPCS | facility | Harvest eye tissue alograft | $2130.05 | $2849.29 | $-719.24 | 0.75 | 11 | 1 | n/a | n/a | $1676.62 | $4303.61 |
| D7510 | HCPCS | facility | I&d absc intraoral soft tiss | $129.4 | $848.66 | $-719.26 | 0.15 | 2 | 1 | n/a | n/a | $129.4 | $848.66 |
| D3110 | HCPCS | facility | Pulp cap direct | $46.91 | $774.78 | $-727.87 | 0.06 | 3 | 1 | n/a | n/a | $32.58 | $774.78 |
| 0861T | HCPCS | facility | Rmvl pg wcs lv both compnt | $3745.52 | $4478.55 | $-733.03 | 0.84 | 3 | 1 | n/a | n/a | $3745.52 | $4478.55 |
| 0862T | HCPCS | facility | Rlcj pg wcs lv battery only | $1739.33 | $2472.73 | $-733.4 | 0.70 | 3 | 1 | n/a | n/a | $1739.33 | $2472.73 |
| 0863T | HCPCS | facility | Rlcj pg wcs lv trnsmtr only | $1739.33 | $2472.73 | $-733.4 | 0.70 | 3 | 1 | n/a | n/a | $1739.33 | $2472.73 |
| 36516 | HCPCS | facility | Apheresis selective | $4485.6 | $5219.84 | $-734.24 | 0.86 | 10 | 1 | n/a | n/a | $2888.7 | $10768.79 |
| 36522 | HCPCS | facility | Photopheresis | $4485.6 | $5219.84 | $-734.24 | 0.86 | 10 | 1 | n/a | n/a | $2888.7 | $10768.79 |
| 38232 | HCPCS | facility | Bone marrow harvest autolog | $4485.6 | $5219.84 | $-734.24 | 0.86 | 11 | 1 | n/a | n/a | $2888.7 | $8915.56 |
| D3120 | HCPCS | facility | Pulp cap indirect | $39.05 | $774.78 | $-735.73 | 0.05 | 2 | 1 | n/a | n/a | $39.05 | $774.78 |
| 0810T | HCPCS | facility | Subrta njx rx agt w/vtrc | $4250.0 | $4986.01 | $-736.01 | 0.85 | 3 | 1 | n/a | n/a | $4250.0 | $4986.01 |
| 28292 | HCPCS | facility | Correction hallux valgus | $3183.75 | $3921.32 | $-737.57 | 0.81 | 11 | 1 | n/a | n/a | $2455.43 | $4303.61 |
| 28296 | HCPCS | facility | Correction hallux valgus | $3183.75 | $3921.32 | $-737.57 | 0.81 | 11 | 1 | n/a | n/a | $2455.43 | $6735.22 |
| 0798T | HCPCS | facility | Tcat rmv 2chmbr ldls pm cmpl | $3040.18 | $3784.07 | $-743.89 | 0.80 | 3 | 1 | n/a | n/a | $3040.18 | $3784.07 |
| 0799T | HCPCS | facility | Tcat rmvl 2chmbr ldls pm ra | $3040.18 | $3784.07 | $-743.89 | 0.80 | 3 | 1 | n/a | n/a | $3040.18 | $3784.07 |
| 0800T | HCPCS | facility | Tcat rmvl 2chmbr ldls pm rv | $3040.18 | $3784.07 | $-743.89 | 0.80 | 3 | 1 | n/a | n/a | $3040.18 | $3784.07 |
| 0824T | HCPCS | facility | Tcat rmv 1chmbr ldls pm ra | $3040.18 | $3784.07 | $-743.89 | 0.80 | 5 | 1 | n/a | n/a | $3040.18 | $3784.07 |
| 36475 | HCPCS | facility | Endovenous rf 1st vein | $3024.65 | $3784.07 | $-759.42 | 0.80 | 11 | 1 | n/a | n/a | $2605.2 | $6735.22 |
| 37605 | HCPCS | facility | Ligation of neck artery | $3024.65 | $3784.07 | $-759.42 | 0.80 | 11 | 1 | n/a | n/a | $2605.2 | $4303.61 |
| 37722 | HCPCS | facility | Ligate/strip long leg vein | $3024.65 | $3784.07 | $-759.42 | 0.80 | 11 | 1 | n/a | n/a | $2605.2 | $8915.56 |
| 37735 | HCPCS | facility | Removal of leg veins/lesion | $3024.65 | $3784.07 | $-759.42 | 0.80 | 11 | 1 | n/a | n/a | $2605.2 | $6735.22 |
| 10180 | HCPCS | facility | Complex drainage wound | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $4077.0 | $2853.9 | $1319.12 | $4303.61 |
| 11426 | HCPCS | facility | Exc h-f-nk-sp b9+marg >4 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $6382.0 | $4467.4 | $1661.08 | $4303.61 |
| 11446 | HCPCS | facility | Exc face-mm b9+marg >4 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $6348.0 | $4443.6 | $1661.08 | $4303.61 |
| 11450 | HCPCS | facility | Removal sweat gland lesion | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 11451 | HCPCS | facility | Removal sweat gland lesion | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 11462 | HCPCS | facility | Removal sweat gland lesion | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 11463 | HCPCS | facility | Removal sweat gland lesion | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 11470 | HCPCS | facility | Removal sweat gland lesion | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 11471 | HCPCS | facility | Removal sweat gland lesion | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 11626 | HCPCS | facility | Exc s/n/h/f/g mal+mrg >4 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 11646 | HCPCS | facility | Exc f/e/e/n/l mal+mrg >4 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 11770 | HCPCS | facility | Remove pilonidal cyst simple | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 11771 | HCPCS | facility | HC REMOVAL OF PILONIDAL LESION | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $3089.0 | $2162.3 | $1661.08 | $6735.22 |
| 11772 | HCPCS | facility | Remove pilonidal cyst compl | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 15832 | HCPCS | facility | Excise excessive skin thigh | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 15833 | HCPCS | facility | Excise excessive skin leg | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 15834 | HCPCS | facility | Excise excessive skin hip | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 15835 | HCPCS | facility | Excise excessive skin buttck | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 15836 | HCPCS | facility | Excise excessive skin arm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 15837 | HCPCS | facility | Excise excess skin arm/hand | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 15838 | HCPCS | facility | Excise excess skin fat pad | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 15933 | HCPCS | facility | Remove sacrum pressure sore | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 15940 | HCPCS | facility | Remove hip pressure sore | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 15941 | HCPCS | facility | Remove hip pressure sore | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 15951 | HCPCS | facility | Remove thigh pressure sore | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 20205 | HCPCS | facility | Deep muscle biopsy | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 20240 | HCPCS | facility | Bone biopsy open superficial | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $7669.0 | $5368.3 | $1661.08 | $4303.61 |
| 20245 | HCPCS | facility | Bone biopsy open deep | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 20525 | HCPCS | facility | HC REMOVE FOREIGN BODY, MUSCLE/TENDON SHEATH; DEEP OR COMPLICATED | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $6828.0 | $4779.6 | $1661.08 | $6735.22 |
| 20680 | HCPCS | facility | HC REMOVAL IMPLANT; DEEP | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $4579.0 | $3205.3 | $1661.08 | $4303.61 |
| 21015 | HCPCS | facility | Resect face/scalp tum < 2 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 21016 | HCPCS | facility | Resect face/scalp tum 2 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 21501 | HCPCS | facility | Drain neck/chest lesion | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1319.12 | $4303.61 |
| 21552 | HCPCS | facility | Exc neck les sc 3 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 21554 | HCPCS | facility | Exc neck tum deep 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 21556 | HCPCS | facility | Exc neck tum deep < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 21557 | HCPCS | facility | Resect neck thorax tumor<5cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 21558 | HCPCS | facility | Resect neck tumor 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 21932 | HCPCS | facility | Exc back tum deep < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 21933 | HCPCS | facility | Exc back tum deep 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 21935 | HCPCS | facility | Resect back tum < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 21936 | HCPCS | facility | Resect back tum 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 22900 | HCPCS | facility | Exc abdl tum deep < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 22901 | HCPCS | facility | Exc abdl tum deep 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 22903 | HCPCS | facility | Exc abd les sc 3 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $5959.0 | $4171.3 | $1661.08 | $6735.22 |
| 22904 | HCPCS | facility | Radical resect abd tumor<5cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 22905 | HCPCS | facility | Rad resect abd tumor 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 23000 | HCPCS | facility | Removal of calcium deposits | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 23066 | HCPCS | facility | Biopsy shoulder tissues | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 23073 | HCPCS | facility | Exc shoulder tum deep 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 23076 | HCPCS | facility | Exc shoulder tum deep < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 23077 | HCPCS | facility | Resect shoulder tumor < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 23078 | HCPCS | facility | Resect shoulder tumor 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 24066 | HCPCS | facility | Biopsy arm/elbow soft tissue | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 24071 | HCPCS | facility | Exc arm/elbow les sc 3 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 24073 | HCPCS | facility | Ex arm/elbow tum deep 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 24076 | HCPCS | facility | Ex arm/elbow tum deep < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 24077 | HCPCS | facility | Resect arm/elbow tum < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 24079 | HCPCS | facility | Resect arm/elbow tum 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 24201 | HCPCS | facility | Removal of arm foreign body | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 25066 | HCPCS | facility | Biopsy forearm soft tissues | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $4303.61 |
| 25073 | HCPCS | facility | Exc forearm tum deep 3 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 25078 | HCPCS | facility | Resect forarm/wrist tum 3cm> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 26117 | HCPCS | facility | Rad resect hand tumor < 3 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 26118 | HCPCS | facility | Rad resect hand tumor 3 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 27043 | HCPCS | facility | Exc hip pelvis les sc 3 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 27045 | HCPCS | facility | Exc hip/pelv tum deep 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 27047 | HCPCS | facility | Exc hip/pelvis les sc < 3 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 27048 | HCPCS | facility | Exc hip/pelv tum deep < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 27049 | HCPCS | facility | Resect hip/pelv tum < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 27059 | HCPCS | facility | Resect hip/pelv tum 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 27301 | HCPCS | facility | Drain thigh/knee lesion | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $3649.0 | $2554.3 | $1319.12 | $6735.22 |
| 27328 | HCPCS | facility | Exc thigh/knee tum deep <5cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 27329 | HCPCS | facility | Resect thigh/knee tum < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 27337 | HCPCS | facility | Exc thigh/knee les sc 3 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 27339 | HCPCS | facility | Exc thigh/knee tum dep 5cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 27364 | HCPCS | facility | Resect thigh/knee tum 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 27372 | HCPCS | facility | Removal of foreign body | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $8915.56 |
| 27603 | HCPCS | facility | Drain lower leg lesion | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1319.12 | $4303.61 |
| 27614 | HCPCS | facility | Biopsy lower leg soft tissue | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $6256.0 | $4379.2 | $1661.08 | $4303.61 |
| 27615 | HCPCS | facility | Resect leg/ankle tum < 5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 27616 | HCPCS | facility | Resect leg/ankle tum 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 27619 | HCPCS | facility | Exc leg/ankle tum deep <5 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 27632 | HCPCS | facility | Exc leg/ankle les sc 3 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 27634 | HCPCS | facility | Exc leg/ankle tum dep 5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 28039 | HCPCS | facility | Exc foot/toe tum sc 1.5 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $6348.0 | $4443.6 | $1661.08 | $6735.22 |
| 28041 | HCPCS | facility | Exc foot/toe tum dep 1.5cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $4557.0 | $3189.9 | $1661.08 | $6735.22 |
| 28045 | HCPCS | facility | Exc foot/toe tum deep <1.5cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $3790.0 | $2653.0 | $1121.75 | $6735.22 |
| 28046 | HCPCS | facility | Resect foot/toe tumor < 3 cm | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 28047 | HCPCS | facility | Resect foot/toe tumor 3 cm/> | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1661.08 | $6735.22 |
| 57023 | HCPCS | facility | HC I&D VAGINAL HEMATOMA; NON-OBSTETRICAL | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | $4651.0 | $3255.7 | $1319.12 | $4303.61 |
| 69145 | HCPCS | facility | Remove ear canal lesion(s) | $2719.71 | $3481.15 | $-761.44 | 0.78 | 11 | 1 | n/a | n/a | $1121.75 | $4303.61 |
| 30915 | HCPCS | facility | Ligation nasal sinus artery | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $4303.61 |
| 30920 | HCPCS | facility | Ligation upper jaw artery | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $6735.22 |
| 36478 | HCPCS | facility | Endovenous laser 1st vein | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $6735.22 |
| 36560 | HCPCS | facility | Insert tunneled cv cath | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $2228.0 | $4303.61 |
| 36561 | HCPCS | facility | HC INSERT TUNNELED CVAD, WITH SUBCUTANEOUS PORT; AGE 5/+ YRS | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $5923.0 | $4146.1 | $2228.0 | $4303.61 |
| 36565 | HCPCS | facility | HC INSERT TUNNELED CVAD, REQ 2X CATH VIA 2 VENOUS SITES; W/O SUBQ PORT | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $5923.0 | $4146.1 | $2228.0 | $4303.61 |
| 36570 | HCPCS | facility | Insert picvad cath | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1754.1 | $4303.61 |
| 36571 | HCPCS | facility | HC INSERT PICC CVAD,W/SUBCUTANEOUS PORT/PUMP, AGE 5/+ YRS | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $5923.0 | $4146.1 | $1754.1 | $4303.61 |
| 36578 | HCPCS | facility | HC REPLACE CATH ONLY, CVAD, W/ SUBCUTANEOUS PORT/PUMP, CENTRAL/PERIPH | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $5923.0 | $4146.1 | $1754.1 | $6735.22 |
| 36581 | HCPCS | facility | HC RPL TNL CV CATH,W/O P/P,ONE VA | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $4532.0 | $3172.4 | $1754.1 | $4303.61 |
| 36582 | HCPCS | facility | HC REPLACE COMPLETE, TUNNELED CVAD, W/ SUBCU PORT,SAME VENOUS ACCESS | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $5923.0 | $4146.1 | $2228.0 | $4303.61 |
| 36585 | HCPCS | facility | HC REPLACE COMPLETE, PICC, W/ SUBCUT PORT, SAME VENOUS ACCESS | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $5923.0 | $4146.1 | $1754.1 | $4303.61 |
| 36595 | HCPCS | facility | HC MECHICAL REMOVAL PERICATH OBST MATERIAL CVD, SEP VENOUS ACCESS | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $5923.0 | $4146.1 | $1754.1 | $6735.22 |
| 37192 | HCPCS | facility | HC REPOSTION INTRAVASC VENA CAVA FILTER, INCL IMAGING GUIDANCE | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $5923.0 | $4146.1 | $2228.0 | $6735.22 |
| 37193 | HCPCS | facility | HC REMOV ENDOVAS VENA CAVA FILTER | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $11834.0 | $8283.8 | $2228.0 | $6735.22 |
| 37606 | HCPCS | facility | Ligation of neck artery | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $4303.61 |
| 37607 | HCPCS | facility | HC LIGATION/BAND ANGIOACC AV FIST | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | $3245.0 | $2271.5 | $1958.67 | $4303.61 |
| 37700 | HCPCS | facility | Revise leg vein | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $4303.61 |
| 37718 | HCPCS | facility | Ligate/strip short leg vein | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $4303.61 |
| 37760 | HCPCS | facility | Ligate leg veins radical | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $6735.22 |
| 37765 | HCPCS | facility | Stab phleb veins xtr 10-20 | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $4303.61 |
| 37766 | HCPCS | facility | Phleb veins - extrem 20+ | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $4303.61 |
| 37785 | HCPCS | facility | Ligate/divide/excise vein | $3020.73 | $3784.07 | $-763.34 | 0.80 | 11 | 1 | n/a | n/a | $1958.67 | $6735.22 |
| 75600 | HCPCS | facility | Contrast exam thoracic aorta | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 75625 | HCPCS | facility | Contrast exam abdominl aorta | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $8401.0 | $5880.7 | $2219.82 | $9256.88 |
| 75630 | HCPCS | facility | HC ABDOMINAL AORTOGRAM W/RUNOFF | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5019.0 | $3513.3 | $2219.82 | $9256.88 |
| 75710 | HCPCS | facility | Artery x-rays arm/leg | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $8306.0 | $5814.2 | $2219.82 | $9256.88 |
| 75716 | HCPCS | facility | Artery x-rays arms/legs | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $6647.0 | $4652.9 | $2219.82 | $9256.88 |
| 75733 | HCPCS | facility | Artery x-rays adrenals | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 75741 | HCPCS | facility | Artery x-rays lung | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 75743 | HCPCS | facility | Artery x-rays lungs | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 75756 | HCPCS | facility | Artery x-rays chest | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $716.01 | $9178.92 |
| 75807 | HCPCS | facility | Lymph vessel x-ray trunk | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | n/a | n/a | $322.04 | $8612.4 |
| 75825 | HCPCS | facility | HC VENOGRAPHY, CAVAL, RADIO S & I | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $4702.0 | $3291.4 | $2219.82 | $9256.88 |
| 75831 | HCPCS | facility | HC VENOGRAPHY, RENAL, UNILATERAL, SELECTIVE, RADIOLOGICAL S&I | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 75833 | HCPCS | facility | HC VENOGRAPHY, RENAL, BILATERAL, SELECTIVE, RADIOLOGICAL S&I | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 75840 | HCPCS | facility | HC VENOGRAPHY, ADRENAL, UNILATERAL, SELECTIVE, RADIOLOGICAL S&I | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 75860 | HCPCS | facility | HC VENOGRAPHY, VENOUS SINUS OR JUGULAR, CATHETER, RADIO S&I | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $716.01 | $9178.92 |
| 75885 | HCPCS | facility | HC PERCUTANEOUS TRANSHEPATIC PORTO W/HEMODYNAMIC EVAL, RADIOLO S&I | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 75889 | HCPCS | facility | HC HEPATIC VENOGRAPHY, WEDGED/FREE, W/HEMODYNAMIC EVAL, RADIOLO S&I | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 75891 | HCPCS | facility | HC HEPATIC VENOGRAPHY, WEDGED/FREE, W/O HEMODYNAMIC EVAL, RADIOLO S&I | $3020.73 | $3784.07 | $-763.34 | 0.80 | 10 | 1 | $5923.0 | $4146.1 | $2219.82 | $9256.88 |
| 23450 | HCPCS | facility | Repair shoulder capsule | $7924.83 | $8696.19 | $-771.36 | 0.91 | 11 | 1 | n/a | n/a | $5862.48 | $8915.56 |
| 23455 | HCPCS | facility | Repair shoulder capsule | $7924.83 | $8696.19 | $-771.36 | 0.91 | 11 | 1 | n/a | n/a | $5862.48 | $8915.56 |
| 23460 | HCPCS | facility | Repair shoulder capsule | $7924.83 | $8696.19 | $-771.36 | 0.91 | 11 | 1 | n/a | n/a | $5862.48 | $8915.56 |
| 25805 | HCPCS | facility | Fusion/graft of wrist joint | $7924.83 | $8696.19 | $-771.36 | 0.91 | 11 | 1 | n/a | n/a | $5862.48 | $8915.56 |
| 25825 | HCPCS | facility | Fuse hand bones with graft | $7924.83 | $8696.19 | $-771.36 | 0.91 | 11 | 1 | n/a | n/a | $5862.48 | $8915.56 |
| 27412 | HCPCS | facility | Autochondrocyte implant knee | $7924.83 | $8696.19 | $-771.36 | 0.91 | 11 | 1 | n/a | n/a | $5862.48 | $17603.1 |
| 27745 | HCPCS | facility | Reinforce tibia | $7924.83 | $8696.19 | $-771.36 | 0.91 | 11 | 1 | n/a | n/a | $5862.48 | $17603.1 |
| 20660 | HCPCS | facility | Apply rem fixation device | $1151.97 | $1927.09 | $-775.12 | 0.60 | 11 | 1 | n/a | n/a | $398.86 | $1927.09 |
| 65270 | HCPCS | facility | Repair of eye wound | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $4303.61 |
| 65410 | HCPCS | facility | Biopsy of cornea | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1129.46 | $4303.61 |
| 65420 | HCPCS | facility | Removal of eye lesion | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1129.46 | $4303.61 |
| 65775 | HCPCS | facility | Correction of astigmatism | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1129.46 | $6735.22 |
| 66250 | HCPCS | facility | Follow-up surgery of eye | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1129.46 | $4303.61 |
| 66710 | HCPCS | facility | Ciliary transsleral therapy | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1129.46 | $4303.61 |
| 66720 | HCPCS | facility | Destruction ciliary body | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1129.46 | $4303.61 |
| 67250 | HCPCS | facility | Reinforce eye wall | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67412 | HCPCS | facility | Explore/treat eye socket | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $8915.56 |
| 67808 | HCPCS | facility | Remove eyelid lesion(s) | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $4303.61 |
| 67835 | HCPCS | facility | Revise eyelashes | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $4303.61 |
| 67880 | HCPCS | facility | Revision of eyelid | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1129.46 | $6735.22 |
| 67882 | HCPCS | facility | Revision of eyelid | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67901 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $8915.56 |
| 67903 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67904 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67908 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67909 | HCPCS | facility | Revise eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67911 | HCPCS | facility | Revise eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67912 | HCPCS | facility | Correction eyelid w/implant | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67914 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67916 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67917 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67921 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67922 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67923 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67924 | HCPCS | facility | Repair eyelid defect | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67935 | HCPCS | facility | Repair eyelid wound | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $4303.61 |
| 67950 | HCPCS | facility | Revision of eyelid | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $4303.61 |
| 67961 | HCPCS | facility | Revision of eyelid | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67966 | HCPCS | facility | Revision of eyelid | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67971 | HCPCS | facility | Reconstruction of eyelid | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67975 | HCPCS | facility | Reconstruction of eyelid | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 68110 | HCPCS | facility | Remove eyelid lining lesion | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1131.62 | $4303.61 |
| 68130 | HCPCS | facility | Remove eyelid lining lesion | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1129.46 | $4303.61 |
| 68340 | HCPCS | facility | Separate eyelid adhesions | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 68540 | HCPCS | facility | Remove tear gland lesion | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 68700 | HCPCS | facility | Repair tear ducts | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $4303.61 |
| 68816 | HCPCS | facility | Probe nl duct w/balloon | $2072.9 | $2849.29 | $-776.39 | 0.73 | 11 | 1 | n/a | n/a | $1367.92 | $4303.61 |
| 65780 | HCPCS | facility | Ocular reconst transplant | $3931.57 | $4711.57 | $-780.0 | 0.83 | 11 | 1 | n/a | n/a | $2967.38 | $6735.22 |
| 65782 | HCPCS | facility | Ocular reconst transplant | $3931.57 | $4711.57 | $-780.0 | 0.83 | 11 | 1 | n/a | n/a | $2967.38 | $6735.22 |
| 20250 | HCPCS | facility | Open bone biopsy | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 20650 | HCPCS | facility | Insert and remove bone pin | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 20663 | HCPCS | facility | Application of thigh brace | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 21610 | HCPCS | facility | Partial removal of rib | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 23020 | HCPCS | facility | Release shoulder joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 23040 | HCPCS | facility | Exploratory shoulder surgery | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 23044 | HCPCS | facility | Exploratory shoulder surgery | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 23101 | HCPCS | facility | Shoulder joint surgery | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 23106 | HCPCS | facility | Incision of collarbone joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 23120 | HCPCS | facility | Partial removal collar bone | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 23125 | HCPCS | facility | Removal of collar bone | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 23145 | HCPCS | facility | Removal of bone lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 23150 | HCPCS | facility | Removal of humerus lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 23170 | HCPCS | facility | Remove collar bone lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 23172 | HCPCS | facility | Remove shoulder blade lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 23190 | HCPCS | facility | Partial removal of scapula | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24000 | HCPCS | facility | Exploratory elbow surgery | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24006 | HCPCS | facility | Release elbow joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24101 | HCPCS | facility | Explore/treat elbow joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24102 | HCPCS | facility | Remove elbow joint lining | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24125 | HCPCS | facility | Remove/graft bone lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24130 | HCPCS | facility | Removal of head of radius | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24136 | HCPCS | facility | Remove radius bone lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 24140 | HCPCS | facility | Partial removal of arm bone | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24147 | HCPCS | facility | Partial removal of elbow | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 24155 | HCPCS | facility | Removal of elbow joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24160 | HCPCS | facility | Remove elbow joint implant | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 24164 | HCPCS | facility | Remove radius head implant | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24305 | HCPCS | facility | Arm tendon lengthening | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24332 | HCPCS | facility | Tenolysis triceps | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24343 | HCPCS | facility | Repr elbow lat ligmnt w/tiss | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 24357 | HCPCS | facility | Repair elbow perc | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24358 | HCPCS | facility | Repair elbow w/deb open | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 24359 | HCPCS | facility | Repair elbow deb/attch open | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25023 | HCPCS | facility | Decompress forearm 1 space | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25024 | HCPCS | facility | Decompress forearm 2 spaces | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25040 | HCPCS | facility | Explore/treat wrist joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 25101 | HCPCS | facility | Explore/treat wrist joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25105 | HCPCS | facility | Remove wrist joint lining | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25107 | HCPCS | facility | Remove wrist joint cartilage | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25119 | HCPCS | facility | Partial removal of ulna | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25120 | HCPCS | facility | Removal of forearm lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25126 | HCPCS | facility | Remove/graft forearm lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25130 | HCPCS | facility | Removal of wrist lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25145 | HCPCS | facility | Remove forearm bone lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 25150 | HCPCS | facility | Partial removal of ulna | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 25151 | HCPCS | facility | Partial removal of radius | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 25210 | HCPCS | facility | Removal of wrist bone | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25215 | HCPCS | facility | Removal of wrist bones | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25230 | HCPCS | facility | Partial removal of radius | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25240 | HCPCS | facility | Partial removal of ulna | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25260 | HCPCS | facility | Repair forearm tendon/muscle | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25265 | HCPCS | facility | HC REPAIR FOREARM TENDON/MUSCLE | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | $4066.0 | $2846.2 | $2306.77 | $6735.22 |
| 25270 | HCPCS | facility | Repair forearm tendon/muscle | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25272 | HCPCS | facility | Repair forearm tendon/muscle | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25274 | HCPCS | facility | Repair forearm tendon/muscle | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25275 | HCPCS | facility | Repair forearm tendon sheath | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25280 | HCPCS | facility | Revise wrist/forearm tendon | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25290 | HCPCS | facility | Incise wrist/forearm tendon | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25300 | HCPCS | facility | Fusion of tendons at wrist | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25301 | HCPCS | facility | Fusion of tendons at wrist | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 25310 | HCPCS | facility | Transplant forearm tendon | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27001 | HCPCS | facility | Incision of hip tendon | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27006 | HCPCS | facility | Incision of hip tendons | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27035 | HCPCS | facility | Denervation of hip joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27066 | HCPCS | facility | Remove hip bone les deep | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 27080 | HCPCS | facility | Removal of tail bone | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27097 | HCPCS | facility | Revision of hip tendon | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27098 | HCPCS | facility | Transfer tendon to pelvis | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27307 | HCPCS | facility | Incision of thigh tendons | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27310 | HCPCS | facility | Exploration of knee joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27330 | HCPCS | facility | Biopsy knee joint lining | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27331 | HCPCS | facility | Explore/treat knee joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27332 | HCPCS | facility | Removal of knee cartilage | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27333 | HCPCS | facility | Removal of knee cartilage | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27334 | HCPCS | facility | Remove knee joint lining | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27355 | HCPCS | facility | Remove femur lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27360 | HCPCS | facility | Partial removal leg bone(s) | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 27392 | HCPCS | facility | Incision of thigh tendons | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27425 | HCPCS | facility | Lat retinacular release open | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 27435 | HCPCS | facility | Incision of knee joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27496 | HCPCS | facility | Decompression of thigh/knee | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27602 | HCPCS | facility | Decompression of lower leg | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27604 | HCPCS | facility | Drain lower leg bursa | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27610 | HCPCS | facility | Explore/treat ankle joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27612 | HCPCS | facility | Exploration of ankle joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27620 | HCPCS | facility | Explore/treat ankle joint | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27625 | HCPCS | facility | Remove ankle joint lining | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27626 | HCPCS | facility | Remove ankle joint lining | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27635 | HCPCS | facility | Remove lower leg bone lesion | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27640 | HCPCS | facility | Partial removal of tibia | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27641 | HCPCS | facility | Partial removal of fibula | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27647 | HCPCS | facility | Resect talus/calcaneus tum | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27680 | HCPCS | facility | Release of lower leg tendon | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27681 | HCPCS | facility | Release of lower leg tendons | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27685 | HCPCS | facility | Revision of lower leg tendon | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27686 | HCPCS | facility | Revise lower leg tendons | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27687 | HCPCS | facility | Revision of calf tendon | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 27707 | HCPCS | facility | Incision of fibula | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27730 | HCPCS | facility | Repair of tibia epiphysis | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27732 | HCPCS | facility | Repair of fibula epiphysis | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27734 | HCPCS | facility | Repair lower leg epiphyses | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27740 | HCPCS | facility | Repair of leg epiphyses | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27892 | HCPCS | facility | Decompression of leg | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $4303.61 |
| 27894 | HCPCS | facility | Decompression of leg | $3137.19 | $3921.32 | $-784.13 | 0.80 | 11 | 1 | n/a | n/a | $2306.77 | $6735.22 |
| 0253T | HCPCS | facility | Insert aqueous drain device | $4162.85 | $4953.69 | $-790.84 | 0.84 | 3 | 1 | n/a | n/a | $1011.89 | $4953.69 |
| 65730 | HCPCS | facility | Corneal transplant | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2967.38 | $8915.56 |
| 65755 | HCPCS | facility | Corneal transplant | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2967.38 | $8915.56 |
| 65756 | HCPCS | facility | Corneal trnspl endothelial | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2967.38 | $8915.56 |
| 65820 | HCPCS | facility | Relieve inner eye pressure | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $1676.62 | $4953.69 |
| 65880 | HCPCS | facility | Incise inner eye adhesions | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $1129.46 | $6735.22 |
| 66150 | HCPCS | facility | Glaucoma surgery | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 66155 | HCPCS | facility | Glaucoma surgery | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2977.93 | $6735.22 |
| 66183 | HCPCS | facility | Insert ant drainage device | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2977.93 | $9619.86 |
| 66600 | HCPCS | facility | Remove iris and lesion | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 66852 | HCPCS | facility | Removal of lens material | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2095.45 | $6735.22 |
| 66930 | HCPCS | facility | Extraction of lens | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2095.45 | $8915.56 |
| 67036 | HCPCS | facility | Removal of inner eye fluid | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2913.76 | $6735.22 |
| 67039 | HCPCS | facility | Laser treatment of retina | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2913.76 | $8915.56 |
| 67040 | HCPCS | facility | Laser treatment of retina | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2913.76 | $8915.56 |
| 67041 | HCPCS | facility | Vit for macular pucker | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2913.76 | $8915.56 |
| 67042 | HCPCS | facility | Vit for macular hole | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2913.76 | $8915.56 |
| 67043 | HCPCS | facility | Vit for membrane dissect | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2913.76 | $8915.56 |
| 67107 | HCPCS | facility | Repair detached retina | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2913.76 | $8915.56 |
| 67108 | HCPCS | facility | Repair detached retina | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $2913.76 | $8915.56 |
| 67115 | HCPCS | facility | Release encircling material | $4162.85 | $4953.69 | $-790.84 | 0.84 | 11 | 1 | n/a | n/a | $1442.12 | $4953.69 |
| 56620 | HCPCS | facility | Partial removal of vulva | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $8915.56 |
| 56625 | HCPCS | facility | Complete removal of vulva | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $8915.56 |
| 56740 | HCPCS | facility | Remove vagina gland lesion | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 56800 | HCPCS | facility | Repair of vagina | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 56810 | HCPCS | facility | Repair of perineum | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 57106 | HCPCS | facility | Remove vagina wall partial | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57107 | HCPCS | facility | Remove vagina tissue part | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 57109 | HCPCS | facility | Vaginectomy partial w/nodes | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $9619.86 |
| 57130 | HCPCS | facility | Remove vagina lesion | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57210 | HCPCS | facility | Repair vagina/perineum | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57230 | HCPCS | facility | Repair of urethral lesion | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 57287 | HCPCS | facility | Revise/Remove Sling Repair | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 57295 | HCPCS | facility | Revise vag graft via vagina | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 57300 | HCPCS | facility | Repair rectum-vagina fistula | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 57520 | HCPCS | facility | Conization of cervix | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 58145 | HCPCS | facility | Myomectomy vag method | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 58600 | HCPCS | facility | Division of fallopian tube | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 58770 | HCPCS | facility | Create new tubal opening | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 58805 | HCPCS | facility | Drainage of ovarian cyst(s) | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 58820 | HCPCS | facility | Drain ovary abscess open | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 59821 | HCPCS | facility | Treatment of miscarriage | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 59870 | HCPCS | facility | Evacuate mole of uterus | $3072.25 | $3879.52 | $-807.27 | 0.79 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 40804 | HCPCS | facility | HC REMOVAL FOREIGN BODY,MOUTH | $274.76 | $1086.97 | $-812.21 | 0.25 | 11 | 1 | $683.0 | $478.1 | $49.64 | $1086.97 |
| 0692T | HCPCS | facility | Therapeutic ultrafiltration | $1041.17 | $1866.49 | $-825.32 | 0.56 | 7 | 1 | n/a | n/a | $405.37 | $1866.49 |
| 19100 | HCPCS | facility | Bx breast percut w/o image | $1151.97 | $1979.35 | $-827.38 | 0.58 | 11 | 1 | $2604.0 | $1822.8 | $345.52 | $1979.35 |
| 20520 | HCPCS | facility | HC REMOVAL FOREIGN BODY MUSCLE/TENDON SHEATH; SIMPLE | $1151.97 | $1979.35 | $-827.38 | 0.58 | 11 | 1 | $2668.0 | $1867.6 | $336.38 | $1979.35 |
| 41108 | HCPCS | facility | Biopsy of floor of mouth | $1151.97 | $1979.35 | $-827.38 | 0.58 | 11 | 1 | n/a | n/a | $336.38 | $1979.35 |
| 28446 | HCPCS | facility | Osteochondral talus autogrft | $7865.265 | $8696.19 | $-830.925 | 0.90 | 10 | 1 | n/a | n/a | $4327.81 | $8915.56 |
| 61892 | HCPCS | facility | Rmv sk-mnt crnl nstm pg/rcvr | $3087.24 | $3921.32 | $-834.08 | 0.79 | 5 | 1 | n/a | n/a | $3087.24 | $3921.32 |
| 62380 | HCPCS | facility | Ndsc dcmprn 1 ntrspc lumbar | $7861.71 | $8696.19 | $-834.48 | 0.90 | 10 | 1 | n/a | n/a | $5219.36 | $9619.86 |
| 0919T | HCPCS | facility | Rmvl perm ccm-d sys pg only | $3639.3 | $4478.55 | $-839.25 | 0.81 | 3 | 1 | n/a | n/a | $3639.3 | $4478.55 |
| 0920T | HCPCS | facility | Rmvl perm ccm-d sys 1 pac ld | $3639.3 | $4478.55 | $-839.25 | 0.81 | 3 | 1 | n/a | n/a | $3639.3 | $4478.55 |
| 0921T | HCPCS | facility | Rmvl perm ccm-d sys 1 dfb ld | $3639.3 | $4478.55 | $-839.25 | 0.81 | 3 | 1 | n/a | n/a | $3639.3 | $4478.55 |
| 0922T | HCPCS | facility | Rmvl perm ccm-d sys dual ld | $3639.3 | $4478.55 | $-839.25 | 0.81 | 3 | 1 | n/a | n/a | $3639.3 | $4478.55 |
| 31572 | HCPCS | facility | Largsc w/laser dstrj les | $3626.195 | $4468.23 | $-842.035 | 0.81 | 10 | 1 | n/a | n/a | $2430.2 | $4468.23 |
| 64581 | HCPCS | facility | Implant neuroelectrodes | $6792.04 | $7637.7 | $-845.66 | 0.89 | 11 | 1 | n/a | n/a | $4118.29 | $9042.29 |
| 36568 | HCPCS | facility | HC INSERTION PICC W/O SUBQ PORT/PUMP, W/O IG; <5 YEARS OLD | $1034.86 | $1886.54 | $-851.68 | 0.55 | 11 | 1 | $3444.0 | $2410.8 | $709.02 | $4303.61 |
| 36590 | HCPCS | facility | HC REMOVAL OF TUNNELED CVA LINE | $1034.86 | $1886.54 | $-851.68 | 0.55 | 11 | 1 | $1655.0 | $1158.5 | $709.02 | $1886.54 |
| 37790 | HCPCS | facility | Penile venous occlusion | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 50727 | HCPCS | facility | Revise ureter | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1409.54 | $4303.61 |
| 51065 | HCPCS | facility | Remove ureter calculus | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 51535 | HCPCS | facility | Repair of ureter lesion | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 51715 | HCPCS | facility | Endoscopic injection/implant | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2373.22 | $4303.61 |
| 52001 | HCPCS | facility | Cystoscopy removal of clots | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1131.27 | $4303.61 |
| 52007 | HCPCS | facility | Cystoscopy and biopsy | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52234 | HCPCS | facility | Cystoscopy and treatment | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52235 | HCPCS | facility | Cystoscopy and treatment | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52250 | HCPCS | facility | Cystoscopy and radiotracer | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52277 | HCPCS | facility | Cystoscopy and treatment | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52300 | HCPCS | facility | Cystoscopy and treatment | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52301 | HCPCS | facility | Cystoscopy and treatment | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52318 | HCPCS | facility | Remove bladder stone | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52320 | HCPCS | facility | Cystoscopy and treatment | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $8915.56 |
| 52330 | HCPCS | facility | Cystoscopy and treatment | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52332 | HCPCS | facility | Cystoscopy and treatment | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | $4752.0 | $3326.4 | $1908.86 | $4303.61 |
| 52334 | HCPCS | facility | Create passage to kidney | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52342 | HCPCS | facility | Cysto W/Up Stricture Tx | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52344 | HCPCS | facility | Cysto/uretero stricture tx | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52345 | HCPCS | facility | Cysto/Uretero W/Up Stricture | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52352 | HCPCS | facility | Cystouretero w/stone remove | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52400 | HCPCS | facility | Cystouretero W/Congen Repr | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52402 | HCPCS | facility | Cystourethro cut ejacul duct | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52450 | HCPCS | facility | Incision of prostate | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52500 | HCPCS | facility | Revision of bladder neck | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52640 | HCPCS | facility | Relieve bladder contracture | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52700 | HCPCS | facility | Drainage of prostate abscess | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 53210 | HCPCS | facility | Removal of urethra | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2373.22 | $6735.22 |
| 53220 | HCPCS | facility | Treatment of urethra lesion | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2373.22 | $4303.61 |
| 53250 | HCPCS | facility | Removal of urethra gland | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1540.12 | $4303.61 |
| 53500 | HCPCS | facility | Urethrlys transvag w/ scope | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2373.22 | $4303.61 |
| 53502 | HCPCS | facility | Repair of urethra injury | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1540.12 | $4303.61 |
| 54120 | HCPCS | facility | Partial removal of penis | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $4303.61 |
| 54312 | HCPCS | facility | Reconstruction of urethra | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 54318 | HCPCS | facility | Reconstruction of urethra | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 54322 | HCPCS | facility | Reconstruction of urethra | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 54332 | HCPCS | facility | Revise penis/urethra | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 54336 | HCPCS | facility | Revise penis/urethra | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 54340 | HCPCS | facility | Secondary urethral surgery | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $4303.61 |
| 54406 | HCPCS | facility | Remove muti-comp penis pros | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 54415 | HCPCS | facility | Remove self-contd penis pros | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $4303.61 |
| 54440 | HCPCS | facility | Repair of penis | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 54512 | HCPCS | facility | Excise Lesion Testis | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 54620 | HCPCS | facility | Suspension of testis | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 54861 | HCPCS | facility | Removal of epididymis | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 54901 | HCPCS | facility | Fusion of spermatic ducts | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 55110 | HCPCS | facility | Explore scrotum | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 55530 | HCPCS | facility | Revise spermatic cord veins | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 55725 | HCPCS | facility | Drainage of prostate abscess | $3347.03 | $4224.5 | $-877.47 | 0.79 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 61715 | HCPCS | facility | Mrgfus strtctc ablt trgt icr | $12470.31 | $13353.93 | $-883.62 | 0.93 | 5 | 1 | n/a | n/a | $12470.31 | $13965.02 |
| 69729 | HCPCS | facility | Impl oi implt sk tc esp>=100 | $14495.61 | $15386.48 | $-890.87 | 0.94 | 9 | 1 | n/a | n/a | $13048.08 | $33588.83 |
| 69730 | HCPCS | facility | Rplc oi implt sk tc esp>=100 | $14495.61 | $15386.48 | $-890.87 | 0.94 | 9 | 1 | n/a | n/a | $13048.08 | $33588.83 |
| 61880 | HCPCS | facility | Revise/remove neuroelectrode | $3293.22 | $4189.9 | $-896.68 | 0.79 | 11 | 1 | n/a | n/a | $1511.08 | $8915.56 |
| 33218 | HCPCS | facility | HC REPAIR LEAD, PACE/DEFIB ONE | $3579.94 | $4478.55 | $-898.61 | 0.80 | 11 | 1 | $1539.0 | $1077.3 | $1683.13 | $9619.86 |
| 33220 | HCPCS | facility | Repair lead pace-defib dual | $3579.94 | $4478.55 | $-898.61 | 0.80 | 11 | 1 | n/a | n/a | $1683.13 | $8915.56 |
| 33235 | HCPCS | facility | HC REMOVE LEAD, DUAL CHAM PACE | $3579.94 | $4478.55 | $-898.61 | 0.80 | 11 | 1 | $5288.0 | $3701.6 | $1683.13 | $4478.55 |
| 33241 | HCPCS | facility | HC REMOVE PULSE GENERATOR ONLY | $3579.94 | $4478.55 | $-898.61 | 0.80 | 11 | 1 | $4697.0 | $3287.9 | $1683.13 | $4478.55 |
| 33244 | HCPCS | facility | HC REMOVE ICD LEADS, NON THORACIC | $3579.94 | $4478.55 | $-898.61 | 0.80 | 11 | 1 | $1621.0 | $1134.7 | $1683.13 | $4478.55 |
| 36261 | HCPCS | facility | Revision of infusion pump | $3579.94 | $4478.55 | $-898.61 | 0.80 | 11 | 1 | n/a | n/a | $1683.13 | $4478.55 |
| 65091 | HCPCS | facility | Revise eye | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 65093 | HCPCS | facility | Revise eye with implant | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 65101 | HCPCS | facility | Removal of eye | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 65103 | HCPCS | facility | Remove eye/insert implant | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 65105 | HCPCS | facility | Remove eye/attach implant | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 65110 | HCPCS | facility | Removal of eye | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $8915.56 |
| 65112 | HCPCS | facility | Remove eye/revise socket | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $8915.56 |
| 65114 | HCPCS | facility | Remove eye/revise socket | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $8915.56 |
| 65140 | HCPCS | facility | Attach ocular implant | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 65155 | HCPCS | facility | Reinsert ocular implant | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 67414 | HCPCS | facility | Explr/decompress eye socket | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 67420 | HCPCS | facility | Explore/treat eye socket | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $8915.56 |
| 67430 | HCPCS | facility | Explore/treat eye socket | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $8915.56 |
| 67440 | HCPCS | facility | Explore/drain eye socket | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $8915.56 |
| 67445 | HCPCS | facility | Explr/decompress eye socket | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 67450 | HCPCS | facility | Explore/biopsy eye socket | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $8915.56 |
| 67550 | HCPCS | facility | Insert eye socket implant | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $6735.22 |
| 67570 | HCPCS | facility | Decompress optic nerve | $3803.44 | $4711.57 | $-908.13 | 0.81 | 11 | 1 | n/a | n/a | $2832.72 | $8915.56 |
| 32550 | HCPCS | facility | HC INSERTION OF INDWELLING TUNNELED PLEURAL CATHETER W/CUFF | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | $8302.0 | $5811.4 | $2259.08 | $4303.61 |
| 47490 | HCPCS | facility | HC CHOLECYSTOSTOMY, PERCUT, COMP PROC, INCL IMAG GUID; EXISTING ACCESS | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | $6917.0 | $4841.9 | $2027.76 | $6735.22 |
| 49250 | HCPCS | facility | Excision of umbilicus | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $1852.58 | $6735.22 |
| 49402 | HCPCS | facility | Remove foreign body adbomen | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $1852.58 | $6735.22 |
| 49426 | HCPCS | facility | Revise abdomen-venous shunt | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $1852.58 | $4303.61 |
| 49492 | HCPCS | facility | Rpr ing hern premie blocked | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 49495 | HCPCS | facility | Rpr ing hernia baby reduc | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 49496 | HCPCS | facility | Rpr ing hernia baby blocked | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 49501 | HCPCS | facility | Rpr ing hernia init blocked | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 49505 | HCPCS | facility | Prp i/hern init reduc >5 yr | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 49507 | HCPCS | facility | Prp i/hern init block >5 yr | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 49520 | HCPCS | facility | Rerepair ing hernia reduce | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 49525 | HCPCS | facility | Repair ing hernia sliding | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 49550 | HCPCS | facility | Rpr rem hernia init reduce | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 49553 | HCPCS | facility | Rpr fem hernia init blocked | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 49555 | HCPCS | facility | Rerepair fem hernia reduce | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 49557 | HCPCS | facility | Rerepair fem hernia blocked | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 49600 | HCPCS | facility | Repair umbilical lesion | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 54530 | HCPCS | facility | Removal of testis | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 54550 | HCPCS | facility | Exploration for testis | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 54640 | HCPCS | facility | Suspension of testis | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 54650 | HCPCS | facility | Orchiopexy (Fowler-Stephens) | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 55040 | HCPCS | facility | Removal of hydrocele | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $6735.22 |
| 55041 | HCPCS | facility | Removal of hydroceles | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 55540 | HCPCS | facility | Revise hernia & sperm veins | $3370.43 | $4290.92 | $-920.49 | 0.79 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 21336 | HCPCS | facility | Open tx septal fx w/wo stabj | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 21502 | HCPCS | facility | Drain chest lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 21720 | HCPCS | facility | Revision of neck muscle | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 22315 | HCPCS | facility | Closed tx vert fx w/manj | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $835.41 | $4303.61 |
| 22510 | HCPCS | facility | HC VERTEBROPLASTY, THORACIC | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $4021.0 | $2814.7 | $1655.46 | $4303.61 |
| 22511 | HCPCS | facility | HC VERTEBROPLASTY, LUMBAR | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $4698.0 | $3288.6 | $1298.63 | $4303.61 |
| 23100 | HCPCS | facility | Biopsy of shoulder joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 23140 | HCPCS | facility | Removal of bone lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 23935 | HCPCS | facility | Drain arm/elbow bone lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 24105 | HCPCS | facility | Removal of elbow bursa | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 24110 | HCPCS | facility | Remove humerus lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 24120 | HCPCS | facility | Remove elbow lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 24310 | HCPCS | facility | Revision of arm tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 24925 | HCPCS | facility | Amputation follow-up surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 25001 | HCPCS | facility | Incise flexor carpi radialis | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 25085 | HCPCS | facility | Incision of wrist capsule | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 25100 | HCPCS | facility | Biopsy of wrist joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 25109 | HCPCS | facility | Excise tendon forearm/wrist | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 25116 | HCPCS | facility | Remove wrist/forearm lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 25295 | HCPCS | facility | Release wrist/forearm tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 25606 | HCPCS | facility | Treat Fx Distal Radial | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 25651 | HCPCS | facility | Pin ulnar styloid fracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 25907 | HCPCS | facility | Amputation follow-up surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 26020 | HCPCS | facility | Drain hand tendon sheath | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26030 | HCPCS | facility | Drainage of palm bursas | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26035 | HCPCS | facility | Decompress fingers/hand | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26037 | HCPCS | facility | Decompress fingers/hand | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26045 | HCPCS | facility | Release palm contracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26075 | HCPCS | facility | Explore/treat finger joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26100 | HCPCS | facility | Biopsy hand joint lining | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26121 | HCPCS | facility | Release palm contracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26123 | HCPCS | facility | Release palm contracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26130 | HCPCS | facility | Remove wrist joint lining | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26135 | HCPCS | facility | Revise finger joint each | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26215 | HCPCS | facility | Remove/graft finger lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26230 | HCPCS | facility | Partial removal of hand bone | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $8915.56 |
| 26250 | HCPCS | facility | Extensive hand surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26260 | HCPCS | facility | Resect prox finger tumor | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26356 | HCPCS | facility | Repair finger/hand tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26357 | HCPCS | facility | Repair finger/hand tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26370 | HCPCS | facility | Repair finger/hand tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26373 | HCPCS | facility | Repair finger/hand tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26412 | HCPCS | facility | Repair/graft hand tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26415 | HCPCS | facility | Excision hand/finger tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26416 | HCPCS | facility | Graft hand or finger tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26420 | HCPCS | facility | Repair/graft finger tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26426 | HCPCS | facility | Repair finger/hand tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26428 | HCPCS | facility | Repair/graft finger tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26433 | HCPCS | facility | Repair finger tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26434 | HCPCS | facility | Repair/graft finger tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26437 | HCPCS | facility | Realignment of tendons | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26442 | HCPCS | facility | Release palm & finger tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26445 | HCPCS | facility | Release hand/finger tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26449 | HCPCS | facility | Release forearm/hand tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26450 | HCPCS | facility | Incision of palm tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26471 | HCPCS | facility | Fusion of finger tendons | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26480 | HCPCS | facility | Transplant hand tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26483 | HCPCS | facility | Transplant/graft hand tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26485 | HCPCS | facility | Transplant palm tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $4303.61 |
| 26489 | HCPCS | facility | Transplant/graft palm tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26490 | HCPCS | facility | Revise thumb tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26492 | HCPCS | facility | Tendon transfer with graft | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26494 | HCPCS | facility | Hand tendon/muscle transfer | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26496 | HCPCS | facility | Revise thumb tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26497 | HCPCS | facility | Finger tendon transfer | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26498 | HCPCS | facility | Finger tendon transfer | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26499 | HCPCS | facility | Revision of finger | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26502 | HCPCS | facility | Hand tendon reconstruction | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26508 | HCPCS | facility | Release thumb contracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26510 | HCPCS | facility | Thumb tendon transfer | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26517 | HCPCS | facility | Fusion of knuckle joints | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26520 | HCPCS | facility | Release knuckle contracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26540 | HCPCS | facility | HC RPR COLLAT LIGAMENT,MCP/IP JNT | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $6013.0 | $4209.1 | $1185.44 | $6735.22 |
| 26541 | HCPCS | facility | Repair hand joint with graft | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $8915.56 |
| 26542 | HCPCS | facility | Repair hand joint with graft | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26545 | HCPCS | facility | Reconstruct finger joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26548 | HCPCS | facility | Reconstruct finger joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26550 | HCPCS | facility | Construct thumb replacement | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $4303.61 |
| 26561 | HCPCS | facility | Repair of web finger | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26562 | HCPCS | facility | Repair of web finger | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26565 | HCPCS | facility | Correct metacarpal flaw | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $8915.56 |
| 26567 | HCPCS | facility | Correct finger deformity | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $8915.56 |
| 26580 | HCPCS | facility | Repair hand deformity | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $8915.56 |
| 26587 | HCPCS | facility | Reconstruct extra finger | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $8915.56 |
| 26591 | HCPCS | facility | Repair muscles of hand | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26593 | HCPCS | facility | Release muscles of hand | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $6735.22 |
| 26596 | HCPCS | facility | Excision constricting tissue | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1185.44 | $4303.61 |
| 26607 | HCPCS | facility | Treat metacarpal fracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $835.41 | $4303.61 |
| 26608 | HCPCS | facility | Treat metacarpal fracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 26650 | HCPCS | facility | Treat thumb fracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $4303.61 |
| 26676 | HCPCS | facility | Pin hand dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $4303.61 |
| 26685 | HCPCS | facility | Treat hand dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 26706 | HCPCS | facility | Pin knuckle dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $835.41 | $4303.61 |
| 26715 | HCPCS | facility | Treat knuckle dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 26727 | HCPCS | facility | Treat finger fracture each | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $9619.86 |
| 26735 | HCPCS | facility | Treat finger fracture each | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 26746 | HCPCS | facility | Treat finger fracture each | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $8915.56 |
| 26756 | HCPCS | facility | Pin finger fracture each | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $4303.61 |
| 26765 | HCPCS | facility | HC OPEN TX FINGER FX | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $4698.0 | $3288.6 | $1908.84 | $6735.22 |
| 26776 | HCPCS | facility | Pin finger dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $4303.61 |
| 26785 | HCPCS | facility | HC OPEN TX FING DISLOC | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $4698.0 | $3288.6 | $1908.84 | $4303.61 |
| 26860 | HCPCS | facility | Fusion of finger joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26862 | HCPCS | facility | Fusion/graft of finger joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26910 | HCPCS | facility | Amputate metacarpal bone | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 26951 | HCPCS | facility | Amputation of finger/thumb | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $4698.0 | $3288.6 | $1185.44 | $4303.61 |
| 26952 | HCPCS | facility | Amputation of finger/thumb | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $4888.0 | $3421.6 | $1185.44 | $6735.22 |
| 27062 | HCPCS | facility | Remove femur lesion/bursa | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $8915.56 |
| 27087 | HCPCS | facility | Remove hip foreign body | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 27305 | HCPCS | facility | Incise thigh tendon & fascia | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27306 | HCPCS | facility | Incision of thigh tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 27340 | HCPCS | facility | Removal of kneecap bursa | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 27345 | HCPCS | facility | Removal of knee cyst | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 27347 | HCPCS | facility | Remove knee cyst | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 27391 | HCPCS | facility | Incision of thigh tendons | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27497 | HCPCS | facility | Decompression of thigh/knee | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27594 | HCPCS | facility | Amputation follow-up surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27600 | HCPCS | facility | Decompression of lower leg | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27601 | HCPCS | facility | Decompression of lower leg | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27607 | HCPCS | facility | Treat lower leg bone lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27630 | HCPCS | facility | Removal of tendon lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 27656 | HCPCS | facility | Repair leg fascia defect | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27675 | HCPCS | facility | Repair lower leg tendons | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27704 | HCPCS | facility | Removal of ankle implant | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $4303.61 |
| 27884 | HCPCS | facility | Amputation follow-up surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 28003 | HCPCS | facility | Treatment of foot infection | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1555.31 | $6735.22 |
| 28005 | HCPCS | facility | Treat foot bone lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28008 | HCPCS | facility | HC FASCIECTOMY, FOOT AND/OR TOE | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $7097.0 | $4967.9 | $1583.94 | $6735.22 |
| 28020 | HCPCS | facility | Exploration of foot joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28022 | HCPCS | facility | Exploration of foot joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28050 | HCPCS | facility | Biopsy of foot joint lining | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28052 | HCPCS | facility | Biopsy of foot joint lining | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28054 | HCPCS | facility | Biopsy of toe joint lining | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28060 | HCPCS | facility | HC FASCIECTOMY, PLANTAR FASCIA; PARTIAL | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $7097.0 | $4967.9 | $1583.94 | $4303.61 |
| 28062 | HCPCS | facility | Removal of foot fascia | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28072 | HCPCS | facility | Removal of foot joint lining | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28086 | HCPCS | facility | Excise foot tendon sheath | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28088 | HCPCS | facility | Excise foot tendon sheath | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28100 | HCPCS | facility | Removal of ankle/heel lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28104 | HCPCS | facility | Removal of foot lesion | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28110 | HCPCS | facility | Part removal of metatarsal | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28111 | HCPCS | facility | Part removal of metatarsal | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28112 | HCPCS | facility | Part removal of metatarsal | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28113 | HCPCS | facility | Part removal of metatarsal | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28114 | HCPCS | facility | Removal of metatarsal heads | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28116 | HCPCS | facility | Revision of foot | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28118 | HCPCS | facility | Removal of heel bone | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28119 | HCPCS | facility | Removal of heel spur | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28120 | HCPCS | facility | Part removal of ankle/heel | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $8915.56 |
| 28122 | HCPCS | facility | HC PARTL EXC TRASL/METRASL BONE | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $5667.0 | $3966.9 | $1583.94 | $6735.22 |
| 28126 | HCPCS | facility | HC RESECTION, PARTIAL/COMPL, PHALANGEAL BASE, EA TOE | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $7955.0 | $5568.5 | $1583.94 | $4303.61 |
| 28140 | HCPCS | facility | Removal of metatarsal | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28150 | HCPCS | facility | HC REMOVE SINGLE TOE PHALNGE, EA | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $6067.0 | $4246.9 | $1583.94 | $4303.61 |
| 28153 | HCPCS | facility | HC RESECTION CONDYLE DISTAL END PHALANX, EACH TOE | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $7955.0 | $5568.5 | $1583.94 | $4303.61 |
| 28160 | HCPCS | facility | HC INTERPHALNG TOE JNT EXC EA SGL | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $5667.0 | $3966.9 | $1583.94 | $4303.61 |
| 28171 | HCPCS | facility | Resect tarsal tumor | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28173 | HCPCS | facility | Resect metatarsal tumor | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28200 | HCPCS | facility | HC RPR TDN FLXR FOOT 1/2 W/O FREE GRAFG EACH TENDON | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $6802.0 | $4761.4 | $1583.94 | $6735.22 |
| 28208 | HCPCS | facility | Repair of foot tendon | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28240 | HCPCS | facility | Release of big toe | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28250 | HCPCS | facility | Revision of foot fascia | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28260 | HCPCS | facility | Release of midfoot joint | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28270 | HCPCS | facility | Release of foot contracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28280 | HCPCS | facility | Fusion of toes | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28285 | HCPCS | facility | HC HAMMER OP ONE TOE | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $7108.0 | $4975.6 | $1583.94 | $6735.22 |
| 28286 | HCPCS | facility | Repair of hammertoe | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28288 | HCPCS | facility | Partial removal of foot bone | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28289 | HCPCS | facility | Corrj halux rigdus w/o implt | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28308 | HCPCS | facility | Incision of metatarsal | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28312 | HCPCS | facility | Revision of toe | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28313 | HCPCS | facility | Repair deformity of toe | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28315 | HCPCS | facility | HC SESAMOIDECTOMY, 1ST TOE | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $3757.0 | $2629.9 | $1583.94 | $6735.22 |
| 28340 | HCPCS | facility | Resect enlarged toe tissue | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28341 | HCPCS | facility | Resect enlarged toe | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28344 | HCPCS | facility | Repair extra toe(s) | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28476 | HCPCS | facility | Treat metatarsal fracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $4303.61 |
| 28496 | HCPCS | facility | Treat big toe fracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $4303.61 |
| 28505 | HCPCS | facility | Treat big toe fracture | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 28525 | HCPCS | facility | HC OPEN TX FRACTURE PHALANX/PHALANGES NOT GREAT TOE | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $5168.0 | $3617.6 | $1908.84 | $6735.22 |
| 28606 | HCPCS | facility | Treat foot dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $4303.61 |
| 28636 | HCPCS | facility | Treat toe dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $4303.61 |
| 28645 | HCPCS | facility | Repair toe dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 28666 | HCPCS | facility | Treat toe dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $4303.61 |
| 28675 | HCPCS | facility | Repair of toe dislocation | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1908.84 | $6735.22 |
| 28805 | HCPCS | facility | Amputation thru metatarsal | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $6735.22 |
| 28810 | HCPCS | facility | Amputation toe & metatarsal | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $4303.61 |
| 28820 | HCPCS | facility | Amputation of toe | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $8590.0 | $6013.0 | $1583.94 | $4303.61 |
| 28825 | HCPCS | facility | HC AMPUTATE, TOE; INTERPHALANGEAL JOINT | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | $5667.0 | $3966.9 | $1583.94 | $4303.61 |
| 29800 | HCPCS | facility | Jaw arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29804 | HCPCS | facility | Jaw arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29805 | HCPCS | facility | Shoulder arthroscopy dx | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29822 | HCPCS | facility | Shoulder arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29834 | HCPCS | facility | Elbow arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29837 | HCPCS | facility | Elbow arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29838 | HCPCS | facility | Elbow arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29840 | HCPCS | facility | Wrist arthroscopy | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29843 | HCPCS | facility | Wrist arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29844 | HCPCS | facility | Wrist arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29845 | HCPCS | facility | Wrist arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29846 | HCPCS | facility | Wrist arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29870 | HCPCS | facility | Knee arthroscopy dx | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29871 | HCPCS | facility | Knee arthroscopy/drainage | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29873 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29874 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29875 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29876 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29877 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29879 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29880 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29881 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29882 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29883 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29884 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $4303.61 |
| 29886 | HCPCS | facility | Knee arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29893 | HCPCS | facility | Scope plantar fasciotomy | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $1583.94 | $8915.56 |
| 29894 | HCPCS | facility | Ankle arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29895 | HCPCS | facility | Ankle arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29897 | HCPCS | facility | Ankle arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29898 | HCPCS | facility | Ankle arthroscopy/surgery | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29900 | HCPCS | facility | Mcp joint arthroscopy dx | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29904 | HCPCS | facility | Subtalar arthro w/fb rmvl | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 29906 | HCPCS | facility | Subtalar arthro w/deb | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2111.62 | $6735.22 |
| 64821 | HCPCS | facility | Remove sympathetic nerves | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 64822 | HCPCS | facility | Remove sympathetic nerves | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 64823 | HCPCS | facility | Sympathectomy supfc palmar | $2999.94 | $3921.32 | $-921.38 | 0.77 | 11 | 1 | n/a | n/a | $2066.12 | $6735.22 |
| 0785T | HCPCS | facility | Revj/rmvl nea spi w/nstim | $3245.27 | $4189.9 | $-944.63 | 0.77 | 3 | 1 | n/a | n/a | $3245.27 | $4189.9 |
| 0787T | HCPCS | facility | Revj/rmvl nea sac w/nstim | $3245.27 | $4189.9 | $-944.63 | 0.77 | 3 | 1 | n/a | n/a | $3245.27 | $4189.9 |
| 0818T | HCPCS | facility | Revj/rmvl ins ptn subq | $3245.27 | $4189.9 | $-944.63 | 0.77 | 3 | 1 | n/a | n/a | $3245.27 | $4189.9 |
| 0819T | HCPCS | facility | Revj/rmvl ins ptn subf | $3245.27 | $4189.9 | $-944.63 | 0.77 | 3 | 1 | n/a | n/a | $3245.27 | $4189.9 |
| 33278 | HCPCS | facility | Rmvl phrnc nrv stim sys | $3245.27 | $4189.9 | $-944.63 | 0.77 | 3 | 1 | n/a | n/a | $3245.27 | $4189.9 |
| 33279 | HCPCS | facility | Rmvl phrnc nrv stim transvns | $3245.27 | $4189.9 | $-944.63 | 0.77 | 3 | 1 | n/a | n/a | $3245.27 | $4189.9 |
| 33281 | HCPCS | facility | Reposg phrnc nrv stim trnsvn | $3245.27 | $4189.9 | $-944.63 | 0.77 | 3 | 1 | n/a | n/a | $3245.27 | $4189.9 |
| 64598 | HCPCS | facility | Revj/rmvl nea pn w/int nstim | $3245.27 | $4189.9 | $-944.63 | 0.77 | 5 | 1 | n/a | n/a | $3245.27 | $4189.9 |
| 65125 | HCPCS | facility | Revise ocular implant | $1904.06 | $2849.29 | $-945.23 | 0.67 | 11 | 1 | n/a | n/a | $1727.73 | $2849.29 |
| 20103 | HCPCS | facility | Explore wound extremity | $1028.58 | $1979.35 | $-950.77 | 0.52 | 11 | 1 | $1671.0 | $1169.7 | $662.51 | $1979.35 |
| 65286 | HCPCS | facility | Repair of eye wound | $1805.48 | $2765.81 | $-960.33 | 0.65 | 11 | 1 | n/a | n/a | $662.84 | $2765.81 |
| 65800 | HCPCS | facility | Drainage of eye | $1805.48 | $2765.81 | $-960.33 | 0.65 | 11 | 1 | $3585.0 | $2509.5 | $662.84 | $2765.81 |
| 65865 | HCPCS | facility | Incise inner eye adhesions | $1805.48 | $2765.81 | $-960.33 | 0.65 | 11 | 1 | n/a | n/a | $1129.46 | $2765.81 |
| 66020 | HCPCS | facility | Injection treatment of eye | $1805.48 | $2765.81 | $-960.33 | 0.65 | 11 | 1 | n/a | n/a | $1129.46 | $2765.81 |
| 66030 | HCPCS | facility | Injection treatment of eye | $1805.48 | $2765.81 | $-960.33 | 0.65 | 11 | 1 | n/a | n/a | $1129.46 | $2765.81 |
| 66505 | HCPCS | facility | Incision of iris | $1805.48 | $2765.81 | $-960.33 | 0.65 | 11 | 1 | n/a | n/a | $662.84 | $2765.81 |
| 66820 | HCPCS | facility | Incision secondary cataract | $1805.48 | $2765.81 | $-960.33 | 0.65 | 11 | 1 | n/a | n/a | $662.84 | $2765.81 |
| 67030 | HCPCS | facility | Incise inner eye strands | $1805.48 | $2765.81 | $-960.33 | 0.65 | 11 | 1 | n/a | n/a | $1442.12 | $2765.81 |
| 33212 | HCPCS | facility | HC INSERT PACER PULSE GENERATOR ONLY; W/EXIST SNG LEAD | $8955.35 | $9917.62 | $-962.27 | 0.90 | 11 | 1 | $17514.0 | $12259.8 | $4298.03 | $17603.1 |
| 33227 | HCPCS | facility | HC REMOVE & REPL PM GEN, SINGLE | $8955.35 | $9917.62 | $-962.27 | 0.90 | 11 | 1 | $12880.0 | $9016.0 | $4298.03 | $33588.83 |
| 95004 | HCPCS | facility | Percut allergy skin tests | $50.33 | $1029.15 | $-978.82 | 0.05 | 10 | 1 | n/a | n/a | $24.8 | $1882.48 |
| 95044 | HCPCS | facility | Allergy patch tests | $50.33 | $1029.15 | $-978.82 | 0.05 | 10 | 1 | n/a | n/a | $24.8 | $1882.48 |
| 31730 | HCPCS | facility | Intro windpipe wire/tube | $1151.97 | $2133.11 | $-981.14 | 0.54 | 11 | 1 | n/a | n/a | $337.25 | $2133.11 |
| 58290 | HCPCS | facility | Vag hyst complex | $7893.42 | $8887.01 | $-993.59 | 0.89 | 10 | 1 | n/a | n/a | $3405.53 | $8915.56 |
| 49010 | HCPCS | facility | Exploration behind abdomen | $6735.22 | $7758.53 | $-1023.31 | 0.87 | 7 | 1 | n/a | n/a | $1577.09 | $7758.53 |
| 65436 | HCPCS | facility | Curette/treat cornea | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1129.46 | $2849.29 |
| 65600 | HCPCS | facility | Revision of cornea | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 67415 | HCPCS | facility | Aspiration orbital contents | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 67715 | HCPCS | facility | HC CANTHOTOMY | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | $3336.0 | $2335.2 | $1367.92 | $2849.29 |
| 67915 | HCPCS | facility | Repair eyelid defect | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 67930 | HCPCS | facility | Repair eyelid wound | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 68100 | HCPCS | facility | Biopsy of eyelid lining | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $615.69 | $2849.29 |
| 68115 | HCPCS | facility | Remove eyelid lining lesion | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 68135 | HCPCS | facility | Remove eyelid lining lesion | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $615.69 | $2849.29 |
| 68420 | HCPCS | facility | Incise/drain tear sac | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 68510 | HCPCS | facility | Biopsy of tear gland | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 68525 | HCPCS | facility | Biopsy of tear sac | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 68811 | HCPCS | facility | Probe nasolacrimal duct | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 68815 | HCPCS | facility | Probe nasolacrimal duct | $1805.48 | $2849.29 | $-1043.81 | 0.63 | 11 | 1 | n/a | n/a | $1367.92 | $2849.29 |
| 0416T | HCPCS | facility | Reloc skin pocket pls gen | $1427.16 | $2472.73 | $-1045.57 | 0.58 | 5 | 1 | n/a | n/a | $1427.16 | $2472.73 |
| 11960 | HCPCS | facility | Insert tissue expander(s) | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 14301 | HCPCS | facility | Tis trnfr any 30.1-60 sq cm | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15120 | HCPCS | facility | HC SKN SPLT A-GRFT FAC/NCK/HF/G | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | $3160.0 | $2212.0 | $1510.07 | $4303.61 |
| 15135 | HCPCS | facility | Derm autograft face/nck/hf/g | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 15572 | HCPCS | facility | Skin pedicle flap arms/legs | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15600 | HCPCS | facility | Delay flap trunk | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15731 | HCPCS | facility | Forehead Flap w/Vasc Pedicle | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15734 | HCPCS | facility | Muscle-skin graft trunk | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15738 | HCPCS | facility | Muscle-skin graft leg | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15750 | HCPCS | facility | Neurovascular pedicle flap | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15770 | HCPCS | facility | Derma-fat-fascia graft | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15825 | HCPCS | facility | Removal of neck wrinkles | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15826 | HCPCS | facility | Removal of brow wrinkles | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15828 | HCPCS | facility | Removal of face wrinkles | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 15829 | HCPCS | facility | Removal of skin wrinkles | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15840 | HCPCS | facility | Nerve palsy fascial graft | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15841 | HCPCS | facility | Nerve palsy muscle graft | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15845 | HCPCS | facility | Skin and muscle repair face | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15922 | HCPCS | facility | Removal of tail bone ulcer | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15934 | HCPCS | facility | Remove sacrum pressure sore | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15935 | HCPCS | facility | Remove sacrum pressure sore | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15944 | HCPCS | facility | Remove hip pressure sore | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 15953 | HCPCS | facility | Remove thigh pressure sore | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 15958 | HCPCS | facility | Remove thigh pressure sore | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1111.61 | $6735.22 |
| 20912 | HCPCS | facility | Remove cartilage for graft | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 43886 | HCPCS | facility | Revise gastric port open | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| 43888 | HCPCS | facility | Change gastric port open | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $4303.61 |
| 44340 | HCPCS | facility | Revision of colostomy | $3163.23 | $4246.97 | $-1083.74 | 0.74 | 11 | 1 | n/a | n/a | $1510.07 | $6735.22 |
| C9777 | HCPCS | facility | Esophag mucosal integ add-on | $3528.97 | $4620.58 | $-1091.61 | 0.76 | 9 | 1 | n/a | n/a | $3135.9 | $8393.19 |
| 53240 | HCPCS | facility | Surgery for urethra pouch | $3087.89 | $4224.5 | $-1136.61 | 0.73 | 11 | 1 | n/a | n/a | $1989.5 | $4303.61 |
| 0524T | HCPCS | facility | Ev cath dir chem abltj w/img | $2641.52 | $3784.07 | $-1142.55 | 0.70 | 3 | 1 | n/a | n/a | $2641.52 | $3784.07 |
| 53854 | HCPCS | facility | Trurl dstrj prst8 tiss rf wv | $3078.18 | $4224.5 | $-1146.32 | 0.73 | 10 | 1 | n/a | n/a | $1739.75 | $4303.61 |
| J7504 | HCPCS | facility | Lymphocyte immune globulin | $3968.45 | $5135.09 | $-1166.64 | 0.77 | 13 | 1 | n/a | n/a | $2257.65 | $5307.93 |
| 75820 | HCPCS | facility | HC VENOGRAM, EXTREMITY; UNILAT | $716.01 | $1886.54 | $-1170.53 | 0.38 | 10 | 1 | $2348.0 | $1643.6 | $709.02 | $3648.18 |
| 75827 | HCPCS | facility | HC VENO,CAVAL,SUPER W/SERIAL S&I | $716.01 | $1886.54 | $-1170.53 | 0.38 | 10 | 1 | $2705.0 | $1893.5 | $709.02 | $3806.8 |
| 36224 | HCPCS | facility | HC SELECT CATH PLACE, INTRNL CAROTID ART, UNI, W/ANGIO INTRCRNL ART | $5497.14 | $6668.74 | $-1171.6 | 0.82 | 11 | 1 | $14825.0 | $10377.5 | $3630.4 | $9619.86 |
| 36226 | HCPCS | facility | Place cath vertebral art | $5497.14 | $6668.74 | $-1171.6 | 0.82 | 11 | 1 | n/a | n/a | $3630.4 | $9619.86 |
| 36860 | HCPCS | facility | External cannula declotting | $709.02 | $1886.54 | $-1177.52 | 0.38 | 11 | 1 | n/a | n/a | $172.66 | $1886.54 |
| 37615 | HCPCS | facility | Ligation of neck artery | $2605.2 | $3784.07 | $-1178.87 | 0.69 | 11 | 1 | n/a | n/a | $1250.63 | $6735.22 |
| 37761 | HCPCS | facility | Ligate leg veins open | $2605.2 | $3784.07 | $-1178.87 | 0.69 | 11 | 1 | n/a | n/a | $1250.63 | $8915.56 |
| 37780 | HCPCS | facility | Revision of leg vein | $2605.2 | $3784.07 | $-1178.87 | 0.69 | 11 | 1 | n/a | n/a | $1250.63 | $6735.22 |
| 56440 | HCPCS | facility | Surgery for vulva lesion | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 56442 | HCPCS | facility | Hymenotomy | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 56805 | HCPCS | facility | Repair clitoris | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 57010 | HCPCS | facility | Drainage of pelvic abscess | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57105 | HCPCS | facility | Biopsy of vagina | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57135 | HCPCS | facility | Remove vagina lesion | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57400 | HCPCS | facility | Dilation of vagina | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57410 | HCPCS | facility | Pelvic examination | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57461 | HCPCS | facility | Conz of cervix w/scope leep | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | $4329.0 | $3030.3 | $1454.55 | $6735.22 |
| 57513 | HCPCS | facility | Laser surgery of cervix | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57558 | HCPCS | facility | D&C oF Cervical Stump | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $4303.61 |
| 57720 | HCPCS | facility | Revision of cervix | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 58558 | HCPCS | facility | HC HYSTEROS; W BX ENDOMET/POLPECT | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | $6227.0 | $4358.9 | $1682.06 | $4303.61 |
| 58562 | HCPCS | facility | Hysteroscopy remove fb | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1682.06 | $6735.22 |
| 58800 | HCPCS | facility | Drainage of ovarian cyst(s) | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 58900 | HCPCS | facility | Biopsy of ovary(s) | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 59160 | HCPCS | facility | D & c after delivery | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | $4476.0 | $3133.2 | $1454.55 | $4303.61 |
| 59409 | HCPCS | facility | Obstetrical care | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 10 | 1 | n/a | n/a | $1454.55 | $7181.54 |
| 59412 | HCPCS | facility | Antepartum manipulation | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 10 | 1 | $5021.0 | $3514.7 | $1454.55 | $7181.54 |
| 59414 | HCPCS | facility | Deliver placenta | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 9 | 1 | n/a | n/a | $1454.55 | $7181.54 |
| 59812 | HCPCS | facility | HC TREATMENT INCOMPLETE ABORTION, ANY TRIMESTER SURG | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | $7144.0 | $5000.8 | $1454.55 | $6735.22 |
| 59820 | HCPCS | facility | Care of miscarriage | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 59840 | HCPCS | facility | Abortion | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 59841 | HCPCS | facility | Abortion | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | n/a | n/a | $1454.55 | $6735.22 |
| 59871 | HCPCS | facility | HC CERCLAGE CERVIX, REMOVAL/RR | $2700.25 | $3879.52 | $-1179.27 | 0.70 | 11 | 1 | $4462.0 | $3123.4 | $1454.55 | $6735.22 |
| 23330 | HCPCS | facility | Remove shoulder foreign body | $780.56 | $1979.35 | $-1198.79 | 0.39 | 11 | 1 | n/a | n/a | $583.61 | $1979.35 |
| 0656T | HCPCS | facility | Vrt bdy tethering ant | $19805.99 | $21013.36 | $-1207.37 | 0.94 | 1 | 1 | n/a | n/a | $19805.99 | $21013.36 |
| 0657T | HCPCS | facility | Vrt bdy tethering ant 8+ seg | $19805.99 | $21013.36 | $-1207.37 | 0.94 | 1 | 1 | n/a | n/a | $19805.99 | $21013.36 |
| 0790T | HCPCS | facility | Revj rplcmt/rmvl vrt tethrg | $19805.99 | $21013.36 | $-1207.37 | 0.94 | 1 | 1 | n/a | n/a | $19805.99 | $21013.36 |
| 22836 | HCPCS | facility | Ant thrc vrt body tethrg <7 | $19805.99 | $21013.36 | $-1207.37 | 0.94 | 1 | 1 | n/a | n/a | $19805.99 | $21013.36 |
| 22837 | HCPCS | facility | Ant thrc vrt body tethrg 8+ | $19805.99 | $21013.36 | $-1207.37 | 0.94 | 1 | 1 | n/a | n/a | $19805.99 | $21013.36 |
| 22838 | HCPCS | facility | Rev rplc/rmv thrc vrt tethrg | $19805.99 | $21013.36 | $-1207.37 | 0.94 | 1 | 1 | n/a | n/a | $19805.99 | $21013.36 |
| 38720 | HCPCS | facility | Removal of lymph nodes neck | $6735.22 | $7957.89 | $-1222.67 | 0.85 | 11 | 1 | n/a | n/a | $1820.0 | $8518.16 |
| 33206 | HCPCS | facility | HC INSERT/REPL ATRIAL PM, NEW | $11297.59 | $12526.17 | $-1228.58 | 0.90 | 11 | 1 | $6993.0 | $4895.1 | $5349.59 | $21267.94 |
| 33207 | HCPCS | facility | HC INSERT/REPL VENTRI PM, NEW | $11297.59 | $12526.17 | $-1228.58 | 0.90 | 11 | 1 | $16299.0 | $11409.3 | $5349.59 | $17603.1 |
| 33213 | HCPCS | facility | HC INSERT PACER PULSE GENERATOR ONLY; W/EXIST DUAL LEAD | $11297.59 | $12526.17 | $-1228.58 | 0.90 | 11 | 1 | $23161.0 | $16212.7 | $5014.56 | $21267.94 |
| 33228 | HCPCS | facility | HC REMOVE & REPL PM GEN, DUAL | $11297.59 | $12526.17 | $-1228.58 | 0.90 | 11 | 1 | $16299.0 | $11409.3 | $5014.56 | $33588.83 |
| 51845 | HCPCS | facility | Repair bladder neck | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $3405.53 | $6735.22 |
| 55920 | HCPCS | facility | Place needles pelvic for rt | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $1852.58 | $6735.22 |
| 57220 | HCPCS | facility | Revision of urethra | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $3405.53 | $6735.22 |
| 57240 | HCPCS | facility | Repair bladder & vagina | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 57250 | HCPCS | facility | Repair rectum & vagina | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 57260 | HCPCS | facility | Repair of vagina | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 57265 | HCPCS | facility | Extensive repair of vagina | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $3405.53 | $8915.56 |
| 57284 | HCPCS | facility | Repair paravag defect open | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $3405.53 | $6735.22 |
| 57288 | HCPCS | facility | Repair bladder defect | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $3405.53 | $6735.22 |
| 57320 | HCPCS | facility | Repair bladder-vagina lesion | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 57555 | HCPCS | facility | Remove cervix/repair vagina | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 57556 | HCPCS | facility | Remove cervix repair bowel | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $3405.53 | $8915.56 |
| 58260 | HCPCS | facility | Vaginal hysterectomy | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 58262 | HCPCS | facility | Vag hyst including t/o | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 58263 | HCPCS | facility | Vag hyst w/t/o & vag repair | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 58270 | HCPCS | facility | Vag hyst w/enterocele repair | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 58350 | HCPCS | facility | Reopen fallopian tube | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 58353 | HCPCS | facility | Endometr ablate thermal | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 58356 | HCPCS | facility | Endometrial cryoablation | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $3405.53 | $8915.56 |
| 58560 | HCPCS | facility | Hysteroscopy resect septum | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2676.08 | $6735.22 |
| 58561 | HCPCS | facility | Hysteroscopy remove myoma | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2676.08 | $6735.22 |
| 58563 | HCPCS | facility | Hysteroscopy ablation | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2676.08 | $6735.22 |
| 58565 | HCPCS | facility | Hysteroscopy sterilization | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $3405.53 | $6735.22 |
| 58925 | HCPCS | facility | Removal of ovarian cyst(s) | $4718.12 | $5995.17 | $-1277.05 | 0.79 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 19325 | HCPCS | facility | Enlarge breast with implant | $8518.16 | $9795.38 | $-1277.22 | 0.87 | 11 | 1 | n/a | n/a | $4562.0 | $11889.17 |
| 19342 | HCPCS | facility | Delayed breast prosthesis | $8518.16 | $9795.38 | $-1277.22 | 0.87 | 11 | 1 | n/a | n/a | $4562.0 | $11889.17 |
| 0510T | HCPCS | facility | Rmvl sinus tarsi implant | $2623.34 | $3921.32 | $-1297.98 | 0.67 | 3 | 1 | n/a | n/a | $2623.34 | $3921.32 |
| 65130 | HCPCS | facility | Insert ocular implant | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 65135 | HCPCS | facility | Insert ocular implant | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $4711.57 |
| 65150 | HCPCS | facility | Revise ocular implant | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $4711.57 |
| 65275 | HCPCS | facility | Repair of eye wound | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1676.62 | $6735.22 |
| 65290 | HCPCS | facility | HC RPR WND EO MUSC TEND/TENON CAP | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | $6300.0 | $4410.0 | $1797.67 | $6735.22 |
| 67218 | HCPCS | facility | Treatment of retinal lesion | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1442.12 | $8915.56 |
| 67312 | HCPCS | facility | Revise two eye muscles | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1797.67 | $6735.22 |
| 67346 | HCPCS | facility | Biopsy eye muscle | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1131.62 | $4711.57 |
| 67400 | HCPCS | facility | Explore/biopsy eye socket | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 67560 | HCPCS | facility | Revise eye socket implant | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $4711.57 |
| 67902 | HCPCS | facility | Repair eyelid defect | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $8915.56 |
| 67906 | HCPCS | facility | Repair eyelid defect | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1367.92 | $8915.56 |
| 67974 | HCPCS | facility | Reconstruction of eyelid | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 68325 | HCPCS | facility | Revise/graft eyelid lining | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68326 | HCPCS | facility | Revise/graft eyelid lining | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1367.92 | $6735.22 |
| 68335 | HCPCS | facility | Revise/graft eyelid lining | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68360 | HCPCS | facility | Revise eyelid lining | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1676.62 | $4711.57 |
| 68500 | HCPCS | facility | Removal of tear gland | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68505 | HCPCS | facility | Partial removal tear gland | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68520 | HCPCS | facility | Removal of tear sac | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68550 | HCPCS | facility | Remove tear gland lesion | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68720 | HCPCS | facility | Create tear sac drain | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68745 | HCPCS | facility | Create tear duct drain | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 68750 | HCPCS | facility | Create tear duct drain | $3402.39 | $4711.57 | $-1309.18 | 0.72 | 11 | 1 | n/a | n/a | $1904.06 | $6735.22 |
| 12037 | HCPCS | facility | HC REPAIR, INTERMED-SCALP,AXILLAE,TRUNK,EXTREM(EXCL HANDS&FEET); >30.0 CM | $1151.97 | $2472.73 | $-1320.76 | 0.47 | 11 | 1 | $3514.0 | $2459.8 | $251.48 | $2472.73 |
| 12047 | HCPCS | facility | Intmd rpr n-hf/genit >30.0cm | $1151.97 | $2472.73 | $-1320.76 | 0.47 | 11 | 1 | n/a | n/a | $251.48 | $2472.73 |
| 15040 | HCPCS | facility | Harvest cultured skin graft | $1151.97 | $2472.73 | $-1320.76 | 0.47 | 11 | 1 | n/a | n/a | $251.48 | $2472.73 |
| 15110 | HCPCS | facility | Epidrm autogrft trnk/arm/leg | $1151.97 | $2472.73 | $-1320.76 | 0.47 | 11 | 1 | $3999.0 | $2799.3 | $393.38 | $2753.02 |
| 15150 | HCPCS | facility | Cult skin grft t/arm/leg | $1151.97 | $2472.73 | $-1320.76 | 0.47 | 11 | 1 | n/a | n/a | $251.48 | $2472.73 |
| 15273 | HCPCS | facility | HC SKIN SUB GRFT TRUNK/ARMS/LEGS, >/= 100 SQ CM | $1151.97 | $2472.73 | $-1320.76 | 0.47 | 11 | 1 | $1630.0 | $1141.0 | $393.38 | $3163.23 |
| 15277 | HCPCS | facility | HC SKIN SUB GRFT F/N/H/F, 1ST 100 SQ CM | $1151.97 | $2472.73 | $-1320.76 | 0.47 | 11 | 1 | $1630.0 | $1141.0 | $393.38 | $2472.73 |
| 0884T | HCPCS | facility | Esphgsc flx 1st tndsc dilat | $5952.81 | $7275.65 | $-1322.84 | 0.82 | 3 | 1 | n/a | n/a | $5952.81 | $7275.65 |
| 0885T | HCPCS | facility | Colsc flx 1st tndsc dilat | $5952.81 | $7275.65 | $-1322.84 | 0.82 | 3 | 1 | n/a | n/a | $5952.81 | $7275.65 |
| 0886T | HCPCS | facility | Sgmdsc flx 1st tndsc dilat | $5952.81 | $7275.65 | $-1322.84 | 0.82 | 3 | 1 | n/a | n/a | $5952.81 | $7275.65 |
| 31239 | HCPCS | facility | Nasal/sinus endoscopy surg | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $6735.22 |
| 31256 | HCPCS | facility | Exploration maxillary sinus | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $4468.23 |
| 31510 | HCPCS | facility | Laryngoscopy with biopsy | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1352.05 | $4468.23 |
| 31512 | HCPCS | facility | Removal of larynx lesion | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1352.05 | $4468.23 |
| 31528 | HCPCS | facility | Laryngoscopy and dilation | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $4468.23 |
| 31529 | HCPCS | facility | Laryngoscopy and dilation | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $4468.23 |
| 31531 | HCPCS | facility | Laryngoscopy w/fb & op scope | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1352.05 | $6735.22 |
| 31535 | HCPCS | facility | Laryngoscopy w/biopsy | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1352.05 | $4468.23 |
| 31536 | HCPCS | facility | Laryngoscopy w/bx & op scope | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1352.05 | $6735.22 |
| 31540 | HCPCS | facility | Laryngoscopy w/exc of tumor | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1352.05 | $6735.22 |
| 31541 | HCPCS | facility | Larynscop w/tumr exc + scope | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $6735.22 |
| 31545 | HCPCS | facility | Remove vc lesion w/scope | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1481.34 | $6735.22 |
| 31570 | HCPCS | facility | Laryngoscope w/vc inj | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1352.05 | $4468.23 |
| 31571 | HCPCS | facility | Laryngoscop w/vc inj + scope | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $4468.23 |
| 31578 | HCPCS | facility | Largsc w/removal lesion | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1352.05 | $4468.23 |
| 31628 | HCPCS | facility | Bronchoscopy/lung bx each | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $763.88 | $4468.23 |
| 31629 | HCPCS | facility | Bronchoscopy/needle bx each | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1572.2 | $4468.23 |
| 31630 | HCPCS | facility | Bronchoscopy dilate/fx repr | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1572.2 | $4468.23 |
| 31640 | HCPCS | facility | Bronchoscopy w/tumor excise | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1572.2 | $4468.23 |
| 31641 | HCPCS | facility | Bronchoscopy treat blockage | $3134.1 | $4468.23 | $-1334.13 | 0.70 | 11 | 1 | n/a | n/a | $1572.2 | $4468.23 |
| 0867T | HCPCS | facility | Tpla b9 prst8 hyprplsa>=50ml | $5083.62 | $6425.83 | $-1342.21 | 0.79 | 3 | 1 | n/a | n/a | $5083.62 | $6425.83 |
| 0518T | HCPCS | facility | Rmvl pg compnt wcs | $3130.53 | $4478.55 | $-1348.02 | 0.70 | 3 | 1 | n/a | n/a | $3130.53 | $4478.55 |
| 0530T | HCPCS | facility | Removal complete iims | $3130.53 | $4478.55 | $-1348.02 | 0.70 | 3 | 1 | n/a | n/a | $3130.53 | $4478.55 |
| 0531T | HCPCS | facility | Removal iims electrode only | $3130.53 | $4478.55 | $-1348.02 | 0.70 | 3 | 1 | n/a | n/a | $3130.53 | $4478.55 |
| 0532T | HCPCS | facility | Removal iims implt mntr only | $3130.53 | $4478.55 | $-1348.02 | 0.70 | 3 | 1 | n/a | n/a | $3130.53 | $4478.55 |
| J9266 | HCPCS | facility | Pegaspargase injection | $27070.53 | $28424.06 | $-1353.53 | 0.95 | 13 | 1 | n/a | n/a | $19717.46 | $28424.06 |
| 15931 | HCPCS | facility | Remove sacrum pressure sore | $2114.93 | $3481.15 | $-1366.22 | 0.61 | 11 | 1 | n/a | n/a | $1572.96 | $6735.22 |
| 27768 | HCPCS | facility | Cltx post ankle fx w/mnpj | $552.31 | $1927.09 | $-1374.78 | 0.29 | 11 | 1 | $2752.0 | $1926.4 | $131.74 | $1927.09 |
| D7410 | HCPCS | facility | Rad exc lesion up to 1.25 cm | $471.78 | $1859.49 | $-1387.71 | 0.25 | 3 | 1 | n/a | n/a | $331.44 | $1859.49 |
| 43195 | HCPCS | facility | Esophagoscopy rigid balloon | $3230.19 | $4620.58 | $-1390.39 | 0.70 | 11 | 1 | n/a | n/a | $926.78 | $4620.58 |
| 43229 | HCPCS | facility | Esophagoscopy lesion ablate | $3230.19 | $4620.58 | $-1390.39 | 0.70 | 11 | 1 | n/a | n/a | $1867.35 | $4620.58 |
| 43257 | HCPCS | facility | Egd w/thrml txmnt gerd | $3230.19 | $4620.58 | $-1390.39 | 0.70 | 11 | 1 | n/a | n/a | $1867.35 | $4620.58 |
| 43260 | HCPCS | facility | Ercp w/specimen collection | $3230.19 | $4620.58 | $-1390.39 | 0.70 | 11 | 1 | n/a | n/a | $1727.3 | $4620.58 |
| 43261 | HCPCS | facility | Endo cholangiopancreatograph | $3230.19 | $4620.58 | $-1390.39 | 0.70 | 11 | 1 | n/a | n/a | $1727.3 | $4620.58 |
| 43262 | HCPCS | facility | Endo cholangiopancreatograph | $3230.19 | $4620.58 | $-1390.39 | 0.70 | 11 | 1 | n/a | n/a | $1727.3 | $4620.58 |
| 43264 | HCPCS | facility | Ercp remove duct calculi | $3230.19 | $4620.58 | $-1390.39 | 0.70 | 11 | 1 | n/a | n/a | $1727.3 | $4620.58 |
| 43277 | HCPCS | facility | Ercp ea duct/ampulla dilate | $3230.19 | $4620.58 | $-1390.39 | 0.70 | 11 | 1 | n/a | n/a | $1727.3 | $4620.58 |
| 43278 | HCPCS | facility | Ercp lesion ablate w/dilate | $3230.19 | $4620.58 | $-1390.39 | 0.70 | 11 | 1 | n/a | n/a | $1727.3 | $4620.58 |
| 39401 | HCPCS | facility | Mediastinoscpy w/medstnl bx | $5850.405 | $7245.25 | $-1394.845 | 0.81 | 10 | 1 | n/a | n/a | $2564.75 | $7245.25 |
| 39402 | HCPCS | facility | Mediastinoscpy w/lmph nod bx | $5850.405 | $7245.25 | $-1394.845 | 0.81 | 10 | 1 | n/a | n/a | $2564.75 | $7245.25 |
| 21029 | HCPCS | facility | Contour of face bone lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 21031 | HCPCS | facility | Remove exostosis mandible | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 21032 | HCPCS | facility | Remove exostosis maxilla | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 21040 | HCPCS | facility | Excise mandible lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 21121 | HCPCS | facility | Reconstruction of chin | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $9619.86 |
| 21123 | HCPCS | facility | Reconstruction of chin | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $9619.86 |
| 21282 | HCPCS | facility | Revision of eyelid | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $8915.56 |
| 21296 | HCPCS | facility | Revision of jaw muscle/bone | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 21320 | HCPCS | facility | Closed tx nose fx w/ stablj | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 21325 | HCPCS | facility | Open tx nose fx uncomplicatd | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 21335 | HCPCS | facility | Open tx nose & septal fx | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 21337 | HCPCS | facility | Closed tx septal&nose fx | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 21440 | HCPCS | facility | Treat dental ridge fracture | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 30115 | HCPCS | facility | Removal of nose polyp(s) | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 30117 | HCPCS | facility | Removal of intranasal lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $6735.22 |
| 30118 | HCPCS | facility | Removal of intranasal lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 30130 | HCPCS | facility | Excise inferior turbinate | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 30140 | HCPCS | facility | Resect inferior turbinate | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 30520 | HCPCS | facility | Repair of nasal septum | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 30630 | HCPCS | facility | Repair nasal septum defect | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 30930 | HCPCS | facility | Ther fx nasal inf turbinate | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 31020 | HCPCS | facility | Exploration maxillary sinus | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 31205 | HCPCS | facility | Removal of ethmoid sinus | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 31300 | HCPCS | facility | Removal of larynx lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 31600 | HCPCS | facility | Incision of windpipe | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 31611 | HCPCS | facility | Surgery/speech prosthesis | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 31612 | HCPCS | facility | Puncture/clear windpipe | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1727.73 | $4341.44 |
| 31613 | HCPCS | facility | Repair windpipe opening | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 31825 | HCPCS | facility | Repair of windpipe defect | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 31830 | HCPCS | facility | Revise windpipe scar | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 40500 | HCPCS | facility | Partial excision of lip | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 40510 | HCPCS | facility | Partial excision of lip | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 40520 | HCPCS | facility | Partial excision of lip | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 40525 | HCPCS | facility | Reconstruct lip with flap | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 40530 | HCPCS | facility | Partial removal of lip | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 40814 | HCPCS | facility | Excise/repair mouth lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 40816 | HCPCS | facility | Excision of mouth lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 41105 | HCPCS | facility | Biopsy of tongue | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 41112 | HCPCS | facility | Excision of tongue lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 41113 | HCPCS | facility | Excision of tongue lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 41114 | HCPCS | facility | Excision of tongue lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 41820 | HCPCS | facility | Excision gum each quadrant | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 41874 | HCPCS | facility | Repair tooth socket | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 42104 | HCPCS | facility | Excision lesion mouth roof | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 42106 | HCPCS | facility | Excision lesion mouth roof | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 42140 | HCPCS | facility | Excision of uvula | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 42305 | HCPCS | facility | Drainage of salivary gland | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 42330 | HCPCS | facility | Removal of salivary stone | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 42335 | HCPCS | facility | Removal of salivary stone | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 42340 | HCPCS | facility | Removal of salivary stone | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 42408 | HCPCS | facility | Excision of salivary cyst | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 42409 | HCPCS | facility | Drainage of salivary cyst | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 42665 | HCPCS | facility | Ligation of salivary duct | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1727.73 | $4341.44 |
| 42806 | HCPCS | facility | Biopsy of upper nose/throat | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 42808 | HCPCS | facility | Excise pharynx lesion | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 42810 | HCPCS | facility | Excision of neck cyst | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 42821 | HCPCS | facility | Remove tonsils and adenoids | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 42826 | HCPCS | facility | Removal of tonsils | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 42831 | HCPCS | facility | Removal of adenoids | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 42835 | HCPCS | facility | Removal of adenoids | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 42836 | HCPCS | facility | Removal of adenoids | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 42962 | HCPCS | facility | Control throat bleeding | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 42972 | HCPCS | facility | Control nose/throat bleeding | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $4303.61 |
| 43420 | HCPCS | facility | Repair esophagus opening | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 69300 | HCPCS | facility | Revise external ear | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 69421 | HCPCS | facility | Incision of eardrum | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1147.39 | $6735.22 |
| 69450 | HCPCS | facility | Eardrum revision | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1727.73 | $4341.44 |
| 69620 | HCPCS | facility | Repair of eardrum | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $4303.61 |
| 69666 | HCPCS | facility | Repair middle ear structures | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 69667 | HCPCS | facility | Repair middle ear structures | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 69676 | HCPCS | facility | Remove middle ear nerve | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1799.78 | $6735.22 |
| 69711 | HCPCS | facility | Remove/repair hearing aid | $2551.58 | $3973.4 | $-1421.82 | 0.64 | 11 | 1 | n/a | n/a | $1727.73 | $4341.44 |
| 19281 | HCPCS | facility | HC PERQ DEV BRST;1ST LES MAMMO | $552.31 | $1979.35 | $-1427.04 | 0.28 | 11 | 1 | $2367.0 | $1656.9 | $49.64 | $1979.35 |
| 54326 | HCPCS | facility | Reconstruction of urethra | $2775.49 | $4224.5 | $-1449.01 | 0.66 | 11 | 1 | n/a | n/a | $1989.5 | $6735.22 |
| 54420 | HCPCS | facility | Revision of penis | $2775.49 | $4224.5 | $-1449.01 | 0.66 | 11 | 1 | n/a | n/a | $1989.5 | $6735.22 |
| 54435 | HCPCS | facility | Revision of penis | $2775.49 | $4224.5 | $-1449.01 | 0.66 | 11 | 1 | n/a | n/a | $1989.5 | $6735.22 |
| 33210 | HCPCS | facility | HC INSERTION OF TEMP PACER WIRE | $8467.02 | $9917.62 | $-1450.6 | 0.85 | 11 | 1 | $12025.0 | $8417.5 | $3766.05 | $11889.17 |
| 33211 | HCPCS | facility | Insert card electrodes dual | $8467.02 | $9917.62 | $-1450.6 | 0.85 | 11 | 1 | n/a | n/a | $3766.05 | $11889.17 |
| 33216 | HCPCS | facility | HC INSERT/REPL/REV SING CHAM LEAD | $8467.02 | $9917.62 | $-1450.6 | 0.85 | 11 | 1 | $12880.0 | $9016.0 | $3766.05 | $17603.1 |
| 33217 | HCPCS | facility | HC INSERT/REPL/REV DUAL CHAM LEAD | $8467.02 | $9917.62 | $-1450.6 | 0.85 | 11 | 1 | $12880.0 | $9016.0 | $3766.05 | $17603.1 |
| D4266 | HCPCS | facility | Guided tiss regen resorble | $406.74 | $1859.49 | $-1452.75 | 0.22 | 2 | 1 | n/a | n/a | $406.74 | $1859.49 |
| 49592 | HCPCS | facility | Rpr aa hrn 1st < 3 ncr/strn | $5790.38 | $7245.25 | $-1454.87 | 0.80 | 9 | 1 | n/a | n/a | $4858.22 | $11889.17 |
| 49594 | HCPCS | facility | Rpr aa hrn 1st 3-10 ncr/strn | $5790.38 | $7245.25 | $-1454.87 | 0.80 | 9 | 1 | n/a | n/a | $4858.22 | $11889.17 |
| 49614 | HCPCS | facility | Rpr aa hrn rcr < 3 ncr/strn | $5790.38 | $7245.25 | $-1454.87 | 0.80 | 9 | 1 | n/a | n/a | $4858.22 | $11889.17 |
| 19355 | HCPCS | facility | Correct inverted nipple(s) | $3234.22 | $4692.44 | $-1458.22 | 0.69 | 11 | 1 | n/a | n/a | $2458.99 | $6735.22 |
| 19370 | HCPCS | facility | Surgery of breast capsule | $3234.22 | $4692.44 | $-1458.22 | 0.69 | 11 | 1 | n/a | n/a | $2458.99 | $6735.22 |
| 19371 | HCPCS | facility | Removal of breast capsule | $3234.22 | $4692.44 | $-1458.22 | 0.69 | 11 | 1 | n/a | n/a | $2458.99 | $6735.22 |
| 19396 | HCPCS | facility | Design custom breast implant | $3234.22 | $4692.44 | $-1458.22 | 0.69 | 11 | 1 | n/a | n/a | $2458.99 | $4692.44 |
| D7251 | HCPCS | facility | Coronectomy | $391.11 | $1859.49 | $-1468.38 | 0.21 | 2 | 1 | n/a | n/a | $391.11 | $1859.49 |
| 92920 | HCPCS | facility | HC PRQ CARDIAC ANGIOPLAST 1 ART | $5350.17 | $6821.04 | $-1470.87 | 0.78 | 11 | 1 | $10275.0 | $7192.5 | $4023.05 | $11889.17 |
| 92986 | HCPCS | facility | Revision of aortic valve | $5350.17 | $6821.04 | $-1470.87 | 0.78 | 11 | 1 | n/a | n/a | $4023.05 | $8915.56 |
| 19101 | HCPCS | facility | Biopsy of breast open | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | $8050.0 | $5635.0 | $1862.77 | $4692.44 |
| 19110 | HCPCS | facility | Nipple exploration | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1862.77 | $4692.44 |
| 19112 | HCPCS | facility | Excise breast duct fistula | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1862.77 | $6735.22 |
| 19120 | HCPCS | facility | Removal of breast lesion | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1862.77 | $6735.22 |
| 19125 | HCPCS | facility | Excision breast lesion | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1862.77 | $4692.44 |
| 19300 | HCPCS | facility | Removal of Breast Tissue | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1862.77 | $6735.22 |
| 19301 | HCPCS | facility | Partial Mastectomy | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1862.77 | $6735.22 |
| 19350 | HCPCS | facility | Breast reconstruction | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1862.77 | $6735.22 |
| 38308 | HCPCS | facility | Incision of lymph channels | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1820.0 | $4692.44 |
| 38500 | HCPCS | facility | Biopsy/removal lymph nodes | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1820.0 | $4692.44 |
| 38510 | HCPCS | facility | Biopsy/removal lymph nodes | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1820.0 | $4692.44 |
| 38520 | HCPCS | facility | Biopsy/removal lymph nodes | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1820.0 | $4692.44 |
| 38525 | HCPCS | facility | Biopsy/removal lymph nodes | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1820.0 | $4692.44 |
| 38530 | HCPCS | facility | Biopsy/removal lymph nodes | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1820.0 | $4692.44 |
| 38550 | HCPCS | facility | Removal neck/armpit lesion | $3220.27 | $4692.44 | $-1472.17 | 0.69 | 11 | 1 | n/a | n/a | $1820.0 | $6735.22 |
| 0652T | HCPCS | facility | Egd flx transnasal dx br/wa | $826.39 | $2299.71 | $-1473.32 | 0.36 | 3 | 1 | n/a | n/a | $826.39 | $2299.71 |
| 0653T | HCPCS | facility | Egd flx transnasal bx 1/ml | $826.39 | $2299.71 | $-1473.32 | 0.36 | 3 | 1 | n/a | n/a | $826.39 | $2299.71 |
| 52284 | HCPCS | facility | Cysto rx balo cath urtl strx | $4935.21 | $6425.83 | $-1490.62 | 0.77 | 3 | 1 | n/a | n/a | $4935.21 | $6425.83 |
| 46285 | HCPCS | facility | Remove anal fist 2 stage | $1829.43 | $3326.48 | $-1497.05 | 0.55 | 11 | 1 | n/a | n/a | $1727.73 | $3326.48 |
| 46706 | HCPCS | facility | Repr of anal fistula w/glue | $1829.43 | $3326.48 | $-1497.05 | 0.55 | 11 | 1 | n/a | n/a | $1727.73 | $3326.48 |
| 33280 | HCPCS | facility | Rmvl phrnc nrv stim pg only | $2689.33 | $4189.9 | $-1500.57 | 0.64 | 3 | 1 | n/a | n/a | $2689.33 | $4189.9 |
| 31242 | HCPCS | facility | Nsl/sinus ndsc rf abltj pnn | $5585.51 | $7094.6 | $-1509.09 | 0.79 | 3 | 1 | n/a | n/a | $5585.51 | $7094.6 |
| 31243 | HCPCS | facility | Nsl/sinus ndsc cryoabltj pnn | $5585.51 | $7094.6 | $-1509.09 | 0.79 | 3 | 1 | n/a | n/a | $5585.51 | $7094.6 |
| 33289 | HCPCS | facility | HC TRANSCATH IMPL WIRELESS PULMON ARTERY PRS SENSOR L-T HEMODYN MNTR | $32865.635 | $34375.49 | $-1509.855 | 0.96 | 8 | 1 | $49747.0 | $34822.9 | $19071.47 | $34375.49 |
| 45100 | HCPCS | facility | Biopsy of rectum | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | $5301.0 | $3710.7 | $1278.85 | $3326.48 |
| 45307 | HCPCS | facility | Proctosigmoidoscopy fb | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1531.17 | $3326.48 |
| 45308 | HCPCS | facility | Proctosigmoidoscopy removal | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $715.56 | $3326.48 |
| 45320 | HCPCS | facility | Proctosigmoidoscopy ablate | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1531.17 | $3326.48 |
| 45321 | HCPCS | facility | Proctosigmoidoscopy volvul | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1531.17 | $3326.48 |
| 46070 | HCPCS | facility | Incision of anal septum | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1278.85 | $3326.48 |
| 46230 | HCPCS | facility | Removal of anal tags | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1278.85 | $3326.48 |
| 46610 | HCPCS | facility | Anoscopy remove lesion | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1531.17 | $3326.48 |
| 46612 | HCPCS | facility | Anoscopy remove lesions | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1531.17 | $3326.48 |
| 46615 | HCPCS | facility | Anoscopy | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1531.17 | $3326.48 |
| 46922 | HCPCS | facility | Excision of anal lesion(s) | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1417.8 | $3326.48 |
| 46924 | HCPCS | facility | Destruction anal lesion(s) | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1417.8 | $3326.48 |
| 46940 | HCPCS | facility | Treatment of anal fissure | $1805.48 | $3326.48 | $-1521.0 | 0.54 | 11 | 1 | n/a | n/a | $1278.85 | $3326.48 |
| 36640 | HCPCS | facility | Insertion catheter artery | $2228.0 | $3784.07 | $-1556.07 | 0.59 | 11 | 1 | n/a | n/a | $1727.73 | $3784.07 |
| 75731 | HCPCS | facility | Artery x-rays adrenal gland | $2219.82 | $3784.07 | $-1564.25 | 0.59 | 10 | 1 | $1456.0 | $1019.2 | $1250.63 | $7702.13 |
| 75810 | HCPCS | facility | HC SPLENOPORTOGRAPHY, RADIO S&I | $2219.82 | $3784.07 | $-1564.25 | 0.59 | 10 | 1 | $2568.0 | $1797.6 | $1250.63 | $7777.59 |
| 23031 | HCPCS | facility | Drain shoulder bursa | $1911.47 | $3481.15 | $-1569.68 | 0.55 | 11 | 1 | n/a | n/a | $1319.12 | $4303.61 |
| 38305 | HCPCS | facility | Drainage lymph node lesion | $1911.47 | $3481.15 | $-1569.68 | 0.55 | 11 | 1 | n/a | n/a | $1319.12 | $4303.61 |
| 54520 | HCPCS | facility | Removal of testis | $2649.31 | $4224.5 | $-1575.19 | 0.63 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 55500 | HCPCS | facility | Removal of hydrocele | $2649.31 | $4224.5 | $-1575.19 | 0.63 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 63688 | HCPCS | facility | HC REVISION/REMOVE IMPLANTED SPINAL NEUROSTIM PULSE GENERATOR/RECEIVER | $2598.26 | $4189.9 | $-1591.64 | 0.62 | 11 | 1 | $6269.0 | $4388.3 | $1727.73 | $4189.9 |
| 64595 | HCPCS | facility | Revise/rmv pn/gastr stimul | $2598.26 | $4189.9 | $-1591.64 | 0.62 | 11 | 1 | n/a | n/a | $1727.73 | $4189.9 |
| 62365 | HCPCS | facility | HC REMOVE SUBQ RESVR/PUMP, INTRATHECAL/INFUSION | $2481.58 | $4094.07 | $-1612.49 | 0.61 | 11 | 1 | $9703.0 | $6792.1 | $1727.73 | $5221.55 |
| 65260 | HCPCS | facility | Remove foreign body from eye | $1151.97 | $2765.81 | $-1613.84 | 0.42 | 11 | 1 | n/a | n/a | $416.39 | $2765.81 |
| 65900 | HCPCS | facility | Remove eye lesion | $1151.97 | $2765.81 | $-1613.84 | 0.42 | 11 | 1 | n/a | n/a | $144.79 | $2765.81 |
| 66500 | HCPCS | facility | Incision of iris | $1151.97 | $2765.81 | $-1613.84 | 0.42 | 11 | 1 | n/a | n/a | $144.79 | $2765.81 |
| 67299 | HCPCS | facility | Eye surgery procedure | $1151.97 | $2765.81 | $-1613.84 | 0.42 | 5 | 1 | n/a | n/a | $1102.36 | $2765.81 |
| 25251 | HCPCS | facility | Removal of wrist prosthesis | $2306.77 | $3921.32 | $-1614.55 | 0.59 | 11 | 1 | n/a | n/a | $1727.73 | $3921.32 |
| 57285 | HCPCS | facility | Repair paravag defect vag | $7255.2 | $8887.01 | $-1631.81 | 0.82 | 11 | 1 | n/a | n/a | $3405.53 | $8915.56 |
| 57289 | HCPCS | facility | Repair bladder & vagina | $7255.2 | $8887.01 | $-1631.81 | 0.82 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 58292 | HCPCS | facility | Vag hyst t/o & repair compl | $7255.2 | $8887.01 | $-1631.81 | 0.82 | 11 | 1 | n/a | n/a | $3405.53 | $8915.56 |
| 35860 | HCPCS | facility | Explore limb vessels | $2149.26 | $3784.07 | $-1634.81 | 0.57 | 11 | 1 | n/a | n/a | $1727.73 | $3784.07 |
| 0917T | HCPCS | facility | Insj perm ccm-d sys 1 lead | $8275.98 | $9917.62 | $-1641.64 | 0.83 | 3 | 1 | n/a | n/a | $8275.98 | $9917.62 |
| 0918T | HCPCS | facility | Insj perm ccm-d sys dual ld | $8275.98 | $9917.62 | $-1641.64 | 0.83 | 3 | 1 | n/a | n/a | $8275.98 | $9917.62 |
| 50437 | HCPCS | facility | Dilat xst trc new access rcs | $2576.255 | $4224.5 | $-1648.245 | 0.61 | 10 | 1 | $5795.0 | $4056.5 | $1727.73 | $4546.55 |
| 34101 | HCPCS | facility | Removal of artery clot | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 34111 | HCPCS | facility | Removal of arm artery clot | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 34201 | HCPCS | facility | Removal of artery clot | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 34203 | HCPCS | facility | Removal of leg artery clot | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 34501 | HCPCS | facility | Repair valve femoral vein | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 34510 | HCPCS | facility | Transposition of vein valve | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 34520 | HCPCS | facility | Cross-over vein graft | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 35011 | HCPCS | facility | Repair defect of artery | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $2671.31 | $8915.56 |
| 35045 | HCPCS | facility | Repair defect of arm artery | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $2149.26 | $8915.56 |
| 35188 | HCPCS | facility | Repair blood vessel lesion | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 35201 | HCPCS | facility | Repair blood vessel lesion | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $2149.26 | $6735.22 |
| 35236 | HCPCS | facility | Repair blood vessel lesion | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $2149.26 | $6735.22 |
| 35256 | HCPCS | facility | Repair blood vessel lesion | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $2149.26 | $6735.22 |
| 35266 | HCPCS | facility | Repair blood vessel lesion | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $2671.31 | $6735.22 |
| 35286 | HCPCS | facility | Repair blood vessel lesion | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $2671.31 | $6735.22 |
| 35321 | HCPCS | facility | Rechanneling of artery | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $2149.26 | $6735.22 |
| 35875 | HCPCS | facility | Removal of clot in graft | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $8915.56 |
| 35876 | HCPCS | facility | Removal of clot in graft | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $8915.56 |
| 35879 | HCPCS | facility | Revise graft w/vein | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $9619.86 |
| 35881 | HCPCS | facility | Revise graft w/vein | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $9619.86 |
| 35883 | HCPCS | facility | Revise Graft w/Nonauto Graft | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $8915.56 |
| 35884 | HCPCS | facility | Revise graft w/vein | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $8915.56 |
| 36223 | HCPCS | facility | HC SEL CATH PLACE, CAROT/INNO ART, INCL ANGIO IP INTRA CAROTID, INCL ANGIO | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | $10135.0 | $7094.5 | $2219.82 | $8915.56 |
| 36253 | HCPCS | facility | HC SUPERSELECTIVE CATH PLACE (2ND) RENAL ART; FLUSH AORTOGRAM; UNILAT | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | $10135.0 | $7094.5 | $2219.82 | $6735.22 |
| 36563 | HCPCS | facility | HC INSERT TUNNELED CVAD, W/ SUBCUTANEOUS PUMP | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | $10135.0 | $7094.5 | $2228.0 | $6735.22 |
| 36566 | HCPCS | facility | HC INSERT TUNNELED CVAD, REQ 2X CATH VIA 2 VENOUS SITES; W/ SUBC PORT | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | $10135.0 | $7094.5 | $2228.0 | $6735.22 |
| 36800 | HCPCS | facility | HC DIALYSIS CATHETER INSERTION | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | $3808.0 | $2665.6 | $2679.73 | $6735.22 |
| 36815 | HCPCS | facility | HC INSERT CANNULA HEMO, OTH PURPOSE; ARTERIO, REVS, CLOS | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | $9112.0 | $6378.4 | $2679.73 | $6735.22 |
| 36818 | HCPCS | facility | Av fuse uppr arm cephalic | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 36819 | HCPCS | facility | Av fuse uppr arm basilic | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 36820 | HCPCS | facility | Av fusion/forearm vein | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 36825 | HCPCS | facility | Artery-vein autograft | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 36830 | HCPCS | facility | Artery-vein nonautograft | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 36831 | HCPCS | facility | Open thrombect av fistula | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $8915.56 |
| 36832 | HCPCS | facility | Av fistula revision open | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 36833 | HCPCS | facility | Av fistula revision | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 36838 | HCPCS | facility | Dist revas ligation hemo | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $3100.23 | $6735.22 |
| 36861 | HCPCS | facility | Cannula declotting | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | n/a | n/a | $2679.73 | $6735.22 |
| 37191 | HCPCS | facility | HC INSRT ENDOVAS VENA CAVA FILTER | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 11 | 1 | $8111.0 | $5677.7 | $3024.65 | $9619.86 |
| 75605 | HCPCS | facility | Contrast exam thoracic aorta | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 10 | 1 | $10135.0 | $7094.5 | $2219.82 | $15667.56 |
| 75705 | HCPCS | facility | Artery x-rays spine | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 10 | 1 | $10135.0 | $7094.5 | $2219.82 | $15667.56 |
| 75726 | HCPCS | facility | Artery x-rays abdomen | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 10 | 1 | $7672.0 | $5370.4 | $2219.82 | $15667.56 |
| 75736 | HCPCS | facility | Artery x-rays pelvis | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 10 | 1 | $7233.0 | $5063.1 | $2219.82 | $15667.56 |
| 75893 | HCPCS | facility | HC VENOUS SAMPLING THROUGH CATHETER, W/ W/O ANGIOGRAPHY, RADIOLO S&I | $5004.8 | $6668.74 | $-1663.94 | 0.75 | 10 | 1 | $10135.0 | $7094.5 | $2219.82 | $15667.56 |
| 11971 | HCPCS | facility | Remove tissue expander(s) | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1661.08 | $3481.15 |
| 15780 | HCPCS | facility | Dermabrasion total face | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1661.08 | $3481.15 |
| 15839 | HCPCS | facility | Excise excess skin & tissue | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1121.75 | $3481.15 |
| 21014 | HCPCS | facility | Exc face tum deep 2 cm/> | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $583.61 | $3481.15 |
| 23030 | HCPCS | facility | Drain shoulder lesion | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1319.12 | $3481.15 |
| 27324 | HCPCS | facility | Biopsy thigh soft tissues | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1661.08 | $3481.15 |
| 51080 | HCPCS | facility | Drainage of bladder abscess | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1319.12 | $3481.15 |
| 54105 | HCPCS | facility | Biopsy of penis | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1661.08 | $3481.15 |
| 54115 | HCPCS | facility | Treatment of penis lesion | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1319.12 | $3481.15 |
| 54500 | HCPCS | facility | Biopsy of testis | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1118.54 | $3481.15 |
| 69110 | HCPCS | facility | Remove external ear partial | $1805.48 | $3481.15 | $-1675.67 | 0.52 | 11 | 1 | n/a | n/a | $1121.75 | $3481.15 |
| 58580 | HCPCS | facility | Transcrv abltj utrn fibrd rf | $7207.28 | $8887.01 | $-1679.73 | 0.81 | 5 | 1 | n/a | n/a | $7207.28 | $8887.01 |
| C9792 | HCPCS | facility | Blind/nonblind trans atrial | $9750.0 | $11437.73 | $-1687.73 | 0.85 | 3 | 1 | n/a | n/a | $9750.0 | $11437.73 |
| 57120 | HCPCS | facility | Closure of vagina | $4303.61 | $5995.17 | $-1691.56 | 0.72 | 11 | 1 | n/a | n/a | $2639.44 | $5995.17 |
| 58559 | HCPCS | facility | Hysteroscopy lysis | $4303.61 | $5995.17 | $-1691.56 | 0.72 | 11 | 1 | n/a | n/a | $1682.06 | $5995.17 |
| 50694 | HCPCS | facility | HC PLACE URETERAL STENT PERCUT, INCL IMAG GUID, NEW, W/O NEPHRO CATH | $2527.58 | $4224.5 | $-1696.92 | 0.60 | 10 | 1 | $6408.0 | $4485.6 | $1727.73 | $4224.5 |
| 50695 | HCPCS | facility | HC PLACE URETERAL STENT PERCUT, INCL IMAG GUID, NEW, W/ NEPHRO CATH | $2527.58 | $4224.5 | $-1696.92 | 0.60 | 10 | 1 | $6408.0 | $4485.6 | $1727.73 | $4224.5 |
| D7310 | HCPCS | facility | Alveoplasty w/ extraction | $157.26 | $1859.49 | $-1702.23 | 0.08 | 3 | 1 | n/a | n/a | $110.36 | $1859.49 |
| 92018 | HCPCS | facility | New eye exam & treatment | $1131.62 | $2849.29 | $-1717.67 | 0.40 | 10 | 1 | n/a | n/a | $518.15 | $2849.29 |
| 92019 | HCPCS | facility | Eye exam & treatment | $1131.62 | $2849.29 | $-1717.67 | 0.40 | 10 | 1 | n/a | n/a | $518.15 | $2849.29 |
| 27487 | HCPCS | facility | Revise/replace knee joint | $19292.34 | $21013.36 | $-1721.02 | 0.92 | 7 | 1 | n/a | n/a | $18461.58 | $21013.36 |
| 27703 | HCPCS | facility | Reconstruction ankle joint | $19292.34 | $21013.36 | $-1721.02 | 0.92 | 7 | 1 | n/a | n/a | $11429.78 | $21013.36 |
| D7311 | HCPCS | facility | Alveoloplasty w/extract 1-3 | $138.08 | $1859.49 | $-1721.41 | 0.07 | 2 | 1 | n/a | n/a | $138.08 | $1859.49 |
| 0714T | HCPCS | facility | Tprnl lsr ablt b9 prst8 hypr | $4702.18 | $6425.83 | $-1723.65 | 0.73 | 3 | 1 | n/a | n/a | $4702.18 | $6425.83 |
| C9740 | HCPCS | facility | Cysto impl 4 or more | $9619.86 | $11345.06 | $-1725.2 | 0.85 | 7 | 1 | n/a | n/a | $8748.84 | $11345.06 |
| 23930 | HCPCS | facility | Drainage of arm lesion | $1727.73 | $3481.15 | $-1753.42 | 0.50 | 11 | 1 | n/a | n/a | $1319.12 | $3481.15 |
| 0644T | HCPCS | facility | Tcat rmvl/dblk icar mas perq | $5061.89 | $6821.04 | $-1759.15 | 0.74 | 3 | 1 | n/a | n/a | $5061.89 | $6821.04 |
| 37197 | HCPCS | facility | HC TRANSCATH RETRIEVAL, PERCUT, INTRVAS FOREIGN BODY, INCL IMAGING GUID | $2016.74 | $3784.07 | $-1767.33 | 0.53 | 10 | 1 | $5923.0 | $4146.1 | $1727.73 | $3784.07 |
| 42975 | HCPCS | facility | Dise eval slp do brth flx dx | $358.855 | $2133.11 | $-1774.255 | 0.17 | 10 | 1 | n/a | n/a | $168.12 | $2133.11 |
| 51020 | HCPCS | facility | Incise & treat bladder | $2444.72 | $4224.5 | $-1779.78 | 0.58 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 51520 | HCPCS | facility | Removal of bladder lesion | $2444.72 | $4224.5 | $-1779.78 | 0.58 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52214 | HCPCS | facility | Cystoscopy and treatment | $2444.72 | $4224.5 | $-1779.78 | 0.58 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52224 | HCPCS | facility | Cystoscopy and treatment | $2444.72 | $4224.5 | $-1779.78 | 0.58 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| 52341 | HCPCS | facility | Cysto W/Ureter Stricture Tx | $2444.72 | $4224.5 | $-1779.78 | 0.58 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52343 | HCPCS | facility | Cysto W/Renal Stricture Tx | $2444.72 | $4224.5 | $-1779.78 | 0.58 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52351 | HCPCS | facility | Cystouretero & or pyeloscope | $2444.72 | $4224.5 | $-1779.78 | 0.58 | 11 | 1 | n/a | n/a | $1908.86 | $4303.61 |
| G0330 | HCPCS | facility | Facility svs dental rehab | $2190.725 | $3973.4 | $-1782.675 | 0.55 | 4 | 1 | n/a | n/a | $2181.67 | $3973.4 |
| 23333 | HCPCS | facility | Remove shoulder fb deep | $1661.08 | $3481.15 | $-1820.07 | 0.48 | 11 | 1 | n/a | n/a | $780.56 | $3481.15 |
| 37650 | HCPCS | facility | Revision of major vein | $1958.67 | $3784.07 | $-1825.4 | 0.52 | 11 | 1 | n/a | n/a | $1727.73 | $3784.07 |
| 50575 | HCPCS | facility | Kidney endoscopy | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2737.09 | $6735.22 |
| 51050 | HCPCS | facility | Removal of bladder stone | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52240 | HCPCS | facility | Cystoscopy and treatment | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52325 | HCPCS | facility | Cystoscopy stone removal | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52346 | HCPCS | facility | Cystouretero W/Renal Strict | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52353 | HCPCS | facility | Cystouretero W/Lithotripsy | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2737.09 | $6735.22 |
| 52354 | HCPCS | facility | Cystouretero W/Biopsy | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52355 | HCPCS | facility | Cystouretero W/Excise Tumor | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $1908.86 | $6735.22 |
| 52356 | HCPCS | facility | Cysto/uretero w/lithotripsy | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | $13163.0 | $9214.1 | $3261.04 | $9619.86 |
| 52601 | HCPCS | facility | Prostatectomy (TURP) | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2737.09 | $6735.22 |
| 52648 | HCPCS | facility | Laser surgery of prostate | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $3261.04 | $8915.56 |
| 52649 | HCPCS | facility | Prostate laser enucleation | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $3261.04 | $8915.56 |
| 53215 | HCPCS | facility | Removal of urethra | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $1540.12 | $8915.56 |
| 53235 | HCPCS | facility | Removal of urethra lesion | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $1540.12 | $6735.22 |
| 53400 | HCPCS | facility | Revise urethra stage 1 | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2373.22 | $6735.22 |
| 53420 | HCPCS | facility | Reconstruct urethra stage 1 | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2373.22 | $6735.22 |
| 54205 | HCPCS | facility | Treatment of penis lesion | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 54308 | HCPCS | facility | Reconstruction of urethra | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2775.49 | $6735.22 |
| 54348 | HCPCS | facility | Secondary urethral surgery | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2649.31 | $6735.22 |
| 54352 | HCPCS | facility | Reconstruct urethra/penis | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2775.49 | $6735.22 |
| 54408 | HCPCS | facility | Repair multi-comp penis pros | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 11 | 1 | n/a | n/a | $2775.49 | $6735.22 |
| 55875 | HCPCS | facility | HC NEEDLE INSERTION | $4597.72 | $6425.83 | $-1828.11 | 0.72 | 10 | 1 | $6660.0 | $4662.0 | $2737.09 | $11491.43 |
| 38222 | HCPCS | facility | Dx bone marrow bx & aspir | $1650.345 | $3481.15 | $-1830.805 | 0.47 | 10 | 1 | $4077.0 | $2853.9 | $1347.94 | $3481.15 |
| 31647 | HCPCS | facility | Bronchial valve init insert | $6618.64 | $8457.99 | $-1839.35 | 0.78 | 10 | 1 | n/a | n/a | $1572.2 | $8457.99 |
| 26350 | HCPCS | facility | Repair finger/hand tendon | $2066.12 | $3921.32 | $-1855.2 | 0.53 | 11 | 1 | n/a | n/a | $1727.73 | $3921.32 |
| 26516 | HCPCS | facility | Fusion of knuckle joint | $2066.12 | $3921.32 | $-1855.2 | 0.53 | 11 | 1 | n/a | n/a | $1727.73 | $3921.32 |
| 63655 | HCPCS | facility | Implant neuroelectrodes | $21392.71 | $23250.02 | $-1857.31 | 0.92 | 11 | 1 | n/a | n/a | $6792.04 | $33588.83 |
| 64590 | HCPCS | facility | Insrt/redo pn/gastr stimul | $21392.71 | $23250.02 | $-1857.31 | 0.92 | 11 | 1 | n/a | n/a | $10656.57 | $33588.83 |
| 25077 | HCPCS | facility | Resect forearm/wrist tum<3cm | $1572.96 | $3481.15 | $-1908.19 | 0.45 | 11 | 1 | n/a | n/a | $1121.75 | $6735.22 |
| 27086 | HCPCS | facility | Remove hip foreign body | $1572.96 | $3481.15 | $-1908.19 | 0.45 | 11 | 1 | n/a | n/a | $583.61 | $3481.15 |
| 38300 | HCPCS | facility | Drainage lymph node lesion | $1572.96 | $3481.15 | $-1908.19 | 0.45 | 11 | 1 | n/a | n/a | $725.58 | $3481.15 |
| 57022 | HCPCS | facility | I & d vaginal hematoma pp | $1572.96 | $3481.15 | $-1908.19 | 0.45 | 11 | 1 | n/a | n/a | $725.58 | $4303.61 |
| 0412T | HCPCS | facility | Rmvl cardiac modulj pls gen | $2558.51 | $4478.55 | $-1920.04 | 0.57 | 5 | 1 | n/a | n/a | $2558.51 | $4478.55 |
| 0413T | HCPCS | facility | Rmvl car modulj tranvns elt | $2558.51 | $4478.55 | $-1920.04 | 0.57 | 5 | 1 | n/a | n/a | $2558.51 | $4478.55 |
| 15851 | HCPCS | facility | Remove sutures diff surgeon | $552.31 | $2472.73 | $-1920.42 | 0.22 | 11 | 1 | n/a | n/a | $209.65 | $2472.73 |
| 17108 | HCPCS | facility | Destruction of skin lesions | $552.31 | $2472.73 | $-1920.42 | 0.22 | 11 | 1 | n/a | n/a | $209.65 | $2472.73 |
| 53855 | HCPCS | facility | Insert prost urethral stent | $552.31 | $2505.21 | $-1952.9 | 0.22 | 10 | 1 | n/a | n/a | $152.75 | $2505.21 |
| 20955 | HCPCS | facility | Fibula bone graft microvasc | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 20956 | HCPCS | facility | Iliac bone graft microvasc | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 7 | 1 | n/a | n/a | $4508.56 | $8696.19 |
| 20957 | HCPCS | facility | Mt bone graft microvasc | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 20969 | HCPCS | facility | Bone/skin graft microvasc | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 7 | 1 | n/a | n/a | $4674.63 | $8696.19 |
| 21616 | HCPCS | facility | Removal of rib and nerves | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 21705 | HCPCS | facility | Revision of neck muscle/rib | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 7 | 1 | n/a | n/a | $894.79 | $8696.19 |
| 21750 | HCPCS | facility | Repair of sternum separation | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 21825 | HCPCS | facility | Treat sternum fracture | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 22112 | HCPCS | facility | Remove part thorax vertebra | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 22114 | HCPCS | facility | Remove part lumbar vertebra | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 23220 | HCPCS | facility | Resect prox humerus tumor | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 24930 | HCPCS | facility | Amputation follow-up surgery | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 25900 | HCPCS | facility | Amputation of forearm | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 25905 | HCPCS | facility | Amputation of forearm | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 25915 | HCPCS | facility | Amputation of forearm | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 26551 | HCPCS | facility | Great toe-hand transfer | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 26556 | HCPCS | facility | Toe joint transfer | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 27030 | HCPCS | facility | Drainage of hip joint | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 27036 | HCPCS | facility | Excision of hip joint/muscle | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 7 | 1 | n/a | n/a | $1739.39 | $8696.19 |
| 27226 | HCPCS | facility | Treat hip wall fracture | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 7 | 1 | n/a | n/a | $1812.69 | $8696.19 |
| 27227 | HCPCS | facility | Treat hip fracture(s) | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 27228 | HCPCS | facility | Treat hip fracture(s) | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 27248 | HCPCS | facility | Treat thigh fracture | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 27254 | HCPCS | facility | Treat hip dislocation | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 27455 | HCPCS | facility | Realignment of knee | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 7 | 1 | n/a | n/a | $1641.28 | $8696.19 |
| 27470 | HCPCS | facility | Repair of thigh | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 7 | 1 | n/a | n/a | $1995.94 | $8696.19 |
| 27725 | HCPCS | facility | Repair of lower leg | $6735.22 | $8696.19 | $-1960.97 | 0.77 | 6 | 1 | n/a | n/a | $6445.19 | $8696.19 |
| 33215 | HCPCS | facility | HC REPOSITION PACING-DEFIB LEAD | $1805.48 | $3784.07 | $-1978.59 | 0.48 | 11 | 1 | $4702.0 | $3291.4 | $1683.13 | $3784.07 |
| 33226 | HCPCS | facility | HC REPOSITION PREVIOUSLY IMPLANTED LEFT VENTRICULAR LEAD | $1805.48 | $3784.07 | $-1978.59 | 0.48 | 11 | 1 | $5918.0 | $4142.6 | $1683.13 | $3784.07 |
| 36558 | HCPCS | facility | HC INSERT TNL CVC W/O P/P, >5 YRS | $1805.48 | $3784.07 | $-1978.59 | 0.48 | 11 | 1 | $4532.0 | $3172.4 | $1727.73 | $3784.07 |
| 37212 | HCPCS | facility | HC THROMBOLYTIC VENOUS THERAPY | $1805.48 | $3784.07 | $-1978.59 | 0.48 | 10 | 1 | $4532.0 | $3172.4 | $786.08 | $3784.07 |
| 37565 | HCPCS | facility | Ligation of neck vein | $1805.48 | $3784.07 | $-1978.59 | 0.48 | 11 | 1 | n/a | n/a | $1250.63 | $3784.07 |
| 49422 | HCPCS | facility | HC REMOVAL, TUNNELED INTRAPERITONEAL CATHETER | $1805.48 | $3784.07 | $-1978.59 | 0.48 | 11 | 1 | $6526.0 | $4568.2 | $1683.13 | $3784.07 |
| 49429 | HCPCS | facility | Removal of shunt | $1805.48 | $3784.07 | $-1978.59 | 0.48 | 11 | 1 | n/a | n/a | $1683.13 | $3784.07 |
| 93505 | HCPCS | facility | Biopsy of heart lining | $1805.48 | $3784.07 | $-1978.59 | 0.48 | 11 | 1 | n/a | n/a | $1156.5 | $3784.07 |
| 32609 | HCPCS | facility | Thoracoscopy w/bx pleura | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2564.75 | $8915.56 |
| 38570 | HCPCS | facility | Laparoscopy lymph node biop | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $11889.17 |
| 38745 | HCPCS | facility | Remove armpit lymph nodes | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 43653 | HCPCS | facility | Laparoscopy gastrostomy | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 43773 | HCPCS | facility | Lap replace gastr adj device | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $1324.76 | $7245.25 |
| 44180 | HCPCS | facility | Lap enterolysis | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 44186 | HCPCS | facility | Lap jejunostomy | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 44970 | HCPCS | facility | HC LAPAROSCOPY, APPENDECTOMY | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | $7606.0 | $5324.2 | $3487.15 | $7245.25 |
| 47382 | HCPCS | facility | HC ABLATION, 1/+ LIVER TUMOR(S), PERCUTANEOUS, RADIOFREQUENCY | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | $10665.0 | $7465.5 | $4046.61 | $8915.56 |
| 47562 | HCPCS | facility | HC LAPAROSCOPY; CHOLECYSTECTOMY | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | $6861.0 | $4802.7 | $3487.15 | $7245.25 |
| 47563 | HCPCS | facility | Laparo cholecystectomy/graph | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $7245.25 |
| 49320 | HCPCS | facility | Diag laparo separate proc | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2730.07 | $7245.25 |
| 49321 | HCPCS | facility | Laparoscopy biopsy | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2730.07 | $7245.25 |
| 49322 | HCPCS | facility | Laparoscopy aspiration | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2730.07 | $7245.25 |
| 49323 | HCPCS | facility | Laparo drain lymphocele | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2730.07 | $8915.56 |
| 49324 | HCPCS | facility | Lap insert tunnel ip cath | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2730.07 | $9619.86 |
| 49325 | HCPCS | facility | Lap Revision Perm IP Cath | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2730.07 | $9619.86 |
| 49491 | HCPCS | facility | Rpr hern preemie reduc | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 49650 | HCPCS | facility | Lap ing hernia repair init | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $7245.25 |
| 49651 | HCPCS | facility | Lap ing hernia repair recur | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 50592 | HCPCS | facility | HC ABLATION, 1 OR MORE RENAL TUMOR(S), PERCUTANEOUS, UNILATERAL, RADIO | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | $10665.0 | $7465.5 | $4046.61 | $8915.56 |
| 50945 | HCPCS | facility | Laparoscopy ureterolithotomy | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 51500 | HCPCS | facility | Removal of bladder cyst | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2429.11 | $7245.25 |
| 51990 | HCPCS | facility | Laparo urethral suspension | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 51992 | HCPCS | facility | Laparo sling operation | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 54690 | HCPCS | facility | Laparoscopy orchiectomy | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 55550 | HCPCS | facility | Laparo ligate spermatic vein | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 58545 | HCPCS | facility | Laparoscopic myomectomy | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $2730.07 | $8915.56 |
| 58660 | HCPCS | facility | Laparoscopy lysis | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $7245.25 |
| 58661 | HCPCS | facility | Laparoscopy remove adnexa | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $7245.25 |
| 58662 | HCPCS | facility | HC LAPAROSCOPY, W/ EXC/DESTR OVARY PELVIC VISCERA LESIONS | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | $9112.0 | $6378.4 | $3487.15 | $7245.25 |
| 58670 | HCPCS | facility | Laparoscopy tubal cautery | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $7245.25 |
| 58671 | HCPCS | facility | Laparoscopy tubal block | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $7245.25 |
| 58672 | HCPCS | facility | Laparoscopy fimbrioplasty | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $7245.25 |
| 59150 | HCPCS | facility | Treat ectopic pregnancy | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $7245.25 |
| 59151 | HCPCS | facility | Treat ectopic pregnancy | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3487.15 | $8915.56 |
| 60212 | HCPCS | facility | Partial thyroid excision | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 60225 | HCPCS | facility | Partial removal of thyroid | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 60240 | HCPCS | facility | Removal of thyroid | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3671.15 | $8915.56 |
| 60280 | HCPCS | facility | Remove thyroid duct lesion | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 60281 | HCPCS | facility | Remove thyroid duct lesion | $5255.62 | $7245.25 | $-1989.63 | 0.73 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 36902 | HCPCS | facility | HC INTRO CATH DIAL CIRC W/ANGIO | $4826.89 | $6821.04 | $-1994.15 | 0.71 | 10 | 1 | $11796.0 | $8257.2 | $4118.29 | $8404.11 |
| 25671 | HCPCS | facility | Pin radioulnar dislocation | $1908.84 | $3921.32 | $-2012.48 | 0.49 | 11 | 1 | n/a | n/a | $1727.73 | $3921.32 |
| 28545 | HCPCS | facility | Treat foot dislocation | $1908.84 | $3921.32 | $-2012.48 | 0.49 | 11 | 1 | n/a | n/a | $1727.73 | $3921.32 |
| 37213 | HCPCS | facility | HC THROMB ART/VEIN THERAPY, ANY METH, RADIO S&I, CONT'D TX SUBSEQ DAY | $1754.1 | $3784.07 | $-2029.97 | 0.46 | 10 | 1 | $4016.0 | $2811.2 | $1250.63 | $3784.07 |
| 37214 | HCPCS | facility | Cessj therapy cath removal | $1754.1 | $3784.07 | $-2029.97 | 0.46 | 10 | 1 | $4016.0 | $2811.2 | $1250.63 | $3784.07 |
| 27279 | HCPCS | facility | Arthrodesis sacroiliac joint | $18982.85 | $21013.36 | $-2030.51 | 0.90 | 10 | 1 | n/a | n/a | $9601.88 | $21267.94 |
| 49418 | HCPCS | facility | HC INSERT TUNNEL IP CATH PERC | $2259.08 | $4290.92 | $-2031.84 | 0.53 | 11 | 1 | $5972.0 | $4180.4 | $1727.73 | $4290.92 |
| 49421 | HCPCS | facility | Ins tun ip cath for dial opn | $2259.08 | $4290.92 | $-2031.84 | 0.53 | 11 | 1 | n/a | n/a | $1727.73 | $4290.92 |
| 21034 | HCPCS | facility | Excise max/zygoma mal tumor | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21050 | HCPCS | facility | Removal of jaw joint | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21070 | HCPCS | facility | Remove coronoid process | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21077 | HCPCS | facility | Prepare face/oral prosthesis | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 21081 | HCPCS | facility | Prepare face/oral prosthesis | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 21087 | HCPCS | facility | Prepare face/oral prosthesis | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 21122 | HCPCS | facility | Reconstruction of chin | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $9619.86 |
| 21127 | HCPCS | facility | Augmentation lower jaw bone | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21150 | HCPCS | facility | Lefort ii anterior intrusion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 21175 | HCPCS | facility | Reconstruct orbit/forehead | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 21181 | HCPCS | facility | Contour cranial bone lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21193 | HCPCS | facility | Reconst lwr jaw w/o graft | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21195 | HCPCS | facility | Reconst lwr jaw w/o fixation | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 21198 | HCPCS | facility | Reconstr lwr jaw segment | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 21199 | HCPCS | facility | Reconstr Lwr Jaw W/Advance | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21206 | HCPCS | facility | Reconstruct upper jaw bone | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21208 | HCPCS | facility | Augmentation of facial bones | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21209 | HCPCS | facility | Reduction of facial bones | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21210 | HCPCS | facility | Face bone graft | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21215 | HCPCS | facility | Lower jaw bone graft | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21230 | HCPCS | facility | Rib cartilage graft | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 21235 | HCPCS | facility | Ear cartilage graft | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1147.39 | $8915.56 |
| 21240 | HCPCS | facility | Reconstruction of jaw joint | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21242 | HCPCS | facility | Reconstruction of jaw joint | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21244 | HCPCS | facility | Reconstruction of lower jaw | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21245 | HCPCS | facility | Reconstruction of jaw | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21246 | HCPCS | facility | Reconstruction of jaw | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21248 | HCPCS | facility | Reconstruction of jaw | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21249 | HCPCS | facility | Reconstruction of jaw | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21256 | HCPCS | facility | Reconstruction of orbit | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21260 | HCPCS | facility | Revise eye sockets | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 21261 | HCPCS | facility | Revise eye sockets | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 21263 | HCPCS | facility | Revise eye sockets | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 21267 | HCPCS | facility | Revise eye sockets | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21270 | HCPCS | facility | Augmentation cheek bone | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21275 | HCPCS | facility | Revision orbitofacial bones | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21330 | HCPCS | facility | Open tx nose fx w/skele fixj | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 21338 | HCPCS | facility | Open nasoethmoid fx w/o fixj | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21339 | HCPCS | facility | Open nasoethmoid fx w/ fixj | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 21346 | HCPCS | facility | Opn tx nasomax fx w/fixj | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21360 | HCPCS | facility | Opn tx dprsd malar fracture | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21365 | HCPCS | facility | Opn tx complx malar fx | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21385 | HCPCS | facility | Opn tx orbit fx transantral | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21386 | HCPCS | facility | Opn tx orbit fx periorbital | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21387 | HCPCS | facility | Opn tx orbit fx combined | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21390 | HCPCS | facility | Opn tx orbit periorbtl implt | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21395 | HCPCS | facility | Opn tx orbit periorbt w/grft | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21406 | HCPCS | facility | Opn tx orbit fx w/o implant | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21407 | HCPCS | facility | Opn tx orbit fx w/implant | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21408 | HCPCS | facility | Opn tx orbit fx w/bone grft | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21445 | HCPCS | facility | Treat dental ridge fracture | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 21453 | HCPCS | facility | Treat lower jaw fracture | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21454 | HCPCS | facility | Treat lower jaw fracture | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21461 | HCPCS | facility | Treat lower jaw fracture | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21462 | HCPCS | facility | Treat lower jaw fracture | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 21465 | HCPCS | facility | Treat lower jaw fracture | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21470 | HCPCS | facility | Treat lower jaw fracture | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 30150 | HCPCS | facility | Partial removal of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 30160 | HCPCS | facility | Removal of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 30400 | HCPCS | facility | Reconstruction of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 30410 | HCPCS | facility | Reconstruction of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 30420 | HCPCS | facility | Reconstruction of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 30430 | HCPCS | facility | Revision of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 30435 | HCPCS | facility | Revision of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 30450 | HCPCS | facility | Revision of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 30460 | HCPCS | facility | Revision of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 30462 | HCPCS | facility | Revision of nose | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 30465 | HCPCS | facility | Repair Nasal Stenosis | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 30540 | HCPCS | facility | Repair nasal defect | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 30545 | HCPCS | facility | Repair nasal defect | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 30580 | HCPCS | facility | Repair upper jaw fistula | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 30600 | HCPCS | facility | Repair mouth/nose fistula | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 30620 | HCPCS | facility | Intranasal reconstruction | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 31030 | HCPCS | facility | Exploration maxillary sinus | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31032 | HCPCS | facility | Explore sinus remove polyps | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31040 | HCPCS | facility | Exploration behind upper jaw | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 31051 | HCPCS | facility | Sphenoid sinus surgery | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31075 | HCPCS | facility | Exploration of frontal sinus | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31080 | HCPCS | facility | Removal of frontal sinus | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31081 | HCPCS | facility | Removal of frontal sinus | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31084 | HCPCS | facility | Removal of frontal sinus | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31085 | HCPCS | facility | Removal of frontal sinus | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31086 | HCPCS | facility | Removal of frontal sinus | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31087 | HCPCS | facility | Removal of frontal sinus | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31090 | HCPCS | facility | Exploration of sinuses | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 31420 | HCPCS | facility | Removal of epiglottis | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31580 | HCPCS | facility | Laryngoplasty laryngeal web | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 31590 | HCPCS | facility | Reinnervate larynx | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 31750 | HCPCS | facility | Repair of windpipe | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 31785 | HCPCS | facility | Remove windpipe lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 40700 | HCPCS | facility | Repair cleft lip/nasal | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 40701 | HCPCS | facility | Repair cleft lip/nasal | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 40702 | HCPCS | facility | Repair cleft lip/nasal | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 40761 | HCPCS | facility | Repair cleft lip/nasal | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 40842 | HCPCS | facility | Reconstruction of mouth | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 40843 | HCPCS | facility | Reconstruction of mouth | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 40844 | HCPCS | facility | Reconstruction of mouth | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 40845 | HCPCS | facility | Reconstruction of mouth | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 41019 | HCPCS | facility | Place needles h&n for rt | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 41120 | HCPCS | facility | Partial removal of tongue | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 42120 | HCPCS | facility | Remove palate/lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 42145 | HCPCS | facility | Repair palate pharynx/uvula | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42200 | HCPCS | facility | Reconstruct cleft palate | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42210 | HCPCS | facility | Reconstruct cleft palate | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42215 | HCPCS | facility | Reconstruct cleft palate | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42220 | HCPCS | facility | Reconstruct cleft palate | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42225 | HCPCS | facility | Reconstruct cleft palate | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 42226 | HCPCS | facility | Lengthening of palate | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42227 | HCPCS | facility | Lengthening of palate | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42235 | HCPCS | facility | Repair palate | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $8915.56 |
| 42260 | HCPCS | facility | Repair nose to lip fistula | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 42281 | HCPCS | facility | Insertion palate prosthesis | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1147.39 | $7094.6 |
| 42410 | HCPCS | facility | Excise parotid gland/lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42415 | HCPCS | facility | Excise parotid gland/lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42420 | HCPCS | facility | Excise parotid gland/lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42425 | HCPCS | facility | Excise parotid gland/lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42440 | HCPCS | facility | Excise submaxillary gland | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42500 | HCPCS | facility | Repair salivary duct | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 42505 | HCPCS | facility | Repair salivary duct | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42507 | HCPCS | facility | Parotid duct diversion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42509 | HCPCS | facility | Parotid duct diversion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42815 | HCPCS | facility | Excision of neck cyst | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42820 | HCPCS | facility | Remove tonsils and adenoids | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 42825 | HCPCS | facility | Removal of tonsils | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42842 | HCPCS | facility | Extensive surgery of throat | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42844 | HCPCS | facility | Extensive surgery of throat | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 42870 | HCPCS | facility | Excision of lingual tonsil | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 42890 | HCPCS | facility | Partial removal of pharynx | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 42892 | HCPCS | facility | Revision of pharyngeal walls | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 43030 | HCPCS | facility | Throat muscle surgery | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 43130 | HCPCS | facility | Removal of esophagus pouch | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 60252 | HCPCS | facility | Removal of thyroid | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 60260 | HCPCS | facility | Repeat thyroid surgery | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 60271 | HCPCS | facility | Removal of thyroid | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 60500 | HCPCS | facility | Explore parathyroid glands | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 60502 | HCPCS | facility | Re-explore parathyroids | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $9619.86 |
| 60520 | HCPCS | facility | Removal of thymus gland | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 69150 | HCPCS | facility | Extensive ear canal surgery | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 69310 | HCPCS | facility | Rebuild outer ear canal | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 69320 | HCPCS | facility | Rebuild outer ear canal | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69501 | HCPCS | facility | Mastoidectomy | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69502 | HCPCS | facility | Mastoidectomy | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69505 | HCPCS | facility | Remove mastoid structures | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69511 | HCPCS | facility | Extensive mastoid surgery | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69530 | HCPCS | facility | Extensive mastoid surgery | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69550 | HCPCS | facility | Remove ear lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69552 | HCPCS | facility | Remove ear lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69601 | HCPCS | facility | Mastoid surgery revision | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69602 | HCPCS | facility | Mastoid surgery revision | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69603 | HCPCS | facility | Mastoid surgery revision | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69604 | HCPCS | facility | Mastoid surgery revision | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69631 | HCPCS | facility | Repair eardrum structures | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69632 | HCPCS | facility | Rebuild eardrum structures | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69633 | HCPCS | facility | Rebuild eardrum structures | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69635 | HCPCS | facility | Repair eardrum structures | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69636 | HCPCS | facility | Rebuild eardrum structures | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69637 | HCPCS | facility | Rebuild eardrum structures | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69641 | HCPCS | facility | Revise middle ear & mastoid | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69642 | HCPCS | facility | Revise middle ear & mastoid | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69643 | HCPCS | facility | Revise middle ear & mastoid | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69644 | HCPCS | facility | Revise middle ear & mastoid | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69645 | HCPCS | facility | Revise middle ear & mastoid | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69646 | HCPCS | facility | Revise middle ear & mastoid | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69660 | HCPCS | facility | Revise middle ear bone | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69661 | HCPCS | facility | Revise middle ear bone | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69662 | HCPCS | facility | Revise middle ear bone | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69670 | HCPCS | facility | Remove mastoid air cells | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 69720 | HCPCS | facility | Release facial nerve | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69725 | HCPCS | facility | Release facial nerve | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69740 | HCPCS | facility | Repair facial nerve | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69745 | HCPCS | facility | Repair facial nerve | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69805 | HCPCS | facility | Explore inner ear | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69806 | HCPCS | facility | Explore inner ear | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69905 | HCPCS | facility | Remove inner ear | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69910 | HCPCS | facility | Remove inner ear & mastoid | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69955 | HCPCS | facility | Release facial nerve | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69960 | HCPCS | facility | Release inner ear canal | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $8915.56 |
| 69970 | HCPCS | facility | Remove inner ear lesion | $5059.36 | $7094.6 | $-2035.24 | 0.71 | 11 | 1 | n/a | n/a | $3278.89 | $9619.86 |
| 33900 | HCPCS | facility | Perq p-art revsc 1 nm nt uni | $11792.96 | $13835.1 | $-2042.14 | 0.85 | 9 | 1 | n/a | n/a | $10615.31 | $21267.94 |
| 33901 | HCPCS | facility | Perq p-art revsc 1 nm nt bi | $11792.96 | $13835.1 | $-2042.14 | 0.85 | 9 | 1 | n/a | n/a | $10615.31 | $21267.94 |
| 33903 | HCPCS | facility | Perq p-art revsc 1 abnor bi | $11792.96 | $13835.1 | $-2042.14 | 0.85 | 9 | 1 | n/a | n/a | $10615.31 | $33588.83 |
| 56441 | HCPCS | facility | Lysis of labial lesion(s) | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 56700 | HCPCS | facility | Partial removal of hymen | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 57000 | HCPCS | facility | Exploration of vagina | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 57061 | HCPCS | facility | Destroy vag lesions simple | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 57065 | HCPCS | facility | Destroy vag lesions complex | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 57200 | HCPCS | facility | HC REPAIR VAGINA | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | $3933.0 | $2753.1 | $1454.55 | $3879.52 |
| 57415 | HCPCS | facility | Remove vaginal foreign body | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 57460 | HCPCS | facility | Bx of cervix w/scope leep | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 57510 | HCPCS | facility | Cauterization of cervix | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 57522 | HCPCS | facility | Conization of cervix | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | $5101.0 | $3570.7 | $1454.55 | $3879.52 |
| 57700 | HCPCS | facility | Revision of cervix | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 57800 | HCPCS | facility | Dilation of cervical canal | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 58120 | HCPCS | facility | Dilation and curettage | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 58345 | HCPCS | facility | HC TRANSCERVICAL INTRO FALLOPIAN TUBE CATH, DIAG/RE-EST PATENCY,HYSTERO | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | $5400.0 | $3780.0 | $1454.55 | $3879.52 |
| 58555 | HCPCS | facility | Hysteroscopy dx sep proc | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1682.06 | $3879.52 |
| 58615 | HCPCS | facility | Occlude fallopian tube(s) | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 59300 | HCPCS | facility | Episiotomy or vaginal repair | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | n/a | n/a | $1454.55 | $3879.52 |
| 59320 | HCPCS | facility | HC CERCLAGE CERVIX, VAGINAL/RR | $1805.48 | $3879.52 | $-2074.04 | 0.47 | 11 | 1 | $3273.0 | $2291.1 | $1454.55 | $3879.52 |
| 53865 | HCPCS | facility | Cysto insj dev ischmc rmdlg | $9247.15 | $11345.06 | $-2097.91 | 0.82 | 3 | 1 | n/a | n/a | $9247.15 | $11345.06 |
| 20962 | HCPCS | facility | Other bone graft microvasc | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $2288.46 | $8696.19 |
| 20970 | HCPCS | facility | Bone/skin graft iliac crest | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $3037.3 | $8696.19 |
| 21740 | HCPCS | facility | Reconstruction of sternum | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $1069.4 | $8696.19 |
| 22110 | HCPCS | facility | Remove part of neck vertebra | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $1134.25 | $8696.19 |
| 22830 | HCPCS | facility | Exploration of spinal fusion | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $860.86 | $8696.19 |
| 22850 | HCPCS | facility | Remove spine fixation device | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $767.07 | $8696.19 |
| 22852 | HCPCS | facility | Remove spine fixation device | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $734.88 | $8696.19 |
| 23200 | HCPCS | facility | Resect clavicle tumor | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $1611.15 | $8696.19 |
| 25909 | HCPCS | facility | Amputation follow-up surgery | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $1555.31 | $8696.19 |
| 27027 | HCPCS | facility | Buttock fasciotomy | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27244 | HCPCS | facility | Treat thigh fracture | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $1312.11 | $8696.19 |
| 27450 | HCPCS | facility | Incision of thigh | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $1080.32 | $8696.19 |
| 27465 | HCPCS | facility | Shortening of thigh bone | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $1332.91 | $8696.19 |
| 27466 | HCPCS | facility | Lengthening of thigh bone | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $1255.12 | $8696.19 |
| 27535 | HCPCS | facility | Treat knee fracture | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $955.38 | $8696.19 |
| 27536 | HCPCS | facility | Treat knee fracture | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $1270.97 | $8696.19 |
| 27722 | HCPCS | facility | Repair/graft of tibia | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $5040.3 | $8696.19 |
| G0413 | HCPCS | facility | Pelvic ring fracture uni/bil | $6590.205 | $8696.19 | $-2105.985 | 0.76 | 8 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 54522 | HCPCS | facility | Orchiectomy partial | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 54600 | HCPCS | facility | Reduce testis torsion | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 54670 | HCPCS | facility | Repair testis injury | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 54680 | HCPCS | facility | Relocation of testis(es) | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 54830 | HCPCS | facility | Remove epididymis lesion | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 54860 | HCPCS | facility | Removal of epididymis | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 54865 | HCPCS | facility | Explore Epididymis | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 55060 | HCPCS | facility | Repair of hydrocele | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 55200 | HCPCS | facility | Incision of sperm duct | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $4303.61 |
| 55520 | HCPCS | facility | Removal of sperm cord lesion | $2113.41 | $4224.5 | $-2111.09 | 0.50 | 11 | 1 | n/a | n/a | $1696.84 | $6735.22 |
| 24100 | HCPCS | facility | Biopsy elbow joint lining | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1555.31 | $3921.32 |
| 25028 | HCPCS | facility | Drainage of forearm lesion | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1555.31 | $3921.32 |
| 26025 | HCPCS | facility | Drainage of palm bursa | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1185.44 | $3921.32 |
| 26105 | HCPCS | facility | Biopsy finger joint lining | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1185.44 | $3921.32 |
| 26476 | HCPCS | facility | Tendon lengthening | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1185.44 | $3921.32 |
| 26477 | HCPCS | facility | Tendon shortening | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1185.44 | $3921.32 |
| 26478 | HCPCS | facility | Lengthening of hand tendon | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1185.44 | $3921.32 |
| 26479 | HCPCS | facility | Shortening of hand tendon | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1185.44 | $3921.32 |
| 26990 | HCPCS | facility | Drainage of pelvis lesion | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1555.31 | $3921.32 |
| 27390 | HCPCS | facility | Incision of thigh tendon | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1555.31 | $3921.32 |
| 27532 | HCPCS | facility | HC CL TX PROX TIBIA FX WSKEL TRAC | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | $4698.0 | $3288.6 | $835.41 | $3921.32 |
| 27606 | HCPCS | facility | Incision of achilles tendon | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1555.31 | $3921.32 |
| 27658 | HCPCS | facility | Repair of leg tendon each | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1555.31 | $3921.32 |
| 27831 | HCPCS | facility | Treat lower leg dislocation | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $546.74 | $3921.32 |
| 27860 | HCPCS | facility | Fixation of ankle joint | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1039.07 | $3921.32 |
| 28124 | HCPCS | facility | HC PARTIAL EXC BONE, PHALANX TOE | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | $4698.0 | $3288.6 | $1583.94 | $3921.32 |
| 28222 | HCPCS | facility | Release of foot tendons | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1583.94 | $3921.32 |
| 28225 | HCPCS | facility | Release of foot tendon | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1583.94 | $3921.32 |
| 28226 | HCPCS | facility | Release of foot tendons | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $1583.94 | $3921.32 |
| 28575 | HCPCS | facility | Treat foot dislocation | $1805.48 | $3921.32 | $-2115.84 | 0.46 | 11 | 1 | n/a | n/a | $835.41 | $3921.32 |
| 52305 | HCPCS | facility | Cystoscopy and treatment | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $1908.86 | $6425.83 |
| 52630 | HCPCS | facility | Remove prostate regrowth | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2737.09 | $6425.83 |
| 53230 | HCPCS | facility | Removal of urethra lesion | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2373.22 | $6425.83 |
| 53405 | HCPCS | facility | Revise urethra stage 2 | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2373.22 | $6425.83 |
| 53410 | HCPCS | facility | Reconstruction of urethra | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2373.22 | $6425.83 |
| 53425 | HCPCS | facility | Reconstruct urethra stage 2 | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2373.22 | $6425.83 |
| 53430 | HCPCS | facility | Reconstruction of urethra | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2373.22 | $6425.83 |
| 53431 | HCPCS | facility | Reconstruct urethra/bladder | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2373.22 | $6425.83 |
| 53505 | HCPCS | facility | Repair of urethra injury | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2373.22 | $6425.83 |
| 53510 | HCPCS | facility | Repair of urethra injury | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $1540.12 | $6425.83 |
| 53515 | HCPCS | facility | Repair of urethra injury | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2373.22 | $6425.83 |
| 53520 | HCPCS | facility | Repair of urethra defect | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2373.22 | $6425.83 |
| 54111 | HCPCS | facility | Treat penis lesion graft | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $2775.49 | $6425.83 |
| 54660 | HCPCS | facility | Revision of testis | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $1696.84 | $6425.83 |
| 55180 | HCPCS | facility | Revision of scrotum | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $1696.84 | $6425.83 |
| 55860 | HCPCS | facility | Surgical exposure prostate | $4303.61 | $6425.83 | $-2122.22 | 0.67 | 11 | 1 | n/a | n/a | $1409.54 | $6425.83 |
| 44370 | HCPCS | facility | Small Bowel Endoscopy/Stent | $5141.51 | $7275.65 | $-2134.14 | 0.71 | 11 | 1 | n/a | n/a | $2117.02 | $8915.56 |
| 44379 | HCPCS | facility | S Bowel Endoscope W/Stent | $5141.51 | $7275.65 | $-2134.14 | 0.71 | 11 | 1 | n/a | n/a | $2117.02 | $8915.56 |
| 23472 | HCPCS | facility | Reconstruct shoulder joint | $18876.96 | $21013.36 | $-2136.4 | 0.90 | 8 | 1 | n/a | n/a | $1555.2 | $21013.36 |
| 23630 | HCPCS | facility | Treat humerus fracture | $6556.73 | $8696.19 | $-2139.46 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $8915.56 |
| 25607 | HCPCS | facility | Treat Fx Rad Extra-Articul | $6556.73 | $8696.19 | $-2139.46 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $9619.86 |
| 25608 | HCPCS | facility | Treat Fx Rad Intra-Articul | $6556.73 | $8696.19 | $-2139.46 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $9619.86 |
| 25609 | HCPCS | facility | Treat Fx Radial 3+ Frag | $6556.73 | $8696.19 | $-2139.46 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $9619.86 |
| 57283 | HCPCS | facility | Colpopexy intraperitoneal | $6735.22 | $8887.01 | $-2151.79 | 0.76 | 11 | 1 | n/a | n/a | $3405.53 | $8887.01 |
| 57310 | HCPCS | facility | Repair urethrovaginal lesion | $6735.22 | $8887.01 | $-2151.79 | 0.76 | 11 | 1 | n/a | n/a | $3405.53 | $8887.01 |
| 57330 | HCPCS | facility | Repair bladder-vagina lesion | $6735.22 | $8887.01 | $-2151.79 | 0.76 | 11 | 1 | n/a | n/a | $2639.44 | $8887.01 |
| 57426 | HCPCS | facility | Revise prosth vag graft lap | $6735.22 | $8887.01 | $-2151.79 | 0.76 | 11 | 1 | n/a | n/a | $1454.55 | $8887.01 |
| 58920 | HCPCS | facility | Partial removal of ovary(s) | $6735.22 | $8887.01 | $-2151.79 | 0.76 | 11 | 1 | n/a | n/a | $2639.44 | $8887.01 |
| 21137 | HCPCS | facility | Reduction of forehead | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $3973.4 |
| 30120 | HCPCS | facility | Revision of nose | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $3973.4 |
| 30310 | HCPCS | facility | Remove nasal foreign body | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 31820 | HCPCS | facility | Closure of windpipe lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $3973.4 |
| 40810 | HCPCS | facility | Excision of mouth lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 40820 | HCPCS | facility | Treatment of mouth lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 41008 | HCPCS | facility | Drainage of mouth lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | $3615.0 | $2530.5 | $1147.39 | $3973.4 |
| 41017 | HCPCS | facility | Drainage of mouth lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 41110 | HCPCS | facility | Excision of tongue lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 41116 | HCPCS | facility | Excision of mouth lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $3973.4 |
| 41510 | HCPCS | facility | Tongue to lip surgery | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 41825 | HCPCS | facility | Excision of gum lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 41826 | HCPCS | facility | Excision of gum lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $3973.4 |
| 41830 | HCPCS | facility | Removal of gum tissue | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $3973.4 |
| 41872 | HCPCS | facility | Repair gum | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $4341.44 |
| 42160 | HCPCS | facility | Treatment mouth roof lesion | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 42600 | HCPCS | facility | Closure of salivary fistula | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 42720 | HCPCS | facility | Drainage of throat abscess | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 42804 | HCPCS | facility | Biopsy of upper nose/throat | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 69424 | HCPCS | facility | Remove ventilating tube | $1805.48 | $3973.4 | $-2167.92 | 0.45 | 11 | 1 | n/a | n/a | $1147.39 | $3973.4 |
| 0200T | HCPCS | facility | HC PERCUTSACRAL AUG, UNILAT INJECT, 1/MORE NEEDLES, INCL IG | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 3 | 1 | $13321.0 | $9324.7 | $3137.19 | $8696.19 |
| 0274T | HCPCS | facility | Perq lamot/lam crv/thrc | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 3 | 1 | n/a | n/a | $1655.46 | $8696.19 |
| 11970 | HCPCS | facility | Replace tissue expander | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 20251 | HCPCS | facility | Open bone biopsy | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 20900 | HCPCS | facility | Removal of bone for graft | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 20902 | HCPCS | facility | Removal of bone for graft | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 20924 | HCPCS | facility | Removal of tendon for graft | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 20972 | HCPCS | facility | Bone/skin graft metatarsal | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 20973 | HCPCS | facility | Bone/skin graft great toe | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 22100 | HCPCS | facility | Remove part of neck vertebra | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $8696.19 |
| 22102 | HCPCS | facility | Remove part lumbar vertebra | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $8696.19 |
| 22513 | HCPCS | facility | HC PERQ VERTEBRAL AUGMENT, 1 VERTEBRAL BODY, UNI/BILAT, IMAG GUID; THORACIC | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | $13321.0 | $9324.7 | $2605.47 | $9619.86 |
| 22514 | HCPCS | facility | HC PERQ VERTEBRAL AUGMENT, 1 VERTEBRAL BODY, UNI/BILAT, IMAG GUID; LUMBAR | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | $11297.0 | $7907.9 | $2605.47 | $9619.86 |
| 23105 | HCPCS | facility | Remove shoulder joint lining | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 23107 | HCPCS | facility | Explore treat shoulder joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 23146 | HCPCS | facility | Removal of bone lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 23155 | HCPCS | facility | Removal of humerus lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 23156 | HCPCS | facility | Removal of humerus lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 23184 | HCPCS | facility | Remove humerus lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 23195 | HCPCS | facility | Removal of head of humerus | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 23395 | HCPCS | facility | Muscle transfer shoulder/arm | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8915.56 |
| 23397 | HCPCS | facility | Muscle transfers | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8915.56 |
| 23400 | HCPCS | facility | Fixation of shoulder blade | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8915.56 |
| 23410 | HCPCS | facility | Repair rotator cuff acute | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8915.56 |
| 23412 | HCPCS | facility | Repair rotator cuff chronic | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8915.56 |
| 23415 | HCPCS | facility | Release of shoulder ligament | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8915.56 |
| 23420 | HCPCS | facility | Repair of shoulder | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8915.56 |
| 23430 | HCPCS | facility | Repair biceps tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 23462 | HCPCS | facility | Repair shoulder capsule | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8915.56 |
| 23465 | HCPCS | facility | Repair shoulder capsule | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8915.56 |
| 23466 | HCPCS | facility | Repair shoulder capsule | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8915.56 |
| 23480 | HCPCS | facility | Revision of collar bone | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 23490 | HCPCS | facility | Reinforce clavicle | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 23515 | HCPCS | facility | Treat clavicle fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $8696.19 |
| 23530 | HCPCS | facility | Treat clavicle dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 23532 | HCPCS | facility | Treat clavicle dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 23550 | HCPCS | facility | Treat clavicle dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 23552 | HCPCS | facility | Treat clavicle dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 23585 | HCPCS | facility | Treat scapula fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $8696.19 |
| 23660 | HCPCS | facility | Treat shoulder dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 23670 | HCPCS | facility | Treat dislocation/fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $8696.19 |
| 23800 | HCPCS | facility | Fusion of shoulder joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 24115 | HCPCS | facility | Remove/graft bone lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24116 | HCPCS | facility | Remove/graft bone lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24126 | HCPCS | facility | Remove/graft bone lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24145 | HCPCS | facility | Partial removal of radius | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24149 | HCPCS | facility | Radical resection of elbow | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24150 | HCPCS | facility | Resect distal humerus tumor | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 24152 | HCPCS | facility | Resect radius tumor | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 24301 | HCPCS | facility | Muscle/tendon transfer | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24320 | HCPCS | facility | Repair of arm tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24331 | HCPCS | facility | Revision of arm muscles | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 24340 | HCPCS | facility | Repair of biceps tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 24341 | HCPCS | facility | Repair arm tendon/muscle | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 24342 | HCPCS | facility | Repair of ruptured tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 24344 | HCPCS | facility | Reconstruct elbow lat ligmnt | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8696.19 |
| 24360 | HCPCS | facility | Reconstruct elbow joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2868.01 | $8915.56 |
| 24400 | HCPCS | facility | Revision of humerus | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8696.19 |
| 24420 | HCPCS | facility | Revision of humerus | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 24615 | HCPCS | facility | Treat elbow dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $8696.19 |
| 24635 | HCPCS | facility | Treat elbow fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $8696.19 |
| 24665 | HCPCS | facility | Treat radius fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 24685 | HCPCS | facility | Treat ulnar fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 24800 | HCPCS | facility | Fusion of elbow joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 24935 | HCPCS | facility | Revision of amputation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 25136 | HCPCS | facility | Remove & graft wrist lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 25170 | HCPCS | facility | Resect radius/ulnar tumor | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 25315 | HCPCS | facility | Revise palsy hand tendon(s) | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 25316 | HCPCS | facility | Revise palsy hand tendon(s) | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 25320 | HCPCS | facility | Repair/revise wrist joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 25337 | HCPCS | facility | Reconstruct ulna/radioulnar | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 25350 | HCPCS | facility | Revision of radius | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 25360 | HCPCS | facility | Revision of ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 25390 | HCPCS | facility | Shorten radius or ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 25400 | HCPCS | facility | Repair radius or ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8696.19 |
| 25405 | HCPCS | facility | Repair/graft radius or ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 25415 | HCPCS | facility | Repair radius & ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 25420 | HCPCS | facility | Repair/graft radius & ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 25425 | HCPCS | facility | Repair/graft radius or ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8696.19 |
| 25431 | HCPCS | facility | Repair nonunion carpal bone | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 25440 | HCPCS | facility | Repair/graft wrist bone | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8696.19 |
| 25443 | HCPCS | facility | Reconstruct wrist joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4450.11 | $8915.56 |
| 25445 | HCPCS | facility | Reconstruct wrist joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4450.11 | $8915.56 |
| 25449 | HCPCS | facility | Remove wrist joint implant | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2868.01 | $8915.56 |
| 25490 | HCPCS | facility | Reinforce radius | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 25515 | HCPCS | facility | Treat fracture of radius | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 25525 | HCPCS | facility | Treat fracture of radius | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 25526 | HCPCS | facility | Treat fracture of radius | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 25545 | HCPCS | facility | Treat fracture of ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 25575 | HCPCS | facility | Treat fracture radius/ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $8696.19 |
| 25628 | HCPCS | facility | Treat wrist bone fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 25652 | HCPCS | facility | Treat fracture ulnar styloid | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $9619.86 |
| 25800 | HCPCS | facility | Fusion of wrist joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 25820 | HCPCS | facility | Fusion of hand bones | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 25830 | HCPCS | facility | Fusion radioulnar jnt/ulna | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8915.56 |
| 26205 | HCPCS | facility | Remove/graft bone lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26372 | HCPCS | facility | Repair/graft hand tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26390 | HCPCS | facility | Revise hand/finger tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26392 | HCPCS | facility | Repair/graft hand tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26500 | HCPCS | facility | Hand tendon reconstruction | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1185.44 | $8696.19 |
| 26531 | HCPCS | facility | Revise knuckle with implant | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4450.11 | $8915.56 |
| 26536 | HCPCS | facility | Revise/implant finger joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4450.11 | $8915.56 |
| 26546 | HCPCS | facility | Repair nonunion hand | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26555 | HCPCS | facility | Positional change of finger | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26568 | HCPCS | facility | Lengthen metacarpal/finger | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26820 | HCPCS | facility | Thumb fusion with graft | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8915.56 |
| 26841 | HCPCS | facility | Fusion of thumb | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26842 | HCPCS | facility | Thumb fusion with graft | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26843 | HCPCS | facility | Fusion of hand joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26844 | HCPCS | facility | Fusion/graft of hand joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26850 | HCPCS | facility | Fusion of knuckle | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26852 | HCPCS | facility | Fusion of knuckle with graft | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 27003 | HCPCS | facility | Incision of hip tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27067 | HCPCS | facility | Remove/graft hip bone lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $9619.86 |
| 27100 | HCPCS | facility | Transfer of abdominal muscle | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27110 | HCPCS | facility | Transfer of iliopsoas muscle | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27335 | HCPCS | facility | Remove knee joint lining | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27357 | HCPCS | facility | Remove femur lesion/graft | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27381 | HCPCS | facility | Repair/graft kneecap tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27385 | HCPCS | facility | Repair of thigh muscle | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27386 | HCPCS | facility | Repair/graft of thigh muscle | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27394 | HCPCS | facility | Lengthening of thigh tendons | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27396 | HCPCS | facility | Transplant of thigh tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27397 | HCPCS | facility | Transplants of thigh tendons | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27400 | HCPCS | facility | Revise thigh muscles/tendons | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27405 | HCPCS | facility | Repair of knee ligament | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27407 | HCPCS | facility | Repair of knee ligament | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 27409 | HCPCS | facility | Repair of knee ligaments | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8696.19 |
| 27416 | HCPCS | facility | Osteochondral knee autograft | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8915.56 |
| 27418 | HCPCS | facility | Repair degenerated kneecap | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27420 | HCPCS | facility | Revision of unstable kneecap | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27422 | HCPCS | facility | Revision of unstable kneecap | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8915.56 |
| 27424 | HCPCS | facility | Revision/removal of kneecap | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27427 | HCPCS | facility | Reconstruction knee | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 27430 | HCPCS | facility | Revision of thigh muscles | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27437 | HCPCS | facility | Revise kneecap | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2868.01 | $8696.19 |
| 27479 | HCPCS | facility | Surgery to stop leg growth | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27509 | HCPCS | facility | Treatment of thigh fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 27524 | HCPCS | facility | Treat kneecap fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27637 | HCPCS | facility | Remove/graft leg bone lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27638 | HCPCS | facility | Remove/graft leg bone lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27652 | HCPCS | facility | Repair/graft achilles tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4605.66 | $8696.19 |
| 27654 | HCPCS | facility | Repair of achilles tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27676 | HCPCS | facility | Repair lower leg tendons | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27690 | HCPCS | facility | Revise lower leg tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27691 | HCPCS | facility | Revise lower leg tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27700 | HCPCS | facility | Revision of ankle joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2868.01 | $8915.56 |
| 27720 | HCPCS | facility | Repair of tibia | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8915.56 |
| 27726 | HCPCS | facility | Repair fibula nonunion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27756 | HCPCS | facility | Treatment of tibia fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 27766 | HCPCS | facility | Optx medial ankle fx | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27769 | HCPCS | facility | Optx post ankle fx | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8915.56 |
| 27784 | HCPCS | facility | Treatment of fibula fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27792 | HCPCS | facility | HC OPEN TREATMENT DISTAL FIBULAR FRACTURE, INCL INTERNAL FIXATION | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | $13542.0 | $9479.4 | $3763.94 | $8696.19 |
| 27814 | HCPCS | facility | Treatment of ankle fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27822 | HCPCS | facility | Treatment of ankle fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27823 | HCPCS | facility | Treatment of ankle fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $8696.19 |
| 27846 | HCPCS | facility | Treat ankle dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27848 | HCPCS | facility | Treat ankle dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27889 | HCPCS | facility | Amputation of foot at ankle | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 28102 | HCPCS | facility | Remove/graft foot lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28103 | HCPCS | facility | Remove/graft foot lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28106 | HCPCS | facility | Remove/graft foot lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28107 | HCPCS | facility | Remove/graft foot lesion | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28202 | HCPCS | facility | Repair/graft of foot tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1583.94 | $8696.19 |
| 28210 | HCPCS | facility | Repair/graft of foot tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28238 | HCPCS | facility | Revision of foot tendon | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28262 | HCPCS | facility | Revision of foot and ankle | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1583.94 | $8696.19 |
| 28291 | HCPCS | facility | Corrj halux rigdus w/implt | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 10 | 1 | n/a | n/a | $2455.43 | $8696.19 |
| 28298 | HCPCS | facility | Correction hallux valgus | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2455.43 | $8696.19 |
| 28305 | HCPCS | facility | Incise/graft midfoot bones | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28306 | HCPCS | facility | Incision of metatarsal | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1583.94 | $8696.19 |
| 28309 | HCPCS | facility | Incision of metatarsals | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28322 | HCPCS | facility | Repair of metatarsals | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28415 | HCPCS | facility | Treat heel fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5040.3 | $8696.19 |
| 28445 | HCPCS | facility | Treat ankle fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 28465 | HCPCS | facility | Treat midfoot fracture each | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 28485 | HCPCS | facility | Treat metatarsal fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 28531 | HCPCS | facility | Treat sesamoid bone fracture | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 28585 | HCPCS | facility | Repair foot dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 28615 | HCPCS | facility | Repair foot dislocation | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 28740 | HCPCS | facility | Fusion of foot bones | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28750 | HCPCS | facility | Fusion of big toe joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 28755 | HCPCS | facility | Fusion of big toe joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $1583.94 | $8696.19 |
| 28760 | HCPCS | facility | Fusion of big toe joint | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $4327.81 | $8696.19 |
| 29806 | HCPCS | facility | Shoulder arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8696.19 |
| 29807 | HCPCS | facility | Shoulder arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8696.19 |
| 29820 | HCPCS | facility | Shoulder arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8696.19 |
| 29827 | HCPCS | facility | Arthroscop rotator cuff repr | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8915.56 |
| 29828 | HCPCS | facility | Arthroscopy biceps tenodesis | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8915.56 |
| 29836 | HCPCS | facility | Elbow arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2111.62 | $8696.19 |
| 29847 | HCPCS | facility | Wrist arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8696.19 |
| 29855 | HCPCS | facility | Tibial arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8696.19 |
| 29860 | HCPCS | facility | Hip arthroscopy dx | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8696.19 |
| 29862 | HCPCS | facility | Hip arthr0 w/debridement | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8915.56 |
| 29866 | HCPCS | facility | Autgrft implnt knee w/scope | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8696.19 |
| 29868 | HCPCS | facility | Meniscal trnspl knee w/scpe | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8915.56 |
| 29885 | HCPCS | facility | Knee arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8696.19 |
| 29887 | HCPCS | facility | Knee arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $2111.62 | $8696.19 |
| 29888 | HCPCS | facility | Knee arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $5862.48 | $8696.19 |
| 29899 | HCPCS | facility | Ankle arthroscopy/surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $8696.19 |
| 29914 | HCPCS | facility | Hip arthro w/femoroplasty | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $9619.86 |
| 29915 | HCPCS | facility | Hip arthro acetabuloplasty | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $9619.86 |
| 29916 | HCPCS | facility | Hip arthro w/labral repair | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3880.22 | $9619.86 |
| 63001 | HCPCS | facility | Remove spine lamina 1/2 crvl | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $8696.19 |
| 63003 | HCPCS | facility | Remove spine lamina 1/2 thrc | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63005 | HCPCS | facility | Remove spine lamina 1/2 lmbr | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63011 | HCPCS | facility | Remove spine lamina 1/2 scrl | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63012 | HCPCS | facility | Remove lamina/facets lumbar | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $8696.19 |
| 63015 | HCPCS | facility | Remove spine lamina >2 crvcl | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63016 | HCPCS | facility | Remove spine lamina >2 thrc | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63017 | HCPCS | facility | Remove spine lamina >2 lmbr | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $8915.56 |
| 63020 | HCPCS | facility | Neck spine disk surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63030 | HCPCS | facility | Low back disk surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63040 | HCPCS | facility | Laminotomy single cervical | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $8915.56 |
| 63042 | HCPCS | facility | Laminotomy single lumbar | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63045 | HCPCS | facility | Remove spine lamina 1 crvl | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $8915.56 |
| 63046 | HCPCS | facility | Remove spine lamina 1 thrc | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63047 | HCPCS | facility | Remove spine lamina 1 lmbr | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63055 | HCPCS | facility | Decompress spinal cord thrc | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 63056 | HCPCS | facility | Decompress spinal cord lmbr | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $8915.56 |
| 63064 | HCPCS | facility | Decompress spinal cord thrc | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $8915.56 |
| 63075 | HCPCS | facility | Neck spine disk surgery | $6517.81 | $8696.19 | $-2178.38 | 0.75 | 11 | 1 | n/a | n/a | $3758.59 | $9619.86 |
| 45349 | HCPCS | facility | Sigmoidoscopy w/resection | $1120.45 | $3326.48 | $-2206.03 | 0.34 | 11 | 1 | n/a | n/a | $457.45 | $3326.48 |
| 45390 | HCPCS | facility | Colonoscopy w/resection | $1120.45 | $3326.48 | $-2206.03 | 0.34 | 11 | 1 | n/a | n/a | $457.45 | $3326.48 |
| 47533 | HCPCS | facility | HC PLACEMENT BILIARY DRAINAGE CATH, PERCUT, INCL IMAGE GUIDANCE, EXTERNAL | $2077.64 | $4290.92 | $-2213.28 | 0.48 | 10 | 1 | $6917.0 | $4841.9 | $1727.73 | $4290.92 |
| 47534 | HCPCS | facility | HC PLACE BILIARY DRAINAGE CATH, PERCUT, INCL IMAGE GUID, INTERNAL-EXTERNAL | $2077.64 | $4290.92 | $-2213.28 | 0.48 | 10 | 1 | $8302.0 | $5811.4 | $1727.73 | $4290.92 |
| 66999 | HCPCS | facility | Eye surgery procedure | $552.31 | $2765.81 | $-2213.5 | 0.20 | 5 | 1 | n/a | n/a | $528.52 | $2765.81 |
| 65280 | HCPCS | facility | Repair of eye wound | $4162.85 | $6377.3 | $-2214.45 | 0.65 | 11 | 1 | n/a | n/a | $1442.12 | $6735.22 |
| 65285 | HCPCS | facility | Repair of eye wound | $4162.85 | $6377.3 | $-2214.45 | 0.65 | 11 | 1 | n/a | n/a | $2913.76 | $6735.22 |
| 65710 | HCPCS | facility | Corneal transplant | $4162.85 | $6377.3 | $-2214.45 | 0.65 | 11 | 1 | n/a | n/a | $2967.38 | $8915.56 |
| 65750 | HCPCS | facility | Corneal transplant | $4162.85 | $6377.3 | $-2214.45 | 0.65 | 11 | 1 | n/a | n/a | $2967.38 | $8915.56 |
| 65781 | HCPCS | facility | Ocular reconst transplant | $4162.85 | $6377.3 | $-2214.45 | 0.65 | 11 | 1 | n/a | n/a | $2967.38 | $6735.22 |
| 66179 | HCPCS | facility | Aqueous shunt eye w/o graft | $4162.85 | $6377.3 | $-2214.45 | 0.65 | 11 | 1 | n/a | n/a | $1011.89 | $9619.86 |
| 66180 | HCPCS | facility | Aqueous shunt eye w/graft | $4162.85 | $6377.3 | $-2214.45 | 0.65 | 11 | 1 | n/a | n/a | $2977.93 | $6735.22 |
| 66225 | HCPCS | facility | Repair/graft eye lesion | $4162.85 | $6377.3 | $-2214.45 | 0.65 | 11 | 1 | n/a | n/a | $2977.93 | $6735.22 |
| 67113 | HCPCS | facility | Repair retinal detach cplx | $4162.85 | $6377.3 | $-2214.45 | 0.65 | 11 | 1 | n/a | n/a | $2913.76 | $9619.86 |
| 0581T | HCPCS | facility | Abltj mal brst tum perq crtx | $2458.99 | $4692.44 | $-2233.45 | 0.52 | 3 | 1 | n/a | n/a | $2458.99 | $4692.44 |
| 19328 | HCPCS | facility | Removal of breast implant | $2458.99 | $4692.44 | $-2233.45 | 0.52 | 11 | 1 | n/a | n/a | $1727.73 | $4692.44 |
| 19330 | HCPCS | facility | Removal of implant material | $2458.99 | $4692.44 | $-2233.45 | 0.52 | 11 | 1 | n/a | n/a | $1727.73 | $4692.44 |
| 53040 | HCPCS | facility | Drainage of urethra abscess | $1989.5 | $4224.5 | $-2235.0 | 0.47 | 11 | 1 | n/a | n/a | $1540.12 | $4303.61 |
| 53260 | HCPCS | facility | Treatment of urethra lesion | $1989.5 | $4224.5 | $-2235.0 | 0.47 | 11 | 1 | n/a | n/a | $1540.12 | $4303.61 |
| 53275 | HCPCS | facility | Repair of urethra defect | $1989.5 | $4224.5 | $-2235.0 | 0.47 | 11 | 1 | n/a | n/a | $1540.12 | $4303.61 |
| 53450 | HCPCS | facility | Revision of urethra | $1989.5 | $4224.5 | $-2235.0 | 0.47 | 11 | 1 | n/a | n/a | $1727.73 | $4224.5 |
| 53605 | HCPCS | facility | Dilate urethra stricture | $1989.5 | $4224.5 | $-2235.0 | 0.47 | 11 | 1 | n/a | n/a | $1131.27 | $4303.61 |
| 55705 | HCPCS | facility | Biopsy of prostate | $1989.5 | $4224.5 | $-2235.0 | 0.47 | 11 | 1 | n/a | n/a | $967.22 | $4303.61 |
| 24330 | HCPCS | facility | Revision of arm muscles | $6445.19 | $8696.19 | $-2251.0 | 0.74 | 11 | 1 | n/a | n/a | $2999.94 | $8696.19 |
| C8002 | HCPCS | facility | HC PREP SKIN CELL SUSP AUTOGRAFT, AUTOMATED | $6250.5 | $8505.13 | $-2254.63 | 0.73 | 3 | 1 | $16740.0 | $11718.0 | $6250.5 | $8505.13 |
| 15013 | HCPCS | facility | Prepj skn cll ssp agrft 1st | $6250.0 | $8505.13 | $-2255.13 | 0.73 | 3 | 1 | n/a | n/a | $6250.0 | $8505.13 |
| 62225 | HCPCS | facility | Replace/irrigate catheter | $1805.48 | $4094.07 | $-2288.59 | 0.44 | 11 | 1 | n/a | n/a | $1201.6 | $5221.55 |
| 31253 | HCPCS | facility | HC NASAL/SINUS ENDO, SURG W/ETHMOIDEC; TOTAL, INCL FRONT SINUS | $6165.865 | $8457.99 | $-2292.125 | 0.73 | 10 | 1 | $12232.0 | $8562.4 | $4863.83 | $8457.99 |
| 31257 | HCPCS | facility | HC NASAL/SINUS ENDO, SURG W/ETHMOIDEC, TOTAL, INCL SPHENOIDOTOMY | $6165.865 | $8457.99 | $-2292.125 | 0.73 | 10 | 1 | $12232.0 | $8562.4 | $4863.83 | $8457.99 |
| 31259 | HCPCS | facility | Nsl/sins ndsc sphn tiss rmvl | $6165.865 | $8457.99 | $-2292.125 | 0.73 | 10 | 1 | n/a | n/a | $4863.83 | $8457.99 |
| 31298 | HCPCS | facility | Nsl/sins ndsc w/sins dilat | $6165.865 | $8457.99 | $-2292.125 | 0.73 | 10 | 1 | n/a | n/a | $4863.83 | $8457.99 |
| 51880 | HCPCS | facility | Repair of bladder opening | $1908.86 | $4224.5 | $-2315.64 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $4224.5 |
| 52317 | HCPCS | facility | Remove bladder stone | $1908.86 | $4224.5 | $-2315.64 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $4224.5 |
| 55720 | HCPCS | facility | Drainage of prostate abscess | $1908.86 | $4224.5 | $-2315.64 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $4224.5 |
| 50436 | HCPCS | facility | Dilat xst trc ndurlgc px | $1897.49 | $4224.5 | $-2327.01 | 0.45 | 10 | 1 | $3446.0 | $2412.2 | $1727.73 | $4224.5 |
| 50693 | HCPCS | facility | HC PLACE URETERAL STENT, PERCUT, INCL DX NEPHROSTO/URETEROGRAM, IMAGING GUI | $1897.49 | $4224.5 | $-2327.01 | 0.45 | 10 | 1 | $7465.0 | $5225.5 | $1727.73 | $4224.5 |
| C9901 | HCPCS | facility | Endo defect closure GI tract | $10411.22 | $12739.3 | $-2328.08 | 0.82 | 3 | 1 | n/a | n/a | $10411.22 | $12739.3 |
| 11012 | HCPCS | facility | Deb skin bone at fx site | $1151.97 | $3481.15 | $-2329.18 | 0.33 | 11 | 1 | $4077.0 | $2853.9 | $336.38 | $3481.15 |
| 15782 | HCPCS | facility | Dermabrasion other than face | $1151.97 | $3481.15 | $-2329.18 | 0.33 | 11 | 1 | n/a | n/a | $336.38 | $3481.15 |
| 15920 | HCPCS | facility | Removal of tail bone ulcer | $1151.97 | $3481.15 | $-2329.18 | 0.33 | 11 | 1 | n/a | n/a | $336.38 | $3481.15 |
| 15830 | HCPCS | facility | Exc Skin Abd | $5620.82 | $7957.89 | $-2337.07 | 0.71 | 11 | 1 | n/a | n/a | $1661.08 | $7957.89 |
| 19302 | HCPCS | facility | P-Mastectomy w/LN Removal | $5620.82 | $7957.89 | $-2337.07 | 0.71 | 11 | 1 | n/a | n/a | $3235.96 | $8915.56 |
| 19303 | HCPCS | facility | Mast simple complete | $5620.82 | $7957.89 | $-2337.07 | 0.71 | 11 | 1 | n/a | n/a | $2458.99 | $8915.56 |
| 19307 | HCPCS | facility | Mast mod rad | $5620.82 | $7957.89 | $-2337.07 | 0.71 | 11 | 1 | n/a | n/a | $3235.96 | $8915.56 |
| 19316 | HCPCS | facility | Suspension of breast | $5620.82 | $7957.89 | $-2337.07 | 0.71 | 11 | 1 | n/a | n/a | $2458.99 | $7957.89 |
| 19318 | HCPCS | facility | Reduction of large breast | $5620.82 | $7957.89 | $-2337.07 | 0.71 | 11 | 1 | n/a | n/a | $3235.96 | $7957.89 |
| 19380 | HCPCS | facility | Revise breast reconstruction | $5620.82 | $7957.89 | $-2337.07 | 0.71 | 11 | 1 | n/a | n/a | $3235.96 | $8915.56 |
| 38555 | HCPCS | facility | Removal neck/armpit lesion | $5620.82 | $7957.89 | $-2337.07 | 0.71 | 11 | 1 | n/a | n/a | $1820.0 | $7957.89 |
| C9781 | HCPCS | facility | Arthro/shoul surg; w/spacer | $13048.08 | $15386.48 | $-2338.4 | 0.85 | 5 | 1 | n/a | n/a | $13048.08 | $15386.48 |
| 35190 | HCPCS | facility | Repair blood vessel lesion | $4303.61 | $6668.74 | $-2365.13 | 0.65 | 11 | 1 | n/a | n/a | $2149.26 | $6668.74 |
| 36260 | HCPCS | facility | Insertion of infusion pump | $4303.61 | $6668.74 | $-2365.13 | 0.65 | 11 | 1 | n/a | n/a | $2228.0 | $6668.74 |
| 36583 | HCPCS | facility | HC REPLACE COMPLETE, TUNNELED CVAD, W/ SUBCU PUMP,SAME VENOUS ACCESS | $4303.61 | $6668.74 | $-2365.13 | 0.65 | 11 | 1 | $10135.0 | $7094.5 | $2228.0 | $6668.74 |
| 63662 | HCPCS | facility | HC REMOVE/REPLACE SPINAL NEUROSTIMULATOR ELECTRODE PLATE/PADDLE | $1805.48 | $4189.9 | $-2384.42 | 0.43 | 11 | 1 | $4729.0 | $3310.3 | $1511.08 | $4189.9 |
| 64585 | HCPCS | facility | Revise/remove neuroelectrode | $1805.48 | $4189.9 | $-2384.42 | 0.43 | 11 | 1 | n/a | n/a | $1511.08 | $4189.9 |
| 68841 | HCPCS | facility | Insj rx elut implt lac canal | $447.49 | $2849.29 | $-2401.8 | 0.16 | 10 | 1 | n/a | n/a | $325.64 | $2849.29 |
| 50433 | HCPCS | facility | HC PLACEMENT NEPHROURETERAL CATHETER, PERCUT, IMAG GUID, NEW ACCESS | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 10 | 1 | $5058.0 | $3540.6 | $1506.42 | $4224.5 |
| 50570 | HCPCS | facility | Kidney endoscopy | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $509.76 | $4224.5 |
| 50574 | HCPCS | facility | Kidney endoscopy & biopsy | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $509.76 | $4224.5 |
| 50951 | HCPCS | facility | Endoscopy of ureter | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $509.76 | $4224.5 |
| 50953 | HCPCS | facility | Endoscopy of ureter | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $509.76 | $4224.5 |
| 50970 | HCPCS | facility | Ureter endoscopy | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $509.76 | $4224.5 |
| 50972 | HCPCS | facility | Ureter endoscopy & catheter | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $509.76 | $4224.5 |
| 53270 | HCPCS | facility | Removal of urethra gland | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $1540.12 | $4224.5 |
| 53453 | HCPCS | facility | Tprnl balo cntnc dev rmvl ea | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 8 | 1 | n/a | n/a | $1727.73 | $4224.5 |
| 53460 | HCPCS | facility | Revision of urethra | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $1540.12 | $4224.5 |
| 54000 | HCPCS | facility | Slitting of prepuce | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $1540.12 | $4224.5 |
| 54505 | HCPCS | facility | Biopsy of testis | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $1696.84 | $4224.5 |
| 55150 | HCPCS | facility | Removal of scrotum | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $1696.84 | $4224.5 |
| 55175 | HCPCS | facility | Revision of scrotum | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $1696.84 | $4327.73 |
| 55400 | HCPCS | facility | Repair of sperm duct | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $1696.84 | $4224.5 |
| 55680 | HCPCS | facility | Remove sperm pouch lesion | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 11 | 1 | n/a | n/a | $1696.84 | $4224.5 |
| 55706 | HCPCS | facility | Prostate saturation sampling | $1805.48 | $4224.5 | $-2419.02 | 0.43 | 9 | 1 | n/a | n/a | $967.22 | $4224.5 |
| 0594T | HCPCS | facility | Osteot hum xtrnl lngth dev | $6264.95 | $8696.19 | $-2431.24 | 0.72 | 3 | 1 | n/a | n/a | $6264.95 | $8696.19 |
| 31527 | HCPCS | facility | Laryngoscopy for treatment | $2026.82 | $4468.23 | $-2441.41 | 0.45 | 11 | 1 | n/a | n/a | $1727.73 | $4468.23 |
| 15876 | HCPCS | facility | Suction lipectomy head&neck | $1805.48 | $4246.97 | $-2441.49 | 0.43 | 11 | 1 | n/a | n/a | $1510.07 | $4246.97 |
| 15877 | HCPCS | facility | Suction lipectomy trunk | $1805.48 | $4246.97 | $-2441.49 | 0.43 | 11 | 1 | n/a | n/a | $1510.07 | $4246.97 |
| 15879 | HCPCS | facility | Suction lipectomy lwr extrem | $1805.48 | $4246.97 | $-2441.49 | 0.43 | 11 | 1 | n/a | n/a | $1510.07 | $4246.97 |
| 44312 | HCPCS | facility | Revision of ileostomy | $1805.48 | $4246.97 | $-2441.49 | 0.43 | 11 | 1 | n/a | n/a | $1510.07 | $4246.97 |
| 13160 | HCPCS | facility | HC SECONDARY CLOSURE SURG WOUND/DEHISCENCE, EXTENSIVE/COMPLI | $1771.32 | $4246.97 | $-2475.65 | 0.42 | 11 | 1 | $4564.0 | $3194.8 | $1510.07 | $4303.61 |
| 47532 | HCPCS | facility | HC INJECTION CHOLANGIO, PERCUT, COMPL DIAG PROC INCL IG; NEW ACCESS | $1805.48 | $4290.92 | $-2485.44 | 0.42 | 10 | 1 | $6917.0 | $4841.9 | $322.04 | $4290.92 |
| 47535 | HCPCS | facility | Conversion ext bil drg cath | $1805.48 | $4290.92 | $-2485.44 | 0.42 | 10 | 1 | $6917.0 | $4841.9 | $1457.06 | $4290.92 |
| 47536 | HCPCS | facility | Exchange biliary drg cath | $1805.48 | $4290.92 | $-2485.44 | 0.42 | 10 | 1 | $6917.0 | $4841.9 | $1457.06 | $4290.92 |
| 36904 | HCPCS | facility | HC THRMBC/NFS DIALYSIS CIRCUIT | $4303.61 | $6821.04 | $-2517.43 | 0.63 | 10 | 1 | $11796.0 | $8257.2 | $3029.32 | $6821.04 |
| 36555 | HCPCS | facility | HC INSERT NON-TUNNEL VENOUS CATH; < 5 YRS | $1250.63 | $3784.07 | $-2533.44 | 0.33 | 11 | 1 | $5507.0 | $3854.9 | $786.08 | $3784.07 |
| 36556 | HCPCS | facility | HC INSERT NON-TNL CV CATH >5 YRS | $1250.63 | $3784.07 | $-2533.44 | 0.33 | 11 | 1 | $3635.0 | $2544.5 | $786.08 | $3784.07 |
| 75746 | HCPCS | facility | Artery x-rays lung | $1250.63 | $3784.07 | $-2533.44 | 0.33 | 10 | 1 | $2568.0 | $1797.6 | $716.01 | $7362.11 |
| 75805 | HCPCS | facility | Lymph vessel x-ray trunk | $1250.63 | $3784.07 | $-2533.44 | 0.33 | 10 | 1 | n/a | n/a | $322.04 | $7105.73 |
| 75870 | HCPCS | facility | HC VENOGRAPHY, SUPERIOR SAGILTTAL SINUS, RADIOLOGIAL S&I | $1250.63 | $3784.07 | $-2533.44 | 0.33 | 10 | 1 | $1456.0 | $1019.2 | $716.01 | $6947.74 |
| 75887 | HCPCS | facility | HC PERC TRANSHEPATIC PERTOGRAPHY W/O HEMODYNAMIC EVAL, RADIO S&I | $1250.63 | $3784.07 | $-2533.44 | 0.33 | 10 | 1 | $2337.0 | $1635.9 | $716.01 | $7362.11 |
| 75898 | HCPCS | facility | Follow-up angiography | $1250.63 | $3784.07 | $-2533.44 | 0.33 | 10 | 1 | $2568.0 | $1797.6 | $330.97 | $7267.29 |
| 31254 | HCPCS | facility | Revision of ethmoid sinus | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31255 | HCPCS | facility | Removal of ethmoid sinus | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31267 | HCPCS | facility | Endoscopy maxillary sinus | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31295 | HCPCS | facility | Sinus endo w/balloon dil | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31296 | HCPCS | facility | Sinus endo w/balloon dil | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31297 | HCPCS | facility | Sinus endo w/balloon dil | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31546 | HCPCS | facility | Remove vc lesion scope/graft | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31560 | HCPCS | facility | Laryngoscop w/arytenoidectom | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $8915.56 |
| 31561 | HCPCS | facility | Larynscop remve cart + scop | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $2026.82 | $8915.56 |
| 31660 | HCPCS | facility | Bronch thermoplsty 1 lobe | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $1572.2 | $8457.99 |
| 31661 | HCPCS | facility | Bronch thermoplsty 2/> lobes | $5886.54 | $8457.99 | $-2571.45 | 0.70 | 11 | 1 | n/a | n/a | $1572.2 | $8457.99 |
| 50081 | HCPCS | facility | Removal of kidney stone | $8748.84 | $11345.06 | $-2596.22 | 0.77 | 11 | 1 | n/a | n/a | $3261.04 | $11345.06 |
| C8003 | HCPCS | facility | Imp extar knee shck absrb | $18390.05 | $21013.36 | $-2623.31 | 0.88 | 3 | 1 | n/a | n/a | $18390.05 | $21013.36 |
| 55867 | HCPCS | facility | Laps surg prst8ect smpl stot | $10095.43 | $12739.3 | $-2643.87 | 0.79 | 9 | 1 | n/a | n/a | $9087.3 | $21267.94 |
| 19357 | HCPCS | facility | Breast reconstruction | $13868.08 | $16515.75 | $-2647.67 | 0.84 | 11 | 1 | n/a | n/a | $4562.0 | $21267.94 |
| 33234 | HCPCS | facility | HC REMOVE LEAD, SING CHAM PACE | $1805.48 | $4478.55 | $-2673.07 | 0.40 | 11 | 1 | $1730.0 | $1211.0 | $1683.13 | $4478.55 |
| 36262 | HCPCS | facility | Removal of infusion pump | $1805.48 | $4478.55 | $-2673.07 | 0.40 | 11 | 1 | n/a | n/a | $1683.13 | $4478.55 |
| 43870 | HCPCS | facility | Repair stomach opening | $1867.35 | $4620.58 | $-2753.23 | 0.40 | 11 | 1 | n/a | n/a | $1727.73 | $4620.58 |
| 47553 | HCPCS | facility | Biliary endoscopy thru skin | $5000.93 | $7758.53 | $-2757.6 | 0.64 | 11 | 1 | n/a | n/a | $2027.76 | $7758.53 |
| 67255 | HCPCS | facility | Reinforce/graft eye wall | $2192.38 | $4953.69 | $-2761.31 | 0.44 | 11 | 1 | n/a | n/a | $1442.12 | $6735.22 |
| 37243 | HCPCS | facility | HC VASCULAR EMBOLIZATION/OCCLUSION; TUMORS, ORGAN ISCHEMIA/INFARCTION | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | $24972.0 | $17480.4 | $7671.18 | $21267.94 |
| 37244 | HCPCS | facility | HC VASCULAR EMBOLIZATION/OCCLUSION; ART/VEN HEMORR/LYMPHATIC XTRA | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | $24972.0 | $17480.4 | $7671.18 | $21267.94 |
| 92924 | HCPCS | facility | HC PRQ CARDIAC ANGIO/ATHRECT 1 AR | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | $19656.0 | $13759.2 | $7671.18 | $21267.94 |
| 92928 | HCPCS | facility | Prq card stent w/angio 1 vsl | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | n/a | n/a | $6110.44 | $21267.94 |
| 92937 | HCPCS | facility | HC PRQ REVASC BYP GRAFT 1 VSL | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | $16752.0 | $11726.4 | $6110.44 | $21267.94 |
| 92943 | HCPCS | facility | HC PERCUT TRANSLUMINAL CORONARY CHRONIC OCCLUSION REVASCULAR; SNGL VESSEL | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | $2314.0 | $1619.8 | $6110.44 | $21267.94 |
| 92987 | HCPCS | facility | Revision of mitral valve | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | n/a | n/a | $4023.05 | $13835.1 |
| 92990 | HCPCS | facility | Revision of pulmonary valve | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | n/a | n/a | $4023.05 | $13835.1 |
| 92997 | HCPCS | facility | HC PERCUTANEOUS TRANS PULMO ARTERY BALLOON, SINGLE | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | $9344.0 | $6540.8 | $4023.05 | $21267.94 |
| C9600 | HCPCS | facility | HC PERC TRANSCATH PLACE D-E STENT, W/COR ANGIO; SINGLE ART/BRANCH | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | $27052.0 | $18936.4 | $7763.18 | $21267.94 |
| C9604 | HCPCS | facility | HC PERC TRANSLUM REVASC, D-E STENT, CABG; SINGLE ART/BRANCH | $11057.1 | $13835.1 | $-2778.0 | 0.80 | 11 | 1 | $27052.0 | $18936.4 | $7763.18 | $21267.94 |
| 21025 | HCPCS | facility | Excision of bone lower jaw | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21026 | HCPCS | facility | Excision of facial bone(s) | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 21030 | HCPCS | facility | Excise max/zygoma b9 tumor | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 21044 | HCPCS | facility | Removal of jaw bone lesion | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 21046 | HCPCS | facility | Remove mandible cyst complex | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21047 | HCPCS | facility | Excise lwr jaw cyst w/repair | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21048 | HCPCS | facility | Remove maxilla cyst complex | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21049 | HCPCS | facility | Excis uppr jaw cyst w/repair | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21060 | HCPCS | facility | Remove jaw joint cartilage | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21100 | HCPCS | facility | Maxillofacial fixation | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21138 | HCPCS | facility | Reduction of forehead | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21139 | HCPCS | facility | Reduction of forehead | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 21356 | HCPCS | facility | Opn tx dprsd zygomatic arch | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 21366 | HCPCS | facility | Opn tx complx malar w/grft | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 5 | 1 | n/a | n/a | $4118.29 | $7094.6 |
| 21452 | HCPCS | facility | Treat lower jaw fracture | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1147.39 | $7094.6 |
| 21685 | HCPCS | facility | Hyoid myotomy & suspension | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 30125 | HCPCS | facility | Removal of nose lesion | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31050 | HCPCS | facility | Exploration sphenoid sinus | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31070 | HCPCS | facility | Exploration of frontal sinus | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31200 | HCPCS | facility | Removal of ethmoid sinus | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 31400 | HCPCS | facility | Revision of larynx | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31614 | HCPCS | facility | Repair windpipe opening | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 31755 | HCPCS | facility | Repair of windpipe | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 40527 | HCPCS | facility | Reconstruct lip with flap | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 40840 | HCPCS | facility | Reconstruction of mouth | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 41823 | HCPCS | facility | Excision of gum lesion | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 41827 | HCPCS | facility | Excision of gum lesion | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 42107 | HCPCS | facility | Excision lesion mouth roof | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42182 | HCPCS | facility | Repair palate | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 42450 | HCPCS | facility | Excise sublingual gland | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42725 | HCPCS | facility | Drainage of throat abscess | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 42950 | HCPCS | facility | Reconstruction of throat | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 43180 | HCPCS | facility | Esophagoscopy rigid trnso | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $457.45 | $7094.6 |
| 69120 | HCPCS | facility | Removal of external ear | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $1799.78 | $7094.6 |
| 69140 | HCPCS | facility | Remove ear canal lesion(s) | $4303.61 | $7094.6 | $-2790.99 | 0.61 | 11 | 1 | n/a | n/a | $3278.89 | $7094.6 |
| 0573T | HCPCS | facility | Removal ss dfb electrode | $1683.13 | $4478.55 | $-2795.42 | 0.38 | 3 | 1 | n/a | n/a | $1683.13 | $4478.55 |
| 0574T | HCPCS | facility | Repos prev ss impl dfb eltrd | $1683.13 | $4478.55 | $-2795.42 | 0.38 | 3 | 1 | n/a | n/a | $1683.13 | $4478.55 |
| 0580T | HCPCS | facility | Rmvl ss impl dfb pg only | $1683.13 | $4478.55 | $-2795.42 | 0.38 | 3 | 1 | n/a | n/a | $1683.13 | $4478.55 |
| 64583 | HCPCS | facility | Rev/rplct hpglsl nstm ary pg | $10551.62 | $13353.93 | $-2802.31 | 0.79 | 10 | 1 | n/a | n/a | $9205.61 | $13353.93 |
| D7771 | HCPCS | facility | Alveolus clsd reduc stblz te | $1155.76 | $3973.4 | $-2817.64 | 0.29 | 3 | 1 | n/a | n/a | $811.09 | $3973.4 |
| 33221 | HCPCS | facility | HC INSERT/REPL TEM TRANS DUAL CHAMBER PACING ELECTRO | $20216.96 | $23084.13 | $-2867.17 | 0.88 | 11 | 1 | $17514.0 | $12259.8 | $5014.56 | $33588.83 |
| 33229 | HCPCS | facility | HC REM & REPL PM GEN, MULTI LEAD | $20216.96 | $23084.13 | $-2867.17 | 0.88 | 11 | 1 | $29465.0 | $20625.5 | $5014.56 | $33588.83 |
| 33902 | HCPCS | facility | Perq p-art revsc 1 abnor uni | $19083.26 | $21969.5 | $-2886.24 | 0.87 | 9 | 1 | n/a | n/a | $17177.6 | $33588.83 |
| 49593 | HCPCS | facility | Rpr aa hrn 1st 3-10 rdc | $4858.22 | $7758.53 | $-2900.31 | 0.63 | 9 | 1 | n/a | n/a | $3934.87 | $8915.56 |
| 49595 | HCPCS | facility | Rpr aa hrn 1st > 10 rdc | $4858.22 | $7758.53 | $-2900.31 | 0.63 | 9 | 1 | n/a | n/a | $3934.87 | $8915.56 |
| 49615 | HCPCS | facility | Rpr aa hrn rcr 3-10 rdc | $4858.22 | $7758.53 | $-2900.31 | 0.63 | 9 | 1 | n/a | n/a | $3934.87 | $8915.56 |
| 65175 | HCPCS | facility | Removal of ocular implant | $1805.48 | $4711.57 | $-2906.09 | 0.38 | 11 | 1 | n/a | n/a | $1367.92 | $4711.57 |
| 65779 | HCPCS | facility | Cover eye w/membrane suture | $1805.48 | $4711.57 | $-2906.09 | 0.38 | 11 | 1 | n/a | n/a | $1129.46 | $4711.57 |
| 67227 | HCPCS | facility | Dstrj extensive retinopathy | $1805.48 | $4711.57 | $-2906.09 | 0.38 | 11 | 1 | n/a | n/a | $1442.12 | $4711.57 |
| C9785 | HCPCS | facility | Endo outlet restrict w/tube | $9817.97 | $12739.3 | $-2921.33 | 0.77 | 3 | 1 | n/a | n/a | $9817.97 | $12739.3 |
| 57020 | HCPCS | facility | Drainage of pelvic fluid | $3072.25 | $5995.17 | $-2922.92 | 0.51 | 11 | 1 | n/a | n/a | $498.11 | $5995.17 |
| 57268 | HCPCS | facility | Repair of bowel bulge | $3072.25 | $5995.17 | $-2922.92 | 0.51 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 57291 | HCPCS | facility | Construction of vagina | $3072.25 | $5995.17 | $-2922.92 | 0.51 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 57335 | HCPCS | facility | Repair vagina | $3072.25 | $5995.17 | $-2922.92 | 0.51 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 57530 | HCPCS | facility | Removal of cervix | $3072.25 | $5995.17 | $-2922.92 | 0.51 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 57550 | HCPCS | facility | Removal of residual cervix | $3072.25 | $5995.17 | $-2922.92 | 0.51 | 11 | 1 | n/a | n/a | $2639.44 | $6735.22 |
| 59100 | HCPCS | facility | Remove uterus lesion | $3072.25 | $5995.17 | $-2922.92 | 0.51 | 11 | 1 | n/a | n/a | $2639.44 | $8915.56 |
| 38542 | HCPCS | facility | Explore deep node(s) neck | $4303.61 | $7245.25 | $-2941.64 | 0.59 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 38740 | HCPCS | facility | Remove armpit lymph nodes | $4303.61 | $7245.25 | $-2941.64 | 0.59 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 47538 | HCPCS | facility | HC PLACMENT STENT INTO BILE DUCT, PERCUT, INCL IMAG GUID; EXISTING ACCESS | $4303.61 | $7245.25 | $-2941.64 | 0.59 | 10 | 1 | $10665.0 | $7465.5 | $2283.22 | $7245.25 |
| 47539 | HCPCS | facility | HC PLACE STENT BILE DUCT,PERCUT,INCL IMAG GUID; ACCESS,W/O BIL DRAIN CATH | $4303.61 | $7245.25 | $-2941.64 | 0.59 | 10 | 1 | $10665.0 | $7465.5 | $2349.8 | $7245.25 |
| 47540 | HCPCS | facility | HC PLACE STENT BILE DUCT, PERCUT, INCL IMAG GUID; ACCESS, W/ BIL DRAIN CATH | $4303.61 | $7245.25 | $-2941.64 | 0.59 | 10 | 1 | $12799.0 | $8959.3 | $2349.8 | $7245.25 |
| 49540 | HCPCS | facility | Repair lumbar hernia | $4303.61 | $7245.25 | $-2941.64 | 0.59 | 11 | 1 | n/a | n/a | $2429.11 | $7245.25 |
| 60200 | HCPCS | facility | Remove thyroid lesion | $4303.61 | $7245.25 | $-2941.64 | 0.59 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 60210 | HCPCS | facility | Partial thyroid excision | $4303.61 | $7245.25 | $-2941.64 | 0.59 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 60220 | HCPCS | facility | Partial removal of thyroid | $4303.61 | $7245.25 | $-2941.64 | 0.59 | 11 | 1 | n/a | n/a | $3671.15 | $7245.25 |
| 0654T | HCPCS | facility | Egd flx transnasal tube/cath | $1658.81 | $4620.58 | $-2961.77 | 0.36 | 3 | 1 | n/a | n/a | $1658.81 | $4620.58 |
| 43265 | HCPCS | facility | Ercp lithotripsy calculi | $4303.61 | $7275.65 | $-2972.04 | 0.59 | 11 | 1 | n/a | n/a | $1727.3 | $7275.65 |
| 43266 | HCPCS | facility | Egd endoscopic stent place | $4303.61 | $7275.65 | $-2972.04 | 0.59 | 11 | 1 | n/a | n/a | $2117.02 | $7275.65 |
| 43274 | HCPCS | facility | Ercp duct stent placement | $4303.61 | $7275.65 | $-2972.04 | 0.59 | 11 | 1 | n/a | n/a | $1727.3 | $7275.65 |
| 43276 | HCPCS | facility | Ercp stent exchange w/dilate | $4303.61 | $7275.65 | $-2972.04 | 0.59 | 11 | 1 | n/a | n/a | $2117.02 | $7275.65 |
| 44402 | HCPCS | facility | Colonoscopy w/stent plcmt | $4303.61 | $7275.65 | $-2972.04 | 0.59 | 11 | 1 | n/a | n/a | $257.66 | $7275.65 |
| 0511T | HCPCS | facility | Rmvl&rinsj sinus tarsi implt | $5699.59 | $8696.19 | $-2996.6 | 0.66 | 3 | 1 | n/a | n/a | $5699.59 | $8696.19 |
| 36906 | HCPCS | facility | HC THRMBC/NFS DIAL CIRC W/STENT | $18955.43 | $21969.5 | $-3014.07 | 0.86 | 10 | 1 | $36132.0 | $25292.4 | $16385.07 | $21969.5 |
| 0888T | HCPCS | facility | Histotripsy mal renal tissue | $17500.5 | $20528.79 | $-3028.29 | 0.85 | 3 | 1 | n/a | n/a | $17500.5 | $20528.79 |
| C9782 | HCPCS | facility | Blind myocar trpl bon marrow | $17500.5 | $20528.79 | $-3028.29 | 0.85 | 3 | 1 | n/a | n/a | $17500.5 | $20528.79 |
| 43497 | HCPCS | facility | Transorl lwr esophgl myotomy | $4210.95 | $7275.65 | $-3064.7 | 0.58 | 8 | 1 | n/a | n/a | $3135.9 | $7275.65 |
| 15155 | HCPCS | facility | Cult skin graft f/n/hf/g | $1151.97 | $4246.97 | $-3095.0 | 0.27 | 11 | 1 | n/a | n/a | $251.48 | $4246.97 |
| 43282 | HCPCS | facility | Lap paraesoph her rpr w/mesh | $9619.86 | $12739.3 | $-3119.44 | 0.76 | 7 | 1 | n/a | n/a | $8853.0 | $12739.3 |
| 0671T | HCPCS | facility | Insj ant sgm aq drg dev 1+ | $3252.495 | $6377.3 | $-3124.805 | 0.51 | 10 | 1 | n/a | n/a | $2120.86 | $6377.3 |
| 23470 | HCPCS | facility | Reconstruct shoulder joint | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $9601.88 | $19292.34 |
| 24435 | HCPCS | facility | Repair humerus with graft | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $5862.48 | $17603.1 |
| 24498 | HCPCS | facility | Reinforce humerus | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $5862.48 | $17603.1 |
| 27415 | HCPCS | facility | Osteochondral knee allograft | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $5862.48 | $17603.1 |
| 27428 | HCPCS | facility | Reconstruction knee | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $5862.48 | $17603.1 |
| 27438 | HCPCS | facility | Revise kneecap with implant | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $4450.11 | $19292.34 |
| 27440 | HCPCS | facility | Revision of knee joint | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $2868.01 | $19292.34 |
| 27441 | HCPCS | facility | Revision of knee joint | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $2868.01 | $19292.34 |
| 27442 | HCPCS | facility | Revision of knee joint | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $2868.01 | $19292.34 |
| 27443 | HCPCS | facility | Revision of knee joint | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $2868.01 | $19292.34 |
| 27446 | HCPCS | facility | Revision of knee joint | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $9601.88 | $19292.34 |
| 28715 | HCPCS | facility | Fusion of foot bones | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $5862.48 | $17603.1 |
| 69714 | HCPCS | facility | Implant Temple Bone W/Stimul | $12251.93 | $15386.48 | $-3134.55 | 0.80 | 11 | 1 | n/a | n/a | $9601.88 | $21267.94 |
| 47531 | HCPCS | facility | HC INJ CHOLANGIO, W/IG & RADIO S&I, EXISTING ACCESS | $1151.97 | $4290.92 | $-3138.95 | 0.27 | 10 | 1 | $5590.0 | $3913.0 | $255.46 | $4290.92 |
| 64628 | HCPCS | facility | Trml dstrj ios bvn 1st 2 l/s | $12241.23 | $15386.48 | $-3145.25 | 0.80 | 10 | 1 | n/a | n/a | $11377.2 | $15386.48 |
| C9783 | HCPCS | facility | Blind cor sinus reducer impl | $10615.31 | $13835.1 | $-3219.79 | 0.77 | 3 | 1 | n/a | n/a | $10615.31 | $13835.1 |
| 62361 | HCPCS | facility | Implant spine infusion pump | $18373.98 | $21600.64 | $-3226.66 | 0.85 | 11 | 1 | n/a | n/a | $9172.31 | $33588.83 |
| 62362 | HCPCS | facility | HC IMPL/REPLACE DEVICE INTRA/EPI DRUG, PUMP | $18373.98 | $21600.64 | $-3226.66 | 0.85 | 11 | 1 | $46495.0 | $32546.5 | $9172.31 | $33588.83 |
| 63650 | HCPCS | facility | HC PERC IMPL NS ELECTR; EPIDURAL | $4399.77 | $7637.7 | $-3237.93 | 0.58 | 11 | 1 | $10507.0 | $7354.9 | $4118.29 | $7637.7 |
| 63663 | HCPCS | facility | HC REVISION (INCL/REPL) SPINAL NEUROSTIMULATOR ELECTRODE PERCUT ARRAY | $4399.77 | $7637.7 | $-3237.93 | 0.58 | 11 | 1 | $11344.0 | $7940.8 | $1727.73 | $7637.7 |
| 64555 | HCPCS | facility | HC PRQ IMPLANT NEUROSTIM ELECTR ARRAY; PERIPHERAL NERVE | $4399.77 | $7637.7 | $-3237.93 | 0.58 | 11 | 1 | $15090.0 | $10563.0 | $1727.73 | $7637.7 |
| 64561 | HCPCS | facility | Implant neuroelectrodes | $4399.77 | $7637.7 | $-3237.93 | 0.58 | 11 | 1 | n/a | n/a | $1727.73 | $7637.7 |
| 0655T | HCPCS | facility | Tprnl focal abltj mal prst8 | $3140.04 | $6425.83 | $-3285.79 | 0.49 | 3 | 1 | n/a | n/a | $3140.04 | $6425.83 |
| 57155 | HCPCS | facility | Insert uteri tandem/ovoids | $2700.25 | $5995.17 | $-3294.92 | 0.45 | 10 | 1 | n/a | n/a | $498.11 | $9561.18 |
| 58346 | HCPCS | facility | Insert heyman uteri capsule | $2700.25 | $5995.17 | $-3294.92 | 0.45 | 11 | 1 | n/a | n/a | $1454.55 | $5995.17 |
| 66683 | HCPCS | facility | Implantation iris prosthesis | $16416.44 | $19727.44 | $-3311.0 | 0.83 | 3 | 1 | n/a | n/a | $16416.44 | $19727.44 |
| D7451 | HCPCS | facility | Rem odontogen cyst > 1.25 cm | $644.54 | $3973.4 | $-3328.86 | 0.16 | 3 | 1 | n/a | n/a | $452.36 | $3973.4 |
| A9601 | HCPCS | facility | Flortaucipir inj 1 millicuri | $357.0 | $3710.0 | $-3353.0 | 0.10 | 5 | 1 | n/a | n/a | $357.0 | $3710.0 |
| 27267 | HCPCS | facility | Cltx thigh fx | $552.31 | $3921.32 | $-3369.01 | 0.14 | 11 | 1 | n/a | n/a | $133.65 | $3921.32 |
| 64582 | HCPCS | facility | Opn mpltj hpglsl nstm ary pg | $33588.83 | $36981.33 | $-3392.5 | 0.91 | 10 | 1 | n/a | n/a | $19541.26 | $36981.33 |
| 24371 | HCPCS | facility | Revise reconst elbow joint | $17613.59 | $21013.36 | $-3399.77 | 0.84 | 11 | 1 | n/a | n/a | $9601.88 | $33588.83 |
| 25444 | HCPCS | facility | Reconstruct wrist joint | $11889.17 | $15386.48 | $-3497.31 | 0.77 | 11 | 1 | n/a | n/a | $4450.11 | $15386.48 |
| 29861 | HCPCS | facility | Hip arthro w/fb removal | $5187.05 | $8696.19 | $-3509.14 | 0.60 | 11 | 1 | n/a | n/a | $2999.94 | $8696.19 |
| 93600 | HCPCS | facility | Bundle of His recording | $5829.16 | $9347.49 | $-3518.33 | 0.62 | 10 | 1 | n/a | n/a | $705.36 | $15711.22 |
| 93602 | HCPCS | facility | HC INTRA-ATRIAL RECORDING | $5829.16 | $9347.49 | $-3518.33 | 0.62 | 10 | 1 | $4792.0 | $3354.4 | $705.36 | $15711.22 |
| 93610 | HCPCS | facility | Intra-atrial pacing | $5829.16 | $9347.49 | $-3518.33 | 0.62 | 10 | 1 | n/a | n/a | $705.36 | $15711.22 |
| 93612 | HCPCS | facility | Intraventricular pacing | $5829.16 | $9347.49 | $-3518.33 | 0.62 | 10 | 1 | n/a | n/a | $705.36 | $15711.22 |
| 93624 | HCPCS | facility | Electrophysiologic study | $5829.16 | $9347.49 | $-3518.33 | 0.62 | 10 | 1 | $16015.0 | $11210.5 | $3922.31 | $16758.28 |
| 93650 | HCPCS | facility | Ablate heart dysrhythm focus | $5829.16 | $9347.49 | $-3518.33 | 0.62 | 11 | 1 | $10625.0 | $7437.5 | $3922.31 | $9619.86 |
| 55873 | HCPCS | facility | Cryoablate Prostate | $7825.08 | $11345.06 | $-3519.98 | 0.69 | 11 | 1 | n/a | n/a | $6445.19 | $11345.06 |
| 49255 | HCPCS | facility | Removal of omentum | $4210.95 | $7758.53 | $-3547.58 | 0.54 | 8 | 1 | n/a | n/a | $833.39 | $7758.53 |
| D7471 | HCPCS | facility | Rem exostosis any site | $419.91 | $3973.4 | $-3553.49 | 0.11 | 2 | 1 | n/a | n/a | $419.91 | $3973.4 |
| D4210 | HCPCS | facility | Gingivectomy/plasty 4 or mor | $353.45 | $3973.4 | $-3619.95 | 0.09 | 3 | 1 | n/a | n/a | $248.01 | $3973.4 |
| 38700 | HCPCS | facility | Removal of lymph nodes neck | $4303.61 | $7957.89 | $-3654.28 | 0.54 | 11 | 1 | n/a | n/a | $1820.0 | $7957.89 |
| 38760 | HCPCS | facility | Remove groin lymph nodes | $4303.61 | $7957.89 | $-3654.28 | 0.54 | 11 | 1 | n/a | n/a | $1820.0 | $7957.89 |
| 25574 | HCPCS | facility | Treat fracture radius & ulna | $5040.3 | $8696.19 | $-3655.89 | 0.58 | 11 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 52327 | HCPCS | facility | Cystoscopy inject material | $2737.09 | $6425.83 | $-3688.74 | 0.43 | 11 | 1 | n/a | n/a | $1727.73 | $6425.83 |
| 43284 | HCPCS | facility | Laps esophgl sphnctr agmntj | $9029.305 | $12739.3 | $-3709.995 | 0.71 | 10 | 1 | n/a | n/a | $6966.89 | $12739.3 |
| D4260 | HCPCS | facility | Osseous surgery 4 or more | $3384.185 | $7094.6 | $-3710.415 | 0.48 | 4 | 1 | n/a | n/a | $3370.31 | $7094.6 |
| 43647 | HCPCS | facility | Lap impl electrode antrum | $9619.86 | $13353.93 | $-3734.07 | 0.72 | 9 | 1 | n/a | n/a | $6792.04 | $13353.93 |
| 21120 | HCPCS | facility | Reconstruction of chin | $3278.89 | $7094.6 | $-3815.71 | 0.46 | 11 | 1 | n/a | n/a | $1727.73 | $7094.6 |
| 31610 | HCPCS | facility | Incision of windpipe | $3278.89 | $7094.6 | $-3815.71 | 0.46 | 11 | 1 | n/a | n/a | $1727.73 | $7094.6 |
| 22101 | HCPCS | facility | Remove part thorax vertebra | $4875.63 | $8696.19 | $-3820.56 | 0.56 | 11 | 1 | n/a | n/a | $2999.94 | $8696.19 |
| 22222 | HCPCS | facility | Incis w/discectomy thoracic | $4875.63 | $8696.19 | $-3820.56 | 0.56 | 11 | 1 | n/a | n/a | $2973.59 | $8915.56 |
| 47371 | HCPCS | facility | Laparo ablate liver cryosurg | $8915.56 | $12739.3 | $-3823.74 | 0.70 | 11 | 1 | n/a | n/a | $8531.64 | $12739.3 |
| 0600T | HCPCS | facility | Ire abltj 1+tum organ perq | $8907.66 | $12739.3 | $-3831.64 | 0.70 | 3 | 1 | n/a | n/a | $8907.66 | $12739.3 |
| 0601T | HCPCS | facility | Ire abltj 1+tumors open | $8907.66 | $12739.3 | $-3831.64 | 0.70 | 3 | 1 | n/a | n/a | $8907.66 | $12739.3 |
| 55866 | HCPCS | facility | Laparo radical prostatectomy | $8884.28 | $12739.3 | $-3855.02 | 0.70 | 8 | 1 | n/a | n/a | $1830.73 | $12739.3 |
| 38120 | HCPCS | facility | Laparoscopy splenectomy | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 38571 | HCPCS | facility | Laparoscopy lymphadenectomy | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $5121.39 | $33588.83 |
| 38572 | HCPCS | facility | Laparoscopy lymphadenectomy | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 38573 | HCPCS | facility | Laps pelvic lymphadec | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 10 | 1 | n/a | n/a | $7594.89 | $12739.3 |
| 43280 | HCPCS | facility | Laparoscopy fundoplasty | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $5121.39 | $12739.3 |
| 43281 | HCPCS | facility | Lap paraesophag hern repair | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $5121.39 | $12739.3 |
| 47370 | HCPCS | facility | Laparo ablate liver tumor rf | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $6445.19 | $12739.3 |
| 50542 | HCPCS | facility | Laparo ablate renal mass | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $1727.73 | $12739.3 |
| 50544 | HCPCS | facility | Laparoscopy pyeloplasty | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 50593 | HCPCS | facility | HC ABLATION, RENAL TUMOR(S), PERCUTANEOUS, UNILATERAL, CRYOTHERAPY | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | $16502.0 | $11551.4 | $4046.61 | $12739.3 |
| 50948 | HCPCS | facility | Laparo New Ureter/Bladder | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 57423 | HCPCS | facility | Repair paravag defect lap | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3405.53 | $12739.3 |
| 58542 | HCPCS | facility | Lsh w/t/o ut 250 g or less | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $5121.39 | $12739.3 |
| 58543 | HCPCS | facility | LSH Uterus Above 250 g | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $5121.39 | $12739.3 |
| 58544 | HCPCS | facility | LSH w/t/o Uterus Above 250 g | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $5121.39 | $12739.3 |
| 58546 | HCPCS | facility | Laparo-myomectomy complex | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 58552 | HCPCS | facility | Laparo-vag hyst incl t/o | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 58553 | HCPCS | facility | Laparo-vag hyst complex | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 58554 | HCPCS | facility | Laparo-vag hyst w/t/o compl | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 58570 | HCPCS | facility | Tlh uterus 250 g or less | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 58571 | HCPCS | facility | Tlh w/t/o 250 g or less | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 58572 | HCPCS | facility | Tlh uterus over 250 g | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 58573 | HCPCS | facility | Tlh w/t/o uterus over 250 g | $8853.0 | $12739.3 | $-3886.3 | 0.69 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 61720 | HCPCS | facility | Incise skull/brain surgery | $6590.205 | $10517.39 | $-3927.185 | 0.63 | 8 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 0588T | HCPCS | facility | Revision/removal isdns ptn | $261.74 | $4189.9 | $-3928.16 | 0.06 | 5 | 1 | n/a | n/a | $261.74 | $4189.9 |
| 36836 | HCPCS | facility | Prq av fstl crtj uxtr 1 acs | $18018.81 | $21969.5 | $-3950.69 | 0.82 | 9 | 1 | n/a | n/a | $17177.6 | $33588.83 |
| 36837 | HCPCS | facility | Prq av fstl crt uxtr sep acs | $18018.81 | $21969.5 | $-3950.69 | 0.82 | 9 | 1 | n/a | n/a | $17177.6 | $33588.83 |
| 49419 | HCPCS | facility | Insert tun ip cath w/port | $2679.73 | $6668.74 | $-3989.01 | 0.40 | 11 | 1 | n/a | n/a | $1727.73 | $6668.74 |
| 53451 | HCPCS | facility | Tprnl balo cntnc dev bi | $11809.565 | $15811.66 | $-4002.095 | 0.75 | 8 | 1 | n/a | n/a | $11377.2 | $15811.66 |
| C9797 | HCPCS | facility | HC VASCULAR EMBOLIZATION/OCCLUSION, PRESSURE-GENERATING CATH | $17956.72 | $21969.5 | $-4012.78 | 0.82 | 4 | 1 | $42832.0 | $29982.4 | $17956.72 | $21969.5 |
| 33231 | HCPCS | facility | Insrt pulse gen w/mult leads | $33588.83 | $37617.9 | $-4029.07 | 0.89 | 11 | 1 | n/a | n/a | $14632.83 | $37617.9 |
| 33249 | HCPCS | facility | HC INITIAL PULSE GENERATOR INSERT; IMPLANT DEFRIB | $33588.83 | $37617.9 | $-4029.07 | 0.89 | 11 | 1 | $55676.0 | $38973.2 | $19942.01 | $39149.34 |
| 33264 | HCPCS | facility | HC REM & REPL CVD GEN, MULTI LEAD | $33588.83 | $37617.9 | $-4029.07 | 0.89 | 11 | 1 | $50614.0 | $35429.8 | $14632.83 | $37617.9 |
| 33270 | HCPCS | facility | HC INSRT/REPL SUBQ DEFIB W/ELECTR | $33588.83 | $37617.9 | $-4029.07 | 0.89 | 10 | 1 | $12800.0 | $8960.0 | $14632.83 | $37617.9 |
| 43240 | HCPCS | facility | Egd w/transmural drain cyst | $3230.19 | $7275.65 | $-4045.46 | 0.44 | 11 | 1 | n/a | n/a | $926.78 | $7275.65 |
| 53442 | HCPCS | facility | Remove/revise male sling | $2373.22 | $6425.83 | $-4052.61 | 0.37 | 11 | 1 | n/a | n/a | $1727.73 | $6425.83 |
| 53446 | HCPCS | facility | Remove uro sphincter | $2373.22 | $6425.83 | $-4052.61 | 0.37 | 11 | 1 | n/a | n/a | $1727.73 | $6425.83 |
| 25393 | HCPCS | facility | Lengthen radius & ulna | $4605.66 | $8696.19 | $-4090.53 | 0.53 | 11 | 1 | n/a | n/a | $2999.94 | $8696.19 |
| 27033 | HCPCS | facility | Exploration of hip joint | $4605.66 | $8696.19 | $-4090.53 | 0.53 | 11 | 1 | n/a | n/a | $2999.94 | $8696.19 |
| 27650 | HCPCS | facility | Repair achilles tendon | $4605.66 | $8696.19 | $-4090.53 | 0.53 | 11 | 1 | n/a | n/a | $2999.94 | $8696.19 |
| 29892 | HCPCS | facility | Ankle arthroscopy/surgery | $4605.66 | $8696.19 | $-4090.53 | 0.53 | 11 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 31276 | HCPCS | facility | Sinus endoscopy surgical | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31287 | HCPCS | facility | Nasal/sinus endoscopy surg | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31288 | HCPCS | facility | Nasal/sinus endoscopy surg | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31292 | HCPCS | facility | Nasal/sinus endoscopy surg | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31293 | HCPCS | facility | Nasal/sinus endoscopy surg | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31294 | HCPCS | facility | Nasal/sinus endoscopy surg | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $2026.82 | $8457.99 |
| 31626 | HCPCS | facility | Bronchoscopy w/markers | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $1572.2 | $8457.99 |
| 31631 | HCPCS | facility | Bronchoscopy dilate w/stent | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $1572.2 | $8457.99 |
| 31636 | HCPCS | facility | Bronchoscopy bronch stents | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $1572.2 | $8457.99 |
| 31638 | HCPCS | facility | Bronchoscopy revise stent | $4303.61 | $8457.99 | $-4154.38 | 0.51 | 11 | 1 | n/a | n/a | $1572.2 | $8457.99 |
| 0505T | HCPCS | facility | Ev fempop artl revsc | $9669.04 | $13835.1 | $-4166.06 | 0.70 | 3 | 1 | n/a | n/a | $9669.04 | $13835.1 |
| 28300 | HCPCS | facility | Incision of heel bone | $4327.81 | $8696.19 | $-4368.38 | 0.50 | 11 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 28304 | HCPCS | facility | Incision of midfoot bones | $4327.81 | $8696.19 | $-4368.38 | 0.50 | 11 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 28360 | HCPCS | facility | Reconstruct cleft foot | $4327.81 | $8696.19 | $-4368.38 | 0.50 | 11 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 44950 | HCPCS | facility | Appendectomy | $3370.43 | $7758.53 | $-4388.1 | 0.43 | 11 | 1 | n/a | n/a | $1852.58 | $7758.53 |
| 47552 | HCPCS | facility | Biliary endo perq dx w/speci | $3370.43 | $7758.53 | $-4388.1 | 0.43 | 11 | 1 | n/a | n/a | $2027.76 | $7758.53 |
| 47555 | HCPCS | facility | Biliary endoscopy thru skin | $3370.43 | $7758.53 | $-4388.1 | 0.43 | 11 | 1 | n/a | n/a | $2027.76 | $7758.53 |
| 49500 | HCPCS | facility | Rpr ing hernia init reduce | $3370.43 | $7758.53 | $-4388.1 | 0.43 | 11 | 1 | n/a | n/a | $2429.11 | $7758.53 |
| 49521 | HCPCS | facility | Rerepair ing hernia blocked | $3370.43 | $7758.53 | $-4388.1 | 0.43 | 11 | 1 | n/a | n/a | $2429.11 | $8915.56 |
| 55535 | HCPCS | facility | Revise spermatic cord veins | $3370.43 | $7758.53 | $-4388.1 | 0.43 | 11 | 1 | n/a | n/a | $2429.11 | $7758.53 |
| 20690 | HCPCS | facility | Apply bone fixation device | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 20693 | HCPCS | facility | Adjust bone fixation device | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 20983 | HCPCS | facility | Ablate bone tumor(s) perq | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | $9932.0 | $6952.4 | $457.45 | $8696.19 |
| 21600 | HCPCS | facility | Partial removal of rib | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 23405 | HCPCS | facility | Incision of tendon & muscle | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24134 | HCPCS | facility | Removal of arm bone lesion | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24138 | HCPCS | facility | Remove elbow bone lesion | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24345 | HCPCS | facility | Repr elbw med ligmnt w/tissu | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24495 | HCPCS | facility | Decompression of forearm | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 24538 | HCPCS | facility | Treat humerus fracture | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 25035 | HCPCS | facility | Treat forearm bone lesion | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $1555.31 | $8696.19 |
| 25676 | HCPCS | facility | Treat wrist dislocation | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 25695 | HCPCS | facility | Treat wrist dislocation | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 26553 | HCPCS | facility | Single transfer toe-hand | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 6 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 26554 | HCPCS | facility | Double transfer toe-hand | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 6 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 27090 | HCPCS | facility | Removal of hip prosthesis | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 6 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 27235 | HCPCS | facility | Treat thigh fracture | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27448 | HCPCS | facility | Incision of thigh | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 6 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 27454 | HCPCS | facility | Realignment of thigh bone | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 6 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 27475 | HCPCS | facility | Surgery to stop leg growth | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27566 | HCPCS | facility | Treat kneecap dislocation | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27659 | HCPCS | facility | Repair of leg tendon each | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $1555.31 | $8696.19 |
| 27664 | HCPCS | facility | HC REPR/SUTR LEG EXTENSOR TENDON | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | $5495.0 | $3846.5 | $2306.77 | $8696.19 |
| 27665 | HCPCS | facility | Repair of leg tendon each | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27695 | HCPCS | facility | Repair of ankle ligament | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27696 | HCPCS | facility | Repair of ankle ligaments | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27698 | HCPCS | facility | Repair of ankle ligament | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27705 | HCPCS | facility | Incision of tibia | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $3437.59 | $8696.19 |
| 27826 | HCPCS | facility | Treat lower leg fracture | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27829 | HCPCS | facility | Treat lower leg joint | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27832 | HCPCS | facility | Treat lower leg dislocation | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 27880 | HCPCS | facility | Amputation of lower leg | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 6 | 1 | n/a | n/a | $4118.29 | $8696.19 |
| 27893 | HCPCS | facility | Decompression of leg | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 28302 | HCPCS | facility | Incision of ankle bone | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $1583.94 | $8696.19 |
| 28406 | HCPCS | facility | Treatment of heel fracture | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 28436 | HCPCS | facility | Treatment of ankle fracture | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 28456 | HCPCS | facility | Treat midfoot fracture | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 28555 | HCPCS | facility | Repair foot dislocation | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $3763.94 | $8696.19 |
| 62351 | HCPCS | facility | Implant spinal canal cath | $4303.61 | $8696.19 | $-4392.58 | 0.49 | 11 | 1 | n/a | n/a | $3758.59 | $8696.19 |
| 0238T | HCPCS | facility | HC ARTHERECTOMY, ILIAC, EA VESSEL | $17558.75 | $21969.5 | $-4410.75 | 0.80 | 2 | 1 | $25081.0 | $17556.7 | $17558.75 | $21969.5 |
| 92933 | HCPCS | facility | HC PRQ TRLUML CORONARY STENT/ATH/ANGIO, ONE ART/BRANCH | $17558.75 | $21969.5 | $-4410.75 | 0.80 | 11 | 1 | $47343.0 | $33140.1 | $6110.44 | $33588.83 |
| 93580 | HCPCS | facility | Transcath closure of asd | $17558.75 | $21969.5 | $-4410.75 | 0.80 | 11 | 1 | n/a | n/a | $11974.67 | $33588.83 |
| 93581 | HCPCS | facility | Transcath closure of vsd | $17558.75 | $21969.5 | $-4410.75 | 0.80 | 11 | 1 | n/a | n/a | $11974.67 | $33588.83 |
| 93582 | HCPCS | facility | Perq transcath closure pda | $17558.75 | $21969.5 | $-4410.75 | 0.80 | 11 | 1 | n/a | n/a | $11974.67 | $33588.83 |
| C9602 | HCPCS | facility | HC PRQ TRLUML CORONARY ARTHER, DRUG ELUTIN STENT, ONE ART/BRANCH | $17558.75 | $21969.5 | $-4410.75 | 0.80 | 11 | 1 | $47343.0 | $33140.1 | $7763.18 | $33588.83 |
| C9607 | HCPCS | facility | HC PERC TRANSLUM REVASC CHRONIC TOT OCCLUS, D-E STENT; SINGLE VESSEL | $17558.75 | $21969.5 | $-4410.75 | 0.80 | 11 | 1 | $47343.0 | $33140.1 | $7763.18 | $33588.83 |
| 37200 | HCPCS | facility | HC TRANSCATHETER BIOPSY | $2228.0 | $6668.74 | $-4440.74 | 0.33 | 11 | 1 | $10135.0 | $7094.5 | $1727.73 | $6668.74 |
| 21615 | HCPCS | facility | Removal of rib | $4210.95 | $8696.19 | $-4485.24 | 0.48 | 8 | 1 | n/a | n/a | $661.57 | $8696.19 |
| 23335 | HCPCS | facility | Shoulder prosthesis removal | $4210.95 | $8696.19 | $-4485.24 | 0.48 | 8 | 1 | n/a | n/a | $1363.71 | $8696.19 |
| 27477 | HCPCS | facility | Surgery to stop leg growth | $4210.95 | $8696.19 | $-4485.24 | 0.48 | 8 | 1 | n/a | n/a | $781.8 | $8696.19 |
| 27485 | HCPCS | facility | Surgery to stop leg growth | $4210.95 | $8696.19 | $-4485.24 | 0.48 | 8 | 1 | n/a | n/a | $716.74 | $8696.19 |
| 27495 | HCPCS | facility | Reinforce thigh | $4210.95 | $8696.19 | $-4485.24 | 0.48 | 8 | 1 | n/a | n/a | $1202.62 | $8696.19 |
| 27519 | HCPCS | facility | Treat thigh fx growth plate | $4210.95 | $8696.19 | $-4485.24 | 0.48 | 8 | 1 | n/a | n/a | $946.98 | $8696.19 |
| 27540 | HCPCS | facility | Treat knee fracture | $4210.95 | $8696.19 | $-4485.24 | 0.48 | 8 | 1 | n/a | n/a | $869.74 | $8696.19 |
| 0795T | HCPCS | facility | Tcat ins 2chmbr ldls pm cmpl | $18584.67 | $23084.13 | $-4499.46 | 0.81 | 3 | 1 | n/a | n/a | $18584.67 | $23084.13 |
| 0796T | HCPCS | facility | Tcat ins 2chmbr ldls pm ra | $18584.67 | $23084.13 | $-4499.46 | 0.81 | 3 | 1 | n/a | n/a | $18584.67 | $23084.13 |
| 0797T | HCPCS | facility | Tcat ins 2chmbr ldls pm rv | $18584.67 | $23084.13 | $-4499.46 | 0.81 | 3 | 1 | n/a | n/a | $18584.67 | $23084.13 |
| 0801T | HCPCS | facility | Tcat rmv&rpl 2chmbr ldls pm | $18584.67 | $23084.13 | $-4499.46 | 0.81 | 3 | 1 | n/a | n/a | $18584.67 | $23084.13 |
| 0802T | HCPCS | facility | Tcat rmv&rpl2chmb ldls pm ra | $18584.67 | $23084.13 | $-4499.46 | 0.81 | 3 | 1 | n/a | n/a | $18584.67 | $23084.13 |
| 0803T | HCPCS | facility | Tcat rmv&rpl2chmb ldls pm rv | $18584.67 | $23084.13 | $-4499.46 | 0.81 | 3 | 1 | n/a | n/a | $18584.67 | $23084.13 |
| 0823T | HCPCS | facility | Tcat ins 1chmbr ldls pm ra | $18584.67 | $23084.13 | $-4499.46 | 0.81 | 5 | 1 | n/a | n/a | $18584.67 | $23084.13 |
| 0825T | HCPCS | facility | Tcat rmv&rpl1chmb ldls pm ra | $18584.67 | $23084.13 | $-4499.46 | 0.81 | 5 | 1 | n/a | n/a | $18584.67 | $23084.13 |
| 50553 | HCPCS | facility | Kidney endoscopy | $1908.86 | $6425.83 | $-4516.97 | 0.30 | 11 | 1 | n/a | n/a | $1727.73 | $6425.83 |
| 50561 | HCPCS | facility | Kidney endoscopy & treatment | $1908.86 | $6425.83 | $-4516.97 | 0.30 | 11 | 1 | n/a | n/a | $1727.73 | $6425.83 |
| 50955 | HCPCS | facility | Ureter endoscopy & biopsy | $1908.86 | $6425.83 | $-4516.97 | 0.30 | 11 | 1 | n/a | n/a | $1727.73 | $6425.83 |
| 50957 | HCPCS | facility | Ureter endoscopy & treatment | $1908.86 | $6425.83 | $-4516.97 | 0.30 | 11 | 1 | n/a | n/a | $1727.73 | $6425.83 |
| 50961 | HCPCS | facility | Ureter endoscopy & treatment | $1908.86 | $6425.83 | $-4516.97 | 0.30 | 11 | 1 | n/a | n/a | $1727.73 | $6425.83 |
| 50980 | HCPCS | facility | Ureter endoscopy & treatment | $1908.86 | $6425.83 | $-4516.97 | 0.30 | 11 | 1 | n/a | n/a | $1727.73 | $6425.83 |
| 0446T | HCPCS | facility | Insj impltbl glucose sensor | $452.91 | $4986.01 | $-4533.1 | 0.09 | 5 | 1 | n/a | n/a | $452.91 | $4986.01 |
| 0448T | HCPCS | facility | Remvl insj impltbl gluc sens | $452.91 | $4986.01 | $-4533.1 | 0.09 | 5 | 1 | n/a | n/a | $452.91 | $4986.01 |
| 57282 | HCPCS | facility | Colpopexy extraperitoneal | $4303.61 | $8887.01 | $-4583.4 | 0.48 | 11 | 1 | n/a | n/a | $3405.53 | $8887.01 |
| 50080 | HCPCS | facility | Removal of kidney stone | $6735.22 | $11345.06 | $-4609.84 | 0.59 | 11 | 1 | n/a | n/a | $3261.04 | $11345.06 |
| C9761 | HCPCS | facility | Cysto, litho, vacuum kidney | $6735.22 | $11345.06 | $-4609.84 | 0.59 | 9 | 1 | n/a | n/a | $4413.9 | $11345.06 |
| 50551 | HCPCS | facility | Kidney endoscopy | $1805.48 | $6425.83 | $-4620.35 | 0.28 | 11 | 1 | n/a | n/a | $509.76 | $6425.83 |
| 50974 | HCPCS | facility | Ureter endoscopy & biopsy | $1805.48 | $6425.83 | $-4620.35 | 0.28 | 11 | 1 | n/a | n/a | $1131.27 | $6425.83 |
| 50976 | HCPCS | facility | Ureter endoscopy & treatment | $1805.48 | $6425.83 | $-4620.35 | 0.28 | 11 | 1 | n/a | n/a | $1131.27 | $6425.83 |
| 53010 | HCPCS | facility | Incision of urethra | $1805.48 | $6425.83 | $-4620.35 | 0.28 | 11 | 1 | n/a | n/a | $1540.12 | $6425.83 |
| 50580 | HCPCS | facility | Kidney endoscopy & treatment | $1766.605 | $6425.83 | $-4659.225 | 0.27 | 8 | 1 | n/a | n/a | $1131.27 | $6425.83 |
| 32601 | HCPCS | facility | Thoracoscopy diagnostic | $2564.75 | $7245.25 | $-4680.5 | 0.35 | 11 | 1 | n/a | n/a | $1727.73 | $7245.25 |
| 32606 | HCPCS | facility | Thoracoscopy w/bx med space | $2564.75 | $7245.25 | $-4680.5 | 0.35 | 11 | 1 | n/a | n/a | $1727.73 | $7245.25 |
| 53452 | HCPCS | facility | Tprnl balo cntnc dev uni | $6590.205 | $11345.06 | $-4754.855 | 0.58 | 8 | 1 | n/a | n/a | $4505.89 | $11345.06 |
| 36557 | HCPCS | facility | Insert tunneled cv cath | $1805.48 | $6668.74 | $-4863.26 | 0.27 | 11 | 1 | n/a | n/a | $1727.73 | $6668.74 |
| 37211 | HCPCS | facility | HC THROMBOLYTIC ART THERAPY | $1805.48 | $6668.74 | $-4863.26 | 0.27 | 10 | 1 | $7233.0 | $5063.1 | $786.08 | $6668.74 |
| 19298 | HCPCS | facility | Place breast rad tube/caths | $11633.185 | $16515.75 | $-4882.565 | 0.70 | 8 | 1 | n/a | n/a | $4562.0 | $16515.75 |
| 26530 | HCPCS | facility | Revise knuckle joint | $3802.83 | $8696.19 | $-4893.36 | 0.44 | 11 | 1 | n/a | n/a | $2868.01 | $8696.19 |
| 36903 | HCPCS | facility | HC INTRO CATH DIAL CIRC W/STENT | $8896.16 | $13835.1 | $-4938.94 | 0.64 | 10 | 1 | $19072.0 | $13350.4 | $6445.19 | $15049.41 |
| 93619 | HCPCS | facility | Electrophysiology evaluation | $4303.61 | $9347.49 | $-5043.88 | 0.46 | 11 | 1 | $9485.0 | $6639.5 | $3922.31 | $9347.49 |
| 93620 | HCPCS | facility | Electrophysiology evaluation | $4303.61 | $9347.49 | $-5043.88 | 0.46 | 11 | 1 | $10625.0 | $7437.5 | $3922.31 | $9347.49 |
| 0526T | HCPCS | facility | Insj/rplcmt iims eltrd only | $4812.67 | $9917.62 | $-5104.95 | 0.49 | 3 | 1 | n/a | n/a | $4812.67 | $9917.62 |
| 0527T | HCPCS | facility | Insj/rplcmt iims implt mntr | $4812.67 | $9917.62 | $-5104.95 | 0.49 | 3 | 1 | n/a | n/a | $4812.67 | $9917.62 |
| 45327 | HCPCS | facility | Proctosigmoidoscopy W/Stent | $2117.02 | $7275.65 | $-5158.63 | 0.29 | 11 | 1 | n/a | n/a | $1727.73 | $7275.65 |
| 45389 | HCPCS | facility | Colonoscopy w/stent plcmt | $2117.02 | $7275.65 | $-5158.63 | 0.29 | 11 | 1 | n/a | n/a | $1727.73 | $7275.65 |
| 37236 | HCPCS | facility | HC OPEN/PERQ PLACE STENT; 1ST ART | $8656.82 | $13835.1 | $-5178.28 | 0.63 | 11 | 1 | $31277.0 | $21893.9 | $4118.29 | $13835.1 |
| 37238 | HCPCS | facility | HC OPEN/PRQ PLACE STNT SAME 1ST V | $8656.82 | $13835.1 | $-5178.28 | 0.63 | 11 | 1 | $31277.0 | $21893.9 | $4118.29 | $13835.1 |
| 0793T | HCPCS | facility | Prq tcat thrm ablt nrv p-art | $16724.7 | $21969.5 | $-5244.8 | 0.76 | 3 | 1 | n/a | n/a | $16724.7 | $21969.5 |
| 21125 | HCPCS | facility | Augmentation lower jaw bone | $1805.48 | $7094.6 | $-5289.12 | 0.25 | 11 | 1 | n/a | n/a | $1727.73 | $7094.6 |
| 31601 | HCPCS | facility | Incision of windpipe | $1805.48 | $7094.6 | $-5289.12 | 0.25 | 11 | 1 | n/a | n/a | $1727.73 | $7094.6 |
| 41016 | HCPCS | facility | Drainage of mouth lesion | $1805.48 | $7094.6 | $-5289.12 | 0.25 | 11 | 1 | n/a | n/a | $1727.73 | $7094.6 |
| 41512 | HCPCS | facility | Tongue suspension | $1805.48 | $7094.6 | $-5289.12 | 0.25 | 11 | 1 | n/a | n/a | $1727.73 | $7094.6 |
| 61215 | HCPCS | facility | Insert brain-fluid device | $5221.55 | $10517.39 | $-5295.84 | 0.50 | 11 | 1 | n/a | n/a | $3251.09 | $10517.39 |
| 63741 | HCPCS | facility | Install spinal shunt | $5221.55 | $10517.39 | $-5295.84 | 0.50 | 11 | 1 | n/a | n/a | $3251.09 | $10517.39 |
| 64864 | HCPCS | facility | Repair of facial nerve | $5221.55 | $10517.39 | $-5295.84 | 0.50 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64895 | HCPCS | facility | Nerve graft hand/foot <=4 cm | $5221.55 | $10517.39 | $-5295.84 | 0.50 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64896 | HCPCS | facility | Nerve graft hand/foot >4 cm | $5221.55 | $10517.39 | $-5295.84 | 0.50 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64897 | HCPCS | facility | Nerve graft arm/leg <=4 cm | $5221.55 | $10517.39 | $-5295.84 | 0.50 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64898 | HCPCS | facility | Nerve graft arm/leg >4 cm | $5221.55 | $10517.39 | $-5295.84 | 0.50 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 61886 | HCPCS | facility | Implant neurostim arrays | $31674.07 | $36981.33 | $-5307.26 | 0.86 | 11 | 1 | n/a | n/a | $13391.46 | $36981.33 |
| 63685 | HCPCS | facility | HC INSERT/REPLACE SPINAL NEURO PULSE GEN/REC | $31674.07 | $36981.33 | $-5307.26 | 0.86 | 11 | 1 | $56091.0 | $39263.7 | $10656.57 | $36981.33 |
| 0410T | HCPCS | facility | Insj/rplc car modulj atr elt | $4532.85 | $9917.62 | $-5384.77 | 0.46 | 5 | 1 | n/a | n/a | $4532.85 | $9917.62 |
| 0411T | HCPCS | facility | Insj/rplc car modulj vnt elt | $4532.85 | $9917.62 | $-5384.77 | 0.46 | 5 | 1 | n/a | n/a | $4532.85 | $9917.62 |
| D7950 | HCPCS | facility | Mandible graft | $1637.68 | $7094.6 | $-5456.92 | 0.23 | 2 | 1 | n/a | n/a | $1637.68 | $7094.6 |
| 43212 | HCPCS | facility | Esophagoscop stent placement | $1805.48 | $7275.65 | $-5470.17 | 0.25 | 9 | 1 | n/a | n/a | $1727.73 | $7275.65 |
| 45347 | HCPCS | facility | Sigmoidoscopy w/plcmt stent | $1805.48 | $7275.65 | $-5470.17 | 0.25 | 11 | 1 | n/a | n/a | $1011.89 | $7275.65 |
| 19340 | HCPCS | facility | Immediate breast prosthesis | $4303.61 | $9795.38 | $-5491.77 | 0.44 | 11 | 1 | n/a | n/a | $3235.96 | $9795.38 |
| 43648 | HCPCS | facility | Lap revise/remv eltrd antrum | $7230.615 | $12739.3 | $-5508.685 | 0.57 | 10 | 1 | n/a | n/a | $2730.07 | $12739.3 |
| 28299 | HCPCS | facility | Correction hallux valgus | $3183.75 | $8696.19 | $-5512.44 | 0.37 | 11 | 1 | n/a | n/a | $2455.43 | $8915.56 |
| 23174 | HCPCS | facility | Remove humerus lesion | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 23180 | HCPCS | facility | Remove collar bone lesion | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 23182 | HCPCS | facility | Remove shoulder blade lesion | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 23406 | HCPCS | facility | Incise tendon(s) & muscle(s) | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 23440 | HCPCS | facility | Remove/transplant tendon | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 25135 | HCPCS | facility | Remove & graft wrist lesion | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 25263 | HCPCS | facility | Repair forearm tendon/muscle | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 25392 | HCPCS | facility | Shorten radius & ulna | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27350 | HCPCS | facility | Removal of kneecap | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27393 | HCPCS | facility | Lengthening of thigh tendon | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27403 | HCPCS | facility | Repair of knee cartilage | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 27499 | HCPCS | facility | Decompression of thigh/knee | $3137.19 | $8696.19 | $-5559.0 | 0.36 | 11 | 1 | n/a | n/a | $2306.77 | $8696.19 |
| 47383 | HCPCS | facility | HC ABLATION, 1/+ LIVER TUMOR(S), PERCUTANEOUS, CYROABLATION | $7173.54 | $12739.3 | $-5565.76 | 0.56 | 10 | 1 | $10665.0 | $7465.5 | $4046.61 | $12739.3 |
| 36905 | HCPCS | facility | HC THRMBC/NFS DIAL CIRC W/ANGIO | $8237.495 | $13835.1 | $-5597.605 | 0.60 | 10 | 1 | $23839.0 | $16687.3 | $6445.19 | $13835.1 |
| 47541 | HCPCS | facility | HC PLACE ACC BIL TREE/SM BOWEL ASS ENDO BIL PROC, PERCUT, INCL IG; | $2077.64 | $7758.53 | $-5680.89 | 0.27 | 10 | 1 | $6917.0 | $4841.9 | $1727.73 | $7758.53 |
| 21700 | HCPCS | facility | Revision of neck muscle | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1555.31 | $8696.19 |
| 21811 | HCPCS | facility | Optx of rib fx w/fixj scope | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 21812 | HCPCS | facility | Treatment of rib fracture | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 24582 | HCPCS | facility | Treat humerus fracture | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 25670 | HCPCS | facility | Treat wrist dislocation | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 25685 | HCPCS | facility | Treat wrist fracture | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 26352 | HCPCS | facility | Repair/graft hand tendon | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26358 | HCPCS | facility | Repair/graft hand tendon | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 26518 | HCPCS | facility | Fusion of knuckle joints | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $2066.12 | $8696.19 |
| 27060 | HCPCS | facility | Removal of ischial bursa | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1555.31 | $8915.56 |
| 27065 | HCPCS | facility | Remove hip bone les super | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1555.31 | $8915.56 |
| 28070 | HCPCS | facility | Removal of foot joint lining | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1583.94 | $8696.19 |
| 28130 | HCPCS | facility | Removal of ankle bone | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1583.94 | $8696.19 |
| 28307 | HCPCS | facility | Incision of metatarsal | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1583.94 | $8696.19 |
| 28310 | HCPCS | facility | Revision of big toe | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1583.94 | $8696.19 |
| 28576 | HCPCS | facility | Treat foot dislocation | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $1908.84 | $8696.19 |
| 29905 | HCPCS | facility | Subtalar arthro w/exc | $2999.94 | $8696.19 | $-5696.25 | 0.34 | 11 | 1 | n/a | n/a | $2111.62 | $8696.19 |
| 22551 | HCPCS | facility | Neck spine fuse&remov bel c2 | $9619.86 | $15386.48 | $-5766.62 | 0.63 | 11 | 1 | n/a | n/a | $3758.59 | $15386.48 |
| 27120 | HCPCS | facility | Reconstruction of hip socket | $9619.86 | $15386.48 | $-5766.62 | 0.63 | 7 | 1 | n/a | n/a | $2219.8 | $15386.48 |
| 27511 | HCPCS | facility | Treatment of thigh fracture | $9619.86 | $15386.48 | $-5766.62 | 0.63 | 6 | 1 | n/a | n/a | $9205.61 | $15386.48 |
| 24366 | HCPCS | facility | Reconstruct head of radius | $9601.88 | $15386.48 | $-5784.6 | 0.62 | 11 | 1 | n/a | n/a | $8531.64 | $15386.48 |
| 25441 | HCPCS | facility | Reconstruct wrist joint | $9601.88 | $15386.48 | $-5784.6 | 0.62 | 11 | 1 | n/a | n/a | $8531.64 | $15386.48 |
| 32607 | HCPCS | facility | Thoracoscopy w/bx infiltrate | $6893.63 | $12739.3 | $-5845.67 | 0.54 | 10 | 1 | n/a | n/a | $2564.75 | $12739.3 |
| 32994 | HCPCS | facility | Ablate pulm tumor perq crybl | $6893.63 | $12739.3 | $-5845.67 | 0.54 | 10 | 1 | $10920.0 | $7644.0 | $4488.37 | $12739.3 |
| 33224 | HCPCS | facility | HC INSERT PACING LEAD & CONNECT | $6621.28 | $12526.17 | $-5904.89 | 0.53 | 11 | 1 | $4502.0 | $3151.4 | $1727.73 | $12895.61 |
| 69930 | HCPCS | facility | Implant cochlear device | $33588.83 | $39515.35 | $-5926.52 | 0.85 | 11 | 1 | n/a | n/a | $19712.47 | $39515.35 |
| 23334 | HCPCS | facility | Shoulder prosthesis removal | $2719.71 | $8696.19 | $-5976.48 | 0.31 | 11 | 1 | n/a | n/a | $1661.08 | $8696.19 |
| 50543 | HCPCS | facility | Laparo partial nephrectomy | $6735.22 | $12739.3 | $-6004.08 | 0.53 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 57425 | HCPCS | facility | Laparoscopy surg colpopexy | $6735.22 | $12739.3 | $-6004.08 | 0.53 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 64580 | HCPCS | facility | Implant neuroelectrodes | $17224.09 | $23250.02 | $-6025.93 | 0.74 | 8 | 1 | n/a | n/a | $6792.04 | $23250.02 |
| 64912 | HCPCS | facility | Nrv rpr w/nrv algrft 1st | $4465.44 | $10517.39 | $-6051.95 | 0.42 | 10 | 1 | n/a | n/a | $4118.29 | $10517.39 |
| C9765 | HCPCS | facility | HC REVASC INTRAVASCULAR LITHOTRIPSY, STENT | $15883.885 | $21969.5 | $-6085.615 | 0.72 | 10 | 1 | $39312.0 | $27518.4 | $10042.94 | $21969.5 |
| C9766 | HCPCS | facility | HC REVASC INTRAVASCULAR LITHOTRIPSY, ATHERECTOMY | $15883.885 | $21969.5 | $-6085.615 | 0.72 | 10 | 1 | $39312.0 | $27518.4 | $10042.94 | $21969.5 |
| 0572T | HCPCS | facility | Insertion ss dfb electrode | $3766.05 | $9917.62 | $-6151.57 | 0.38 | 3 | 1 | n/a | n/a | $3766.05 | $9917.62 |
| 61623 | HCPCS | facility | Endovasc tempory vessel occl | $7671.18 | $13835.1 | $-6163.92 | 0.55 | 11 | 1 | n/a | n/a | $6445.19 | $13835.1 |
| 61626 | HCPCS | facility | Transcath occlusion non-cns | $7671.18 | $13835.1 | $-6163.92 | 0.55 | 11 | 1 | n/a | n/a | $6445.19 | $13835.1 |
| 53445 | HCPCS | facility | Insert uro/ves nck sphincter | $18662.34 | $24839.17 | $-6176.83 | 0.75 | 11 | 1 | n/a | n/a | $8134.72 | $33588.83 |
| 53447 | HCPCS | facility | Remove/replace ur sphincter | $18662.34 | $24839.17 | $-6176.83 | 0.75 | 11 | 1 | n/a | n/a | $8134.72 | $33588.83 |
| 54401 | HCPCS | facility | Insert self-contd prosthesis | $18662.34 | $24839.17 | $-6176.83 | 0.75 | 11 | 1 | n/a | n/a | $8134.72 | $33588.83 |
| 54405 | HCPCS | facility | Insert multi-comp penis pros | $18662.34 | $24839.17 | $-6176.83 | 0.75 | 11 | 1 | n/a | n/a | $8134.72 | $33588.83 |
| 54410 | HCPCS | facility | Remove/replace penis prosth | $18662.34 | $24839.17 | $-6176.83 | 0.75 | 11 | 1 | n/a | n/a | $8134.72 | $33588.83 |
| 54416 | HCPCS | facility | Remv/repl penis contain pros | $18662.34 | $24839.17 | $-6176.83 | 0.75 | 11 | 1 | n/a | n/a | $8134.72 | $33588.83 |
| 58541 | HCPCS | facility | Lsh uterus 250 g or less | $6534.54 | $12739.3 | $-6204.76 | 0.51 | 11 | 1 | n/a | n/a | $5121.39 | $12739.3 |
| 62230 | HCPCS | facility | Replace/revise brain shunt | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $3251.09 | $10517.39 |
| 62350 | HCPCS | facility | HC IMPLANT/REVISE/REPOS EPI CATH, L/T MED ADMIN | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | $12470.0 | $8729.0 | $3251.09 | $10517.39 |
| 64840 | HCPCS | facility | Repair of leg nerve | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64856 | HCPCS | facility | Repair/transpose nerve | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64885 | HCPCS | facility | Nerve graft head/neck <=4 cm | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64886 | HCPCS | facility | Nerve graft head/neck >4 cm | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64890 | HCPCS | facility | Nerve graft hand/foot <=4 cm | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64891 | HCPCS | facility | Nerve graft hand/foot >4 cm | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64892 | HCPCS | facility | Nerve graft arm/leg <4 cm | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64905 | HCPCS | facility | Nerve pedicle transfer | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64910 | HCPCS | facility | Nerve repair w/allograft | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 64911 | HCPCS | facility | Neurorraphy w/vein autograft | $4303.61 | $10517.39 | $-6213.78 | 0.41 | 11 | 1 | n/a | n/a | $2481.58 | $10517.39 |
| 37242 | HCPCS | facility | HC VASC EMBOLIZE/OCCLUDE ARTERY | $15704.605 | $21969.5 | $-6264.895 | 0.71 | 10 | 1 | $30329.0 | $21230.3 | $7671.18 | $21969.5 |
| 0442T | HCPCS | facility | Abltj perc plex/trncl nrv | $4150.11 | $10517.39 | $-6367.28 | 0.39 | 5 | 1 | n/a | n/a | $4150.11 | $10517.39 |
| 27380 | HCPCS | facility | Repair of kneecap tendon | $2306.77 | $8696.19 | $-6389.42 | 0.27 | 11 | 1 | n/a | n/a | $1727.73 | $8696.19 |
| C9764 | HCPCS | facility | HC REVASC INTRAVASCULAR LITHOTRIPSY | $7419.99 | $13835.1 | $-6415.11 | 0.54 | 10 | 1 | $24587.0 | $17210.9 | $4956.84 | $13835.1 |
| 22532 | HCPCS | facility | Lat thorax spine fusion | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 6 | 1 | n/a | n/a | $8531.64 | $15386.48 |
| 22548 | HCPCS | facility | Neck spine fusion | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 7 | 1 | n/a | n/a | $3372.61 | $15386.48 |
| 22554 | HCPCS | facility | Neck spine fusion | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $3758.59 | $15386.48 |
| 22590 | HCPCS | facility | Spine & skull spinal fusion | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 7 | 1 | n/a | n/a | $2729.67 | $15386.48 |
| 22595 | HCPCS | facility | Neck spinal fusion | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 7 | 1 | n/a | n/a | $2606.07 | $15386.48 |
| 23485 | HCPCS | facility | Revision of collar bone | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 23802 | HCPCS | facility | Fusion of shoulder joint | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 24362 | HCPCS | facility | Reconstruct elbow joint | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $4450.11 | $15386.48 |
| 24365 | HCPCS | facility | Reconstruct head of radius | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $2868.01 | $15386.48 |
| 24587 | HCPCS | facility | Treat elbow fracture | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 24802 | HCPCS | facility | Fusion/graft of elbow joint | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 25810 | HCPCS | facility | Fusion/graft of wrist joint | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 28737 | HCPCS | facility | Revision of foot bones | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $4327.81 | $15386.48 |
| 29867 | HCPCS | facility | Allgrft implnt knee w/scope | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $3880.22 | $15386.48 |
| 29907 | HCPCS | facility | Subtalar arthro w/fusion | $8915.56 | $15386.48 | $-6470.92 | 0.58 | 11 | 1 | n/a | n/a | $3880.22 | $15386.48 |
| 64575 | HCPCS | facility | Implant neuroelectrodes | $6792.04 | $13353.93 | $-6561.89 | 0.51 | 11 | 1 | n/a | n/a | $1727.73 | $21392.71 |
| 31634 | HCPCS | facility | Bronch w/balloon occlusion | $1805.48 | $8457.99 | $-6652.51 | 0.21 | 11 | 1 | n/a | n/a | $1572.2 | $8457.99 |
| 51860 | HCPCS | facility | Repair of bladder wound | $4597.72 | $11345.06 | $-6747.34 | 0.41 | 11 | 1 | n/a | n/a | $1908.86 | $11345.06 |
| 54316 | HCPCS | facility | Reconstruction of urethra | $4597.72 | $11345.06 | $-6747.34 | 0.41 | 11 | 1 | n/a | n/a | $2649.31 | $11345.06 |
| 54344 | HCPCS | facility | Secondary urethral surgery | $4597.72 | $11345.06 | $-6747.34 | 0.41 | 11 | 1 | n/a | n/a | $2649.31 | $11345.06 |
| 27269 | HCPCS | facility | Optx thigh fx | $1805.48 | $8696.19 | $-6890.71 | 0.21 | 6 | 1 | n/a | n/a | $1727.73 | $8696.19 |
| 0587T | HCPCS | facility | Perq impltj/rplcmt isdns ptn | $624.98 | $7637.7 | $-7012.72 | 0.08 | 5 | 1 | n/a | n/a | $624.98 | $7637.7 |
| 54112 | HCPCS | facility | Treat penis lesion graft | $4303.61 | $11345.06 | $-7041.45 | 0.38 | 11 | 1 | n/a | n/a | $2775.49 | $11345.06 |
| 55882 | HCPCS | facility | Ablt trurl prst8 tis trnsdcr | $8445.07 | $15811.66 | $-7366.59 | 0.53 | 3 | 1 | n/a | n/a | $8445.07 | $15811.66 |
| 32608 | HCPCS | facility | Thoracoscopy w/bx nodule | $5255.62 | $12739.3 | $-7483.68 | 0.41 | 11 | 1 | n/a | n/a | $2564.75 | $12739.3 |
| 47554 | HCPCS | facility | Biliary endoscopy thru skin | $5255.62 | $12739.3 | $-7483.68 | 0.41 | 11 | 1 | n/a | n/a | $2027.76 | $12739.3 |
| 47556 | HCPCS | facility | Biliary endoscopy thru skin | $5255.62 | $12739.3 | $-7483.68 | 0.41 | 11 | 1 | n/a | n/a | $4046.61 | $12739.3 |
| 47564 | HCPCS | facility | Laparo cholecystectomy/explr | $5255.62 | $12739.3 | $-7483.68 | 0.41 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 50541 | HCPCS | facility | Laparo ablate renal cyst | $5255.62 | $12739.3 | $-7483.68 | 0.41 | 11 | 1 | n/a | n/a | $2730.07 | $12739.3 |
| 50947 | HCPCS | facility | Laparo New Ureter/Bladder | $5255.62 | $12739.3 | $-7483.68 | 0.41 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 58673 | HCPCS | facility | Laparoscopy salpingostomy | $5255.62 | $12739.3 | $-7483.68 | 0.41 | 11 | 1 | n/a | n/a | $3487.15 | $12739.3 |
| 43770 | HCPCS | facility | Lap place gastr adj device | $5121.39 | $12739.3 | $-7617.91 | 0.40 | 11 | 1 | n/a | n/a | $4118.29 | $12739.3 |
| 0516T | HCPCS | facility | Insj wcs lv eltrd only | $4812.67 | $12526.17 | $-7713.5 | 0.38 | 3 | 1 | n/a | n/a | $4812.67 | $12526.17 |
| 0517T | HCPCS | facility | Insj wcs lv pg compnt | $4812.67 | $12526.17 | $-7713.5 | 0.38 | 3 | 1 | n/a | n/a | $4812.67 | $12526.17 |
| 37241 | HCPCS | facility | HC VASC EMBOLIZE/OCCLUDE VENOUS | $5987.395 | $13835.1 | $-7847.705 | 0.43 | 10 | 1 | $30329.0 | $21230.3 | $4118.29 | $13835.1 |
| 0582T | HCPCS | facility | Trurl abltj mal prst8 tiss | $7825.08 | $15811.66 | $-7986.58 | 0.49 | 3 | 1 | n/a | n/a | $7825.08 | $15811.66 |
| C9758 | HCPCS | facility | Interatrial shunt IDE | $12500.5 | $20528.79 | $-8028.29 | 0.61 | 3 | 1 | n/a | n/a | $12500.5 | $20528.79 |
| 64907 | HCPCS | facility | Nerve pedicle transfer | $2481.58 | $10517.39 | $-8035.81 | 0.24 | 11 | 1 | n/a | n/a | $1727.73 | $10517.39 |
| 33233 | HCPCS | facility | HC REMOVE PM GENERATOR ONLY | $1805.48 | $9917.62 | $-8112.14 | 0.18 | 11 | 1 | $12880.0 | $9016.0 | $1683.13 | $9917.62 |
| 0913T | HCPCS | facility | Prq tcat ther rx ntrac balo1 | $5701.52 | $13835.1 | $-8133.58 | 0.41 | 3 | 1 | n/a | n/a | $5701.52 | $13835.1 |
| 53440 | HCPCS | facility | Male sling procedure | $7635.32 | $15811.66 | $-8176.34 | 0.48 | 11 | 1 | n/a | n/a | $4118.29 | $15811.66 |
| 32604 | HCPCS | facility | Thoracoscopy wbx sac | $4303.61 | $12739.3 | $-8435.69 | 0.34 | 11 | 1 | n/a | n/a | $2564.75 | $12739.3 |
| 65770 | HCPCS | facility | Revise cornea with implant | $8915.56 | $17384.8 | $-8469.24 | 0.51 | 11 | 1 | n/a | n/a | $8531.64 | $17384.8 |
| 37187 | HCPCS | facility | HC VENOUS MECH THROMBECTOMY | $5350.17 | $13835.1 | $-8484.93 | 0.39 | 11 | 1 | $12274.0 | $8591.8 | $3100.23 | $13835.1 |
| 20692 | HCPCS | facility | Apply bone fixation device | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $2306.77 | $15386.48 |
| 22318 | HCPCS | facility | Treat odontoid fx w/o graft | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 22319 | HCPCS | facility | Treat odontoid fx w/graft | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 22325 | HCPCS | facility | Treat spine fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 22326 | HCPCS | facility | Treat neck spine fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 22327 | HCPCS | facility | Treat thorax spine fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 23491 | HCPCS | facility | Reinforce shoulder bones | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 23615 | HCPCS | facility | Treat humerus fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 23680 | HCPCS | facility | Treat dislocation/fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $3763.94 | $15386.48 |
| 24346 | HCPCS | facility | Reconstruct elbow med ligmnt | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $4605.66 | $15386.48 |
| 24410 | HCPCS | facility | Revision of humerus | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $3437.59 | $15386.48 |
| 24430 | HCPCS | facility | Repair of humerus | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 24515 | HCPCS | facility | Treat humerus fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 24516 | HCPCS | facility | Treat humerus fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 24545 | HCPCS | facility | Treat humerus fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 24546 | HCPCS | facility | Treat humerus fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $17613.59 |
| 24575 | HCPCS | facility | Treat humerus fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 24579 | HCPCS | facility | Treat humerus fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 24586 | HCPCS | facility | Treat elbow fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 24666 | HCPCS | facility | Treat radius fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 24900 | HCPCS | facility | Amputation of upper arm | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 24920 | HCPCS | facility | Amputation of upper arm | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 24931 | HCPCS | facility | Amputate upper arm & implant | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 24940 | HCPCS | facility | Revision of upper arm | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 25365 | HCPCS | facility | Revise radius & ulna | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $4605.66 | $15386.48 |
| 25391 | HCPCS | facility | Lengthen radius or ulna | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $4605.66 | $15386.48 |
| 25491 | HCPCS | facility | Reinforce ulna | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $3437.59 | $15386.48 |
| 27284 | HCPCS | facility | Fusion of hip joint | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 7 | 1 | n/a | n/a | $2721.24 | $15386.48 |
| 27286 | HCPCS | facility | Fusion of hip joint | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 27356 | HCPCS | facility | Remove femur lesion/graft | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $2306.77 | $15386.48 |
| 27429 | HCPCS | facility | Reconstruction knee | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 27513 | HCPCS | facility | Treatment of thigh fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 6 | 1 | n/a | n/a | $6445.19 | $15386.48 |
| 27580 | HCPCS | facility | Fusion of knee | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 7 | 1 | n/a | n/a | $2475.12 | $15386.48 |
| 27712 | HCPCS | facility | Realignment of lower leg | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 7 | 1 | n/a | n/a | $1885.35 | $15386.48 |
| 27758 | HCPCS | facility | Treatment of tibia fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $3763.94 | $15386.48 |
| 27759 | HCPCS | facility | Treatment of tibia fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 27827 | HCPCS | facility | Treat lower leg fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 27828 | HCPCS | facility | Treat lower leg fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5040.3 | $15386.48 |
| 27870 | HCPCS | facility | Fusion of ankle joint open | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 27871 | HCPCS | facility | Fusion of tibiofibular joint | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 28320 | HCPCS | facility | Repair of foot bones | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $4327.81 | $15386.48 |
| 28420 | HCPCS | facility | Treat/graft heel fracture | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $3763.94 | $15386.48 |
| 28725 | HCPCS | facility | Fusion of foot bones | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $4327.81 | $15386.48 |
| 28730 | HCPCS | facility | Fusion of foot bones | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $4327.81 | $15386.48 |
| 28735 | HCPCS | facility | Fusion of foot bones | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $4327.81 | $15386.48 |
| 29856 | HCPCS | facility | Tibial arthroscopy/surgery | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $3880.22 | $15386.48 |
| 29889 | HCPCS | facility | Knee arthroscopy/surgery | $6735.22 | $15386.48 | $-8651.26 | 0.44 | 11 | 1 | n/a | n/a | $5862.48 | $15386.48 |
| 22849 | HCPCS | facility | Reinsert spinal fixation | $6590.205 | $15386.48 | $-8796.275 | 0.43 | 8 | 1 | n/a | n/a | $1368.83 | $15386.48 |
| 27514 | HCPCS | facility | Treatment of thigh fracture | $6590.205 | $15386.48 | $-8796.275 | 0.43 | 8 | 1 | n/a | n/a | $1028.67 | $15386.48 |
| 27715 | HCPCS | facility | Revision of lower leg | $6590.205 | $15386.48 | $-8796.275 | 0.43 | 8 | 1 | n/a | n/a | $1140.44 | $15386.48 |
| 28297 | HCPCS | facility | Correction hallux valgus | $6517.81 | $15386.48 | $-8868.67 | 0.42 | 11 | 1 | n/a | n/a | $2455.43 | $15386.48 |
| 63664 | HCPCS | facility | Revise spine eltrd plate | $4399.77 | $13353.93 | $-8954.16 | 0.33 | 11 | 1 | n/a | n/a | $1727.73 | $21392.71 |
| 64553 | HCPCS | facility | Implant neuroelectrodes | $4399.77 | $13353.93 | $-8954.16 | 0.33 | 11 | 1 | n/a | n/a | $1727.73 | $13353.93 |
| 64569 | HCPCS | facility | Revise/repl vagus n eltrd | $4399.77 | $13353.93 | $-8954.16 | 0.33 | 11 | 1 | n/a | n/a | $4118.29 | $13353.93 |
| 53449 | HCPCS | facility | Repair uro sphincter | $2373.22 | $11345.06 | $-8971.84 | 0.21 | 11 | 1 | n/a | n/a | $1727.73 | $11345.06 |
| 93653 | HCPCS | facility | Ep & ablate supravent arrhyt | $21972.01 | $31324.85 | $-9352.84 | 0.70 | 11 | 1 | $37053.0 | $25937.1 | $11145.72 | $33588.83 |
| 93654 | HCPCS | facility | Ep & ablate ventric tachy | $21972.01 | $31324.85 | $-9352.84 | 0.70 | 11 | 1 | $37053.0 | $25937.1 | $11145.72 | $33588.83 |
| 93656 | HCPCS | facility | Tx atrial fib pulm vein isol | $21972.01 | $31324.85 | $-9352.84 | 0.70 | 11 | 1 | n/a | n/a | $11145.72 | $33588.83 |
| 0519T | HCPCS | facility | Rmvl & rplcmt pg compnt wcs | $3130.53 | $12526.17 | $-9395.64 | 0.25 | 3 | 1 | n/a | n/a | $3130.53 | $12526.17 |
| 50557 | HCPCS | facility | Kidney endoscopy & treatment | $1908.86 | $11345.06 | $-9436.2 | 0.17 | 11 | 1 | n/a | n/a | $1727.73 | $11345.06 |
| 50555 | HCPCS | facility | Kidney endoscopy & biopsy | $1805.48 | $11345.06 | $-9539.58 | 0.16 | 11 | 1 | n/a | n/a | $509.76 | $11345.06 |
| 50562 | HCPCS | facility | Renal scope w/tumor resect | $1805.48 | $11345.06 | $-9539.58 | 0.16 | 11 | 1 | n/a | n/a | $509.76 | $11345.06 |
| 50576 | HCPCS | facility | Kidney endoscopy & treatment | $1805.48 | $11345.06 | $-9539.58 | 0.16 | 11 | 1 | n/a | n/a | $1131.27 | $11345.06 |
| 0816T | HCPCS | facility | Opn insj/rplcmt ins ptn subq | $13561.94 | $23250.02 | $-9688.08 | 0.58 | 3 | 1 | n/a | n/a | $13561.94 | $23250.02 |
| 0817T | HCPCS | facility | Opn insj/rplcmt ins ptn subf | $13561.94 | $23250.02 | $-9688.08 | 0.58 | 3 | 1 | n/a | n/a | $13561.94 | $23250.02 |
| 0686T | HCPCS | facility | Histotripsy mal hepatcel tis | $31350.69 | $41056.99 | $-9706.3 | 0.76 | 7 | 1 | n/a | n/a | $12500.5 | $41056.99 |
| 67027 | HCPCS | facility | Implant eye drug system | $6735.22 | $16721.88 | $-9986.66 | 0.40 | 11 | 1 | n/a | n/a | $2913.76 | $18564.76 |
| 43210 | HCPCS | facility | Egd esophagogastrc fndoplsty | $2709.525 | $12739.3 | $-10029.775 | 0.21 | 10 | 1 | n/a | n/a | $1727.73 | $12739.3 |
| 61888 | HCPCS | facility | Revise/remove neuroreceiver | $2598.26 | $13353.93 | $-10755.67 | 0.19 | 11 | 1 | n/a | n/a | $1727.73 | $13353.93 |
| 27091 | HCPCS | facility | Removal of hip prosthesis | $4303.61 | $15386.48 | $-11082.87 | 0.28 | 6 | 1 | n/a | n/a | $4118.29 | $15386.48 |
| 27488 | HCPCS | facility | Removal of knee prosthesis | $4303.61 | $15386.48 | $-11082.87 | 0.28 | 6 | 1 | n/a | n/a | $4118.29 | $15386.48 |
| 27709 | HCPCS | facility | Incision of tibia & fibula | $4303.61 | $15386.48 | $-11082.87 | 0.28 | 11 | 1 | n/a | n/a | $2306.77 | $15386.48 |
| 22633 | HCPCS | facility | Lumbar spine fusion combined | $21267.94 | $32518.7 | $-11250.76 | 0.65 | 7 | 1 | n/a | n/a | $3184.1 | $32518.7 |
| 22856 | HCPCS | facility | Cerv artific diskectomy | $9619.86 | $21013.36 | $-11393.5 | 0.46 | 11 | 1 | n/a | n/a | $3758.59 | $21013.36 |
| 22861 | HCPCS | facility | Revise cerv artific disc | $9619.86 | $21013.36 | $-11393.5 | 0.46 | 6 | 1 | n/a | n/a | $9205.61 | $21013.36 |
| 24361 | HCPCS | facility | Reconstruct elbow joint | $9601.88 | $21013.36 | $-11411.48 | 0.46 | 11 | 1 | n/a | n/a | $8531.64 | $21013.36 |
| 24363 | HCPCS | facility | Replace elbow joint | $9601.88 | $21013.36 | $-11411.48 | 0.46 | 11 | 1 | n/a | n/a | $8531.64 | $21013.36 |
| 25442 | HCPCS | facility | Reconstruct wrist joint | $9601.88 | $21013.36 | $-11411.48 | 0.46 | 11 | 1 | n/a | n/a | $8531.64 | $21013.36 |
| 25446 | HCPCS | facility | Wrist replacement | $9601.88 | $21013.36 | $-11411.48 | 0.46 | 11 | 1 | n/a | n/a | $8531.64 | $21013.36 |
| 0916T | HCPCS | facility | Insj perm ccm-d sys pg only | $14590.02 | $26657.76 | $-12067.74 | 0.55 | 3 | 1 | n/a | n/a | $14590.02 | $26657.76 |
| 0923T | HCPCS | facility | Rmvl&rplcmt perm ccm-d pg | $14590.02 | $26657.76 | $-12067.74 | 0.55 | 3 | 1 | n/a | n/a | $14590.02 | $26657.76 |
| 22533 | HCPCS | facility | Lat lumbar spine fusion | $8915.56 | $21013.36 | $-12097.8 | 0.42 | 7 | 1 | n/a | n/a | $2853.19 | $21013.36 |
| 22610 | HCPCS | facility | Thorax spine fusion | $8915.56 | $21013.36 | $-12097.8 | 0.42 | 7 | 1 | n/a | n/a | $2189.42 | $21013.36 |
| 22612 | HCPCS | facility | Lumbar spine fusion | $8915.56 | $21013.36 | $-12097.8 | 0.42 | 11 | 1 | n/a | n/a | $3758.59 | $21013.36 |
| 22556 | HCPCS | facility | Thorax spine fusion | $8723.6 | $21013.36 | $-12289.76 | 0.42 | 8 | 1 | n/a | n/a | $1751.26 | $21013.36 |
| 22600 | HCPCS | facility | Neck spine fusion | $8723.6 | $21013.36 | $-12289.76 | 0.42 | 8 | 1 | n/a | n/a | $1355.91 | $21013.36 |
| 0515T | HCPCS | facility | Insj wcs lv compl sys | $14297.7 | $26657.76 | $-12360.06 | 0.54 | 3 | 1 | n/a | n/a | $14297.7 | $26657.76 |
| 0409T | HCPCS | facility | Insj/rplc car modulj pls gn | $14293.96 | $26657.76 | $-12363.8 | 0.54 | 5 | 1 | n/a | n/a | $14293.96 | $26657.76 |
| 0414T | HCPCS | facility | Rmvl & rpl car modulj pls gn | $14293.96 | $26657.76 | $-12363.8 | 0.54 | 5 | 1 | n/a | n/a | $14293.96 | $26657.76 |
| 27702 | HCPCS | facility | Reconstruct ankle joint | $19292.34 | $32518.7 | $-13226.36 | 0.59 | 7 | 1 | n/a | n/a | $9729.48 | $32518.7 |
| 61624 | HCPCS | facility | Transcath occlusion cns | $8723.6 | $21969.5 | $-13245.9 | 0.40 | 8 | 1 | n/a | n/a | $1157.1 | $21969.5 |
| 23616 | HCPCS | facility | Treat humerus fracture | $6735.22 | $21013.36 | $-14278.14 | 0.32 | 11 | 1 | n/a | n/a | $5040.3 | $21013.36 |
| 27280 | HCPCS | facility | Fusion of sacroiliac joint | $6735.22 | $21013.36 | $-14278.14 | 0.32 | 7 | 1 | n/a | n/a | $2324.38 | $21013.36 |
| 28705 | HCPCS | facility | Fusion of foot bones | $6735.22 | $21013.36 | $-14278.14 | 0.32 | 11 | 1 | n/a | n/a | $4327.81 | $21013.36 |
| C9760 | HCPCS | facility | Non-blind interatrial shunt | $17875.33 | $32259.19 | $-14383.86 | 0.55 | 3 | 1 | n/a | n/a | $17875.33 | $32259.19 |
| 62360 | HCPCS | facility | Insert spine infusion device | $6735.22 | $21600.64 | $-14865.42 | 0.31 | 11 | 1 | n/a | n/a | $3251.09 | $21600.64 |
| 37182 | HCPCS | facility | HC INSERTION TRANSVENOUS INTRAHEPATIC PERTOSYSTEMIC SHUNT (TIPS) | $6735.22 | $21969.5 | $-15234.28 | 0.31 | 7 | 1 | $1902.0 | $1331.4 | $1383.04 | $21969.5 |
| 61885 | HCPCS | facility | Insrt/redo neurostim 1 array | $21392.71 | $36981.33 | $-15588.62 | 0.58 | 11 | 1 | n/a | n/a | $10656.57 | $36981.33 |
| 37184 | HCPCS | facility | HC 1ST MECH THROMB,INITIAL VESSEL | $5350.17 | $21969.5 | $-16619.33 | 0.24 | 11 | 1 | $13598.0 | $9518.6 | $3100.23 | $21969.5 |
| 0525T | HCPCS | facility | Insj/rplcmt compl iims | $6421.57 | $23084.13 | $-16662.56 | 0.28 | 3 | 1 | n/a | n/a | $6421.57 | $23084.13 |
| 20982 | HCPCS | facility | Ablate bone tumor(s) perq | $4303.61 | $21013.36 | $-16709.75 | 0.20 | 11 | 1 | $10438.0 | $7306.6 | $3437.59 | $21013.36 |
| 0915T | HCPCS | facility | Insj perm ccm-d sys pg&eltrd | $20840.03 | $37617.9 | $-16777.87 | 0.55 | 3 | 1 | n/a | n/a | $20840.03 | $37617.9 |
| 53444 | HCPCS | facility | Insert tandem cuff | $7635.32 | $24839.17 | $-17203.85 | 0.31 | 11 | 1 | n/a | n/a | $4118.29 | $24839.17 |
| 0620T | HCPCS | facility | Evasc ven artlz tibl/prnl vn | $32865.635 | $52787.39 | $-19921.755 | 0.62 | 8 | 1 | n/a | n/a | $16064.0 | $52787.39 |
| 64568 | HCPCS | facility | Inc for vagus n elect impl | $32142.44 | $52787.39 | $-20644.95 | 0.61 | 11 | 1 | n/a | n/a | $16677.91 | $52787.39 |
| 22630 | HCPCS | facility | Lumbar spine fusion | $9619.86 | $32518.7 | $-22898.84 | 0.30 | 7 | 1 | n/a | n/a | $2716.65 | $32518.7 |
| 0571T | HCPCS | facility | Insj/rplcmt icds ss eltrd | $14632.83 | $37617.9 | $-22985.07 | 0.39 | 3 | 1 | n/a | n/a | $14632.83 | $37617.9 |
| 0408T | HCPCS | facility | Insj/rplc cardiac modulj sys | $14293.96 | $37617.9 | $-23323.94 | 0.38 | 5 | 1 | n/a | n/a | $14293.96 | $37617.9 |
| 61891 | HCPCS | facility | Rev/rplcmt sk-mnt crnl nstm | $13561.94 | $36981.33 | $-23419.39 | 0.37 | 5 | 1 | n/a | n/a | $13561.94 | $36981.33 |
| 21243 | HCPCS | facility | Reconstruction of jaw joint | $8915.56 | $32518.7 | $-23603.14 | 0.27 | 11 | 1 | n/a | n/a | $3278.89 | $32518.7 |
| 22558 | HCPCS | facility | Lumbar spine fusion | $8723.6 | $32518.7 | $-23795.1 | 0.27 | 8 | 1 | n/a | n/a | $1621.87 | $32518.7 |
| 33287 | HCPCS | facility | Rmv&rplcmt phrnc nrv stim pg | $11567.31 | $36981.33 | $-25414.02 | 0.31 | 3 | 1 | n/a | n/a | $11567.31 | $36981.33 |
| 20696 | HCPCS | facility | Comp multiplane ext fixation | $6735.22 | $32518.7 | $-25783.48 | 0.21 | 10 | 1 | n/a | n/a | $2306.77 | $32518.7 |
| Q2053 | HCPCS | facility | Brexucabtagene car pos t | $454985.2 | $489304.61 | $-34319.41 | 0.93 | 10 | 1 | n/a | n/a | $438335.02 | $489720.0 |
| Q2055 | HCPCS | facility | Idecabtagene vicleucel car | $515021.06 | $557317.93 | $-42296.87 | 0.92 | 10 | 1 | n/a | n/a | $460855.99 | $557317.93 |
| Q2041 | HCPCS | facility | Axicabtagene ciloleucel car+ | $489296.435 | $533230.17 | $-43933.735 | 0.92 | 10 | 1 | n/a | n/a | $465598.41 | $533230.17 |
| Q2056 | HCPCS | facility | Ciltacabtagene car-pos t | $517405.215 | $565868.94 | $-48463.725 | 0.91 | 10 | 1 | n/a | n/a | $496383.78 | $565868.94 |
| J1413 | HCPCS | facility | Inj delandistrogene mox rokl | $3264000.0 | $3316462.59 | $-52462.59 | 0.98 | 3 | 1 | n/a | n/a | $3264000.0 | $3316462.59 |
| Q2054 | HCPCS | facility | Lisocabtagene mara car pos t | $506558.145 | $562538.19 | $-55980.045 | 0.90 | 10 | 1 | n/a | n/a | $450749.02 | $562538.18 |
| Q2042 | HCPCS | facility | Tisagenlecleucel car-pos t | $526322.71 | $591726.2 | $-65403.49 | 0.89 | 10 | 1 | n/a | n/a | $470376.98 | $591726.2 |
| 38240 | HCPCS | facility | Transplt allo hct/donor | $8915.56 | $75383.68 | $-66468.12 | 0.12 | 11 | 1 | n/a | n/a | $2888.7 | $75383.68 |
| J3394 | HCPCS | facility | Inj, lovotibeglogene autotem | $3162000.0 | $3248445.72 | $-86445.72 | 0.97 | 3 | 1 | n/a | n/a | $3162000.0 | $3248445.72 |
| J3392 | HCPCS | facility | Inj, exagamglogene autotem | $2244000.0 | $2332000.0 | $-88000.0 | 0.96 | 3 | 1 | n/a | n/a | $2244000.0 | $2332000.0 |
| J3393 | HCPCS | facility | Inj, betibeglogene autotemce | $2856000.0 | $2945740.0 | $-89740.0 | 0.97 | 3 | 1 | n/a | n/a | $2856000.0 | $2945740.0 |
| J1411 | HCPCS | facility | Inj, hemgenix, per tx dose | $3570000.0 | $3685266.67 | $-115266.67 | 0.97 | 3 | 1 | n/a | n/a | $3570000.0 | $3685266.67 |
| J3399 | HCPCS | facility | Inj onase abepar-xioi treat | $2303803.82 | $2455110.6 | $-151306.78 | 0.94 | 7 | 1 | n/a | n/a | $2146250.0 | $2455110.6 |
| J3391 | HCPCS | facility | Inj, atidarsagene autotemcel | $4335000.0 | $4505000.0 | $-170000.0 | 0.96 | 3 | 1 | n/a | n/a | $4335000.0 | $4505000.0 |

Medicare Managed Care Plan is a single-plan baseline: no code has MA n>=2 in this file.

## Per-payer spread (dollar rates)

| Payer | Plan | Min | Median | Max | n |
| --- | --- | ---: | ---: | ---: | ---: |
| Aetna | All Commercial Plans | $18.94 | $121.09 | $940.01 | 104 |
| Aetna | Medicare Managed Care Plan | $0.01 | $2472.73 | $4505000.0 | 7945 |
| Bcbs | Anthem Hmo | $0.01 | $398.14 | $174393.03 | 10720 |
| Bcbs | Anthem Ppo | $0.01 | $404.24 | $174393.03 | 10869 |
| Bcbs | Medicare Managed Care Plan | $1928.66 | $14619.86 | $378659.44 | 770 |
| Commonwealth Care Alliance | Medicare Managed Care Plan | $9.8 | $14481.82 | $378659.44 | 782 |
| Evercare | Medicare Managed Care Plan | $1928.66 | $14619.86 | $378659.44 | 770 |
| Fallon | Medicaid Managed Care Plan | $1.46 | $365.525 | $4036.04 | 26 |
| Fallon | Medicare Managed Care Plan | $1928.66 | $14619.86 | $378659.44 | 770 |
| Harvard Pilgrim | Fully Insured All Commercial Plans | $0.01 | $292.3 | $4335000.0 | 9675 |
| Harvard Pilgrim | Passport Ppo | $0.01 | $291.77 | $4335000.0 | 9688 |
| Harvard Pilgrim | Self Insured Aso All Commercial Plans | $0.01 | $292.3 | $4335000.0 | 9675 |
| Mass Health | Medicaid Managed Care Plan | $1.46 | $396.86 | $4036.04 | 25 |
| Scan Health Plan | Medicare Managed Care Plan | $1928.66 | $14619.86 | $378659.44 | 770 |
| Senior Whole Health | Medicare Managed Care Plan | $9.33 | $14481.82 | $378659.44 | 782 |
| Tufts Health | Carelink Ppo | $0.01 | $1140.64 | $2303803.82 | 10912 |
| Tufts Health | Direct Non-Subsidized Hmo | $9.15 | $518.08 | $1052.35 | 7 |
| Tufts Health | Hmo | $0.01 | $1150.04 | $2322920.68 | 10912 |
| Tufts Health | Medicare Managed Care Plan | $1928.66 | $14619.86 | $378659.44 | 770 |
| Tufts Health | Non-Ipa Hmo | $0.01 | $1805.48 | $2322920.68 | 15590 |
| Tufts Health | Ppo | $0.01 | $1140.64 | $2303803.82 | 10912 |
| Unitedhealthcare | All Commercial Plans | $0.01 | $404.24 | $108243.35 | 11006 |
| Unitedhealthcare | Medicare Managed Care Plan | $9.33 | $14481.82 | $378659.44 | 782 |
| Wellcare | Medicare Managed Care Plan | $1928.66 | $14619.86 | $378659.44 | 770 |
| Wellpoint | Unicare All Commercial Plans | $2.17 | $35.09 | $12000.0 | 2041 |
| Wellsense | Aco Medicaid Managed Care Plan | $1.46 | $365.525 | $4036.04 | 26 |
| Wellsense | Medicaid Managed Care Plan | $1.46 | $81.09 | $4036.04 | 18 |
| Wellsense | Medicare Managed Care Plan | $1928.66 | $14619.86 | $378659.44 | 770 |

Medicare Managed Care Plan is a single-plan baseline: no code has MA n>=2 in this file.

Small-n medians (some groups contain one plan) are indicative only.
Percent/algorithm prices are stored as percent_rate/algorithm and never converted into dollar rates.
Excluded non-dollar payer entries: 29340.
Quarantined source items: 0.
