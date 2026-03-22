declare module 'react-image-lightbox' {
	import { Component } from 'react';

	export interface LightboxProps {
		mainSrc: string;
		nextSrc?: string;
		prevSrc?: string;
		onCloseRequest: () => void;
		onMovePrevRequest?: () => void;
		onMoveNextRequest?: () => void;
		imageTitle?: React.ReactNode;
		imageCaption?: React.ReactNode;
		toolbarButtons?: React.ReactNode[];
		reactModalStyle?: object;
		imagePadding?: number;
		clickOutsideToClose?: boolean;
		enableZoom?: boolean;
		wrapperClassName?: string;
		onImageLoad?: () => void;
		onImageLoadError?: (imageSrc: string, srcType: string, errorEvent: Event) => void;
		imageLoadErrorMessage?: React.ReactNode;
		loader?: React.ReactNode;
		discourageDownloads?: boolean;
		animationDisabled?: boolean;
		animationOnKeyInput?: boolean;
		animationDuration?: number;
		keyRepeatLimit?: number;
		keyRepeatKeyupBonus?: number;
		mainSrcThumbnail?: string;
		nextSrcThumbnail?: string;
		prevSrcThumbnail?: string;
		[key: string]: any;
	}

	export default class Lightbox extends Component<LightboxProps> {}
}
