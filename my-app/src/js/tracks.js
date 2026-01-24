"use strict";
// interface Track {
//   id: string;
//   name: string;
//   duration: number;
// }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracks = tracks;
// async function getTracks(limit: number = 10): Promise<Track[]> {
//   const response = await fetch(`https://api.example.com/tracks?limit=${limit}`);
//   if (!response.ok) {
//     throw new Error("Ошибка при получении треков");
//   }
//   const data = await response.json();
//   return data.items;
// }
function tracks() {
    // interface Track {
    //   id: string;
    //   title: string;
    //   artist: string;
    //   duration: number;
    //   size_mb: number;
    // }
    function renderTracks() {
        return __awaiter(this, void 0, void 0, function () {
            var container, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        container = document.getElementById('tracks-tbody');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch('http://localhost:8000/api//tracks?limit=10')];
                    case 2:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error('Ошибка сети');
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        if (container) {
                            container.innerHTML = ''; // Очистка индикатора загрузки
                            data.items.forEach(function (track) {
                                var trackElement = document.createElement('div');
                                trackElement.className = 'track-card';
                                trackElement.innerHTML = "\n                    <strong>".concat(track.title, "</strong><br>\n                    <span>\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: ").concat(track.artists.map(function (a) { return a.name; }).join(', '), "</span><br>\n                    <strong>\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C: ").concat(track.artist, "</strong><br>\n                    <number>\u0414\u043B\u0438\u043D\u043D\u0430 \u0442\u0440\u0435\u043A\u0430: ").concat(track.duration, "</number>\n                    <number>\u0420\u0430\u0437\u043C\u0435\u0440 \u0442\u0440\u0435\u043A\u0430: ").concat(track.size_mb, "</number>\n                    <strong>").concat(track.encoded_audio, "</strong><br>\n                ");
                                container.appendChild(trackElement);
                                console.log(trackElement);
                            });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        if (container) {
                            container.innerHTML = "<p style=\"color: red;\">\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(error_1, "</p>");
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    // Запуск функции при загрузке страницы
    window.addEventListener('DOMContentLoaded', renderTracks);
}
