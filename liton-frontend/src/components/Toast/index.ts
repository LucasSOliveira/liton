
interface ToastParams {
    message?: string;
    type?: "success" | "error" | "warning";
    duration?: number;
    icon?: string;
}
let toastList: number[] = [];

export default function createToast(params: ToastParams) {
    let {
        message = "sucesso!",
        type = "success",
        duration = 3000,
        icon = "check_circle",
    } = params;

    if (type === "error") {
        icon = "error";
    }
    if (type === "warning") {
        icon = "warning";
    }

    const toastIndex = toastList.length + 1;
    let toastContainer = document.getElementById("toast-container");

    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }

    const toastHTML = `
        <div
            id="toast-el-${toastIndex}"
            class="toast toast--${type}">
                <i
                    id="toast-icon-${toastIndex}"
                    class="material-symbols-outlined toast__icon">
                        ${icon}
                </i>
            <span
                id="toast-text-${toastIndex}"
                class="toast__text">
                    ${message}
            </span>
        </div>
    `;
    toastList.push(toastIndex);

    const tempDiv = document.createElement("div");
    tempDiv.id = `temp-div-${toastIndex}`;
    tempDiv.innerHTML = toastHTML;

    toastContainer.appendChild(tempDiv);

    setTimeout(() => {
        const tempDivOut = tempDiv;
        const toastElementOut = document.getElementById(`toast-el-${toastIndex}`);

        toastElementOut?.classList.add("fade-out");
        setTimeout(() => {
            tempDivOut.remove();
            toastList = toastList.filter(
                (item: number) => item !== toastIndex
            );
        }, 2000);
    }, duration);
}