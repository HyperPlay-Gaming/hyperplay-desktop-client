#include "overlay.h"

namespace overlay
{

std::shared_ptr<OverlayMain> gOverlayMain;

Napi::Value start(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  gOverlayMain = std::make_shared<OverlayMain>();

  return env.Undefined();
}

Napi::Value stop(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  gOverlayMain = nullptr;

  return env.Undefined();
}

Napi::Value setEventCallback(const Napi::CallbackInfo &info)
{
  return gOverlayMain->setEventCallback(info);
}

Napi::Value setHotkeys(const Napi::CallbackInfo &info)
{
  return gOverlayMain->setHotkeys(info);
}

Napi::Value log(const Napi::CallbackInfo &info)
{
  return gOverlayMain->log(info);
}

Napi::Value addWindow(const Napi::CallbackInfo &info)
{
  return gOverlayMain->addWindow(info);
}

Napi::Value closeWindow(const Napi::CallbackInfo &info)
{
    return gOverlayMain->closeWindow(info);
}

Napi::Value sendWindowBounds(const Napi::CallbackInfo &info)
{
    return gOverlayMain->sendWindowBounds(info);
}

Napi::Value sendCommand(const Napi::CallbackInfo &info)
{
  return gOverlayMain->sendCommand(info);
}

Napi::Value sendFrameBuffer(const Napi::CallbackInfo &info)
{
  return gOverlayMain->sendFrameBuffer(info);
}

Napi::Value translateInputEvent(const Napi::CallbackInfo &info)
{
    return gOverlayMain->translateInputEvent(info);
}

} // namespace overlay

Napi::String Method(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  return Napi::String::New(env, "hello world");
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, Method));

    exports.Set(Napi::String::New(env, "start"), Napi::Function::New(env, overlay::start));
    exports.Set(Napi::String::New(env, "stop"), Napi::Function::New(env, overlay::stop));
    exports.Set(Napi::String::New(env, "setEventCallback"), Napi::Function::New(env, overlay::setEventCallback));
    exports.Set(Napi::String::New(env, "setHotkeys"), Napi::Function::New(env, overlay::setHotkeys));
    exports.Set(Napi::String::New(env, "log"), Napi::Function::New(env, overlay::log));
    exports.Set(Napi::String::New(env, "sendCommand"), Napi::Function::New(env, overlay::sendCommand));
    exports.Set(Napi::String::New(env, "addWindow"), Napi::Function::New(env, overlay::addWindow));
    exports.Set(Napi::String::New(env, "closeWindow"), Napi::Function::New(env, overlay::closeWindow));
    exports.Set(Napi::String::New(env, "sendWindowBounds"), Napi::Function::New(env, overlay::sendWindowBounds));
    exports.Set(Napi::String::New(env, "sendFrameBuffer"), Napi::Function::New(env, overlay::sendFrameBuffer));
    exports.Set(Napi::String::New(env, "translateInputEvent"), Napi::Function::New(env, overlay::translateInputEvent));

    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)