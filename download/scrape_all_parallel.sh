#!/bin/bash
cd /home/z/my-project/download

echo "BATCH starting poems 103-112..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/12/31/4410"}' -o poem_103.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/12/27/2674"}' -o poem_104.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/12/24/6109"}' -o poem_105.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/12/23/3383"}' -o poem_106.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/12/13/2756"}' -o poem_107.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/12/07/6301"}' -o poem_108.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/12/06/4968"}' -o poem_109.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/28/4461"}' -o poem_110.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/21/6028"}' -o poem_111.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/20/2979"}' -o poem_112.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 113-122..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/17/2521"}' -o poem_113.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/15/4412"}' -o poem_114.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/11/6117"}' -o poem_115.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/10/5582"}' -o poem_116.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/09/5644"}' -o poem_117.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/07/5861"}' -o poem_118.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/07/2247"}' -o poem_119.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/06/3130"}' -o poem_120.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/02/3206"}' -o poem_121.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/11/01/3487"}' -o poem_122.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 123-132..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/29/3551"}' -o poem_123.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/26/2803"}' -o poem_124.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/23/2885"}' -o poem_125.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/21/2929"}' -o poem_126.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/20/3672"}' -o poem_127.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/16/2733"}' -o poem_128.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/13/5673"}' -o poem_129.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/12/3127"}' -o poem_130.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/10/3095"}' -o poem_131.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/07/3504"}' -o poem_132.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 133-142..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/10/06/4321"}' -o poem_133.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/24/5335"}' -o poem_134.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/22/3090"}' -o poem_135.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/21/3249"}' -o poem_136.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/19/3095"}' -o poem_137.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/17/3020"}' -o poem_138.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/15/2484"}' -o poem_139.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/14/3754"}' -o poem_140.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/13/3217"}' -o poem_141.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/12/3157"}' -o poem_142.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 143-152..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/11/4104"}' -o poem_143.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/10/5668"}' -o poem_144.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/10/2746"}' -o poem_145.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/09/4272"}' -o poem_146.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/07/3967"}' -o poem_147.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/06/3771"}' -o poem_148.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/06/2021"}' -o poem_149.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/05/3161"}' -o poem_150.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/09/01/4179"}' -o poem_151.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/30/3818"}' -o poem_152.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 153-162..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/29/4568"}' -o poem_153.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/27/3281"}' -o poem_154.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/25/5522"}' -o poem_155.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/23/6077"}' -o poem_156.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/22/5497"}' -o poem_157.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/21/5491"}' -o poem_158.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/19/4742"}' -o poem_159.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/18/4063"}' -o poem_160.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/15/5422"}' -o poem_161.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/14/3999"}' -o poem_162.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 163-172..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/11/6299"}' -o poem_163.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/10/5212"}' -o poem_164.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/09/3924"}' -o poem_165.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/07/3010"}' -o poem_166.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/06/3735"}' -o poem_167.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/04/3530"}' -o poem_168.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/02/5930"}' -o poem_169.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/08/01/6367"}' -o poem_170.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/30/4137"}' -o poem_171.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/28/3820"}' -o poem_172.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 173-182..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/27/5520"}' -o poem_173.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/26/5695"}' -o poem_174.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/24/5206"}' -o poem_175.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/23/5141"}' -o poem_176.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/21/5324"}' -o poem_177.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/20/5795"}' -o poem_178.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/19/5583"}' -o poem_179.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/18/5930"}' -o poem_180.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/17/2755"}' -o poem_181.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/14/4006"}' -o poem_182.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 183-192..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/13/2784"}' -o poem_183.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/12/5312"}' -o poem_184.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/11/3845"}' -o poem_185.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/09/5512"}' -o poem_186.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/08/3536"}' -o poem_187.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/07/3195"}' -o poem_188.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/05/5057"}' -o poem_189.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/04/4666"}' -o poem_190.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/03/5228"}' -o poem_191.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/02/5535"}' -o poem_192.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 193-202..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/07/01/4177"}' -o poem_193.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/30/4321"}' -o poem_194.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/29/5896"}' -o poem_195.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/28/3283"}' -o poem_196.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/27/3413"}' -o poem_197.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/26/4054"}' -o poem_198.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/25/3201"}' -o poem_199.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/24/3379"}' -o poem_200.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/23/6646"}' -o poem_201.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/22/6508"}' -o poem_202.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 203-212..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/22/2140"}' -o poem_203.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/21/2722"}' -o poem_204.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/20/4035"}' -o poem_205.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/19/2672"}' -o poem_206.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/18/4625"}' -o poem_207.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/17/4846"}' -o poem_208.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/16/3298"}' -o poem_209.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/15/3112"}' -o poem_210.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/14/3372"}' -o poem_211.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/13/2283"}' -o poem_212.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 213-222..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/09/3928"}' -o poem_213.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/08/4301"}' -o poem_214.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/08/3228"}' -o poem_215.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/07/3019"}' -o poem_216.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/06/2468"}' -o poem_217.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/04/3611"}' -o poem_218.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/03/2638"}' -o poem_219.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/06/01/2472"}' -o poem_220.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/31/5365"}' -o poem_221.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/30/3158"}' -o poem_222.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 223-232..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/28/6827"}' -o poem_223.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/28/2261"}' -o poem_224.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/26/4441"}' -o poem_225.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/26/2900"}' -o poem_226.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/24/6244"}' -o poem_227.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/24/2703"}' -o poem_228.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/23/2832"}' -o poem_229.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/20/2944"}' -o poem_230.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/18/4351"}' -o poem_231.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/17/5531"}' -o poem_232.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 233-242..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/16/5759"}' -o poem_233.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/15/2908"}' -o poem_234.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/14/3134"}' -o poem_235.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/13/2812"}' -o poem_236.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/12/4180"}' -o poem_237.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/11/4257"}' -o poem_238.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/10/2166"}' -o poem_239.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/09/5510"}' -o poem_240.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/09/3187"}' -o poem_241.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/08/2789"}' -o poem_242.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 243-252..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/07/2844"}' -o poem_243.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/06/5084"}' -o poem_244.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/06/2057"}' -o poem_245.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/05/3010"}' -o poem_246.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/04/6127"}' -o poem_247.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/04/3404"}' -o poem_248.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/03/3707"}' -o poem_249.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/02/2633"}' -o poem_250.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/01/5787"}' -o poem_251.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/05/01/3039"}' -o poem_252.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 253-262..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/30/3180"}' -o poem_253.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/29/6011"}' -o poem_254.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/29/3428"}' -o poem_255.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/28/2298"}' -o poem_256.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/27/3257"}' -o poem_257.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/26/2723"}' -o poem_258.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/25/2940"}' -o poem_259.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/25/2395"}' -o poem_260.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/24/2194"}' -o poem_261.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/23/4101"}' -o poem_262.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 263-272..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/23/2768"}' -o poem_263.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/22/2627"}' -o poem_264.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/21/3298"}' -o poem_265.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/20/2531"}' -o poem_266.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/19/5504"}' -o poem_267.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/19/2294"}' -o poem_268.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/18/2208"}' -o poem_269.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/17/6004"}' -o poem_270.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/17/2469"}' -o poem_271.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/16/2217"}' -o poem_272.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 273-282..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/15/3920"}' -o poem_273.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/15/2560"}' -o poem_274.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/14/5200"}' -o poem_275.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/14/4671"}' -o poem_276.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/14/1611"}' -o poem_277.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/5543"}' -o poem_278.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/5497"}' -o poem_279.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/3198"}' -o poem_280.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/3125"}' -o poem_281.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/3014"}' -o poem_282.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "BATCH starting poems 283-289..."
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/2978"}' -o poem_283.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/2944"}' -o poem_284.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/2890"}' -o poem_285.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/2120"}' -o poem_286.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/2090"}' -o poem_287.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/1975"}' -o poem_288.json >/dev/null 2>&1 &
z-ai function -n page_reader -a '{"url": "https://stihi.ru/2023/04/13/1949"}' -o poem_289.json >/dev/null 2>&1 &
wait
echo "BATCH done. Files: $(ls poem_*.json | wc -l)"

echo "=== ALL SCRAPING COMPLETE ==="
echo "Total files: $(ls poem_*.json | wc -l)"
