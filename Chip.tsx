import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle, StyleProp, Text } from "react-native";
import {colors} from './constants'

interface IProps {
	isSkeleton?: boolean;
	title?: string | null;
	isSelected?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	onPress?: () => void;
	index?: number;
	children?: React.ReactElement;
}

const styles = StyleSheet.create({
		containerInner: {
			paddingHorizontal: 16,
			height: 32,
			justifyContent: "center",
			borderRadius: 80,
			marginEnd: 8,
			backgroundColor: colors.background,
		},
		containerInnerBack: {
			backgroundColor: colors.primary,
		},
	});

const IChip: React.FC<IProps> = ({ title, isSelected = true, onPress, children, containerStyle }) => {

	const handlePress = () => {
		if (onPress) {
			onPress();
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handlePress}>
			<View style={[styles.containerInner, isSelected && styles.containerInnerBack, containerStyle]}>
				{children}
				{!!title && (
					<Text style={{color: isSelected ? colors.background : colors.text}}>
						{title}
					</Text>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default IChip;
