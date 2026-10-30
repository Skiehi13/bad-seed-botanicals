/* Bad Seed Botanicals — interactive pitch deck
   Plain JavaScript, no libraries, no build step. Works on GitHub Pages as-is. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var INK = '#1E1E1E';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var uid = 0;

  /* =====================================================================
     ARTWORK — hand-built SVG characters, injected wherever data-art="..."
     ===================================================================== */

  // A 7-leaflet cannabis leaf drawn around a stem base at (100,120).
  function leafCore(fill, withFace) {
    var leaflets = [
      [-80, 84, 12, 36], [-52, 74, 14, 46], [-26, 66, 15, 54],
      [80, 84, 12, 36], [52, 74, 14, 46], [26, 66, 15, 54], [0, 60, 17, 60]
    ];
    var shapes = leaflets.map(function (l) {
      return '<ellipse cx="100" cy="' + l[1] + '" rx="' + l[2] + '" ry="' + l[3] + '" transform="rotate(' + l[0] + ' 100 120)"/>';
    }).join('');
    var veins = leaflets.map(function (l) {
      return '<path d="M100 116 L100 ' + (120 - l[3] * 1.7) + '" transform="rotate(' + l[0] + ' 100 120)"/>';
    }).join('');
    var face = withFace
      ? '<circle cx="93" cy="74" r="4.5" fill="' + INK + '"/><circle cx="107" cy="74" r="4.5" fill="' + INK + '"/>' +
        '<path d="M92 86 Q100 94 108 86" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
        '<ellipse cx="86" cy="84" rx="4" ry="2.5" fill="#F7A989"/><ellipse cx="114" cy="84" rx="4" ry="2.5" fill="#F7A989"/>'
      : '';
    return '<g stroke="' + INK + '" stroke-width="5" stroke-linejoin="round" fill="' + fill + '">' + shapes + '</g>' +
      '<g stroke="#2F7A2B" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".75">' + veins + '</g>' +
      '<path d="M100 118 L104 190" fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' + face;
  }
  function leafAt(cx, cy, s, rot, fill, face) {
    return '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + rot + ') scale(' + s + ') translate(-100 -120)">' + leafCore(fill || '#5DAE4B', face) + '</g>';
  }
  function star(x, y, s, fill) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path class="spark" d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4 Z" fill="' + (fill || '#F2C94C') + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/></g>';
  }

  var ART = {
    leaf: function () {
      return '<svg viewBox="0 0 200 200" role="img" aria-label="Smiling cannabis leaf">' + leafCore('#5DAE4B', true) + '</svg>';
    },

    // Spritz Happens: amber glass CBD spray bottle with a winking face and a puffing mist
    spritz: function () {
      return '<svg viewBox="0 0 240 300" role="img" aria-label="Spritz Happens spray bottle character">' +
        '<g class="mist" fill="#9ED8E0" stroke="' + INK + '" stroke-width="3"><circle cx="216" cy="52" r="9"/><circle cx="228" cy="36" r="7"/><circle cx="232" cy="64" r="6"/><circle cx="220" cy="78" r="5"/></g>' +
        '<path d="M86 34 Q86 22 98 22 L170 22 Q184 22 184 36 L184 44 L204 44 Q212 44 212 52 Q212 60 204 60 L184 60 L184 64 Q184 72 176 72 L94 72 Q86 72 86 64 Z" fill="#E8553E" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="M100 32 L166 32" stroke="#F7A989" stroke-width="6" stroke-linecap="round"/>' +
        '<circle cx="207" cy="52" r="3" fill="' + INK + '"/>' +
        '<rect x="94" y="72" width="64" height="18" rx="4" fill="#3A3A3A" stroke="' + INK + '" stroke-width="5"/>' +
        '<path d="M106 75 v12 M118 75 v12 M130 75 v12 M142 75 v12" stroke="#777" stroke-width="3"/>' +
        '<rect x="104" y="90" width="44" height="18" fill="#C9772B" stroke="' + INK + '" stroke-width="5"/>' +
        '<path d="M66 140 Q66 108 104 106 L148 106 Q186 108 186 140 L186 266 Q186 290 162 290 L90 290 Q66 290 66 266 Z" fill="#E3963E" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="M70 204 Q126 192 182 204 L182 266 Q182 286 162 286 L90 286 Q70 286 70 266 Z" fill="#B8641F" opacity=".5"/>' +
        '<path d="M80 140 Q80 124 94 119" fill="none" stroke="#FFF1D6" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M79 156 L79 262" stroke="#FFF1D6" stroke-width="7" stroke-linecap="round" opacity=".8"/>' +
        '<rect x="88" y="170" width="78" height="96" rx="10" fill="#FBF6EA" stroke="' + INK + '" stroke-width="4"/>' +
        leafAt(127, 206, 0.17, 0, '#6CC070', false) +
        '<text x="127" y="236" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="22" fill="#B33421">CBD</text>' +
        '<text x="127" y="255" text-anchor="middle" font-family="Patrick Hand, sans-serif" font-size="13" fill="' + INK + '">broad spectrum</text>' +
        '<circle class="blink" cx="108" cy="138" r="6.5" fill="' + INK + '"/>' +
        '<path d="M138 139 q8 -9 16 0" fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>' +
        '<ellipse cx="96" cy="154" rx="8" ry="5" fill="#F7A989"/><ellipse cx="162" cy="154" rx="8" ry="5" fill="#F7A989"/>' +
        '<path d="M116 151 Q128 164 142 151" fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>' +
        '</svg>';
    },

    // Grain Damage: vintage oil tin with a mischievous face, dripping onto a freshly oiled wood block
    grain: function () {
      return '<svg viewBox="0 0 260 290" role="img" aria-label="Grain Damage oil tin character">' +
        '<path d="M16 236 L36 216 L196 216 L176 236 Z" fill="#DDA56A" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="M176 236 L196 216 L196 264 L176 284 Z" fill="#A86F38" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<rect x="16" y="236" width="160" height="48" fill="#C98B4F" stroke="' + INK + '" stroke-width="5"/>' +
        '<g fill="none" stroke="#8B5A2B" stroke-width="3" stroke-linecap="round"><path d="M24 250 Q60 244 96 252 T168 248"/><path d="M24 268 Q70 262 110 270 T168 266"/><ellipse cx="120" cy="259" rx="10" ry="4"/></g>' +
        '<ellipse cx="60" cy="226" rx="20" ry="4.5" fill="#E0A93A" stroke="' + INK + '" stroke-width="2"/>' +
        '<path d="M80 224 L150 224" stroke="#FFF1D6" stroke-width="4" stroke-linecap="round" opacity=".85"/>' +
        '<path class="drip" d="M58 168 Q51 181 58 188 Q65 181 58 168 Z" fill="#E0A93A" stroke="' + INK + '" stroke-width="3"/>' +
        '<path d="M102 112 L58 150 Q51 157 57 163 L63 167 L108 132 Z" fill="#F29A38" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<rect x="96" y="86" width="128" height="130" rx="12" fill="#F29A38" stroke="' + INK + '" stroke-width="5"/>' +
        '<path d="M108 98 L108 206" stroke="#F7C27C" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M128 82 Q160 34 192 82" fill="none" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M128 82 Q160 34 192 82" fill="none" stroke="#9A9A9A" stroke-width="3" stroke-linecap="round"/>' +
        '<ellipse cx="160" cy="86" rx="64" ry="13" fill="#E0791A" stroke="' + INK + '" stroke-width="5"/>' +
        '<rect x="96" y="126" width="128" height="60" fill="#FBF6EA" stroke="' + INK + '" stroke-width="4"/>' +
        '<text x="160" y="151" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="21" fill="#B04F06">GRAIN</text>' +
        '<text x="160" y="176" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="21" fill="#B04F06">DAMAGE</text>' +
        '<g fill="#A8835A" stroke="' + INK + '" stroke-width="1.5"><ellipse cx="108" cy="138" rx="5" ry="3.5"/><ellipse cx="212" cy="138" rx="5" ry="3.5"/><ellipse cx="108" cy="174" rx="5" ry="3.5"/><ellipse cx="212" cy="174" rx="5" ry="3.5"/></g>' +
        '<path d="M134 98 L152 105 M186 98 L168 105" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>' +
        '<circle class="blink" cx="146" cy="114" r="5.5" fill="' + INK + '"/><circle class="blink" cx="174" cy="114" r="5.5" fill="' + INK + '"/>' +
        '<path d="M138 194 Q160 214 182 194 Z" fill="#FBF6EA" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M150 196 v6 M160 197 v8 M170 196 v6" stroke="' + INK + '" stroke-width="2"/>' +
        '</svg>';
    },

    // Dry Humor: a fluffy terry bath towel draped over a towel bar, deadpan face, striped hem, fringe
    towel: function () {
      var cid = 'tw' + (++uid);
      var front = 'M58 34 Q58 22 70 22 L200 22 Q212 22 212 34 L214 222 Q192 213 170 222 Q148 231 128 222 Q106 213 84 222 Q66 229 56 222 Z';
      var loops = '';
      for (var ry = 0; ry < 10; ry++) {
        for (var rx = 0; rx < 11; rx++) {
          var lx = 64 + rx * 14 + (ry % 2 ? 7 : 0), ly = 54 + ry * 13;
          loops += '<path d="M' + lx + ' ' + ly + ' q3 4 6 0"/>';
        }
      }
      var fringe = '';
      for (var fx = 60; fx <= 210; fx += 8) {
        fringe += '<path d="M' + fx + ' 214 q' + (fx % 16 ? 2 : -2) + ' 12 0 26"/>';
      }
      return '<svg viewBox="0 0 270 260" role="img" aria-label="Dry Humor towel character">' +
        '<defs><clipPath id="' + cid + '"><path d="' + front + '"/></clipPath></defs>' +
        // towel bar
        '<rect x="26" y="22" width="218" height="14" rx="7" fill="#C98B4F" stroke="' + INK + '" stroke-width="4"/>' +
        '<circle cx="26" cy="29" r="11" fill="#A86F38" stroke="' + INK + '" stroke-width="4"/><circle cx="244" cy="29" r="11" fill="#A86F38" stroke="' + INK + '" stroke-width="4"/>' +
        // back layer peeking out
        '<path d="M66 40 L222 40 L224 208 Q200 200 176 208 Q150 216 126 208 Q100 200 76 208 L64 206 Z" fill="#2C97A6" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
        // fringe (drawn under the front panel so it hangs from the hem)
        '<g fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round">' + fringe + '</g>' +
        '<g fill="none" stroke="#7FD3DE" stroke-width="2.5" stroke-linecap="round">' + fringe + '</g>' +
        // arms
        '<path d="M60 112 Q36 128 34 160" fill="none" stroke="' + INK + '" stroke-width="18" stroke-linecap="round"/><path d="M60 112 Q36 128 34 160" fill="none" stroke="#3BB3C4" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M210 112 Q234 128 236 160" fill="none" stroke="' + INK + '" stroke-width="18" stroke-linecap="round"/><path d="M210 112 Q234 128 236 160" fill="none" stroke="#3BB3C4" stroke-width="10" stroke-linecap="round"/>' +
        // front panel
        '<path d="' + front + '" fill="#3BB3C4"/>' +
        '<g clip-path="url(#' + cid + ')">' +
          '<g fill="none" stroke="#7FD3DE" stroke-width="2.5" stroke-linecap="round">' + loops + '</g>' +
          '<rect x="40" y="170" width="200" height="14" fill="#FBF6EA"/>' +
          '<rect x="40" y="184" width="200" height="6" fill="#3A7BD5"/>' +
          '<rect x="40" y="190" width="200" height="10" fill="#FBF6EA"/>' +
          '<path d="M40 176 H240 M40 194 H240" stroke="#D9CFB5" stroke-width="2" stroke-dasharray="3 5"/>' +
          '<path d="M66 40 L66 160" stroke="#9BE0E9" stroke-width="7" stroke-linecap="round" opacity=".8"/>' +
        '</g>' +
        '<path d="' + front + '" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        // fold over the bar
        '<path d="M58 34 Q58 22 70 22 L200 22 Q212 22 212 34 L212 48 Q135 56 58 48 Z" fill="#7FD3DE" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="M72 34 H198" stroke="#B9E9EF" stroke-width="4" stroke-dasharray="3 7" stroke-linecap="round"/>' +
        // care tag with leaf
        '<g transform="rotate(-10 196 70)"><rect x="184" y="58" width="26" height="30" rx="3" fill="#FBF6EA" stroke="' + INK + '" stroke-width="3"/>' + leafAt(197, 72, 0.09, 0, '#6CC070', false) + '<path d="M189 83 h16" stroke="' + INK + '" stroke-width="2"/></g>' +
        // deadpan face
        '<circle cx="112" cy="112" r="14" fill="#FBF6EA" stroke="' + INK + '" stroke-width="4"/><circle cx="158" cy="112" r="14" fill="#FBF6EA" stroke="' + INK + '" stroke-width="4"/>' +
        '<circle cx="112" cy="117" r="5" fill="' + INK + '"/><circle cx="158" cy="117" r="5" fill="' + INK + '"/>' +
        '<path d="M98 112 A14 14 0 0 1 126 112 Z" fill="#2C97A6" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M144 112 A14 14 0 0 1 172 112 Z" fill="#2C97A6" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M96 93 L126 96 M144 96 L174 93" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M122 144 Q135 141 148 144" fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>' +
        '<g class="zzz" font-family="Luckiest Guy, Impact, sans-serif" fill="' + INK + '"><text x="226" y="72" font-size="26">z</text><text x="244" y="54" font-size="18">z</text></g>' +
        '</svg>';
    },

    // Do Not Operate Heavy Machinery: a hazard-lidded jar of THCA diamonds in golden sauce, lead diamond in shades
    dnohm: function () {
      var id = 'lid' + (++uid);
      return '<svg viewBox="0 0 260 300" role="img" aria-label="Do Not Operate Heavy Machinery diamonds and sauce jar character">' +
        '<defs><clipPath id="' + id + '"><rect x="56" y="36" width="148" height="40" rx="10"/></clipPath></defs>' +
        '<path d="M50 104 Q50 80 76 78 L184 78 Q210 80 210 104 L210 262 Q210 290 182 290 L78 290 Q50 290 50 262 Z" fill="#EAF4F7" stroke="' + INK + '" stroke-width="5"/>' +
        '<path d="M54 200 Q92 186 130 198 Q170 210 206 194 L206 262 Q206 286 182 286 L78 286 Q54 286 54 262 Z" fill="#E8B83A"/>' +
        '<g fill="#F6D77A"><circle cx="78" cy="226" r="5"/><circle cx="190" cy="270" r="4"/><circle cx="120" cy="272" r="3"/></g>' +
        '<g fill="#F5F2FF" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"><polygon points="70,252 82,228 96,252 84,268"/><polygon points="176,248 188,226 200,248 188,264"/><polygon points="146,266 158,248 170,266 158,278"/><polygon points="92,278 100,264 110,278 100,286"/></g>' +
        '<polygon points="130,116 170,158 152,236 108,236 90,158" fill="#F5F2FF" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<polygon points="130,116 170,158 148,158" fill="#DCD0FF"/>' +
        '<path d="M90 158 H170 M130 116 L112 158 L130 236 L148 158 Z" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<rect x="100" y="168" width="26" height="16" rx="5" fill="' + INK + '"/><rect x="134" y="168" width="26" height="16" rx="5" fill="' + INK + '"/>' +
        '<path d="M126 174 L134 174" stroke="' + INK + '" stroke-width="4"/><path d="M104 172 l8 0" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><path d="M138 172 l8 0" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>' +
        '<path d="M116 204 Q130 212 144 198" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M64 112 L64 250" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" opacity=".8"/>' +
        '<rect x="62" y="84" width="136" height="24" rx="5" fill="' + INK + '"/>' +
        '<text x="130" y="101" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="14" fill="#F2C94C">DO NOT OPERATE</text>' +
        '<rect x="56" y="36" width="148" height="40" rx="10" fill="#F2C94C"/>' +
        '<g clip-path="url(#' + id + ')"><path d="M50 84 L76 28 M80 84 L106 28 M110 84 L136 28 M140 84 L166 28 M170 84 L196 28 M200 84 L226 28" stroke="' + INK + '" stroke-width="10"/></g>' +
        '<rect x="56" y="36" width="148" height="40" rx="10" fill="none" stroke="' + INK + '" stroke-width="5"/>' +
        star(30, 74, 1, '#F2C94C') + star(232, 124, 0.8, '#C9A6F0') + star(228, 244, 0.9, '#F2C94C') + star(32, 196, 0.7, '#9ED8E0') +
        '</svg>';
    },

    sun: function () {
      return '<svg viewBox="0 0 200 200" role="img" aria-label="Sun wearing sunglasses"><g stroke="' + INK + '" stroke-width="6" stroke-linecap="round"><path d="M100 8 V34 M100 166 V192 M8 100 H34 M166 100 H192 M35 35 L53 53 M147 147 L165 165 M165 35 L147 53 M53 147 L35 165"/></g>' +
        '<circle cx="100" cy="100" r="50" fill="#F2C94C" stroke="' + INK + '" stroke-width="6"/><rect x="64" y="84" width="30" height="18" rx="6" fill="' + INK + '"/><rect x="106" y="84" width="30" height="18" rx="6" fill="' + INK + '"/>' +
        '<path d="M94 92 L106 92" stroke="' + INK + '" stroke-width="4"/><path d="M80 118 Q100 134 120 118" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/></svg>';
    },

    flask: function () {
      return '<svg viewBox="0 0 160 200" role="img" aria-label="Bubbling lab flask"><path d="M60 20 L60 80 L20 170 Q15 188 34 188 L126 188 Q145 188 140 170 L100 80 L100 20 Z" fill="#FBF6EA" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
        '<path d="M38 132 L122 132 L140 170 Q145 188 126 188 L34 188 Q15 188 20 170 Z" fill="#B57BE8" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
        '<rect x="50" y="10" width="60" height="14" rx="5" fill="#FBF6EA" stroke="' + INK + '" stroke-width="5"/>' +
        '<circle cx="70" cy="160" r="6" fill="#FBF6EA"/><circle cx="92" cy="150" r="4" fill="#FBF6EA"/><circle cx="80" cy="110" r="7" fill="none" stroke="' + INK + '" stroke-width="4"/><circle cx="95" cy="60" r="5" fill="none" stroke="' + INK + '" stroke-width="4"/>' +
        '<circle class="blink" cx="66" cy="164" r="4" fill="' + INK + '"/><circle class="blink" cx="96" cy="164" r="4" fill="' + INK + '"/><path d="M72 174 Q81 180 90 174" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/></svg>';
    },

    bag: function () {
      return '<svg viewBox="0 0 200 220" role="img" aria-label="Grinning money bag"><path d="M66 72 Q20 120 30 168 Q40 208 100 208 Q160 208 170 168 Q180 120 134 72 Z" fill="#6CC070" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
        '<path d="M70 72 L58 30 Q80 44 100 28 Q120 44 142 30 L130 72 Z" fill="#6CC070" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
        '<rect x="62" y="64" width="76" height="16" rx="8" fill="#F2C94C" stroke="' + INK + '" stroke-width="5"/>' +
        '<text x="100" y="196" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="30" fill="#FBF6EA" stroke="' + INK + '" stroke-width="2">$</text>' +
        '<circle class="blink" cx="82" cy="122" r="6" fill="' + INK + '"/><circle class="blink" cx="118" cy="122" r="6" fill="' + INK + '"/>' +
        '<path d="M76 146 Q100 170 124 146 Z" fill="#FBF6EA" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/></svg>';
    },

    // Seedy: the company mascot, a hemp seed with attitude
    seedy: function () {
      return '<svg viewBox="0 0 200 230" role="img" aria-label="Seedy the hemp seed mascot"><g class="bob">' +
        '<path d="M100 54 Q98 32 100 14" fill="none" stroke="#2F7A2B" stroke-width="6" stroke-linecap="round"/>' +
        '<ellipse cx="82" cy="22" rx="18" ry="8" transform="rotate(-25 82 22)" fill="#6CC070" stroke="' + INK + '" stroke-width="4"/>' +
        '<ellipse cx="118" cy="22" rx="18" ry="8" transform="rotate(25 118 22)" fill="#6CC070" stroke="' + INK + '" stroke-width="4"/>' +
        '<path d="M40 150 Q18 140 16 116" fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/><path d="M160 150 Q184 138 186 112" fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' +
        '<circle cx="16" cy="112" r="7" fill="#A8835A" stroke="' + INK + '" stroke-width="4"/><circle cx="186" cy="108" r="7" fill="#A8835A" stroke="' + INK + '" stroke-width="4"/>' +
        '<path d="M100 50 Q160 60 162 140 Q160 214 100 220 Q40 214 38 140 Q40 60 100 50 Z" fill="#A8835A" stroke="' + INK + '" stroke-width="5"/>' +
        '<g fill="#8C6B45"><ellipse cx="66" cy="104" rx="9" ry="6"/><ellipse cx="140" cy="94" rx="7" ry="5"/><ellipse cx="136" cy="190" rx="10" ry="6"/><ellipse cx="62" cy="182" rx="7" ry="5"/></g>' +
        '<path d="M100 54 Q112 136 100 216" fill="none" stroke="#7A5A36" stroke-width="3"/>' +
        '<path d="M66 112 L90 122 M134 112 L110 122" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' +
        '<circle cx="80" cy="134" r="9" fill="#FBF6EA" stroke="' + INK + '" stroke-width="3"/><circle cx="120" cy="134" r="9" fill="#FBF6EA" stroke="' + INK + '" stroke-width="3"/>' +
        '<circle class="blink" cx="82" cy="136" r="4" fill="' + INK + '"/><circle class="blink" cx="118" cy="136" r="4" fill="' + INK + '"/>' +
        '<path d="M70 162 Q100 192 130 162 Z" fill="#FBF6EA" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/><path d="M100 166 v12" stroke="' + INK + '" stroke-width="2"/>' +
        '<ellipse cx="78" cy="222" rx="16" ry="7" fill="' + INK + '"/><ellipse cx="122" cy="222" rx="16" ry="7" fill="' + INK + '"/>' +
        '</g></svg>';
    }
  };

  $$('[data-art]').forEach(function (el) {
    var fn = ART[el.getAttribute('data-art')];
    if (fn) el.innerHTML = fn();
  });

  /* =====================================================================
     STAGE SCALING
     ===================================================================== */
  var viewport = $('#viewport');
  var stage = $('#stage');
  function fit() {
    var cs = getComputedStyle(viewport);
    var pl = parseFloat(cs.paddingLeft), pr = parseFloat(cs.paddingRight);
    var pt = parseFloat(cs.paddingTop), pb = parseFloat(cs.paddingBottom);
    var w = viewport.clientWidth - pl - pr;
    var h = viewport.clientHeight - pt - pb - 12;
    var s = Math.max(0.1, Math.min(w / 1920, h / 1080));
    stage.style.setProperty('--scale', s);
    stage.style.left = (pl + w / 2) + 'px';
    stage.style.top = (pt + 6 + h / 2) + 'px';
  }
  window.addEventListener('resize', fit);
  fit();

  /* =====================================================================
     NAVIGATION, NOTES, OVERVIEW, TIMER
     ===================================================================== */
  var slides = $$('.slide');
  var total = slides.length;
  var cur = 0;
  var enterHooks = {};

  function slideFromHash() {
    var m = /^#slide-(\d+)$/.exec(location.hash);
    if (!m) return 0;
    var n = parseInt(m[1], 10) - 1;
    return n >= 0 && n < total ? n : 0;
  }

  function go(i, fromUser) {
    i = Math.max(0, Math.min(total - 1, i));
    if (fromUser) startTimer();
    var prev = cur;
    slides.forEach(function (s, k) {
      s.classList.remove('leaving-left');
      if (k === i) {
        s.classList.add('active');
        s.removeAttribute('aria-hidden');
      } else {
        if (k === prev && i > prev) s.classList.add('leaving-left');
        s.classList.remove('active');
        s.setAttribute('aria-hidden', 'true');
      }
    });
    cur = i;
    $('#counter').textContent = (i + 1) + ' / ' + total;
    $('#progress').style.width = ((i + 1) / total * 100) + '%';
    var want = '#slide-' + (i + 1);
    if (location.hash !== want) {
      try { history.replaceState(null, '', want); } catch (e) { location.hash = want; }
    }
    renderNotes();
    $$('.ov-item').forEach(function (b, k) { b.classList.toggle('current', k === i); });
    if (enterHooks[i]) enterHooks[i]();
  }
  function next() { go(cur + 1, true); }
  function prev() { go(cur - 1, true); }

  $('#nextBtn').addEventListener('click', next);
  $('#prevBtn').addEventListener('click', prev);
  window.addEventListener('hashchange', function () { var n = slideFromHash(); if (n !== cur) go(n); });

  // notes
  var notesPanel = $('#notes');
  function renderNotes() {
    var src = slides[cur].querySelector('.notes');
    $('#notesTitle').textContent = 'Slide ' + (cur + 1) + ': ' + slides[cur].getAttribute('data-title');
    $('#notesBody').innerHTML = src ? src.innerHTML : '<p>No notes for this slide.</p>';
  }
  function toggleNotes(force) {
    var show = typeof force === 'boolean' ? force : notesPanel.hidden;
    notesPanel.hidden = !show;
    $('#notesBtn').setAttribute('aria-pressed', String(show));
    try { localStorage.setItem('bsb-notes', show ? '1' : '0'); } catch (e) {}
  }
  $('#notesBtn').addEventListener('click', function () { toggleNotes(); });

  // overview
  var ov = $('#overview');
  slides.forEach(function (s, k) {
    var b = document.createElement('button');
    b.className = 'ov-item';
    b.innerHTML = '<b>' + (k + 1) + '</b><span>' + s.getAttribute('data-title') + '</span>';
    b.addEventListener('click', function () { toggleOverview(false); go(k, true); });
    $('#ovGrid').appendChild(b);
  });
  function toggleOverview(force) {
    var show = typeof force === 'boolean' ? force : ov.hidden;
    ov.hidden = !show;
    $('#ovBtn').setAttribute('aria-pressed', String(show));
    if (show) { var c = $('.ov-item.current'); if (c) c.focus(); }
  }
  $('#ovBtn').addEventListener('click', function () { toggleOverview(); });

  // help
  var help = $('#help');
  function toggleHelp(force) { help.hidden = typeof force === 'boolean' ? !force : !help.hidden; }
  $('#helpBtn').addEventListener('click', function () { toggleHelp(); });
  $('#helpClose').addEventListener('click', function () { toggleHelp(false); });

  // fullscreen
  function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        var p = document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
        if (p && p.catch) p.catch(function () {});
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } catch (e) {}
  }
  $('#fsBtn').addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', function () { setTimeout(fit, 60); });

  // hide toolbar (for clean screen recordings)
  function toggleUI() { document.body.classList.toggle('ui-hidden'); setTimeout(fit, 320); }

  // talk timer (10 minute target)
  var timerEl = $('#timer');
  var t0 = null, timerId = null;
  function startTimer() {
    if (t0) return;
    t0 = Date.now();
    timerId = setInterval(tickTimer, 1000);
  }
  function tickTimer() {
    var s = Math.floor((Date.now() - t0) / 1000);
    timerEl.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') + ' / 10:00';
    timerEl.classList.toggle('warn', s >= 540 && s < 600);
    timerEl.classList.toggle('over', s >= 600);
  }
  function resetTimer() {
    clearInterval(timerId); t0 = null; timerId = null;
    timerEl.textContent = '0:00'; timerEl.classList.remove('warn', 'over');
  }
  timerEl.addEventListener('click', resetTimer);

  // keyboard
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target.tagName || '').toLowerCase();
    var inRange = tag === 'input';
    var onButton = tag === 'button';
    var k = e.key;
    if (k === 'Escape') { toggleOverview(false); toggleHelp(false); return; }
    if (inRange && (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown')) return;
    if (k === 'ArrowRight' || k === 'PageDown') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); }
    else if (k === ' ' && !onButton && !inRange) { e.preventDefault(); next(); }
    else if (k === 'Home') go(0, true);
    else if (k === 'End') go(total - 1, true);
    else if (k === 'n' || k === 'N') toggleNotes();
    else if (k === 'o' || k === 'O') toggleOverview();
    else if (k === 'f' || k === 'F') toggleFullscreen();
    else if (k === 'h' || k === 'H') toggleUI();
    else if (k === 't' || k === 'T') resetTimer();
    else if (k === '?') toggleHelp();
  });

  // swipe
  var sx = null, sy = null, swipeOk = false;
  viewport.addEventListener('touchstart', function (e) {
    var t = e.touches[0];
    swipeOk = !(e.target.closest && e.target.closest('input'));
    sx = t.clientX; sy = t.clientY;
  }, { passive: true });
  viewport.addEventListener('touchend', function (e) {
    if (!swipeOk || sx === null) return;
    var t = e.changedTouches[0];
    var dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) { dx < 0 ? next() : prev(); }
    sx = sy = null;
  }, { passive: true });

  /* =====================================================================
     CONFETTI (leaves + rainbow paper)
     ===================================================================== */
  var cv = $('#confetti');
  var ctx = cv.getContext('2d');
  var bits = [], raf = null;
  var COLORS = ['#E8553E', '#F29A38', '#F2C94C', '#6CC070', '#3BB3C4', '#3A7BD5', '#8E44C9'];
  function sizeCanvas() {
    var dpr = window.devicePixelRatio || 1;
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', sizeCanvas);
  sizeCanvas();
  function burst(n, x, y) {
    if (reduceMotion) return;
    x = x == null ? innerWidth / 2 : x;
    y = y == null ? innerHeight / 3 : y;
    for (var i = 0; i < n; i++) {
      bits.push({
        x: x, y: y,
        vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 15 - 4,
        r: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.3,
        s: 7 + Math.random() * 9, c: COLORS[i % COLORS.length], leaf: Math.random() < 0.35
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function burstAt(el, n) {
    var r = el.getBoundingClientRect();
    burst(n || 60, r.left + r.width / 2, r.top + r.height / 2);
  }
  function drawLeaf(s) {
    ctx.fillStyle = '#5DAE4B'; ctx.strokeStyle = INK; ctx.lineWidth = 1.5;
    for (var a = -2; a <= 2; a++) {
      ctx.save(); ctx.rotate(a * 0.45);
      ctx.beginPath(); ctx.ellipse(0, -s * 0.9, s * 0.22, s * 0.9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.restore();
    }
  }
  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    bits = bits.filter(function (b) { return b.y < innerHeight + 60; });
    bits.forEach(function (b) {
      b.vy += 0.36; b.vx *= 0.99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
      if (b.leaf) { drawLeaf(b.s); }
      else { ctx.fillStyle = b.c; ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.fillRect(-b.s / 2, -b.s / 3, b.s, b.s * 0.66); ctx.strokeRect(-b.s / 2, -b.s / 3, b.s, b.s * 0.66); }
      ctx.restore();
    });
    raf = bits.length ? requestAnimationFrame(tick) : null;
    if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  /* =====================================================================
     SLIDE 1 — say hi to the cast
     ===================================================================== */
  $$('.character').forEach(function (c) {
    var bubble = c.querySelector('.bubble');
    var hideT = null;
    c.addEventListener('click', function () {
      $$('.character').forEach(function (o) { if (o !== c) { o.classList.remove('poked'); o.querySelector('.bubble').classList.remove('show'); } });
      bubble.textContent = c.getAttribute('data-quip');
      bubble.classList.add('show');
      c.classList.add('poked');
      burstAt(c.querySelector('.art'), 18);
      clearTimeout(hideT);
      hideT = setTimeout(function () { bubble.classList.remove('show'); c.classList.remove('poked'); }, 3800);
    });
  });

  /* =====================================================================
     SLIDE 2 — the 0.3% line tester
     ===================================================================== */
  var d9 = $('#d9'), thca = $('#thca');
  var lastOld = null, lastNew = null;
  function setStamp(el, isHemp, last) {
    el.textContent = isHemp ? 'Hemp ✓' : 'Marijuana';
    el.classList.toggle('hemp', isHemp);
    el.classList.toggle('mj', !isHemp);
    if (last !== null && last !== isHemp) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
  }
  function updateTester() {
    var a = parseFloat(d9.value), b = parseFloat(thca.value);
    var tot = a + 0.877 * b;
    $('#d9v').textContent = a.toFixed(2) + '%';
    $('#thcav').textContent = b.toFixed(2) + '%';
    $('#totv').textContent = tot.toFixed(2) + '%';
    var oldOk = a <= 0.3, newOk = tot <= 0.3;
    setStamp($('#oldStamp'), oldOk, lastOld);
    setStamp($('#newStamp'), newOk, lastNew);
    lastOld = oldOk; lastNew = newOk;
  }
  d9.addEventListener('input', updateTester);
  thca.addEventListener('input', updateTester);
  $$('.presets .btn').forEach(function (b) {
    b.addEventListener('click', function () {
      d9.value = b.getAttribute('data-d9');
      thca.value = b.getAttribute('data-thca');
      updateTester();
    });
  });
  updateTester();

  /* =====================================================================
     SLIDE 3 — plant explorer + counter
     ===================================================================== */
  function plantSVG() {
    var leaves = leafAt(232, 600, 0.95, -58, '#5DAE4B') + leafAt(232, 600, 0.95, 58, '#5DAE4B') +
      leafAt(233, 470, 0.8, -50, '#64B552') + leafAt(233, 470, 0.8, 50, '#64B552') +
      leafAt(235, 330, 0.62, -44, '#6CC070');
    var cola = '';
    var buds = [[236, 92, 34, 46], [216, 128, 30, 38], [256, 128, 30, 38], [236, 150, 36, 40], [212, 176, 26, 30], [262, 176, 26, 30], [236, 196, 30, 32]];
    buds.forEach(function (b) { cola += '<ellipse cx="' + b[0] + '" cy="' + b[1] + '" rx="' + b[2] + '" ry="' + b[3] + '" fill="#8DBF5A" stroke="' + INK + '" stroke-width="4"/>'; });
    var pistils = '<g fill="none" stroke="#E0791A" stroke-width="3.5" stroke-linecap="round"><path d="M226 70 q-8 -10 -2 -18"/><path d="M246 66 q8 -10 2 -18"/><path d="M204 116 q-12 -4 -14 -14"/><path d="M270 118 q12 -4 14 -14"/><path d="M236 52 q0 -10 6 -14"/><path d="M200 168 q-12 0 -16 -8"/><path d="M276 168 q12 0 16 -8"/></g>';
    var tri = '';
    for (var i = 0; i < 26; i++) {
      var ang = i * 2.39, rad = 12 + (i * 37 % 60);
      tri += '<circle cx="' + (236 + Math.cos(ang) * rad * 0.8).toFixed(1) + '" cy="' + (140 + Math.sin(ang) * rad * 1.2).toFixed(1) + '" r="3" fill="#FFFFFF" stroke="' + INK + '" stroke-width="1"/>';
    }
    var seeds = '';
    [[352, 240], [374, 258], [340, 266], [366, 282], [388, 236]].forEach(function (p) {
      seeds += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="13" ry="17" fill="#A8835A" stroke="' + INK + '" stroke-width="3.5"/><path d="M' + p[0] + ' ' + (p[1] - 15) + ' Q' + (p[0] + 4) + ' ' + p[1] + ' ' + p[0] + ' ' + (p[1] + 15) + '" fill="none" stroke="#7A5A36" stroke-width="2"/>';
    });
    return '<svg viewBox="0 0 470 760" role="group" aria-label="Hemp plant diagram, tap a part">' +
      '<ellipse cx="235" cy="742" rx="150" ry="18" fill="#C98B4F" stroke="' + INK + '" stroke-width="5"/>' +
      '<g class="part" data-part="stalk" tabindex="0" role="button" aria-label="Stalk">' +
        '<path d="M232 742 Q226 430 236 120" fill="none" stroke="' + INK + '" stroke-width="36" stroke-linecap="round"/>' +
        '<path d="M232 742 Q226 430 236 120" fill="none" stroke="#8DBF5A" stroke-width="24" stroke-linecap="round"/>' +
        '<path d="M222 700 L242 700 M222 600 L242 600 M224 470 L244 470 M226 330 L246 330" stroke="#5E8F33" stroke-width="5" stroke-linecap="round"/>' +
      '</g>' +
      '<g style="pointer-events:none">' + leaves + '</g>' +
      '<g class="part" data-part="seed" tabindex="0" role="button" aria-label="Seed">' +
        '<path d="M236 340 Q300 320 352 262" fill="none" stroke="' + INK + '" stroke-width="16" stroke-linecap="round"/>' +
        '<path d="M236 340 Q300 320 352 262" fill="none" stroke="#8DBF5A" stroke-width="8" stroke-linecap="round"/>' +
        '<ellipse cx="364" cy="256" rx="44" ry="40" fill="#CDEBC0" stroke="' + INK + '" stroke-width="3"/>' + seeds +
      '</g>' +
      '<g class="part" data-part="flower" tabindex="0" role="button" aria-label="Flower">' + cola + pistils + tri + '</g>' +
      '<g font-family="Permanent Marker, cursive" font-size="32" fill="' + INK + '" style="pointer-events:none">' +
        '<text x="300" y="70">Flower</text><path d="M298 62 Q282 70 276 92" fill="none" stroke="' + INK + '" stroke-width="3"/>' +
        '<text x="372" y="350">Seed</text><path d="M392 322 Q390 306 380 290" fill="none" stroke="' + INK + '" stroke-width="3"/>' +
        '<text x="60" y="690">Stalk</text><path d="M150 680 Q190 676 214 662" fill="none" stroke="' + INK + '" stroke-width="3"/>' +
      '</g></svg>';
  }
  $('#plant').innerHTML = plantSVG();
  var PART_INFO = {
    stalk: ['Stalk', 'Bast fiber outside, woody hurd inside. Textiles, paper, car panels, hempcrete, bedding. That’s where Dry Humor lives.', 'c-teal'],
    seed: ['Seed', 'About 30% oil plus protein. Food, animal feed, and personal care. Grain Damage starts here.', 'c-orange'],
    flower: ['Flower', 'Trichomes packed with cannabinoids like CBD. Personal care and wellness, plus licensed cannabis. Spritz Happens territory.', 'c-red']
  };
  function pickPart(p) {
    $$('.part').forEach(function (g) { g.classList.toggle('on', g.getAttribute('data-part') === p); });
    $('#markets').classList.add('dim');
    $$('.market').forEach(function (m) { m.classList.toggle('lit', m.getAttribute('data-parts').split(' ').indexOf(p) > -1); });
    var info = PART_INFO[p];
    $('#partInfo').innerHTML = '<h3 class="' + info[2] + '">' + info[0] + '</h3><p>' + info[1] + '</p>';
  }
  $$('.part').forEach(function (g) {
    g.addEventListener('click', function () { pickPart(g.getAttribute('data-part')); });
    g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); pickPart(g.getAttribute('data-part')); } });
  });

  function countUp(el, to, ms, fmt) {
    if (reduceMotion) { el.textContent = fmt(to); return; }
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / ms);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  enterHooks[2] = function () {
    countUp($('#count25'), 25000, 1500, function (v) { return v.toLocaleString('en-US') + (v >= 25000 ? '+' : ''); });
  };

  /* =====================================================================
     SLIDE 4 — matching game
     ===================================================================== */
  var selected = null, matched = 0;
  var CHEERS = ['Nailed it.', 'Correct. That plant was built for the job.', 'Yep. Breeding pays off.'];
  function setMsg(t) { $('#gameMsg').textContent = t; }
  $$('.pchip').forEach(function (c) {
    c.addEventListener('click', function () {
      $$('.pchip').forEach(function (o) { o.classList.remove('selected'); });
      selected = c; c.classList.add('selected');
      setMsg('Now tap the plant that makes ' + c.textContent.trim() + '.');
    });
  });
  function matchCard(card) {
    var chip = $('.pchip[data-prod="' + card.getAttribute('data-want') + '"]');
    card.classList.add('matched');
    card.querySelector('.slot').innerHTML = '<b style="font-family:var(--font-marker);font-weight:400">' + card.getAttribute('data-name') + '</b><br>Our pick: ' + card.getAttribute('data-pick');
    chip.classList.add('used'); chip.classList.remove('selected');
    matched++;
    $('#score').textContent = matched + ' / 4';
  }
  $$('.var-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (card.classList.contains('matched')) return;
      if (!selected) { setMsg('Pick a product from the top row first.'); return; }
      if (selected.getAttribute('data-prod') === card.getAttribute('data-want')) {
        matchCard(card);
        selected = null;
        burstAt(card, 30);
        setMsg(matched === 4 ? '4 for 4. You’d make a decent plant breeder.' : CHEERS[matched % CHEERS.length]);
        if (matched === 4) burst(140);
      } else {
        card.classList.remove('wrong'); void card.offsetWidth; card.classList.add('wrong');
        setMsg('Nope. That plant has other plans.');
      }
    });
  });
  // Shuffle the product chips and the plant cards so nothing lines up with its answer
  function shuffleGame() {
    var tray = $('#tray'), grid = $('.var-grid');
    var chips = $$('.pchip', tray), cards = $$('.var-card', grid);
    function mix(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    var c, d, tries = 0;
    do {
      c = mix(chips); d = mix(cards); tries++;
      var lined = c.some(function (chip, i) { return chip.getAttribute('data-prod') === d[i].getAttribute('data-want'); });
    } while (lined && tries < 50);
    c.forEach(function (el) { tray.appendChild(el); });
    d.forEach(function (el) { grid.appendChild(el); });
  }
  shuffleGame();
  $('#revealAll').addEventListener('click', function () {
    $$('.var-card').forEach(function (c) { if (!c.classList.contains('matched')) matchCard(c); });
    setMsg('Every product gets a plant built for it.');
  });
  $('#resetGame').addEventListener('click', function () {
    matched = 0; selected = null;
    $('#score').textContent = '0 / 4';
    $$('.pchip').forEach(function (c) { c.classList.remove('used', 'selected'); });
    $$('.var-card').forEach(function (c) { c.classList.remove('matched'); c.querySelector('.slot').textContent = '2. Tap to place a product here'; });
    shuffleGame();
    setMsg('Match each product to the plant built for it.');
  });

  /* =====================================================================
     SLIDE 5 — flip cards
     ===================================================================== */
  $$('.flip').forEach(function (f) {
    f.addEventListener('click', function () { f.classList.toggle('flipped'); });
  });

  /* =====================================================================
     SLIDE 6 — grow the season
     ===================================================================== */
  function stalk(x, top, sway, col) {
    var d = 'M' + x + ' 133 Q' + (x + sway) + ' ' + ((133 + top) / 2) + ' ' + (x + sway * 0.6) + ' ' + top;
    return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="' + (col || '#8DBF5A') + '" stroke-width="4" stroke-linecap="round"/>';
  }
  function bud(x, y, r, fill, frost, seeds) {
    var s = '<ellipse cx="' + x + '" cy="' + y + '" rx="' + r + '" ry="' + (r * 1.3) + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="3"/>';
    if (frost) for (var i = 0; i < 5; i++) s += '<circle cx="' + (x - r * 0.5 + (i * 7 % (r * 1.2))) + '" cy="' + (y - r * 0.6 + i * r * 0.32) + '" r="2" fill="#FFFFFF"/>';
    if (seeds) for (var j = 0; j < 4; j++) s += '<ellipse cx="' + (x - r * 0.4 + j * r * 0.28) + '" cy="' + (y - r * 0.3 + (j % 2) * r * 0.6) + '" rx="3.5" ry="4.5" fill="#8C6B45" stroke="' + INK + '" stroke-width="1.5"/>';
    s += '<path d="M' + (x - 3) + ' ' + (y - r * 1.2) + ' q-4 -6 0 -10 M' + (x + 3) + ' ' + (y - r * 1.2) + ' q4 -6 0 -10" fill="none" stroke="#E0791A" stroke-width="2.5" stroke-linecap="round"/>';
    return s;
  }
  function bushPlant(cx, top, budFill, frost, seeds, droop) {
    var s = stalk(cx, top, 0);
    var levels = [[108, 52], [84, 64], [60, 50]];
    levels.forEach(function (l) {
      var y = l[0], w = l[1];
      if (y < top + 14) return;
      var dy = droop ? 14 : -14;
      s += '<path d="M' + cx + ' ' + y + ' Q' + (cx - w * 0.6) + ' ' + (y - 6) + ' ' + (cx - w) + ' ' + (y + dy) + ' M' + cx + ' ' + y + ' Q' + (cx + w * 0.6) + ' ' + (y - 6) + ' ' + (cx + w) + ' ' + (y + dy) + '" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>';
      s += leafAt(cx - w * 0.55, y + 4, 0.17, droop ? -130 : -70, droop ? '#9BAF5A' : '#5DAE4B') + leafAt(cx + w * 0.55, y + 4, 0.17, droop ? 130 : 70, droop ? '#9BAF5A' : '#5DAE4B');
      s += bud(cx - w, y + dy - 4, 9, budFill, frost, seeds) + bud(cx + w, y + dy - 4, 9, budFill, frost, seeds);
    });
    s += bud(cx, top, 14, budFill, frost, seeds);
    return s;
  }
  function growArt(crop, good) {
    var s = '';
    if (crop === 'fiber') {
      if (good) {
        for (var x = 40; x <= 320; x += 35) { var t = 18 + (x * 7 % 14); s += stalk(x, t, (x % 3) - 1) + leafAt(x, t + 10, 0.13, 0, '#5DAE4B'); }
      } else {
        [80, 180, 280].forEach(function (x) { s += bushPlant(x, 58, '#A8835A', false, true, false); });
      }
    } else if (crop === 'grain') {
      for (var g = 50; g <= 310; g += 52) {
        s += stalk(g, 64, 0) + leafAt(g - 14, 100, 0.16, -60, '#5DAE4B') + leafAt(g + 14, 100, 0.16, 60, '#5DAE4B');
        if (good) { for (var k = 0; k < 5; k++) s += '<ellipse cx="' + (g - 10 + (k % 3) * 10) + '" cy="' + (58 + Math.floor(k / 3) * 12 + (k % 2) * 3) + '" rx="6" ry="8" fill="#A8835A" stroke="' + INK + '" stroke-width="2"/>'; }
        else { s += '<ellipse cx="' + g + '" cy="58" rx="13" ry="10" fill="#E9F2B8" stroke="' + INK + '" stroke-width="2.5"/><path d="M' + (g - 8) + ' 52 q2 -8 4 0 M' + (g + 2) + ' 50 q2 -8 4 0" fill="none" stroke="#C8D27A" stroke-width="2"/>'; }
      }
    } else if (crop === 'cbd') {
      s += good ? bushPlant(180, 30, '#8DBF5A', true, false, false) : bushPlant(180, 30, '#9DB87A', false, true, false);
    } else {
      s += good ? bushPlant(180, 34, '#B57BE8', true, false, false) + star(300, 50, 1.1, '#9ED8E0') + star(60, 70, 0.8, '#FFFFFF')
                : bushPlant(180, 52, '#A88A5A', false, false, true);
    }
    return '<svg viewBox="0 0 360 170" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + s + '</svg>';
  }
  var GROW = {
    fiber: { ok: 'Towel-grade fiber! Tall, skinny stalks full of long primary bast.', a: 'Spread out = bushy, branchy plants with short, chunky fiber.', b: 'Waited for seed set. Coarse fiber. Your towel now exfoliates you.' },
    grain: { ok: 'Heavy seed heads, about 30% oil. Grain Damage is go.', a: 'No pollen, no seed. Gorgeous flowers, zero oil.', b: 'Harvested while it looked pretty. Half the seed wasn’t ripe yet.' },
    cbd: { ok: 'Resin-packed flowers from a tested mother. Spritz-ready.', a: 'Random seed, random chemistry. One plant tested hot for THC.', b: 'Pollen got in. The flowers made seeds instead of resin.' },
    rec: { ok: 'Frosty, terpene-loaded flower, frozen fresh. Diamonds incoming.', a: 'THC cannabis on a hemp farm? The license says absolutely not.', b: 'Hang-dried. The terpenes evaporated and the sauce came out flat.' }
  };
  $$('.gcard').forEach(function (card) {
    $$('.seg', card).forEach(function (seg) {
      $$('button', seg).forEach(function (b) {
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
          $$('button', seg).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        });
      });
    });
  });
  function choiceOf(card, q) {
    var b = $('.seg[data-q="' + q + '"] button[aria-pressed="true"]', card);
    return b ? b.getAttribute('data-v') : null;
  }
  function growAll() {
    var nailed = 0, missing = false;
    $$('.gcard').forEach(function (card, i) {
      var crop = card.getAttribute('data-crop');
      var a = choiceOf(card, 'a'), b = choiceOf(card, 'b');
      var res = $('.gresult', card), plant = $('.gplant', card), st = $('.gstamp', card);
      if (!a || !b) { missing = true; res.textContent = 'Make both calls first.'; res.className = 'gresult c-red'; return; }
      var good = a === 'ok' && b === 'ok';
      if (good) nailed++;
      plant.classList.remove('grown'); st.classList.remove('show');
      plant.innerHTML = growArt(crop, good);
      setTimeout(function () {
        plant.classList.add('grown');
        setTimeout(function () {
          st.textContent = good ? 'Nailed it!' : 'Crop fail';
          st.className = 'gstamp show ' + (good ? 'ok' : 'bad');
          res.textContent = good ? GROW[crop].ok : (a !== 'ok' ? GROW[crop].a : GROW[crop].b);
          res.className = 'gresult ' + (good ? 'c-green' : 'c-red');
          if (good) burstAt(card, 22);
        }, reduceMotion ? 0 : 700);
      }, reduceMotion ? 0 : i * 250);
    });
    $('#growScore').textContent = (missing ? '?' : nailed) + ' / 4 crops nailed';
    if (!missing && nailed === 4) setTimeout(function () { burst(160); }, 1500);
  }
  $('#growBtn').addEventListener('click', growAll);
  $('#growAnswers').addEventListener('click', function () {
    $$('.gcard').forEach(function (card) {
      $$('.seg button', card).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === 'ok')); });
    });
    growAll();
  });
  $('#growReset').addEventListener('click', function () {
    $$('.gcard').forEach(function (card) {
      $$('.seg button', card).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      $('.gplant', card).classList.remove('grown');
      $('.gstamp', card).classList.remove('show');
      var r = $('.gresult', card); r.textContent = 'Make both calls, then hit Grow.'; r.className = 'gresult';
    });
    $('#growScore').textContent = '0 / 4 crops nailed';
  });

  /* =====================================================================
     Shared station engine (slides 7 and 9)
     ===================================================================== */
  function StationGame(chipsEl, artEl, ctlEl, stations) {
    var self = this;
    this.cur = 0; this.unlocked = 0; this.done = stations.map(function () { return false; });
    this.cleanup = null;
    chipsEl.innerHTML = '';
    stations.forEach(function (st, i) {
      var b = document.createElement('button');
      b.className = 'chip-btn';
      b.innerHTML = '<span class="n">' + (i + 1) + '</span>' + st.chip;
      b.addEventListener('click', function () { if (i <= self.unlocked) self.show(i); });
      chipsEl.appendChild(b);
    });
    this.chips = $$('.chip-btn', chipsEl);
    this.complete = function (msgEl, text) {
      self.done[self.cur] = true;
      self.unlocked = Math.max(self.unlocked, Math.min(stations.length - 1, self.cur + 1));
      if (msgEl && text) msgEl.innerHTML = text;
      var nb = $('.next-st', ctlEl);
      if (nb) { nb.disabled = false; nb.classList.add('green'); nb.classList.remove('alt'); }
      self.paintChips();
    };
    this.paintChips = function () {
      self.chips.forEach(function (c, i) {
        c.classList.toggle('cur', i === self.cur);
        c.classList.toggle('done', self.done[i]);
        c.disabled = i > self.unlocked;
      });
    };
    this.show = function (i) {
      if (self.cleanup) { self.cleanup(); self.cleanup = null; }
      self.cur = i;
      var st = stations[i];
      artEl.innerHTML = st.art();
      var last = i === stations.length - 1;
      ctlEl.innerHTML = st.ctl() +
        '<div class="spacer"></div><div class="row">' +
        (last ? '<button class="btn alt restart-st">Start over</button>'
              : '<button class="btn alt next-st"' + (self.done[i] ? '' : ' disabled') + '>Next station →</button><button class="btn alt skip-st">Skip station</button>') +
        '</div>';
      var nb = $('.next-st', ctlEl);
      if (nb) { if (self.done[i]) { nb.classList.add('green'); nb.classList.remove('alt'); } nb.addEventListener('click', function () { self.show(i + 1); }); }
      var sk = $('.skip-st', ctlEl);
      if (sk) sk.addEventListener('click', function () { self.done[i] = true; self.unlocked = Math.max(self.unlocked, i + 1); self.show(i + 1); });
      var rs = $('.restart-st', ctlEl);
      if (rs) rs.addEventListener('click', function () { self.done = stations.map(function () { return false; }); self.unlocked = 0; self.show(0); });
      self.cleanup = st.init(self, artEl, ctlEl) || null;
      self.paintChips();
    };
    this.show(0);
  }
  function stationHead(n, title, text) {
    return '<h3>' + n + '. ' + title + '</h3><p>' + text + '</p>';
  }

  /* =====================================================================
     SLIDE 7 — Spritz Happens extraction lab
     ===================================================================== */
  var LAB = [
    {
      chip: 'Harvest',
      art: function () {
        var buds = [[380, 92], [292, 178], [468, 178], [240, 270], [520, 270], [380, 222]];
        var s = '<svg viewBox="0 0 760 520" aria-label="Hemp plant, tap the flowers">' +
          '<rect x="0" y="440" width="760" height="80" fill="#A86F38"/>' +
          '<path d="M380 440 L380 100" stroke="' + INK + '" stroke-width="20" stroke-linecap="round"/><path d="M380 440 L380 100" stroke="#8DBF5A" stroke-width="12" stroke-linecap="round"/>' +
          '<g fill="none" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"><path d="M380 300 Q300 290 240 270"/><path d="M380 300 Q460 290 520 270"/><path d="M380 230 Q330 200 292 178"/><path d="M380 230 Q430 200 468 178"/></g>' +
          leafAt(300, 360, 0.6, -70, '#5DAE4B') + leafAt(460, 360, 0.6, 70, '#5DAE4B') + leafAt(320, 250, 0.45, -60, '#64B552') + leafAt(440, 250, 0.45, 60, '#64B552') +
          '<g transform="translate(640 330)"><path d="M-55 -50 L55 -50 L48 100 Q48 110 38 110 L-38 110 Q-48 110 -48 100 Z" fill="#EAF4F7" stroke="' + INK + '" stroke-width="5"/><rect x="-62" y="-70" width="124" height="24" rx="6" fill="#E8553E" stroke="' + INK + '" stroke-width="5"/><text id="jarCount" x="0" y="60" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="40" fill="' + INK + '">0</text></g>';
        buds.forEach(function (b, i) {
          s += '<g class="lbud clickable" data-i="' + i + '" tabindex="0" role="button" aria-label="Flower ' + (i + 1) + '" style="transition:transform .6s ease-in, opacity .6s">' + bud(b[0], b[1], 26, '#8DBF5A', true, false) + '</g>';
        });
        return s + '</svg>';
      },
      ctl: function () { return stationHead(1, 'Harvest the flowers', 'Tap all 6 flowers. Leaves stay behind, because the CBD-making trichomes are packed onto the flowers.') + '<p class="big-num" id="budCount">0 / 6</p><p class="msg" id="labMsg"></p>'; },
      init: function (game, art, ctl) {
        var n = 0;
        $$('.lbud', art).forEach(function (g) {
          function pick() {
            if (g.dataset.picked) return;
            g.dataset.picked = '1'; n++;
            var bb = g.getBBox();
            g.style.transform = 'translate(' + (640 - bb.x - bb.width / 2) + 'px,' + (390 - bb.y - bb.height / 2) + 'px) scale(.4)';
            g.style.opacity = '0';
            $('#budCount', ctl).textContent = n + ' / 6';
            var jc = $('#jarCount', art); if (jc) jc.textContent = n;
            if (n === 6) game.complete($('#labMsg', ctl), 'Full jar. Into the extractor it goes.');
          }
          g.addEventListener('click', pick);
          g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); pick(); } });
        });
      }
    },
    {
      chip: 'CO₂',
      art: function () {
        return '<svg viewBox="0 0 760 520" aria-label="CO2 extraction vessel">' +
          '<rect x="0" y="470" width="760" height="50" fill="#D8CDB4"/>' +
          '<rect x="290" y="110" width="180" height="340" rx="40" fill="#EAF4F7" stroke="' + INK + '" stroke-width="6"/>' +
          '<rect id="co2Fill" x="296" y="444" width="168" height="0" rx="30" fill="#E3963E" style="transition:height 1.6s ease, y 1.6s ease"/>' +
          '<g id="co2Bubbles" class="bubbles" fill="#FFF1D6" opacity="0"><circle cx="340" cy="430" r="7"/><circle cx="380" cy="440" r="5"/><circle cx="420" cy="430" r="8"/><circle cx="360" cy="420" r="4"/></g>' +
          '<g id="plantMat" style="transition:opacity 1.6s">' + bud(340, 410, 18, '#8DBF5A', true) + bud(390, 418, 16, '#8DBF5A', true) + bud(425, 405, 15, '#8DBF5A', true) + '</g>' +
          '<rect x="270" y="90" width="220" height="34" rx="10" fill="#9A9A9A" stroke="' + INK + '" stroke-width="6"/>' +
          '<path d="M380 90 V50 H160 V200" fill="none" stroke="' + INK + '" stroke-width="12"/><path d="M380 90 V50 H160 V200" fill="none" stroke="#C9C9C9" stroke-width="6"/>' +
          '<rect x="110" y="200" width="100" height="200" rx="20" fill="#3BB3C4" stroke="' + INK + '" stroke-width="6"/><text x="160" y="310" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="34" fill="' + INK + '">CO₂</text>' +
          gaugeSVG(560, 160, 'tN', 'Temp') + gaugeSVG(560, 330, 'pN', 'Pressure') +
          '</svg>';
      },
      ctl: function () {
        return stationHead(2, 'Supercritical CO₂', 'CO₂ only dissolves the good stuff once it goes supercritical: above 31 °C and 74 bar.') +
          '<div class="field"><label for="labT">Temperature <output id="labTo">20 °C</output></label><input type="range" id="labT" min="0" max="60" value="20"></div>' +
          '<div class="field"><label for="labP">Pressure <output id="labPo">40 bar</output></label><input type="range" id="labP" min="0" max="150" value="40"></div>' +
          '<div class="row"><span class="phase-badge" id="labPhase">Gas</span><button class="btn teal" id="labExtract" disabled>Extract!</button></div>' +
          '<p class="msg" id="labMsg">Just a gas. Squeeze harder.</p>';
      },
      init: function (game, art, ctl) {
        var T = $('#labT', ctl), P = $('#labP', ctl), btn = $('#labExtract', ctl);
        function upd() {
          var t = +T.value, p = +P.value, ph = phaseOf(t, p);
          $('#labTo', ctl).textContent = t + ' °C'; $('#labPo', ctl).textContent = p + ' bar';
          $('#tN', art).style.transform = 'rotate(' + (-90 + 180 * t / 60) + 'deg)';
          $('#pN', art).style.transform = 'rotate(' + (-90 + 180 * p / 150) + 'deg)';
          var badge = $('#labPhase', ctl); badge.textContent = PHASE[ph][0]; badge.className = 'phase-badge ' + ph;
          if (!game.done[game.cur]) $('#labMsg', ctl).textContent = PHASE[ph][1];
          btn.disabled = ph !== 'super';
        }
        T.addEventListener('input', upd); P.addEventListener('input', upd); upd();
        btn.addEventListener('click', function () {
          btn.disabled = true;
          var f = $('#co2Fill', art); f.setAttribute('height', '150'); f.setAttribute('y', '294');
          $('#co2Bubbles', art).setAttribute('opacity', '1');
          $('#plantMat', art).style.opacity = '.25';
          setTimeout(function () { if (!document.body.contains(btn)) return; game.complete($('#labMsg', ctl), 'Crude extract! CBDA, terpenes… and a bunch of plant wax. That’s next.'); }, reduceMotion ? 50 : 1700);
        });
      }
    },
    {
      chip: 'Winterize',
      art: function () {
        var flakes = '';
        for (var i = 0; i < 16; i++) flakes += '<path d="M' + (300 + (i * 47 % 170)) + ' ' + (300 + (i * 31 % 120)) + ' l8 -4 l6 6 l-4 8 l-9 -2 Z" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2"/>';
        return '<svg viewBox="0 0 760 520" aria-label="Beaker of extract being chilled">' +
          '<rect x="0" y="470" width="760" height="50" fill="#D8CDB4"/>' +
          '<rect x="80" y="110" width="44" height="330" rx="22" fill="#FBF6EA" stroke="' + INK + '" stroke-width="5"/><rect id="thermo" x="90" y="200" width="24" height="230" rx="12" fill="#E8553E" style="transition:all .2s"/><circle cx="102" cy="440" r="30" fill="#E8553E" stroke="' + INK + '" stroke-width="5"/>' +
          '<text x="140" y="190" font-family="Patrick Hand, sans-serif" font-size="26" fill="' + INK + '">20 °C</text><text x="140" y="420" font-family="Patrick Hand, sans-serif" font-size="26" fill="' + INK + '">−40 °C</text>' +
          '<path d="M270 200 L270 440 Q270 460 290 460 L470 460 Q490 460 490 440 L490 200" fill="#EAF4F7" stroke="' + INK + '" stroke-width="6"/>' +
          '<rect id="oil" x="276" y="270" width="208" height="184" fill="#C9772B" style="transition:fill 1s"/>' +
          '<g id="flakes" opacity="0" style="transition:opacity .3s">' + flakes + '</g>' +
          '<g id="funnel" opacity="0" style="transition:opacity .4s"><path d="M560 230 L700 230 L645 330 L645 400 L615 400 L615 330 Z" fill="#FBF6EA" stroke="' + INK + '" stroke-width="5"/><text x="630" y="215" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="24" fill="' + INK + '">wax goes here</text></g>' +
          '<g id="snow" opacity="0" style="transition:opacity .3s">' + star(560, 120, 1.6, '#9ED8E0') + star(660, 150, 1.2, '#FFFFFF') + star(600, 80, 1, '#9ED8E0') + '</g>' +
          '</svg>';
      },
      ctl: function () {
        return stationHead(3, 'Winterize', 'Wax and fats came along for the ride. Chill the extract hard so they freeze out, then filter them off.') +
          '<div class="field"><label for="labC">Freezer <output id="labCo">20 °C</output></label><input type="range" id="labC" min="-40" max="20" value="20"></div>' +
          '<div class="row"><button class="btn teal" id="labFilter" disabled>Filter out the wax</button></div>' +
          '<p class="msg" id="labMsg">Colder. Wax doesn’t freeze out at room temp.</p>';
      },
      init: function (game, art, ctl) {
        var C = $('#labC', ctl), btn = $('#labFilter', ctl);
        C.style.direction = 'rtl';
        function upd() {
          var t = +C.value;
          $('#labCo', ctl).textContent = t + ' °C';
          var frac = (t + 40) / 60;
          var th = $('#thermo', art); th.setAttribute('height', String(20 + frac * 210)); th.setAttribute('y', String(430 - frac * 210));
          th.setAttribute('fill', t < 0 ? '#3A7BD5' : '#E8553E');
          $('#flakes', art).setAttribute('opacity', String(Math.max(0, Math.min(1, (5 - t) / 25))));
          $('#snow', art).setAttribute('opacity', t <= -20 ? '1' : '0');
          if (!game.done[game.cur]) {
            btn.disabled = t > -20;
            $('#labMsg', ctl).textContent = t > 0 ? 'Colder. Wax doesn’t freeze out at room temp.' : t > -20 ? 'Getting cloudy. Keep going.' : 'Wax is frozen solid. Filter it!';
          }
        }
        C.addEventListener('input', upd); upd();
        btn.addEventListener('click', function () {
          btn.disabled = true;
          $('#funnel', art).setAttribute('opacity', '1');
          var fl = $('#flakes', art);
          fl.style.transition = 'transform 1.2s ease-in, opacity 1.2s';
          fl.style.transform = 'translate(310px, -20px) scale(.5)';
          fl.setAttribute('opacity', '0');
          $('#oil', art).setAttribute('fill', '#E8A64A');
          setTimeout(function () { if (!document.body.contains(btn)) return; game.complete($('#labMsg', ctl), 'Clean, golden extract. Wax is out.'); }, reduceMotion ? 50 : 1200);
        });
      }
    },
    {
      chip: 'Decarb',
      art: function () {
        return '<svg viewBox="0 0 760 520" aria-label="Decarboxylation: heat turns CBDA into CBD">' +
          '<rect x="0" y="470" width="760" height="50" fill="#D8CDB4"/>' +
          '<rect x="70" y="80" width="50" height="340" rx="25" fill="#FBF6EA" stroke="' + INK + '" stroke-width="5"/>' +
          '<rect x="74" y="190" width="42" height="56" fill="#CDEBC0"/>' +
          '<rect id="dThermo" x="82" y="380" width="26" height="40" rx="13" fill="#E8553E"/><circle cx="95" cy="430" r="32" fill="#E8553E" stroke="' + INK + '" stroke-width="5"/>' +
          '<text x="130" y="224" font-family="Permanent Marker, cursive" font-size="22" fill="#2F7A2B">sweet spot</text>' +
          '<rect x="210" y="400" width="200" height="40" rx="10" fill="#4A4A4A" stroke="' + INK + '" stroke-width="5"/><rect id="burner" x="230" y="388" width="160" height="12" rx="6" fill="#777"/>' +
          '<path d="M270 250 L270 300 L230 380 Q226 392 240 392 L380 392 Q394 392 390 380 L350 300 L350 250 Z" fill="#EAF4F7" stroke="' + INK + '" stroke-width="5"/><path d="M246 352 L374 352 L390 380 Q394 392 380 392 L240 392 Q226 392 230 380 Z" fill="#E8A64A"/>' +
          '<g transform="translate(560 300)">' +
            '<polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="#FBF6EA" stroke="' + INK + '" stroke-width="6"/>' +
            '<polygon points="0,-40 34,-20 34,20 0,40 -34,20 -34,-20" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="6 6"/>' +
            '<path d="M52 30 L100 56 L130 40 L160 60" fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>' +
            '<path d="M-52 -30 L-90 -50" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/><circle cx="-102" cy="-56" r="16" fill="#E8553E" stroke="' + INK + '" stroke-width="4"/><text x="-102" y="-50" text-anchor="middle" font-family="Patrick Hand, sans-serif" font-size="18" fill="#FBF6EA">OH</text>' +
            '<g id="cooh" style="transition:transform 1.4s ease-out, opacity 1.4s"><path d="M0 -60 L0 -100" stroke="' + INK + '" stroke-width="6"/><ellipse cx="0" cy="-124" rx="44" ry="26" fill="#F2C94C" stroke="' + INK + '" stroke-width="5"/><text id="coohT" x="0" y="-116" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="26" fill="' + INK + '">COOH</text></g>' +
            '<text id="molLabel" x="0" y="120" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="46" fill="#B33421">CBDA</text>' +
          '</g></svg>';
      },
      ctl: function () {
        return stationHead(4, 'Decarboxylate', 'Hold the button to heat. Stay in the green sweet spot until the COOH group pops off as CO₂, turning CBDA into CBD.') +
          '<div class="row"><span class="big-num" id="dTemp">25 °C</span><button class="btn red hold-btn" id="holdHeat">Hold to heat</button></div>' +
          '<div class="bar"><i id="dProg"></i></div>' +
          '<p class="msg" id="labMsg">Cold. Nothing’s happening yet.</p>';
      },
      init: function (game, art, ctl) {
        var temp = 25, prog = 0, holding = false, last = null, rafId = null, finished = game.done[game.cur];
        var btn = $('#holdHeat', ctl), msg = $('#labMsg', ctl);
        function setHold(v) { holding = v; btn.classList.toggle('holding', v); }
        btn.addEventListener('pointerdown', function (e) { e.preventDefault(); setHold(true); });
        ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { btn.addEventListener(ev, function () { setHold(false); }); });
        btn.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); setHold(true); } });
        btn.addEventListener('keyup', function () { setHold(false); });
        function frame(ts) {
          var dt = last ? Math.min(0.05, (ts - last) / 1000) : 0; last = ts;
          temp += holding ? 70 * dt : -35 * dt;
          temp = Math.max(25, Math.min(190, temp));
          var inZone = temp >= 105 && temp <= 135;
          if (!finished) {
            if (inZone) prog += 30 * dt;
            if (temp > 150) prog -= 25 * dt;
            prog = Math.max(0, Math.min(100, prog));
            msg.textContent = temp > 150 ? 'Too hot! You’re boiling off the terpenes.' : inZone ? 'Perfect. CBDA is converting…' : temp > 60 ? 'Warming up. A little more.' : 'Cold. Nothing’s happening yet.';
            if (prog >= 100) {
              finished = true;
              var c = $('#cooh', art); c.style.transform = 'translate(0, -180px)'; c.style.opacity = '0';
              $('#coohT', art).textContent = 'CO₂';
              var ml = $('#molLabel', art); ml.textContent = 'CBD'; ml.setAttribute('fill', '#2F7A2B');
              game.complete(msg, 'Pop! CO₂ gone, CBDA is now CBD.');
            }
          }
          $('#dTemp', ctl).textContent = Math.round(temp) + ' °C';
          $('#dProg', ctl).style.width = prog + '%';
          var h = 40 + (temp - 25) / 165 * 300;
          var th = $('#dThermo', art); th.setAttribute('height', String(h)); th.setAttribute('y', String(420 - h));
          $('#burner', art).setAttribute('fill', holding ? '#F29A38' : '#777');
          rafId = requestAnimationFrame(frame);
        }
        rafId = requestAnimationFrame(frame);
        return function () { cancelAnimationFrame(rafId); };
      }
    },
    {
      chip: 'Strip THC',
      art: function () {
        return '<svg viewBox="0 0 760 520" aria-label="THC test reading">' +
          '<rect x="0" y="470" width="760" height="50" fill="#D8CDB4"/>' +
          '<rect x="120" y="110" width="120" height="340" rx="16" fill="#9A9A9A" stroke="' + INK + '" stroke-width="6"/>' +
          '<g fill="#C9C9C9" stroke="' + INK + '" stroke-width="3"><rect x="136" y="140" width="88" height="40" rx="6"/><rect x="136" y="200" width="88" height="40" rx="6"/><rect x="136" y="260" width="88" height="40" rx="6"/><rect x="136" y="320" width="88" height="40" rx="6"/></g>' +
          '<path d="M240 160 H330 V220" fill="none" stroke="' + INK + '" stroke-width="10"/><path id="drip1" class="drip" d="M330 226 Q323 239 330 246 Q337 239 330 226 Z" fill="#E8A64A" stroke="' + INK + '" stroke-width="3"/>' +
          '<rect x="420" y="90" width="260" height="300" rx="24" fill="#FBF6EA" stroke="' + INK + '" stroke-width="6"/>' +
          '<text x="550" y="140" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="28" fill="' + INK + '">THC reading</text>' +
          '<text id="thcRead" x="550" y="240" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="80" fill="#B33421">0.62%</text>' +
          '<rect x="450" y="280" width="200" height="30" rx="15" fill="#F5EBD3" stroke="' + INK + '" stroke-width="4"/><rect id="thcBar" x="454" y="284" width="192" height="22" rx="11" fill="#E8553E" style="transition:width .6s"/>' +
          '<text x="550" y="360" text-anchor="middle" font-family="Patrick Hand, sans-serif" font-size="22" fill="#4A4A4A">illustration, not lab data</text>' +
          '<g id="ndStamp" opacity="0" style="transition:opacity .3s"><rect x="455" y="400" width="190" height="64" rx="12" fill="#FBF6EA" stroke="#2F7A2B" stroke-width="6" transform="rotate(-6 550 432)"/><text x="550" y="448" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="38" fill="#2F7A2B" transform="rotate(-6 550 432)">NON-DETECT</text></g>' +
          '</svg>';
      },
      ctl: function () {
        return stationHead(5, 'Distill and ditch the THC', 'Broad-spectrum keeps the CBD, minor cannabinoids, and terpenes. Run passes until THC is non-detect.') +
          '<div class="row"><button class="btn teal" id="passBtn">Run a distillation pass</button><span class="big-num" id="passN">0 passes</span></div>' +
          '<p class="msg" id="labMsg"></p>';
      },
      init: function (game, art, ctl) {
        var lvl = 0.62, passes = 0;
        var MSGS = ['Pass 1: THC dropping.', 'Pass 2: getting there.', 'Pass 3: barely there.', 'Non-detect. Spritz is clean.'];
        $('#passBtn', ctl).addEventListener('click', function () {
          if (game.done[game.cur] && lvl < 0.01) return;
          passes++; lvl *= 0.3;
          var nd = lvl < 0.01;
          $('#thcRead', art).textContent = nd ? 'ND' : lvl.toFixed(2) + '%';
          $('#thcRead', art).setAttribute('fill', nd ? '#2F7A2B' : '#B33421');
          $('#thcBar', art).setAttribute('width', String(Math.max(0, 192 * lvl / 0.62)));
          $('#passN', ctl).textContent = passes + (passes === 1 ? ' pass' : ' passes');
          $('#labMsg', ctl).textContent = MSGS[Math.min(passes, 4) - 1];
          if (nd) { $('#ndStamp', art).setAttribute('opacity', '1'); $('#passBtn', ctl).disabled = true; game.complete($('#labMsg', ctl), 'Non-detect. Spritz is clean.'); }
        });
      }
    },
    {
      chip: 'Bottle',
      art: function () {
        var minis = '';
        for (var i = 0; i < 5; i++) minis += '<rect class="mini" x="' + (430 + i * 62) + '" y="380" width="44" height="74" rx="10" fill="#F5EBD3" stroke="' + INK + '" stroke-width="4" style="transition:fill .3s"/><rect x="' + (442 + i * 62) + '" y="364" width="20" height="18" fill="#E8553E" stroke="' + INK + '" stroke-width="3"/>';
        return '<svg viewBox="0 0 760 520" aria-label="Spray bottle, tap to spritz">' +
          '<rect x="0" y="470" width="760" height="50" fill="#D8CDB4"/>' +
          '<g id="bigBottle" class="clickable" tabindex="0" role="button" aria-label="Spritz the bottle" style="transition:transform .12s">' +
          '<svg x="60" y="60" width="330" height="410" viewBox="0 0 240 300">' + ART.spritz().replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '') + '</svg></g>' +
          '<g id="mistBurst"></g>' + minis +
          '<text x="575" y="330" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="28" fill="' + INK + '">quality check</text>' +
          '</svg>';
      },
      ctl: function () {
        return stationHead(6, 'Blend and bottle', 'Into MCT oil with the plant’s own terpenes, then a metered pump. Tap the bottle to spritz-test 5 bottles.') +
          '<p class="big-num" id="botN">0 / 5 tested</p><p class="msg" id="labMsg"></p>';
      },
      init: function (game, art, ctl) {
        var n = 0, bb = $('#bigBottle', art);
        function spritz() {
          bb.style.transform = 'scale(.97)'; setTimeout(function () { bb.style.transform = ''; }, 120);
          var m = $('#mistBurst', art), g = '';
          for (var i = 0; i < 6; i++) g += '<circle cx="' + (360 + i * 6) + '" cy="' + (128 + (i % 3 - 1) * 14) + '" r="' + (8 + i) + '" fill="#9ED8E0" stroke="' + INK + '" stroke-width="2" style="animation:mistOut .9s ease-out forwards;animation-delay:' + (i * 0.04) + 's;opacity:0"/>';
          m.innerHTML = g;
          if (n < 5) {
            $$('.mini', art)[n].setAttribute('fill', '#E3963E');
            n++;
            $('#botN', ctl).textContent = n + ' / 5 tested';
            if (n === 5) { game.complete($('#labMsg', ctl), 'Batch complete. Spritz happens.'); burstAt(art, 120); }
          }
        }
        bb.addEventListener('click', spritz);
        bb.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); spritz(); } });
      }
    }
  ];
  function gaugeSVG(x, y, id, label) {
    return '<path d="M' + (x - 80) + ' ' + y + ' A80 80 0 0 1 ' + (x + 80) + ' ' + y + '" fill="none" stroke="' + INK + '" stroke-width="16" stroke-linecap="round"/>' +
      '<path d="M' + (x - 80) + ' ' + y + ' A80 80 0 0 1 ' + (x + 80) + ' ' + y + '" fill="none" stroke="#F2C94C" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M' + (x + 4) + ' ' + (y - 80) + ' A80 80 0 0 1 ' + (x + 80) + ' ' + y + '" fill="none" stroke="#3BB3C4" stroke-width="10" stroke-linecap="round"/>' +
      '<line id="' + id + '" x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y - 68) + '" stroke="' + INK + '" stroke-width="7" stroke-linecap="round" style="transform-origin:' + x + 'px ' + y + 'px;transition:transform .3s;transform:rotate(-90deg)"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="10" fill="' + INK + '"/>' +
      '<text x="' + x + '" y="' + (y + 40) + '" text-anchor="middle" font-family="Patrick Hand, sans-serif" font-size="26" fill="' + INK + '">' + label + '</text>';
  }
  var VP = [[0, 34.9], [10, 45.0], [20, 57.3], [31.1, 73.8]];
  function vaporP(t) {
    for (var i = 1; i < VP.length; i++) { if (t <= VP[i][0]) { var a = VP[i - 1], b = VP[i]; return a[1] + (b[1] - a[1]) * (t - a[0]) / (b[0] - a[0]); } }
    return VP[VP.length - 1][1];
  }
  function phaseOf(t, p) { if (t >= 31.1 && p >= 73.8) return 'super'; if (t < 31.1 && p > vaporP(t)) return 'liquid'; return 'gas'; }
  var PHASE = { gas: ['Gas', 'Just a gas. Squeeze harder.'], liquid: ['Liquid', 'Liquid CO₂. Close, but warm it past 31 °C.'], super: ['Supercritical!', 'Dissolves like a liquid, flows like a gas. Extract!'] };
  new StationGame($('#labChips'), $('#labArt'), $('#labCtl'), LAB);

  /* =====================================================================
     SLIDE 8 — coats, microscope, water test
     ===================================================================== */
  (function () {
    var grain = '<g fill="none" stroke="#B48A5E" stroke-width="3.5" stroke-linecap="round"><path d="M46 104 Q160 92 280 108 T554 100"/><path d="M46 132 Q190 120 300 136 T554 128"/><path d="M46 160 Q140 152 260 164 T554 156"/><path d="M46 182 Q200 176 330 186 T554 180"/><ellipse cx="380" cy="142" rx="26" ry="9"/><ellipse cx="380" cy="142" rx="12" ry="4"/></g>';
    $('#wood').innerHTML =
      '<svg viewBox="0 0 600 300" role="img" aria-label="Tabletop being oiled">' +
      '<rect x="70" y="200" width="26" height="96" fill="#A86F38" stroke="' + INK + '" stroke-width="5"/><rect x="504" y="200" width="26" height="96" fill="#A86F38" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="30" y="80" width="540" height="120" rx="12" fill="#D9B488" stroke="' + INK + '" stroke-width="5"/>' + grain +
      '<g id="scratches" stroke="#8B5A2B" stroke-width="3" stroke-linecap="round" style="transition:opacity .6s"><path d="M110 116 l50 14"/><path d="M200 160 l70 -12"/><path d="M420 110 l40 22"/><path d="M470 170 l-50 6"/><path d="M300 120 l30 30"/></g>' +
      '<rect id="oilLayer" x="32" y="82" width="536" height="116" rx="10" fill="#8B4A1E" opacity="0" style="transition:opacity .9s"/>' +
      '<path id="gloss" d="M60 96 L540 96 M80 108 L300 108" stroke="#FFF6E6" stroke-width="6" stroke-linecap="round" opacity="0" style="transition:opacity .9s"/>' +
      '<g id="stain" opacity="0" style="transition:opacity .8s"><ellipse cx="300" cy="140" rx="70" ry="16" fill="#7A4E26" opacity=".7"/></g>' +
      '<g id="bead" opacity="0" style="transition:opacity .4s"><ellipse cx="300" cy="128" rx="22" ry="14" fill="#9ED8E0" stroke="' + INK + '" stroke-width="3"/><path d="M290 122 q4 -4 10 -2" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round"/></g>' +
      '<g id="drop" opacity="0"><path d="M300 0 Q286 22 300 34 Q314 22 300 0 Z" fill="#9ED8E0" stroke="' + INK + '" stroke-width="3"/></g>' +
      '<g id="rag" style="transition:transform .9s ease-in-out;transform:translateX(-160px)"><rect x="40" y="114" width="80" height="50" rx="14" fill="#3BB3C4" stroke="' + INK + '" stroke-width="4" transform="rotate(-8 80 139)"/><path d="M54 130 h52 M54 146 h52" stroke="#2C97A6" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/></g>' +
      '<g id="o2" font-family="Luckiest Guy, Impact, sans-serif" font-size="24" fill="#3A7BD5" opacity="0" style="transition:opacity .5s"><text x="140" y="56">O₂</text><text x="300" y="44">O₂</text><text x="450" y="58">O₂</text></g>' +
      '<text id="dayLbl" x="566" y="30" text-anchor="end" font-family="Permanent Marker, cursive" font-size="24" fill="' + INK + '">Day 0</text>' +
      '</svg>';

    // microscope: four magnified layers
    var cells = '';
    for (var r = 0; r < 4; r++) for (var c = 0; c < 5; c++) cells += '<rect x="' + (40 + c * 72) + '" y="' + (150 + r * 62) + '" width="62" height="52" rx="14" fill="#E9CFA6" stroke="#8B5A2B" stroke-width="4"/>';
    var oilIn = '';
    for (var r2 = 0; r2 < 4; r2++) for (var c2 = 0; c2 < 5; c2++) oilIn += '<rect x="' + (46 + c2 * 72) + '" y="' + (168 + r2 * 62) + '" width="50" height="30" rx="10" fill="#E0A93A" opacity=".85"/>';
    function chain(x, y, cross) {
      return '<path d="M' + x + ' ' + y + ' l14 -10 l14 10 l14 -10 l14 10 l14 -10 l14 10" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M' + (x + 28) + ' ' + (y - 5) + ' l14 -10" stroke="' + (cross ? '#E8553E' : INK) + '" stroke-width="' + (cross ? 4 : 0) + '"/>' +
        '<text x="' + (x + 36) + '" y="' + (y - 16) + '" font-family="Patrick Hand, sans-serif" font-size="16" fill="#B33421">C=C</text>';
    }
    var chains = chain(70, 120, false) + chain(220, 106, false) + chain(150, 80, false);
    var o2s = '<g class="o2float" font-family="Luckiest Guy, Impact, sans-serif" font-size="22" fill="#3A7BD5"><text x="80" y="76">O₂</text><text x="300" y="70">O₂</text><text x="200" y="52">O₂</text></g>';
    var net = '<g stroke="' + INK + '" stroke-width="4" fill="none" stroke-linecap="round">' +
      '<path d="M60 120 l40 -24 l40 24 l40 -24 l40 24 l40 -24 l40 24"/><path d="M60 80 l40 -24 l40 24 l40 -24 l40 24 l40 -24 l40 24"/>' +
      '<path d="M100 96 V56 M180 96 V56 M260 96 V56 M340 96 V56" stroke="#E8553E"/></g>' +
      '<rect x="30" y="128" width="380" height="14" rx="7" fill="#C27A2E" stroke="' + INK + '" stroke-width="3"/>' +
      '<ellipse cx="300" cy="34" rx="30" ry="20" fill="#9ED8E0" stroke="' + INK + '" stroke-width="3"/><path d="M288 28 q6 -6 14 -3" stroke="#FFFFFF" stroke-width="3" fill="none"/>';
    $('#scope').innerHTML =
      '<svg viewBox="0 0 440 440" role="img" aria-label="Microscope view of the wood surface">' +
      '<defs><clipPath id="lens"><circle cx="220" cy="220" r="196"/></clipPath></defs>' +
      '<circle cx="220" cy="220" r="214" fill="#4A4A4A" stroke="' + INK + '" stroke-width="6"/>' +
      '<g clip-path="url(#lens)"><rect x="0" y="0" width="440" height="440" fill="#FFF6E6"/>' + cells +
        '<path d="M150 150 L230 210 L290 150" fill="none" stroke="#6B4423" stroke-width="10" stroke-linecap="round" class="layer-g" id="m0"/>' +
        '<g class="layer-g" id="m1" opacity="0">' + oilIn + chains + '</g>' +
        '<g class="layer-g" id="m2" opacity="0">' + o2s + '<g fill="#F29A38">' + star(118, 104, 0.8) + star(268, 90, 0.8) + star(198, 64, 0.8) + '</g></g>' +
        '<g class="layer-g" id="m3" opacity="0"><rect x="0" y="0" width="440" height="146" fill="#FFF6E6"/>' + net + '</g>' +
      '</g>' +
      '<circle cx="220" cy="220" r="196" fill="none" stroke="' + INK + '" stroke-width="6"/>' +
      '<rect x="160" y="404" width="120" height="30" rx="10" fill="#4A4A4A" stroke="' + INK + '" stroke-width="4"/>' +
      '<text x="220" y="425" text-anchor="middle" font-family="Patrick Hand, sans-serif" font-size="18" fill="#FBF6EA">×1000-ish</text>' +
      '</svg>';

    var STAGES = [
      { day: 'Day 0', msg: 'Scratched, dry, and thirsty. This table has seen things.', h: 'Bare wood', p: 'Open, empty wood cells and a scratch. Water would soak right in.' },
      { day: 'Day 1', msg: 'Coat 1 soaks right in. Thirsty wood.', h: 'Coat 1 · soak', p: 'Oil wicks into the cells. Every long fatty acid chain carries C=C double bonds.' },
      { day: 'Day 2', msg: 'Coat 2: the double bonds grab oxygen from the air.', h: 'Coat 2 · oxidize', p: 'Oxygen attacks the double bonds, and the chains start grabbing onto each other.' },
      { day: 'Day 3', msg: 'Coat 3: cured into a hard film. Grandma approves.', h: 'Coat 3 · cure', p: 'Chains are cross-linked into a tough network inside the grain. Water now beads up.' }
    ];
    var coats = 0, busy = false;
    function paint() {
      var s = STAGES[coats];
      $('#oilLayer').setAttribute('opacity', String(coats * 0.17));
      $('#gloss').setAttribute('opacity', String(coats >= 2 ? (coats - 1) * 0.45 : 0));
      $('#scratches').style.opacity = String(1 - coats * 0.32);
      $('#dayLbl').textContent = s.day;
      $('#coatMsg').textContent = s.msg;
      for (var i = 0; i < 4; i++) {
        var el = $('#m' + i);
        el.setAttribute('opacity', i === 0 ? (coats === 0 ? '1' : '0') : (i <= coats ? '1' : '0'));
      }
      $('#m1').setAttribute('opacity', coats >= 1 && coats < 3 ? '1' : '0');
      $('#m2').setAttribute('opacity', coats === 2 ? '1' : '0');
      $('#scopeCap').innerHTML = '<h3 class="c-orange">' + s.h + '</h3><p>' + s.p + '</p>';
      $$('#coatSteps .cstep').forEach(function (c, i) { c.classList.toggle('on', i === coats); c.classList.toggle('past', i < coats); });
      var cb = $('#coatBtn');
      cb.disabled = coats >= 3;
      cb.textContent = coats >= 3 ? 'Fully cured' : 'Wipe on coat ' + (coats + 1);
      $('#stain').setAttribute('opacity', '0'); $('#bead').setAttribute('opacity', '0');
    }
    $('#coatBtn').addEventListener('click', function () {
      if (coats >= 3 || busy) return;
      busy = true;
      var rag = $('#rag');
      rag.style.transform = 'translateX(440px)';
      if (coats >= 1) $('#o2').setAttribute('opacity', '1');
      setTimeout(function () {
        coats++; paint();
        rag.style.transform = 'translateX(-160px)';
        setTimeout(function () { $('#o2').setAttribute('opacity', '0'); busy = false; }, 900);
        if (coats === 3) burstAt($('#wood'), 80);
      }, reduceMotion ? 50 : 900);
    });
    $('#waterBtn').addEventListener('click', function () {
      var d = $('#drop');
      $('#stain').setAttribute('opacity', '0'); $('#bead').setAttribute('opacity', '0');
      d.setAttribute('opacity', '1');
      d.style.transition = 'none'; d.style.transform = 'translateY(0)';
      void d.getBoundingClientRect();
      d.style.transition = 'transform .6s ease-in'; d.style.transform = 'translateY(100px)';
      setTimeout(function () {
        d.setAttribute('opacity', '0');
        if (coats >= 3) { $('#bead').setAttribute('opacity', '1'); $('#coatMsg').textContent = 'Beads right up. The grain is sealed.'; }
        else { $('#stain').setAttribute('opacity', '1'); $('#coatMsg').textContent = coats === 0 ? 'Soaked straight in. That’s a water ring waiting to happen.' : 'Still soaking in. Not cured yet.'; }
      }, reduceMotion ? 50 : 600);
    });
    $('#sandBtn').addEventListener('click', function () { coats = 0; paint(); });
    paint();
  })();
  $$('[data-quiz]').forEach(function (b) {
    b.addEventListener('click', function () {
      var right = b.getAttribute('data-quiz') === 'no';
      $('#quizOut').innerHTML = right
        ? '<b class="c-green">Correct.</b> CBD comes from resin on the flowers. Seed oil has trace cannabinoids at best.'
        : '<b class="c-red">Nope.</b> Seeds carry trace cannabinoids at best. Anyone selling seed oil as CBD oil is counting on you not knowing.';
      if (right) burstAt(b, 30);
    });
  });

  /* =====================================================================
     SLIDE 9 — stalk to towel mill
     ===================================================================== */
  function fieldArt(stage) {
    var s = '<svg viewBox="0 0 760 520" aria-label="Fiber hemp field, ' + stage + '"><rect x="0" y="0" width="760" height="420" fill="#CFEAF2"/><rect x="0" y="420" width="760" height="100" fill="#A86F38"/>';
    var h = stage === 'veg' ? 190 : 330;
    for (var x = 70; x <= 690; x += 62) {
      var top = 420 - h - (x * 13 % 30);
      var col = stage === 'seed' ? '#B5A25A' : '#8DBF5A';
      s += '<path d="M' + x + ' 420 L' + x + ' ' + top + '" stroke="' + INK + '" stroke-width="' + (stage === 'seed' ? 16 : 11) + '" stroke-linecap="round"/><path d="M' + x + ' 420 L' + x + ' ' + top + '" stroke="' + col + '" stroke-width="' + (stage === 'seed' ? 9 : 5) + '" stroke-linecap="round"/>';
      s += leafAt(x, top + 30, stage === 'veg' ? 0.32 : 0.22, 0, stage === 'seed' ? '#A8B35A' : '#5DAE4B');
      if (stage === 'flower') s += '<ellipse cx="' + x + '" cy="' + (top - 4) + '" rx="10" ry="14" fill="#CDEBC0" stroke="' + INK + '" stroke-width="3"/>';
      if (stage === 'seed') for (var k = 0; k < 4; k++) s += '<ellipse cx="' + (x - 9 + (k % 2) * 18) + '" cy="' + (top - 8 + Math.floor(k / 2) * 14) + '" rx="7" ry="9" fill="#8C6B45" stroke="' + INK + '" stroke-width="2"/>';
    }
    return s + '<text x="380" y="480" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="32" fill="#FBF6EA">' + ({ veg: 'Vegetative', flower: 'Early flowering', seed: 'Seed set' })[stage] + '</text></svg>';
  }
  function bastPiece() { return '<g><path d="M-120 -10 Q-60 -30 0 -8 T120 -12" fill="none" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/><path d="M-120 -10 Q-60 -30 0 -8 T120 -12" fill="none" stroke="#9BD07A" stroke-width="6" stroke-linecap="round"/><path d="M-120 10 Q-60 -8 0 12 T120 8" fill="none" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/><path d="M-120 10 Q-60 -8 0 12 T120 8" fill="none" stroke="#B9E39A" stroke-width="6" stroke-linecap="round"/></g>'; }
  function hurdPiece() { return '<g><polygon points="-50,-30 20,-38 52,-6 38,30 -30,36 -56,6" fill="#E3C789" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/><path d="M-30 -10 L20 -16 M-24 10 L28 6" stroke="#B89A5A" stroke-width="4" stroke-linecap="round"/></g>'; }
  var MILL = [
    {
      chip: 'When to cut',
      art: function () { return fieldArt('veg'); },
      ctl: function () {
        return stationHead(1, 'When do we cut?', 'Fiber quality depends on timing. Pick a harvest day.') +
          '<div class="row"><button class="btn alt" data-st="veg">Vegetative</button><button class="btn alt" data-st="flower">Early flowering</button><button class="btn alt" data-st="seed">Seed set</button></div>' +
          '<p class="msg" id="millMsg"></p>';
      },
      init: function (game, art, ctl) {
        var M = { veg: 'Too early. Fine fiber, but barely any of it.', seed: 'Too late. Coarse secondary fiber. That towel would exfoliate you without asking.', flower: 'Sweet spot. Long, fine, low-lignin primary bast fiber.' };
        $$('[data-st]', ctl).forEach(function (b) {
          b.addEventListener('click', function () {
            var st = b.getAttribute('data-st');
            art.innerHTML = fieldArt(st);
            var msg = $('#millMsg', ctl);
            msg.textContent = M[st];
            msg.className = 'msg ' + (st === 'flower' ? 'c-green' : 'c-red');
            if (st === 'flower') game.complete();
          });
        });
      }
    },
    {
      chip: 'Decorticate',
      art: function () {
        return '<svg viewBox="0 0 760 520" aria-label="Decorticator cracking a hemp stalk">' +
          '<rect x="0" y="470" width="760" height="50" fill="#D8CDB4"/>' +
          '<g id="stalkIn" style="transition:transform .5s"><rect x="40" y="186" width="300" height="28" rx="14" fill="#B5A25A" stroke="' + INK + '" stroke-width="5"/></g>' +
          '<g id="rollA" style="transform-origin:380px 150px;transition:transform .5s"><circle cx="380" cy="150" r="56" fill="#9A9A9A" stroke="' + INK + '" stroke-width="6"/><path d="M380 94 V206 M324 150 H436 M340 110 L420 190 M420 110 L340 190" stroke="' + INK + '" stroke-width="4"/></g>' +
          '<g id="rollB" style="transform-origin:380px 262px;transition:transform .5s"><circle cx="380" cy="262" r="56" fill="#9A9A9A" stroke="' + INK + '" stroke-width="6"/><path d="M380 206 V318 M324 262 H436 M340 222 L420 302 M420 222 L340 302" stroke="' + INK + '" stroke-width="4"/></g>' +
          '<rect x="300" y="60" width="160" height="300" rx="20" fill="none" stroke="' + INK + '" stroke-width="5" stroke-dasharray="12 8"/>' +
          '<g id="bastPile"></g><g id="hurdPile"></g>' +
          '<text x="560" y="300" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="26" fill="#2F7A2B">bast</text><text x="660" y="300" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="26" fill="#B04F06">hurd</text>' +
          '</svg>';
      },
      ctl: function () {
        return stationHead(2, 'Decorticate', 'Gilroy’s too dry to dew-ret, so the machine cracks the stalk apart: long bast fiber one way, woody hurd the other.') +
          '<div class="row"><button class="btn" id="crank">Crank it!</button><span class="big-num" id="crankN">0 / 4</span></div><p class="msg" id="millMsg"></p>';
      },
      init: function (game, art, ctl) {
        var n = 0, rot = 0;
        $('#crank', ctl).addEventListener('click', function () {
          if (n >= 4) return;
          n++; rot += 180;
          $('#rollA', art).style.transform = 'rotate(' + rot + 'deg)';
          $('#rollB', art).style.transform = 'rotate(' + (-rot) + 'deg)';
          $('#stalkIn', art).style.transform = 'translateX(' + (n * 70) + 'px)';
          var bp = $('#bastPile', art), hp = $('#hurdPile', art);
          bp.insertAdjacentHTML('beforeend', '<g transform="translate(560 ' + (440 - n * 18) + ') scale(.45)"><g style="animation:fall .4s ease-out">' + bastPiece() + '</g></g>');
          for (var k = 0; k < 2; k++) hp.insertAdjacentHTML('beforeend', '<g transform="translate(' + (640 + k * 40) + ' ' + (444 - n * 20) + ') scale(.42) rotate(' + (n * 37 + k * 50) + ')"><g style="animation:fall .4s ease-out">' + hurdPiece() + '</g></g>');
          $('#crankN', ctl).textContent = n + ' / 4';
          if (n === 4) game.complete($('#millMsg', ctl), 'Cracked! Now sort the pieces.');
          else $('#millMsg', ctl).textContent = ['Crunch.', 'Crunch crunch.', 'Almost through.'][n - 1];
        });
      }
    },
    {
      chip: 'Sort',
      art: function () {
        return '<svg viewBox="0 0 760 520" aria-label="Sorting conveyor">' +
          '<rect x="40" y="250" width="680" height="40" rx="20" fill="#4A4A4A" stroke="' + INK + '" stroke-width="5"/><g fill="#9A9A9A"><circle cx="80" cy="270" r="12"/><circle cx="680" cy="270" r="12"/><circle cx="380" cy="270" r="12"/></g>' +
          '<g transform="translate(380 200)"><g id="piece" style="transition:transform .45s ease-in, opacity .45s"></g></g>' +
          '<g transform="translate(170 400)"><path d="M-110 -50 L110 -50 L90 80 L-90 80 Z" fill="#3BB3C4" stroke="' + INK + '" stroke-width="5"/><text y="20" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="30" fill="' + INK + '">TOWEL BIN</text><text y="52" text-anchor="middle" font-family="Patrick Hand, sans-serif" font-size="22" fill="' + INK + '">bast fiber</text></g>' +
          '<g transform="translate(590 400)"><path d="M-110 -50 L110 -50 L90 80 L-90 80 Z" fill="#F2C94C" stroke="' + INK + '" stroke-width="5"/><text y="20" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="30" fill="' + INK + '">BEDDING BIN</text><text y="52" text-anchor="middle" font-family="Patrick Hand, sans-serif" font-size="22" fill="' + INK + '">hurd</text></g>' +
          '</svg>';
      },
      ctl: function () {
        return stationHead(3, 'Sort it', 'Long, stringy bast goes to towels. Chunky, woody hurd goes to animal bedding.') +
          '<div class="sortbins"><button class="btn teal" data-bin="bast">Towel bin</button><button class="btn" data-bin="hurd">Bedding bin</button></div>' +
          '<p class="big-num" id="sortN">0 / 10 sorted</p><p class="msg" id="millMsg"></p>';
      },
      init: function (game, art, ctl) {
        var seq = ['bast', 'hurd', 'hurd', 'bast', 'hurd', 'hurd', 'bast', 'hurd', 'hurd', 'hurd'];
        var i = 0, right = 0, lock = false;
        var piece = $('#piece', art);
        function showPiece() {
          piece.style.transition = 'none'; piece.style.opacity = '1';
          piece.style.transform = '';
          piece.innerHTML = seq[i] === 'bast' ? bastPiece() : hurdPiece();
        }
        showPiece();
        $$('[data-bin]', ctl).forEach(function (b) {
          b.addEventListener('click', function () {
            if (lock || i >= seq.length) return;
            var want = seq[i], pick = b.getAttribute('data-bin'), msg = $('#millMsg', ctl);
            if (pick !== want) { msg.textContent = want === 'bast' ? 'That’s bast. Long and stringy, towel material.' : 'That’s hurd. Too woody for a towel, perfect for a horse stall.'; msg.className = 'msg c-red'; b.classList.remove('wiggle'); void b.offsetWidth; b.classList.add('wiggle'); return; }
            right++; lock = true;
            msg.textContent = want === 'bast' ? 'Towel fiber!' : 'Bedding!'; msg.className = 'msg c-green';
            piece.style.transition = 'transform .45s ease-in, opacity .45s';
            piece.style.transform = 'translate(' + (want === 'bast' ? -210 : 210) + 'px, 190px) scale(.4)';
            piece.style.opacity = '0';
            setTimeout(function () {
              if (!document.body.contains(piece)) return;
              i++; lock = false;
              $('#sortN', ctl).textContent = i + ' / 10 sorted';
              if (i < seq.length) showPiece();
              else game.complete(msg, '3 bast to 7 hurd, about like the real thing: roughly 3 t bast and 7 t hurd per hectare.');
            }, reduceMotion ? 30 : 470);
          });
        });
      }
    },
    {
      chip: 'Blend',
      art: function () {
        return '<svg viewBox="0 0 760 520" aria-label="Hemp and cotton blending into yarn">' +
          '<rect x="0" y="470" width="760" height="50" fill="#D8CDB4"/>' +
          '<g id="hempPile" style="transform-origin:170px 460px;transition:transform .2s"><ellipse cx="170" cy="400" rx="120" ry="70" fill="#9BD07A" stroke="' + INK + '" stroke-width="5"/><path d="M90 400 q30 -30 60 0 t60 0 t60 0" fill="none" stroke="#5E8F33" stroke-width="4"/></g>' +
          '<g id="cottonPile" style="transform-origin:590px 460px;transition:transform .2s"><circle cx="550" cy="400" r="50" fill="#FFFFFF" stroke="' + INK + '" stroke-width="5"/><circle cx="610" cy="390" r="56" fill="#FFFFFF" stroke="' + INK + '" stroke-width="5"/><circle cx="580" cy="350" r="44" fill="#FFFFFF" stroke="' + INK + '" stroke-width="5"/></g>' +
          '<text x="170" y="300" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="28" fill="#2F7A2B">hemp</text><text x="590" y="280" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="28" fill="' + INK + '">cotton</text>' +
          '<path d="M260 360 Q330 200 370 160 M500 360 Q430 200 390 160" fill="none" stroke="' + INK + '" stroke-width="4" stroke-dasharray="10 8"/>' +
          '<g transform="translate(380 120)"><rect x="-70" y="-60" width="140" height="20" rx="6" fill="#A86F38" stroke="' + INK + '" stroke-width="4"/><rect x="-70" y="40" width="140" height="20" rx="6" fill="#A86F38" stroke="' + INK + '" stroke-width="4"/><rect id="yarn" x="-56" y="-40" width="112" height="80" fill="#C9E7B5" stroke="' + INK + '" stroke-width="4"/>' +
          '<path d="M-56 -24 H56 M-56 -8 H56 M-56 8 H56 M-56 24 H56" stroke="#FFFFFF" stroke-width="4" opacity=".7"/></g>' +
          '</svg>';
      },
      ctl: function () {
        return stationHead(4, 'Blend it', 'Hemp brings strength and absorbency. Cotton brings softness. Find a blend that does all three.') +
          '<div class="field"><label for="hempPct">Hemp in the blend <output id="hempO">20%</output></label><input type="range" id="hempPct" min="0" max="100" value="20"></div>' +
          '<div class="meters">' +
            '<div class="meter"><span>Strength</span><div class="track"><div class="fill" id="bStr" style="background:var(--green)"></div></div></div>' +
            '<div class="meter"><span>Absorbency</span><div class="track"><div class="fill" id="bAbs" style="background:var(--teal)"></div></div></div>' +
            '<div class="meter"><span>Softness</span><div class="track"><div class="fill" id="bSoft" style="background:var(--purple)"></div></div></div>' +
          '</div>' +
          '<div class="row"><button class="btn green" id="lockBlend" disabled>Lock in this blend</button></div><p class="msg" id="millMsg"></p>';
      },
      init: function (game, art, ctl) {
        var R = $('#hempPct', ctl);
        function upd() {
          var h = +R.value;
          $('#hempO', ctl).textContent = h + '%';
          $('#bStr', ctl).style.width = (25 + h * 0.7) + '%';
          $('#bAbs', ctl).style.width = (30 + h * 0.6) + '%';
          $('#bSoft', ctl).style.width = Math.max(8, 100 - h * 0.8) + '%';
          $('#hempPile', art).style.transform = 'scale(' + (0.4 + h / 100 * 0.8) + ')';
          $('#cottonPile', art).style.transform = 'scale(' + (0.4 + (100 - h) / 100 * 0.8) + ')';
          var g = Math.round(255 - h * 1.0), col = 'rgb(' + Math.round(255 - h * 1.1) + ',' + Math.round(255 - h * 0.45) + ',' + g + ')';
          $('#yarn', art).setAttribute('fill', col);
          var ok = h >= 40 && h <= 60;
          if (!game.done[game.cur]) {
            $('#lockBlend', ctl).disabled = !ok;
            var msg = $('#millMsg', ctl);
            msg.textContent = h < 40 ? 'Soft, but it’ll wear out and stay soggy.' : h > 60 ? 'Strong and thirsty, but a little scratchy.' : 'Balanced: strong, thirsty, still soft.';
            msg.className = 'msg ' + (ok ? 'c-green' : '');
          }
        }
        R.addEventListener('input', upd); upd();
        $('#lockBlend', ctl).addEventListener('click', function () { $('#lockBlend', ctl).disabled = true; R.disabled = true; game.complete($('#millMsg', ctl), 'Blend locked. Off to the loom.'); });
      }
    },
    {
      chip: 'Weave',
      art: function () {
        return '<svg viewBox="0 0 760 520" aria-label="Loom weaving a towel">' +
          '<rect x="0" y="470" width="760" height="50" fill="#D8CDB4"/>' +
          '<rect x="190" y="40" width="380" height="24" rx="8" fill="#A86F38" stroke="' + INK + '" stroke-width="5"/><rect x="190" y="420" width="380" height="24" rx="8" fill="#A86F38" stroke="' + INK + '" stroke-width="5"/>' +
          '<g stroke="#C9C9C9" stroke-width="3">' + (function () { var s = ''; for (var x = 220; x <= 540; x += 20) s += '<path d="M' + x + ' 64 V420"/>'; return s; })() + '</g>' +
          '<g id="rows"></g><g id="towelDone" opacity="0" style="transition:opacity .6s"></g>' +
          '</svg>';
      },
      ctl: function () {
        return stationHead(5, 'Weave the terry', 'A partner mill weaves the hemp-cotton yarn into thirsty terry loops. Tap Weave until the towel is done.') +
          '<div class="row"><button class="btn teal" id="weave">Weave!</button><span class="big-num" id="weaveN">0%</span></div><p class="msg" id="millMsg"></p>';
      },
      init: function (game, art, ctl) {
        var n = 0, total = 6;
        $('#weave', ctl).addEventListener('click', function () {
          if (n >= total) return;
          var rows = $('#rows', art), s = '';
          for (var k = 0; k < 2; k++) {
            var y = 400 - (n * 2 + k) * 28;
            var stripe = (n * 2 + k) === 1 || (n * 2 + k) === 9;
            s += '<rect x="214" y="' + (y - 26) + '" width="332" height="26" fill="' + (stripe ? '#FBF6EA' : '#3BB3C4') + '" stroke="' + INK + '" stroke-width="2" style="animation:fall .3s ease-out"/>';
            if (!stripe) s += '<path d="M226 ' + (y - 13) + ' q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0 m12 0 q4 5 8 0" fill="none" stroke="#7FD3DE" stroke-width="2"/>';
          }
          rows.insertAdjacentHTML('beforeend', s);
          n++;
          $('#weaveN', ctl).textContent = Math.round(n / total * 100) + '%';
          if (n === total) {
            setTimeout(function () {
              rows.setAttribute('opacity', '0');
              var td = $('#towelDone', art);
              td.innerHTML = '<svg x="210" y="80" width="340" height="330" viewBox="0 0 270 260">' + ART.towel().replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '') + '</svg>';
              td.setAttribute('opacity', '1');
              burstAt(art, 120);
            }, reduceMotion ? 50 : 500);
            game.complete($('#millMsg', ctl), 'Dry Humor is born. And the hurd? Off to a horse stall.');
          }
        });
      }
    }
  ];
  new StationGame($('#millChips'), $('#millArt'), $('#millCtl'), MILL);

  /* =====================================================================
     SLIDE 10 — rule cards that shuffle front to back
     ===================================================================== */
  (function () {
    var deck = $('#ruleDeck');
    var cards = {};
    $$('.rcard', deck).forEach(function (c) { cards[c.getAttribute('data-k')] = c; });
    var order = ['fed', 'ca', 'cty', 'sj'];
    var busy = false;
    function layout() {
      order.forEach(function (k, i) {
        var c = cards[k];
        c.style.zIndex = String(10 - i);
        c.style.transform = 'translate(' + (i * 22) + 'px,' + (i * 20) + 'px) rotate(' + (i * 1.6) + 'deg)';
        c.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
        c.tabIndex = i === 0 ? 0 : -1;
      });
      $$('#ruleTabs button').forEach(function (b) { b.setAttribute('aria-current', String(b.getAttribute('data-k') === order[0])); });
    }
    function sendBack() {
      if (busy) return;
      busy = true;
      var front = cards[order[0]];
      front.classList.add('toss');
      setTimeout(function () {
        order.push(order.shift());
        front.classList.remove('toss');
        layout();
        busy = false;
      }, reduceMotion ? 20 : 320);
    }
    function bringFront(k) {
      if (order[0] === k || busy) return;
      while (order[0] !== k) order.push(order.shift());
      layout();
    }
    $$('.rcard', deck).forEach(function (c) {
      c.addEventListener('click', function () {
        var k = c.getAttribute('data-k');
        if (order[0] === k) sendBack(); else bringFront(k);
      });
    });
    $$('#ruleTabs button').forEach(function (b) { b.addEventListener('click', function () { bringFront(b.getAttribute('data-k')); }); });
    layout();
  })();
  (function countdown() {
    var target = new Date(2026, 11, 11, 0, 0, 0);
    var days = Math.ceil((target - new Date()) / 86400000);
    var el = $('#days');
    if (days > 0) { el.textContent = days; }
    else { el.textContent = '0'; el.nextElementSibling.textContent = 'The total-THC hemp definition took effect on 11 Dec 2026.'; }
  })();

  /* =====================================================================
     SLIDE 11 — nothing gets wasted flow
     ===================================================================== */
  (function () {
    function inner(svg) { return svg.replace(/^<svg[^>]*viewBox="([^"]*)"[^>]*>/, '').replace(/<\/svg>$/, ''); }
    function vb(svg) { var m = /viewBox="([^"]*)"/.exec(svg); return m ? m[1] : '0 0 200 200'; }
    function icon(svg, x, y, w, h) { return '<svg x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" viewBox="' + vb(svg) + '">' + inner(svg) + '</svg>'; }
    var chick = '<svg viewBox="0 0 120 110"><g stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"><path d="M10 96 Q60 70 110 96 L110 106 L10 106 Z" fill="#E3C789"/><path d="M20 92 l10 -14 M40 88 l6 -16 M70 86 l-4 -16 M92 90 l-8 -14" stroke="#B89A5A" fill="none"/><ellipse cx="60" cy="62" rx="30" ry="26" fill="#FBF6EA"/><circle cx="78" cy="38" r="16" fill="#FBF6EA"/><path d="M74 22 q4 -10 8 0 q4 -10 8 0" fill="#E8553E"/><path d="M92 40 l12 4 l-12 4 Z" fill="#F29A38"/><path d="M40 58 q10 10 24 4" fill="none"/></g><circle cx="82" cy="36" r="3" fill="' + INK + '"/></svg>';
    var trough = '<svg viewBox="0 0 120 100"><g stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"><path d="M10 40 L110 40 L96 86 L24 86 Z" fill="#A86F38"/><ellipse cx="60" cy="40" rx="50" ry="10" fill="#C98B4F"/></g><g fill="#8C6B45" stroke="' + INK + '" stroke-width="2"><circle cx="40" cy="36" r="6"/><circle cx="56" cy="32" r="6"/><circle cx="72" cy="36" r="6"/><circle cx="84" cy="32" r="5"/></g></svg>';
    var compost = '<svg viewBox="0 0 120 100"><path d="M10 90 Q60 20 110 90 Z" fill="#7A5A36" stroke="' + INK + '" stroke-width="4"/><path d="M60 50 q-6 -20 6 -30 q10 12 -6 30" fill="#6CC070" stroke="' + INK + '" stroke-width="3"/></svg>';
    var plantIcon = ART.leaf();
    var cakeIcon = '<svg viewBox="0 0 120 100"><g stroke="' + INK + '" stroke-width="4"><rect x="16" y="40" width="88" height="46" rx="10" fill="#A8835A"/><rect x="16" y="30" width="88" height="20" rx="10" fill="#C9A06E"/></g><g fill="#7A5A36"><circle cx="40" cy="62" r="4"/><circle cx="64" cy="70" r="4"/><circle cx="84" cy="58" r="4"/></g></svg>';
    var hurdIcon = '<svg viewBox="0 0 120 100"><g transform="translate(40 50) scale(.5)">' + hurdPiece() + '</g><g transform="translate(80 60) scale(.42) rotate(40)">' + hurdPiece() + '</g></svg>';
    var fiberIcon = '<svg viewBox="0 0 120 100"><g transform="translate(60 50) scale(.42)">' + bastPiece() + '</g></svg>';
    var flowerIcon = '<svg viewBox="0 0 120 120">' + bud(60, 64, 26, '#8DBF5A', true, false) + '</svg>';
    var seedIcon = '<svg viewBox="0 0 120 100"><g fill="#A8835A" stroke="' + INK + '" stroke-width="3"><ellipse cx="44" cy="50" rx="14" ry="18"/><ellipse cx="74" cy="44" rx="14" ry="18"/><ellipse cx="62" cy="70" rx="14" ry="18"/></g></svg>';
    var N = {
      plant:  { x: 24,  y: 270, w: 226, h: 110, label: 'Hemp plant', ic: plantIcon },
      flower: { x: 300, y: 40,  w: 190, h: 90, label: 'Flower', ic: flowerIcon },
      spritz: { x: 580, y: 40,  w: 240, h: 90, label: 'Spritz Happens', ic: ART.spritz(), prod: true },
      seed:   { x: 300, y: 250, w: 190, h: 90, label: 'Seed', ic: seedIcon },
      grain:  { x: 580, y: 190, w: 240, h: 90, label: 'Grain Damage', ic: ART.grain(), prod: true },
      cake:   { x: 580, y: 310, w: 240, h: 90, label: 'Seed cake', ic: cakeIcon, left: true },
      feed:   { x: 862, y: 310, w: 250, h: 90, label: 'Livestock feed', ic: trough, rd: true },
      stalk:  { x: 300, y: 470, w: 190, h: 90, label: 'Stalk', ic: fiberIcon },
      towel:  { x: 580, y: 430, w: 240, h: 90, label: 'Dry Humor', ic: ART.towel(), prod: true },
      hurd:   { x: 580, y: 538, w: 240, h: 78, label: 'Hurd', ic: hurdIcon, left: true },
      bedding:{ x: 862, y: 460, w: 250, h: 130, label: 'Bedding', ic: chick, rd: true }
    };
    var EDGES = [['plant', 'flower'], ['flower', 'spritz'], ['plant', 'seed'], ['seed', 'grain'], ['seed', 'cake'], ['cake', 'feed'], ['plant', 'stalk'], ['stalk', 'towel'], ['stalk', 'hurd'], ['hurd', 'bedding']];
    var INFO = {
      plant: ['One plant, every part', 'Most hemp companies use one part and leave the rest in the field. We built the company around using all of it.'],
      flower: ['Flower', 'Trichomes on unpollinated female flowers make CBDA, our CBD source.'],
      spritz: ['Spritz Happens', 'Broad-spectrum CBD mouth spray. Same dose every pump.'],
      seed: ['Seed', 'About 30% oil, plus protein.'],
      grain: ['Grain Damage', 'Cold-pressed hemp seed oil wood finish.'],
      cake: ['Leftover: seed cake', 'What’s left after pressing the oil is high in protein. Most of it usually gets tossed or sold cheap.'],
      feed: ['Next: livestock feed', 'Seed cake as a protein feed for livestock, once the feed approvals catch up. In R&D.'],
      stalk: ['Stalk', 'Long bast fiber outside, woody hurd inside. About 3 t bast and 7 t hurd per hectare.'],
      towel: ['Dry Humor', 'Hemp-cotton bath towels from the bast fiber.'],
      hurd: ['Leftover: hurd', 'The woody core is most of the stalk by weight. Too stiff for a towel, and very absorbent.'],
      bedding: ['Next: animal bedding', 'Hurd makes absorbent, low-dust bedding for horses and poultry. My personal favorite.'],
      compost: ['Then back to the field', 'Used bedding composts and goes back onto the farm we grow on. The loop closes.']
    };
    function cx(n, side) { return side === 'r' ? n.x + n.w : side === 'l' ? n.x : n.x + n.w / 2; }
    function cy(n) { return n.y + n.h / 2; }
    var mk = 'arr' + (++uid);
    var s = '<svg viewBox="0 0 1120 640" role="group" aria-label="How every part of the hemp plant gets used"><defs><marker id="' + mk + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="' + INK + '"/></marker></defs>';
    EDGES.forEach(function (e, i) {
      var a = N[e[0]], b = N[e[1]];
      var x1 = cx(a, 'r'), y1 = cy(a), x2 = cx(b, 'l') - 6, y2 = cy(b), mx = (x1 + x2) / 2;
      s += '<path class="fline" fill="none" stroke="' + INK + '" stroke-width="5" id="fe' + i + '" d="M' + x1 + ' ' + y1 + ' C' + mx + ' ' + y1 + ' ' + mx + ' ' + y2 + ' ' + x2 + ' ' + y2 + '" marker-end="url(#' + mk + ')"/>';
    });
    var bd = N.bedding, pl = N.plant;
    s += '<path class="fline" fill="none" stroke="' + INK + '" stroke-width="5" id="feC" d="M' + (bd.x + bd.w / 2) + ' ' + (bd.y + bd.h) + ' Q' + (bd.x + bd.w / 2) + ' 628 820 628 L180 628 Q' + (pl.x + pl.w / 2) + ' 628 ' + (pl.x + pl.w / 2) + ' ' + (pl.y + pl.h + 8) + '" marker-end="url(#' + mk + ')" stroke-dasharray="4 10"/>';
    s += '<g class="fnode" data-k="compost" tabindex="0" role="button" aria-label="Compost"><rect class="fbox" x="380" y="608" width="200" height="32" rx="20" fill="#FBF6EA" stroke="' + INK + '" stroke-width="4"/>' + icon(compost, 390, 610, 34, 28) + '<text x="500" y="631" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="22" fill="' + INK + '">compost</text></g>';
    Object.keys(N).forEach(function (k) {
      var n = N[k];
      var fill = n.prod ? '#FBF6EA' : n.rd ? '#EFE3FA' : n.left ? '#FFF6E6' : '#F5EBD3';
      var ih = Math.min(n.h - 16, k === 'bedding' ? 96 : 66), iw = ih, iy = n.y + (n.h - ih) / 2;
      s += '<g class="fnode' + (n.left ? ' leftover' : '') + '" data-k="' + k + '" tabindex="0" role="button" aria-label="' + n.label + '">' +
        '<rect class="fbox" x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="18" fill="' + fill + '" stroke="' + INK + '" stroke-width="4"/>' +
        icon(n.ic, n.x + 10, iy, iw, ih) +
        '<text x="' + (n.x + iw + 18) + '" y="' + (n.y + n.h / 2 + 2) + '" font-family="Permanent Marker, cursive" font-size="' + (n.label.length > 12 ? 21 : 24) + '" fill="' + INK + '">' + n.label + '</text>' +
        (n.left ? '<text x="' + (n.x + iw + 18) + '" y="' + (n.y + n.h / 2 + 26) + '" font-family="Patrick Hand, sans-serif" font-size="19" fill="#B04F06">leftover</text>' : '') +
        (n.rd ? '<text x="' + (n.x + iw + 18) + '" y="' + (n.y + n.h / 2 + 26) + '" font-family="Patrick Hand, sans-serif" font-size="19" fill="#6A2BA3">in R&amp;D</text>' : '') +
        (n.prod ? '<text x="' + (n.x + iw + 18) + '" y="' + (n.y + n.h / 2 + 26) + '" font-family="Patrick Hand, sans-serif" font-size="19" fill="#2F7A2B">product</text>' : '') +
        '</g>';
    });
    s += '</svg>';
    $('#flow').innerHTML = s;
    function pick(k) {
      $$('.fnode').forEach(function (g) { g.classList.toggle('on', g.getAttribute('data-k') === k); });
      var t = INFO[k];
      $('#flowCap').innerHTML = '<h3 class="c-purple">' + t[0] + '</h3><p>' + t[1] + '</p>';
    }
    $$('.fnode').forEach(function (g) {
      g.addEventListener('click', function () { pick(g.getAttribute('data-k')); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); pick(g.getAttribute('data-k')); } });
    });
    pick('plant');
    var timers = [];
    $('#flowPlay').addEventListener('click', function () {
      timers.forEach(clearTimeout); timers = [];
      $$('.fline').forEach(function (l) { l.classList.remove('flowing'); });
      var seq = [['plant', null], ['flower', 0], ['spritz', 1], ['seed', 2], ['grain', 3], ['cake', 4], ['feed', 5], ['stalk', 6], ['towel', 7], ['hurd', 8], ['bedding', 9], ['compost', 'C']];
      seq.forEach(function (st, i) {
        timers.push(setTimeout(function () {
          if (st[1] !== null) $('#fe' + st[1]).classList.add('flowing');
          pick(st[0]);
          if (st[0] === 'compost') burstAt($('#flow'), 60);
        }, i * (reduceMotion ? 300 : 1100)));
      });
    });
  })();

  /* =====================================================================
     SLIDE 12 — market counter
     ===================================================================== */
  enterHooks[11] = function () {
    countUp($('#money'), 739, 1400, function (v) { return '$' + v + 'M'; });
  };

  /* =====================================================================
     SLIDE 13 — fixes + the two-stool crash demo
     ===================================================================== */
  $$('.fix').forEach(function (f) {
    f.addEventListener('click', function () { f.classList.toggle('open'); if (f.classList.contains('open')) burstAt(f, 16); });
  });
  (function () {
    function nest(svg, x, y, w, h) { var m = /viewBox="([^"]*)"/.exec(svg); return '<svg x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" viewBox="' + m[1] + '">' + svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '') + '</svg>'; }
    var LEGC = ['#E8553E', '#3BB3C4', '#F29A38', '#8E44C9'];
    var LEGN = ['CBD', 'Fiber', 'Seed oil', 'Rec'];
    var BX = [412, 474, 546, 608];
    function leg(x, col, i, pre) {
      return '<rect x="' + x + '" y="142" width="22" height="128" rx="4" fill="' + col + '" stroke="' + INK + '" stroke-width="4"/>' +
        '<path id="' + pre + 'crack' + i + '" d="M' + (x - 4) + ' 196 l10 -8 l6 10 l10 -8" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round" opacity="0"/>';
    }
    var s = '<svg viewBox="0 0 760 330" role="img" aria-label="A one-legged stool for a one-lane company next to a four-legged stool for Bad Seed">' +
      '<rect x="0" y="270" width="760" height="6" fill="' + INK + '"/>' +
      '<text x="170" y="22" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="24" fill="' + INK + '">One-lane CBD brand</text>' +
      '<text x="530" y="22" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="24" fill="' + INK + '">Bad Seed Botanicals</text>' +
      '<g id="stA" class="stool-g" style="transform-origin:170px 270px">' +
        '<rect x="90" y="120" width="160" height="22" rx="10" fill="#C98B4F" stroke="' + INK + '" stroke-width="4"/>' + leg(159, LEGC[0], 0, 'a') +
        nest(ART.bag(), 130, 36, 80, 88) +
      '</g>' +
      '<g id="stB" class="stool-g" style="transform-origin:530px 270px">' +
        '<rect x="392" y="120" width="260" height="22" rx="10" fill="#C98B4F" stroke="' + INK + '" stroke-width="4"/>' +
        BX.map(function (x, i) { return leg(x, LEGC[i], i, 'b'); }).join('') +
        nest(ART.seedy(), 486, 30, 76, 88) +
      '</g>' +
      BX.map(function (x, i) { return '<text x="' + (x + 11) + '" y="296" text-anchor="middle" font-family="Patrick Hand, sans-serif" font-size="19" fill="' + INK + '">' + LEGN[i] + '</text>'; }).join('') +
      '<text x="170" y="296" text-anchor="middle" font-family="Patrick Hand, sans-serif" font-size="19" fill="' + INK + '">CBD</text>' +
      '<text id="valA" x="170" y="326" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="26" fill="' + INK + '">100% standing</text>' +
      '<text id="valB" x="530" y="326" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="26" fill="' + INK + '">100% standing</text>' +
      '<g id="bolts"></g></svg>';
    $('#stools').innerHTML = s;
    var crashed = [false, false, false, false];
    function bolt(x) {
      var g = '<polygon class="zap" points="' + (x + 30) + ',40 ' + (x + 4) + ',100 ' + (x + 20) + ',100 ' + (x - 6) + ',160 ' + (x + 40) + ',88 ' + (x + 22) + ',88 ' + (x + 44) + ',40" fill="#F2C94C" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
      var b = $('#bolts'); b.insertAdjacentHTML('beforeend', g);
      setTimeout(function () { if (b.firstChild) b.removeChild(b.firstChild); }, 700);
    }
    function render(changed) {
      var k = crashed.filter(Boolean).length;
      var aDown = crashed[0];
      $('#stA').style.transform = aDown ? 'rotate(-78deg)' : 'none';
      $('#acrack0').setAttribute('opacity', aDown ? '1' : '0');
      var tilt = [0, 3, 7, 13, 70][k];
      $('#stB').style.transform = tilt ? 'rotate(' + tilt + 'deg)' : 'none';
      crashed.forEach(function (c, i) { $('#bcrack' + i).setAttribute('opacity', c ? '1' : '0'); });
      var vb = 100 - k * 15;
      $('#valA').textContent = aDown ? '40% · flat on its face' : '100% standing';
      $('#valB').textContent = k === 4 ? vb + '% · down, for now' : vb + '% standing';
      var msg;
      if (k === 0) msg = 'Two companies, two stools. One leg per product line.';
      else if (k === 4) msg = 'Everything crashed at once. That’s a bad year for the whole industry, not just us.';
      else if (aDown && k === 1) msg = 'CBD tanked. The one-lane brand hit the floor. Bad Seed wobbled and kept going.';
      else if (aDown) msg = 'One-lane brand is still on the floor. Bad Seed is on ' + (4 - k) + ' good legs.';
      else msg = 'The one-lane brand doesn’t care about this one. Bad Seed loses a leg, wobbles, stays up.';
      $('#simMsg').textContent = msg;
    }
    $$('#crash .toggle').forEach(function (t) {
      t.addEventListener('click', function () {
        var i = parseInt(t.getAttribute('data-lane'), 10);
        crashed[i] = !crashed[i];
        t.setAttribute('aria-pressed', String(crashed[i]));
        if (crashed[i]) { bolt(BX[i] - 10); if (i === 0) bolt(150); }
        render();
      });
    });
    render();
  })();

  /* =====================================================================
     SLIDE 15 — the finale
     ===================================================================== */
  $('#happyBtn').addEventListener('click', function () {
    burst(220, innerWidth / 2, innerHeight / 2);
    setTimeout(function () { burst(120, innerWidth * 0.25, innerHeight * 0.4); burst(120, innerWidth * 0.75, innerHeight * 0.4); }, 250);
  });

  /* =====================================================================
     BOOT
     ===================================================================== */
  try { if (localStorage.getItem('bsb-notes') === '1') toggleNotes(true); } catch (e) {}
  go(slideFromHash());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
