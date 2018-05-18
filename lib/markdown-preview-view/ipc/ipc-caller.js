"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class IPCCaller {
    constructor(windowId, editorId) {
        this.windowId = windowId;
        this.editorId = editorId;
        this.ipcIdx = 0;
        this.myWindowId = electron_1.remote.getCurrentWindow().id;
    }
    async scrollToBufferRange(arg) {
        return this.ipc('scrollToBufferRange', arg);
    }
    async destroy() {
        return this.ipc('destroy', undefined);
    }
    async init() {
        return this.ipc('init', undefined);
    }
    async openSource(arg) {
        return this.ipc('openSource', arg);
    }
    dispose() {
    }
    async ipc(cmd, args) {
        return new Promise((resolve, reject) => {
            const idx = this.ipcIdx++;
            const handler = (e) => {
                if (e.forWindowId === this.myWindowId &&
                    e.windowId === this.windowId &&
                    e.editorId === this.editorId &&
                    e.idx === idx) {
                    electron_1.remote.ipcMain.removeListener('markdown-preview-plus:editor-reply', handler);
                    resolve(e.reply);
                }
            };
            const res = electron_1.remote.ipcMain.emit('markdown-preview-plus:editor-request', {
                windowId: this.windowId,
                editorId: this.editorId,
                forWindowId: this.myWindowId,
                idx,
                cmd,
                args,
            });
            if (!res) {
                reject(new Error('Nobody is listening for editor requests'));
                return;
            }
            electron_1.remote.ipcMain.on('markdown-preview-plus:editor-reply', handler);
        });
    }
}
exports.IPCCaller = IPCCaller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjLWNhbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXJrZG93bi1wcmV2aWV3LXZpZXcvaXBjL2lwYy1jYWxsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1Q0FBaUM7QUFRakM7SUFHRSxZQUFvQixRQUFnQixFQUFVLFFBQWdCO1FBQTFDLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRnRELFdBQU0sR0FBRyxDQUFDLENBQUE7UUFDVixlQUFVLEdBQUcsaUJBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsQ0FBQTtJQUNnQixDQUFDO0lBQzNELEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxHQUFxQjtRQUNwRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUNNLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUNNLEtBQUssQ0FBQyxJQUFJO1FBQ2YsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBQ00sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFZO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUNNLE9BQU87SUFFZCxDQUFDO0lBQ08sS0FBSyxDQUFDLEdBQUcsQ0FDZixHQUFNLEVBQ04sSUFBb0I7UUFFcEIsT0FBTyxJQUFJLE9BQU8sQ0FBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMxQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDekIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQU1oQixFQUFFLEVBQUU7Z0JBQ0gsSUFDRSxDQUFDLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxVQUFVO29CQUNqQyxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRO29CQUM1QixDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRO29CQUM1QixDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFDYjtvQkFDQSxpQkFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQzNCLG9DQUFvQyxFQUNwQyxPQUFPLENBQ1IsQ0FBQTtvQkFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUNqQjtZQUNILENBQUMsQ0FBQTtZQUNELE1BQU0sR0FBRyxHQUFHLGlCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsRUFBRTtnQkFDdEUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDNUIsR0FBRztnQkFDSCxHQUFHO2dCQUNILElBQUk7YUFDTCxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzVELE9BQU07YUFDUDtZQUNELGlCQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNsRSxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQTVERCw4QkE0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUENDbWQsIEFyZyB9IGZyb20gJy4vcmVxdWVzdC1oYW5kbGVyJ1xuaW1wb3J0IHsgcmVtb3RlIH0gZnJvbSAnZWxlY3Ryb24nXG5cbmV4cG9ydCB0eXBlIElQQ0NtZFByb21pc2UgPSB7XG4gIFtLIGluIGtleW9mIElQQ0NtZF06IElQQ0NtZFtLXSBleHRlbmRzIChhcmc6IGluZmVyIEEpID0+IGluZmVyIFJcbiAgICA/IChhcmc6IEEpID0+IFByb21pc2U8Uj5cbiAgICA6IG5ldmVyXG59XG5cbmV4cG9ydCBjbGFzcyBJUENDYWxsZXIgaW1wbGVtZW50cyBJUENDbWRQcm9taXNlIHtcbiAgcHJpdmF0ZSBpcGNJZHggPSAwXG4gIHByaXZhdGUgbXlXaW5kb3dJZCA9IHJlbW90ZS5nZXRDdXJyZW50V2luZG93KCkuaWRcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3aW5kb3dJZDogbnVtYmVyLCBwcml2YXRlIGVkaXRvcklkOiBudW1iZXIpIHt9XG4gIHB1YmxpYyBhc3luYyBzY3JvbGxUb0J1ZmZlclJhbmdlKGFyZzogW251bWJlciwgbnVtYmVyXSkge1xuICAgIHJldHVybiB0aGlzLmlwYygnc2Nyb2xsVG9CdWZmZXJSYW5nZScsIGFyZylcbiAgfVxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICByZXR1cm4gdGhpcy5pcGMoJ2Rlc3Ryb3knLCB1bmRlZmluZWQpXG4gIH1cbiAgcHVibGljIGFzeW5jIGluaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXBjKCdpbml0JywgdW5kZWZpbmVkKVxuICB9XG4gIHB1YmxpYyBhc3luYyBvcGVuU291cmNlKGFyZz86IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmlwYygnb3BlblNvdXJjZScsIGFyZylcbiAgfVxuICBwdWJsaWMgZGlzcG9zZSgpIHtcbiAgICAvLyBUT0RPXG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBpcGM8VCBleHRlbmRzIGtleW9mIElQQ0NtZD4oXG4gICAgY21kOiBULFxuICAgIGFyZ3M6IEFyZzxJUENDbWRbVF0+LFxuICApOiBQcm9taXNlPFJldHVyblR5cGU8SVBDQ21kW1RdPj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMuaXBjSWR4KytcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZToge1xuICAgICAgICBlZGl0b3JJZDogbnVtYmVyXG4gICAgICAgIHdpbmRvd0lkOiBudW1iZXJcbiAgICAgICAgZm9yV2luZG93SWQ6IG51bWJlclxuICAgICAgICBpZHg6IG51bWJlclxuICAgICAgICByZXBseTogYW55XG4gICAgICB9KSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBlLmZvcldpbmRvd0lkID09PSB0aGlzLm15V2luZG93SWQgJiZcbiAgICAgICAgICBlLndpbmRvd0lkID09PSB0aGlzLndpbmRvd0lkICYmXG4gICAgICAgICAgZS5lZGl0b3JJZCA9PT0gdGhpcy5lZGl0b3JJZCAmJlxuICAgICAgICAgIGUuaWR4ID09PSBpZHhcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmVtb3RlLmlwY01haW4ucmVtb3ZlTGlzdGVuZXIoXG4gICAgICAgICAgICAnbWFya2Rvd24tcHJldmlldy1wbHVzOmVkaXRvci1yZXBseScsXG4gICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgIClcbiAgICAgICAgICByZXNvbHZlKGUucmVwbHkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlcyA9IHJlbW90ZS5pcGNNYWluLmVtaXQoJ21hcmtkb3duLXByZXZpZXctcGx1czplZGl0b3ItcmVxdWVzdCcsIHtcbiAgICAgICAgd2luZG93SWQ6IHRoaXMud2luZG93SWQsXG4gICAgICAgIGVkaXRvcklkOiB0aGlzLmVkaXRvcklkLFxuICAgICAgICBmb3JXaW5kb3dJZDogdGhpcy5teVdpbmRvd0lkLFxuICAgICAgICBpZHgsXG4gICAgICAgIGNtZCxcbiAgICAgICAgYXJncyxcbiAgICAgIH0pXG4gICAgICBpZiAoIXJlcykge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdOb2JvZHkgaXMgbGlzdGVuaW5nIGZvciBlZGl0b3IgcmVxdWVzdHMnKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9IC8vIG90aGVyd2lzZSxcbiAgICAgIHJlbW90ZS5pcGNNYWluLm9uKCdtYXJrZG93bi1wcmV2aWV3LXBsdXM6ZWRpdG9yLXJlcGx5JywgaGFuZGxlcilcbiAgICB9KVxuICB9XG59XG4iXX0=