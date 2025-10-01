import React from "react";
import { Trophy } from "lucide-react";

const ChampionsReveal2024: React.FC = () => {
  return (
    <div className="w-full container mx-auto py-24">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-12 h-0.5 bg-gray-900"></div>
          <Trophy className="h-8 w-8 text-gray-900" />
          <div className="w-12 h-0.5 bg-gray-900"></div>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Our Champions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          After intense matches and exceptional performances,
          two teams emerged to carve their names into history.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Boys Champions */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Boys Champions
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                IBEJI YOUTH
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                A legendary season with 13 wins for only 2 losses.
                The Zou team dominated the competition with their exemplary team play.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                <span>Department:</span>
                <span className="font-semibold text-gray-900">Zou</span>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl transform rotate-2 group-hover:rotate-3 transition-transform shadow-lg overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{backgroundImage: "url(/mediaday.jpg)"}}
                  ></div>
                  <div className="absolute inset-0 bg-primary/80"></div>
                </div>
                <div className="relative rounded-3xl p-10 transform -rotate-1 group-hover:rotate-0 transition-transform shadow-xl border border-primary-yellow overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: "url(https://res.cloudinary.com/dy8yihtg1/image/upload/c_fill,w_828,g_auto/f_auto/q_100/v1/iamfoundation/homepage/uv7ztzayeqj63kdeowjx?_a=BAVFB+DW0)"}}
                  ></div>
                  <div className="absolute inset-0 bg-primary-yellow/90"></div>
                  <div className="relative z-10 grid grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-4xl font-bold text-white mb-1">13</div>
                      <div className="text-sm text-white/90 font-medium uppercase tracking-wide">Wins</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-1">2</div>
                      <div className="text-sm text-white/90 font-medium uppercase tracking-wide">Losses</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-1">276</div>
                      <div className="text-sm text-white/90 font-medium uppercase tracking-wide">Points</div>
                    </div>
                  </div>
                  <div className="relative z-10 mt-8 pt-8 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">87%</div>
                      <div className="text-sm text-white/90">Win Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center mb-16">
          <div className="w-24 h-px bg-gray-200"></div>
          <div className="mx-4 w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-24 h-px bg-gray-200"></div>
        </div>

        {/* Girls Champions */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 text-center lg:text-right">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Girls Champions
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                GLETI SCHOLARS
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                An exceptional journey with the best record in the competition.
                14 wins for 2 losses, an impressive demonstration of strength.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                <span>Department:</span>
                <span className="font-semibold text-gray-900">Mono</span>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl transform -rotate-2 group-hover:-rotate-3 transition-transform shadow-lg overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{backgroundImage: "url(https://res.cloudinary.com/dy8yihtg1/image/upload/c_fill,w_828,g_auto/f_auto/q_100/v1/iamfoundation/homepage/uv7ztzayeqj63kdeowjx?_a=BAVFB+DW0)"}}
                  ></div>
                  <div className="absolute inset-0 bg-primary-green/80"></div>
                </div>
                <div className="relative rounded-3xl p-10 transform rotate-1 group-hover:rotate-0 transition-transform shadow-xl border border-primary-yellow overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: "url(/mediaday.jpg)"}}
                  ></div>
                  <div className="absolute inset-0 bg-primary-yellow/90"></div>
                  <div className="relative z-10 grid grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-4xl font-bold text-white mb-1">14</div>
                      <div className="text-sm text-white/90 font-medium uppercase tracking-wide">Wins</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-1">2</div>
                      <div className="text-sm text-white/90 font-medium uppercase tracking-wide">Losses</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-1">265</div>
                      <div className="text-sm text-white/90 font-medium uppercase tracking-wide">Points</div>
                    </div>
                  </div>
                  <div className="relative z-10 mt-8 pt-8 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">88%</div>
                      <div className="text-sm text-white/90">Win Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Records de leurs performances - MASQUÉ */}
      {/* <div className="w-full mt-16 relative bg-fixed bg-cover bg-center bg-no-repeat py-24" style={{backgroundImage: `url(https://res.cloudinary.com/dy8yihtg1/image/upload/c_fill,w_828,g_auto/f_auto/q_100/v1/iamfoundation/homepage/uv7ztzayeqj63kdeowjx?_a=BAVFB+DW0)`}}>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="container mx-auto relative z-10">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Leurs Performances Légendaires
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">14-2</div>
              <div className="text-gray-200 font-medium">Meilleur record</div>
              <div className="text-sm text-gray-300">GLETI SCHOLARS Girls</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">276</div>
              <div className="text-gray-200 font-medium">Points marqués</div>
              <div className="text-sm text-gray-300">IBEJI YOUTH Boys</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">60</div>
              <div className="text-gray-200 font-medium">Match spectaculaire</div>
              <div className="text-sm text-gray-300">
                GLETI SCHOLARS vs YEWA GUARDIANS
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ChampionsReveal2024;