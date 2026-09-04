const registerForm = document.getElementById("registerForm");
const formStatus = document.getElementById("formStatus");
const submitButton = registerForm.querySelector(".submit-button");

// Your WhatsApp number (digits only, no "+", no spaces/dashes)
const ADMIN_WHATSAPP = "201068480441";

const PHONE_PATTERN = /^\+?[0-9\s-]{8,15}$/;
// const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
}

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);

  const name = (formData.get("name") || "").trim();
  const phone = (formData.get("phone") || "").trim();
  const whatsapp = (formData.get("whatsapp") || "").trim();
  const emergencyNumber = (formData.get("emergencyNumber") || "").trim();
  const mechanicNumber = (formData.get("mechanicNumber") || "").trim();
  const email = (formData.get("email") || "").trim();

  if (!name || !phone || !whatsapp || !emergencyNumber) {
    setStatus("يرجى تعبئة البيانات الأساسية.", "error");
    return;
  }

  // if (!PHONE_PATTERN.test(phone) || !PHONE_PATTERN.test(whatsapp)) {
  //   setStatus("يرجى إدخال رقم هاتف صحيح.", "error");
  //   return;
  // }

  // if (!EMAIL_PATTERN.test(email)) {
  //   setStatus("يرجى إدخال بريد إلكتروني صحيح.", "error");
  //   return;
  // }

  const message = `مرحبًا، أريد إنشاء ملف شخصي رقمي.

الاسم: ${name}
الهاتف: ${phone}
واتساب: ${whatsapp}
رقم الطوارئ: ${emergencyNumber}
رقم الميكانيكي: ${mechanicNumber}
البريد الإلكتروني: ${email}

أرغب في إنشاء ملف شخصي مشابه.`;

  const whatsappURL = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;

  submitButton.disabled = true;

  const opened = window.open(whatsappURL, "_blank");

  // Popup blockers or in-app browsers sometimes silently block window.open.
  // Give the visitor a manual way out instead of a request that vanishes.
  if (!opened || opened.closed) {
    setStatus("تعذر فتح واتساب تلقائيًا. اضغط هنا لإرسال طلبك.", "error");

    const manualLink = document.createElement("a");
    manualLink.href = whatsappURL;
    manualLink.target = "_blank";
    manualLink.textContent = "فتح واتساب يدويًا";
    manualLink.style.display = "inline-block";
    manualLink.style.marginTop = "6px";
    formStatus.appendChild(document.createElement("br"));
    formStatus.appendChild(manualLink);

    submitButton.disabled = false;
    return;
  }

  setStatus("تم إرسال طلبك، سنتواصل معك قريبًا.", "success");
  registerForm.reset();
  submitButton.disabled = false;
});
