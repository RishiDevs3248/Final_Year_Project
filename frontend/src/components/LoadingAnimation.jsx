export default function LoadingAnimation() {
    return (
        <div>
            <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" width="100" height="100" >
                <circle fill="#f25230" stroke="none" cx="6" cy="50" r="6">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 10; 0 -10; 0 10"
                        dur="1s"
                        repeatCount="indefinite"
                        begin="0s"
                    />
                </circle>
                <circle fill="#f25230" stroke="none" cx="24" cy="50" r="6">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 10; 0 -10; 0 10"
                        dur="1s"
                        repeatCount="indefinite"
                        begin="0.1s"
                    />
                </circle>
                <circle fill="#f25230" stroke="none" cx="42" cy="50" r="6">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 10; 0 -10; 0 10"
                        dur="1s"
                        repeatCount="indefinite"
                        begin="0.2s"
                    />
                </circle>
                <circle fill="#f25230" stroke="none" cx="60" cy="50" r="6">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 10; 0 -10; 0 10"
                        dur="1s"
                        repeatCount="indefinite"
                        begin="0.3s"
                    />
                </circle>
                <circle fill="#f25230" stroke="none" cx="78" cy="50" r="6">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 10; 0 -10; 0 10"
                        dur="1s"
                        repeatCount="indefinite"
                        begin="0.4s"
                    />
                </circle>
            </svg>
            <div>
                Loading questions...
            </div>
        </div>

    );
}